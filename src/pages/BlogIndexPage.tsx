import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import NewsletterSignup from "../components/NewsletterSignup";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { listPublishedBlogs, formatCategoryLabel, unsubscribeFromInsights, type Blog } from "../api/blog";
import {
  BLOG_INDEX_HERO,
  BLOG_INDEX_SEO,
} from "../content/blog/blogPageCopy";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/insights.css";

/** Known research-area descriptions for well-known categories. */
const KNOWN_CLUSTER_DESCRIPTIONS: Record<string, string> = {
  "ai-llm":
    "RAG architecture, evaluation harnesses, governed deployment, agent boundaries, and LLM procurement — for teams taking AI from prototype to production.",
  "cyber-soc":
    "Detection engineering, SOC automation, evidence design, XDR cutover, and threat-informed defence — built for security teams that write runbooks, not slide decks.",
  "data-search":
    "Medallion architecture, streaming pipelines, OpenSearch migrations, real-time analytics, and KYC/ML operational discipline — for platform and data engineering leads.",
  playbooks:
    "Cutover plans, SLA frameworks, bid writing strategy, observability design, and evaluation ownership — practical references for technical buyers and delivery leads.",
  "case-thinking":
    "Structured thinking on platform decisions, vendor evaluation, architecture trade-offs, and the reasoning patterns that hold up under board-level scrutiny.",
};

const formatDateLong = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatDateTable = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });

