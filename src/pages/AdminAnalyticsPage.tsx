import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import {
  BarChart2, RefreshCw, AlertCircle, Globe, MapPin,
  MousePointerClick, Activity, Eye, ChevronLeft, ChevronRight,
  Search, Users, Clock, TrendingUp, Link2, FileInput,
  Target, Mail, ArrowUpRight, Zap, Calendar,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

// ─── Types ───────────────────────────────────────────────────────────────────

interface Summary {
  days: number;
  total_events: number;
  total_page_views: number;
  unique_sessions: number;
  unique_ips: number;
  avg_pages_per_session: number;
  bounce_rate: number;
  total_by_type: Array<{ event_type: string; total: number }>;
  top_pages: Array<{ page_path: string; views: number; unique_sessions: number }>;
  top_countries: Array<{ country: string; sessions: number; events: number }>;
  top_cities: Array<{ city: string; country: string; sessions: number }>;
  cta_clicks: Array<{ label: string; category: string; href: string; total: number }>;
  outbound_clicks: Array<{ destination: string; clicks: number }>;
  scroll_summary: Array<{ depth_pct: string; sessions: number }>;
  time_on_page: { avg_seconds: number; median_seconds: number; sample_size: number } | null;
  form_funnel: Array<{ event_type: string; form_name: string; total: number }>;
  daily_trend: Array<{ day: string; event_type: string; total: number }>;
  referrer_summary: Array<{ domain: string; sessions: number; page_views: number }>;
  utm_summary: Array<{ utm_source: string; utm_medium: string; utm_campaign: string; sessions: number; events: number }>;
  conversion_funnel: Array<{ step: string; count: number }>;
}

interface RawEvent {
  id: string;
  session_id: string;
  event_type: string;
  page_path: string;
  country: string;
  city: string;
  created_at: string;
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  referrer: string;
  user_agent: string;
  meta: Record<string, unknown> | null;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;
const EVENT_TYPES = [
  "all", "page_view", "cta_click", "nav_click", "outbound_click",
  "scroll_depth", "time_on_page", "form_start", "form_submit",
  "lead_captured", "subscriber_joined", "hubspot_meeting_open",
  "content_copy", "ai_summary_click",
];
type Tab = "overview" | "clicks" | "engagement" | "audience" | "events";

// ─── Date helpers ─────────────────────────────────────────────────────────────

// Use local calendar date - toISOString() converts to UTC which breaks dates
// for users in timezones ahead of UTC (e.g. IST +05:30 makes "today" appear as "yesterday").
function toIso(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function startOfDay(d: Date) { const r = new Date(d); r.setHours(0,0,0,0); return r; }
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBetween(d: Date, a: Date, b: Date) {
  const t = d.getTime();
  return t > a.getTime() && t < b.getTime();
}
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

interface DateRange { start: Date; end: Date }

const PRESETS: Array<{ label: string; range: () => DateRange }> = [
  { label: "Today",       range: () => { const d = startOfDay(new Date()); return { start: d, end: d }; } },
  { label: "Yesterday",   range: () => { const d = startOfDay(addDays(new Date(), -1)); return { start: d, end: d }; } },
  { label: "Last 7 days", range: () => ({ start: startOfDay(addDays(new Date(), -6)), end: startOfDay(new Date()) }) },
  { label: "Last 14 days",range: () => ({ start: startOfDay(addDays(new Date(), -13)), end: startOfDay(new Date()) }) },
  { label: "Last 30 days",range: () => ({ start: startOfDay(addDays(new Date(), -29)), end: startOfDay(new Date()) }) },
  { label: "Last 90 days",range: () => ({ start: startOfDay(addDays(new Date(), -89)), end: startOfDay(new Date()) }) },
  { label: "This month",  range: () => ({ start: startOfMonth(new Date()), end: startOfDay(new Date()) }) },
  { label: "Last month",  range: () => {
    const s = startOfMonth(addDays(startOfMonth(new Date()), -1));
    return { start: s, end: endOfMonth(s) };
  }},
  { label: "This year",   range: () => ({ start: new Date(new Date().getFullYear(), 0, 1), end: startOfDay(new Date()) }) },
];

function formatRange(r: DateRange) {
  const fmt = (d: Date) => `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
  if (isSameDay(r.start, r.end)) return fmt(r.start);
  return `${fmt(r.start)} - ${fmt(r.end)}`;
}

// ─── Calendar month grid ──────────────────────────────────────────────────────

function CalendarMonth({
  year, month, range, hovered, selecting,
  onDayClick, onDayHover,
}: {
  year: number; month: number;
  range: DateRange; hovered: Date | null; selecting: boolean;
  onDayClick: (d: Date) => void; onDayHover: (d: Date) => void;
}) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = startOfDay(new Date());

  const effectiveEnd = selecting && hovered ? hovered : range.end;
  const lo = range.start <= effectiveEnd ? range.start : effectiveEnd;
  const hi = range.start <= effectiveEnd ? effectiveEnd : range.start;

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <div style={{
        textAlign: "center",
        fontWeight: 700,
        fontSize: 13,
        color: "var(--adm-text)",
        marginBottom: 10,
        letterSpacing: "0.05em",
      }}>
        {MONTH_NAMES[month]} {year}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {DAY_NAMES.map((d) => (
          <div key={d} style={{
            textAlign: "center", fontSize: 10,
            color: "var(--adm-muted)", fontWeight: 600,
            paddingBottom: 4,
          }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const isStart = isSameDay(d, range.start);
          const isEnd = isSameDay(d, effectiveEnd);
          const inRange = isBetween(d, lo, hi);
          const isToday = isSameDay(d, today);
          const isFuture = d > today;
          return (
            <div
              key={d.toISOString()}
              onClick={() => !isFuture && onDayClick(d)}
              onMouseEnter={() => onDayHover(d)}
              style={{
                textAlign: "center",
                padding: "5px 2px",
                fontSize: 12,
                cursor: isFuture ? "not-allowed" : "pointer",
                borderRadius: 4,
                fontWeight: isStart || isEnd ? 700 : 400,
                background: isStart || isEnd
                  ? "var(--adm-accent)"
                  : inRange
                    ? "rgba(6,182,212,0.15)"
                    : "transparent",
                color: isStart || isEnd
                  ? "#000"
                  : isFuture
                    ? "var(--adm-dim)"
                    : isToday
                      ? "var(--adm-accent)"
                      : inRange
                        ? "var(--adm-text)"
                        : "var(--adm-text)",
                outline: isToday && !isStart && !isEnd ? "1px solid var(--adm-accent)" : "none",
                transition: "background 0.1s",
                userSelect: "none",
              }}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

function DateRangePicker({
  value, onChange,
}: { value: DateRange; onChange: (r: DateRange) => void }) {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [draft, setDraft] = useState<DateRange>(value);
  const [hovered, setHovered] = useState<Date | null>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const today = startOfDay(new Date());
  const [leftMonth, setLeftMonth] = useState(() => ({ year: today.getFullYear(), month: today.getMonth() - 1 < 0 ? 11 : today.getMonth() - 1, yearAdj: today.getMonth() === 0 ? -1 : 0 }));
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const leftYear = leftMonth.year + leftMonth.yearAdj;
  const leftMon = leftMonth.month;
  const rightMon = (leftMon + 1) % 12;
  const rightYear = leftMon === 11 ? leftYear + 1 : leftYear;
  const portalTarget = typeof document !== "undefined" ? document.body : null;

  // Recalculate popup position relative to button whenever open changes
  useEffect(() => {
    if (!open || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    // Anchor below button, right-aligned
    const top = r.bottom + 6;
    const right = window.innerWidth - r.right;
    setPopupStyle({ position: "fixed", top, right, zIndex: 99999 });
  }, [open]);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      const target = e.target as Node;
      // popupRef doesn't exist here - check ref (wrapper) and the portal root
      if (ref.current && ref.current.contains(target)) return;
      // If click is inside the portal popup, keep open
      const portal = document.getElementById("drp-portal");
      if (portal && portal.contains(target)) return;
      setOpen(false);
      setSelecting(false);
      setDraft(value);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open, value]);

  function onDayClick(d: Date) {
    if (!selecting) {
      setDraft({ start: d, end: d });
      setSelecting(true);
    } else {
      const newRange = d >= draft.start
        ? { start: draft.start, end: d }
        : { start: d, end: draft.start };
      setDraft(newRange);
      setSelecting(false);
    }
  }

  function applyPreset(preset: typeof PRESETS[0]) {
    const r = preset.range();
    setDraft(r);
    setSelecting(false);
    onChange(r);
    setOpen(false);
  }

  function applyDraft() {
    onChange(draft);
    setOpen(false);
    setSelecting(false);
  }

  function prevMonth() {
    setLeftMonth((m) => {
      const mon = m.month === 0 ? 11 : m.month - 1;
      const yearAdj = m.month === 0 ? m.yearAdj - 1 : m.yearAdj;
      return { year: m.year, month: mon, yearAdj };
    });
  }

  function nextMonth() {
    setLeftMonth((m) => {
      const mon = (m.month + 1) % 12;
      const yearAdj = m.month === 11 ? m.yearAdj + 1 : m.yearAdj;
      return { year: m.year, month: mon, yearAdj };
    });
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        ref={btnRef}
        className="adm-btn adm-btn--ghost"
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "7px 14px", fontSize: 13, fontWeight: 500,
          minWidth: 230, justifyContent: "space-between",
          border: open ? "1px solid var(--adm-accent)" : undefined,
        }}
        onClick={() => { setOpen((v) => !v); setDraft(value); setSelecting(false); }}
      >
        <Calendar size={14} style={{ color: "var(--adm-accent)", flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: "left" }}>{formatRange(value)}</span>
        <ChevronRight size={12} style={{
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 0.15s",
          color: "var(--adm-muted)",
          flexShrink: 0,
        }} />
      </button>

      {open && portalTarget && createPortal(
        <div id="drp-portal" style={{
          ...popupStyle,
          background: "#0d0d28",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10, padding: 0,
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          display: "flex", minWidth: 580,
          color: "#e8e8f8",
          fontFamily: "Inter, -apple-system, sans-serif",
        }}>
          {/* Presets column */}
          <div style={{
            width: 140, padding: "12px 0",
            borderRight: "1px solid var(--adm-border)",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: "var(--adm-muted)",
              padding: "0 14px 8px", textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              Quick Select
            </div>
            {PRESETS.map((p) => {
              const r = p.range();
              const isActive = toIso(value.start) === toIso(r.start) && toIso(value.end) === toIso(r.end);
              return (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p)}
                  style={{
                    background: isActive ? "rgba(6,182,212,0.12)" : "transparent",
                    border: "none",
                    color: isActive ? "var(--adm-accent)" : "var(--adm-text)",
                    fontSize: 12, fontWeight: isActive ? 700 : 400,
                    padding: "7px 14px", textAlign: "left",
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Calendar area */}
          <div style={{ flex: 1, padding: 16 }}>
            {/* Month navigation */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 12, gap: 8 }}>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={prevMonth} title="Previous month">
                <ChevronLeft size={14} />
              </button>
              <div style={{ flex: 1 }} />
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={nextMonth} title="Next month">
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Two-month calendar */}
            <div style={{ display: "flex", gap: 24 }}>
              <CalendarMonth
                year={leftYear} month={leftMon}
                range={draft} hovered={hovered} selecting={selecting}
                onDayClick={onDayClick} onDayHover={setHovered}
              />
              <div style={{ width: 1, background: "var(--adm-border)" }} />
              <CalendarMonth
                year={rightYear} month={rightMon}
                range={draft} hovered={hovered} selecting={selecting}
                onDayClick={onDayClick} onDayHover={setHovered}
              />
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--adm-border)",
              gap: 10,
            }}>
              <div style={{ fontSize: 12, color: "var(--adm-muted)" }}>
                {selecting
                  ? <span style={{ color: "var(--adm-accent)" }}>Now pick an end date…</span>
                  : <span>
                      <strong style={{ color: "var(--adm-text)" }}>{formatRange(draft)}</strong>
                    </span>
                }
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="adm-btn adm-btn--ghost adm-btn--sm"
                  onClick={() => { setOpen(false); setDraft(value); setSelecting(false); }}
                >
                  Cancel
                </button>
                <button
                  className="adm-btn adm-btn--primary adm-btn--sm"
                  onClick={applyDraft}
                  disabled={selecting}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>,
        portalTarget
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtSeconds(s: number | null | undefined) {
  if (!s) return "-";
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

function pct(n: number, total: number) {
  if (!total) return "-";
  return `${((n / total) * 100).toFixed(1)}%`;
}

function StatCard({
  icon, value, label, accent, color, sub,
}: { icon: React.ReactNode; value: string | number; label: string; accent?: boolean; color?: string; sub?: string }) {
  return (
    <div className={`adm-stat${accent ? " adm-stat--accent" : ""}`}
      style={color ? { borderTop: `2px solid ${color}` } : {}}>
      <div className="adm-stat__icon">{icon}</div>
      <div className="adm-stat__value">{value}</div>
      <div className="adm-stat__label">{label}</div>
      {sub && <div style={{ fontSize: 10, color: "var(--adm-muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

// Simple SVG bar chart for daily trend
function DailyTrendChart({ data, range }: { data: Summary["daily_trend"]; range: DateRange }) {
  const byDay = useMemo(() => {
    const map: Record<string, number> = {};
    data.forEach(({ day, event_type, total }) => {
      if (event_type === "page_view") {
        const key = String(day).slice(0, 10);
        map[key] = (map[key] || 0) + total;
      }
    });
    // Generate all days in range
    const result: Array<{ day: string; label: string; pv: number }> = [];
    let cur = startOfDay(range.start);
    const end = startOfDay(range.end);
    while (cur <= end) {
      const key = toIso(cur);
      const label = `${cur.getMonth() + 1}/${cur.getDate()}`;
      result.push({ day: key, label, pv: map[key] || 0 });
      cur = addDays(cur, 1);
    }
    return result;
  }, [data, range]);

  const maxPv = Math.max(...byDay.map((d) => d.pv), 1);
  const chartH = 80;
  const barW = Math.max(4, Math.floor((700 - byDay.length * 2) / byDay.length));
  const totalW = byDay.length * (barW + 2);

  if (!data.length) {
    return (
      <div style={{ textAlign: "center", color: "var(--adm-muted)", padding: "32px 0", fontSize: 13 }}>
        No trend data yet - visit the site and come back here.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={Math.max(totalW, 300)} height={chartH + 32} style={{ display: "block" }}>
        {byDay.map((d, i) => {
          const h = Math.max(2, Math.round((d.pv / maxPv) * chartH));
          const x = i * (barW + 2);
          const y = chartH - h;
          return (
            <g key={d.day}>
              <rect
                x={x} y={y} width={barW} height={h}
                fill="var(--adm-accent)" opacity={d.pv ? 0.85 : 0.15}
                rx={2}
              />
              <title>{d.day}: {d.pv} page views</title>
              {byDay.length <= 31 && (
                <text x={x + barW / 2} y={chartH + 18} textAnchor="middle"
                  fill="var(--adm-muted)" fontSize={9}
                  style={{ fontFamily: "monospace" }}>
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// CSS conversion funnel
function ConversionFunnel({ steps }: { steps: Summary["conversion_funnel"] }) {
  const max = Math.max(...steps.map((s) => s.count), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {steps.map((step, i) => (
        <div key={step.step}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
            <span style={{ color: "var(--adm-text)", fontWeight: i === 0 ? 600 : 400 }}>{step.step}</span>
            <span style={{ fontWeight: 700, color: "var(--adm-accent)" }}>{step.count.toLocaleString()}</span>
          </div>
          <div style={{ height: 8, background: "var(--adm-border)", borderRadius: 4 }}>
            <div style={{
              width: `${Math.max(2, (step.count / max) * 100)}%`,
              height: "100%",
              background: i === 0 ? "var(--adm-accent)" : i < 3 ? "#22d3ee88" : "var(--adm-green)",
              borderRadius: 4,
              transition: "width 0.4s ease",
            }} />
          </div>
          {i < steps.length - 1 && step.count > 0 && steps[i + 1].count > 0 && (
            <div style={{ fontSize: 10, color: "var(--adm-muted)", textAlign: "right", marginTop: 2 }}>
              → {pct(steps[i + 1].count, step.count)} conversion
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [eventsTotal, setEventsTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>(() => PRESETS[4].range()); // Last 30 days
  const [tab, setTab] = useState<Tab>("overview");
  const [eventPage, setEventPage] = useState(0);
  const [eventFilter, setEventFilter] = useState("all");
  const [eventSearch, setEventSearch] = useState("");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        start: toIso(dateRange.start),
        end: toIso(dateRange.end),
      });
      const res = await fetch(api(`/events/summary?${params}`), { headers: authHdr() });
      if (!res.ok) {
        let bodyText = "";
        try { bodyText = JSON.stringify(await res.json()); } catch { bodyText = await res.text().catch(() => ""); }
        throw new Error(`HTTP ${res.status} ${bodyText}`);
      }
      const data = await res.json();
      if (!data || typeof data !== "object" || !("total_events" in data)) {
        throw new Error("Backend returned empty summary - check server logs");
      }
      setSummary(data as Summary);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`Failed to load analytics: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  const loadEvents = useCallback(async () => {
    setEventsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(eventPage * PAGE_SIZE),
      });
      if (eventFilter !== "all") params.set("event_type", eventFilter);
      const res = await fetch(api(`/events?${params}`), { headers: authHdr() });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(data.events ?? []);
      setEventsTotal(data.total ?? 0);
    } catch { /* ignore */ }
    finally { setEventsLoading(false); }
  }, [eventPage, eventFilter]);

  useEffect(() => { loadSummary(); }, [loadSummary]);
  // Also refresh immediately when the selected date range changes (defensive).
  useEffect(() => { loadSummary(); }, [dateRange]);
  useEffect(() => { if (tab === "events") loadEvents(); }, [tab, loadEvents]);

  // ── Derived values ──────────────────────────────────────────────────────────

  const totalCTAs = useMemo(() =>
    (summary?.total_by_type ?? [])
      .filter((r) => ["cta_click", "nav_click"].includes(r.event_type))
      .reduce((s, r) => s + r.total, 0),
  [summary]);

  const formFunnelGrouped = useMemo(() => {
    const g: Record<string, Record<string, number>> = {};
    (summary?.form_funnel ?? []).forEach(({ event_type, form_name, total }) => {
      if (!g[form_name]) g[form_name] = {};
      g[form_name][event_type] = total;
    });
    return g;
  }, [summary]);

  const filteredEvents = useMemo(() => {
    const q = eventSearch.trim().toLowerCase();
    // Always exclude internal admin/login paths from the raw event stream
    const publicOnly = events.filter(
      (e) => !e.page_path || (!/^\/(admin|login)(\/|$)/.test(e.page_path))
    );
    if (!q) return publicOnly;
    return publicOnly.filter((e) =>
      e.page_path?.toLowerCase().includes(q) ||
      e.event_type?.toLowerCase().includes(q) ||
      e.country?.toLowerCase().includes(q) ||
      e.city?.toLowerCase().includes(q) ||
      e.referrer?.toLowerCase().includes(q) ||
      JSON.stringify(e.meta ?? {}).toLowerCase().includes(q)
    );
  }, [events, eventSearch]);

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview",   label: "Overview",   icon: <BarChart2 size={13} /> },
    { key: "clicks",     label: "CTA & Links", icon: <MousePointerClick size={13} /> },
    { key: "engagement", label: "Engagement", icon: <TrendingUp size={13} /> },
    { key: "audience",   label: "Audience",   icon: <Globe size={13} /> },
    { key: "events",     label: "Raw Events", icon: <Activity size={13} /> },
  ];

  const eventTypeBadgeColor = (t: string) => {
    const map: Record<string, string> = {
      page_view: "var(--adm-accent)",
      cta_click: "var(--adm-green)",
      nav_click: "#a78bfa",
      outbound_click: "#f59e0b",
      lead_captured: "#f97316",
      subscriber_joined: "#10b981",
      hubspot_meeting_open: "#ec4899",
      form_submit: "#22d3ee",
      scroll_depth: "#6366f1",
      time_on_page: "#84cc16",
    };
    return map[t] ?? "var(--adm-muted)";
  };

  return (
    <AdminLayout
      title="Analytics"
      actions={
        <>
          <DateRangePicker value={dateRange} onChange={(r) => { setDateRange(r); }} />
          <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={loadSummary} title="Refresh">
            <RefreshCw size={13} className={loading ? "adm-spin" : ""} />
          </button>
        </>
      }
    >
      {/* Public-site-only notice */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
        padding: "8px 12px", borderRadius: 8,
        background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)",
        fontSize: 12, color: "var(--adm-muted)",
      }}>
        <Globe size={13} style={{ color: "var(--adm-accent)", flexShrink: 0 }} />
        <span>Showing <strong style={{ color: "var(--adm-text)" }}>public site</strong> traffic only - admin &amp; login pages are excluded from all metrics.</span>
      </div>

      {error && (
        <div className="adm-alert adm-alert--error" style={{ marginBottom: 16 }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* ── Hero stats ──────────────────────────────────────────────────────── */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <StatCard accent icon={<Eye size={20} />}
          value={loading ? "-" : (summary?.total_page_views ?? 0).toLocaleString()}
          label="Page Views" sub="public site only" />
        <StatCard icon={<Users size={20} />}
          value={loading ? "-" : (summary?.unique_sessions ?? 0).toLocaleString()}
          label="Sessions" />
        <StatCard icon={<Zap size={20} />} color="#a78bfa"
          value={loading ? "-" : (summary?.unique_ips ?? 0).toLocaleString()}
          label="Unique Visitors" />
        <StatCard icon={<MousePointerClick size={20} />} color="var(--adm-green)"
          value={loading ? "-" : totalCTAs.toLocaleString()}
          label="CTA Clicks" />
        <StatCard icon={<Clock size={20} />} color="#f59e0b"
          value={loading ? "-" : fmtSeconds(summary?.time_on_page?.median_seconds)}
          label="Median Time on Page" />
        <StatCard icon={<Target size={20} />} color="#f97316"
          value={loading ? "-" : (
            (summary?.conversion_funnel?.find((s) => s.step === "Leads Captured")?.count ?? 0).toLocaleString()
          )}
          label="Leads Captured" />
        <StatCard icon={<Mail size={20} />} color="#10b981"
          value={loading ? "-" : (
            (summary?.conversion_funnel?.find((s) => s.step === "Newsletter Subs")?.count ?? 0).toLocaleString()
          )}
          label="New Subscribers" />
        <StatCard icon={<Activity size={20} />}
          value={loading ? "-" : `${summary?.bounce_rate ?? 0}%`}
          label="Bounce Rate"
          sub={`${(summary?.avg_pages_per_session ?? 0).toFixed(1)} pages/session`} />
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="adm-tabs" style={{ marginBottom: 20 }}>
        {TABS.map((t) => (
          <button key={t.key}
            className={`adm-tab${tab === t.key ? " active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {t.icon} {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: OVERVIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div>
          {/* Daily trend chart */}
          <div className="adm-card" style={{ marginBottom: 20 }}>
            <div className="adm-card__title" style={{ marginBottom: 12 }}>
              <TrendingUp size={13} /> Page Views - Daily Trend
              <span style={{ fontSize: 11, color: "var(--adm-muted)", marginLeft: 8, fontWeight: 400 }}>
                ({formatRange(dateRange)})
              </span>
            </div>
            {loading
              ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div>
              : <DailyTrendChart data={summary?.daily_trend ?? []} range={dateRange} />
            }
          </div>

          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Top pages */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Eye size={13} style={{ display: "inline", marginRight: 6 }} />
                  Top Pages
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th style={{ textAlign: "right" }}>Views</th>
                        <th style={{ textAlign: "right" }}>Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.top_pages?.length
                        ? <tr><td colSpan={3} className="adm-table__empty">No page views yet.</td></tr>
                        : summary.top_pages.map((p) => (
                          <tr key={p.page_path}>
                            <td className="adm-truncate" style={{ maxWidth: 200, fontSize: 12 }}>
                              {p.page_path || "/"}
                            </td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>
                              {p.views.toLocaleString()}
                            </td>
                            <td style={{ textAlign: "right", color: "var(--adm-muted)", fontSize: 12 }}>
                              {p.unique_sessions?.toLocaleString() ?? "-"}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>

            {/* Conversion funnel */}
            <div className="adm-card">
              <div className="adm-card__title" style={{ marginBottom: 14 }}>
                <Target size={13} /> Conversion Funnel
              </div>
              {loading
                ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div>
                : <ConversionFunnel steps={summary?.conversion_funnel ?? []} />
              }
            </div>
          </div>

          {/* Events by type */}
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar">
              <div className="adm-table-toolbar__title">
                <Activity size={13} style={{ display: "inline", marginRight: 6 }} />
                All Event Types
              </div>
            </div>
            {loading
              ? <div className="adm-table__loading">Loading…</div>
              : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Event Type</th>
                      <th style={{ textAlign: "right" }}>Count</th>
                      <th style={{ textAlign: "right" }}>Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!summary?.total_by_type?.length
                      ? <tr>
                          <td colSpan={3} className="adm-table__empty">
                            No events yet. Visit the website to generate analytics data.
                          </td>
                        </tr>
                      : summary.total_by_type.map((r) => (
                        <tr key={r.event_type}>
                          <td>
                            <span className="adm-badge" style={{
                              background: `${eventTypeBadgeColor(r.event_type)}22`,
                              color: eventTypeBadgeColor(r.event_type),
                              border: `1px solid ${eventTypeBadgeColor(r.event_type)}44`,
                            }}>
                              {r.event_type}
                            </span>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>
                            {r.total.toLocaleString()}
                          </td>
                          <td style={{ textAlign: "right", color: "var(--adm-muted)", fontSize: 12 }}>
                            {pct(r.total, summary.total_events)}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: CTA & LINKS
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "clicks" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* CTA / Nav clicks */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <MousePointerClick size={13} style={{ display: "inline", marginRight: 6 }} />
                  CTA & Button Clicks
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Label</th>
                        <th>Category</th>
                        <th style={{ textAlign: "right" }}>Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.cta_clicks?.length
                        ? <tr>
                            <td colSpan={3} className="adm-table__empty">
                              No CTA clicks yet. Tracking active - data will appear as users interact.
                            </td>
                          </tr>
                        : summary.cta_clicks.map((e, i) => (
                          <tr key={i}>
                            <td style={{ maxWidth: 240 }}>
                              <div className="adm-truncate" style={{ fontSize: 12, fontWeight: 500 }}>
                                {e.label || "-"}
                              </div>
                              {e.href && (
                                <div className="adm-truncate"
                                  style={{ fontSize: 10, color: "var(--adm-muted)", maxWidth: 220 }}>
                                  {e.href}
                                </div>
                              )}
                            </td>
                            <td>
                              <span className="adm-badge adm-badge--dim">{e.category}</span>
                            </td>
                            <td style={{ textAlign: "right", fontWeight: 700 }}>
                              {e.total.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>

            {/* Outbound clicks */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <ArrowUpRight size={13} style={{ display: "inline", marginRight: 6 }} />
                  Outbound Link Clicks
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th style={{ textAlign: "right" }}>Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.outbound_clicks?.length
                        ? <tr>
                            <td colSpan={2} className="adm-table__empty">
                              No outbound link clicks recorded yet.
                            </td>
                          </tr>
                        : summary.outbound_clicks.map((o, i) => (
                          <tr key={i}>
                            <td className="adm-truncate"
                              style={{ maxWidth: 260, fontSize: 11, color: "var(--adm-accent)" }}>
                              {o.destination}
                            </td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>
                              {o.clicks.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>
          </div>

          {/* Form funnel */}
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar">
              <div className="adm-table-toolbar__title">
                <FileInput size={13} style={{ display: "inline", marginRight: 6 }} />
                Form Interaction Funnel
              </div>
            </div>
            {loading
              ? <div className="adm-table__loading">Loading…</div>
              : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Form</th>
                      <th style={{ textAlign: "right" }}>Started</th>
                      <th style={{ textAlign: "right" }}>Submitted</th>
                      <th style={{ textAlign: "right" }}>Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!Object.keys(formFunnelGrouped).length
                      ? <tr>
                          <td colSpan={4} className="adm-table__empty">
                            No form interaction data. Active tracking on: contact, get-started, newsletter forms.
                          </td>
                        </tr>
                      : Object.entries(formFunnelGrouped).map(([form, counts]) => {
                          const started = counts["form_start"] ?? 0;
                          const submitted = counts["form_submit"] ?? 0;
                          const conv = started ? ((submitted / started) * 100).toFixed(0) + "%" : "-";
                          return (
                            <tr key={form}>
                              <td style={{ fontWeight: 500 }}>{form}</td>
                              <td style={{ textAlign: "right" }}>{started}</td>
                              <td style={{
                                textAlign: "right",
                                color: "var(--adm-green)",
                                fontWeight: 600,
                              }}>{submitted}</td>
                              <td style={{
                                textAlign: "right",
                                color: "var(--adm-accent)",
                                fontWeight: 700,
                              }}>{conv}</td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </table>
              )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: ENGAGEMENT
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "engagement" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Time on page */}
            <div className="adm-card">
              <div className="adm-card__title" style={{ marginBottom: 14 }}>
                <Clock size={13} /> Time on Page
              </div>
              {loading
                ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div>
                : summary?.time_on_page?.sample_size
                  ? (
                    <div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                        {[
                          ["Average", fmtSeconds(summary.time_on_page.avg_seconds)],
                          ["Median", fmtSeconds(summary.time_on_page.median_seconds)],
                          ["Samples", summary.time_on_page.sample_size.toLocaleString()],
                        ].map(([k, v]) => (
                          <div key={k} className="adm-stat" style={{ padding: "10px 14px" }}>
                            <div className="adm-stat__value" style={{ fontSize: 20 }}>{v}</div>
                            <div className="adm-stat__label">{k}</div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, color: "var(--adm-muted)", margin: 0 }}>
                        Measures visible time only - pauses when the tab is hidden.
                      </p>
                    </div>
                  )
                  : <p style={{ color: "var(--adm-muted)", fontSize: 13 }}>
                      No time-on-page data yet. Data tracks when users navigate away or switch tabs.
                    </p>
              }
            </div>

            {/* Avg pages per session */}
            <div className="adm-card">
              <div className="adm-card__title" style={{ marginBottom: 14 }}>
                <BarChart2 size={13} /> Session Depth
              </div>
              {loading
                ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div>
                : (
                  <div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                      {[
                        ["Avg Pages / Session", summary?.avg_pages_per_session?.toFixed(1) ?? "-"],
                        ["Total Sessions", (summary?.unique_sessions ?? 0).toLocaleString()],
                      ].map(([k, v]) => (
                        <div key={k} className="adm-stat" style={{ padding: "10px 14px" }}>
                          <div className="adm-stat__value" style={{ fontSize: 20 }}>{v}</div>
                          <div className="adm-stat__label">{k}</div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 11, color: "var(--adm-muted)", margin: 0 }}>
                      Sessions are identified by a per-browser session ID.
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Scroll depth */}
          <div className="adm-card" style={{ marginBottom: 20 }}>
            <div className="adm-card__title" style={{ marginBottom: 14 }}>
              <TrendingUp size={13} /> Scroll Depth Milestones
            </div>
            {loading
              ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div>
              : !summary?.scroll_summary?.length
                ? <p style={{ color: "var(--adm-muted)", fontSize: 13 }}>
                    No scroll data yet. Tracks milestones at 25%, 50%, 75%, 90% of page.
                  </p>
                : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                    {summary.scroll_summary.map((s) => {
                      const maxSessions = summary.scroll_summary[0]?.sessions || 1;
                      const widthPct = (s.sessions / maxSessions) * 100;
                      return (
                        <div key={s.depth_pct}>
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                            fontSize: 13,
                          }}>
                            <span style={{ fontWeight: 600 }}>{s.depth_pct}% scrolled</span>
                            <span style={{ color: "var(--adm-accent)", fontWeight: 700 }}>
                              {s.sessions.toLocaleString()} sessions
                            </span>
                          </div>
                          <div style={{ height: 8, background: "var(--adm-border)", borderRadius: 4 }}>
                            <div style={{
                              width: `${widthPct}%`,
                              height: "100%",
                              background: "var(--adm-accent)",
                              borderRadius: 4,
                              transition: "width 0.4s ease",
                            }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
          </div>

          {/* Daily event breakdown by type (stacked summary) */}
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar">
              <div className="adm-table-toolbar__title">
                <Activity size={13} style={{ display: "inline", marginRight: 6 }} />
                Daily Breakdown (all types)
              </div>
            </div>
            {loading
              ? <div className="adm-table__loading">Loading…</div>
              : (() => {
                  // Group daily_trend by day
                  const byDay: Record<string, Record<string, number>> = {};
                  (summary?.daily_trend ?? []).forEach(({ day, event_type, total }) => {
                    const d = String(day).slice(0, 10);
                    if (!byDay[d]) byDay[d] = {};
                    byDay[d][event_type] = total;
                  });
                  const days_sorted = Object.keys(byDay).sort().reverse();
                  const types = [...new Set(
                    (summary?.daily_trend ?? []).map((r) => r.event_type)
                  )].sort();
                  if (!days_sorted.length) return (
                    <div className="adm-table__empty">No data for this period.</div>
                  );
                  return (
                    <div className="adm-table-scroll">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            {types.map((t) => (
                              <th key={t} style={{ textAlign: "right", fontSize: 10 }}>{t}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {days_sorted.map((d) => (
                            <tr key={d}>
                              <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{d}</td>
                              {types.map((t) => (
                                <td key={t} style={{
                                  textAlign: "right",
                                  fontSize: 12,
                                  fontWeight: byDay[d][t] ? 600 : 400,
                                  color: byDay[d][t] ? "var(--adm-text)" : "var(--adm-dim)",
                                }}>
                                  {byDay[d][t] ?? "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()
            }
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: AUDIENCE
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "audience" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Countries */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Globe size={13} style={{ display: "inline", marginRight: 6 }} />
                  Top Countries
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th style={{ textAlign: "right" }}>Sessions</th>
                        <th style={{ textAlign: "right" }}>Events</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.top_countries?.length
                        ? <tr><td colSpan={3} className="adm-table__empty">No geo data yet.</td></tr>
                        : summary.top_countries.map((c) => (
                          <tr key={c.country}>
                            <td>{c.country || "Unknown"}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>
                              {c.sessions?.toLocaleString() ?? "-"}
                            </td>
                            <td style={{ textAlign: "right", color: "var(--adm-muted)", fontSize: 12 }}>
                              {c.events.toLocaleString()}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>

            {/* Cities */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <MapPin size={13} style={{ display: "inline", marginRight: 6 }} />
                  Top Cities
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>City</th>
                        <th>Country</th>
                        <th style={{ textAlign: "right" }}>Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.top_cities?.length
                        ? <tr><td colSpan={3} className="adm-table__empty">No city-level geo data yet.</td></tr>
                        : summary.top_cities.map((c, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 500 }}>{c.city}</td>
                            <td style={{ color: "var(--adm-muted)", fontSize: 12 }}>{c.country}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{c.sessions}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>
          </div>

          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Referrer sources */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Link2 size={13} style={{ display: "inline", marginRight: 6 }} />
                  Traffic Sources (Referrers)
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Source Domain</th>
                        <th style={{ textAlign: "right" }}>Sessions</th>
                        <th style={{ textAlign: "right" }}>Page Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.referrer_summary?.length
                        ? <tr>
                            <td colSpan={3} className="adm-table__empty">No referrer data yet.</td>
                          </tr>
                        : summary.referrer_summary.map((r, i) => (
                          <tr key={i}>
                            <td style={{ fontSize: 12 }}>{r.domain}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{r.sessions}</td>
                            <td style={{ textAlign: "right", color: "var(--adm-muted)", fontSize: 12 }}>
                              {r.page_views}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                )}
            </div>

            {/* UTM Campaigns */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Target size={13} style={{ display: "inline", marginRight: 6 }} />
                  UTM Campaigns
                </div>
              </div>
              {loading
                ? <div className="adm-table__loading">Loading…</div>
                : (
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Source</th>
                        <th>Medium</th>
                        <th>Campaign</th>
                        <th style={{ textAlign: "right" }}>Sessions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!summary?.utm_summary?.filter(u =>
                          u.utm_source !== "(none)" || u.utm_medium !== "(none)"
                        ).length
                        ? <tr>
                            <td colSpan={4} className="adm-table__empty">
                              No UTM-tagged traffic yet. Add ?utm_source=... to your links.
                            </td>
                          </tr>
                        : summary.utm_summary
                            .filter((u) => u.utm_source !== "(none)" || u.utm_campaign !== "(none)")
                            .map((u, i) => (
                              <tr key={i}>
                                <td style={{ fontSize: 12 }}>{u.utm_source}</td>
                                <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{u.utm_medium}</td>
                                <td style={{ fontSize: 12 }}>{u.utm_campaign}</td>
                                <td style={{ textAlign: "right", fontWeight: 600 }}>{u.sessions}</td>
                              </tr>
                            ))
                      }
                    </tbody>
                  </table>
                )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB: RAW EVENTS
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === "events" && (
        <div className="adm-table-wrap">
          <div className="adm-table-toolbar">
            <div className="adm-search-wrap">
              <Search size={14} />
              <input
                className="adm-search"
                placeholder="Search path, type, country, meta…"
                value={eventSearch}
                onChange={(e) => setEventSearch(e.target.value)}
              />
            </div>
            <div className="adm-table-toolbar__actions">
              <select
                className="adm-select"
                style={{ width: "auto", padding: "7px 10px" }}
                value={eventFilter}
                onChange={(e) => { setEventFilter(e.target.value); setEventPage(0); }}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>
                ))}
              </select>
              <button
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={loadEvents}
                title="Refresh events"
              >
                <RefreshCw size={13} className={eventsLoading ? "adm-spin" : ""} />
              </button>
            </div>
          </div>

          {eventsLoading
            ? <div className="adm-table__loading">Loading events…</div>
            : (
              <div className="adm-table-scroll">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Type</th>
                      <th>Page</th>
                      <th>Meta</th>
                      <th>Location</th>
                      <th>Referrer</th>
                      <th>UTM</th>
                      <th>Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.length === 0
                      ? (
                        <tr>
                          <td colSpan={8} className="adm-table__empty">
                            {eventSearch ? "No events match your search." : "No events in this time period."}
                          </td>
                        </tr>
                      )
                      : filteredEvents.map((ev) => {
                          const label = ev.meta?.label as string | undefined;
                          const metaStr = ev.meta
                            ? Object.entries(ev.meta)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(" · ")
                            : "";
                          const isExpanded = expandedEvent === ev.id;
                          return (
                            <>
                              <tr
                                key={ev.id}
                                style={{ cursor: ev.meta ? "pointer" : "default" }}
                                onClick={() => setExpandedEvent(isExpanded ? null : ev.id)}
                              >
                                <td style={{
                                  fontSize: 11,
                                  color: "var(--adm-muted)",
                                  whiteSpace: "nowrap",
                                }}>
                                  {new Date(ev.created_at).toLocaleString()}
                                </td>
                                <td>
                                  <span className="adm-badge" style={{
                                    background: `${eventTypeBadgeColor(ev.event_type)}22`,
                                    color: eventTypeBadgeColor(ev.event_type),
                                    border: `1px solid ${eventTypeBadgeColor(ev.event_type)}44`,
                                    fontSize: 10,
                                    whiteSpace: "nowrap",
                                  }}>
                                    {ev.event_type}
                                  </span>
                                </td>
                                <td className="adm-truncate"
                                  style={{ maxWidth: 140, fontSize: 11 }}>
                                  {ev.page_path || "-"}
                                </td>
                                <td style={{
                                  fontSize: 11,
                                  maxWidth: 180,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  color: label ? "var(--adm-text)" : "var(--adm-dim)",
                                }} title={metaStr}>
                                  {label || metaStr || "-"}
                                </td>
                                <td style={{ fontSize: 11, color: "var(--adm-muted)", whiteSpace: "nowrap" }}>
                                  {[ev.city, ev.country].filter(Boolean).join(", ") || "-"}
                                </td>
                                <td className="adm-truncate"
                                  style={{ maxWidth: 120, fontSize: 10, color: "var(--adm-muted)" }}>
                                  {ev.referrer || "direct"}
                                </td>
                                <td style={{ fontSize: 11, color: "var(--adm-muted)" }}>
                                  {[ev.utm_source, ev.utm_medium, ev.utm_campaign]
                                    .filter(Boolean).join(" / ") || "-"}
                                </td>
                                <td className="adm-mono" style={{ fontSize: 10, whiteSpace: "nowrap" }}>
                                  {ev.session_id?.slice(0, 8)}…
                                </td>
                              </tr>
                              {isExpanded && ev.meta && (
                                <tr key={`${ev.id}-expanded`}>
                                  <td colSpan={8} style={{
                                    background: "var(--adm-panel-bg)",
                                    padding: "10px 16px",
                                    fontSize: 11,
                                  }}>
                                    <strong style={{ color: "var(--adm-accent)" }}>Meta: </strong>
                                    <code style={{ color: "var(--adm-text)" }}>
                                      {JSON.stringify(ev.meta, null, 2)}
                                    </code>
                                    {ev.user_agent && (
                                      <div style={{ marginTop: 4, color: "var(--adm-muted)" }}>
                                        <strong>UA:</strong> {ev.user_agent}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })
                    }
                  </tbody>
                </table>
              </div>
            )}

          <div className="adm-pagination">
            <span className="adm-pagination__info">
              Page {eventPage + 1}
              {eventsTotal > 0 && ` · ${eventsTotal.toLocaleString()} total`}
            </span>
            <button
              className="adm-btn adm-btn--ghost adm-btn--sm"
              disabled={eventPage === 0}
              onClick={() => setEventPage((p) => p - 1)}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="adm-btn adm-btn--ghost adm-btn--sm"
              disabled={filteredEvents.length < PAGE_SIZE}
              onClick={() => setEventPage((p) => p + 1)}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
