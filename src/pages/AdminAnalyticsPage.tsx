import { useEffect, useState } from "react";
import { Users, MousePointerClick, Globe, TrendingUp, FileText, RefreshCw } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";
import "../styles/admin-layout.css";
import "../styles/admin-analytics.css";

function apiUrl(path: string) {
  return `${getApiBaseUrl()}${path}`;
}

function authHeaders() {
  return { Authorization: `Bearer ${authApi.getToken() ?? ""}` };
}

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  company_type: string | null;
  country: string | null;
  city: string | null;
  siem_tool: string | null;
  primary_pain: string | null;
  source: string | null;
  intent: string | null;
  delivery_status: string;
}

interface SummaryRow {
  page_path?: string;
  country?: string;
  label?: string;
  event_type?: string;
  views?: number;
  events?: number;
  clicks?: number;
  total?: number;
}

interface Summary {
  days: number;
  top_pages: SummaryRow[];
  top_countries: SummaryRow[];
  cta_clicks: SummaryRow[];
  total_by_type: SummaryRow[];
}

function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`analytics-stat-card${accent ? " analytics-stat-card--accent" : ""}`}>
      <div className="analytics-stat-card__icon">{icon}</div>
      <div className="analytics-stat-card__value">{value}</div>
      <div className="analytics-stat-card__label">{label}</div>
    </div>
  );
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    sent: "badge--green",
    failed: "badge--red",
    smtp_not_configured: "badge--yellow",
  };
  return <span className={`analytics-badge ${map[status] ?? "badge--dim"}`}>{status.replace(/_/g, " ")}</span>;
}

export default function AdminAnalyticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "leads">("overview");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [leadsRes, summaryRes] = await Promise.all([
        fetch(apiUrl("/leads?limit=100"), { headers: authHeaders() }),
        fetch(apiUrl(`/events/summary?days=${days}`), { headers: authHeaders() }),
      ]);
      if (!leadsRes.ok || !summaryRes.ok) {
        setError("Failed to load data. Make sure you are logged in.");
        return;
      }
      const leadsData = await leadsRes.json();
      const summaryData = await summaryRes.json();
      setLeads(leadsData.leads ?? []);
      setSummary(summaryData);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [days]);

  const totalPageViews = summary?.total_by_type?.find((r) => r.event_type === "page_view")?.total ?? 0;
  const totalEvents = summary?.total_by_type?.reduce((s, r) => s + (r.total ?? 0), 0) ?? 0;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-main">
        <div className="analytics-header">
          <div>
            <h1>Analytics & Leads</h1>
            <p className="hint">First-party data — visitors, form submissions, CTA clicks</p>
          </div>
          <div className="analytics-header__controls">
            <select
              className="analytics-days-select"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
            <button className="analytics-refresh-btn" onClick={load} title="Refresh">
              <RefreshCw size={16} className={loading ? "spin" : ""} />
            </button>
          </div>
        </div>

        {error && <div className="analytics-error">{error}</div>}

        {/* Stat cards */}
        <div className="analytics-stats-grid">
          <StatCard icon={<TrendingUp size={20} />} label="Page views" value={loading ? "—" : totalPageViews} accent />
          <StatCard icon={<MousePointerClick size={20} />} label="Total events" value={loading ? "—" : totalEvents} />
          <StatCard icon={<Users size={20} />} label="Leads captured" value={loading ? "—" : leads.length} />
          <StatCard icon={<Globe size={20} />} label="Countries" value={loading ? "—" : (summary?.top_countries?.length ?? 0)} />
        </div>

        {/* Tabs */}
        <div className="analytics-tabs">
          <button className={`analytics-tab${activeTab === "overview" ? " active" : ""}`} onClick={() => setActiveTab("overview")}>
            Overview
          </button>
          <button className={`analytics-tab${activeTab === "leads" ? " active" : ""}`} onClick={() => setActiveTab("leads")}>
            Leads ({leads.length})
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="analytics-overview">
            <div className="analytics-panels">

              {/* Top Pages */}
              <div className="analytics-panel">
                <h2><FileText size={16} /> Top Pages</h2>
                {loading ? <div className="analytics-loading">Loading…</div> : (
                  <table className="analytics-table">
                    <thead><tr><th>Page</th><th>Views</th></tr></thead>
                    <tbody>
                      {(summary?.top_pages ?? []).map((r, i) => (
                        <tr key={i}>
                          <td className="path-cell">{r.page_path || "/"}</td>
                          <td>{r.views}</td>
                        </tr>
                      ))}
                      {!summary?.top_pages?.length && <tr><td colSpan={2} className="analytics-empty">No data yet</td></tr>}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Top Countries */}
              <div className="analytics-panel">
                <h2><Globe size={16} /> Top Countries</h2>
                {loading ? <div className="analytics-loading">Loading…</div> : (
                  <table className="analytics-table">
                    <thead><tr><th>Country</th><th>Events</th></tr></thead>
                    <tbody>
                      {(summary?.top_countries ?? []).map((r, i) => (
                        <tr key={i}>
                          <td>{r.country}</td>
                          <td>{r.events}</td>
                        </tr>
                      ))}
                      {!summary?.top_countries?.length && <tr><td colSpan={2} className="analytics-empty">No data yet</td></tr>}
                    </tbody>
                  </table>
                )}
              </div>

              {/* CTA Clicks */}
              <div className="analytics-panel">
                <h2><MousePointerClick size={16} /> CTA Clicks</h2>
                {loading ? <div className="analytics-loading">Loading…</div> : (
                  <table className="analytics-table">
                    <thead><tr><th>Label / Event</th><th>Clicks</th></tr></thead>
                    <tbody>
                      {(summary?.cta_clicks ?? []).map((r, i) => (
                        <tr key={i}>
                          <td>{r.label ?? "—"}</td>
                          <td>{r.clicks}</td>
                        </tr>
                      ))}
                      {!summary?.cta_clicks?.length && <tr><td colSpan={2} className="analytics-empty">No CTA clicks yet</td></tr>}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Events breakdown */}
              <div className="analytics-panel">
                <h2><TrendingUp size={16} /> Events Breakdown</h2>
                {loading ? <div className="analytics-loading">Loading…</div> : (
                  <table className="analytics-table">
                    <thead><tr><th>Event type</th><th>Total</th></tr></thead>
                    <tbody>
                      {(summary?.total_by_type ?? []).map((r, i) => (
                        <tr key={i}>
                          <td>{r.event_type}</td>
                          <td>{r.total}</td>
                        </tr>
                      ))}
                      {!summary?.total_by_type?.length && <tr><td colSpan={2} className="analytics-empty">No events yet</td></tr>}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="analytics-leads">
            {loading ? <div className="analytics-loading">Loading…</div> : (
              <div className="analytics-table-wrap">
                <table className="analytics-table analytics-table--full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Country</th>
                      <th>Source</th>
                      <th>SIEM</th>
                      <th>Pain</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="mono">{new Date(lead.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}</td>
                        <td>{lead.name}</td>
                        <td className="mono">{lead.email}</td>
                        <td>{lead.company || "—"}</td>
                        <td>{lead.city ? `${lead.city}, ${lead.country}` : (lead.country || "—")}</td>
                        <td>{lead.source || "—"}</td>
                        <td>{lead.siem_tool || "—"}</td>
                        <td>{lead.primary_pain || "—"}</td>
                        <td>{statusBadge(lead.delivery_status)}</td>
                      </tr>
                    ))}
                    {!leads.length && (
                      <tr><td colSpan={9} className="analytics-empty">No leads yet — form submissions will appear here</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