export default function BlogIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unsubBanner, setUnsubBanner] = useState<string | null>(null);
  const [visiblePubsCount, setVisiblePubsCount] = useState(7);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await listPublishedBlogs();
        const sortedBlogs = [...data.blogs].sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
        setBlogs(sortedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle ?unsubscribe=email query param from email links
  useEffect(() => {
    const unsubEmail = searchParams.get("unsubscribe");
    if (unsubEmail) {
      unsubscribeFromInsights(unsubEmail)
        .then(() => setUnsubBanner("You have been unsubscribed from Insights notifications."))
        .catch(() => setUnsubBanner("Could not unsubscribe. The email may not be in our list."));
      // Remove the query param from URL
      const next = new URLSearchParams(searchParams);
      next.delete("unsubscribe");
      setSearchParams(next, { replace: true });
    }
  }, []);

  /** Derive categories dynamically from published blogs. */
  const categories = useMemo(() => {
    const catMap = new Map<string, number>();
    blogs.forEach((b) => {
      if (b.category) catMap.set(b.category, (catMap.get(b.category) || 0) + 1);
    });
    return Array.from(catMap.entries()).map(([id, count]) => ({
      id,
      label: formatCategoryLabel(id),
      description:
        KNOWN_CLUSTER_DESCRIPTIONS[id] ||
        `Explore ${count} article${count === 1 ? "" : "s"} on ${formatCategoryLabel(id).toLowerCase()}.`,
      count,
    }));
  }, [blogs]);

  /** Check if the current category param is valid. */
  const activeCategory = useMemo(() => {
    if (!categoryParam) return null;
    return categories.some((c) => c.id === categoryParam) ? categoryParam : null;
  }, [categoryParam, categories]);

  const setCategory = (cat: string | null) => {
    if (cat == null) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
    setSearchQuery("");
    setVisiblePubsCount(7);
  };

  const filtered = useMemo(() => {
    let list = blogs;
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [blogs, activeCategory, searchQuery]);

  const featured = blogs[0];
  const recentSidebar = blogs.slice(1, 5);

  return (
    <AiratShell>
      <SEO title={BLOG_INDEX_SEO.title} description={BLOG_INDEX_SEO.description} />
      <SiteHeader />

      <main className="bi-main" id="main-content">

        {/* ── UNSUBSCRIBE BANNER ─────────────────────────────────────── */}
        {unsubBanner && (
          <div className="bi-unsub-banner" role="status">
            <p>{unsubBanner}</p>
            <button type="button" onClick={() => setUnsubBanner(null)} aria-label="Dismiss">✕</button>
          </div>
        )}

        {/* ── 1. SPLIT HERO ─────────────────────────────────────────── */}
        <section className="bi-hero" aria-labelledby="bi-h1">
          <div className="bi-hero__left">
            <p className="bi-hero__eyebrow">{BLOG_INDEX_HERO.eyebrow}</p>
            <h1 id="bi-h1" className="bi-hero__h1">Insights</h1>
          </div>
          <div className="bi-hero__right">
            <p className="bi-hero__lead">{BLOG_INDEX_HERO.lead}</p>
            <p className="bi-hero__sub">{BLOG_INDEX_HERO.subNote}</p>
          </div>
        </section>

        <div className="bi-rule" aria-hidden="true" />

        {/* ── 2. DOMAIN GRID (dynamic from blog categories) ──────── */}
        {categories.length > 0 && (
          <section className="bi-domains" aria-label="Research areas">
            {categories.slice(0, 4).map((cluster) => (
              <div key={cluster.id} className="bi-domain">
                <h2 className="bi-domain__title">{cluster.label}</h2>
                <p className="bi-domain__body">{cluster.description}</p>
                <Link
                  to={`/blog/category/${cluster.id}`}
                  className="bi-domain__link"
                >
                  {cluster.count} article{cluster.count === 1 ? "" : "s"} →
                </Link>
              </div>
            ))}
          </section>
        )}

        <div className="bi-rule" aria-hidden="true" />

        {/* ── 3. FEATURED + SIDEBAR ─────────────────────────────────── */}
        {!activeCategory && !searchQuery && featured && (
          <section className="bi-feature" aria-labelledby="bi-featured-heading">
            {/* Left  -  abstract visual + featured article */}
            <div className="bi-feature__left">
              <Link
                to={`/blog/${featured.slug}`}
                className="bi-feature__visual"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="bi-feature__gradient" />
                <div className="bi-feature__visual-text">
                  <span className="bi-feature__visual-cat">
                    {formatCategoryLabel(featured.category)}
                  </span>
                  <span className="bi-feature__visual-title">{featured.title}</span>
                </div>
              </Link>
              <Link
                to={`/blog/${featured.slug}`}
                className="bi-feature__article-link"
              >
                <p className="bi-feature__date">
                  {formatCategoryLabel(featured.category)} &nbsp;·&nbsp; {formatDateLong(featured.published_at)}
                </p>
                <h3 id="bi-featured-heading" className="bi-feature__title">
                  {featured.title}
                </h3>
                <p className="bi-feature__desc">{featured.description}</p>
              </Link>
            </div>

            {/* Right  -  recent article list */}
            <div className="bi-feature__right">
              {recentSidebar.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="bi-sidebar-row"
                >
                  <div className="bi-sidebar-row__meta">
                    <span className="bi-sidebar-row__cat">{formatCategoryLabel(post.category)}</span>
                    <span className="bi-sidebar-row__date">{formatDateLong(post.published_at)}</span>
                  </div>
                  <h3 className="bi-sidebar-row__title">{post.title}</h3>
                  <p className="bi-sidebar-row__desc">{post.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="bi-rule" aria-hidden="true" />

        {/* ── 4. PUBLICATIONS TABLE ─────────────────────────────────── */}
        <section className="bi-pubs" aria-labelledby="bi-pubs-heading">
          <div className="bi-pubs__header">
            <h2 id="bi-pubs-heading" className="bi-pubs__title">Publications</h2>
            <div className="bi-pubs__search-wrap">
              <label htmlFor="bi-search" className="sr-only">Search publications</label>
              <svg className="bi-pubs__search-icon" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6.5" cy="6.5" r="4.5" />
                <path d="M10 10l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                id="bi-search"
                type="search"
                className="bi-pubs__search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchParams({}, { replace: true });
                  setVisiblePubsCount(7);
                }}
              />
            </div>
          </div>

          {/* Category filter row — dynamic */}
          <div className="bi-pubs__filters" role="group" aria-label="Filter by area">
            <button
              type="button"
              className={`bi-pubs__chip${!activeCategory ? " bi-pubs__chip--active" : ""}`}
              onClick={() => { setCategory(null); setSearchQuery(""); }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`bi-pubs__chip${activeCategory === cat.id ? " bi-pubs__chip--active" : ""}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bi-table" role="table" aria-label="Publications">
            <div className="bi-table__head" role="row" aria-hidden="true">
              <span role="columnheader">Date</span>
              <span role="columnheader">Area</span>
              <span role="columnheader">Title</span>
            </div>
            {filtered.length === 0 ? (
              <div className="bi-table__empty">
                <p>{isLoading ? "Loading articles..." : "No articles match."}</p>
                {!isLoading && (
                  <button
                    type="button"
                    className="bi-table__reset"
                    onClick={() => { setCategory(null); setSearchQuery(""); }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {filtered.slice(0, visiblePubsCount).map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="bi-table__row"
                    role="row"
                  >
                    <span className="bi-table__date" role="cell">{formatDateTable(post.published_at)}</span>
                    <span className="bi-table__cat" role="cell">{formatCategoryLabel(post.category)}</span>
                    <span className="bi-table__title" role="cell">{post.title}</span>
                  </Link>
                ))}
                
                {filtered.length > visiblePubsCount && (
                  <div className="bi-table__more-wrap">
                    <button
                      type="button"
                      className="bi-table__more-btn"
                      onClick={() => setVisiblePubsCount((prev) => prev + 7)}
                    >
                      Show more
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <div className="bi-rule" aria-hidden="true" />

        {/* ── 5. STAY CURRENT (newsletter) ─────────────────────────── */}
        <section className="bi-newsletter" aria-label="Newsletter signup">
          <NewsletterSignup />
        </section>

        <CtaBand
          title="Talk to AiRAT about your system"
          body="Bring a concrete scenario — search latency, SOC evidence gaps, or RAG drift."
          primary={{ label: "Explore services", to: "/services" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
