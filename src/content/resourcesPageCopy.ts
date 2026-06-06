/**
 * Resources / Knowledge Hub (/resources)
 *
 * Target: Technical leads, marketing strategists, and enterprise
 * decision-makers who want to self-educate before engaging.
 *
 * Goal: Demonstrate depth of expertise, support SEO topical
 * authority, and accelerate trust without a sales call.
 */

export const RESOURCES_PAGE_SEO = {
  title: "Resources & Knowledge Hub | AI, Search & Security Engineering | AiRAT",
  description:
    "Practical frameworks, guides, and reference material on technical SEO, GEO/AEO, AI visibility, RAG systems, enterprise search, and security operations  -  from AiRAT engineers.",
} as const;

export const RESOURCES_PAGE_HERO = {
  eyebrow: "Knowledge hub",
  headline: "Reference material built to the same standard as our delivery.",
  lead: "Frameworks, guides, checklists, and decision tools for engineering leaders and digital strategists. No gated PDFs. No lead magnets dressed as insight. Just useful material.",
} as const;

export const RESOURCE_CATEGORIES = [
  {
    id: "ai-search",
    label: "AI Search & Visibility",
    description: "GEO, AEO, LLM citation strategy, and AI-era brand discoverability.",
    icon: "signal",
  },
  {
    id: "technical-seo",
    label: "Technical SEO",
    description: "Core Web Vitals, rendering, structured data, and crawl architecture.",
    icon: "search",
  },
  {
    id: "ai-systems",
    label: "AI & LLM Systems",
    description: "RAG evaluation, agent guardrails, LLM observability, and governance.",
    icon: "brain",
  },
  {
    id: "security",
    label: "Security & SOC",
    description: "Detection engineering, SIEM architecture, evidence trails, and SOC automation.",
    icon: "shield",
  },
  {
    id: "data",
    label: "Data & Search Infrastructure",
    description: "Medallion lakes, OpenSearch at scale, streaming pipelines, and governance.",
    icon: "database",
  },
] as const;

export const FEATURED_RESOURCES = [
  {
    category: "Security & SOC",
    type: "Trust",
    title: "Engineered for integrity",
    description:
      "How AiRAT secures its platforms: AWS infrastructure, access controls, encryption, GDPR-aligned data residency, secure development lifecycle, and business continuity.",
    slug: "/resources/trust",
    readingTimeMinutes: 8,
    readHint: "Security & trust →",
    tags: ["security", "compliance", "trust"],
  },
  {
    category: "AI Search & Visibility",
    type: "Service",
    title: "The AI Visibility Audit Framework",
    description:
      "A systematic 5-platform audit methodology for measuring brand presence in ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot. Includes query sampling templates and scoring rubrics.",
    slug: "/services/ai-visibility",
    readingTimeMinutes: 12,
    /** Shown instead of “N min read” when the card links to a service page, not an article. */
    readHint: "How we run audits →",
    tags: ["GEO", "AI Visibility", "brand monitoring"],
  },
  {
    category: "Technical SEO",
    type: "Service",
    title: "Enterprise Technical SEO Audit Checklist (2025)",
    description:
      "A prioritised checklist covering Core Web Vitals, JavaScript rendering, structured data, crawl architecture, and international SEO  -  designed for sites with 10,000+ pages.",
    slug: "/services/technical-seo",
    readingTimeMinutes: 18,
    readHint: "Technical SEO offering →",
    tags: ["technical SEO", "Core Web Vitals", "enterprise"],
  },
  {
    category: "AI & LLM Systems",
    type: "Guide",
    title: "RAG Evaluation Ownership: Who Signs Off on Production AI?",
    description:
      "How to design an evaluation ownership structure for RAG deployments  -  covering corpus versioning, retrieval quality metrics, and the governance questions procurement will ask.",
    slug: "/blog/rag-evaluation-ownership-production",
    readingTimeMinutes: 9,
    tags: ["RAG", "LLM", "governance"],
  },
  {
    category: "Data & Search Infrastructure",
    type: "Guide",
    title: "Bronze Is Not a Junk Drawer: Data Contracts in Medallion Lakes",
    description:
      "Enforce producer SLAs and CI-tested schema contracts at Bronze and Silver so Gold metrics survive audits  -  and new hires in finance can trust the numbers.",
    slug: "/blog/data-contracts-medallion-bronze-silver-gold",
    readingTimeMinutes: 7,
    tags: ["data contracts", "medallion", "governance"],
  },
] as const;

