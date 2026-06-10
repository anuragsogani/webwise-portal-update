import { useState, useEffect, useCallback } from "react";
import {
  BarChart2, RefreshCw, AlertCircle, Globe,
  MousePointerClick, Activity, Eye, ChevronLeft, ChevronRight,
  Search, Users, Clock, TrendingUp, Link2, FileInput,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

interface Summary {
  days: number;
  unique_sessions: number;
  total_by_type: Array<{ event_type: string; total: number }>;
  top_pages: Array<{ page_path: string; views: number }>;
  top_countries: Array<{ country: string; events: number }>;
  cta_clicks: Array<{ label: string; category: string; total: number }>;
  top_cta_events: Array<{ label: string; total: number }>;
  scroll_summary: Array<{ depth_pct: string; sessions: number }>;
  time_on_page: { avg_seconds: number; median_seconds: number; sample_size: number } | null;
  outbound_clicks: Array<{ destination: string; clicks: number }>;
  form_funnel: Array<{ event_type: string; form_name: string; total: number }>;
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
  meta: Record<string, unknown> | null;
}

const DAYS_OPTIONS = [7, 14, 30, 90, 365];
const PAGE_SIZE = 50;
const EVENT_TYPES = ["all", "page_view", "cta_click", "nav_click", "outbound_click", "scroll_depth", "time_on_page", "form_start", "form_submit"];

type Tab = "overview" | "clicks" | "engagement" | "events";

function fmtSeconds(s: number | null | undefined) {
  if (!s) return "—";
  if (s < 60) return `${Math.round(s)}s`;
  return `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [tab, setTab] = useState<Tab>("overview");
  const [eventPage, setEventPage] = useState(0);
  const [eventFilter, setEventFilter] = useState("all");
  const [eventSearch, setEventSearch] = useState("");

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(api(`/events/summary?days=${days}`), { headers: authHdr() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSummary(await res.json());
    } catch (e: any) {
      setError(`Failed to load analytics. ${e.message}. Make sure you are logged in.`);
    } finally {
      setLoading(false);
    }
  }, [days]);

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
    } catch { }
    finally { setEventsLoading(false); }
  }, [eventPage, eventFilter]);

  useEffect(() => { loadSummary(); }, [loadSummary]);
  useEffect(() => { if (tab === "events") loadEvents(); }, [tab, loadEvents]);

  const totalPageViews = summary?.total_by_type?.find((r) => r.event_type === "page_view")?.total ?? 0;
  const totalEvents = summary?.total_by_type?.reduce((s, r) => s + r.total, 0) ?? 0;
  const totalCTAs = summary?.total_by_type?.filter((r) => ["cta_click", "nav_click"].includes(r.event_type)).reduce((s, r) => s + r.total, 0) ?? 0;

  const filteredEvents = eventSearch.trim()
    ? events.filter((e) =>
        e.page_path?.includes(eventSearch) ||
        e.event_type?.includes(eventSearch) ||
        e.country?.toLowerCase().includes(eventSearch.toLowerCase())
      )
    : events;

  // Form funnel grouped by form_name
  const formFunnelGrouped: Record<string, Record<string, number>> = {};
  (summary?.form_funnel ?? []).forEach(({ event_type, form_name, total }) => {
    if (!formFunnelGrouped[form_name]) formFunnelGrouped[form_name] = {};
    formFunnelGrouped[form_name][event_type] = total;
  });

  const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <BarChart2 size={13} /> },
    { key: "clicks", label: "CTA & Links", icon: <MousePointerClick size={13} /> },
    { key: "engagement", label: "Engagement", icon: <TrendingUp size={13} /> },
    { key: "events", label: "Raw Events", icon: <Activity size={13} /> },
  ];

  return (
    <AdminLayout
      title="Analytics"
      actions={
        <>
          <select
            className="adm-select"
            style={{ width: "auto", padding: "7px 10px" }}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            {DAYS_OPTIONS.map((d) => <option key={d} value={d}>Last {d} days</option>)}
          </select>
          <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={loadSummary}>
            <RefreshCw size={13} className={loading ? "adm-spin" : ""} />
          </button>
        </>
      }
    >
      {error && <div className="adm-alert adm-alert--error"><AlertCircle size={16} /> {error}</div>}

      {/* Top stats */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <div className="adm-stat adm-stat--accent">
          <div className="adm-stat__icon"><Eye size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalPageViews.toLocaleString()}</div>
          <div className="adm-stat__label">Page Views</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><Users size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : (summary?.unique_sessions ?? 0).toLocaleString()}</div>
          <div className="adm-stat__label">Unique Sessions</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__icon"><MousePointerClick size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalCTAs.toLocaleString()}</div>
          <div className="adm-stat__label">CTA / Nav Clicks</div>
        </div>
        <div className="adm-stat adm-stat--yellow">
          <div className="adm-stat__icon"><Clock size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : fmtSeconds(summary?.time_on_page?.median_seconds)}</div>
          <div className="adm-stat__label">Median Time on Page</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><Globe size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : (summary?.top_countries?.length ?? 0)}</div>
          <div className="adm-stat__label">Countries</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><Activity size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalEvents.toLocaleString()}</div>
          <div className="adm-stat__label">Total Events</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`adm-tab${tab === t.key ? " active" : ""}`} onClick={() => setTab(t.key)}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{t.icon} {t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Overview ─────────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Top Pages */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title"><Eye size={13} style={{ display: "inline", marginRight: 6 }} />Top Pages</div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Page</th><th style={{ textAlign: "right" }}>Views</th></tr></thead>
                  <tbody>
                    {!summary?.top_pages?.length
                      ? <tr><td colSpan={2} className="adm-table__empty">No data yet — page views will appear here after visitors browse the site.</td></tr>
                      : summary.top_pages.map((p) => (
                          <tr key={p.page_path}>
                            <td className="adm-truncate" style={{ maxWidth: 240 }}>{p.page_path}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{p.views.toLocaleString()}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Top Countries */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title"><Globe size={13} style={{ display: "inline", marginRight: 6 }} />Top Countries</div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Country</th><th style={{ textAlign: "right" }}>Events</th></tr></thead>
                  <tbody>
                    {!summary?.top_countries?.length
                      ? <tr><td colSpan={2} className="adm-table__empty">No geo data yet.</td></tr>
                      : summary.top_countries.map((c) => (
                          <tr key={c.country}>
                            <td>{c.country || "Unknown"}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{c.events.toLocaleString()}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Events breakdown */}
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar">
              <div className="adm-table-toolbar__title"><Activity size={13} style={{ display: "inline", marginRight: 6 }} />Events Breakdown (all types)</div>
            </div>
            {loading ? <div className="adm-table__loading">Loading…</div> : (
              <table className="adm-table">
                <thead><tr><th>Event Type</th><th style={{ textAlign: "right" }}>Total</th><th style={{ textAlign: "right" }}>% of all</th></tr></thead>
                <tbody>
                  {!summary?.total_by_type?.length
                    ? <tr><td colSpan={3} className="adm-table__empty">No events recorded yet — events will appear here as visitors interact with the site.</td></tr>
                    : summary.total_by_type.map((r) => (
                        <tr key={r.event_type}>
                          <td><span className="adm-badge adm-badge--info">{r.event_type}</span></td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>{r.total.toLocaleString()}</td>
                          <td style={{ textAlign: "right", color: "var(--adm-muted)", fontSize: 12 }}>
                            {totalEvents ? `${((r.total / totalEvents) * 100).toFixed(1)}%` : "—"}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── CTA & Links ──────────────────────────────────────────────────── */}
      {tab === "clicks" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* All CTA / Nav clicks */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title"><MousePointerClick size={13} style={{ display: "inline", marginRight: 6 }} />CTA & Navigation Clicks</div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Label</th><th>Category</th><th style={{ textAlign: "right" }}>Clicks</th></tr></thead>
                  <tbody>
                    {!summary?.cta_clicks?.length
                      ? <tr><td colSpan={3} className="adm-table__empty">No CTA clicks yet — tracking is now active. Data will appear as users click buttons and links.</td></tr>
                      : summary.cta_clicks.map((e, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 500, maxWidth: 280 }} className="adm-truncate">{e.label || "—"}</td>
                            <td><span className="adm-badge adm-badge--dim">{e.category || "cta"}</span></td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{e.total.toLocaleString()}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Outbound links */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title"><Link2 size={13} style={{ display: "inline", marginRight: 6 }} />Outbound Link Clicks</div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Destination</th><th style={{ textAlign: "right" }}>Clicks</th></tr></thead>
                  <tbody>
                    {!summary?.outbound_clicks?.length
                      ? <tr><td colSpan={2} className="adm-table__empty">No outbound clicks recorded yet.</td></tr>
                      : summary.outbound_clicks.map((o, i) => (
                          <tr key={i}>
                            <td className="adm-truncate" style={{ maxWidth: 260, fontSize: 12 }}>{o.destination}</td>
                            <td style={{ textAlign: "right", fontWeight: 600 }}>{o.clicks.toLocaleString()}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Form funnel */}
          <div className="adm-table-wrap">
            <div className="adm-table-toolbar">
              <div className="adm-table-toolbar__title"><FileInput size={13} style={{ display: "inline", marginRight: 6 }} />Form Interaction Funnel</div>
            </div>
            {loading ? <div className="adm-table__loading">Loading…</div> : (
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
                    ? <tr><td colSpan={4} className="adm-table__empty">No form interaction data yet. Active on: contact form, Get Started, newsletter.</td></tr>
                    : Object.entries(formFunnelGrouped).map(([form, counts]) => {
                        const started = counts["form_start"] ?? 0;
                        const submitted = counts["form_submit"] ?? 0;
                        const conv = started ? ((submitted / started) * 100).toFixed(0) + "%" : "—";
                        return (
                          <tr key={form}>
                            <td style={{ fontWeight: 500 }}>{form}</td>
                            <td style={{ textAlign: "right" }}>{started}</td>
                            <td style={{ textAlign: "right", color: "var(--adm-green)", fontWeight: 600 }}>{submitted}</td>
                            <td style={{ textAlign: "right", color: "var(--adm-accent)", fontWeight: 700 }}>{conv}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* ── Engagement ───────────────────────────────────────────────────── */}
      {tab === "engagement" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Time on page */}
            <div className="adm-card">
              <div className="adm-card__title"><Clock size={13} /> Time on Page</div>
              {loading ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div> : (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    {[
                      ["Average", fmtSeconds(summary?.time_on_page?.avg_seconds)],
                      ["Median", fmtSeconds(summary?.time_on_page?.median_seconds)],
                    ].map(([k, v]) => (
                      <div key={k} className="adm-stat" style={{ padding: "12px 16px" }}>
                        <div className="adm-stat__value" style={{ fontSize: 22 }}>{v}</div>
                        <div className="adm-stat__label">{k}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--adm-muted)" }}>
                    Based on {summary?.time_on_page?.sample_size ?? 0} page sessions tracked.
                    Tracks visible time (pauses when tab is hidden).
                  </p>
                </div>
              )}
            </div>

            {/* Scroll depth */}
            <div className="adm-card">
              <div className="adm-card__title"><TrendingUp size={13} /> Scroll Depth</div>
              {loading ? <div style={{ color: "var(--adm-muted)", fontSize: 13 }}>Loading…</div> : (
                <div>
                  {!summary?.scroll_summary?.length
                    ? <p style={{ color: "var(--adm-muted)", fontSize: 13 }}>No scroll data yet. Tracks at 25%, 50%, 75%, 90%.</p>
                    : summary.scroll_summary.map((s) => (
                        <div key={s.depth_pct} style={{ marginBottom: 12 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                            <span>{s.depth_pct}% scroll</span>
                            <span style={{ fontWeight: 600 }}>{s.sessions.toLocaleString()} sessions</span>
                          </div>
                          <div style={{ height: 6, background: "var(--adm-border)", borderRadius: 3 }}>
                            <div style={{
                              width: `${Math.min(100, (s.sessions / (summary.scroll_summary[0]?.sessions || 1)) * 100)}%`,
                              height: "100%",
                              background: "var(--adm-accent)",
                              borderRadius: 3,
                              transition: "width 0.3s",
                            }} />
                          </div>
                        </div>
                      ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Raw Events ───────────────────────────────────────────────────── */}
      {tab === "events" && (
        <div className="adm-table-wrap">
          <div className="adm-table-toolbar">
            <div className="adm-search-wrap">
              <Search size={14} />
              <input className="adm-search" placeholder="Search path, country…" value={eventSearch} onChange={(e) => setEventSearch(e.target.value)} />
            </div>
            <div className="adm-table-toolbar__actions">
              <select
                className="adm-select"
                style={{ width: "auto", padding: "7px 10px" }}
                value={eventFilter}
                onChange={(e) => { setEventFilter(e.target.value); setEventPage(0); }}
              >
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>)}
              </select>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={loadEvents}>
                <RefreshCw size={13} className={eventsLoading ? "adm-spin" : ""} />
              </button>
            </div>
          </div>

          {eventsLoading ? (
            <div className="adm-table__loading">Loading events…</div>
          ) : (
            <div className="adm-table-scroll">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Page</th>
                    <th>Meta / Label</th>
                    <th>Country</th>
                    <th>UTM</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length === 0 ? (
                    <tr><td colSpan={7} className="adm-table__empty">No events recorded yet.</td></tr>
                  ) : (
                    filteredEvents.map((ev) => {
                      const label = ev.meta?.label as string | undefined;
                      const metaStr = ev.meta
                        ? Object.entries(ev.meta).filter(([k]) => k !== "utm_source" && k !== "utm_medium" && k !== "utm_campaign").map(([k, v]) => `${k}:${v}`).join(" · ")
                        : "";
                      return (
                        <tr key={ev.id}>
                          <td style={{ fontSize: 11, color: "var(--adm-muted)", whiteSpace: "nowrap" }}>
                            {new Date(ev.created_at).toLocaleString()}
                          </td>
                          <td><span className="adm-badge adm-badge--info">{ev.event_type}</span></td>
                          <td className="adm-truncate" style={{ maxWidth: 160, fontSize: 12 }}>{ev.page_path || "—"}</td>
                          <td style={{ fontSize: 11, color: label ? "var(--adm-text)" : "var(--adm-dim)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            title={metaStr}>
                            {label || metaStr || "—"}
                          </td>
                          <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{[ev.city, ev.country].filter(Boolean).join(", ") || "—"}</td>
                          <td style={{ fontSize: 11, color: "var(--adm-muted)" }}>{ev.utm_source || "—"}</td>
                          <td className="adm-mono" style={{ fontSize: 11, whiteSpace: "nowrap" }}>{ev.session_id?.slice(0, 8)}…</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="adm-pagination">
            <span className="adm-pagination__info">Page {eventPage + 1}</span>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" disabled={eventPage === 0} onClick={() => setEventPage((p) => p - 1)}>
              <ChevronLeft size={14} />
            </button>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" disabled={filteredEvents.length < PAGE_SIZE} onClick={() => setEventPage((p) => p + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
