import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import { 
  getAdminBlogs, 
  reorderBlogs, 
  bulkUpdateBlogs, 
  getSlots, 
  addSlot, 
  deleteSlot,
  deleteBlog,
  bulkCreateBlogs
} from "../api/blog";
import AiratShell from "../components/AiratShell";
import { SEO } from "../components/SEO";
import { 
  GripVertical, 
  CheckSquare, 
  Square, 
  Calendar, 
  Globe, 
  Trash2, 
  Plus, 
  Clock,
  FileJson,
  X,
  AlertCircle,
  Loader2,
  Check
} from "lucide-react";
import "../styles/inner-pages.css";
import "../styles/blog-mgmt.css";
import "../styles/import-modal.css";

interface Blog {
  id: string;
  title: string;
  status: string;
  sort_order: number;
  published_at: string | null;
  created_at: string;
}

interface Slot {
  id: string;
  slot_time: string;
  day_of_week: number | null;
}

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotDay, setNewSlotDay] = useState<string>("null"); // "null" for daily, or "0"-"6"
  
  // Import Modal State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const fetchData = async () => {
    try {
      const [blogData, slotData] = await Promise.all([getAdminBlogs(), getSlots()]);
      setBlogs(blogData.blogs);
      setSlots(slotData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImport = async () => {
    setImportError(null);
    setIsImporting(true);
    try {
      const data = JSON.parse(importJson);
      const posts = Array.isArray(data) ? data : [data];
      
      // Basic validation
      for (const post of posts) {
        if (!post.title) throw new Error("Each post must have a title");
      }

      const result = await bulkCreateBlogs(posts);
      alert(`Successfully imported ${result.created_count} posts.`);
      if (result.error_count > 0) {
        console.warn(`${result.error_count} posts failed to import:`, result.errors);
      }
      
      setShowImportModal(false);
      setImportJson("");
      fetchData();
    } catch (err: any) {
      setImportError(err.message || "Invalid JSON format");
    } finally {
      setIsImporting(false);
    }
  };

  const handleReorder = (newOrder: Blog[]) => {
    setBlogs(newOrder);
  };

  const saveOrder = async () => {
    const orders = blogs.map((b, index) => ({ id: b.id, sort_order: index }));
    try {
      await reorderBlogs(orders);
    } catch (err) {
      console.error("Failed to save order:", err);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkPublish = async () => {
    if (selectedIds.length === 0) return;
    try {
      await bulkUpdateBlogs(selectedIds, "published", new Date().toISOString());
      setSelectedIds([]);
      fetchData();
    } catch (err) {
      console.error("Bulk publish failed:", err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} posts?`)) return;
    try {
      await Promise.all(selectedIds.map(id => deleteBlog(id)));
      setSelectedIds([]);
      fetchData();
    } catch (err) {
      console.error("Bulk delete failed:", err);
    }
  };

  const handleAddSlot = async () => {
    if (!newSlotTime) return;
    try {
      const day = newSlotDay === "null" ? null : parseInt(newSlotDay);
      await addSlot(newSlotTime, day);
      setNewSlotTime("");
      fetchData();
    } catch (err) {
      console.error("Add slot failed:", err);
    }
  };

  const handleBulkSchedule = async () => {
    if (selectedIds.length === 0) return;
    const dateStr = window.prompt("Enter publication date (YYYY-MM-DD HH:MM):", new Date().toISOString().slice(0, 16).replace("T", " "));
    if (!dateStr) return;
    try {
      const published_at = new Date(dateStr).toISOString();
      await bulkUpdateBlogs(selectedIds, "draft", published_at);
      setSelectedIds([]);
      fetchData();
    } catch (err) {
      alert("Invalid date format. Use YYYY-MM-DD HH:MM");
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      await deleteSlot(id);
      fetchData();
    } catch (err) {
      console.error("Delete slot failed:", err);
    }
  };

  const stats = {
    total: blogs.length,
    drafts: blogs.filter(b => b.status === "draft").length,
    published: blogs.filter(b => b.status === "published").length
  };

  return (
    <AiratShell>
      <SEO title="Manage Blogs | AIRAT Admin" description="Rearrange and schedule AIRAT Pulse publications." />

      <main className="bm-container">
        <header className="bm-header">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1>Blog Management</h1>
              <p className="hint">Drag rows to set priority order. Top draft publishes next.</p>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                onClick={() => setShowImportModal(true)}
                className="bm-action-btn" 
                style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
              >
                <FileJson size={16} /> Import JSON
              </button>
              <Link to="/admin/create-blog" className="bm-action-btn bm-action-btn--primary">
                <Plus size={16} /> New Post
              </Link>
            </div>
          </div>
        </header>

        <section className="bm-stats-row">
          <div className="bm-stat-card">
            <div className="bm-stat-label">Total Articles</div>
            <div className="bm-stat-value">{stats.total}</div>
          </div>
          <div className="bm-stat-card" style={{ borderLeft: "4px solid #00ffff" }}>
            <div className="bm-stat-label">Drafts in Queue</div>
            <div className="bm-stat-value">{stats.drafts}</div>
          </div>
          <div className="bm-stat-card">
            <div className="bm-stat-label">Published</div>
            <div className="bm-stat-value">{stats.published}</div>
          </div>
        </section>

        <div className="bm-table-wrap">
          <div className="bm-table-header">
            <span></span>
            <span>Status</span>
            <span>Title</span>
            <span>Scheduled</span>
            <span>Created</span>
            <span></span>
          </div>

          {isLoading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "var(--text-dim)" }}>Loading queue...</div>
          ) : (
            <Reorder.Group axis="y" values={blogs} onReorder={handleReorder} className="bm-list">
              {blogs.map((blog) => (
                <Reorder.Item 
                  key={blog.id} 
                  value={blog}
                  onDragEnd={saveOrder}
                  className={`bm-row ${selectedIds.includes(blog.id) ? "bm-row--selected" : ""}`}
                >
                  <div className="bm-drag-handle">
                    <GripVertical size={16} />
                  </div>
                  <div>
                    <span className={`bm-badge bm-badge--${blog.status}`}>
                      {blog.status}
                    </span>
                  </div>
                  <div style={{ fontWeight: 400 }}>{blog.title}</div>
                  <div style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                    {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : "Auto"}
                  </div>
                  <div style={{ color: "var(--text-dim)", fontSize: "12px" }}>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSelect(blog.id); }}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: selectedIds.includes(blog.id) ? "#00ffff" : "var(--text-dim)" }}
                  >
                    {selectedIds.includes(blog.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>

        {selectedIds.length > 0 && (
          <div className="bm-action-bar">
            <span style={{ fontSize: "12px" }}>{selectedIds.length} items selected</span>
            <button className="bm-action-btn" onClick={handleBulkPublish}>
              <Globe size={14} /> Publish Now
            </button>
            <button className="bm-action-btn" onClick={handleBulkSchedule}>
              <Calendar size={14} /> Schedule...
            </button>
            <button className="bm-action-btn" style={{ color: "#ff4444" }} onClick={handleBulkDelete}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}

        <section className="bm-slots-section">
          <h2 className="bm-slots-title">
            <Clock size={20} style={{ display: "inline", marginRight: "10px", verticalAlign: "middle" }} />
            Automated Publication Slots
          </h2>
          <div className="bm-slots-grid">
            {slots.map(slot => (
              <div key={slot.id} className="bm-slot-card">
                <div className="bm-slot-time">
                  {slot.slot_time.toString().slice(0, 5)}
                  <span style={{ fontSize: "10px", marginLeft: "8px", color: "var(--text-dim)" }}>
                    {slot.day_of_week === null ? "DAILY" : ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][slot.day_of_week]}
                  </span>
                </div>
                <button className="bm-delete-btn" onClick={() => handleDeleteSlot(slot.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <div className="bm-slot-card" style={{ borderStyle: "dashed", flexDirection: "row", gap: "12px", height: "auto", padding: "12px", alignItems: "center", width: "100%", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1", minWidth: "150px" }}>
                <Clock size={14} style={{ color: "var(--text-dim)" }} />
                <input 
                  type="time" 
                  className="be-field__input" 
                  value={newSlotTime}
                  onChange={e => setNewSlotTime(e.target.value)}
                  style={{ width: "100%", marginBottom: 0 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: "1", minWidth: "150px" }}>
                <Calendar size={14} style={{ color: "var(--text-dim)" }} />
                <select 
                  className="be-field__select" 
                  value={newSlotDay}
                  onChange={e => setNewSlotDay(e.target.value)}
                  style={{ width: "100%", padding: "6px", fontSize: "13px" }}
                >
                  <option value="null">Daily</option>
                  <option value="0">Monday</option>
                  <option value="1">Tuesday</option>
                  <option value="2">Wednesday</option>
                  <option value="3">Thursday</option>
                  <option value="4">Friday</option>
                  <option value="5">Saturday</option>
                  <option value="6">Sunday</option>
                </select>
              </div>
              <button className="bm-action-btn bm-action-btn--primary" onClick={handleAddSlot} style={{ whiteSpace: "nowrap" }}>
                <Plus size={14} /> Add Slot
              </button>
            </div>
          </div>
          <p className="hint" style={{ marginTop: "16px" }}>
            The system automatically publishes the topmost draft at these times if no specific post is scheduled.
          </p>
        </section>
      </main>

      <AnimatePresence>
        {showImportModal && (
          <div className="im-overlay">
            <motion.div 
              className="im-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="im-header">
                <h3>Import Blog Posts</h3>
                <button className="im-close" onClick={() => setShowImportModal(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="im-body">
                <p>Paste a JSON array of blog posts to import them in bulk.</p>
                <textarea 
                  className="im-textarea"
                  placeholder='[
  {
    "title": "My Awesome Blog",
    "body_markdown": "Content goes here...",
    "category": "Tech"
  }
]'
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                />
                {importError && (
                  <div className="im-error">
                    <AlertCircle size={14} />
                    {importError}
                  </div>
                )}
              </div>
              <div className="im-footer">
                <button className="im-btn im-btn--secondary" onClick={() => setShowImportModal(false)}>
                  Cancel
                </button>
                <button 
                  className="im-btn im-btn--primary" 
                  disabled={!importJson || isImporting}
                  onClick={handleImport}
                >
                  {isImporting ? (
                    <>
                      <Loader2 size={14} className="bm-spinner" style={{ display: "inline", marginRight: "8px" }} />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Check size={14} style={{ display: "inline", marginRight: "8px" }} />
                      Import JSON
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AiratShell>
  );
}
