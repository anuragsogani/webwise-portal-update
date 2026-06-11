/**
 * First-party analytics — production-grade auto-instrumentation.
 *
 * Auto-tracks (once initAutoTracking() is called):
 *  - Page views (called externally from GoogleAnalytics.tsx)
 *  - CTA / button clicks (data-track attribute OR class-based detection)
 *  - Outbound link clicks
 *  - Internal navigation link clicks
 *  - Scroll depth milestones (25 / 50 / 75 / 90 %)
 *  - Time on page (logged on visibility change / unload)
 *  - Form interactions (form_start, form_submit, form_abandon)
 *  - Copy-to-clipboard events
 *
 * All events are batched for 400 ms then flushed via fetch+keepalive to /api/events.
 */
import { getApiBaseUrl } from "./apiBaseUrl";

const ENDPOINT = () => `${getApiBaseUrl()}/events`;
const FLUSH_DELAY_MS = 400;

// ─── Session ID ───────────────────────────────────────────────────────────────

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getSessionId(): string {
  if (typeof sessionStorage === "undefined") return generateUUID();
  const key = "_fp_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) { sid = generateUUID(); sessionStorage.setItem(key, sid); }
  return sid;
}

// ─── UTMs ─────────────────────────────────────────────────────────────────────

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  return out;
}

// Persist UTMs for the session so they survive page navigations
function getCachedUtms(): Record<string, string> {
  try {
    const fresh = getUtmParams();
    if (Object.keys(fresh).length) {
      sessionStorage.setItem("_fp_utms", JSON.stringify(fresh));
      return fresh;
    }
    const cached = sessionStorage.getItem("_fp_utms");
    return cached ? JSON.parse(cached) : {};
  } catch { return {}; }
}

// ─── Queue & Flush ───────────────────────────────────────────────────────────

interface EventPayload {
  session_id: string;
  event_type: string;
  page_path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  meta?: Record<string, unknown>;
}

let flushTimer: ReturnType<typeof setTimeout> | null = null;
const _queue: EventPayload[] = [];

