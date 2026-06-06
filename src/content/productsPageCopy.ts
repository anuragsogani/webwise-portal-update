/** Products, cyber services, and solution accelerators — AiRAT-owned copy (no vendor names). */

export const SLIDE_DURATION_MS = 5000;

export const PRODUCTS_SEO = {
  title: "Products | Managed SOC, XDR, Agentic Cloud Defender, ADR & Audit | AiRAT",
  description:
    "Managed CSOC and XDR, The Agentic Cloud Defender, cyber audit and GRC, plus agentic and application detection and response. SIEM migration, SOC-as-a-Service, and compliance accelerators for regulated enterprises.",
} as const;

/** Particle silhouette synced with featured product title (5s carousel). */
export type FeaturedParticleForm = "siem" | "hawkeye" | "xdr" | "audit" | "cspm" | "adr";

export type FeaturedProductSlide = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly summary: string;
  readonly ctaLabel: string;
  readonly ctaTo: string;
  readonly lottieSrc: string;
  readonly lottieFallbackSrc: string;
  /** @deprecated Homepage uses Lottie; kept for HawkeyeParticles elsewhere if needed */
  readonly particleForm: FeaturedParticleForm;
};

export const FEATURED_PRODUCT_SLIDES: readonly FeaturedProductSlide[] = [
  {
    id: "soc",
    eyebrow: "Featured product",
    title: "Managed CSOC & XDR",
    summary:
      "24/7 managed detection and response — multi-agent triage, threat hunting, and MDR with correlated timelines across endpoint, network, and cloud.",
    ctaLabel: "Explore product",
    ctaTo: "/products/soc",
    lottieSrc: "/lottie/product-soc.json",
    lottieFallbackSrc: "/doodles/home-icons/airat-security-icon.svg",
    particleForm: "siem",
  },
  {
    id: "adr",
    eyebrow: "Featured product",
    title: "Detection & Response — Agents & Applications",
    summary:
      "Agentic AI security for enterprise agents and MCP workloads, plus runtime application and API protection — one stack for modern attack surfaces.",
    ctaLabel: "Explore product",
    ctaTo: "/products/adr",
    lottieSrc: "/lottie/product-adr.json",
    lottieFallbackSrc: "/doodles/home-icons/airat-ai-systems-icon.svg",
    particleForm: "adr",
  },
  {
    id: "audit",
    eyebrow: "Featured product",
    title: "Cyber Audit & GRC Assurance",
    summary:
      "Risk maturity, regulatory alignment, and audit-ready evidence — from health checks through continuous compliance monitoring.",
    ctaLabel: "Explore product",
    ctaTo: "/products/audit",
    lottieSrc: "/lottie/product-audit.json",
    lottieFallbackSrc: "/doodles/compliance-audit.svg",
    particleForm: "audit",
  },
  {
    id: "cspm",
    eyebrow: "Featured product",
    title: "The Agentic Cloud Defender.",
    summary:
      "Multicloud misconfiguration detection, compliance mapping, and drift control — identity, workload, and data-plane visibility.",
    ctaLabel: "Explore product",
    ctaTo: "/products/cspm",
    lottieSrc: "/lottie/product-cspm.json",
    lottieFallbackSrc: "/doodles/platform-devops.svg",
    particleForm: "cspm",
  },
] as const;

export const PRODUCT_IDS = ["soc", "adr", "audit", "cspm"] as const;
export type ProductId = (typeof PRODUCT_IDS)[number];

export type WorkflowStep = {
  readonly step: string;
  readonly title: string;
  readonly body: string;
};

export type ProductDetail = {
  readonly id: ProductId;
  readonly title: string;
  readonly lead: string;
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly outcomes: readonly string[];
  readonly capabilities: readonly string[];
  readonly workflow: readonly WorkflowStep[];
  readonly agenticAdr?: {
    readonly title: string;
    readonly lead: string;
    readonly capabilities: readonly string[];
  };
  readonly applicationAdr?: {
    readonly title: string;
    readonly lead: string;
    readonly capabilities: readonly string[];
  };
};

