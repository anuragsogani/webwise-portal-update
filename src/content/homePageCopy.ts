/** AiRAT home (/)  -  marketing + proof structure */

export const HOME_DOCUMENT_TITLE = "AiRAT  -  Production platforms for security, AI & data";

export const HOME_META_DESCRIPTION =
  "AiRAT builds production security, AI, and data platforms for regulated enterprises in UAE, India, and Europe. Senior-led delivery. SLO-anchored outcomes. Systems your teams run after go-live.";

export const ORG_SCHEMA_URL = "https://airat.io";

export const ORG_SCHEMA_DESCRIPTION =
  "Production platforms for enterprise security, AI and LLM systems, and data or search estates - delivered in UAE, India, and Europe.";

/** Hero  -  badge, H1, lead */
export const HERO_BADGE = "Security · AI & LLM systems · Data & search";

/** H1 split for emphasis on the em element */
export const HERO_H1_LINE1 = "Production platforms for";
export const HERO_H1_LINE2_BEFORE = "security, AI & ";
export const HERO_H1_LINE2_EM = "data";
export const HERO_H1_LINE3 = " -  where failure has a cost.";

/** Linked hero words — Duna homepage layout */
export const HERO_H1_LINKS = {
  security: { label: "security", to: "/services#cyber" },
  ai: { label: "AI", to: "/services#ai" },
  data: { label: "data", to: "/services#data" },
} as const;

/** Brand statement band on Duna homepage */
export const HOME_STATEMENT = "At AiRAT, we build production systems that have to work." as const;

/** Sky-band AI showcase (Duna layout) */
export const HOME_AI_SHOWCASE = {
  badge: "Artificial Intelligence",
  title: "AI built for production.",
  body:
    "AiRAT ships governed RAG pipelines, agent workflows, and evaluation harnesses that survive audit — multiply output without multiplying headcount.",
  ctaLabel: "Explore AI services",
  ctaTo: "/services#ai",
} as const;

/** Duna homepage closing band */
export const HOME_CLOSING = {
  title: "The next step is a conversation, not a contract.",
  body: "Tell us what is breaking — SOC throughput, stalled AI, or search under load. We scope problems before we discuss solutions.",
  primaryLabel: "Explore services",
  primaryTo: "/services",
  secondaryLabel: "Read case studies",
  secondaryTo: "/portfolio",
  tertiaryLabel: "Book a strategy call",
  tertiaryTo: "/contact",
  note: "No sales script · Plain-language follow-up · UAE, India, EU, AUS, US",
} as const;

/** One sharper paragraph. Under 35 words. High signal. */
export const HERO_LEAD =
  "Senior engineers ship SIEM/XDR, governed LLM systems, and petabyte-scale search. Acceptance criteria are SLOs your board can name  -  not slide milestones nobody tracks.";

/** Revamped homepage hero (live on airat.in) */
export const HERO_REVAMP = {
  line1: "The production",
  lineEm: "platform defender.",
  lead: HERO_LEAD,
  primaryCta: { label: "Book a strategy call", to: "/contact" },
  secondaryCta: { label: "Explore products", to: "/products" },
} as const;

export const HOME_COVERAGE = {
  eyebrow: "Customer outcomes",
  title: "Complete security-to-data coverage, driven by senior engineering",
} as const;

export type HomeFeaturePillar = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly cta: { readonly label: string; readonly to: string };
  readonly iconSrc: string;
  readonly badge?: { readonly label: string; readonly detail: string };
};

