import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { listPublishedBlogs, formatCategoryLabel, type Blog } from "../api/blog";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { usePageSeo } from "../hooks/usePageSeo";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/blog-category-page.css";

type CategoryMeta = {
  headline: string;
  lead: string;
  /** Authoritative primer paragraph  -  150–200 words of pillar content */
  primer: string;
  /** Key concepts to cross-link to glossary */
  pillars: Array<{ label: string; slug: string }>;
  /** Slug of the most representative article in this category */
  featuredSlug: string;
};

/** Optional metadata for well-known categories. New categories render without this. */
const KNOWN_CATEGORY_META: Record<string, CategoryMeta> = {
  "ai-llm": {
    headline: "AI & LLM Systems  -  production notes.",
    lead: "Depth-first writing on RAG pipeline architecture, LLM evaluation, production drift, governance, and the engineering decisions that separate demo systems from production ones.",
    primer: "Retrieval-Augmented Generation (RAG) is now a default pattern for AI deployment in regulated environments  -  but most teams discover its failure modes only in production. Embedding drift, retrieval quality degradation, and the absence of evaluation harnesses mean that RAG systems that pass offline tests routinely fail live users within weeks of launch. Building AI systems for financial services, healthcare, or enterprise compliance requires governance to be part of the architecture from day one: PII boundaries in retrieval pipelines, audit trails for every model call, and offline evaluation datasets that reflect real production distributions. AiRAT's engineering notes in this cluster cover the engineering discipline behind production-grade AI  -  from evaluation harness design to governed LLM deployment under UAE Central Bank, RBI, and EU regulatory constraints.",
    pillars: [
      { label: "RAG explained", slug: "rag" },
      { label: "GEO / AEO", slug: "geo" },
    ],
    featuredSlug: "rag-evaluation-ownership-production",
  },
  "cyber-soc": {
    headline: "Security & SOC  -  field notes from production detection.",
    lead: "SIEM, XDR, SOAR, and SOC engineering from the perspective of teams that have to defend their decisions in front of auditors and regulators.",
    primer: "Security Operations Centers face a structurally hard problem: the volume of telemetry a modern enterprise generates exceeds what any analyst team can process manually, but the cost of a missed detection is catastrophic. Extended Detection and Response (XDR) platforms address this by correlating signals across endpoints, network, cloud, and identity  -  but correlation logic that works in a test environment often produces false positives at scale that erode analyst trust. The discipline of threat-informed detection, using frameworks like MITRE ATT&CK, creates detection content that is explicit about what attacker behaviour each rule targets. AiRAT's security engineering notes cover SIEM architecture, XDR deployment patterns, SOC automation, and the evidence and auditability requirements that enterprise and regulated financial institution SOC teams face in practice.",
    pillars: [
      { label: "XDR explained", slug: "xdr" },
      { label: "SIEM explained", slug: "siem" },
      { label: "MITRE ATT&CK", slug: "mitre-attck" },
    ],
    featuredSlug: "threat-informed-detection-engineering-practice",
  },
  "data-search": {
    headline: "Data & Search  -  pipelines that hold under load.",
    lead: "OpenSearch migrations, Medallion data contracts, real-time streaming SLAs, and the engineering discipline that keeps analytics honest when teams and data volumes grow.",
    primer: "The Medallion architecture  -  Bronze, Silver, and Gold data layers  -  provides a structured approach to data quality that enterprise analytics teams can enforce without rebuilding pipelines every quarter. A data contract formalises the agreement between data producers and consumers: schema, SLA, and quality guarantees that are machine-checked rather than documented in a wiki no one reads. OpenSearch has emerged as the production-grade alternative to managed Elasticsearch for search workloads at enterprise scale  -  particularly for financial services teams that require data residency and self-hosted deployment. AiRAT's data engineering notes cover Medallion implementation, data contract patterns, real-time streaming with Kafka and Flink, OpenSearch tuning for finance workloads, and the architectural decisions that keep data platforms honest under growth.",
    pillars: [
      { label: "Data Lake explained", slug: "data-lake" },
      { label: "Medallion Architecture", slug: "medallion-architecture" },
      { label: "Data Contract", slug: "data-contract" },
      { label: "OpenSearch explained", slug: "opensearch" },
    ],
    featuredSlug: "data-contracts-medallion-bronze-silver-gold",
  },
  playbooks: {
    headline: "Engineering Playbooks  -  decisions made explicit.",
    lead: "Operational and architectural playbooks for complex engineering scenarios: cutover discipline, evaluation frameworks, data contracts, and patterns learned from production incidents.",
    primer: "Engineering playbooks convert hard-won production experience into reusable decision frameworks. A cutover playbook for a database migration specifies the go/no-go criteria, the rollback path, and the on-call escalation chain before the migration window opens  -  not during it. An evaluation harness for a RAG pipeline defines the test cases, the quality thresholds, and the human review process before any model touches production data. Playbooks make implicit engineering knowledge explicit and shareable: they let a team onboard a new member to complex operational context in hours rather than months. AiRAT's playbooks document the repeatable patterns we have developed across production deployments in security, AI, and data  -  written for senior engineers who want the reasoning, not just the steps.",
    pillars: [
      { label: "OpenSearch explained", slug: "opensearch" },
      { label: "Medallion Architecture", slug: "medallion-architecture" },
    ],
    featuredSlug: "elk-opensearch-migration-cutover-oncall",
  },
  "case-thinking": {
    headline: "Decision Frameworks  -  how we think about hard problems.",
    lead: "Structured thinking on platform decisions, vendor evaluation, architecture trade-offs, and the reasoning patterns that hold up when a programme goes to procurement or to the board.",
    primer: "Architecture decisions in complex engineering programmes often have long-lasting consequences that are difficult to reverse: choosing a streaming architecture over a batch one, selecting a managed service over a self-hosted cluster, or adopting a vendor's AI platform rather than building an evaluation harness in-house. Decision frameworks make the reasoning behind these choices explicit and defensible. Zero Trust architecture is a framework, not a product: it defines a set of principles (verify explicitly, use least privilege, assume breach) that inform purchasing decisions, network design, and access policy rather than a single technology to deploy. AiRAT's decision framework writing covers build vs buy analysis, vendor evaluation scorecards, SLO negotiation, and the structured reasoning that holds up under board-level scrutiny.",
    pillars: [
      { label: "Zero Trust explained", slug: "zero-trust" },
      { label: "RAG explained", slug: "rag" },
    ],
    featuredSlug: "ai-build-vs-buy-decision-framework",
  },
};

