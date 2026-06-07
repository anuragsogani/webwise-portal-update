import type { HomeVisual } from "./homePageVisuals";

const DUNA = "/images/duna-style";
const CSOC = "/images/csoc";

export const SOC_PRODUCT_SEO = {
  title: "Autonomous Security Operations Platform | AiRAT SOC",
  description:
    "Unify your security stack, correlate threats across your environment, and let AI-powered analysts investigate, prioritize, and respond 24×7. From millions of events to actionable decisions — automatically.",
} as const;

export const SOC_HERO = {
  eyebrow: "Autonomous Security Operations Platform",
  title: "From Millions of Events to Actionable Decisions — Automatically",
  lead:
    "Unify your security stack, correlate threats across your entire environment, and let AI-powered analysts investigate, prioritize, and respond 24×7.",
  tagline: "Monitor. Analyze. Investigate. Respond.",
  primaryCta: { label: "Request Demo", to: "/contact?intent=soc-demo" },
  secondaryCta: { label: "See Platform Tour", to: "/demo" },
  background: {
    src: `${CSOC}/csoc_background_trim.png`,
    width: 1672,
    height: 940,
  },
} as const;

export const SOC_METRICS = [
  {
    label: "Integrations",
    detail: "Cloud, network, endpoint, identity & security tools",
    counter: { target: 100, suffix: "+" },
    fallback: "100+",
  },
  {
    label: "AI Analysts",
    detail: "Continuous investigation & triage",
    counter: { target: 24, suffix: "\u00d77" },
    fallback: "24\u00d77",
  },
  {
    label: "MTTR",
    detail: "Accelerated detection & response",
    counter: { target: 5, prefix: "< ", suffix: " Min" },
    fallback: "< 5 Min",
  },
  {
    label: "Attack Visibility",
    detail: "From alert to root cause",
    fallback: "Full Chain",
  },
] as const;

export const SOC_SCROLL_ONE = {
  eyebrow: "Unified visibility",
  title: "One platform. Complete visibility.",
  lead: "Bring all your security, infrastructure, cloud, and operational telemetry into a single intelligence layer.",
  integrationGroups: [
    {
      category: "Cloud Platforms",
      tools: ["AWS", "Azure", "GCP"],
    },
    {
      category: "Security Tools",
      tools: ["Wazuh", "CrowdStrike", "SentinelOne", "Microsoft Defender"],
    },
    {
      category: "Network Security",
      tools: ["Palo Alto", "Fortinet", "Cisco", "Check Point"],
    },
    {
      category: "Identity & Access",
      tools: ["Entra ID", "Okta", "Keycloak"],
    },
    {
      category: "Infrastructure & Observability",
      tools: ["Kubernetes", "Docker", "OpenSearch", "Elastic", "Prometheus"],
    },
  ],
    visual: {
      src: `${CSOC}/csoc_intigrations_trim.png`,
      alt: "Integration ecosystem diagram showing cloud platforms, security tools, network security, identity, observability, data sources, ITSM, and threat intelligence unified through the CSOC Intelligence Engine",
      width: 1536,
      height: 1024,
    },
} as const;

