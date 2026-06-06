import type { FaqItem } from "./faqTypes";

export const PORTFOLIO_SEO = {
  title: "Case studies | AiRAT",
  description:
    "Production case studies: SIEM/XDR, governed LLM and RAG systems, search, and data platforms - with buyer context, delivery notes, and measurable outcomes on every page.",
} as const;

export const PORTFOLIO_HERO = {
  badge: "Proof",
  headline: "Shipped. Running. Measurable.",
  intro:
    "Every engagement ends with a running system, agreed SLOs, and outcomes your procurement team can defend. Three platforms shown in full. More available on request.",
} as const;

export const PORTFOLIO_FEATURED = {
  domain: "Cybersecurity · UAE Enterprise",
  title: "csoc  -  Multi-Tenant SIEM & XDR Platform",
  outcomes: ["87% alert noise eliminated", "60% faster MTTD", "99.95% uptime over 14 months"],
  summary:
    "A UAE enterprise SOC team was processing 2,000+ daily alerts with three analysts. csoc consolidates 50+ sources into a single investigation timeline and automates response on 87% of alerts  -  so the team focuses on what only humans can decide.",
  ctaLabel: "Read the full case study",
  to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
} as const;

export const PORTFOLIO_FILTER_ALL = "All" as const;

export const PORTFOLIO_CATEGORIES = [
  PORTFOLIO_FILTER_ALL,
  "Cybersecurity",
  "AI Platforms",
  "Data & Search",
  "Cloud & Observability",
  "FinTech & Trading",
  "E-Commerce",
  "Retail & Enterprise Platforms",
] as const;

export const PORTFOLIO_INDUSTRY_COPY: Record<
  PortfolioIndustry,
  { readonly title: string; readonly description: string }
> = {
  Cybersecurity: {
    title: "Cybersecurity",
    description:
      "SIEM, XDR, and SOC platforms with measurable noise reduction, faster detection, and evidence your auditors can follow.",
  },
  "AI Platforms": {
    title: "AI Platforms",
    description:
      "Governed LLM systems, RAG pipelines, and agent workflows built for production — with evaluation harnesses and human review gates.",
  },
  "Data & Search": {
    title: "Data & Search",
    description:
      "Medallion lakes, streaming analytics, and OpenSearch-scale search — tuned for relevance, latency, and operational clarity.",
  },
  "Cloud & Observability": {
    title: "Cloud & Observability",
    description:
      "Correlated logs, metrics, and ML that cut alert fatigue so on-call responds to signal, not noise.",
  },
  "FinTech & Trading": {
    title: "FinTech & Trading",
    description:
      "Trading, custody, and compliance platforms engineered for volatile markets, audit scrutiny, and sub-second paths.",
  },
  "E-Commerce": {
    title: "E-Commerce",
    description:
      "Catalog search, checkout, and fulfilment systems that stay fast through campaign peaks and catalogue churn.",
  },
  "Retail & Enterprise Platforms": {
    title: "Retail & Enterprise Platforms",
    description:
      "Hyperlocal delivery, enterprise retail, and workflow platforms shaped to how teams actually operate day to day.",
  },
};

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export type PortfolioIndustry = Exclude<PortfolioCategory, "All">;

const PORTFOLIO_CATEGORY_QUERY_ALIASES: Record<string, PortfolioIndustry> = {
  ai: "AI Platforms",
  "ai platforms": "AI Platforms",
  cloud: "Cloud & Observability",
  "cloud & observability": "Cloud & Observability",
  data: "Data & Search",
  "data & search": "Data & Search",
  ecommerce: "E-Commerce",
  "e-commerce": "E-Commerce",
  fintech: "FinTech & Trading",
  "fintech & trading": "FinTech & Trading",
  retail: "Retail & Enterprise Platforms",
  "retail & enterprise platforms": "Retail & Enterprise Platforms",
  security: "Cybersecurity",
  cybersecurity: "Cybersecurity",
};

