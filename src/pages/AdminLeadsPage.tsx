import { useState, useEffect, useCallback } from "react";
import {
  Users, RefreshCw, Search, Download, AlertCircle,
  ChevronLeft, ChevronRight, Filter, ExternalLink,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  urgency: string;
  company_type: string;
  country: string;
  city: string;
  org: string;
  siem_tool: string;
  primary_pain: string;
  source: string;
  intent: string;
  page_url: string;
  delivery_status: string;
  error_type: string;
  client_ip: string;
}

const PAGE_SIZE = 25;
const SOURCES = ["all", "contact-page", "cta-get-started", "hubspot-meeting", "demo-registration"];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (source !== "all") params.set("source", source);

      const res = await fetch(api(`/leads?${params}`), { headers: authHdr() });
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setLeads(data.leads ?? []);
      setTotal(data.count ?? 0);
    } catch {
      setError("Failed to load leads. Ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  }, [page, source]);

  useEffect(() => { load(); }, [load]);

  const filtered = search.trim()
    ? leads.filter((l) =>
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.email?.toLowerCase().includes(search.toLowerCase()) ||
        l.company?.toLowerCase().includes(search.toLowerCase())
      )
    : leads;

  function exportCSV() {
    const headers = ["Date","Name","Email","Company","Source","Country","City","SIEM","Pain","Status"];
    const rows = leads.map((l) => [
      new Date(l.created_at).toLocaleDateString(),
      l.name, l.email, l.company, l.source,
      l.country, l.city, l.siem_tool, l.primary_pain, l.delivery_status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <AdminLayout
      title="Leads & Contact Submissions"
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
          <div className="adm-stat__icon"><Users size={20} /></div>
          <div className="adm-stat__value">{total}</div>
          <div className="adm-stat__label">Total Leads</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__value">{leads.filter((l) => l.delivery_status === "sent").length}</div>
          <div className="adm-stat__label">Notified (This Page)</div>
        </div>
        <div className="adm-stat adm-stat--yellow">
          <div className="adm-stat__value">{leads.filter((l) => l.source === "hubspot-meeting").length}</div>
          <div className="adm-stat__label">Meeting Requests</div>
        </div>
        <div className="adm-stat adm-stat--red">
          <div className="adm-stat__value">{leads.filter((l) => l.delivery_status === "failed").length}</div>
          <div className="adm-stat__label">Delivery Failed</div>
        </div>
      </div>

      {error && <div className="adm-alert adm-alert--error"><AlertCircle size={16} /> {error}</div>}

      <div className="adm-table-wrap">
        <div className="adm-table-toolbar">
          <div style={{ display: "flex", gap: 10, flex: 1, flexWrap: "wrap" }}>
            <div className="adm-search-wrap">
              <Search size={14} />
              <input className="adm-search" placeholder="Search name, email, company…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Filter size={13} style={{ color: "var(--adm-muted)" }} />
              <select
                className="adm-select"
                style={{ width: "auto", padding: "7px 10px" }}
                value={source}
                onChange={(e) => { setSource(e.target.value); setPage(0); }}
              >
                {SOURCES.map((s) => <option key={s} value={s}>{s === "all" ? "All Sources" : s}</option>)}
              </select>
            </div>
          </div>
          <span style={{ fontSize: 12, color: "var(--adm-muted)", whiteSpace: "nowrap" }}>
            Page {page + 1} / {totalPages}
          </span>
        </div>

        {loading ? (
          <div className="adm-table__loading">Loading leads…</div>
        ) : (
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Country</th>
                  <th>SIEM</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="adm-table__empty">No leads found.</td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelected(lead)}
                    >
                      <td style={{ fontSize: 12, color: "var(--adm-muted)", whiteSpace: "nowrap" }}>
                        {new Date(lead.created_at).toLocaleDateString()}<br />
                        <span style={{ fontSize: 10 }}>{new Date(lead.created_at).toLocaleTimeString()}</span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{lead.name || "—"}</td>
                      <td>
                        <a href={`mailto:${lead.email}`} style={{ color: "var(--adm-accent)", fontSize: 13 }} onClick={(e) => e.stopPropagation()}>
                          {lead.email}
                        </a>
                      </td>
                      <td>{lead.company || "—"}</td>
                      <td>
                        <span className="adm-badge adm-badge--info">{lead.source || "—"}</span>
                      </td>
                      <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>
                        {[lead.city, lead.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td style={{ fontSize: 12, color: "var(--adm-muted)" }}>{lead.siem_tool || "—"}</td>
                      <td>
                        <span className={`adm-badge adm-badge--${lead.delivery_status || "dim"}`}>
                          {lead.delivery_status || "—"}
                        </span>
                      </td>
                      <td>
                        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={(e) => { e.stopPropagation(); setSelected(lead); }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="adm-pagination">
          <span className="adm-pagination__info">
            {total} total leads · showing {filtered.length} on this page
          </span>
          <button
            className="adm-btn adm-btn--ghost adm-btn--sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft size={14} />
          </button>
          <span style={{ fontSize: 12, color: "var(--adm-muted)", padding: "0 8px" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            className="adm-btn adm-btn--ghost adm-btn--sm"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={() => setSelected(null)}>
          <div className="adm-modal adm-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal__header">
              <div className="adm-modal__title">
                Lead Detail — {selected.name || selected.email}
              </div>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="adm-modal__body">
              <div className="adm-form-grid">
                {[
                  ["Name", selected.name],
                  ["Email", selected.email],
                  ["Company", selected.company],
                  ["Company Type", selected.company_type],
                  ["Source", selected.source],
                  ["Intent", selected.intent],
                  ["Country", selected.country],
                  ["City", selected.city],
                  ["Organization/ISP", selected.org],
                  ["SIEM Tool", selected.siem_tool],
                  ["Primary Pain", selected.primary_pain],
                  ["Urgency", selected.urgency],
                  ["Delivery", selected.delivery_status],
                  ["IP", selected.client_ip],
                  ["Submitted", new Date(selected.created_at).toLocaleString()],
                  ["Error", selected.error_type],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--adm-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 13, color: v ? "#fff" : "var(--adm-dim)" }}>{v || "—"}</div>
                  </div>
                ))}
              </div>
              {selected.page_url && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--adm-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 3 }}>Source Page</div>
                  <a
                    href={selected.page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 12, color: "var(--adm-accent)", display: "flex", alignItems: "center", gap: 4, wordBreak: "break-all" }}
                  >
                    <ExternalLink size={12} /> {selected.page_url}
                  </a>
                </div>
              )}
            </div>
            <div className="adm-modal__footer">
              <a href={`mailto:${selected.email}`} className="adm-btn adm-btn--primary">
                Send Email
              </a>
              <button className="adm-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
