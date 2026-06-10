import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Save, ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2,
  Loader2, Plus, X, Tag, User, FileText, Hash, Type,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import {
  createBlog, getBlogById, updateBlog,
  listCategories, formatCategoryLabel,
  BlogCreateRequest,
} from "../api/blog";

export default function AdminBlogEditorPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    author: "",
    category: "",
    tags: "",
    body_markdown: "",
    key_takeaways: "",
    faqs: "",
    published_at: "",
    status: "draft",
  });

  useEffect(() => {
    listCategories().then((d) => setAvailableCategories(d.categories)).catch(() => {});

    if (isEdit && id) {
      setLoading(true);
      getBlogById(id)
        .then((blog) => {
          setForm({
            title: blog.title,
            slug: blog.slug,
            description: blog.description,
            author: blog.author,
            category: blog.category,
            tags: blog.tags.join(", "),
            body_markdown: blog.body_markdown,
            key_takeaways: blog.key_takeaways.length ? JSON.stringify(blog.key_takeaways, null, 2) : "",
            faqs: blog.faqs.length ? JSON.stringify(blog.faqs, null, 2) : "",
            published_at: blog.published_at ? blog.published_at.replace("Z", "").slice(0, 16) : "",
            status: blog.status,
          });
        })
        .catch(() => setError("Failed to load blog post."))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && !prev.slug) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
      return next;
    });
  }

  function addCategory() {
    const slug = newCategoryInput.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) return;
    if (!availableCategories.includes(slug)) setAvailableCategories((p) => [...p, slug]);
    setForm((p) => ({ ...p, category: slug }));
    setNewCategoryInput("");
    setShowNewCategory(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    let key_takeaways: any[] = [];
    let faqs: any[] = [];
    try {
      key_takeaways = form.key_takeaways ? JSON.parse(form.key_takeaways) : [];
    } catch { setError("Invalid JSON in Key Takeaways"); setSaving(false); return; }
    try {
      faqs = form.faqs ? JSON.parse(form.faqs) : [];
    } catch { setError("Invalid JSON in FAQs"); setSaving(false); return; }

    const payload: BlogCreateRequest = {
      title: form.title,
      slug: form.slug || undefined,
      description: form.description,
      author: form.author,
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      body_markdown: form.body_markdown,
      key_takeaways,
      faqs,
      published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
    };

    try {
      if (isEdit && id) {
        await updateBlog(id, payload);
        setSuccess(true);
      } else {
        await createBlog(payload);
        setSuccess(true);
        setTimeout(() => navigate("/admin/blogs"), 1500);
      }
    } catch (err: any) {
      setError(err.message || "Failed to save post.");
    } finally {
      setSaving(false);
    }
  }

  function renderMarkdown(text: string) {
    return text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/^([^<].+)$/gm, (m) => m.startsWith("<") ? m : `<p>${m}</p>`);
  }

  if (loading) {
    return (
      <AdminLayout title={isEdit ? "Edit Blog Post" : "New Blog Post"}>
        <div className="adm-table__loading">Loading…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEdit ? "Edit Blog Post" : "New Blog Post"}
      actions={
        <>
          <Link to="/admin/blogs" className="adm-btn adm-btn--ghost adm-btn--sm">
            <ArrowLeft size={13} /> Back
          </Link>
          <button
            type="button"
            className="adm-btn adm-btn--ghost adm-btn--sm"
            onClick={() => setShowPreview((p) => !p)}
          >
            {showPreview ? <EyeOff size={13} /> : <Eye size={13} />}
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button className="adm-btn adm-btn--primary" onClick={handleSubmit} disabled={saving}>
            {saving ? <Loader2 size={14} className="adm-spin" /> : <Save size={14} />}
            {saving ? "Saving…" : isEdit ? "Update Post" : "Save Post"}
          </button>
        </>
      }
    >
      {error && (
        <div className="adm-alert adm-alert--error">
          <AlertCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="adm-alert adm-alert--success">
          <CheckCircle2 size={16} /> Post saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "contents" }}>
        <div className="adm-editor-layout">
          {/* Main */}
          <div>
            <div className="adm-field">
              <label className="adm-label"><Type size={11} /> Title</label>
              <input className="adm-input" name="title" value={form.title} onChange={handleChange} required placeholder="Enter post title…" />
            </div>

            <div className="adm-field">
              <label className="adm-label"><FileText size={11} /> Description</label>
              <input className="adm-input" name="description" value={form.description} onChange={handleChange} placeholder="Brief summary for the index page…" />
            </div>

            <div className="adm-field">
              <label className="adm-label"><FileText size={11} /> Body (Markdown)</label>
              <textarea
                className="adm-textarea adm-textarea--mono"
                name="body_markdown"
                value={form.body_markdown}
                onChange={handleChange}
                required
                style={{ minHeight: 320 }}
                placeholder="Write your content in Markdown..."
              />
            </div>

            {showPreview && (
              <div className="adm-field">
                <label className="adm-label"><Eye size={11} /> Live Preview</label>
                <div
                  className="adm-preview"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(form.body_markdown) }}
                />
              </div>
            )}

            <div className="adm-field">
              <label className="adm-label">Key Takeaways (JSON Array)</label>
              <textarea
                className="adm-textarea adm-textarea--mono"
                name="key_takeaways"
                value={form.key_takeaways}
                onChange={handleChange}
                style={{ minHeight: 100 }}
                placeholder={'["Key point 1", "Key point 2"]'}
              />
            </div>

            <div className="adm-field">
              <label className="adm-label">FAQs (JSON Array of {"{q, a}"} objects)</label>
              <textarea
                className="adm-textarea adm-textarea--mono"
                name="faqs"
                value={form.faqs}
                onChange={handleChange}
                style={{ minHeight: 100 }}
                placeholder={'[{"q": "Question?", "a": "Answer."}]'}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="adm-card">
              <div className="adm-card__title">Publishing</div>

              <div className="adm-field">
                <label className="adm-label">Status</label>
                <select className="adm-select" name="status" value={form.status} onChange={handleChange}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="adm-field">
                <label className="adm-label">Schedule Date</label>
                <input className="adm-input" type="datetime-local" name="published_at" value={form.published_at} onChange={handleChange} />
                <p className="adm-field__hint">Leave empty to auto-publish via cron.</p>
              </div>

              <div className="adm-field">
                <label className="adm-label"><Hash size={11} /> URL Slug</label>
                <input className="adm-input" name="slug" value={form.slug} onChange={handleChange} placeholder="my-post-url" />
                {form.slug && (
                  <a
                    href={`/blog/${form.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11, color: "var(--adm-accent)", display: "block", marginTop: 4 }}
                  >
                    /blog/{form.slug} ↗
                  </a>
                )}
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card__title">Classification</div>

              <div className="adm-field">
                <label className="adm-label"><User size={11} /> Author</label>
                <input className="adm-input" name="author" value={form.author} onChange={handleChange} placeholder="Author name" />
              </div>

              <div className="adm-field">
                <label className="adm-label"><Tag size={11} /> Category</label>
                <select className="adm-select" name="category" value={form.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {availableCategories.map((c) => (
                    <option key={c} value={c}>{formatCategoryLabel(c)}</option>
                  ))}
                </select>
                {!showNewCategory ? (
                  <button
                    type="button"
                    className="adm-btn adm-btn--ghost adm-btn--sm"
                    style={{ marginTop: 6 }}
                    onClick={() => setShowNewCategory(true)}
                  >
                    <Plus size={12} /> Add category
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                    <input
                      className="adm-input"
                      style={{ flex: 1, fontSize: 12 }}
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      placeholder="e.g. xdr-security"
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCategory(); } }}
                    />
                    <button type="button" className="adm-btn adm-btn--primary adm-btn--sm" onClick={addCategory}>Add</button>
                    <button type="button" className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => { setShowNewCategory(false); setNewCategoryInput(""); }}>
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>

              <div className="adm-field">
                <label className="adm-label"><Tag size={11} /> Tags (comma-separated)</label>
                <input className="adm-input" name="tags" value={form.tags} onChange={handleChange} placeholder="ai, security, audit" />
              </div>
            </div>

            <button type="submit" className="adm-btn adm-btn--primary" disabled={saving} style={{ width: "100%", justifyContent: "center" }}>
              {saving ? <Loader2 size={16} className="adm-spin" /> : <Save size={16} />}
              {saving ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