export const PRODUCTS: readonly ProductDetail[] = [
  {
    id: "soc",
    title: "Managed CSOC & XDR",
    seoTitle: "Managed CSOC & XDR | 24/7 SOC Operations | AiRAT",
    seoDescription:
      "Managed security operations center and XDR: 24/7 monitoring, multi-agent triage, threat hunting, MDR, and SOAR with human-gated response.",
    lead:
      "Noise in. Resolution out. We operate and engineer your security operations center with human-gated automation, deep correlation, and hunt-ready telemetry — so analysts focus on decisions only humans should make.",
    workflow: [
      { step: "01", title: "Discover & benchmark", body: "Assess alert volume, tool sprawl, and risk profile to size the right operating model." },
      { step: "02", title: "Onboard & integrate", body: "Connect telemetry, tune detections, and agree SLAs, escalation paths, and evidence standards." },
      { step: "03", title: "Operate & improve", body: "24/7 monitoring, hunt cycles, playbook automation, and continuous use-case refinement." },
      { step: "04", title: "Report & govern", body: "Executive dashboards, audit-ready incident records, and quarterly maturity reviews." },
    ],
    outcomes: [
      "24/7 monitoring with analyst-approved response",
      "Correlated timelines across endpoint, network, and cloud",
      "Board-defensible evidence and SLA reporting",
    ],
    capabilities: [
      "Managed CSOC and extended detection and response (XDR)",
      "SIEM, UEBA, and open XDR correlation at scale",
      "Multi-agent triage with full reasoning traces",
      "Threat hunting, use-case development, and MITRE ATT&CK mapping",
      "Managed detection and response (MDR) with digital playbooks",
      "SOAR automation with human approval on every action",
    ],
  },
  {
    id: "adr",
    title: "Detection & Response — Agents & Applications",
    seoTitle: "Agentic & Application ADR | AI Agent Security | AiRAT",
    seoDescription:
      "Detection and response for enterprise AI agents and production applications: agentic telemetry, runtime ADR, red teaming, and SIEM-ready alerts.",
    lead:
      "Modern breaches start in agent workflows and production APIs. We deploy detection for both — high-fidelity telemetry for AI agents and in-runtime protection for applications — integrated with your SOC stack.",
    workflow: [
      { step: "01", title: "Map attack surfaces", body: "Inventory agents, MCP integrations, and critical apps/APIs in scope." },
      { step: "02", title: "Instrument & test", body: "Deploy sensors, run red-team scenarios, and validate detection tiers." },
      { step: "03", title: "Detect & triage", body: "Online two-tier detection with analyst-ready context in your SOC tools." },
      { step: "04", title: "Prevent & harden", body: "Shift-left guardrails, credential controls, and continuous posture reviews." },
    ],
    outcomes: [
      "Agent sessions observable end-to-end",
      "Application attacks blocked at runtime with context",
      "High-fidelity alerts your SIEM can trust",
    ],
    capabilities: [
      "Unified ADR strategy across agents and applications",
      "Pre-deployment red teaming and hard-example generation",
      "Two-tier online detection: fast triage plus deep reasoning",
      "Shift-left prevention for credential and policy violations",
    ],
    agenticAdr: {
      title: "Agentic detection & response",
      lead:
        "Secure AI agents operating through tool protocols and enterprise integrations — with observability EDR cannot provide on its own.",
      capabilities: [
        "High-fidelity agentic telemetry: prompts, tool calls, and causal chains",
        "Systematic pre-deployment testing and explorer workflows",
        "Scalable two-tier detection without runaway inference cost",
        "Credential exposure and policy violation prevention layers",
      ],
    },
    applicationAdr: {
      title: "Application detection & response",
      lead:
        "Detect and respond to attacks on applications and APIs from inside the runtime — before exploits succeed.",
      capabilities: [
        "In-app sensors for behavioral detection, not signature-only matching",
        "Zero-day and novel exploit classes blocked at the framework layer",
        "Alerts enriched with stack trace, payload, and vulnerable code context",
        "Native integration with SIEM, XDR, SOAR, and CNAPP workflows",
      ],
    },
  },
  {
    id: "audit",
    title: "Cyber Audit & GRC Assurance",
    seoTitle: "Cyber Audit & GRC | Compliance Assurance | AiRAT",
    seoDescription:
      "GRC consulting, IT security audits, risk maturity, regulatory alignment, and audit-ready evidence for regulated enterprises.",
    lead:
      "Compliance is architecture, not a seasonal scramble. We align policies, controls, and evidence chains so audit reviews become repeatable — not rescue missions.",
    workflow: [
      { step: "01", title: "Baseline maturity", body: "Health check against policies, controls, and regulatory expectations." },
      { step: "02", title: "Gap & prioritize", body: "Rank gaps by risk, owner, and audit timeline with remediation plans." },
      { step: "03", title: "Implement controls", body: "Harden monitoring, access, and change processes with evidence hooks." },
      { step: "04", title: "Assure & monitor", body: "Evidence packs, continuous compliance monitoring, and audit support." },
    ],
    outcomes: [
      "Audit-ready evidence packs, not manual spreadsheet hunts",
      "Risk maturity benchmarks with clear remediation paths",
      "Continuous monitoring of compliance and configuration drift",
    ],
    capabilities: [
      "GRC consulting and cyber risk maturity assessment",
      "IT security health checks and structured audit programs",
      "Regulatory alignment for UAE, EU, APAC, and financial-sector frameworks",
      "Security audit monitoring and compliance change management",
      "Third-party, privileged, and developer access monitoring",
      "Supply chain and operational compliance hardening",
    ],
  },
  {
    id: "cspm",
    title: "The Agentic Cloud Defender.",
    seoTitle: "The Agentic Cloud Defender | AiRAT",
    seoDescription:
      "The Agentic Cloud Defender: multicloud misconfiguration detection, compliance mapping, identity posture, and drift control integrated with SOC workflows.",
    lead:
      "Multicloud complexity creates blind spots faster than manual reviews can catch. We continuously assess posture, prioritize exploitable misconfigurations, and map fixes to your compliance targets.",
    workflow: [
      { step: "01", title: "Discover estates", body: "Map accounts, workloads, identities, and data flows across clouds." },
      { step: "02", title: "Assess posture", body: "Baseline misconfigurations and map findings to frameworks you must meet." },
      { step: "03", title: "Remediate & engineer", body: "Prioritize fixes by exploitability and implement guardrails in pipelines." },
      { step: "04", title: "Monitor drift", body: "Continuous posture monitoring with SOC-ready cloud incident context." },
    ],
    outcomes: [
      "Unified posture view across AWS, Azure, GCP, and hybrid estates",
      "Misconfiguration remediation ranked by exploitability",
      "Drift detection tied to identity and workload context",
    ],
    capabilities: [
      "The Agentic Cloud Defender across multicloud estates",
      "Misconfiguration detection for IAM, network, storage, and workloads",
      "Benchmark and regulatory control mapping (CIS-style frameworks)",
      "Identity posture and excessive permission analysis",
      "Container and Kubernetes configuration audit",
      "Integration with SOC workflows for cloud-origin incidents",
    ],
  },
] as const;

