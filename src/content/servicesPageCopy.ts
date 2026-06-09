export const SERVICES_SEO = {
  title: "Services | Security, AI, Data & Platform Operations | AiRAT",
  description:
    "AiRAT engineers intelligent operations across security, AI, data, and platform. We turn fragmented tools and manual workflows into observable, governed systems that scale  -  built in the UAE, India, and Europe.",
} as const;

export const SERVICES_HERO = {
  badge: "Services",
  headline: "Engineering intelligent operations.",
  kicker: "Security. AI. Data. Platform.",
  body: "Modern organizations don't fail for lack of technology. They fail when critical systems grow too complex to operate, secure, govern, and scale. We turn fragmented tools and manual processes into intelligent systems that scale with the business.",
} as const;

export const SERVICES_PILLARS_SECTION = {
  title: "Four operations. One delivery model.",
  lead: "We build operational excellence across the systems your business runs on  -  detection, AI, data, and infrastructure.",
} as const;

export type ServicePillar = {
  id: string;
  /** Mono eyebrow label */
  label: string;
  /** Catchy, conversion-led headline */
  headline: string;
  /** One-line tension under the headline */
  subhead: string;
  /** Short framing paragraph */
  lead: string;
  /** The pressures the buyer feels today */
  challenges: string[];
  /** Capability chips  -  what we deliver */
  deliver: string[];
  /** The business outcome line */
  outcome: string;
  caseStudy?: { readonly label: string; readonly to: string };
};

/** Legacy shape kept for ServiceStackExplorer typing compatibility (component is not mounted). */
export type ServiceBlock = {
  id: string;
  problemClass: string;
  title: string;
  description: string;
  tileSummary: string;
  covered: string[];
  q: string;
  a: string;
  caseStudy?: { readonly label: string; readonly to: string };
};

export const SERVICES_PILLARS: ServicePillar[] = [
  {
    id: "security",
    label: "Security Operations",
    headline: "Threats aren't waiting. Neither should your response.",
    subhead: "Security teams have more tooling than ever  -  and less clarity.",
    lead: "Visibility stays fragmented, investigations stay manual, and real alerts get buried under noise. Adding tools rarely solves it. Creating operational intelligence does. We turn reactive security programs into intelligent operations that detect, investigate, prioritise, and respond at scale.",
    challenges: [
      "Thousands of alerts arrive, but only a fraction get investigated.",
      "Cloud, endpoint, identity, and application security run in separate silos.",
      "Analysts spend hours correlating events across disconnected dashboards.",
      "Security spend keeps growing while operational efficiency does not.",
    ],
    deliver: [
      "Unified Security Visibility",
      "Threat Detection Engineering",
      "Security Automation",
      "Attack Path Analysis",
      "Cloud Security Integration",
      "Identity-Centric Monitoring",
      "Continuous Threat Hunting",
      "Operational Security Dashboards",
    ],
    outcome: "Reduce operational noise, accelerate investigations, and focus resources on the threats that matter most.",
    caseStudy: {
      label: "Read the SIEM / XDR case study",
      to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
    },
  },
  {
    id: "ai",
    label: "AI Operations",
    headline: "AI is moving faster than your governance.",
    subhead: "Copilots, agents, and RAG platforms ship at speed  -  with little oversight.",
    lead: "Most teams have little visibility into how AI systems behave once deployed. Without governance, AI quickly becomes an operational and security challenge. We build AI systems that are observable, secure, compliant, and production-ready.",
    challenges: [
      "AI initiatives stay stuck in proof-of-concept mode.",
      "Agentic workflows operate without oversight or clear boundaries.",
      "Teams cannot explain how AI decisions are actually made.",
      "AI usage expands faster than governance and cost controls can follow.",
    ],
    deliver: [
      "Agent Architecture Design",
      "RAG Platform Engineering",
      "AI Governance Frameworks",
      "AI Security Assessments",
      "Agent Monitoring & Observability",
      "Prompt Security Controls",
      "MCP Architecture Design",
      "Model Evaluation Frameworks",
    ],
    outcome: "Move AI from experimentation to production while keeping visibility, governance, security, and trust.",
    caseStudy: {
      label: "Read the governed GenAI case study",
      to: "/portfolio/enterprise-xdr-agent-windows-endpoint-protection",
    },
  },
  {
    id: "data",
    label: "Data Operations",
    headline: "Most organizations have data. Few have intelligence.",
    subhead: "Decisions still run on fragmented reports and hand-assembled spreadsheets.",
    lead: "Applications generate data, customers create it, systems depend on it  -  yet teams spend more time preparing data than using it. We build data ecosystems that transform information into operational advantage.",
    challenges: [
      "Business decisions rely on inconsistent, contested reporting.",
      "Critical information is scattered across disconnected systems.",
      "Search and analytics break down as data volumes grow.",
      "AI initiatives fail on weak data foundations.",
    ],
    deliver: [
      "Enterprise Search Platforms",
      "Operational Intelligence Systems",
      "Real-Time Analytics",
      "Data Platform Engineering",
      "Streaming Architectures",
      "OpenSearch & Elasticsearch Solutions",
      "Data Governance Frameworks",
      "AI-Ready Data Architectures",
    ],
    outcome: "Build trusted data ecosystems that enable faster decisions, stronger automation, and scalable AI adoption.",
    caseStudy: { label: "Browse data & search work", to: "/portfolio?category=Data" },
  },
  {
    id: "platform",
    label: "Platform Operations",
    headline: "Growth shouldn't create operational chaos.",
    subhead: "What worked for ten engineers often breaks at fifty.",
    lead: "Cloud environments expand, teams grow, applications multiply, and infrastructure complexity rises with them. We build resilient platforms that support growth without increasing operational friction.",
    challenges: [
      "Infrastructure knowledge lives inside a handful of engineers.",
      "Cloud costs keep rising without visibility.",
      "Deployments stay risky, inconsistent, and slow.",
      "Observability gaps delay troubleshooting and recovery.",
    ],
    deliver: [
      "Cloud Architecture Modernization",
      "Platform Engineering",
      "Kubernetes Enablement",
      "Infrastructure Automation",
      "DevSecOps Programs",
      "CI/CD Transformation",
      "Observability Platforms",
      "Cloud Cost Optimization",
    ],
    outcome: "Create scalable foundations that improve reliability, accelerate delivery, and reduce operational overhead.",
    caseStudy: { label: "Browse platform delivery work", to: "/portfolio" },
  },
];

