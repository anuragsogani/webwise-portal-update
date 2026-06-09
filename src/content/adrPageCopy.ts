/** Agent Detection & Response — detail page copy (AiRAT-owned).
 *  Security for the AI workforce: agents, MCP servers, copilots, RAG and
 *  autonomous workflows. */

export const ADR_SEO = {
  title: "Agent Detection & Response (ADR) | AiRAT",
  description:
    "Security for the AI workforce: discover every agent, MCP server, copilot and autonomous workflow, govern every tool call, detect prompt injection and data exfiltration at runtime, and contain rogue agents — streamed into the CSOC.",
} as const;

export const ADR_HERO = {
  badge: "Agent Detection & Response · security for the AI workforce",
  keywords: ["Discover", "Govern", "Detect", "Respond"],
  headline: "Every agent. Every decision. Under control.",
  body: "AI agents, MCP servers, copilots, and autonomous workflows now act inside your business — calling tools, touching data, making decisions. ADR gives you full visibility, policy governance, runtime detection, and response built for how agents actually behave.",
  capabilities: [
    "AI workforce inventory",
    "Prompt & interaction security",
    "Tool-call governance",
    "Policy & boundary enforcement",
    "Runtime behaviour detection",
    "Data-exfiltration & output controls",
    "Automated & analyst response",
    "Full decision audit trails",
  ],
  metrics: [
    { value: "agents · MCP", label: "copilots · RAG · workflows" },
    { value: "every", label: "tool call inspected" },
    { value: "policy", label: "enforced at runtime" },
  ],
  nodes: ["Agents", "MCP servers", "Copilots", "RAG", "Workflows", "Models"],
} as const;

export const ADR_WATCH = {
  eyebrow: "Runtime detection",
  title: "Watch every prompt, reasoning step, and tool call.",
  body: "ADR inspects what agents actually do at runtime — the prompts in, the reasoning, the tools and APIs they invoke, the data they return — and flags prompt injection, jailbreaks, data exfiltration, and risky tool use the moment it happens.",
  capabilities: [
    "Prompt-injection & jailbreak detection",
    "Sensitive data & PII in prompts/outputs",
    "Anomalous tool & API use",
    "Excessive permission & access attempts",
    "Model, latency & cost anomalies",
    "Real-time alerting to the core",
  ],
  outcome: "Catch the misuse a chat log would never show you.",
} as const;

export const ADR_GOVERN = {
  eyebrow: "Governance",
  title: "Every tool call passes through policy.",
  body: "Define what each agent is allowed to do — which tools, which data, which systems, under which conditions — and ADR enforces it inline. Risky calls are blocked or routed for human approval, and every decision is logged.",
  capabilities: [
    "Allowed-tool & scope policies",
    "Data & system boundaries",
    "Human-in-the-loop approvals",
    "Non-human identity & secrets",
    "Rate & cost guardrails",
    "Immutable decision logs",
  ],
  outcome: "Autonomy with guardrails — agents do their job, and nothing more.",
} as const;

export const ADR_RESPOND = {
  eyebrow: "Active response",
  title: "Contain a rogue agent in one move.",
  body: "When an agent misbehaves, shut it down instantly — suspend the agent, revoke its tokens, isolate the workflow, kill the live session — automatically or with an admin gate, and fully audited.",
  capabilities: [
    "Suspend or sandbox an agent",
    "Revoke tokens & access",
    "Isolate the workflow",
    "Kill the live session",
    "Rotate exposed secrets",
    "Full forensic audit trail",
  ],
} as const;

export const ADR_CORE_LINK = {
  eyebrow: "Part of the platform",
  title: "Agent risk, correlated in the CSOC core.",
  body: "Agent telemetry, policy decisions, and incidents stream into the Autonomous CSOC — so a suspicious tool call lines up with the endpoint, cloud, and identity signals around it, and the whole story is investigated in one place.",
} as const;

export const ADR_CTA = {
  title: "Put your AI workforce under control.",
  body: "Bring your agents, copilots, and workflows. We'll show live decision inspection, tool-call governance, and one-move containment — and how it lights up the CSOC core.",
  cta: "Book a strategy call",
  ctaTo: "/contact",
} as const;