export function industrySlug(industry: PortfolioIndustry): string {
  return industry
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function industryFromSlug(slug: string): PortfolioIndustry | undefined {
  const normalized = slug.toLowerCase();
  const industries = PORTFOLIO_CATEGORIES.filter((c) => c !== "All") as PortfolioIndustry[];
  return industries.find((item) => industrySlug(item) === normalized);
}

export function industryFromQueryParam(raw: string): PortfolioIndustry | undefined {
  const key = raw.trim().toLowerCase();
  if (PORTFOLIO_CATEGORY_QUERY_ALIASES[key]) {
    return PORTFOLIO_CATEGORY_QUERY_ALIASES[key];
  }
  const fromSlug = industryFromSlug(key);
  if (fromSlug) return fromSlug;
  return (PORTFOLIO_CATEGORIES.find(
    (category) => category !== "All" && category.toLowerCase() === key,
  ) ?? undefined) as PortfolioIndustry | undefined;
}

export function industryPortfolioPath(industry: PortfolioIndustry): string {
  return `/portfolio/industry/${industrySlug(industry)}`;
}

export type TechStackGroup = {
  readonly category: string;
  readonly items: readonly string[];
};

/** Rich case study: context, narrative, stack, and learning takeaways */
export type PortfolioProject = {
  readonly slug: string;
  readonly title: string;
  readonly category: Exclude<PortfolioCategory, "All">;
  /** One line for portfolio grid cards */
  readonly summary: string;
  /** Key outcome metrics shown on the portfolio index card */
  readonly outcomes?: readonly string[];
  /** Opening paragraph on the case study page */
  readonly description: string;
  /** Who this was for, geography, scale */
  readonly context: string;
  readonly problem: readonly string[];
  readonly solution: readonly string[];
  readonly architectureNotes?: readonly string[];
  readonly techStack: readonly TechStackGroup[];
  readonly results: readonly string[];
  /** What engineers and buyers can take away */
  readonly learnings: readonly string[];
  /** Full `<title>` string for SEO (optional) */
  readonly seoTitle?: string;
  /** Meta description (optional; defaults to summary) */
  readonly seoDescription?: string;
  /** Case-specific FAQs for AEO / AIO (optional) */
  readonly faqs?: readonly FaqItem[];
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: "hawkeye-multi-tenant-cybersecurity-platform",
    title: "csoc Enterprise Cyber Defense",
    category: "Cybersecurity",
    outcomes: ["87% alert reduction", "60% faster MTTD"],
    summary: "Multi-tenant SIEM/XDR console unifying SOC workflows with AI-assisted investigations for a UAE-scale enterprise.",
    description:
      "A multi-engineer team at AiRAT built one console that wraps all core SOC workflows in a single authenticated shell with native AI assistance. The platform ingests high-volume security telemetry and prioritises what analysts must see first.",
    context:
      "Enterprise SOC in the UAE with strict data residency, a small analyst team, and thousands of events per hour from hybrid cloud and on-prem sources.",
    problem: [
      "Analysts lived in five different tools; hand-offs between tiers lost critical context.",
      "Alert volume drowned the team: most triage time went to false positives and duplicate tickets.",
      "Multi-tenant roadmap required one codebase with tenant isolation, not one deployment per customer.",
    ],
    solution: [
      "Designed a single-pane investigation shell with role-based views and immutable audit trails per tenant.",
      "Implemented correlation and enrichment pipelines so similar alerts collapse into one actionable case.",
      "Shipped staged rollouts behind feature flags so SOC leads could train teams without freezing production.",
    ],
    architectureNotes: [
      "Hot/warm indexing strategy for cost control while keeping recent incidents queryable in seconds.",
      "Service boundaries chosen so detection rules, enrichment, and UI could evolve independently.",
    ],
    techStack: [
      { category: "Data & search", items: ["OpenSearch", "Kafka (or equivalent streaming)", "Structured indices per tenant"] },
      { category: "Security integrations", items: ["Wazuh / Suricata-style telemetry", "Sigma-style detection content", "MITRE ATT&CK tagging"] },
      { category: "Platform", items: ["Kubernetes", "API gateway", "OIDC / SSO", "Secrets management"] },
    ],
    results: [
      "One console for the full SOC workflow",
      "Staged rollout without separate deployments",
      "Multi-tenant operational model from one codebase",
      "AI assistance in the same session as the investigation",
      "Reduced context switching for analysts",
    ],
    learnings: [
      "SOC UX matters as much as detection: if triage is slow, good rules still feel useless.",
      "Tenant isolation is a product decision early - retrofitting it after launch is expensive.",
      "Give operators a single timeline; scatter plots across tabs hide causality.",
    ],
    seoTitle: "UAE multi-tenant SIEM / XDR console (csoc) | AiRAT",
    seoDescription:
      "Enterprise SOC in the UAE: one console for investigations, AI-assisted triage, tenant isolation, and SIEM-scale telemetry - built for analysts and multi-tenant roadmaps.",
    faqs: [
      {
        q: "What was the primary buyer risk on csoc?",
        a: "Losing analyst minutes to duplicate alerts and tool-hopping - so the programme prioritised correlation, enrichment, and a single timeline before expanding detection catalogue breadth.",
      },
      {
        q: "Does csoc replace the SIEM entirely?",
        a: "It unifies the analyst workflow and ingestion priorities for this programme; exact SIEM boundaries depended on the client's retention and compliance contracts - designed explicitly, not assumed.",
      },
    ],
  },
  {
    slug: "enterprise-xdr-agent-windows-endpoint-protection",
    title: "Enterprise XDR Agent",
    category: "Cybersecurity",
    outcomes: ["Autonomous threat response", "99.95% uptime SLA"],
    summary: "Lightweight Windows XDR agent with autonomous response hooks and SIEM-friendly telemetry.",
    description:
      "Lightweight, enterprise-grade XDR agent for Windows endpoints delivering real-time threat detection, response, and system visibility at scale without dragging down laptops.",
    context:
      "Financial services organisation needing endpoint coverage that works offline, respects CPU budgets, and feeds a central SIEM without duplicate agents.",
    problem: [
      "Legacy AV missed lateral movement and script-based attacks.",
      "Security team could not afford double agents (EDR + log forwarders) on every laptop.",
      "Playbooks required safe, reversible remediation - not reboot loops.",
    ],
    solution: [
      "Built a minimal agent surface focused on high-signal events: process ancestry, network edges, and persistence changes.",
      "Added policy-driven response: isolate host, kill process tree, or snapshot for IR before rollback.",
      "Normalized events to a schema the SIEM already understands to avoid custom parsers per customer.",
    ],
    architectureNotes: [
      "Ring-buffered telemetry so burst periods do not drop evidence on low-memory endpoints.",
    ],
    techStack: [
      { category: "Endpoint", items: ["Windows service model", "Kernel/user-mode split where required", "Signed update channel"] },
      { category: "Backend", items: ["gRPC / REST command channel", "Policy engine", "Telemetry batching"] },
      { category: "Integrations", items: ["SIEM connectors", "Ticketing webhooks", "SOAR-friendly actions"] },
    ],
    results: [
      "Single lightweight agent for endpoint visibility and response hooks",
      "Policy-driven containment with audit-friendly rollback paths",
      "Schema-stable telemetry mapped to the existing SIEM parsers",
      "Deployment model sized for large laptop fleets without duplicate agents",
    ],
    learnings: [
      "Endpoint agents fail in the field on battery and CPU - profile before you ship fancy ML loops.",
      "Autonomous actions need human-readable audit logs for compliance and trust.",
      "Prefer schema-stable telemetry over dumping raw logs that SIEMs cannot retain.",
    ],
    seoTitle: "Windows XDR agent & SIEM telemetry | Enterprise endpoint | AiRAT",
    seoDescription:
      "Financial services endpoint coverage: lightweight Windows agent, policy-driven response, ring-buffered telemetry, and SIEM-friendly event shapes - without double agents on every laptop.",
    faqs: [
      {
        q: "Is response fully autonomous?",
        a: "Policies define what can run automatically versus what requires human approval; every automated action is logged for SOC and compliance review.",
      },
      {
        q: "Why optimise for SIEM schema first?",
        a: "Because retention and parser cost decide whether telemetry is actually usable in investigations - raw noise becomes expensive quickly at enterprise scale.",
      },
    ],
  },
  {
    slug: "dva-institutional-cryptocurrency-trading-platform",
    title: "DVA Institutional Crypto Trading",
    category: "FinTech & Trading",
    summary: "Institutional-grade trading stack with MPC custody, compliance flows, and a throughput-aware matching engine.",
    description:
      "High-performance cryptocurrency trading platform with secure custody, compliant onboarding, and a high-throughput trading engine for institutional desks and partners.",
    context:
      "Regulated market participants needing segregated balances, clear audit trails, and sub-second order paths during volatility spikes.",
    problem: [
      "Custody and trading logic must stay separated while still feeling like one product to traders.",
      "KYC/AML checks cannot block legitimate flows during peak listing windows.",
      "Matching and risk checks must scale horizontally without double spends.",
    ],
    solution: [
      "MPC-based custody integration with explicit withdrawal policies and quorum approvals.",
      "Modular trading rails: retail, merchant, and OTC flows share risk and ledger primitives.",
      "Load-tested matching path with deterministic replay for incident analysis.",
    ],
    architectureNotes: [
      "Event-sourced ledger slices for reconstructing balances after disputes.",
    ],
    techStack: [
      { category: "Custody & compliance", items: ["Fireblocks MPC patterns", "Sumsub (or equivalent) KYC/AML", "Travel rule hooks"] },
      { category: "Trading core", items: ["Order book service", "Risk checks", "Settlement workers"] },
      { category: "Platform", items: ["PostgreSQL / durable store", "Redis for hot state", "Kubernetes"] },
    ],
    results: [
      "Fireblocks MPC-based custody",
      "KYC/AML via Sumsub",
      "Retail, Merchant & OTC modules",
      "Scalable matching engine",
    ],
    learnings: [
      "Treat compliance as workflows, not one-off screens - auditors ask for history, not screenshots.",
      "Separate hot trading paths from cold compliance jobs to protect latency.",
      "Rehearse chain reorganisations and stuck withdrawals in staging; money bugs are existential.",
    ],
    seoTitle: "Institutional crypto trading & MPC custody (DVA) | AiRAT",
    seoDescription:
      "Regulated trading stack: MPC custody patterns, modular trading rails, load-tested matching, and audit-friendly ledgers - built for institutional desks and compliance reviewers.",
    faqs: [
      {
        q: "How was custody separated from trading logic?",
        a: "With explicit policy and quorum flows for withdrawals while sharing risk primitives across retail, merchant, and OTC surfaces so traders still experience one coherent product.",
      },
      {
        q: "What latency risks were designed around?",
        a: "Volatile listing windows and burst order flow - hot paths were isolated from compliance jobs so matching stayed predictable under spike load.",
      },
    ],
  },
  {
    slug: "elk-log-observability-tier1-bank",
    title: "Intelligent Log Observability Platform: Tier-1 Bank",
    category: "Cloud & Observability",
    summary: "Centralised log platform for a Tier-1 bank unifying seven services under one searchable, correlated interface.",
    description:
      "A multi-engineer team at AiRAT designed and deployed a centralised log observability platform for a Tier-1 financial institution, unifying seven independently-running services under a single, searchable interface.",
    context:
      "Highly regulated bank environment: strict encryption, change windows, and zero tolerance for silent data loss between teams.",
    problem: [
      "Each service team shipped logs differently; on-call engineers could not correlate incidents across boundaries.",
      "Investigations stretched to hours because nobody knew which index held the smoking gun.",
      "NestJS and legacy JVM services emitted incompatible formats.",
    ],
    solution: [
      "Defined a canonical log schema with mandatory trace and tenant identifiers.",
      "Built ingestion pipelines with back-pressure and DLQs so bursts never silently drop lines.",
      "Shipped Kibana/OpenSearch dashboards tuned to SRE workflows, not generic charts.",
    ],
    architectureNotes: [
      "TLS everywhere; keys rotated via bank-approved processes.",
      "Index lifecycle policies to keep costs predictable while retaining compliance windows.",
    ],
    techStack: [
      { category: "Observability", items: ["Elasticsearch / OpenSearch", "Logstash or ingest workers", "Kibana dashboards"] },
      { category: "Apps instrumented", items: ["NestJS structured logging", "JVM services", "Kubernetes workloads"] },
      { category: "Ops", items: ["IaC for clusters", "Synthetic probes for pipeline health"] },
    ],
    results: [
      "Cross-service correlation became possible for the first time",
      "Incident investigation time dropped from hours to minutes",
      "Two critical regressions detected in the first month",
      "NestJS logs became searchable for the first time",
      "Every byte of log data encrypted in transit",
    ],
    learnings: [
      "Standardise fields before you scale indices - re-indexing terabytes is painful.",
      "Give SREs saved searches and runbooks tied to dashboards, not empty ELK tenants.",
      "Instrument ingestion lag; users blame search when the real issue is upstream back-pressure.",
    ],
    seoTitle: "Tier-1 bank log observability & ELK/OpenSearch | AiRAT",
    seoDescription:
      "Regulated bank: canonical log schema, correlated NestJS and JVM telemetry, encrypted pipelines, and SRE-first dashboards - so investigations span services without index roulette.",
    faqs: [
      {
        q: "Why was schema standardisation the headline win?",
        a: "Because cross-service incidents were previously blind across seven teams - shared trace and tenant identifiers made correlation possible before tuning fancy dashboards.",
      },
      {
        q: "How was encryption handled?",
        a: "TLS end-to-end with bank-approved key rotation; retention windows enforced via index lifecycle policies to control cost while meeting compliance windows.",
      },
    ],
  },
  {
    slug: "msazn-opensearch-ecommerce-search-uae",
    outcomes: ["12× faster queries", "4.2s → 0.35s latency"],
    title: "MSAZN E-Commerce Search Migration",
    category: "E-Commerce",
    summary: "Luxury e-commerce search rebuilt on OpenSearch with CDC, multilingual queries, and sub-second relevance.",
    description:
      "Rebuilt the search and discovery layer for a luxury e-commerce platform by migrating from legacy RDBMS to OpenSearch with multilingual support and real-time catalogue sync.",
    context:
      "High SKU churn, promotional pricing, and multiple storefront languages across the GCC and Europe.",
    problem: [
      "Full-text queries against relational tables degraded as catalogues grew past millions of rows.",
      "Merchandising updates lagged in search results, hurting campaign conversion.",
      "Transliteration and mixed-language queries returned poor relevance scores.",
    ],
    solution: [
      "Modelled products, attributes, and availability as denormalised search documents.",
      "Used CDC streams so inventory and price changes appear in search within seconds.",
      "Tuned analysers per language and layered business boosts for campaigns.",
    ],
    architectureNotes: [
      "Bulk reindex strategy with blue/green aliases to avoid customer-facing downtime.",
    ],
    techStack: [
      { category: "Search", items: ["OpenSearch", "Custom scoring", "Per-field analysers"] },
      { category: "Data movement", items: ["CDC (Debezium-style or native)", "Kafka topics", "Idempotent writers"] },
      { category: "Serving", items: ["API layer", "Redis cache for hot queries", "CDN for static assets"] },
    ],
    results: [
      "Up to 10x faster search performance",
      "Real-time data consistency via CDC",
      "Multilingual support across 12+ languages",
      "Scalable search foundation",
    ],
    learnings: [
      "Search is a data product - treat schema migrations like app releases.",
      "Measure p95 and zero-result rate, not just average latency.",
      "Run shadow queries in prod before cutover; relevance regressions are subtle.",
    ],
    seoTitle: "Luxury e-commerce OpenSearch & CDC (GCC) | MSAZN | AiRAT",
    seoDescription:
      "OpenSearch migration for luxury retail: CDC catalogue sync, multilingual relevance, blue/green reindex, and sub-second discovery for high SKU churn across GCC and Europe.",
    faqs: [
      {
        q: "Why CDC instead of nightly batch?",
        a: "Campaign pricing and inventory accuracy directly affect conversion - near-real-time sync keeps merchandising promises aligned with what shoppers see in search.",
      },
      {
        q: "What multilingual pitfalls were addressed?",
        a: "Transliteration and mixed-language queries required tuned analysers and layered boosts so relevance stayed stable across storefront languages.",
      },
    ],
  },
  {
    slug: "genda-phool-hyperlocal-delivery-platform-india",
    title: "Genda Phool Full-Stack Delivery Engine",
    category: "Retail & Enterprise Platforms",
    summary: "Hyperlocal flower delivery with mobile apps, subscriptions, logistics, and RBAC admin analytics.",
    description:
      "End-to-end flower delivery platform with mobile apps, subscriptions, logistics, and admin analytics - built for peak days (festivals) without collapsing dispatch.",
    context:
      "India hyperlocal market: volatile demand, cash and UPI payments, and third-party rider fleets with unpredictable availability.",
    problem: [
      "Peak days spiked 10× normal orders; monolithic APIs timed out during checkout.",
      "Dispatchers needed live maps and batch reassignment when riders dropped orders.",
      "Finance needed per-hub settlement and promo liability tracking.",
    ],
    solution: [
      "Split checkout, catalogue, and dispatch into independently scalable services.",
      "Built rider assignment with SLA timers and fallback pools.",
      "Admin RBAC with audit logs for pricing and refunds.",
    ],
    architectureNotes: [
      "Read replicas for catalogue browsing; write path isolated for orders.",
    ],
    techStack: [
      { category: "Clients", items: ["React Native / native apps", "Responsive web", "Rider app"] },
      { category: "Backend", items: ["Node or Python services", "PostgreSQL", "Redis geo queries"] },
      { category: "Ops", items: ["Kubernetes or managed containers", "CI/CD", "Error budgets"] },
    ],
    results: [
      "iOS, Android, Web & Delivery Partner apps",
      "Subscription + instant delivery models",
      "Location-based pricing & availability",
      "Full RBAC admin & analytics",
    ],
    learnings: [
      "Hyperlocal is an operations product - maps and dispatch UX beat clever algorithms alone.",
      "Design for festival load tests early; caching strategies differ for gifts vs staples.",
      "Expose operational metrics (rider wait, prep delay) to product teams, not only engineering.",
    ],
    seoTitle: "Hyperlocal delivery full-stack (India) | Genda Phool | AiRAT",
    seoDescription:
      "Peak-safe delivery: split services for checkout and dispatch, rider SLAs with fallback pools, UPI/cash flows, and RBAC admin analytics for festival-scale demand in India.",
    faqs: [
      {
        q: "How did the architecture survive 10× peak days?",
        a: "By isolating write-heavy order paths from catalogue reads and adding geo-aware dispatch controls so timeouts during checkout did not cascade across hubs.",
      },
      {
        q: "What finance controls were built in?",
        a: "Per-hub settlement views and promo liability tracking so operations and finance could reconcile high-volume promotional windows.",
      },
    ],
  },
  {
    slug: "safemargin-ai-cyber-insurance-marketplace",
    title: "SafeMargin AI Cyber Insurance",
    category: "AI Platforms",
    summary: "Multi-sided cyber insurance marketplace with AI-assisted underwriting and broker tooling.",
    description:
      "Multi-sided cyber insurance platform connecting insurers, brokers, and buyers with AI-driven insights, portfolio-aware recommendations, and policy lifecycle management.",
    context:
      "Brokers needed faster quotes; insurers needed consistent risk signals; buyers needed transparent coverage comparisons.",
    problem: [
      "Questionnaires were long and duplicated across carriers.",
      "Risk scoring models were opaque to brokers trying to explain premiums.",
      "Policy changes generated PDFs nobody could query later.",
    ],
    solution: [
      "Introduced a canonical risk graph fed by telemetry questionnaires and third-party signals.",
      "Dual-agent pattern: one agent summarises exposure, another drafts broker-ready explanations with citations.",
      "Workflow engine for binders, endorsements, and renewals with versioned documents.",
    ],
    techStack: [
      { category: "AI", items: ["LLM orchestration", "Retrieval over policy corpora", "Evaluation harness for answers"] },
      { category: "Core", items: ["Policy admin service", "Billing connectors", "CRM hand-offs"] },
      { category: "Trust", items: ["Role-based access", "Immutable audit trail", "PII minimisation"] },
    ],
    results: ["Unified insurance workflow", "Dual AI agent system", "Portfolio-aware recommendations", "Broker enablement tools"],
    learnings: [
      "In regulated domains, show citations and confidence - black-box scores erode trust.",
      "Keep humans in the loop for bind decisions; automate prep, not final judgement.",
      "Version everything: models, prompts, and policy PDFs drift independently.",
    ],
    seoTitle: "Cyber insurance marketplace & AI underwriting (SafeMargin) | AiRAT",
    seoDescription:
      "Multi-sided InsurTech: canonical risk graph, dual-agent explanations with citations, broker workflows, and versioned policy documents - built for carriers and buyers who need transparency.",
    faqs: [
      {
        q: "How did AI stay explainable to brokers?",
        a: "Answers surfaced source clauses and confidence signals so premiums and exclusions could be defended in client conversations - not black-box scores alone.",
      },
      {
        q: "What was automated versus human-gated?",
        a: "Document prep, summarisation, and quote assembly were automated; bind decisions remained in human workflows with audit trails for regulators.",
      },
    ],
  },
  {
    slug: "socai-bot-ai-cyber-compliance-assistant",
    title: "SOCAI Bot Compliance Assistant",
    category: "AI Platforms",
    summary: "Teams-native compliance coach combining monitoring, RAG over policies, and gamified micro-learning.",
    description:
      "AI-driven compliance and training assistant combining real-time monitoring, automated detection, and personalised training inside Microsoft Teams.",
    context:
      "Distributed workforce clicking through annual training decks with low retention; security needed nudges in the flow of work.",
    problem: [
      "Policies lived in PDFs employees never opened until audit week.",
      "Phishing simulations felt punitive instead of educational.",
      "Compliance teams could not measure which controls people actually understood.",
    ],
    solution: [
      "RAG layer over internal policies with source links in every answer.",
      "Micro-learning cards triggered by risky behaviours with immediate remediation steps.",
      "Gamified progress that managers can see at team level without exposing individual mistakes.",
    ],
    techStack: [
      { category: "Microsoft 365", items: ["Teams bot framework", "Graph APIs where permitted"] },
      { category: "AI", items: ["Embeddings + vector store", "Guardrails for PII", "Offline evaluation sets"] },
      { category: "Data", items: ["Telemetry warehouse", "Consent-aware logging"] },
    ],
    results: [
      "Real-time behavior monitoring",
      "RAG-based intelligence layer",
      "Automated training generation",
      "Gamified learning via Teams",
    ],
    learnings: [
      "Meet employees where they chat - email training links die in inboxes.",
      "Tone matters: coach, don't scold, or adoption collapses.",
      "Refresh embeddings whenever legal updates policies; stale RAG is worse than no RAG.",
    ],
    seoTitle: "Teams compliance coach with RAG (SOCAI Bot) | AiRAT",
    seoDescription:
      "Microsoft Teams-native assistant: policy RAG with citations, micro-learning triggered by behaviour, gamified progress for managers, and consent-aware telemetry for distributed workforces.",
    faqs: [
      {
        q: "Why Teams instead of a standalone portal?",
        a: "Because policy nudges in the flow of work outperform annual PDF training; employees respond when coaching appears where they already collaborate.",
      },
      {
        q: "How was PII handled in RAG answers?",
        a: "Guardrails and minimised logging patterns were paired with source-linked responses so security teams could approve the retrieval boundary before wide rollout.",
      },
    ],
  },
  {
    slug: "athena-unified-ai-cybersecurity-platform-eu",
    title: "Athena Unified AI Cybersecurity",
    category: "Cybersecurity",
    summary: "EU-focused unified SIEM/EDR/XDR/NIDS/NTA stack with automated response and custom compliance reporting.",
    description:
      "Unified cybersecurity platform combining SIEM, EDR, XDR, NIDS, and NTA with real-time detection, automated response, and tailored compliance reporting for European operators.",
    context:
      "Mid-market enterprise consolidating vendors after GDPR-driven data mapping exercises and insurer questionnaires.",
    problem: [
      "Too many consoles meant inconsistent detection coverage across regions.",
      "Custom compliance reports required weeks of manual spreadsheet work.",
      "Playbooks varied per country subsidiary.",
    ],
    solution: [
      "Normalized detections into a single case object with MITRE mapping.",
      "Automated response actions with per-country policy matrices.",
      "Report builder exporting evidence packs for ISO/SOC-style audits.",
    ],
    techStack: [
      { category: "Security stack", items: ["SIEM core", "EDR/XDR agents", "NIDS/NTA taps"] },
      { category: "Automation", items: ["SOAR playbooks", "Webhook integrations"] },
      { category: "Data residency", items: ["Region-pinned clusters", "Key management"] },
    ],
    results: ["Consolidated security operations", "AI-driven response engine", "Full-spectrum visibility", "Custom compliance reporting"],
    learnings: [
      "Unification is a migration project - run parallel feeds until confidence is high.",
      "Automate the boring report assembly; save humans for interpretation.",
      "Document country-specific legal constraints next to playbooks, not in wikis.",
    ],
    seoTitle: "EU unified SIEM/EDR/XDR platform (Athena) | AiRAT",
    seoDescription:
      "European mid-market consolidation: single case object with MITRE mapping, country-aware automated response, and ISO-style evidence exports - after GDPR-driven data mapping pressure.",
    faqs: [
      {
        q: "What did 'unification' mean for operators?",
        a: "One investigation narrative across SIEM, EDR/XDR, and NIDS/NTA signals with playbooks that respected per-country legal constraints - not a single pane of marketing screenshots.",
      },
      {
        q: "How were compliance reports improved?",
        a: "Report builder automated evidence assembly from live detections and configuration state so audit prep stopped being a multi-week spreadsheet project.",
      },
    ],
  },
  {
    slug: "enterprise-delta-lake-unified-analytics-platform",
    title: "Enterprise Delta Lake & Unified Analytics",
    category: "Data & Search",
    summary: "Delta Lake–centric lakehouse for near real-time analytics, AI features, and hybrid or air-gapped deployment options.",
    description:
      "Unified data and analytics platform based on Delta Lake architecture supporting real-time insights, reporting, and AI workloads with governance baked in.",
    context:
      "Enterprise with mixed on-prem and cloud estates needing a governed place for analytics and ML features without copying data ten times.",
    problem: [
      "Data silos meant every team built its own mart with conflicting definitions.",
      "Batch-only warehouses could not feed operational dashboards during business hours.",
      "Air-gapped sites still needed the same patterns without public cloud dependencies.",
    ],
    solution: [
      "Adopted Delta Lake for ACID tables, time travel, and schema evolution on large files.",
      "Built medallion layers (bronze/silver/gold) with automated quality checks between stages.",
      "Packaged repeatable Terraform/Helm bundles for hybrid and disconnected installs.",
    ],
    architectureNotes: [
      "Z-ordering and compaction jobs scheduled off-peak to control scan costs.",
    ],
    techStack: [
      { category: "Lakehouse", items: ["Delta Lake", "Spark", "Databricks or OSS equivalent"] },
      { category: "Ingestion", items: ["Airflow / Dagster-style orchestration", "dbt transformations"] },
      { category: "Serving", items: ["Warehouse endpoints", "Feature store hooks", "BI tools"] },
    ],
    results: ["Single source of truth", "Near real-time analytics", "AI-ready data foundation", "Hybrid cloud & air-gapped deployment"],
    learnings: [
      "Governance is not a separate project - embed tests in the pipeline or gold layers rot.",
      "Time travel saves you during bad deploys; teach operators how to roll back tables.",
      "Cost follows scan patterns; co-locate transforms with storage where possible.",
    ],
    seoTitle: "Delta Lake lakehouse & unified analytics | Enterprise data | AiRAT",
    seoDescription:
      "Medallion lakehouse on Delta Lake: ACID tables, bronze/silver/gold quality gates, hybrid and air-gapped deployment bundles - so analytics and AI features share one governed foundation.",
    faqs: [
      {
        q: "Why Delta Lake instead of only a warehouse?",
        a: "ACID files, schema evolution, and time travel reduced rebuild risk for large analytical datasets while keeping batch and near-real-time paths on one logical model.",
      },
      {
        q: "How was air-gapped delivery approached?",
        a: "Repeatable Terraform/Helm bundles mirrored cloud patterns where possible while respecting disconnected constraints - so remote sites were not a forked architecture.",
      },
    ],
  },
];

