/** Cloud Security & Governance Platform — detail page copy (AiRAT-owned).
 *  Comprehensive multi-cloud security scanning, prioritization, governance &
 *  cost. Backend tooling is never named. */

export const CSPM_SEO = {
  title: "Cloud Security & Governance Platform | AiRAT",
  description:
    "Continuous, multi-cloud security: posture management, identity & least-privilege, IaC and DevSecOps scanning, attack-surface exposure, compliance mapping, and cost intelligence — with findings ranked by real risk and streamed into the CSOC.",
} as const;

export const CSPM_HERO = {
  badge: "Cloud Security & Governance · continuous, multi-cloud",
  keywords: ["Scan", "Prioritize", "Remediate", "Govern"],
  headline: "Every cloud. Continuously secured.",
  body: "One platform scans every account, identity, workload, and line of infrastructure-as-code across your clouds — surfaces what is actually exploitable, ranks it by real risk, and proves compliance, continuously.",
  capabilities: [
    "Multi-cloud posture (CSPM)",
    "Identity & least-privilege (CIEM)",
    "IaC & DevSecOps scanning",
    "Attack-surface & exposure",
    "Misconfiguration detection",
    "Compliance mapping",
    "Cloud cost intelligence",
    "Continuous monitoring",
  ],
  metrics: [
    { value: "6 clouds", label: "AWS · Azure · GCP · K8s · OCI · M365" },
    { value: "1,000+", label: "automated security checks" },
    { value: "25+", label: "compliance frameworks" },
  ],
  clouds: ["AWS", "Azure", "GCP", "K8s", "OCI", "M365"],
} as const;

export const CSPM_POSTURE = {
  eyebrow: "Continuous posture",
  title: "Hundreds of checks, running around the clock.",
  body: "Every resource is evaluated against thousands of security rules the moment it changes — exposed storage, weak encryption, open ports, risky permissions, missing logging — not at the next quarterly scan.",
  capabilities: [
    "Misconfiguration detection",
    "Exposed data & public storage",
    "Encryption & key hygiene",
    "Network exposure & open ports",
    "Logging & monitoring gaps",
    "Drift from secure baselines",
    "Secrets & credential exposure",
    "Real-time alerting to the core",
  ],
  outcome: "Risk surfaces the moment it appears — not three months later in an audit.",
} as const;

export const CSPM_PRIORITIZE = {
  eyebrow: "Prioritized findings",
  title: "Fix what is actually exploitable first.",
  body: "Findings are ranked by exploitability and blast radius — not raw counts — so your team works the handful that truly matter instead of drowning in a four-thousand-row report. Each comes with the exact remediation step.",
  capabilities: [
    "Exploitability-based risk scoring",
    "Attack-path & blast-radius context",
    "De-duplicated, owner-routed findings",
    "Step-by-step remediation guidance",
  ],
  outcome: "From thousands of raw findings to the few that change your risk today.",
} as const;

export const CSPM_IDENTITY = {
  eyebrow: "Identity & shift-left",
  title: "Catch risk before it ships — and rein in identity sprawl.",
  body: "Scan infrastructure-as-code in the pipeline so misconfigurations never reach production, and map every identity's effective permissions to enforce least privilege across the estate.",
  capabilities: [
    "IaC scanning before deploy",
    "DevSecOps pipeline gates",
    "Effective-permission analysis (CIEM)",
    "Over-privileged & dormant identities",
    "Secrets detection in code",
    "Least-privilege recommendations",
  ],
} as const;

export const CSPM_COMPLIANCE = {
  eyebrow: "Compliance & cost",
  title: "Audit-ready, and cost-aware.",
  body: "One scan maps your posture to the frameworks your auditors expect, and the same telemetry surfaces idle and oversized resources — so security and spend are governed together.",
  frameworks: ["CIS", "NIST", "PCI-DSS", "ISO 27001", "SOC 2", "GDPR", "HIPAA", "FedRAMP"],
  costNote: "Idle resources, oversized instances, and orphaned storage surfaced alongside risk — with savings estimates.",
} as const;

export const CSPM_CORE_LINK = {
  eyebrow: "Part of the platform",
  title: "Cloud risk, correlated in the CSOC core.",
  body: "Posture findings, identity exposure, and exploitable attack paths stream into the Autonomous CSOC — correlated with endpoint, agent, and identity signals so a cloud misconfiguration and an endpoint alert read as one story.",
} as const;

export const CSPM_CTA = {
  title: "See your clouds through one lens.",
  body: "Bring your accounts and frameworks. We'll show live posture scanning, exploitability-ranked findings, and compliance mapping across every cloud — and how it lights up the CSOC core.",
  cta: "Book a strategy call",
  ctaTo: "/contact",
} as const;
