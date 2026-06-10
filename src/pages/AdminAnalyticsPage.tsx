import { useState, useEffect, useCallback } from "react";
import {
  BarChart2, RefreshCw, AlertCircle, Globe,
  MousePointerClick, Activity, Eye, ChevronLeft, ChevronRight,
  Search,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

interface Summary {
  total_by_type: Array<{ event_type: string; total: number }>;
  top_pages: Array<{ page_path: string; views: number }>;
  top_countries: Array<{ country: string; events: number }>;
  top_cta_events: Array<{ label: string; total: number }>;
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
  referrer: string;
}

const DAYS_OPTIONS = [7, 14, 30, 90, 365];
const PAGE_SIZE = 50;

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [events, setEvents] = useState<RawEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);
  const [tab, setTab] = useState<"overview" | "events">("overview");
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
      setError(`Failed to load analytics: ${e.message}. Make sure you are logged in.`);
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
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setEvents(data.events ?? []);
    } catch { /* */ }
    finally { setEventsLoading(false); }
  }, [eventPage, eventFilter]);

  useEffect(() => { loadSummary(); }, [loadSummary]);
  useEffect(() => { if (tab === "events") loadEvents(); }, [tab, loadEvents]);

  const totalPageViews = summary?.total_by_type?.find((r) => r.event_type === "page_view")?.total ?? 0;
  const totalEvents    = summary?.total_by_type?.reduce((s, r) => s + (r.total ?? 0), 0) ?? 0;
  const totalCTAs      = summary?.total_by_type?.find((r) => r.event_type === "cta_click")?.total ?? 0;
  const uniqueCountries = summary?.top_countries?.length ?? 0;

  const filteredEvents = eventSearch.trim()
    ? events.filter((e) =>
        e.page_path?.includes(eventSearch) ||
        e.event_type?.includes(eventSearch) ||
        e.country?.toLowerCase().includes(eventSearch.toLowerCase())
      )
    : events;

  const EVENT_TYPES = ["all", "page_view", "cta_click", "form_submit", "video_play", "scroll_depth"];

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

      {/* Stats */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <div className="adm-stat adm-stat--accent">
          <div className="adm-stat__icon"><Eye size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalPageViews}</div>
          <div className="adm-stat__label">Page Views</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><Activity size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalEvents}</div>
          <div className="adm-stat__label">Total Events</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__icon"><MousePointerClick size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : totalCTAs}</div>
          <div className="adm-stat__label">CTA Clicks</div>
        </div>
        <div className="adm-stat adm-stat--yellow">
          <div className="adm-stat__icon"><Globe size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : uniqueCountries}</div>
          <div className="adm-stat__label">Countries</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        <button className={`adm-tab${tab === "overview" ? " active" : ""}`} onClick={() => setTab("overview")}>
          Overview
        </button>
        <button className={`adm-tab${tab === "events" ? " active" : ""}`} onClick={() => setTab("events")}>
          Raw Events
        </button>
      </div>

      {tab === "overview" && (
        <div>
          <div className="adm-panel-grid" style={{ marginBottom: 20 }}>
            {/* Top Pages */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <BarChart2 size={14} style={{ display: "inline", marginRight: 6 }} />
                  Top Pages
                </div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Page</th><th style={{ textAlign: "right" }}>Views</th></tr></thead>
                  <tbody>
                    {!summary?.top_pages?.length ? (
                      <tr><td colSpan={2} className="adm-table__empty">No page view data yet.</td></tr>
                    ) : (
                      summary.top_pages.map((p) => (
                        <tr key={p.page_path}>
                          <td className="adm-truncate" style={{ maxWidth: 220 }}>{p.page_path}</td>
                          <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{p.views}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Top Countries */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Globe size={14} style={{ display: "inline", marginRight: 6 }} />
                  Top Countries
                </div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Country</th><th style={{ textAlign: "right" }}>Events</th></tr></thead>
                  <tbody>
                    {!summary?.top_countries?.length ? (
                      <tr><td colSpan={2} className="adm-table__empty">No country data yet.</td></tr>
                    ) : (
                      summary.top_countries.map((c) => (
                        <tr key={c.country}>
                          <td>{c.country || "Unknown"}</td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>{c.events}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="adm-panel-grid">
            {/* CTA Clicks */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <MousePointerClick size={14} style={{ display: "inline", marginRight: 6 }} />
                  CTA Clicks
                </div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Label / Event</th><th style={{ textAlign: "right" }}>Clicks</th></tr></thead>
                  <tbody>
                    {!summary?.top_cta_events?.length ? (
                      <tr><td colSpan={2} className="adm-table__empty">No CTA data yet.</td></tr>
                    ) : (
                      summary.top_cta_events.map((e) => (
                        <tr key={e.label}>
                          <td>{e.label}</td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>{e.total}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Events Breakdown */}
            <div className="adm-table-wrap">
              <div className="adm-table-toolbar">
                <div className="adm-table-toolbar__title">
                  <Activity size={14} style={{ display: "inline", marginRight: 6 }} />
                  Events Breakdown
                </div>
              </div>
              {loading ? <div className="adm-table__loading">Loading…</div> : (
                <table className="adm-table">
                  <thead><tr><th>Event Type</th><th style={{ textAlign: "right" }}>Total</th></tr></thead>
                  <tbody>
                    {!summary?.total_by_type?.length ? (
                      <tr><td colSpan={2} className="adm-table__empty">No events yet.</td></tr>
                    ) : (
                      summary.total_by_type.map((r) => (
                        <tr key={r.event_type}>
                          <td><span className="adm-badge adm-badge--info">{r.event_type}</span></td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>{r.total}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

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
                    <th>Country</th>
                    <th>UTM Source</th>
                    <th>Referrer</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length === 0 ? (
                    <tr><td colSpan={7} className="adm-table__empty">No events recorded yet.</td></tr>
                  ) : (
                    filteredEvents.map((ev) => (
                      <tr key={ev.id}>
                        <td style={{ fontSize: 11, color: "var(--adm-muted)", whiteSpace: "nowrap" }}>
                          {new Date(ev.created_at).toLocaleString()}
                        </td>
                        <td><span className="adm-badge adm-badge--info">{ev.event_type}</span></td>
                        <td className="adm-truncate" style={{ maxWidth: 180, fontSize: 12 }}>{ev.page_path || "—"}</td>
                        <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{[ev.city, ev.country].filter(Boolean).join(", ") || "—"}</td>
                        <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{ev.utm_source || "—"}</td>
                        <td className="adm-truncate" style={{ maxWidth: 140, fontSize: 11, color: "var(--adm-muted)" }}>{ev.referrer || "—"}</td>
                        <td className="adm-mono" style={{ maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.session_id?.slice(0, 8)}…</td>
                      </tr>
                    ))
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