function flush(): void {
  if (!_queue.length) return;
  const batch = _queue.splice(0);
  for (const payload of batch) {
    fetch(ENDPOINT(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

function enqueue(payload: EventPayload): void {
  _queue.push(payload);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}

function buildPayload(
  eventType: string,
  meta?: Record<string, unknown>,
  pathOverride?: string,
): EventPayload {
  const utms = getCachedUtms();
  return {
    session_id: getSessionId(),
    event_type: eventType,
    page_path: pathOverride ?? (typeof window !== "undefined"
      ? window.location.pathname + window.location.search
      : undefined),
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    utm_source: utms.utm_source,
    utm_medium: utms.utm_medium,
    utm_campaign: utms.utm_campaign,
    ...(meta && Object.keys(meta).length ? { meta: { ...meta, ...utms } } : utms && Object.keys(utms).length ? { meta: utms } : {}),
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Track any named event with optional metadata. */
export function trackFpEvent(
  eventType: string,
  meta?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  enqueue(buildPayload(eventType, meta));
}

/** Returns true for paths that should never be tracked (admin/internal). */
function _isInternalPath(path: string): boolean {
  return /^\/(admin|login)(\/|$|\?)/.test(path);
}

/** Track a page view. Called from GoogleAnalytics.tsx on each route change. */
export function trackFpPageView(path: string): void {
  if (typeof window === "undefined") return;
  _resetScrollTracking();
  _resetTimeTracking();
  if (_isInternalPath(path)) return; // never track admin/login pages
  enqueue(buildPayload("page_view", undefined, path));
}

// ─── Auto-Instrumentation ────────────────────────────────────────────────────

let _autoTrackingInitialized = false;

// ─ Scroll depth ─

const _scrollMilestones = new Set<number>();
let _scrollRafPending = false;

function _resetScrollTracking() {
  _scrollMilestones.clear();
  _scrollRafPending = false;
}

function _onScroll() {
  if (_scrollRafPending || _isAdminPage()) return;
  _scrollRafPending = true;
  requestAnimationFrame(() => {
    _scrollRafPending = false;
    const el = document.documentElement;
    const scrolled = el.scrollTop + el.clientHeight;
    const total = el.scrollHeight;
    if (!total) return;
    const pct = Math.floor((scrolled / total) * 100);
    for (const milestone of [25, 50, 75, 90]) {
      if (pct >= milestone && !_scrollMilestones.has(milestone)) {
        _scrollMilestones.add(milestone);
        enqueue(buildPayload("scroll_depth", { depth_pct: milestone }));
      }
    }
  });
}

// ─ Time on page ─

let _totalVisibleMs = 0;
let _visibilityStart = Date.now();

function _resetTimeTracking() {
  _totalVisibleMs = 0;
  _visibilityStart = Date.now();
}

function _flushTimeOnPage() {
  if (_isAdminPage()) return;
  const elapsed = Math.round(
    (document.visibilityState === "visible"
      ? _totalVisibleMs + (Date.now() - _visibilityStart)
      : _totalVisibleMs) / 1000,
  );
  if (elapsed < 2) return; // ignore instant bounces
  enqueue(buildPayload("time_on_page", { seconds: elapsed }));
  flush(); // immediate flush on unload
}

function _onVisibilityChange() {
  if (document.visibilityState === "hidden") {
    _totalVisibleMs += Date.now() - _visibilityStart;
    _flushTimeOnPage();
  } else {
    _visibilityStart = Date.now();
  }
}

// ─ Click tracking ─

/**
 * Resolve the closest trackable ancestor from a clicked element.
 * Priority: [data-track] attribute → known CTA patterns → <a> or <button>.
 */
function _resolveTrackTarget(
  target: EventTarget | null,
): { el: HTMLElement; label: string; category: string; href?: string } | null {
  let el = target as HTMLElement | null;
  let depth = 0;
  while (el && depth < 6) {
    // Explicit opt-in via data attribute
    const dt = el.getAttribute?.("data-track");
    if (dt) {
      return {
        el,
        label: dt,
        category: el.getAttribute("data-track-category") ?? "cta",
        href: (el as HTMLAnchorElement).href || undefined,
      };
    }

    // Auto-detect CTAs by class patterns
    const cls = el.className ?? "";
    const isCta = typeof cls === "string" && (
      /\bcta\b|btn--primary|btn-primary|hero.*btn|demo.*btn|get.?start/i.test(cls) ||
      el.tagName === "BUTTON"
    );
    if (isCta) {
      const text = (el.textContent ?? "").trim().slice(0, 80);
      return { el, label: text || "unnamed-cta", category: "cta" };
    }

    // Anchor tags
    if (el.tagName === "A") {
      const href = (el as HTMLAnchorElement).href ?? "";
      const isOutbound = href && !href.startsWith(window.location.origin) && /^https?:\/\//.test(href);
      const text = (el.textContent ?? "").trim().slice(0, 80) ||
        el.getAttribute("aria-label") || "link";
      return {
        el,
        label: text,
        category: isOutbound ? "outbound_link" : "internal_link",
        href: href || undefined,
      };
    }

    el = el.parentElement;
    depth++;
  }
  return null;
}

function _isAdminPage(): boolean {
  return typeof window !== "undefined" && _isInternalPath(window.location.pathname);
}

function _onDocumentClick(e: MouseEvent) {
  if (_isAdminPage()) return; // ignore all clicks on admin pages
  const resolved = _resolveTrackTarget(e.target);
  if (!resolved) return;

  const { label, category, href } = resolved;

  if (category === "outbound_link") {
    enqueue(buildPayload("outbound_click", { label, href }));
    flush(); // flush immediately before navigation
    return;
  }
  if (category === "internal_link") {
    enqueue(buildPayload("nav_click", { label, href }));
    return;
  }
  // CTA or explicitly tracked
  enqueue(buildPayload("cta_click", { label, category, href }));
}

// ─ Form tracking ─

const _formStarted = new WeakSet<HTMLElement>();

function _onFormFocusin(e: FocusEvent) {
  if (_isAdminPage()) return;
  const form = (e.target as HTMLElement)?.closest?.("form");
  if (!form || _formStarted.has(form as HTMLElement)) return;
  _formStarted.add(form as HTMLElement);
  const formName = form.getAttribute("data-form-name") ||
    form.id ||
    form.getAttribute("aria-label") ||
    "unnamed-form";
  enqueue(buildPayload("form_start", { form: formName }));
}

function _onFormSubmit(e: Event) {
  if (_isAdminPage()) return;
  const form = e.target as HTMLFormElement;
  const formName = form.getAttribute("data-form-name") ||
    form.id ||
    form.getAttribute("aria-label") ||
    "unnamed-form";
  enqueue(buildPayload("form_submit", { form: formName }));
}

// ─ Copy tracking ─

function _onCopy() {
  if (_isAdminPage()) return;
  const selected = window.getSelection?.()?.toString?.() ?? "";
  if (selected.length < 5) return;
  enqueue(buildPayload("content_copy", { chars: selected.length }));
}

// ─ Init ──────────────────────────────────────────────────────────────────────

/**
 * Call once when the app mounts. Sets up all passive event listeners.
 * Safe to call multiple times — subsequent calls are no-ops.
 */
export function initAutoTracking(): void {
  if (typeof window === "undefined" || _autoTrackingInitialized) return;
  _autoTrackingInitialized = true;

  // Scroll depth
  window.addEventListener("scroll", _onScroll, { passive: true });

  // Time on page
  document.addEventListener("visibilitychange", _onVisibilityChange);
  window.addEventListener("beforeunload", () => { _flushTimeOnPage(); flush(); });

  // Click tracking
  document.addEventListener("click", _onDocumentClick, true); // capture phase

  // Form tracking
  document.addEventListener("focusin", _onFormFocusin, true);
  document.addEventListener("submit", _onFormSubmit, true);

  // Copy tracking
  document.addEventListener("copy", _onCopy);
}