export const HOME_FEATURE_PILLARS: readonly HomeFeaturePillar[] = [
  {
    id: "visibility",
    eyebrow: "Unified visibility",
    title: "Get complete security & data visibility",
    body: "SIEM, XDR, OpenSearch, and governed LLM estates in one delivery narrative — AWS, Azure, GCP, Kubernetes, and the on-prem sources your SOC already runs. We integrate before we replace.",
    cta: { label: "View integrations", to: "/integrations" },
    iconSrc: "/doodles/home-icons/airat-security-icon.svg",
  },
  {
    id: "prioritization",
    eyebrow: "Risk prioritization",
    title: "Fix what matters most",
    body: "Correlation, detection engineering, and AI triage surface real incidents first — so tier-one time moves from clearing duplicates to decisions your board can defend.",
    cta: { label: "Managed SOC & XDR", to: "/products/soc" },
    badge: { label: "Client outcome", detail: "60% faster MTTD · DTS Solutions" },
    iconSrc: "/doodles/home-icons/airat-security-icon.svg",
  },
  {
    id: "customize",
    eyebrow: "Open, adaptable delivery",
    title: "Customize to your requirements",
    body: "We build inside your environment — custom detections, evidence trails, RAG guardrails, and RBAC patterns your security and legal teams sign off on before scale.",
    cta: { label: "How we work", to: "/methodology" },
    iconSrc: "/doodles/home-icons/airat-ai-systems-icon.svg",
  },
  {
    id: "compliance",
    eyebrow: "Regulatory excellence",
    title: "Automate evidence, simplify audits",
    body: "Continuous monitoring and audit-ready artefacts for CIS, ISO 27001, SOC 2-aligned programmes, and your own control frameworks — designed in the architecture pass, not as a change request.",
    cta: { label: "Security services", to: "/services/cyber" },
    iconSrc: "/doodles/home-icons/airat-data-analytics-icon.svg",
  },
] as const;

export const HOME_TRUSTED_LEADERS_SECTION = {
  title: "Trusted by leaders",
  lead: "Run security, AI, and data programmes like the world's best teams — without needing a 100+ person engineering org.",
} as const;

export type TrustedLeaderCharacterVariant =
  | "dts"
  | "aggreko"
  | "msazn"
  | "kort"
  | "aithentic";

export type TrustedLeaderTestimonial = {
  readonly id: TrustedLeaderCharacterVariant;
  readonly clientName: string;
  readonly logoSrc: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly characterVariant: TrustedLeaderCharacterVariant;
};

/** Five logo clients — Pudding-style pixel characters (male / female alternating) */
export const TRUSTED_LEADER_TESTIMONIALS: readonly TrustedLeaderTestimonial[] = [
  {
    id: "dts",
    clientName: "DTS Solutions",
    logoSrc: "/clients_logos/dts-solutions.png",
    quote:
      "Their engineers understood our threat surface immediately. Mean-time-to-detect dropped in the first month — when something spikes we know it is real.",
    name: "Head of Cybersecurity",
    role: "DTS Solutions · UAE",
    characterVariant: "dts",
  },
  {
    id: "aggreko",
    clientName: "Aggreko",
    logoSrc: "/clients_logos/aggreko.png",
    quote:
      "Telemetry correlation finally matches how our operations teams think about incidents. We stopped reconciling five tools during every outage review.",
    name: "Director of Infrastructure",
    role: "Aggreko · Global",
    characterVariant: "aggreko",
  },
  {
    id: "msazn",
    clientName: "MSAZN",
    logoSrc: "/clients_logos/msazn.png",
    quote:
      "Three vendors said it was not possible at our data volume. AiRAT shipped a working search prototype in two weeks and moved it to production in six.",
    name: "CTO",
    role: "MSAZN · UAE",
    characterVariant: "msazn",
  },
  {
    id: "kort",
    clientName: "Kort",
    logoSrc: "/clients_logos/kort.png",
    quote:
      "Medallion layers and contracts were agreed before the heavy build — finance and product stopped arguing about which dashboard was correct.",
    name: "Head of Data Platform",
    role: "Kort · Europe",
    characterVariant: "kort",
  },
  {
    id: "aithentic",
    clientName: "Aithentic",
    logoSrc: "/clients_logos/aithentic.png",
    quote:
      "Our RAG pipeline lets compliance teams query millions of documents instantly. Work that took days now finishes in seconds — ROI was visible within the first sprint.",
    name: "VP of Engineering",
    role: "Aithentic · India",
    characterVariant: "aithentic",
  },
] as const;

export const HOME_TESTIMONIALS_HEADER = {
  eyebrow: "Client outcomes",
  title: "Don't take our word for it",
} as const;

export type HomeTestimonial = {
  readonly id: string;
  readonly clientName: string;
  readonly quote: string;
  readonly name: string;
  readonly title: string;
  readonly company: string;
  readonly highlight: string;
  readonly highlightLabel: string;
};

