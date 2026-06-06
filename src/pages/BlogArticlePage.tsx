import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import NewsletterSignup from "../components/NewsletterSignup";
import SocialShare from "../components/SocialShare";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { formatCategoryLabel } from "../api/blog";
import { tocFromMarkdownH2 } from "../content/blog/markdownToc";
import { getBlogBySlug, type Blog } from "../api/blog";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { blogPostingSchema, breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { mdToPlainString } from "../lib/mdToPlainString";
import { slugifyHeading } from "../lib/slugifyHeading";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/blog-article-page.css";

const DEFAULT_CTA = "Solving a complex engineering challenge? We build production platforms for security, AI, and data.";

const INLINE_CTA_COPY: Record<string, string> = {
  "ai-llm": "Building a RAG or LLM system in production? We've shipped governed AI for FinTech and enterprise platforms.",
  "cyber-soc": "Dealing with alert noise or SIEM performance issues? We shipped 87% alert reduction for a UAE SOC team.",
  "data-search": "Migrating to OpenSearch or building a data platform? We dropped search latency from 4.2s to 0.35s for a 5M-product catalogue.",
  playbooks: "Working on a complex engineering programme? We build production platforms for security, AI, and data.",
  "case-thinking": "Evaluating vendors or scoping a platform programme? We work with CISOs and CTOs who need straight answers.",
};

function ArticleInlineCta({ category }: { category: string }) {
  return (
    <aside className="ba-inline-cta" aria-label="Talk to AiRAT">
      <p className="ba-inline-cta__copy">{INLINE_CTA_COPY[category] || DEFAULT_CTA}</p>
      <Link className="btn btn--primary ba-inline-cta__link" to="/services">
        Explore services →
      </Link>
    </aside>
  );
}

const DEFAULT_OG_IMAGE = "/og/category-ai.svg";

const CATEGORY_OG_IMAGE: Record<string, string> = {
  "ai-llm": "/og/category-ai.svg",
  "cyber-soc": "/og/category-security.svg",
  "data-search": "/og/category-data.svg",
  playbooks: "/og/category-engineering.svg",
  "case-thinking": "/og/category-engineering.svg",
};

type SectionDoodle = {
  readonly src: string;
  readonly alt: string;
};

type ArticleDoodleSet = {
  readonly hero: string;
  readonly sections: SectionDoodle[];
};

const SD = (src: string, alt: string): SectionDoodle => ({ src, alt });

const ARTICLE_DOODLES: Record<string, ArticleDoodleSet> = {
  "entity-seo-knowledge-graph": {
    hero: "/doodles/entity-seo-knowledge-graph.svg",
    sections: [
      SD("/doodles/entity-sections/tl-dr-summary.svg", "Summary doodle with checklist and connected entity nodes"),
      SD("/doodles/entity-sections/entity-first-intro.svg", "Entity-first search doodle showing graph links replacing isolated keywords"),
      SD("/doodles/entity-sections/google-knowledge-graph.svg", "Knowledge graph doodle with panels connected to a central index"),
      SD("/doodles/entity-sections/entity-clarity-ai-visibility.svg", "AI visibility doodle showing clear and noisy entity paths"),
      SD("/doodles/entity-sections/entity-clarity-checklist.svg", "Checklist doodle with schema fields and sameAs links"),
      SD("/doodles/entity-sections/entity-relationships.svg", "Brand relationship doodle linking people, topics, and services"),
      SD("/doodles/entity-sections/external-entity-authority.svg", "External authority doodle with citation sources feeding a brand node"),
      SD("/doodles/entity-sections/monitoring-entity-accuracy.svg", "Monitoring doodle with dashboard trace and quality check signal"),
      SD("/doodles/entity-sections/key-takeaways.svg", "Key takeaways doodle with stacked summary cards and check marks"),
      SD("/doodles/entity-sections/frequently-asked-questions.svg", "FAQ doodle with question bubbles and verified answer card"),
    ],
  },
  "llm-citation-patterns": {
    hero: "/doodles/model-evaluation.svg",
    sections: [
      SD("/doodles/rag-retrieval.svg", "Retrieval doodle showing answer-first content extraction"),
      SD("/doodles/model-evaluation.svg", "Citation evaluation doodle with scoring and checks"),
      SD("/doodles/hallucination-guard.svg", "Noise suppression doodle for low-quality citation paths"),
      SD("/doodles/entity-sections/entity-relationships.svg", "Entity relationship doodle linking claims to references"),
    ],
  },
  "geo-why-seo-not-enough-2025": {
    hero: "/doodles/rag-retrieval.svg",
    sections: [
      SD("/doodles/entity-sections/entity-first-intro.svg", "Answer-first content doodle for GEO foundations"),
      SD("/doodles/entity-sections/external-entity-authority.svg", "Authority signal doodle for citation trust"),
      SD("/doodles/entity-sections/key-takeaways.svg", "Action-oriented GEO checklist doodle"),
    ],
  },
  "rag-evaluation-ownership-production": {
    hero: "/doodles/rag-retrieval.svg",
    sections: [
      SD("/doodles/rag-retrieval.svg", "RAG pipeline doodle with retrieval and ranking stages"),
      SD("/doodles/model-evaluation.svg", "Evaluation harness doodle with versioned scorecards"),
      SD("/doodles/observability-trace.svg", "Observability doodle for drift and incident replay"),
      SD("/doodles/hallucination-guard.svg", "Guardrail doodle for failure-case suppression"),
    ],
  },
  "opensearch-vs-elastic-cutover-checklist": {
    hero: "/doodles/low-latency-search.svg",
    sections: [
      SD("/doodles/low-latency-search.svg", "Search platform doodle with query and relevance flow"),
      SD("/doodles/zero-downtime-cutover.svg", "Cutover planning doodle with staged traffic shift"),
      SD("/doodles/observability-trace.svg", "Observability doodle for migration validation and rollback"),
    ],
  },
  "soc-automation-evidence-auditability": {
    hero: "/doodles/soc-runbook.svg",
    sections: [
      SD("/doodles/security-detection.svg", "Detection and triage doodle for SOC workflow"),
      SD("/doodles/soc-runbook.svg", "Automation runbook doodle with human approval checkpoints"),
      SD("/doodles/evidence-chain.svg", "Evidence-chain doodle linking alerts to immutable audit records"),
      SD("/doodles/compliance-audit.svg", "Auditability doodle with compliance checklist"),
    ],
  },
  "kyc-ml-pipelines-operational-debt": {
    hero: "/doodles/model-evaluation.svg",
    sections: [
      SD("/doodles/model-evaluation.svg", "KYC model triage doodle with scored decision routes"),
      SD("/doodles/medallion-pipeline.svg", "Pipeline governance doodle for staged KYC data quality"),
      SD("/doodles/compliance-audit.svg", "Compliance review doodle with policy-version checks"),
    ],
  },
  "llm-evaluation-frameworks-procurement": {
    hero: "/doodles/model-evaluation.svg",
    sections: [
      SD("/doodles/model-evaluation.svg", "Evaluation framework doodle with release gate scorecard"),
      SD("/doodles/observability-trace.svg", "Cost and latency observability doodle for FinOps reporting"),
      SD("/doodles/compliance-audit.svg", "Procurement-ready governance doodle with documented controls"),
    ],
  },
  "observability-ai-systems-logs-traces-outputs": {
    hero: "/doodles/observability-trace.svg",
    sections: [
      SD("/doodles/observability-trace.svg", "Trace and log observability doodle for AI workflows"),
      SD("/doodles/rag-retrieval.svg", "Retrieval + generation span breakdown doodle"),
      SD("/doodles/hallucination-guard.svg", "Risk-tier sampling and output filtering doodle"),
    ],
  },
  "real-time-analytics-pipelines-sla-finance": {
    hero: "/doodles/medallion-pipeline.svg",
    sections: [
      SD("/doodles/medallion-pipeline.svg", "Streaming-to-governed-layer doodle for finance metrics"),
      SD("/doodles/zero-downtime-cutover.svg", "SLA continuity doodle with resilient handoff flow"),
      SD("/doodles/compliance-audit.svg", "Finance readout doodle with reconciled KPI checkpoints"),
    ],
  },
  "elk-opensearch-migration-cutover-oncall": {
    hero: "/doodles/zero-downtime-cutover.svg",
    sections: [
      SD("/doodles/low-latency-search.svg", "Search and logs estate doodle before migration"),
      SD("/doodles/zero-downtime-cutover.svg", "Cutover command path doodle for on-call handoff"),
      SD("/doodles/observability-trace.svg", "Post-cutover validation doodle with traces and rollbacks"),
    ],
  },
  "case-based-thinking-platform-bids": {
    hero: "/doodles/platform-devops.svg",
    sections: [
      SD("/doodles/platform-devops.svg", "Platform architecture narrative doodle for bid context"),
      SD("/doodles/model-evaluation.svg", "Decision framework doodle for measurable outcomes"),
      SD("/doodles/compliance-audit.svg", "Procurement-ready appendix doodle with auditable controls"),
    ],
  },
  "threat-informed-detection-engineering-practice": {
    hero: "/doodles/security-detection.svg",
    sections: [
      SD("/doodles/security-detection.svg", "Threat-informed detection doodle mapped to attacker behavior"),
      SD("/doodles/soc-runbook.svg", "Detection lifecycle doodle with review and tuning loop"),
      SD("/doodles/evidence-chain.svg", "Detection-as-code evidence doodle with versioned signals"),
    ],
  },
  "data-contracts-medallion-bronze-silver-gold": {
    hero: "/doodles/medallion-pipeline.svg",
    sections: [
      SD("/doodles/medallion-pipeline.svg", "Bronze-Silver-Gold contract enforcement doodle"),
      SD("/doodles/compliance-audit.svg", "Governance and lineage checklist doodle"),
      SD("/doodles/observability-trace.svg", "Data quality traceability doodle across pipeline stages"),
    ],
  },
  "governed-llm-apis-rate-limits-tenancy": {
    hero: "/doodles/hallucination-guard.svg",
    sections: [
      SD("/doodles/rag-retrieval.svg", "Tenant-scoped routing doodle for governed LLM gateway flow"),
      SD("/doodles/hallucination-guard.svg", "Abuse control doodle with blocked unsafe request paths"),
      SD("/doodles/compliance-audit.svg", "Governance policy doodle for tenancy and audit controls"),
    ],
  },
};

const ARTICLE_HERO_DOODLES: Record<string, string> = {
  ...Object.fromEntries(Object.entries(ARTICLE_DOODLES).map(([slug, config]) => [slug, config.hero])),
};

const CATEGORY_HERO_DOODLES: Record<string, string> = {
  "ai-llm": "/doodles/rag-retrieval.svg",
  "cyber-soc": "/doodles/security-detection.svg",
  "data-search": "/doodles/low-latency-search.svg",
  playbooks: "/doodles/platform-devops.svg",
  "case-thinking": "/doodles/model-evaluation.svg",
};

const ARTICLE_SECTION_DOODLES: Record<string, SectionDoodle[]> = {
  ...Object.fromEntries(Object.entries(ARTICLE_DOODLES).map(([slug, config]) => [slug, config.sections])),
};

const CATEGORY_SECTION_DOODLES: Record<string, SectionDoodle[]> = {
  "ai-llm": [
    { src: "/doodles/rag-retrieval.svg", alt: "RAG retrieval system doodle with linked knowledge nodes" },
    { src: "/doodles/model-evaluation.svg", alt: "Model evaluation doodle with scorecards and checks" },
    { src: "/doodles/hallucination-guard.svg", alt: "Guardrail doodle with blocked noisy output path" },
  ],
  "cyber-soc": [
    { src: "/doodles/security-detection.svg", alt: "Security detection doodle showing telemetry and analyst lens" },
    { src: "/doodles/soc-runbook.svg", alt: "SOC runbook doodle with response flow and task checks" },
    { src: "/doodles/compliance-audit.svg", alt: "Compliance audit doodle with evidence checklist" },
    { src: "/doodles/evidence-chain.svg", alt: "Evidence chain doodle linking alerts to incident artifacts" },
  ],
  "data-search": [
    { src: "/doodles/low-latency-search.svg", alt: "Low-latency search doodle with fast query flow" },
    { src: "/doodles/medallion-pipeline.svg", alt: "Medallion data pipeline doodle from Bronze to Gold" },
    { src: "/doodles/observability-trace.svg", alt: "Observability doodle with traces and service timeline" },
    { src: "/doodles/zero-downtime-cutover.svg", alt: "Zero-downtime cutover doodle with staged migration arrows" },
  ],
  playbooks: [
    { src: "/doodles/platform-devops.svg", alt: "Platform and DevOps doodle with cloud and operations loop" },
    { src: "/doodles/model-evaluation.svg", alt: "Engineering playbook doodle with measurable quality checks" },
    { src: "/doodles/observability-trace.svg", alt: "Operational trace doodle for incident and reliability workflows" },
  ],
  "case-thinking": [
    { src: "/doodles/model-evaluation.svg", alt: "Decision framework doodle with validation checklist" },
    { src: "/doodles/platform-devops.svg", alt: "Delivery governance doodle for production execution" },
    { src: "/doodles/compliance-audit.svg", alt: "Risk and compliance review doodle for programme planning" },
  ],
};

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBlogBySlug(slug);
        setPost(data);
      } catch (err: any) {
        console.error("Failed to fetch blog post:", err);
        setError(err.message || "Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  const metaDescription = post?.description ?? (isLoading ? "Loading..." : "The requested insight could not be found.");

  const toc = useMemo(() => (post ? tocFromMarkdownH2(post.body_markdown) : []), [post]);
  const sectionDoodles = useMemo(
    () => {
      if (!post) return undefined;
      return ARTICLE_SECTION_DOODLES[post.slug] ?? CATEGORY_SECTION_DOODLES[post.category];
    },
    [post],
  );
  const hasSectionDoodles = Boolean(sectionDoodles && sectionDoodles.length);

  // Reading progress bar
  const [readProgress, setReadProgress] = useState(0);
  const [activeTocId, setActiveTocId] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toc.length > 0) {
      setActiveTocId(toc[0].id);
    }
  }, [toc]);

  useEffect(() => {
    if (!toc.length || !hasSectionDoodles) return;
    const headings = toc
      .map((row) => document.getElementById(row.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!headings.length) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const id = visible[0].target.id;
      setActiveTocId((prev) => (prev === id ? prev : id));
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.2,
      rootMargin: "-20% 0px -60% 0px",
    });

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [toc, hasSectionDoodles]);

  useEffect(() => {
    const preferReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (preferReducedMotion) return;
    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      setReadProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const h2CountRef = useRef(0);
  const h2IdCursorRef = useRef(0);
  const ctaInjectedRef = useRef(false);

  const nextH3Id = useMemo(() => {
    const used = new Set<string>();
    return (plain: string) => {
      let base = `h3-${slugifyHeading(plain)}`;
      let id = base;
      let n = 2;
      while (used.has(id)) { id = `${base}-${n++}`; }
      used.add(id);
      return id;
    };
  }, [post?.slug]);

  const mdComponents: Components = useMemo(() => {
    h2CountRef.current = 0;
    h2IdCursorRef.current = 0;
    ctaInjectedRef.current = false;
    const category = post?.category || "ai-llm";
    return {
      h2: ({ children, ...props }) => {
        const plain = mdToPlainString(children);
        const tocId = toc[h2IdCursorRef.current]?.id;
        const id = tocId ?? slugifyHeading(plain);
        h2IdCursorRef.current += 1;
        h2CountRef.current += 1;
        const showCta = h2CountRef.current === 4 && !ctaInjectedRef.current;
        if (showCta) ctaInjectedRef.current = true;
        return (
          <>
            {showCta && <ArticleInlineCta category={category} />}
            <h2 id={id} {...props}>{children}</h2>
          </>
        );
      },
      h3: ({ children, ...props }) => {
        const plain = mdToPlainString(children);
        const id = nextH3Id(plain);
        return <h3 id={id} {...props}>{children}</h3>;
      },
    };
  }, [toc, nextH3Id, post?.slug, post?.category]);

  useEffect(() => {
    if (!post) return;
    const base = getSiteBaseUrl();
    const urlPath = `/blog/${post.slug}`;
    const rmArticle = injectJsonLdScript(`airat-ld-blog-${post.slug}`, blogPostingSchema({
      origin: base,
      headline: post.title,
      description: post.description,
      urlPath,
      datePublished: post.published_at,
      dateModified: post.updated_at ?? post.published_at,
    }));
    const rmBc = injectJsonLdScript(`airat-ld-breadcrumb-blog-${post.slug}`, breadcrumbSchema(base, [
      { name: "Home", path: "/" },
      { name: "Insights", path: "/blog" },
      { name: post.title, path: urlPath },
    ]));
    const rmFaq = injectJsonLdScript(`airat-ld-faq-blog-${post.slug}`, faqPageSchema(faqsToSchemaPairs(post.faqs)));
    return () => { rmArticle(); rmBc(); rmFaq(); };
  }, [post]);

  const activeSectionDoodle = useMemo(() => {
    if (!sectionDoodles?.length) return undefined;
    if (!activeTocId) return sectionDoodles[0];
    const idx = toc.findIndex((row) => row.id === activeTocId);
    if (idx < 0) return sectionDoodles[0];
    return sectionDoodles[Math.min(idx, sectionDoodles.length - 1)];
  }, [sectionDoodles, activeTocId, toc]);

  if (isLoading) {
    return (
      <AiratShell>
        <SiteHeader />
        <main className="sp-main" id="main-content">
          <div className="sp-hero">
            <h1 className="sp-hero__h1">Loading insight...</h1>
          </div>
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  if (!post || error) {
    return (
      <AiratShell>
        <SiteHeader />
        <main className="sp-main" id="main-content">
          <div className="sp-hero">
            <h1 className="sp-hero__h1">{error || "Article not found"}</h1>
            <Link to="/blog" className="sp-text-link">← Back to insights</Link>
          </div>
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  const publishedLabel = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const heroDoodle = ARTICLE_HERO_DOODLES[post.slug] ?? CATEGORY_HERO_DOODLES[post.category];

  const tocNavList = (
    <ul className="ba-toc__list">
      {toc.map((row) => (
        <li key={row.id}>
          <a
            href={`#${row.id}`}
            className={`ba-toc__link ${activeTocId === row.id ? "ba-toc__link--active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(row.id);
              if (!target) return;
              const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
              window.history.replaceState(null, "", `#${row.id}`);
              setActiveTocId(row.id);
            }}
          >
            {row.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <AiratShell>
      <SEO
        title={post ? `${post.title}` : "Article not found"}
        description={metaDescription}
        type={post ? "article" : "website"}
        image={post ? (CATEGORY_OG_IMAGE[post.category] || DEFAULT_OG_IMAGE) : undefined}
      />
      {/* Reading progress bar  -  native scroll-driven animation where supported; JS fallback otherwise */}
      <div
        className="ba-progress"
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        style={{ "--ba-progress-width": `${readProgress}%` } as React.CSSProperties}
      />

      <SiteHeader />

      <main className="sp-main ba-main" id="main-content" ref={articleRef}>
        {/* Article hero */}
        <header className={`ba-header ${heroDoodle ? "ba-header--with-art" : ""}`}>
          <div className="ba-header__content">
            <div className="ba-header__meta">
              <span className="sp-eyebrow">{formatCategoryLabel(post.category)}</span>
            </div>
            <h1 className="ba-header__h1">{post.title}</h1>
            {/* Italic intro paragraph instead of "Key Takeaways" card */}
            <p className="ba-header__intro">{post.description}</p>
            <div className="ba-header__byline">
              <span className="ba-header__byline-item">{publishedLabel}</span>
              <span className="ba-header__byline-sep" aria-hidden="true">·</span>
              <span className="ba-header__byline-item">{post.reading_time_minutes} min read</span>
              {post.author && <>
                <span className="ba-header__byline-sep" aria-hidden="true">·</span>
                <span className="ba-header__byline-item">{post.author}</span>
              </>}
            </div>
            {post.tags.length > 0 && (
              <div className="ba-header__tags" aria-label="Tags">
                {post.tags.map((t: any) => <span key={t} className="sp-chip">{t}</span>)}
              </div>
            )}
          </div>
          {heroDoodle && (
            <aside className="ba-header__art" aria-label="Article illustration">
              <img src={heroDoodle} alt="Entity SEO knowledge graph illustration" loading="eager" decoding="async" />
            </aside>
          )}
        </header>

        {/* Key Takeaways  -  GEO scannability block */}
        {post.key_takeaways && post.key_takeaways.length > 0 && (
          <div className="ba-takeaways" aria-label="Key takeaways">
            <p className="ba-takeaways__label">Key takeaways</p>
            <ul className="ba-takeaways__list">
              {post.key_takeaways.map((t: any, i: number) => (
                <li key={i} className="ba-takeaways__item">{t}</li>
              ))}
            </ul>
          </div>
        )}

        <hr className="sp-rule" />

        {/* Two-column layout: TOC sidebar + article body */}
        <div className={`ba-layout ${hasSectionDoodles ? "ba-layout--with-art" : ""}`}>
          {/* Sticky TOC  -  desktop left sidebar */}
          {toc.length > 0 && (
            <nav className="ba-toc" aria-label="On this page">
              <p className="ba-toc__label">On this page</p>
              {hasSectionDoodles ? (
                <div className="ba-toc__row">
                  {tocNavList}
                  {activeSectionDoodle && (
                    <figure className="ba-toc-art" aria-label="Section visual">
                      <img
                        key={activeSectionDoodle.src}
                        src={activeSectionDoodle.src}
                        alt={activeSectionDoodle.alt}
                        width={256}
                        height={256}
                        loading="eager"
                        decoding="async"
                      />
                    </figure>
                  )}
                </div>
              ) : (
                tocNavList
              )}
            </nav>
          )}

          {/* Article body */}
          <article className="ba-article">
            {/* Glossary cross-link chips  -  drives bidirectional internal links */}
            {post.glossary_links && post.glossary_links.length > 0 && (
              <div className="ba-glossary-chips" aria-label="Key terms in this article">
                <span className="ba-glossary-chips__label">Key terms</span>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {post.glossary_links.map((slug: string) => (
                    <a
                      key={slug}
                      href={`/glossary/${slug}`}
                      className="sp-chip"
                      style={{ textDecoration: "none", fontSize: "0.78rem" }}
                    >
                      {slug.replace(/-/g, " ")} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="ba-article__body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {post.body_markdown}
              </ReactMarkdown>
            </div>

            {/* Social share  -  below article body, above author bio */}
            <SocialShare
              title={post.title}
              url={`${typeof window !== "undefined" ? window.location.origin : "https://airat.in"}/blog/${post.slug}`}
            />

            {/* Author  -  E-E-A-T upgraded bio */}
            <div className="ba-author">
              <div className="ba-author__identity">
                <span className="ba-author__name">{post.author ?? "AiRAT Engineering Team"}</span>
              </div>
              <p className="ba-author__bio">
                AiRAT builds production security, AI, and data systems. The engineering team writes from direct production experience across financial services, retail, and enterprise SOC environments  -  not from conference talks.
              </p>
              <div className="ba-author__links">
                <Link to="/about" className="sp-text-link">About AiRAT →</Link>
                <Link to="/portfolio" className="sp-text-link">Read case studies →</Link>
              </div>
            </div>

            <hr className="sp-rule" />

            {/* FAQ */}
            {post.faqs.length > 0 && (
              <section className="ba-faq" aria-labelledby={`ba-faq-${post.slug}`}>
                <h2 id={`ba-faq-${post.slug}`} className="ba-faq__title">FAQ</h2>
                {post.faqs.map((faq: any) => (
                  <div key={faq.q} className="ba-faq__item">
                    <p className="ba-faq__q">{faq.q}</p>
                    <p className="ba-faq__a">{faq.a}</p>
                  </div>
                ))}
              </section>
            )}

            {/* Related posts  -  table style */}
            {/* TODO: Implement API-based related posts if needed. For now, empty for dynamic posts. */}
            <section className="ba-related" aria-label="Related insights">
              <h2 className="ba-related__title">Related insights</h2>
              <div className="sp-table">
                {/* Related posts logic skipped for now as getRelatedPosts expects static type */}
              </div>
            </section>

            {/* Newsletter signup */}
            <NewsletterSignup />
          </article>

        </div>

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
