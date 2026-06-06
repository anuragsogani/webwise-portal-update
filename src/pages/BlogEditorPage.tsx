import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createBlog, BlogCreateRequest, listCategories, formatCategoryLabel } from "../api/blog";
import AiratShell from "../components/AiratShell";
import { SEO } from "../components/SEO";
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  Tag, 
  User, 
  Type,
  FileText,
  Hash,
  List,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  FileJson,
  ClipboardPaste,
  X,
  Plus
} from "lucide-react";
import "../styles/inner-pages.css";
import "../styles/blog-editor.css";

export default function BlogEditorPage() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedJson, setPastedJson] = useState("");

  // Dynamic categories from API
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setAvailableCategories(data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    author: "",
    category: "",
    tags: "",
    body_markdown: "",
    key_takeaways: "",
    faqs: "",
    published_at: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate slug from title
      if (name === "title" && !prev.slug) {
        const generatedSlug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        newData.slug = generatedSlug;
      }
      return newData;
    });
  };

  const applyJson = (jsonObj: any) => {
    const findKey = (patterns: string[]) => {
      const keys = Object.keys(jsonObj);
      for (const pattern of patterns) {
        const p = pattern.toLowerCase().replace(/[^a-z0-9]/g, "");
        const match = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, "") === p);
        if (match) return jsonObj[match];
      }
      return null;
    };

    const title = findKey(["title", "post title", "name"]) || "";
    const body = findKey(["body markdown", "body_markdown", "body", "content", "markdown", "text"]);
    const takeaways = findKey(["key takeaways", "key take aways", "key take ways", "key takeaways", "key takeways", "takeaways", "highlights"]);
    const faqs = findKey(["faqs", "faq", "questions"]);

    setFormData({
      title: title,
      slug: findKey(["slug", "url"]) || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : ""),
      description: findKey(["description", "summary", "desc"]) || "",
      author: findKey(["author", "writer", "by"]) || "",
      category: findKey(["category", "type"]) || "",
      tags: Array.isArray(jsonObj.tags) ? jsonObj.tags.join(", ") : (findKey(["tags"]) || ""),
      body_markdown: body || "",
      key_takeaways: takeaways ? (typeof takeaways === "string" ? takeaways : JSON.stringify(takeaways, null, 2)) : "",
      faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs, null, 2)) : "",
      published_at: findKey(["published_at", "publish_date", "date"]) || ""
    });
    setSuccess(false);
    setError(null);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        applyJson(json);
      } catch (err) {
        setError("Invalid JSON file format");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handlePasteApply = () => {
    try {
      const json = JSON.parse(pastedJson);
      applyJson(json);
      setShowPasteModal(false);
      setPastedJson("");
    } catch (err) {
      setError("Invalid JSON content");
    }
  };

  const handleAddNewCategory = () => {
    const slug = newCategoryInput
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!slug) return;
    if (!availableCategories.includes(slug)) {
      setAvailableCategories((prev) => [...prev, slug]);
    }
    setFormData((prev) => ({ ...prev, category: slug }));
    setNewCategoryInput("");
    setShowNewCategory(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: BlogCreateRequest = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
        key_takeaways: formData.key_takeaways ? JSON.parse(formData.key_takeaways) : [],
        faqs: formData.faqs ? JSON.parse(formData.faqs) : [],
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null
      };
      
      await createBlog(payload);
      setSuccess(true);
      // Optional: redirect after success
      // setTimeout(() => navigate("/blog"), 3000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AiratShell>
      <SEO title="Create Blog Post | AIRAT" description="Admin portal for creating blog posts." />

      <main className="be-container">
        <header className="be-header">
          <Link to="/blog" className="be-back-link">
            <ArrowLeft size={14} />
            Back to Insights
          </Link>
          <div className="be-title-wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <div>
                <h1>Create Post</h1>
                <p className="hint">Schedule and publish new research to AIRAT Pulse</p>
              </div>
              <div className="be-import-actions" style={{ display: "flex", gap: "12px" }}>
                <button 
                  type="button"
                  className="be-action-btn be-action-btn--secondary" 
                  onClick={() => setShowPasteModal(true)}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <ClipboardPaste size={16} />
                  <span>Paste JSON</span>
                </button>
                <label className="be-action-btn be-action-btn--secondary" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileJson size={16} />
                  <span>Import JSON</span>
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleJsonUpload} 
                    style={{ display: "none" }} 
                  />
                </label>
              </div>
            </div>
          </div>
        </header>

        {showPasteModal && (
          <div className="be-modal-overlay">
            <div className="be-modal">
              <div className="be-modal__header">
                <h3>Paste JSON Content</h3>
                <button type="button" onClick={() => setShowPasteModal(false)} className="be-modal__close">
                  <X size={18} />
                </button>
              </div>
              <div className="be-modal__body">
                <textarea 
                  className="be-field__textarea" 
                  style={{ minHeight: "300px", fontFamily: "monospace", fontSize: "12px" }}
                  placeholder='{ "title": "...", "body_markdown": "..." }'
                  value={pastedJson}
                  onChange={(e) => setPastedJson(e.target.value)}
                />
              </div>
              <div className="be-modal__footer">
                <button type="button" className="be-submit" onClick={handlePasteApply}>
                  Parse & Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="be-status be-status--success">
            <CheckCircle2 size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            Post created successfully! It will be published at the scheduled time.
          </div>
        )}

        {error && (
          <div className="be-status be-status--error">
            <AlertCircle size={18} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            {error}
          </div>
        )}

        <form className="be-form" onSubmit={handleSubmit}>
          <div className="be-layout">
            <div className="be-main">
              <div className="be-field">
                <label className="be-field__label">
                  <Type size={12} /> Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="be-field__input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="The Future of AI Risk Metrics..."
                  required
                />
              </div>

              <div className="be-field">
                <label className="be-field__label">
                  <FileText size={12} /> Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="be-field__input"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A brief summary for the index page..."
                />
              </div>

              <div className="be-field">
                <label className="be-field__label">
                  <FileText size={12} /> Body (Markdown)
                </label>
                <textarea
                  name="body_markdown"
                  className="be-field__textarea"
                  value={formData.body_markdown}
                  onChange={handleChange}
                  placeholder="Write your research here..."
                  required
                />
              </div>

              <div className="be-field">
                <label className="be-field__label">
                  <List size={12} /> Key Takeaways (JSON Array)
                </label>
                <textarea
                  name="key_takeaways"
                  className="be-field__textarea"
                  style={{ minHeight: "150px" }}
                  value={formData.key_takeaways}
                  onChange={handleChange}
                  placeholder='[ "Key point 1", "Key point 2" ]'
                />
              </div>

              <div className="be-field">
                <label className="be-field__label">
                  <HelpCircle size={12} /> FAQs (JSON Array of &#123; "q": "...", "a": "..." &#125;)
                </label>
                <textarea
                  name="faqs"
                  className="be-field__textarea"
                  style={{ minHeight: "150px" }}
                  value={formData.faqs}
                  onChange={handleChange}
                  placeholder='[ { "q": "Question?", "a": "Answer." } ]'
                />
              </div>
            </div>

            <aside className="be-sidebar">
              <div className="be-card">
                <h3 className="be-card__title">Publishing</h3>
                
                <div className="be-field">
                  <label className="be-field__label">
                    <Calendar size={12} /> Schedule
                  </label>
                  <input
                    type="datetime-local"
                    name="published_at"
                    className="be-field__input"
                    value={formData.published_at}
                    onChange={handleChange}
                  />
                  <p className="be-hint">
                    Current time is {new Date().toLocaleTimeString()}. 
                    Set a future time for automatic publishing.
                  </p>
                </div>

                <div className="be-field">
                  <label className="be-field__label">
                    <Hash size={12} /> URL Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    className="be-field__input"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="my-blog-post"
                  />
                </div>
              </div>

              <div className="be-card">
                <h3 className="be-card__title">Classification</h3>
                
                <div className="be-field">
                  <label className="be-field__label">
                    <User size={12} /> Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    className="be-field__input"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Expert Name"
                  />
                </div>

                <div className="be-field">
                  <label className="be-field__label">
                    <Tag size={12} /> Category
                  </label>
                  <select 
                    name="category" 
                    className="be-field__select"
                    value={formData.category} 
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {availableCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {formatCategoryLabel(cat)}
                      </option>
                    ))}
                  </select>
                  {!showNewCategory ? (
                    <button
                      type="button"
                      onClick={() => setShowNewCategory(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginTop: "6px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        color: "var(--lime, #a3e635)",
                        background: "transparent",
                        border: "1px solid rgba(163, 230, 53, 0.3)",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={12} /> Add new category
                    </button>
                  ) : (
                    <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}>
                      <input
                        type="text"
                        className="be-field__input"
                        value={newCategoryInput}
                        onChange={(e) => setNewCategoryInput(e.target.value)}
                        placeholder="e.g. xdr-security"
                        style={{ flex: 1, fontSize: "12px" }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddNewCategory();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddNewCategory}
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          color: "#000",
                          background: "var(--lime, #a3e635)",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowNewCategory(false); setNewCategoryInput(""); }}
                        style={{
                          padding: "4px 8px",
                          fontSize: "12px",
                          color: "var(--muted, #888)",
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="be-field">
                  <label className="be-field__label">
                    <Tag size={12} /> Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    className="be-field__input"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="ai, safety, audit"
                  />
                </div>
              </div>

              <button className="be-submit" type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : (
                  <>
                    <Save size={18} />
                    Save Blog Post
                  </>
                )}
              </button>
            </aside>
          </div>
        </form>
      </main>

      
    </AiratShell>
  );
}