export const HOME_TESTIMONIALS: readonly HomeTestimonial[] = [
  {
    id: "dts",
    clientName: "DTS Solutions",
    quote:
      "Their engineers understood our threat surface immediately. Mean-time-to-detect dropped in the first month — when something spikes we know it is real.",
    name: "Security leadership",
    title: "Head of Cybersecurity",
    company: "DTS Solutions · UAE",
    highlight: "60%",
    highlightLabel: "Faster MTTD",
  },
  {
    id: "aithentic",
    clientName: "Aithentic",
    quote:
      "Our RAG pipeline lets compliance teams query millions of documents instantly. Work that took days now finishes in seconds — ROI was visible within the first sprint.",
    name: "Engineering leadership",
    title: "VP of Engineering",
    company: "Aithentic · India",
    highlight: "40s",
    highlightLabel: "vs. 3 days prior",
  },
  {
    id: "msazn",
    clientName: "MSAZN",
    quote:
      "Three vendors said it was not possible at our data volume. AiRAT shipped a working search prototype in two weeks and moved it to production in six.",
    name: "Technology leadership",
    title: "CTO",
    company: "MSAZN · UAE",
    highlight: "2 wks",
    highlightLabel: "To working prototype",
  },
  {
    id: "aggreko",
    clientName: "Aggreko",
    quote:
      "Telemetry correlation finally matches how our operations teams think about incidents. We stopped reconciling five tools during every outage review.",
    name: "Platform leadership",
    title: "Director of Infrastructure",
    company: "Aggreko · Global",
    highlight: "99.9%",
    highlightLabel: "Observability uptime",
  },
  {
    id: "kort",
    clientName: "Kort",
    quote:
      "Medallion layers and contracts were agreed before the heavy build — finance and product stopped arguing about which dashboard was correct.",
    name: "Data leadership",
    title: "Head of Data Platform",
    company: "Kort · Europe",
    highlight: "1",
    highlightLabel: "Gold source of truth",
  },
  {
    id: "athena",
    clientName: "Athena Security Group",
    quote:
      "Multi-tenant isolation and evidence trails were non-negotiable for our MSSP model. AiRAT delivered a platform procurement could defend without hand-waving.",
    name: "Product leadership",
    title: "Chief Product Officer",
    company: "Athena Security Group",
    highlight: "13+",
    highlightLabel: "Tenants on one stack",
  },
  {
    id: "genda-phool",
    clientName: "Genda Phool",
    quote:
      "Peak-season dispatch and checkout held under festival load. The same senior team that designed the architecture was still on the hook after go-live.",
    name: "Operations leadership",
    title: "Head of Technology",
    company: "Genda Phool · India",
    highlight: "3×",
    highlightLabel: "Peak order capacity",
  },
  {
    id: "masarrati",
    clientName: "Masarrati",
    quote:
      "Internal workflows finally matched how sales and service teams work — not a generic admin template bolted on in the final sprint.",
    name: "Digital leadership",
    title: "General Manager, Technology",
    company: "Masarrati · UAE",
    highlight: "6 wks",
    highlightLabel: "Live across web + mobile",
  },
  {
    id: "eadx",
    clientName: "EADX",
    quote:
      "Low-latency paths and audit-friendly logging shipped together. Our engineers own the runbooks — not a black-box integrator.",
    name: "Engineering leadership",
    title: "Head of Engineering",
    company: "EADX · UAE",
    highlight: "<100ms",
    highlightLabel: "p95 search latency",
  },
] as const;

export const HOME_CLOSING_CTA = {
  title: "Start with a concrete scenario.",
  body: "Join regulated enterprises who ship security, AI, and data platforms with SLOs they can defend in procurement.",
  primary: { label: "Book a strategy call", to: "/contact" },
  secondary: { label: "Read case studies", to: "/portfolio" },
} as const;

export const HOME_CLIENTS_MARQUEE = {
  title: "Trusted by named enterprises",
} as const;

/** Only two tags  -  discipline over decoration */
export const OUTCOME_TAGS = [
  { text: "SLO-anchored delivery", variant: "lime" as const },
  { text: "UAE · India · Europe", variant: "lime" as const },
] as const;

export const HERO_SECONDARY_CTA_LABEL = "Read case studies";
export const HERO_TERTIARY_CTA_LABEL = "Explore services";

/** ── SOLUTION PATHS ── */
export type SolutionPathService = {
  readonly title: string;
  readonly description?: string;
  readonly highlight?: boolean;
};

