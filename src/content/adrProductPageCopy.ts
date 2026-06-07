export const ADR_PRODUCT_SEO = {
  title: "Agent Detection & Response (ADR) | Agent Security & Governance | AiRAT",
  description:
    "Secure every agent. Govern every decision. Continuous visibility, threat detection, and response for AI agents, MCP servers, autonomous workflows, copilots, and RAG systems.",
} as const;

export const ADR_HERO = {
  eyebrow: "Agent Detection & Response (ADR)",
  title: "Secure Every Agent. Govern Every Decision.",
  lead:
    "As organizations deploy AI agents, MCP servers, autonomous workflows, RAG systems, and enterprise copilots, a new attack surface emerges. Traditional security tools were never designed to understand agent behavior, prompt interactions, tool usage, model communications, or autonomous decision making.",
  sublead:
    "Who is monitoring the agents? ADR provides continuous visibility, governance, threat detection, and response capabilities for the entire AI workforce.",
  tagline: "Monitor. Govern. Detect. Respond.",
  primaryCta: { label: "Request Demo", to: "/contact?intent=adr-demo" },
  secondaryCta: { label: "Talk to a Security Expert", to: "/contact?intent=adr-expert" },
} as const;

export const ADR_METRICS = [
  {
    label: "Visibility Domains",
    detail: "Agents, workflows, MCP, copilots, RAG & models",
    counter: { target: 8, suffix: "+" },
    fallback: "8+",
  },
  {
    label: "Monitoring",
    detail: "Continuous agent activity & decision paths",
    counter: { target: 24, suffix: "\u00d77" },
    fallback: "24\u00d77",
  },
  {
    label: "Threat Classes",
    detail: "Prompt injection, misuse, escalation & more",
    fallback: "Full Spectrum",
  },
  {
    label: "Response Actions",
    detail: "Isolation, suspension, revocation & escalation",
    fallback: "Automated + Analyst",
  },
] as const;

export const ADR_SCROLL_ONE = {
  eyebrow: "Complete AI workforce visibility",
  title: "Understand what every agent is doing",
  lead:
    "Monitor agent activity, tool usage, external communications, model interactions, workflows, and decision paths from a centralized security platform.",
  visibilityGroups: [
    {
      category: "Agentic systems",
      tools: ["AI Agents", "Autonomous Workflows", "Agentic Applications", "Enterprise Copilots"],
    },
    {
      category: "Integration layer",
      tools: ["MCP Servers", "RAG Systems", "Tool Protocols", "API Gateways"],
    },
    {
      category: "Model infrastructure",
      tools: ["Local AI Models", "Cloud AI Services", "Model Endpoints", "Embedding Pipelines"],
    },
  ],
  visual: {
    src: "/images/duna-style/feature-ai-agent-capabilities.svg",
    alt: "Diagram showing AI agent capabilities connected to tools, models, workflows, and external services under centralized monitoring",
    width: 1200,
    height: 675,
  },
} as const;

