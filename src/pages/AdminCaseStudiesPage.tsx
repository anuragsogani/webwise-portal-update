import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Search, RefreshCw, Eye, Pencil, AlertCircle, FolderKanban } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { listCaseStudies, deleteCaseStudy, type CaseStudy } from "../api/caseStudies";

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [filtered, setFiltered] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listCaseStudies();
      setItems(data.case_studies);
      const cats = [...new Set(data.case_studies.map((c) => c.category).filter(Boolean))];
      setCategories(cats);
    } catch {
      setError("Failed to load case studies.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = items;
    if (catFilter !== "all") list = list.filter((c) => c.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q));
    }
    setFiltered(list);
  }, [items, search, catFilter]);

  async function handleDelete(slug: string) {
    if (!window.confirm("Delete this case study?")) return;
    setDeleting(slug);
    try {
      await deleteCaseStudy(slug);
      load();
    } catch {
      setError("Failed to delete.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <AdminLayout
      title="Case Studies"
      actions={
        <Link to="/admin/case-studies/new" className="adm-btn adm-btn--primary">
          <Plus size={14} /> New Case Study
        </Link>
      }
    >
      {/* Stats */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <div className="adm-stat adm-stat--accent">
          <div className="adm-stat__icon"><FolderKanban size={20} /></div>
          <div className="adm-stat__value">{items.length}</div>
          <div className="adm-stat__label">Total Case Studies</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__value">{categories.length}</div>
          <div className="adm-stat__label">Categories</div>
        </div>
      </div>

      {error && (
        <div className="adm-alert adm-alert--error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="adm-table-wrap">
        <div className="adm-table-toolbar">
          <div className="adm-search-wrap">
            <Search size={14} />
            <input className="adm-search" placeholder="Search case studies…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="adm-table-toolbar__actions">
            <select
              className="adm-select"
              style={{ width: "auto", padding: "7px 10px" }}
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={load}>
              <RefreshCw size={13} className={loading ? "adm-spin" : ""} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="adm-table__loading">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty-state">
            <FolderKanban size={40} />
            <p>No case studies found.</p>
            <Link to="/admin/case-studies/new" className="adm-btn adm-btn--primary">
              <Plus size={14} /> Add First Case Study
            </Link>
          </div>
        ) : (
          <>
            {/* Card Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, padding: 20 }}>
              {filtered.map((cs) => (
                <div
                  key={cs.slug}
                  className="adm-card"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  {/* Hover art */}
                  {cs.hover_art_src && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                      <img
                        src={cs.hover_art_src}
                        alt={cs.hover_art_alt}
                        style={{ height: 80, objectFit: "contain", opacity: 0.8 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <span className="adm-badge adm-badge--info">{cs.category || "Uncategorized"}</span>
                    <span style={{ fontSize: 11, color: "var(--adm-muted)" }}>{cs.year}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>
                    {cs.title}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--adm-muted)", marginBottom: 12, lineHeight: 1.5 }}>
                    {cs.summary.slice(0, 120)}{cs.summary.length > 120 ? "…" : ""}
                  </p>
                  {cs.outcomes.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      {cs.outcomes.slice(0, 2).map((o, i) => (
                        <div key={i} style={{ fontSize: 11, color: "var(--adm-green)", display: "flex", alignItems: "flex-start", gap: 4, marginBottom: 2 }}>
                          <span style={{ flexShrink: 0 }}>✓</span> {o}
                        </div>
                      ))}
                      {cs.outcomes.length > 2 && (
                        <div style={{ fontSize: 11, color: "var(--adm-muted)" }}>+{cs.outcomes.length - 2} more outcomes</div>
                      )}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 8, borderTop: "1px solid var(--adm-border)", paddingTop: 12, marginTop: "auto" }}>
                    <a
                      href={`/portfolio/${cs.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="adm-btn adm-btn--ghost adm-btn--sm"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      <Eye size={12} /> View
                    </a>
                    <Link
                      to={`/admin/case-studies/${cs.slug}/edit`}
                      className="adm-btn adm-btn--sm"
                      style={{ flex: 1, justifyContent: "center" }}
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                    <button
                      className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger"
                      onClick={() => handleDelete(cs.slug)}
                      disabled={deleting === cs.slug}
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="adm-pagination">
              <span className="adm-pagination__info">Showing {filtered.length} of {items.length} case studies</span>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