export const SOLUTION_PATHS_SECTION = {
  eyebrow: "What we build",
  title: "Three delivery domains.",
  lead: "Most programmes cross boundaries  -  we still name the entry point so you know which conversation to start.",
  exploreLabel: "Explore",
  paths: [
    {
      title: "Security & detection",
      body: "SIEM, XDR, detection engineering, and evidence trails your auditors and board can follow  -  without a SOC team drowning in noise.",
      to: "/services#cyber",
      metaType: "Security platform",
      metaSignal: "SIEM · XDR · evidence design",
      services: [
        {
          title: "SIEM & correlated timelines",
          description:
            "Endpoint, identity, and cloud signals land on one incident timeline — so analysts triage context, not disconnected alerts.",
        },
        {
          title: "Analyst-approved response",
          description:
            "Automation clears first-response work humans should not repeat; every exception lands with evidence already attached.",
        },
        {
          title: "Detection engineering",
          description:
            "Rule coverage mapped across severity and source — tuned with your team, not a vendor default pack shipped once.",
        },
        {
          title: "Board-ready evidence trails",
          description:
            "Immutable chains with timestamps and actors — auditors and executives read the same story without a SOC walkthrough.",
        },
      ] satisfies readonly SolutionPathService[],
    },
    {
      title: "AI & LLM systems",
      body: "RAG pipelines, agents, and evaluation harnesses that survive production. PII boundaries and human review designed in before models touch customer data.",
      to: "/services#ai",
      metaType: "AI systems",
      metaSignal: "RAG · agents · evaluation",
      services: [
        {
          title: "RAG & retrieval boundaries",
          description:
            "Vector indexes, chunking rules, and citation boundaries scoped before production traffic — so answers stay grounded and auditable.",
        },
        {
          title: "Production-safe agents",
          description:
            "Logging, evaluation, and human review gates defined before models touch customer data — not demo prompts in staging.",
        },
        {
          title: "Evaluation harnesses",
          description:
            "Offline golden sets, regression thresholds, and production drift checks — so model changes ship with evidence, not hope.",
        },
        {
          title: "PII & compliance controls",
          description:
            "Redaction, tenancy isolation, and human review queues aligned to UAE, RBI, and EU data rules.",
        },
      ] satisfies readonly SolutionPathService[],
    },
    {
      title: "Data, search & analytics",
      body: "Medallion lakes, real-time streaming, and OpenSearch-scale search that keeps finance, product, and investigators working from the same truth.",
      to: "/services#data",
      metaType: "Data & search",
      metaSignal: "Lakes · streaming · OpenSearch",
      services: [
        {
          title: "Medallion lake architecture",
          description:
            "Bronze, silver, and gold layers with governed promotion paths — so raw ingest becomes trusted analytics without shadow copies.",
        },
        {
          title: "Streaming & CDC paths",
          description:
            "Analytical stores stay current with operational systems instead of drifting days behind batch jobs.",
        },
        {
          title: "OpenSearch-scale search",
          description:
            "Index health, query latency, and shard throughput at production scale — for investigators and product teams searching the same catalog.",
        },
        {
          title: "Agreed gold-layer metrics",
          description:
            "Finance-approved KPI definitions in one gold layer — so dashboards, regulators, and exec reviews cite the same numbers.",
        },
      ] satisfies readonly SolutionPathService[],
    },
  ],
} as const;

/** ── CASES ── */
export const CASES_EYEBROW = "Selected work";
export const CASES_TITLE = "Shipped. Running. ";
export const CASES_TITLE_EM = "Measurable.";
export const CASES_LEAD =
  "Three platforms in production across security, AI, and search. Every engagement ends with a running system and agreed SLOs  -  not a deck and a handoff.";