export const ADR_SCROLL_TWO = {
  threatDetection: {
    eyebrow: "AI threat detection",
    title: "Security operations for the AI era",
    contrast: "Traditional SOC platforms monitor users, endpoints, and infrastructure. ADR monitors agents.",
    lead:
      "Detect prompt injection, agent misuse, unauthorized tool access, and suspicious autonomous behavior before small issues become major incidents.",
    capabilities: [
      { title: "Prompt Injection Attacks", body: "Identify adversarial inputs targeting agent reasoning and tool selection." },
      { title: "Agent Misuse & Escalation", body: "Catch agents exceeding scope, privilege, or approved workflow boundaries." },
      { title: "Unauthorized Tool Access", body: "Alert when agents invoke tools, APIs, or resources outside policy." },
      { title: "Sensitive Data Access", body: "Monitor exfiltration attempts through prompts, outputs, and tool responses." },
      { title: "Workflow Manipulation", body: "Detect tampering with autonomous decision paths and orchestration logic." },
    ],
    visual: {
      src: "/images/duna-style/feature-security-detection-matrix.svg",
      alt: "Threat detection matrix highlighting prompt injection, agent misuse, tool access violations, and workflow manipulation events",
      width: 1200,
      height: 675,
    },
  },
  promptSecurity: {
    eyebrow: "Prompt & interaction security",
    title: "Monitor inputs. Validate outputs.",
    lead: "Detect suspicious interactions before they become incidents. ADR continuously evaluates prompts, responses, tool calls, and agent actions for potential security risks.",
    controls: [
      "Prompt Injection Detection",
      "Data Exposure Prevention",
      "Sensitive Information Monitoring",
      "Unsafe Instruction Detection",
      "Context Manipulation Detection",
      "Agent Abuse Monitoring",
      "Model Interaction Analysis",
      "Output Validation",
    ],
  },
  governance: {
    eyebrow: "Agent governance & compliance",
    title: "Keep agents within defined boundaries",
    lead:
      "Every agent should have a purpose. Define responsibilities, operational boundaries, allowed actions, approved tools, and access permissions. When agents exceed their scope, ADR immediately detects and reports the activity.",
    controls: [
      "Agent Role Definitions",
      "Task Scope Enforcement",
      "Tool Access Controls",
      "Workflow Governance",
      "Operational Policies",
      "Risk-Based Controls",
      "Compliance Monitoring",
      "Audit Trails",
    ],
    result: "Every agent action is evaluated against defined policy before it reaches production systems or sensitive data.",
  },
  runtime: {
    eyebrow: "Agent runtime protection",
    title: "Security controls embedded into operations",
    lead:
      "A lightweight monitoring layer continuously observes agent communications and activities while minimizing performance impact. Intelligent classification ensures security validation occurs only when necessary.",
    modes: [
      { title: "Intent Classification", body: "Understand what an agent is trying to accomplish before it acts." },
      { title: "Behavioral Analysis", body: "Baseline normal agent patterns and flag anomalous decision paths." },
      { title: "Risk-Based Inspection", body: "Apply deep validation only when activity crosses risk thresholds." },
      { title: "Policy Enforcement", body: "Block, quarantine, or escalate based on real-time governance rules." },
    ],
    capabilities: [
      "Real-Time Monitoring",
      "Adaptive Security Controls",
      "Low-Latency Operations",
      "Continuous Validation",
    ],
    capabilitiesHeading: "Always-on protection",
  },
} as const;

export const ADR_SCROLL_THREE = {
  ecosystem: {
    eyebrow: "AI ecosystem monitoring",
    title: "Visibility across the entire AI stack",
    lead: "Monitor how AI services, models, tools, infrastructure, and workflows interact across the organization.",
    sources: [
      "Model Usage",
      "Agent Activity",
      "Tool Invocation",
      "External Connections",
      "API Interactions",
      "Workflow Execution",
      "Resource Consumption",
      "Security Events",
    ],
    result: "See how every component in your AI stack connects — and where risk concentrates.",
  },
  response: {
    eyebrow: "Agent response center",
    title: "Act before small issues become major incidents",
    lead: "When suspicious activity is detected, ADR provides automated and analyst-driven response options.",
    actions: [
      "Agent Isolation",
      "Workflow Suspension",
      "Tool Access Revocation",
      "Policy Enforcement",
      "Investigation Triggers",
      "Incident Escalation",
      "Automated Containment",
      "Audit Preservation",
    ],
  },
  dashboard: {
    eyebrow: "AI security operations dashboard",
    title: "Complete control over your AI workforce",
    lead: "Manage security, governance, compliance, investigations, and operational intelligence through a single interface.",
    highlights: [
      "Agent Risk Scores",
      "Active Agents",
      "Policy Violations",
      "Prompt Security Events",
      "Threat Activity",
      "Workflow Health",
      "Compliance Status",
      "Response Actions",
    ],
    visual: {
      src: "/images/duna-style/feature-ai-compliance-dashboard.svg",
      alt: "AI security operations dashboard showing agent risk scores, policy violations, prompt security events, and response actions",
      width: 1200,
      height: 675,
    },
  },
  why: {
    eyebrow: "Why organizations choose ADR",
    title: "Govern AI adoption safely",
    items: [
      { title: "Deploy Agents with Confidence", body: "Reduce AI security risk before agents reach production workloads." },
      { title: "Detect Threats Early", body: "Catch prompt injection, misuse, and escalation before operations are impacted." },
      { title: "Maintain Compliance", body: "Track every decision, interaction, and tool invocation with audit-ready trails." },
      { title: "Control Agent Behavior", body: "Ensure agents remain within approved boundaries and operational policies." },
      { title: "Improve Operational Trust", body: "Provide visibility into autonomous systems your teams and auditors can rely on." },
      { title: "Secure the Future Workforce", body: "Protect human and AI collaboration at scale as agent adoption accelerates." },
    ],
  },
  cta: {
    title: "The future workforce requires a new security model",
    lead: "Endpoints have EDR. Clouds have CSPM. AI agents need ADR.",
    subtitle: "Secure every agent. Govern every decision.",
    primary: { label: "Request Demo", to: "/contact?intent=adr-demo" },
    secondary: { label: "Talk to a Security Expert", to: "/contact?intent=adr-expert" },
  },
} as const;