/** Homepage-style tiles for the products overview grid */
export type ProductTile = {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly metaType: string;
  readonly metaSignal: string;
  readonly ctaLabel: string;
};

export const PRODUCT_TILES: readonly ProductTile[] = [
  {
    id: "soc",
    title: "Managed CSOC & XDR",
    body:
      "24/7 security operations with multi-agent triage, correlated timelines, and human-gated response — so analysts focus on what only humans should decide.",
    metaType: "SOC / XDR",
    metaSignal: "24/7 analyst-approved response",
    ctaLabel: "Explore product",
  },
  {
    id: "adr",
    title: "Detection & Response — Agents & Applications",
    body:
      "Agentic AI security for enterprise agents plus runtime protection for applications and APIs — integrated with your existing SOC workflows.",
    metaType: "ADR",
    metaSignal: "Agent + application coverage",
    ctaLabel: "Explore product",
  },
  {
    id: "audit",
    title: "Cyber Audit & GRC Assurance",
    body:
      "Risk maturity, regulatory alignment, and audit-ready evidence chains — from health checks through continuous compliance monitoring.",
    metaType: "GRC / Audit",
    metaSignal: "Audit-ready evidence packs",
    ctaLabel: "Explore product",
  },
  {
    id: "cspm",
    title: "The Agentic Cloud Defender.",
    body:
      "Multicloud misconfiguration detection, compliance mapping, and drift control across identity, workloads, and data planes.",
    metaType: "Agentic cloud defender",
    metaSignal: "Exploitability-ranked fixes",
    ctaLabel: "Explore product",
  },
] as const;