export const FEATURED_PROJECTS = [
  {
    domain: "Cybersecurity · UAE Enterprise",
    title: "Multi-Tenant XDR Platform for MSSPs",
    outcomes: ["87% alert reduction", "60% faster MTTD"] as const,
    body: "A UAE enterprise SOC team was processing 2,000+ daily alerts with three analysts. csoc consolidates 50+ sources into a single timeline and automates response on 87% of alerts  -  so the team focuses on what only humans can decide.",
    ctaLabel: "Read the case study",
    to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
  },
  {
    domain: "AI automation · FinTech · India",
    title: "Enterprise XDR Agent  -  Autonomous Threat Response",
    outcomes: ["Autonomous response", "99.95% uptime"] as const,
    body: "A FTSE 250 FinTech needed threat response that didn't wait for a human. The XDR Agent reasons about threat context, correlates across environments, and executes remediation in milliseconds  -  at 99.95% uptime over fourteen months.",
    ctaLabel: "Read the case study",
    to: "/portfolio/enterprise-xdr-agent-windows-endpoint-protection",
  },
  {
    domain: "Search & Observability · E-Commerce",
    title: "DVA  -  Petabyte-Scale Search at 5M Products",
    outcomes: ["12× faster queries", "4.2s → 0.35s latency"] as const,
    body: "Search was returning stale results eight minutes after catalog updates. We rebuilt on distributed OpenSearch  -  dropping query latency from 4.2 s to 0.35 s, with a 5 M-product index that stays fresh under peak traffic.",
    ctaLabel: "Read the case study",
    to: "/portfolio/msazn-opensearch-ecommerce-search-uae",
  },
] as const;

/** ── METRICS ── */
export const METRICS_SECTION_EYEBROW = "Outcomes, measured";
export const METRICS_SECTION_TITLE = "What changes ";
export const METRICS_SECTION_TITLE_EM = "after go-live";

export const IMPACT_METRICS = [
  {
    target: 99.95,
    suffix: "%",
    decimals: 2,
    label: "Platform uptime SLA",
    detail:
      "SLAs are defined before we write a line of code  -  not after an incident. Fourteen months at 99.95% across the XDR platform.",
  },
  {
    target: 87,
    suffix: "%",
    decimals: 0,
    label: "Alert noise eliminated",
    detail:
      "Correlation and prioritisation surface real incidents. Tier-one time moves from clearing duplicates to decisions that matter.",
  },
  {
    target: 12,
    suffix: "×",
    decimals: 0,
    label: "Faster investigation",
    detail:
      "OpenSearch infrastructure delivers answers 12× faster than conventional SIEM stacks  -  at petabyte scale, without adding headcount.",
  },
] as const;

/** ── TESTIMONIALS ── */
export const TESTI_EYEBROW = "Client outcomes";
export const TESTI_TITLE = "In their ";
export const TESTI_TITLE_EM = "own words";
export const TESTI_NOTE = "Named roles withheld where clients require it. Outcomes and timelines are as delivered.";

export const TESTIMONIALS = [
  {
    quote:
      "Their engineers understood our threat surface immediately. Mean-time-to-detect dropped 60% in the first month. Fourteen months at 99.95% uptime  -  and when something spikes, we know it's real.",
    attrib: "Head of Cybersecurity",
    org: "Enterprise SaaS · Dubai, UAE",
    highlight: "60%",
    highlightLabel: "Faster MTTD",
  },
  {
    quote:
      "Our RAG pipeline now lets compliance teams query 2.5 million documents instantly. Three days of legal analyst work now takes 40 seconds. ROI was visible within the first sprint.",
    attrib: "VP of Engineering",
    org: "FinTech Platform · Bangalore, India",
    highlight: "40s",
    highlightLabel: "vs. 3 days prior",
  },
  {
    quote:
      "Three vendors said it wasn't possible at our data volume. AiRAT shipped a working prototype in two weeks and moved it to production in six. They understand complex environments.",
    attrib: "CTO",
    org: "Scale-up Technology · London, UK",
    highlight: "2 wks",
    highlightLabel: "To working prototype",
  },
] as const;

/** ── DIFFERENTIATORS ── */
export const DIFF_EYEBROW = "How we're different";
export const DIFF_TITLE = "Engineering without ";
export const DIFF_TITLE_EM = "the theatre.";
export const DIFF_UNLIKE_LINES = [
  { lead: "Unlike consultancies", rest: "we engineer from first principles  -  you own the architecture, not a slide deck." },
  { lead: "Unlike product vendors", rest: "we build to your environment, not a reference architecture that breaks on contact with reality." },
  { lead: "Unlike offshore factories", rest: "the engineers who design your system are the ones who deploy, stabilise, and hand it over." },
] as const;

