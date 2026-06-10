import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Save, ArrowLeft, AlertCircle, CheckCircle2, Loader2, Plus, Trash2,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import {
  getCaseStudyBySlug, createCaseStudy, updateCaseStudy,
  type CaseStudyCreateRequest,
} from "../api/caseStudies";

type Section = "basic" | "content" | "tech" | "seo";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function ListEditor({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  function update(i: number, v: string) { const a = [...value]; a[i] = v; onChange(a); }
  function remove(i: number) { onChange(value.filter((_, idx) => idx !== i)); }
  function add() { onChange([...value, ""]); }

  return (
    <div>
      {value.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            className="adm-input"
            value={item}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder || `Item ${i + 1}`}
          />
          <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => remove(i)}>
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={add}>
        <Plus size={12} /> Add
      </button>
    </div>
  );
}

export default function AdminCaseStudyEditorPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(slug);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [section, setSection] = useState<Section>("basic");

  const [form, setForm] = useState<CaseStudyCreateRequest & { id?: string }>({
    slug: "",
    title: "",
    category: "",
    summary: "",
    description: "",
    context: "",
    outcomes: [],
    problem: [],
    solution: [],
    architecture_notes: [],
    tech_stack: [],
    results: [],
    learnings: [],
    faqs: [],
    seo_title: "",
    seo_description: "",
    year: String(new Date().getFullYear()),
    hover_art_src: "",
    hover_art_alt: "",
    hover_art_caption: "",
    sort_order: 0,
  });

  useEffect(() => {
    if (isEdit && slug) {
      setLoading(true);
      getCaseStudyBySlug(slug)
        .then((cs) => {
          setForm({ ...cs });
        })
        .catch(() => setError("Failed to load case study."))
        .finally(() => setLoading(false));
    }
  }, [slug, isEdit]);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => {
      const next = { ...p, [k]: v };
      if (k === "title" && !p.slug) next.slug = slugify(v as string);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEdit && slug) {
        await updateCaseStudy(slug, form);
        setSuccess(true);
      } else {
        const cs = await createCaseStudy(form);
        setSuccess(true);
        setTimeout(() => navigate(`/admin/case-studies/${cs.slug}/edit`), 1200);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  const TABS: { key: Section; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "content", label: "Case Content" },
    { key: "tech", label: "Tech Stack" },
    { key: "seo", label: "SEO & Media" },
  ];

  if (loading) {
    return (
      <AdminLayout title={isEdit ? "Edit Case Study" : "New Case Study"}>
        <div className="adm-table__loading">Loading…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEdit ? `Edit: ${form.title || slug}` : "New Case Study"}
      actions={
        <>
          <Link to="/admin/case-studies" className="adm-btn adm-btn--ghost adm-btn--sm">
            <ArrowLeft size={13} /> Back
          </Link>
          {isEdit && (
            <a
              href={`/portfolio/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="adm-btn adm-btn--ghost adm-btn--sm"
            >
              View Live ↗
            </a>
          )}
          <button className="adm-btn adm-btn--primary" onClick={handleSubmit} disabled={saving}>
            {saving ? <Loader2 size={14} className="adm-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
        </>
      }
    >
      {error && <div className="adm-alert adm-alert--error"><AlertCircle size={16} /> {error}</div>}
      {success && <div className="adm-alert adm-alert--success"><CheckCircle2 size={16} /> Saved successfully!</div>}

      <div className="adm-tabs" style={{ marginBottom: 28 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`adm-tab${section === t.key ? " active" : ""}`}
            onClick={() => setSection(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── Basic Info ── */}
        {section === "basic" && (
          <div>
            <div className="adm-form-grid">
              <div className="adm-field">
                <label className="adm-label">Title *</label>
                <input className="adm-input" value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="Enterprise XDR Platform…" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Slug *</label>
                <input className="adm-input" value={form.slug} onChange={(e) => set("slug", e.target.value)} required placeholder="enterprise-xdr-platform" />
                {form.slug && (
                  <a href={`/portfolio/${form.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "var(--adm-accent)" }}>
                    /portfolio/{form.slug} ↗
                  </a>
                )}
              </div>
            </div>
            <div className="adm-form-grid">
              <div className="adm-field">
                <label className="adm-label">Category</label>
                <input className="adm-input" value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Cybersecurity" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Year</label>
                <input className="adm-input" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2024" />
              </div>
            </div>
            <div className="adm-field">
              <label className="adm-label">Summary (one-liner)</label>
              <input className="adm-input" value={form.summary} onChange={(e) => set("summary", e.target.value)} placeholder="Brief description for cards and listings" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Outcomes (key results)</label>
              <ListEditor value={form.outcomes ?? []} onChange={(v) => set("outcomes", v)} placeholder="e.g. 80% reduction in MTTR" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Sort Order</label>
              <input className="adm-input" type="number" value={form.sort_order} onChange={(e) => set("sort_order", parseInt(e.target.value) || 0)} style={{ maxWidth: 120 }} />
            </div>
          </div>
        )}

        {/* ── Case Content ── */}
        {section === "content" && (
          <div>
            <div className="adm-field">
              <label className="adm-label">Full Description</label>
              <textarea className="adm-textarea" value={form.description} onChange={(e) => set("description", e.target.value)} style={{ minHeight: 120 }} placeholder="Detailed project description…" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Context</label>
              <textarea className="adm-textarea" value={form.context} onChange={(e) => set("context", e.target.value)} style={{ minHeight: 100 }} placeholder="Business and technical context…" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Problem Statements</label>
              <ListEditor value={form.problem ?? []} onChange={(v) => set("problem", v)} placeholder="e.g. Alert fatigue from 10k+ daily alerts" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Solution Points</label>
              <ListEditor value={form.solution ?? []} onChange={(v) => set("solution", v)} placeholder="e.g. ML-powered alert triage engine" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Architecture Notes</label>
              <ListEditor value={form.architecture_notes ?? []} onChange={(v) => set("architecture_notes", v)} placeholder="e.g. Event-driven pipeline with Kafka" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Results</label>
              <ListEditor value={form.results ?? []} onChange={(v) => set("results", v)} placeholder="e.g. 95% analyst efficiency improvement" />
            </div>
            <div className="adm-field">
              <label className="adm-label">Key Learnings</label>
              <ListEditor value={form.learnings ?? []} onChange={(v) => set("learnings", v)} placeholder="e.g. Context-aware ML beats rule engines" />
            </div>
            <div className="adm-field">
              <label className="adm-label">FAQs (JSON format)</label>
              <textarea
                className="adm-textarea adm-textarea--mono"
                value={form.faqs?.length ? JSON.stringify(form.faqs, null, 2) : ""}
                onChange={(e) => {
                  try { set("faqs", JSON.parse(e.target.value)); } catch { /* invalid json while typing */ }
                }}
                style={{ minHeight: 120 }}
                placeholder={'[{"q": "Question?", "a": "Answer."}]'}
              />
            </div>
          </div>
        )}

        {/* ── Tech Stack ── */}
        {section === "tech" && (
          <div>
            <div style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--adm-muted)" }}>
                Define tech stack by category groups
              </span>
              <button
                type="button"
                className="adm-btn adm-btn--sm adm-btn--primary"
                onClick={() => set("tech_stack", [...(form.tech_stack ?? []), { category: "", items: [] }])}
              >
                <Plus size={12} /> Add Group
              </button>
            </div>
            {(form.tech_stack ?? []).map((group, gi) => (
              <div key={gi} className="adm-card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
                  <input
                    className="adm-input"
                    placeholder="Category name (e.g. Security Stack)"
                    value={group.category}
                    onChange={(e) => {
                      const ts = [...(form.tech_stack ?? [])];
                      ts[gi] = { ...ts[gi], category: e.target.value };
                      set("tech_stack", ts);
                    }}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger"
                    onClick={() => set("tech_stack", (form.tech_stack ?? []).filter((_, i) => i !== gi))}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div>
                  {group.items.map((item: string, ii: number) => (
                    <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <input
                        className="adm-input"
                        value={item}
                        onChange={(e) => {
                          const ts = [...(form.tech_stack ?? [])];
                          ts[gi] = { ...ts[gi], items: ts[gi].items.map((x: string, xi: number) => xi === ii ? e.target.value : x) };
                          set("tech_stack", ts);
                        }}
                        placeholder="e.g. OpenSearch"
                        style={{ fontSize: 13 }}
                      />
                      <button
                        type="button"
                        className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger"
                        onClick={() => {
                          const ts = [...(form.tech_stack ?? [])];
                          ts[gi] = { ...ts[gi], items: ts[gi].items.filter((_: string, xi: number) => xi !== ii) };
                          set("tech_stack", ts);
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="adm-btn adm-btn--ghost adm-btn--sm"
                    onClick={() => {
                      const ts = [...(form.tech_stack ?? [])];
                      ts[gi] = { ...ts[gi], items: [...ts[gi].items, ""] };
                      set("tech_stack", ts);
                    }}
                  >
                    <Plus size={12} /> Add Technology
                  </button>
                </div>
              </div>
            ))}
            {(!form.tech_stack || form.tech_stack.length === 0) && (
              <div className="adm-table__empty">No tech stack groups yet. Click "Add Group" to start.</div>
            )}
          </div>
        )}

        {/* ── SEO & Media ── */}
        {section === "seo" && (
          <div>
            <div className="adm-field">
              <label className="adm-label">SEO Title</label>
              <input className="adm-input" value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} placeholder="Defaults to title if empty" />
            </div>
            <div className="adm-field">
              <label className="adm-label">SEO Description</label>
              <textarea className="adm-textarea" value={form.seo_description} onChange={(e) => set("seo_description", e.target.value)} style={{ minHeight: 80 }} placeholder="150-160 chars for best SEO…" />
              <p className="adm-field__hint">{(form.seo_description || "").length}/160 characters</p>
            </div>
            <div className="adm-divider" />
            <div className="adm-field">
              <label className="adm-label">Hover Art Image URL</label>
              <input className="adm-input" value={form.hover_art_src} onChange={(e) => set("hover_art_src", e.target.value)} placeholder="/doodles/portfolio/my-art.svg" />
            </div>
            {form.hover_art_src && (
              <div className="adm-field">
                <label className="adm-label">Preview</label>
                <div className="adm-card" style={{ textAlign: "center" }}>
                  <img
                    src={form.hover_art_src}
                    alt={form.hover_art_alt}
                    style={{ maxHeight: 120, maxWidth: "100%", objectFit: "contain" }}
                    onError={(e) => { (e.target as HTMLImageElement).alt = "Image not found"; }}
                  />
                </div>
              </div>
            )}
            <div className="adm-form-grid">
              <div className="adm-field">
                <label className="adm-label">Hover Art Alt Text</label>
                <input className="adm-input" value={form.hover_art_alt} onChange={(e) => set("hover_art_alt", e.target.value)} placeholder="Alt text for accessibility" />
              </div>
              <div className="adm-field">
                <label className="adm-label">Hover Art Caption</label>
                <input className="adm-input" value={form.hover_art_caption} onChange={(e) => set("hover_art_caption", e.target.value)} placeholder="Short caption for hover overlay" />
              </div>
            </div>
          </div>
        )}

        <div className="adm-divider" />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Link to="/admin/case-studies" className="adm-btn">Cancel</Link>
          <button type="submit" className="adm-btn adm-btn--primary" disabled={saving}>
            {saving ? <Loader2 size={14} className="adm-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : isEdit ? "Update Case Study" : "Create Case Study"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
