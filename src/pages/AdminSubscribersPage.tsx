import { useState, useEffect } from "react";
import { Mail, RefreshCw, Search, Download, AlertCircle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

interface Subscriber {
  id: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
  client_ip?: string;
  country?: string;
  city?: string;
  source_page?: string;
}

export default function AdminSubscribersPage() {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(api("/subscribers"), { headers: authHdr() });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setSubs(Array.isArray(data) ? data : data.subscribers ?? []);
    } catch {
      setError("Failed to load subscribers. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = subs.filter((s) => {
    const matchSearch = !search.trim() ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.country ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const active = subs.filter((s) => s.status === "active").length;
  const unsubscribed = subs.filter((s) => s.status === "unsubscribed").length;
  const byCountry = subs.reduce<Record<string, number>>((acc, s) => {
    if (s.country) acc[s.country] = (acc[s.country] ?? 0) + 1;
    return acc;
  }, {});
  const topCountries = Object.entries(byCountry).sort(([, a], [, b]) => b - a).slice(0, 5);

  function exportCSV() {
    const headers = ["Email", "Status", "Country", "City", "Source Page", "Subscribed"];
    const rows = subs.map((s) => [s.email, s.status, s.country ?? "", s.city ?? "", s.source_page ?? "", new Date(s.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AdminLayout
      title="Subscribers"
      actions={
        <>
          <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={exportCSV}>
            <Download size={13} /> Export CSV
          </button>
          <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={load}>
            <RefreshCw size={13} className={loading ? "adm-spin" : ""} />
          </button>
        </>
      }
    >
      {/* Stats */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <div className="adm-stat adm-stat--accent">
          <div className="adm-stat__icon"><Mail size={20} /></div>
          <div className="adm-stat__value">{subs.length}</div>
          <div className="adm-stat__label">Total Subscribers</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__value">{active}</div>
          <div className="adm-stat__label">Active</div>
        </div>
        <div className="adm-stat adm-stat--red">
          <div className="adm-stat__value">{unsubscribed}</div>
          <div className="adm-stat__label">Unsubscribed</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__value">{Object.keys(byCountry).length}</div>
          <div className="adm-stat__label">Countries Reached</div>
        </div>
      </div>

      {error && <div className="adm-alert adm-alert--error"><AlertCircle size={16} /> {error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        {/* Table */}
        <div className="adm-table-wrap">
          <div className="adm-table-toolbar">
            <div className="adm-search-wrap">
              <Search size={14} />
              <input className="adm-search" placeholder="Search email, country…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select
              className="adm-select"
              style={{ width: "auto", padding: "7px 10px" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>

          {loading ? (
            <div className="adm-table__loading">Loading…</div>
          ) : (
            <div className="adm-table-scroll">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Country</th>
                    <th>Source Page</th>
                    <th>Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="adm-table__empty">No subscribers found.</td>
                    </tr>
                  ) : (
                    filtered.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <a href={`mailto:${s.email}`} style={{ color: "var(--adm-accent)" }}>{s.email}</a>
                        </td>
                        <td>
                          <span className={`adm-badge adm-badge--${s.status === "active" ? "active" : "deleted"}`}>
                            {s.status}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>
                          {[s.city, s.country].filter(Boolean).join(", ") || "-"}
                        </td>
                        <td style={{ fontSize: 11, color: "var(--adm-muted)" }} className="adm-truncate">
                          {s.source_page ? (
                            <a href={s.source_page} target="_blank" rel="noopener noreferrer" style={{ color: "var(--adm-muted)" }}>
                              {s.source_page.replace(/^https?:\/\/[^/]+/, "")}
                            </a>
                          ) : "-"}
                        </td>
                        <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>
                          {new Date(s.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="adm-pagination">
            <span className="adm-pagination__info">{filtered.length} of {subs.length} subscribers</span>
          </div>
        </div>

        {/* Sidebar - Top Countries */}
        <div>
          <div className="adm-card">
            <div className="adm-card__title">Top Countries</div>
            {topCountries.length === 0 ? (
              <p style={{ color: "var(--adm-muted)", fontSize: 13 }}>No geo data yet.</p>
            ) : (
              <div>
                {topCountries.map(([country, count]) => (
                  <div key={country} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13 }}>{country}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 80, height: 4, background: "var(--adm-border)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ width: `${(count / subs.length) * 100}%`, height: "100%", background: "var(--adm-accent)", borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 12, color: "var(--adm-muted)", width: 24, textAlign: "right" }}>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