export const DIFF_CARDS = [
  {
    num: "01",
    title: "Senior-led delivery",
    body: "The engineer who reviews your architecture brief is the same one deploying to production. No bait-and-switch after the statement of work is signed.",
  },
  {
    num: "02",
    title: "Production or we stop",
    body: "Milestones end in running software and agreed SLOs  -  not recommendations trapped in a presentation nobody owns.",
  },
  {
    num: "03",
    title: "Security by design",
    body: "Detection, access control, and evidence trails are in the first design pass  -  not a change request when audit season arrives.",
  },
] as const;

/** One closing line after differentiators (keeps rat metaphor away from hero) */
export const HOME_BRAND_CLOSER =
  "We map failure states  -  including ours  -  so the same incident class doesn't cost you twice.";

/** ── CLIENT LOGO STRIP  -  trust signal below hero ── */
export const HOME_CLIENT_STRIP = {
  label: "Trusted by",
  clients: [
    { name: "DTS Solutions" },
    { name: "Aggreko" },
    { name: "MSAZN" },
    { name: "Hireswift" },
    { name: "OAK Consultancy" },
    { name: "Aithentic" },
    { name: "EADX" },
    { name: "Kort" },
    { name: "Genda Phool" },
    { name: "GuardHawk" },
  ],
} as const;

/** ── HOMEPAGE CLIENTS  -  same narrative as About / Clients section ── */
export const HOME_CLIENTS_SECTION = {
  title: "Our customers",
  lead: "Companies we have delivered production systems for.",
  ctaLabel: "Meet our customers",
  ctaTo: "/about#clients",
} as const;

/** ── TRUST  -  operating context / industries ── */
export const TRUST_SECTION_EYEBROW = "Industries we serve";
export const TRUST_STRIP_HEADING = "Built for environments where failure has a cost.";
export const TRUST_SECTION_LEAD =
  "Finance, SOC teams, and product-led enterprises where regulatory pressure, uptime, and search performance share the same board narrative.";

export const TRUST_ITEMS = [
  {
    label: "Banking & FinTech",
    detail: "UAE Central Bank, RBI, and EU regulatory compliance built into architecture  -  not bolted on at audit time.",
    to: "/industries/fintech",
  },
  {
    label: "Security & SOC operations",
    detail: "SIEM/XDR, forensic evidence trails, and audit-ready detection for teams managing 1,000+ daily alerts.",
    to: "/services#cyber",
  },
  {
    label: "Retail & e-commerce search",
    detail: "Sub-second catalog search and checkout SLAs that hold under campaign peaks without adding headcount.",
    to: "/services#data",
  },
  {
    label: "Enterprise AI programmes",
    detail: "RAG pipelines, PII logging, and human review checkpoints before models touch production data.",
    to: "/services#ai",
  },
] as const;

// ── INTERNAL USE ONLY  -  not rendered on homepage ──────────────────────────────
// These research stats are kept for content strategy reference.
// Use on blog articles or internal decks, not the homepage.
export const HOME_RESEARCH_STRIP = {
  eyebrow: "Why it matters now",
  title: "The numbers behind the urgency.",
  items: [
    {
      stat: "25%",
      label: "Expected decline in traditional search engine queries by 2026 as AI assistants absorb them",
      source: "Gartner, 2024",
    },
    {
      stat: "65%",
      label: "Of Google searches already end without a click  -  AI Overviews accelerate this",
      source: "SparkToro Research",
    },
    {
      stat: "$12.9M",
      label: "Average annual cost of poor data quality  -  rising faster in regulated industries",
      source: "Gartner Data Quality Research",
    },
    {
      stat: "68%",
      label: "Of online experiences still begin with a search engine  -  your technical SEO is a revenue line",
      source: "BrightEdge Research",
    },
  ],
} as const;

/** ── HOMEPAGE FAQ  -  for AEO and SEO ── */
export const HOME_FAQ = [
  {
    q: "What does AiRAT build?",
    a: "AiRAT designs and deploys production security platforms (SIEM/XDR), governed AI and LLM systems (RAG pipelines, agents, evaluation harnesses), and petabyte-scale data and search infrastructure for regulated enterprises in the UAE, India, and Europe.",
  },
  {
    q: "Which industries does AiRAT serve?",
    a: "We deliver systems for banking and FinTech under UAE Central Bank, RBI, and EU regulatory frameworks; SOC and platform teams managing high-volume alert environments; retail and e-commerce operators with search latency SLAs; and enterprise AI programmes requiring RAG pipelines with governance and audit trails.",
  },
  {
    q: "Where does AiRAT operate?",
    a: "We deliver production systems for enterprises across the UAE, India, Europe, Australia, and the US, with data residency and compliance constraints designed in from the first architecture review.",
  },
] as const;