export const PRODUCT_TILE_ICONS = [
  { src: "/images/duna-style/feature-security-console.svg", alt: "Managed CSOC and XDR" },
  { src: "/images/duna-style/feature-ai-console.svg", alt: "Agent and application detection and response" },
  { src: "/images/duna-style/trust-compliance-console.svg", alt: "Cyber audit and GRC assurance" },
  { src: "/images/duna-style/ai-compliance-console.svg", alt: "The Agentic Cloud Defender" },
] as const;

export type CyberService = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly linkTo: string;
};

export const CYBER_SERVICES: readonly CyberService[] = [
  {
    id: "managed-soc",
    title: "Managed SOC & XDR Operations",
    summary: "24/7 CSOC, alert triage, and extended detection across your estate.",
    linkTo: "/products/soc",
  },
  {
    id: "threat-hunting",
    title: "Threat Intelligence & Hunting",
    summary: "Proactive adversary detection, CTI fusion, and use-case development.",
    linkTo: "/products/soc",
  },
  {
    id: "incident-response",
    title: "Incident Response & Forensics",
    summary: "IR playbooks, triage, containment staging, and digital forensics.",
    linkTo: "/products/soc",
  },
  {
    id: "grc",
    title: "GRC & Compliance Advisory",
    summary: "Policies, risk maturity, and audit-ready operating models.",
    linkTo: "/products/audit",
  },
  {
    id: "cloud-engineering",
    title: "Cloud Security Engineering",
    summary: "Architecture, hardening, and posture operations for multicloud.",
    linkTo: "/products/cspm",
  },
  {
    id: "agentic-app-sec",
    title: "Agentic & Application Security",
    summary: "ADR for AI agents and production applications/APIs.",
    linkTo: "/products/adr",
  },
] as const;

export type CyberSolution = {
  readonly id: string;
  readonly title: string;
  readonly oneLiner: string;
  readonly outcomes: readonly string[];
  readonly relatedProductId: string;
};

export const CYBER_SOLUTIONS: readonly CyberSolution[] = [
  {
    id: "siem-migration",
    title: "SIEM Migration & Platform Modernization",
    oneLiner: "Move off legacy SIEM without losing detection coverage or audit history.",
    outcomes: ["Phased cutover with rollback paths", "Detection parity benchmarks", "Unified correlation post-migration"],
    relatedProductId: "soc",
  },
  {
    id: "soc-aas",
    title: "SOC-as-a-Service Stand-Up",
    oneLiner: "Outsourced or hybrid 24/7 operations with agreed SLAs from day one.",
    outcomes: ["Operating model fit to risk profile", "Runbooks and escalation paths", "Executive reporting cadence"],
    relatedProductId: "soc",
  },
  {
    id: "xdr-deploy",
    title: "XDR Deployment & Detection Engineering",
    oneLiner: "MITRE-aligned content, tuning, and enrichment pipelines that survive scale.",
    outcomes: ["Lower false-positive rates", "Faster mean-time-to-detect", "Analyst-ready alert context"],
    relatedProductId: "soc",
  },
  {
    id: "cspm-assessment",
    title: "The Agentic Cloud Defender — Multicloud Posture Assessment",
    oneLiner: "Baseline posture, prioritized fixes, and continuous monitoring design.",
    outcomes: ["Exploitability-ranked backlog", "Control mapping to your frameworks", "SOC integration for cloud alerts"],
    relatedProductId: "cspm",
  },
  {
    id: "agentic-assessment",
    title: "Agentic AI Security Assessment",
    oneLiner: "Red-team agent workflows, telemetry design, and guardrails before production scale.",
    outcomes: ["Pre-deployment hard examples", "Detection tier architecture", "Governance sign-off criteria"],
    relatedProductId: "adr",
  },
  {
    id: "app-adr-rollout",
    title: "Application Detection & Response Rollout",
    oneLiner: "Runtime sensors and blocking policies for critical apps and APIs.",
    outcomes: ["Inline protection for high-risk services", "SIEM-ready enriched alerts", "Vulnerability-linked prioritization"],
    relatedProductId: "adr",
  },
  {
    id: "audit-readiness",
    title: "Compliance Audit Readiness Accelerator",
    oneLiner: "Evidence chains, control gaps, and remediation plans auditors expect.",
    outcomes: ["Structured evidence packs", "Gap analysis with owners", "Continuous monitoring hooks"],
    relatedProductId: "audit",
  },
  {
    id: "soar-automation",
    title: "SOAR Automation & Playbook Factory",
    oneLiner: "Orchestrated response with human gates — not unattended automation.",
    outcomes: ["Repeatable playbooks per incident class", "Analyst approval on every action", "Immutable action logs"],
    relatedProductId: "soc",
  },
] as const;

