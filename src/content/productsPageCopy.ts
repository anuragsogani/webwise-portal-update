/** Products, cyber services, and solution accelerators — AiRAT-owned copy (no vendor names). */

export const SLIDE_DURATION_MS = 5000;

export const PRODUCTS_SEO = {
  title: "Products | Autonomous SOC, ADR, Cloud Security & GRC | AiRAT",
  description:
    "Autonomous SOC, Agent Detection & Response, Cloud Security & Governance, and Cyber Audit & GRC. Unified platforms for detection, cloud posture, agent security, and compliance.",
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
    title: "Autonomous Security Operations Platform",
    summary:
      "From millions of events to actionable decisions — automatically. Unify your stack, correlate threats, and let AI analysts investigate, prioritize, and respond 24×7.",
    ctaLabel: "See platform",
    ctaTo: "/products/soc",
    lottieSrc: "/lottie/product-soc.json",
    lottieFallbackSrc: "/doodles/home-icons/airat-security-icon.svg",
    particleForm: "siem",
  },
  {
    id: "adr",
    eyebrow: "Featured product",
    title: "Agent Detection & Response (ADR)",
    summary:
      "Secure every agent. Govern every decision. Continuous visibility, threat detection, and response for AI agents, MCP servers, copilots, and autonomous workflows.",
    ctaLabel: "See platform",
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
    title: "Cloud Security & Governance Platform",
    summary:
      "Secure every cloud. Govern every resource. Unified visibility, posture management, DevSecOps, identity governance, compliance, and cost intelligence across multi-cloud estates.",
    ctaLabel: "See platform",
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
    title: "Autonomous Security Operations Platform",
    seoTitle: "Autonomous Security Operations Platform | AiRAT SOC",
    seoDescription:
      "Unify your security stack, correlate threats across your environment, and let AI-powered analysts investigate, prioritize, and respond 24×7. From millions of events to actionable decisions — automatically.",
    lead:
      "Unify your security stack, correlate threats across your entire environment, and let AI-powered analysts investigate, prioritize, and respond 24×7.",
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
    title: "Agent Detection & Response (ADR)",
    seoTitle: "Agent Detection & Response (ADR) | Agent Security & Governance | AiRAT",
    seoDescription:
      "Secure every agent. Govern every decision. Continuous visibility, governance, threat detection, and response for AI agents, MCP servers, copilots, and RAG systems.",
    lead:
      "As organizations adopt AI agents, MCP servers, autonomous workflows, and enterprise copilots, a new attack surface emerges. ADR provides continuous visibility, governance, threat detection, and response for the entire AI workforce.",
    workflow: [
      { step: "01", title: "Discover & classify", body: "Inventory agents, workflows, MCP integrations, models, and copilots in scope." },
      { step: "02", title: "Define governance", body: "Set roles, boundaries, approved tools, policies, and compliance requirements." },
      { step: "03", title: "Monitor & detect", body: "Continuous prompt, tool, and behavior analysis with real-time threat detection." },
      { step: "04", title: "Respond & audit", body: "Isolate, suspend, revoke access, escalate incidents, and preserve audit trails." },
    ],
    outcomes: [
      "Complete visibility across the AI workforce",
      "Governance and compliance for every agent decision",
      "Threat detection built for agent behavior, not endpoints alone",
    ],
    capabilities: [
      "Agent Detection & Response (ADR) platform",
      "AI workforce visibility across agents, MCP, and copilots",
      "Prompt and interaction security with output validation",
      "Agent governance, policy enforcement, and audit trails",
      "Runtime protection with risk-based inspection",
      "Automated and analyst-driven agent response",
    ],
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
    title: "Cloud Security & Governance Platform",
    seoTitle: "Cloud Security & Governance Platform | CSPM, DevSecOps & Cost Intelligence | AiRAT",
    seoDescription:
      "Secure every cloud. Govern every resource. Unified cloud visibility, posture management, DevSecOps, identity governance, compliance monitoring, and cost intelligence.",
    lead:
      "Gain complete visibility across cloud infrastructure, applications, identities, code repositories, and services. Detect risks, eliminate misconfigurations, optimize costs, and strengthen compliance from one platform.",
    workflow: [
      { step: "01", title: "Discover estates", body: "Map accounts, workloads, identities, code repos, and data flows across clouds." },
      { step: "02", title: "Assess posture", body: "Continuous CSPM validation against security baselines and compliance frameworks." },
      { step: "03", title: "Secure & optimize", body: "Shift-left DevSecOps, identity governance, and cost intelligence in one workflow." },
      { step: "04", title: "Govern & report", body: "Executive dashboards for risk, compliance, identity exposure, and spend optimization." },
    ],
    outcomes: [
      "Unified visibility across multi-cloud and hybrid estates",
      "Continuous posture and compliance — not point-in-time scans",
      "Security, governance, and cost intelligence in one view",
    ],
    capabilities: [
      "Cloud Security Posture Management (CSPM)",
      "DevSecOps and infrastructure-as-code validation",
      "Identity and access governance with least-privilege analysis",
      "Compliance mapping for ISO, SOC 2, PCI, GDPR, HIPAA, NIST, and CIS",
      "Cloud cost intelligence and optimization recommendations",
      "Executive cloud intelligence dashboard",
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
    title: "Autonomous Security Operations Platform",
    body:
      "Unify telemetry, correlate attack paths, and let AI SOC analysts triage, investigate, and respond — from 2,000 alerts to 12 prioritized incidents.",
    metaType: "AI-powered SOC",
    metaSignal: "< 5 min MTTR · 100+ integrations",
    ctaLabel: "See platform",
  },
  {
    id: "adr",
    title: "Agent Detection & Response (ADR)",
    body:
      "Secure every agent. Govern every decision. Visibility, governance, threat detection, and response for AI agents, MCP servers, copilots, and autonomous workflows.",
    metaType: "Agent security",
    metaSignal: "8+ visibility domains · 24×7 monitoring",
    ctaLabel: "See platform",
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
    title: "Cloud Security & Governance Platform",
    body:
      "Secure every cloud. Govern every resource. CSPM, DevSecOps, identity governance, compliance, and cost intelligence — unified across multi-cloud estates.",
    metaType: "Cloud security & governance",
    metaSignal: "Posture · DevSecOps · Cost intel",
    ctaLabel: "See platform",
  },
] as const;