export const SERVICES_WHY = {
  title: "We build systems that have to work in the real world.",
  intro:
    "Many firms deliver presentations. Others deliver prototypes. We help organizations deploy, operate, govern, and continuously improve the systems that become part of everyday business.",
  points: [
    {
      num: "01",
      title: "Security Operations",
      body: "Protecting modern enterprises against evolving threats with intelligence, not just more tooling.",
    },
    {
      num: "02",
      title: "AI Operations",
      body: "Building trustworthy, governable AI ecosystems that survive contact with production.",
    },
    {
      num: "03",
      title: "Data Operations",
      body: "Transforming fragmented information into operational intelligence teams can trust.",
    },
    {
      num: "04",
      title: "Platform Operations",
      body: "Creating resilient foundations for growth, reliability, and faster delivery.",
    },
  ],
} as const;

export const SERVICES_ENGAGEMENT = {
  title: "Flexible expertise. Measurable outcomes.",
  intro:
    "Engage us the way the problem demands  -  from a focused assessment to embedded delivery  -  with success defined in outcomes, not headcount.",
  models: [
    {
      num: "Advisory",
      title: "Advisory",
      body: "Assessments, roadmaps, architecture reviews, and strategic guidance.",
    },
    {
      num: "Build",
      title: "Build",
      body: "Design, implementation, integration, and transformation programs.",
    },
    {
      num: "Operate",
      title: "Operate",
      body: "Managed services, operational support, optimization, and continuous improvement.",
    },
    {
      num: "Augment",
      title: "Augment",
      body: "Embedded specialists supporting critical initiatives and delivery teams.",
    },
  ],
} as const;

export const SERVICES_CLOSING = {
  eyebrow: "The difference",
  title: "Operational excellence doesn't happen by accident.",
  body: "The most successful organizations aren't the ones with the most tools  -  they're the ones that consistently operate complex systems with visibility, governance, and confidence.",
} as const;

export const SERVICES_FAQ_SECTION = {
  title: "Procurement-friendly answers",
  intro: "How we engage, what we own, and what to expect before a statement of work.",
} as const;

export const SERVICES_FAQ = [
  {
    q: "Do you offer staff augmentation or outcome-led delivery?",
    a: "Both. Augment embeds specialists with your team; Advisory, Build, and Operate anchor delivery to agreed KPIs and production milestones rather than open-ended headcount. Scope changes are handled explicitly with visible impact on timeline and risk.",
  },
  {
    q: "Can AiRAT work inside our security and procurement rules?",
    a: "Yes. We routinely work inside bank-grade change windows, vendor security questionnaires, and segmented networks. Bring your non-negotiables to the first call so architecture and access patterns reflect them from day one.",
  },
  {
    q: "How do AI engagements stay governable?",
    a: "We design retrieval boundaries, evaluation harnesses, logging, and human review gates up front so models stay observable and auditable. RAG and agent deployments ship with guardrails appropriate to your data classification  -  not demo prompts frozen in production.",
  },
  {
    q: "Which engagements do you decline?",
    a: "We decline work where success cannot be defined, where shortcuts would compromise safety in regulated environments, or where we cannot put senior engineers on the critical path. We say no early when fit is weak  -  not after months of scoping.",
  },
] as const;