export const PRODUCTS_HERO = {
  badge: "Products",
  headline: "Security operations and posture — built to run in production.",
  body: "Managed SOC and XDR, The Agentic Cloud Defender, audit-ready GRC, and modern detection and response for agents and applications. Each product ships with agreed SLAs — not slide-deck promises.",
} as const;

export const PRODUCTS_NAV_SECTIONS = [
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
] as const;

export const PRODUCTS_CLOSING = {
  title: "Ready to scope your security stack?",
  body: "Tell us your priority — SOC overload, agentic cloud defender gaps, audit season, or agentic AI rollout — and we will map the right product and accelerator.",
  cta: "Book a strategy call",
  ctaTo: "/contact",
} as const;

export const PRODUCTS_FAQ_SECTION = {
  title: "Products — quick answers",
  intro: "For security, platform, and procurement leads comparing SOC, ADR, audit, and cloud posture options.",
} as const;

export const PRODUCTS_FAQ = [
  {
    q: "What is the difference between managed SOC and XDR?",
    a: "A managed SOC provides 24/7 monitoring, triage, and response operations. XDR extends detection by correlating endpoint, network, cloud, and identity telemetry into a single timeline. AiRAT delivers both as an integrated operating model so analysts see context, not tool silos.",
  },
  {
    q: "What does application detection and response (ADR) cover?",
    a: "Application ADR uses in-runtime sensors to detect and block attacks on production applications and APIs — including novel exploits — with alerts enriched by code-level context. It complements network and endpoint controls rather than replacing them.",
  },
  {
    q: "How is agentic AI security different from traditional EDR?",
    a: "Enterprise AI agents expose reasoning, prompts, tool calls, and MCP sessions that classic endpoint tools do not fully observe. Agentic detection adds high-fidelity telemetry, pre-deployment testing, and scalable two-tier detection designed for agent workloads.",
  },
  {
    q: "What is The Agentic Cloud Defender and how does it relate to cloud security engineering?",
    a: "The Agentic Cloud Defender continuously finds misconfigurations and drift across multicloud estates. AiRAT pairs posture assessments with engineering hardening so findings become remediated controls — not dashboard noise.",
  },
  {
    q: "What do we receive from a compliance audit readiness engagement?",
    a: "Structured evidence packs, control gap analysis with owners, remediation priorities, and hooks for continuous compliance monitoring — aligned to the frameworks your auditors and regulators expect.",
  },
  {
    q: "How do Solutions differ from Products on this page?",
    a: "Products are the core platforms we operate long term. Solutions are focused accelerators — such as SIEM migration or SOC stand-up — with defined outcomes and timelines to reach production faster.",
  },
] as const;

export function isProductId(id: string): id is ProductId {
  return (PRODUCT_IDS as readonly string[]).includes(id);
}

export function getProduct(id: string): ProductDetail | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function productPath(id: ProductId): string {
  return `/products/${id}`;
}

export function getSolutionsForProduct(id: ProductId) {
  return CYBER_SOLUTIONS.filter((s) => s.relatedProductId === id);
}

export function getServicesForProduct(id: ProductId) {
  return CYBER_SERVICES.filter((s) => s.linkTo === productPath(id));
}

/** Other products for cross-navigation on detail pages */
export function getSiblingProducts(currentId: ProductId) {
  return PRODUCTS.filter((p) => p.id !== currentId);
}