export const PRODUCT_TILE_ICONS = [
  { src: "/images/duna-style/feature-security-console.svg", alt: "Managed CSOC and XDR" },
  { src: "/images/duna-style/feature-ai-console.svg", alt: "Agent and application detection and response" },
  { src: "/images/duna-style/trust-compliance-console.svg", alt: "Cyber audit and GRC assurance" },
  { src: "/images/duna-style/feature-service-cloud-native.svg", alt: "Cloud Security & Governance Platform" },
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
    title: "Cloud Security & Governance",
    summary: "Posture management, DevSecOps, identity governance, and cost intelligence for multicloud.",
    linkTo: "/products/cspm",
  },
  {
    id: "agentic-app-sec",
    title: "Agentic AI Security",
    summary: "Agent Detection & Response for AI agents, MCP servers, and copilots.",
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
    title: "Cloud Security & Governance Assessment",
    oneLiner: "Baseline posture, DevSecOps gaps, identity exposure, and cost optimization opportunities.",
    outcomes: ["Exploitability-ranked remediation backlog", "Compliance mapping to your frameworks", "Unified security and cost intelligence roadmap"],
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
  headline: "One intelligence core. Integrated from day one.",
  body: "The Autonomous CSOC is the core — connect the security tools you already run, then layer in Endpoint, Cloud, and Agent platforms that share one data model and one response fabric. No bolt-ons. No integration projects.",
} as const;

/** Core-and-layers model for the redesigned products landing page. */
export type ProductRole = "core" | "layer";

export type ProductMetric = { readonly value: string; readonly label: string };

export type ProductShowcase = {
  readonly id: string;
  readonly role: ProductRole;
  readonly kicker: string;
  readonly title: string;
  /** short display name used in prose */
  readonly shortName: string;
  /** label inside the core diagram */
  readonly diagramLabel: string;
  readonly oneLiner: string;
  /** a hard data pointer, not theory */
  readonly metric: ProductMetric;
  /** concrete capability checklist */
  readonly capabilities: readonly string[];
  /** single hard outcome line */
  readonly outcome: string;
  readonly accent: string;
  readonly to: string;
  readonly ctaLabel: string;
};