export const CONTENT_CLUSTERS = [
  {
    id: "geo-cluster",
    eyebrow: "Cluster",
    title: "GEO & AI Answer Optimisation",
    description: "Everything on structuring content for AI-generated answer surfaces.",
    articles: [
      { title: "What is GEO and why SEO alone is not enough in 2025", slug: "/blog/geo-why-seo-not-enough-2025" },
      { title: "LLM citation patterns: what gets retrieved and what doesn't", slug: "/blog/llm-citation-patterns" },
      {
        title: "Governed LLM APIs: rate limits, tenancy, and audit trails",
        slug: "/blog/governed-llm-apis-rate-limits-tenancy",
      },
      { title: "Entity SEO: building a Knowledge Graph presence for enterprise brands", slug: "/blog/entity-seo-knowledge-graph" },
    ],
  },
  {
    id: "rag-cluster",
    eyebrow: "Cluster",
    title: "Production RAG & LLM Systems",
    description: "How to build, evaluate, and govern AI systems that survive production.",
    articles: [
      { title: "RAG evaluation ownership in production", slug: "/blog/rag-evaluation-ownership-production" },
      { title: "LLM evaluation frameworks your CFO can defend", slug: "/blog/llm-evaluation-frameworks-procurement" },
      { title: "Governed LLM APIs: rate limits, tenancy, and audit trails", slug: "/blog/governed-llm-apis-rate-limits-tenancy" },
      { title: "Observability for AI systems: logs, traces, and output monitoring", slug: "/blog/observability-ai-systems-logs-traces-outputs" },
    ],
  },
  {
    id: "security-cluster",
    eyebrow: "Cluster",
    title: "Security & SOC Operations",
    description: "Detection engineering, evidence management, and SOC automation.",
    articles: [
      { title: "Threat-informed detection engineering in practice", slug: "/blog/threat-informed-detection-engineering-practice" },
      { title: "SOC automation and evidence auditability", slug: "/blog/soc-automation-evidence-auditability" },
      { title: "ELK to OpenSearch: cutover plans that respect on-call", slug: "/blog/elk-opensearch-migration-cutover-oncall" },
      { title: "OpenSearch vs Elasticsearch: the cutover checklist", slug: "/blog/opensearch-vs-elastic-cutover-checklist" },
    ],
  },
  {
    id: "data-cluster",
    eyebrow: "Cluster",
    title: "Data Architecture & Governance",
    description: "Medallion lakes, streaming pipelines, and contracts that survive audits.",
    articles: [
      { title: "Data contracts in Medallion lakes: Bronze is not a junk drawer", slug: "/blog/data-contracts-medallion-bronze-silver-gold" },
      { title: "Real-time analytics pipelines with finance-grade SLAs", slug: "/blog/real-time-analytics-pipelines-sla-finance" },
      { title: "KYC ML pipelines and operational debt", slug: "/blog/kyc-ml-pipelines-operational-debt" },
    ],
  },
] as const;

export const RESOURCES_CTA = {
  eyebrow: "Work with us",
  headline: "See a gap in your architecture? Let's close it.",
  body: "Strategy calls are working sessions. Bring a concrete scenario  -  AI rollout stalling on governance, search traffic declining from AI Overviews, SOC evidence gaps, or data quality disagreements between finance and product  -  and we will tell you what is realistic.",
  button: { label: "Explore services", to: "/services" },
  secondaryButton: { label: "Read case studies", to: "/portfolio" },
} as const;

export const RESOURCES_FAQ = [
  {
    q: "Are these resources free?",
    a: "Yes. All published resources on this page and in our Insights section are freely accessible without registration. We believe in demonstrating expertise before asking for attention.",
  },
  {
    q: "How are these resources different from blog posts?",
    a: "Blog posts are typically topical long-form articles exploring specific problems or approaches. Resources include structured reference material  -  frameworks, checklists, audit templates, and decision guides  -  designed to be used repeatedly, not just read once.",
  },
  {
    q: "How often is this hub updated?",
    a: "New resources are added monthly, with updates to existing frameworks when search engine behaviour, AI platform capabilities, or engineering best practices change materially. Subscribe to the Insights section for notifications.",
  },
] as const;