export const SOC_SCROLL_TWO = {
  intelligence: {
    eyebrow: "Intelligence engine",
    title: "Stop looking at alerts. Start understanding threats.",
    contrast: "Most platforms generate alerts. We generate understanding.",
    lead:
      "Our intelligence layer continuously correlates signals, enriches context, identifies attack paths, and surfaces only what matters.",
    capabilities: [
      { title: "Attack Path Analysis", body: "Map how threats move across users, systems, assets, identities, and workloads." },
      { title: "Alert Correlation", body: "Automatically group related alerts into a single incident." },
      { title: "Root Cause Discovery", body: "Identify the originating source behind complex attack chains." },
      { title: "Threat Intel Enrichment", body: "Add reputation, IOC, behavior, and context automatically." },
      { title: "Risk Prioritization", body: "Focus on incidents with real business impact." },
    ],
    visual: {
      src: `${DUNA}/soc-attack-graph.svg`,
      alt: "Attack graph showing user, endpoint, identity, cloud resource, and database connected in a highlighted attack chain with risk score",
      width: 1200,
      height: 675,
    },
  },
  aiSoc: {
    eyebrow: "AI SOC analysts",
    title: "Your 24×7 security operations team",
    lead: "AI agents continuously investigate alerts, validate findings, gather evidence, and provide actionable recommendations.",
    roles: [
      { icon: "shield", title: "L1 Triage Analyst", body: "Filters noise and validates alerts." },
      { icon: "search", title: "L2 Investigation Analyst", body: "Performs deep investigations and correlation." },
      { icon: "target", title: "Threat Hunter", body: "Searches historical activity and hidden attack patterns." },
      { icon: "bolt", title: "Response Coordinator", body: "Generates remediation plans and response actions." },
    ],
    outcomeBefore: "2,000",
    outcomeBeforeLabel: "Alerts",
    outcomeAfter: "12",
    outcomeAfterLabel: "Prioritized incidents",
  },
  context: {
    eyebrow: "Context layer",
    title: "Security decisions powered by context",
    lead: "A continuously evolving knowledge layer built from your environment, assets, identities, cloud resources, and historical investigations.",
    sources: [
      "Asset Inventory",
      "Cloud Resources",
      "Identity Systems",
      "Security Controls",
      "Historical Incidents",
      "Threat Intelligence",
      "Compliance Data",
      "Organizational Structure",
    ],
    result: "Every alert is analyzed with complete environmental context before reaching your team.",
    visual: {
      src: `${CSOC}/csoc_contextlayer_trim.png`,
      alt: "Context engine diagram showing unified context sources feeding a security knowledge graph that powers attack path analysis, AI investigation, threat correlation, risk prioritization, and autonomous response",
      width: 1672,
      height: 941,
    },
  },
  automation: {
    eyebrow: "Automated response",
    title: "Respond faster. Stay in control.",
    lead: "Choose how much automation you want — from assisted recommendations to full autonomous response.",
    modes: [
      { title: "Assisted Mode", body: "AI recommends actions. Your team approves execution." },
      { title: "Semi-Automated", body: "Pre-approved workflows execute automatically." },
      { title: "Full Autonomous", body: "AI investigates, responds, and documents actions automatically." },
    ],
    actions: [
      "Block Malicious IP",
      "Disable Compromised User",
      "Isolate Endpoint",
      "Update Firewall Rules",
      "Create Tickets",
      "Notify Teams",
      "Trigger Playbooks",
    ],
  },
} as const;

/** Intelligence engine rotator — one visual per capability (matches homepage FeatureModuleRotator) */
export const SOC_INTELLIGENCE_ROTATOR_VISUALS: readonly HomeVisual[] = [
  {
    src: `${CSOC}/csoc_chain_1_trim.png`,
    alt: "Attack path analysis chain showing how a threat moves across identity, endpoint, cloud, and database systems",
    width: 1627,
    height: 967,
  },
  {
    src: `${CSOC}/csoc_chain_2_trim.png`,
    alt: "Incident correlation chain showing related alerts converging into a single investigative timeline",
    width: 1619,
    height: 970,
  },
  {
    src: `${CSOC}/csoc_chain_3_trim.png`,
    alt: "Detection engineering chain showing coverage across sources and severity levels",
    width: 1536,
    height: 959,
  },
  {
    src: `${CSOC}/csoc_chain_4_trim.png`,
    alt: "Evidence trails chain showing the sequence of signals, decisions, and response actions in an incident",
    width: 1511,
    height: 656,
  },
  {
    src: `${CSOC}/csoc_chain_5_trim.png`,
    alt: "Risk prioritization chain showing how threats are ranked and routed to response workflows",
    width: 1562,
    height: 671,
  },
] as const;

export const SOC_SCROLL_THREE = {
  dashboard: {
    eyebrow: "Executive dashboard",
    title: "Security intelligence at a glance",
    lead: "A clean, unified view of your entire security posture.",
    highlights: [
      "Threat Overview",
      "Active Incidents",
      "Attack Surface Visibility",
      "Cloud Security Posture",
      "Asset Risk Scores",
      "Compliance Status",
      "Response Effectiveness",
      "Investigation Timeline",
      "AI Analyst Activity",
    ],
    visual: {
      src: "/images/duna-style/soc-platform-dashboard.svg",
      alt: "Modern SOC executive dashboard with threat overview, active incidents, risk scores, and AI analyst activity feed",
      width: 1200,
      height: 675,
    },
  },
  why: {
    eyebrow: "Why teams choose us",
    title: "Outcomes that scale without adding headcount",
    items: [
      { title: "Reduce Alert Fatigue", body: "Focus only on validated threats." },
      { title: "Accelerate Investigations", body: "From hours to minutes." },
      { title: "Improve Visibility", body: "See relationships across your environment." },
      { title: "Scale Without Hiring", body: "Operate with AI-powered analysts." },
      { title: "Standardize Response", body: "Consistent investigations and remediation." },
      { title: "Future-Ready Architecture", body: "Cloud, hybrid, multi-cloud, on-prem." },
    ],
  },
  cta: {
    title: "Security operations without the complexity",
    lead:
      "Transform fragmented tools, overwhelming alerts, and manual investigations into a unified, intelligent security operation.",
    subtitle: "See your environment through an AI-powered SOC",
    primary: { label: "Request a Demo", to: "/contact?intent=soc-demo" },
    secondary: { label: "Talk to a Security Expert", to: "/contact?intent=soc-expert" },
  },
} as const;
