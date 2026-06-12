/** /for-mssps/ buyer page copy */

export const MSSP_META_TITLE = "AI SOC Automation for MSSPs - Scale Without Linear Headcount | AiRAT";
export const MSSP_META_DESCRIPTION =
  "AiRAT builds AI-powered alert triage, evidence layers, and detection workflows for MSSPs in APAC. Deliver more to more clients without proportionally growing your analyst team. 2-week sprints. SLO-anchored.";
export const MSSP_CANONICAL = "https://airat.in/for-mssps/";

export const MSSP_AI_SUMMARY_LABEL =
  "AiRAT for MSSPs - AI SOC automation engineering for managed security service providers in APAC who need to scale delivery without linear analyst headcount";

export const MSSP_HERO = {
  eyebrow: "Built for MSSPs",
  headline: "Deliver more SOC outcomes to more clients - without proportionally growing your team.",
  lead: "AiRAT builds AI triage, evidence workflows, and detection automation inside your existing SIEM and XDR stack. Your analysts focus on decisions; AI handles the volume.",
  primaryCta: "Map your alert workflow",
  primaryCtaIntent: "mssp-workflow-mapping",
  secondaryCta: "See case studies",
  secondaryCtaTo: "/portfolio",
} as const;

export const MSSP_PAINS = [
  {
    pain: "Alert volume grows with every new client - headcount can't keep pace.",
    detail: "Tier-one triage is linear work: more clients means more alerts, more analysts, compressed margins.",
  },
  {
    pain: "Evidence gathering eats 40–60% of analyst time.",
    detail: "Context assembly - logs, threat intel, asset data, previous incidents - takes longer than the investigation itself.",
  },
  {
    pain: "Multi-tenant SIEM is complex to operate at scale.",
    detail: "Keeping client data isolated while enabling cross-client detection patterns requires custom tooling, not off-the-shelf SIEM config.",
  },
] as const;

export const MSSP_PROOF = {
  headline: "One MSSP. 87% alert noise reduction.",
  detail: "A UAE-based enterprise SOC - operating like a managed service - was processing 2,000+ daily alerts with three analysts. AiRAT built a multi-tenant correlation and AI triage layer on their existing SIEM. Alert noise dropped 87%. MTTD improved 60%. The team scaled client coverage without adding headcount.",
  outcomes: ["87% alert noise reduced", "60% faster MTTD", "3 analysts · 2,000+ daily alerts managed"],
  to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
} as const;

export const MSSP_OFFER = {
  name: "MSSP SOC Automation Engagement",
  steps: [
    { n: "01", label: "Alert workflow mapping", detail: "30-min diagnostic - we map your top alert types, triage steps, and bottlenecks." },
    { n: "02", label: "2-week noise sprint", detail: "Correlation rules + suppression logic. You get the before/after baseline." },
    { n: "03", label: "AI triage layer build", detail: "3–4 weeks. Automated scoring + prioritised queue on your current SIEM/XDR." },
    { n: "04", label: "Evidence layer (optional)", detail: "2–3 weeks. Pre-assembled incident context - logs, asset, threat intel - in one view." },
  ],
} as const;

export const MSSP_FAQ = [
  {
    q: "Does AiRAT build on top of existing SIEM and XDR, or does it replace them?",
    a: "AiRAT builds AI automation layers on top of your existing SIEM and XDR. We do not require ripping and replacing - we augment Splunk, Sentinel, Elastic, Wazuh, and QRadar with AI triage and evidence workflows.",
  },
  {
    q: "How does multi-tenancy work for MSSP environments?",
    a: "AiRAT designs multi-tenant isolation from the start - each client's data, alerts, and detection patterns remain isolated while AiRAT's correlation layer can identify cross-pattern threats. We have built multi-tenant SIEM platforms for enterprise SOC environments in the UAE.",
  },
  {
    q: "What is included in the 2-week alert noise sprint for MSSPs?",
    a: "The sprint delivers: correlation rules for your top alert types across clients, suppression logic reducing false-positive volume, a before/after noise baseline with percentage reduction, and documentation. You receive the rules and metrics - not just a report.",
  },
  {
    q: "Can AiRAT work with APAC data residency and compliance requirements for MSSP clients?",
    a: "Yes. AiRAT designs systems with data residency built in - on-premises, VPC-isolated, or hybrid. We are experienced with MAS TRM (Singapore), OJK (Indonesia), India CERT-In, and UAE data localization requirements that affect MSSP client data handling.",
  },
] as const;