export default function BlogCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const category = categorySlug || null;
  const label = category ? formatCategoryLabel(category) : "";
  const meta = category ? KNOWN_CATEGORY_META[category] || null : null;

  // Fetch blogs from API
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await listPublishedBlogs();
        const sortedBlogs = [...data.blogs].sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
        setAllBlogs(sortedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const posts = useMemo(
    () => (category ? allBlogs.filter((b) => b.category === category) : []),
    [allBlogs, category],
  );

  /** All distinct categories from published blogs, for the "Other topics" section. */
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    allBlogs.forEach((b) => { if (b.category) cats.add(b.category); });
    return Array.from(cats);
  }, [allBlogs]);

  const featuredPost = meta
    ? posts.find((p) => p.slug === meta.featuredSlug) ?? posts[0]
    : posts[0];

  const OG_IMAGE_MAP: Record<string, string> = {
    "ai-llm":      "/og/category-ai.svg",
    "data-search": "/og/category-data.svg",
    "cyber-soc":   "/og/category-security.svg",
    "playbooks":   "/og/category-engineering.svg",
  };

  const docTitle = category ? `${label} | Insights | AiRAT` : "Category not found | AiRAT";
  const metaDescription = meta ? meta.lead.slice(0, 155) : `Explore articles on ${label} from AiRAT engineering.`;
  const ogImage = category ? OG_IMAGE_MAP[category] : undefined;

  usePageSeo(docTitle, metaDescription, `/blog/category/${categorySlug}`, { ogImage });

  useEffect(() => {
    if (!category) return;
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      `airat-ld-breadcrumb-blogcat-${category}`,
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Insights", path: "/blog" },
        { name: label, path: `/blog/category/${category}` },
      ]),
    );
    return () => rmBc();
  }, [category, label]);

  if (!category) {
    return (
      <AiratShell>
        <SiteHeader />
        <main className="sp-main" id="main-content">
          <div className="sp-hero">
            <h1 className="sp-hero__h1">Category not found</h1>
            <Link to="/blog" className="sp-text-link">← Back to insights</Link>
          </div>
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  return (
    <AiratShell>
      <SiteHeader />

      <main className="sp-main" id="main-content">
        {/* Split hero */}
        <div className="sp-hero--split">
          <div>
            <span className="sp-eyebrow">Insights · {label}</span>
            <h1 className="sp-hero__h1">
              {meta ? meta.headline : `${label}  -  insights from the field.`}
            </h1>
          </div>
          <div>
            <p className="sp-hero__body">
              {meta ? meta.lead : `Explore our research and engineering notes on ${label.toLowerCase()}.`}
            </p>
            <div style={{ marginTop: "1rem" }}>
              <Link to="/blog" className="sp-text-link">← All insights</Link>
            </div>
          </div>
        </div>

        <hr className="sp-rule" />

        {/* ── PILLAR CONTENT  -  primer + concept chips + featured read ── */}
        {meta && (
          <section className="sp-section bcp-pillar" aria-labelledby="bcp-pillar-heading">
            <div className="sp-section__label">
              <span className="sp-label">Primer</span>
            </div>
            <div className="sp-section__body">
              <h2 id="bcp-pillar-heading" className="sp-section-title">
                What you need to know about {label.toLowerCase()}
              </h2>
              <p className="bcp-primer">{meta.primer}</p>

              {/* Key concept chips → glossary */}
              {meta.pillars.length > 0 && (
                <div className="bcp-concepts">
                  <span className="bcp-concepts__label">Key terms</span>
                  <div className="sp-chips">
                    {meta.pillars.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/glossary/${p.slug}`}
                        className="sp-chip sp-chip--lime"
                        style={{ textDecoration: "none" }}
                      >
                        {p.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured read card */}
              {featuredPost && (
                <div className="bcp-featured">
                  <span className="bcp-featured__label">Featured read</span>
                  <Link to={`/blog/${featuredPost.slug}`} className="bcp-featured__card">
                    <p className="bcp-featured__title">{featuredPost.title}</p>
                    <p className="bcp-featured__desc">{featuredPost.description}</p>
                    <span className="bcp-featured__cta">Read article →</span>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Show featured read for categories without full meta */}
        {!meta && featuredPost && (
          <section className="sp-section bcp-pillar">
            <div className="sp-section__label">
              <span className="sp-label">Featured</span>
            </div>
            <div className="sp-section__body">
              <div className="bcp-featured">
                <span className="bcp-featured__label">Featured read</span>
                <Link to={`/blog/${featuredPost.slug}`} className="bcp-featured__card">
                  <p className="bcp-featured__title">{featuredPost.title}</p>
                  <p className="bcp-featured__desc">{featuredPost.description}</p>
                  <span className="bcp-featured__cta">Read article →</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        <hr className="sp-rule" />

        {/* Articles table */}
        <section aria-label={`${label} articles`}>
          <div className="sp-section__label" style={{ padding: "0 0 1.5rem" }}>
            <span className="sp-label">All articles</span>
          </div>
          <div className="sp-table">
            <div className="sp-table__head">
              <span>Date</span>
              <span>Topic</span>
              <span>Article</span>
            </div>
            {isLoading ? (
              <p style={{ padding: "2rem 0", color: "var(--muted)", fontSize: "0.88rem" }}>
                Loading articles...
              </p>
            ) : posts.length === 0 ? (
              <p style={{ padding: "2rem 0", color: "var(--muted)", fontSize: "0.88rem" }}>
                No articles in this category yet. Check back soon.
              </p>
            ) : (
              posts.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="sp-table__row">
                  <span className="sp-table__date">
                    {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                  <span className="sp-table__cat">{label}</span>
                  <span className="sp-table__title">{post.title}</span>
                </Link>
              ))
            )}
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Other categories — dynamic */}
        {allCategories.filter((c) => c !== category).length > 0 && (
          <section className="sp-section" aria-labelledby="cat-other-heading">
            <div className="sp-section__label">
              <span className="sp-label">Other topics</span>
            </div>
            <div className="sp-section__body">
              <h2 id="cat-other-heading" className="sp-section-title">More research areas</h2>
              <div className="sp-chips">
                {allCategories.filter((c) => c !== category).map((c) => (
                  <Link key={c} to={`/blog/category/${c}`} className="sp-chip" style={{ textDecoration: "none", cursor: "pointer" }}>
                    {formatCategoryLabel(c)}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBand
          title="Using these insights in your work?"
          body="If an article surfaces a problem you're dealing with, bring it to a call. We scope problems before we discuss solutions."
          primary={{ label: "Explore services", to: "/services" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