export const PORTFOLIO_EMPTY = "No case studies in this category.";

export const PORTFOLIO_CTA = {
  headline: "Compare your situation to a closest case",
  body: "On a strategy call we map your constraints to a similar delivery arc - not a generic pitch. Bring one concrete scenario (SOC load, model governance, search latency, or audit gap).",
  button: { label: "Contact us", to: "/contact" },
} as const;

export const PORTFOLIO_STORY_BRIDGE =
  "Read a full study, then explore services for delivery and governance - or book a strategy call when you want timelines and fit.";

export const PORTFOLIO_FAQ_SECTION = {
  title: "How to read a case study",
  intro: "Skim risk and outcomes first; stack detail is there when your architects need it.",
} as const;

export const PORTFOLIO_FAQ = [
  {
    q: "Are client names real?",
    a: "Some programmes are anonymised at client request. The technical patterns, constraints, and outcomes remain faithful to what we shipped in production.",
  },
  {
    q: "Can AiRAT replicate one of these builds for us?",
    a: "Often yes - but we will not promise a carbon copy without your environment's constraints. Use a strategy call to compare your problem class to the closest case and what would need to differ.",
  },
  {
    q: "Where should I start if I am non-technical?",
    a: "Read the Problem and Outcomes sections first. If those match your board-level narrative, skim Stack with your architects, then book a call with both sides in the room.",
  },
  {
    q: "How do these relate to the services page?",
    a: "Portfolio is proof; services describe how we structure delivery and governance. Technology lists the patterns and tools we stake our reputation on after you trust the outcomes.",
  },
] as const;
