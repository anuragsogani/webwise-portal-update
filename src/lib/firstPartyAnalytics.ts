/**
 * First-party analytics client.
 *
 * - Generates a persistent session_id (UUID stored in sessionStorage).
 * - trackEvent() batches calls and flushes to /api/events.
 * - GA4 and first-party events fire together when both are wired up.
 */
import { getApiBaseUrl } from "./apiBaseUrl";

const ENDPOINT = () => `${getApiBaseUrl()}/events`;

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getSessionId(): string {
  if (typeof sessionStorage === "undefined") return generateUUID();
  const key = "_fp_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = generateUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function getUtmParams(): { utm_source?: string; utm_medium?: string; utm_campaign?: string } {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const result: { utm_source?: string; utm_medium?: string; utm_campaign?: string } = {};
  const s = p.get("utm_source"); if (s) result.utm_source = s;
  const m = p.get("utm_medium"); if (m) result.utm_medium = m;
  const c = p.get("utm_campaign"); if (c) result.utm_campaign = c;
  return result;
}

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
const FLUSH_DELAY_MS = 800;

function flush(): void {
  if (!_queue.length) return;
  const batch = _queue.splice(0);
  // Send all queued events; each is a separate record in the DB
  for (const payload of batch) {
    fetch(ENDPOINT(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Use keepalive so events fire even on page unload
      keepalive: true,
    }).catch(() => {
      // Best-effort — never surface errors
    });
  }
}

/**
 * Track a first-party analytics event. Batches within 800ms before flushing.
 * Fires even without GA configured.
 */
export function trackFpEvent(
  eventType: string,
  meta?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const utms = getUtmParams();
  const payload: EventPayload = {
    session_id: getSessionId(),
    event_type: eventType,
    page_path: window.location.pathname + window.location.search,
    referrer: document.referrer || undefined,
    ...utms,
    ...(meta && Object.keys(meta).length ? { meta } : {}),
  };
  _queue.push(payload);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}

/** Track a page view. Called by GoogleAnalytics.tsx on each route change. */
export function trackFpPageView(path: string): void {
  if (typeof window === "undefined") return;
  const utms = getUtmParams();
  const payload: EventPayload = {
    session_id: getSessionId(),
    event_type: "page_view",
    page_path: path,
    referrer: document.referrer || undefined,
    ...utms,
  };
  _queue.push(payload);
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, FLUSH_DELAY_MS);
}