/** ── INSIGHTS (blog preview) ── */
export const HOME_INSIGHTS_SECTION = {
  eyebrow: "From the field",
  title: "Notes on what we're seeing.",
  lead: "Long-form writing on production RAG, OpenSearch migrations, SOC evidence, GEO, and AI search visibility  -  same standards as our delivery work.",
} as const;

/** ── FINAL CTA (pre-footer email capture) ── */
export const CTA_EYEBROW = "Get started";
export const CTA_TITLE_BEFORE = "Leave your email — we'll reach out.";
export const CTA_TITLE_EM = "";
export const CTA_TITLE_AFTER = "";
export const CTA_SUB =
  "Share your work email and we'll follow up with a tailored note on security, AI, or data programmes — usually within one business day.";
export const CTA_FORM_BUTTON = "Get in touch";
export const CTA_FORM_NOTE = "No spam. We only use your email to respond to this request.";
export const CTA_FORM_SUCCESS = "Thanks — we'll be in touch shortly.";
export const CTA_PRIMARY_LABEL = "Explore services";
export const CTA_SECONDARY_LABEL = "Read case studies";
export const CTA_DETAIL = CTA_FORM_NOTE;

/** Cross-page story links before footer */
export const HOME_STORY_LINKS = [
  { to: "/portfolio", label: "See production case studies" },
  { to: "/services", label: "How we deliver end-to-end" },
  { to: "/contact", label: "Contact AiRAT" },
] as const;

/** ── RAT PANEL (minimal  -  kept for brand section) ── */
export const RAT_PANEL = {
  eyebrow: "Brand",
  title: "Why the name matters - ",
  titleEm: "briefly.",
  bodyParas: [
    "We map whole environments, failures included, so the same incident class does not cost you twice. The longer narrative sits on About.",
  ],
  acronymCards: [] as readonly { readonly letter: string; readonly title: string; readonly desc: string }[],
} as const;

export const HOME_DOCUMENT_TITLE_SHORT = "AiRAT";

/** ── SHOWCASE (used by HomeShowcase component) ── */
export const SHOWCASE_SECTION = {
  eyebrow: "Delivery shape",
  titleBefore: "From signals to ",
  titleEm: "decisions",
  titleAfter: " your teams can defend",
  subtitle:
    "Security consoles, governed AI workflows, and search or lakehouse foundations  -  each layer earns the next so procurement and engineering share one story.",
} as const;

export type ShowcaseVisualVariant = "soc" | "ai" | "data";

export const SHOWCASE_ROWS: readonly {
  readonly name: string;
  readonly body: string;
  readonly variant: ShowcaseVisualVariant;
}[] = [
  {
    name: "Signal  -  consoles analysts actually live in",
    body: "Multi-tenant SIEM/XDR shells, correlation, and enrichment so tier-one triage happens in one timeline  -  not five tabs. Built for UAE-scale telemetry, European compliance questions, and the MTTR story your CISO has to tell.",
    variant: "soc",
  },
  {
    name: "Reasoning  -  AI workflows with guardrails",
    body: "RAG, tool use, and evaluation harnesses that survive production  -  not demo prompts. PII boundaries, citations, and human review are designed in before models touch customer data.",
    variant: "ai",
  },
  {
    name: "Foundation  -  search, lakehouse, and observability",
    body: "OpenSearch-grade discovery, lakehouse discipline, and pipelines you can observe when finance asks why costs moved. The substrate that keeps answers fast when catalogs and logs spike.",
    variant: "data",
  },
] as const;

/** Capability / stack constants live in sharedCapabilitiesCopy */
export {
  EXPLORE_DOMAIN_LINKS,
  HOME_SERVICES,
  SERVICES_SECTION_EYEBROW,
  SERVICES_SECTION_TITLE,
  SERVICES_SECTION_TITLE_EM,
  SERVICES_SECTION_LEAD,
  STACK_EYEBROW,
  STACK_TITLE,
  STACK_TITLE_EM,
  STACK_NOTE,
  STACK_PANELS,
} from "./sharedCapabilitiesCopy";
export type { HomeStackTool } from "./sharedCapabilitiesCopy";
