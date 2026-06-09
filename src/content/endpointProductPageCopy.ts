/** Endpoint Operations & Security Platform — detail page copy (AiRAT-owned).
 *  One agent, every job. Backend tooling is never named. */

export const ENDPOINT_SEO = {
  title: "Endpoint Operations & Security Platform | AiRAT",
  description:
    "One lightweight agent for every endpoint: live discovery and OS query, file integrity monitoring, security telemetry, vulnerability detection, configurable active response, mass deployment, and zero-trust comms — admin-only, and wired into the CSOC core.",
} as const;

export const ENDPOINT_HERO = {
  badge: "Endpoint Operations & Security · one agent, every job",
  keywords: ["Discover", "Secure", "Automate", "Respond"],
  headline: "One agent. Every endpoint. Complete operational control.",
  body: "A single lightweight agent discovers, secures, patches, and responds across your entire fleet — queried live, governed by admins only, and streaming every signal into the CSOC in real time.",
  capabilities: [
    "Live discovery & OS query",
    "File integrity monitoring",
    "Security telemetry & log analytics",
    "Vulnerability detection",
    "Configurable active response",
    "Software & patch automation",
    "Privileged remote operations",
    "Zero-trust comms (mTLS)",
  ],
  metrics: [
    { value: "1 agent", label: "every capability" },
    { value: "< 1s", label: "live fleet query" },
    { value: "admin-only", label: "secured access" },
  ],
} as const;

export const ENDPOINT_AGENT = {
  eyebrow: "The agent",
  title: "One agent that sees, secures, and acts.",
  body: "Deploy a single agent to every device and it does the whole job — continuous telemetry, integrity and vulnerability checks, live questioning, patching, privileged operations, and automated response. No stacking five tools per endpoint. Every action is admin-gated and verified end-to-end, and every signal lands in the CSOC core.",
  nodes: [
    "Live query",
    "Integrity",
    "Telemetry",
    "Response",
    "Patching",
    "Remote ops",
  ],
} as const;

export const ENDPOINT_LIVE = {
  eyebrow: "Live discovery",
  title: "Ask your entire fleet a question. Get answers in seconds.",
  body: "Query any state on any device — live, on demand — instead of waiting for overnight scans. Running processes, installed versions, open ports, persistence, vulnerable packages: ask once, answer across thousands of endpoints in under a second.",
  capabilities: [
    "Running processes & services",
    "Installed software & versions",
    "Open ports & live connections",
    "Logged-in & privileged users",
    "Registry & configuration state",
    "Vulnerable & out-of-date packages",
    "Persistence & autoruns",
    "File presence & hashes",
  ],
  outcome: "Hunt, investigate, and prove fleet state on demand — no scan windows, no blind spots.",
} as const;

export const ENDPOINT_PROTECT = {
  eyebrow: "Continuous protection",
  title: "Deep, always-on endpoint security.",
  body: "The agent watches what matters and raises high-fidelity signal the moment something changes — file integrity, security events, vulnerabilities, anomalies, and configuration drift — all mapped to the frameworks your auditors expect.",
  capabilities: [
    "File integrity monitoring (FIM)",
    "Security event & log analytics",
    "Vulnerability detection",
    "Rootkit & anomaly detection",
    "Malware & IOC matching",
    "Security configuration assessment",
    "Compliance monitoring (PCI · GDPR · HIPAA)",
    "Real-time alerting to the core",
  ],
  outcome: "Tamper, drift, and compromise surface in real time — not at the next audit.",
} as const;

export const ENDPOINT_RESPOND = {
  eyebrow: "Active response",
  title: "Contain threats the moment they appear — on your rules.",
  body: "Define exactly what happens when a detection fires. Isolate a host, kill a process, quarantine a file, disable an account, force a patch, or run a custom script — automatically or with an admin gate, always logged. Active response is configured in minutes, not engineering sprints.",
  capabilities: [
    "Isolate a compromised endpoint",
    "Kill malicious processes",
    "Quarantine files",
    "Disable compromised accounts",
    "Block network connections",
    "Force patch or rollback",
    "Custom response scripts",
    "Human approval & full audit",
  ],
  outcome: "Mean time to contain measured in seconds — every action approved and audited.",
} as const;

export const ENDPOINT_SCALE = {
  eyebrow: "Operations at scale",
  title: "Stand up the whole fleet in one move.",
  body: "Mass-deploy the agent, push patches and configuration, and run privileged operations across thousands of systems from one console — without direct device access. Every command is role-gated, encrypted, and reversible.",
  capabilities: [
    "Mass agent deployment",
    "OS & application patch automation",
    "Privileged remote operations",
    "Configuration enforcement",
    "Role-based admin access (RBAC)",
    "Zero-trust mTLS communications",
    "Deployment compliance tracking",
    "Rollback & recovery",
  ],
  outcome: "Operate thousands of systems from a single secured console — zero direct access.",
} as const;

export const ENDPOINT_CORE_LINK = {
  eyebrow: "Part of the platform",
  title: "Every endpoint signal flows into the CSOC core.",
  body: "Discovery, integrity, telemetry, and response stream into the Autonomous CSOC in real time — so endpoint risk is correlated with cloud, identity, and agent signals in one picture, not a separate console.",
} as const;

export const ENDPOINT_CTA = {
  title: "See the agent run on your fleet.",
  body: "Bring your fleet size and tooling. We'll show live discovery, file integrity monitoring, and configurable active response from one secured console — and how it lights up the CSOC core.",
  cta: "Book a strategy call",
  ctaTo: "/contact",
} as const;