export const PRODUCT_SHOWCASE: readonly ProductShowcase[] = [
  {
    id: "soc",
    role: "core",
    kicker: "The intelligence core",
    title: "Autonomous CSOC Platform",
    shortName: "CSOC",
    diagramLabel: "CSOC",
    oneLiner:
      "Connect the security tools you already run and AiRAT's own platforms into one plane — every signal correlated, triaged, and actioned by AI analysts with a human on every response.",
    metric: { value: "2,000 → 12", label: "daily alerts to prioritized incidents" },
    capabilities: [
      "100+ tool & data integrations",
      "SIEM · UEBA · open-XDR correlation",
      "Multi-agent triage with reasoning traces",
      "Threat hunting & MITRE ATT&CK mapping",
      "SOAR automation, human-approved",
      "Board-ready evidence & SLA reporting",
    ],
    outcome: "One correlated picture, investigated 24×7 — not four disconnected consoles.",
    accent: "#aeec1d",
    to: "/products/soc",
    ctaLabel: "See the platform",
  },
  {
    id: "xdr",
    role: "layer",
    kicker: "Endpoint plane · integrates day one",
    title: "Endpoint Operations & Security Platform",
    shortName: "Endpoint",
    diagramLabel: "Endpoint",
    oneLiner:
      "Manage, patch, enforce policy, run privileged remote operations, and prove compliance for every endpoint — from one command center.",
    metric: { value: "1 control plane", label: "thousands of endpoints, zero direct access" },
    capabilities: [
      "Software & patch lifecycle automation",
      "Privileged remote operations centre",
      "Zero-trust device comms (mTLS)",
      "Security policy enforcement",
      "Fleet automation, rollback & recovery",
      "Deployment & compliance tracking",
    ],
    outcome: "Faster remediation, smaller exposure windows, consistent baselines on every device.",
    accent: "#46838c",
    to: "/products/endpoint",
    ctaLabel: "See the platform",
  },
  {
    id: "cspm",
    role: "layer",
    kicker: "Cloud plane · integrates day one",
    title: "Cloud Security & Governance Platform",
    shortName: "Cloud",
    diagramLabel: "Cloud",
    oneLiner:
      "Secure every cloud, govern every resource — posture, identity, compliance, and cost intelligence in one continuous view that feeds the core.",
    metric: { value: "7+ frameworks", label: "ISO · SOC 2 · PCI · GDPR · NIST · CIS" },
    capabilities: [
      "Cloud posture management (CSPM)",
      "DevSecOps & IaC validation",
      "Identity & least-privilege governance",
      "Continuous compliance mapping",
      "Cloud cost intelligence",
      "Multi-cloud & hybrid visibility",
    ],
    outcome: "Continuous posture and cost intelligence across every cloud — not point-in-time scans.",
    accent: "#c79a3e",
    to: "/products/cspm",
    ctaLabel: "See the platform",
  },
  {
    id: "adr",
    role: "layer",
    kicker: "Agent plane · integrates day one",
    title: "Agent Detection & Response",
    shortName: "Agents",
    diagramLabel: "Agents",
    oneLiner:
      "Secure the AI workforce — agents, MCP servers, copilots — with visibility, governance, and response built for agent behavior, streamed into the core.",
    metric: { value: "8+ domains", label: "agent visibility, governance & response" },
    capabilities: [
      "AI workforce inventory & visibility",
      "Prompt & interaction security",
      "Agent governance & policy enforcement",
      "Runtime protection & inspection",
      "Automated & analyst-driven response",
      "Full agent audit trails",
    ],
    outcome: "Every agent decision visible, governed, and auditable.",
    accent: "#17100d",
    to: "/products/adr",
    ctaLabel: "See the platform",
  },
] as const;

export const PRODUCTS_MODEL = {
  eyebrow: "The model",
  title: "Bring the stack you already run. We make it intelligent.",
  body: "SIEM, EDR, firewalls, identity, ticketing, threat intel — the CSOC ingests the tools you already run and turns scattered telemetry into correlated, decision-ready intelligence. Then Endpoint, Cloud, and Agent platforms layer on top, sharing the same data model from day one.",
  stats: [
    { value: "100+", label: "integrations" },
    { value: "1", label: "unified data plane" },
    { value: "0", label: "rip-and-replace" },
  ],
} as const;

/** Hard proof stats for the CSOC core block. */
export const PRODUCTS_CORE_STATS = [
  { value: "87%", label: "alert noise eliminated" },
  { value: "12×", label: "faster investigation" },
  { value: "< 5 min", label: "mean time to respond" },
  { value: "99.95%", label: "platform uptime" },
] as const;

export const PRODUCTS_CORE_CTA = {
  title: "Start with the core. The layers come with it.",
  body: "Tell us where the pressure is — alert overload, cloud posture, agentic AI rollout, or audit season — and we'll stand up the SOC core with the layers you need, integrated from day one.",
  cta: "Book a strategy call",
  ctaTo: "/contact",
} as const;

export const PRODUCTS_NAV_SECTIONS = [
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
] as const;

export const PRODUCTS_CLOSING = {
  title: "Ready to scope your security stack?",
  body: "Tell us your priority — SOC overload, cloud posture and cost, audit season, or agentic AI rollout — and we will map the right product and accelerator.",
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
    q: "What is Agent Detection & Response (ADR)?",
    a: "Agent Detection & Response (ADR) provides continuous visibility, governance, threat detection, and response for AI agents, MCP servers, autonomous workflows, copilots, and RAG systems — a security model built for the AI workforce, not traditional endpoints alone.",
  },
  {
    q: "How is agentic AI security different from traditional EDR?",
    a: "Enterprise AI agents expose reasoning, prompts, tool calls, and MCP sessions that classic endpoint tools do not fully observe. Agentic detection adds high-fidelity telemetry, pre-deployment testing, and scalable two-tier detection designed for agent workloads.",
  },
  {
    q: "What is the Cloud Security & Governance Platform?",
    a: "A unified platform for cloud visibility, security posture management (CSPM), DevSecOps, identity and access governance, compliance monitoring, and cost intelligence — so security, governance, and spend are managed together, not in separate tools.",
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
