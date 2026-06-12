import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reorder } from "framer-motion";
import {
  Plus, Trash2, Globe, GripVertical,
  Search, RefreshCw, Eye, Pencil, FileJson,
  AlertCircle, Clock,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import {
  getAdminBlogs, reorderBlogs, bulkUpdateBlogs,
  deleteBlog, bulkCreateBlogs,
} from "../api/blog";

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  category: string;
  status: string;
  sort_order: number;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filtered, setFiltered] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminBlogs();
      setBlogs(data.blogs);
    } catch {
      setError("Failed to load blogs. Make sure you are logged in.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    let list = blogs;
    if (statusFilter !== "all") list = list.filter((b) => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [blogs, search, statusFilter]);

  function toggle(id: string) {
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  function toggleAll() {
    setSelected(selected.length === filtered.length ? [] : filtered.map((b) => b.id));
  }

  async function handleBulkPublish() {
    if (!selected.length) return;
    try {
      await bulkUpdateBlogs(selected, "published", new Date().toISOString());
      setSelected([]);
      load();
    } catch { /* */ }
  }

  async function handleBulkDelete() {
    if (!selected.length) return;
    if (!window.confirm(`Delete ${selected.length} post(s)?`)) return;
    try {
      await Promise.all(selected.map((id) => deleteBlog(id)));
      setSelected([]);
      load();
    } catch { /* */ }
  }

  async function handleSingleDelete(id: string) {
    if (!window.confirm("Delete this post?")) return;
    try { await deleteBlog(id); load(); } catch { /* */ }
  }

  function handleReorder(newOrder: Blog[]) { setBlogs(newOrder); }

  async function saveOrder() {
    const orders = blogs.map((b, i) => ({ id: b.id, sort_order: i }));
    try { await reorderBlogs(orders); } catch { /* */ }
  }

  async function handleImport() {
    setImportError(null);
    setImporting(true);
    try {
      const data = JSON.parse(importJson);
      const posts = Array.isArray(data) ? data : [data];
      for (const p of posts) { if (!p.title) throw new Error("Each post needs a title"); }
      const result = await bulkCreateBlogs(posts);
      alert(`Imported ${result.created_count} posts.`);
      setShowImport(false);
      setImportJson("");
      load();
    } catch (err: any) {
      setImportError(err.message || "Invalid JSON");
    } finally {
      setImporting(false);
    }
  }

  const stats = {
    total: blogs.length,
    published: blogs.filter((b) => b.status === "published").length,
    drafts: blogs.filter((b) => b.status === "draft").length,
  };

  return (
    <AdminLayout
      title="Blog Management"
      actions={
        <>
          <button className="adm-btn" onClick={() => setShowImport(true)}>
            <FileJson size={14} /> Import JSON
          </button>
          <Link to="/admin/blogs/new" className="adm-btn adm-btn--primary">
            <Plus size={14} /> New Post
          </Link>
        </>
      }
    >
      {/* Stats */}
      <div className="adm-stats" style={{ marginBottom: 24 }}>
        <div className="adm-stat">
          <div className="adm-stat__value">{stats.total}</div>
          <div className="adm-stat__label">Total Posts</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__value">{stats.published}</div>
          <div className="adm-stat__label">Published</div>
        </div>
        <div className="adm-stat adm-stat--yellow">
          <div className="adm-stat__value">{stats.drafts}</div>
          <div className="adm-stat__label">Drafts in Queue</div>
        </div>
      </div>

      {error && (
        <div className="adm-alert adm-alert--error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="adm-card" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--adm-muted)" }}>{selected.length} selected</span>
          <button className="adm-btn adm-btn--sm" onClick={handleBulkPublish}>
            <Globe size={13} /> Publish Now
          </button>
          <button className="adm-btn adm-btn--sm adm-btn--danger" onClick={handleBulkDelete}>
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}

      {/* Table */}
      <div className="adm-table-wrap">
        <div className="adm-table-toolbar">
          <div className="adm-search-wrap">
            <Search size={14} />
            <input
              className="adm-search"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="adm-table-toolbar__actions">
            <select
              className="adm-select"
              style={{ width: "auto", padding: "7px 10px" }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={load}>
              <RefreshCw size={13} className={loading ? "adm-spin" : ""} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="adm-table__loading">Loading posts…</div>
        ) : filtered.length === 0 ? (
          <div className="adm-table__empty">No posts found.</div>
        ) : (
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: 32 }}>
                    <input
                      type="checkbox"
                      checked={selected.length === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                    />
                  </th>
                  <th style={{ width: 24 }}></th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Created</th>
                  <th></th>
                </tr>
              </thead>
            </table>
            <Reorder.Group axis="y" values={blogs} onReorder={handleReorder}>
              {filtered.map((blog) => (
                <Reorder.Item
                  key={blog.id}
                  value={blog}
                  onDragEnd={saveOrder}
                  style={{
                    listStyle: "none",
                    borderBottom: "1px solid var(--adm-border)",
                    display: "grid",
                    gridTemplateColumns: "32px 24px 1fr 120px 120px 100px 110px 110px 100px",
                    alignItems: "center",
                    padding: "0 16px",
                    gap: 0,
                    background: selected.includes(blog.id) ? "rgba(0,229,255,0.04)" : "transparent",
                    cursor: "default",
                    minHeight: 50,
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selected.includes(blog.id)}
                      onChange={() => toggle(blog.id)}
                    />
                  </div>
                  <div className="adm-drag-handle">
                    <GripVertical size={14} />
                  </div>
                  <div className="adm-truncate" style={{ padding: "12px 16px 12px 0", fontWeight: 500, color: "#fff" }}>
                    {blog.title}
                  </div>
                  <div style={{ padding: "12px 16px 12px 0" }}>
                    <span className="adm-badge adm-badge--dim">{blog.category || "-"}</span>
                  </div>
                  <div style={{ padding: "12px 16px 12px 0", fontSize: 12, color: "var(--adm-muted)" }}>
                    {blog.author || "-"}
                  </div>
                  <div style={{ padding: "12px 16px 12px 0" }}>
                    <span className={`adm-badge adm-badge--${blog.status}`}>{blog.status}</span>
                  </div>
                  <div style={{ padding: "12px 16px 12px 0", fontSize: 12, color: "var(--adm-muted)" }}>
                    {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : "Auto"}
                  </div>
                  <div style={{ padding: "12px 16px 12px 0", fontSize: 12, color: "var(--adm-muted)" }}>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <div className="adm-row-actions" style={{ padding: "12px 0" }}>
                    {blog.status === "published" && (
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="adm-btn adm-btn--ghost adm-btn--sm"
                        title="Preview"
                      >
                        <Eye size={13} />
                      </a>
                    )}
                    <Link to={`/admin/blogs/${blog.id}/edit`} className="adm-btn adm-btn--ghost adm-btn--sm" title="Edit">
                      <Pencil size={13} />
                    </Link>
                    <button className="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger" onClick={() => handleSingleDelete(blog.id)} title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        )}

        <div className="adm-pagination">
          <span className="adm-pagination__info">Showing {filtered.length} of {blogs.length} posts</span>
        </div>
      </div>

      {/* Hint */}
      <p style={{ fontSize: 12, color: "var(--adm-dim)", marginTop: 12 }}>
        <Clock size={12} style={{ display: "inline", marginRight: 4 }} />
        Drag rows to set publish priority order. Topmost draft publishes next.
      </p>

      {/* Import Modal */}
      {showImport && (
        <div className="adm-modal-overlay">
          <div className="adm-modal">
            <div className="adm-modal__header">
              <div className="adm-modal__title">Import Blog Posts (JSON)</div>
              <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setShowImport(false)}>✕</button>
            </div>
            <div className="adm-modal__body">
              <p style={{ color: "var(--adm-muted)", marginBottom: 12, fontSize: 13 }}>
                Paste a JSON array of blog post objects. Each must have a <code>title</code> field.
              </p>
              <textarea
                className="adm-textarea adm-textarea--mono"
                style={{ minHeight: 240 }}
                placeholder={'[\n  {\n    "title": "My Post",\n    "body_markdown": "...",\n    "category": "Tech"\n  }\n]'}
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
              />
              {importError && (
                <div className="adm-alert adm-alert--error" style={{ marginTop: 10 }}>
                  <AlertCircle size={14} /> {importError}
                </div>
              )}
            </div>
            <div className="adm-modal__footer">
              <button className="adm-btn" onClick={() => setShowImport(false)}>Cancel</button>
              <button
                className="adm-btn adm-btn--primary"
                disabled={!importJson || importing}
                onClick={handleImport}
              >
                {importing ? "Importing…" : "Import"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
