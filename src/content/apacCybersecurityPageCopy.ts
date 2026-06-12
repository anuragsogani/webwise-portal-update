/** APAC Cybersecurity AI SOC Automation landing page copy */

export const APAC_META_TITLE = "AI SOC Automation for APAC Cybersecurity Service Providers | AiRAT";
export const APAC_META_DESCRIPTION =
  "AiRAT builds AI-powered SOC automation, SIEM/XDR platforms, and evidence layers for MSSPs, MDR providers, and enterprise SOC teams in Singapore, Indonesia, Malaysia, Vietnam, India, and UAE. 2-week sprints. SLO-anchored delivery.";
export const APAC_CANONICAL = "https://airat.in/apac-cybersecurity-ai-soc-automation/";

export const APAC_AI_SUMMARY_LABEL =
  "APAC Cybersecurity AI SOC Automation - AiRAT engineering services for MSSPs, MDR providers, and enterprise SOC teams across Singapore, Indonesia, Malaysia, Vietnam, India, and UAE";

/** SECTION 1: HERO */
export const APAC_HERO = {
  eyebrow: "APAC Cybersecurity · AI Engineering",
  headline: "AI SOC Automation for APAC Cybersecurity Service Providers",
  lead: "AiRAT builds AI-powered triage, evidence layers, and detection workflows inside your existing SIEM and XDR stack - so your analysts work on what matters, not on alert noise.",
  primaryCta: "Book a SOC Automation Diagnostic",
  primaryCtaIntent: "apac-soc-diagnostic",
  secondaryCta: "See how it works",
  secondaryCtaTo: "#apac-offers",
  geoChips: ["Singapore", "Indonesia", "Malaysia", "Vietnam", "India", "UAE", "Australia"],
} as const;

/** SECTION 2: WHO */
export const APAC_WHO = {
  headline: "Built for cybersecurity service providers who can't scale with headcount alone.",
  audiences: [
    {
      label: "MSSPs",
      detail: "Manage multiple clients across APAC without proportionally growing your analyst team. AI triage, automated evidence, and client-level isolation.",
    },
    {
      label: "MDR Providers",
      detail: "Accelerate investigation speed. Replace manual context gathering with AI-generated incident summaries and enriched timelines.",
    },
    {
      label: "SOCaaS Platforms",
      detail: "Scale detection-as-a-service with AI workflows built on your existing tooling - not a greenfield replacement.",
    },
    {
      label: "Enterprise SOC Teams",
      detail: "Reduce tier-one backlog. Route high-confidence automated decisions to playbooks and keep analysts on true positives.",
    },
    {
      label: "Cybersecurity Consultancies",
      detail: "Deliver AI-augmented SOC outcomes to clients faster. AiRAT builds the platform; your team owns the client relationship.",
    },
  ],
} as const;

/** SECTION 3: PAIN POINTS */
export const APAC_PAIN = {
  eyebrow: "The problem we solve",
  headline: "APAC SOC teams face compounding pressures - and most tools make it worse.",
  bullets: [
    {
      pain: "Alert fatigue is structural, not temporary.",
      detail: "Teams receiving 1,000–5,000 daily alerts cannot manually triage them. Staff turnover compounds the backlog.",
    },
    {
      pain: "Evidence is scattered across disconnected tools.",
      detail: "Analysts spend 40–60% of incident time gathering context - logs, threat intel, asset data - not investigating.",
    },
    {
      pain: "Compliance deadlines don't flex.",
      detail: "MAS TRM, OJK POJK 11, and PDPA require demonstrable audit trails. Disconnected systems fail audit review.",
    },
    {
      pain: "MDR margin is under pressure.",
      detail: "As threats grow, service provider margins compress unless the per-analyst efficiency multiplier increases.",
    },
    {
      pain: "AI pilots don't survive production.",
      detail: "LLM demos are easy. AI that runs 24/7 inside a regulated environment with audit logs and fallback logic is not.",
    },
    {
      pain: "SIEM replacement projects fail.",
      detail: "Ripping and replacing SIEM creates 6–18 month gaps in coverage. AiRAT layers AI on top of what you already run.",
    },
  ],
} as const;

/** SECTION 4: WHAT WE BUILD - 6 productized offers */
export const APAC_OFFERS = {
  eyebrow: "What AiRAT builds",
  headline: "Six productized AI workflows - scoped before we start, delivered to SLOs.",
  id: "apac-offers",
  items: [
    {
      name: "SOC AI Triage Engine",
      duration: "3–4 weeks",
      output: "Automated alert scoring, noise suppression, and prioritised incident queue on your existing SIEM/XDR",
      tags: ["SIEM", "XDR", "Splunk", "Sentinel", "Elastic", "Wazuh"],
    },
    {
      name: "Evidence Layer",
      duration: "2–3 weeks",
      output: "Structured incident timelines - logs, asset context, threat intel - pre-assembled for analyst review",
      tags: ["Jira", "ServiceNow", "Teams", "Slack"],
    },
    {
      name: "RAG for Cybersecurity Ops",
      duration: "3–4 weeks",
      output: "Policy, runbook, and compliance Q&A with cited sources - answers in seconds, not days",
      tags: ["OpenSearch", "LLM", "RAG"],
    },
    {
      name: "Alert Noise Sprint",
      duration: "2 weeks",
      output: "Correlation rules, suppression logic, and a before/after noise reduction baseline",
      tags: ["Detection Engineering", "Correlation"],
    },
    {
      name: "Compliance Automation",
      duration: "2–3 weeks",
      output: "Audit-ready evidence packs for MAS TRM, OJK, PDPA - generated, not manually assembled",
      tags: ["MAS TRM", "OJK", "PDPA", "RBI"],
    },
    {
      name: "AI Governance Review",
      duration: "1 week",
      output: "Guardrails, logging boundaries, fallback logic, and human review checkpoints for any AI system in your SOC",
      tags: ["AI Safety", "Governance"],
    },
  ],
} as const;

/** SECTION 5: WHY NOW */
export const APAC_WHY_NOW = {
  headline: "The MDR and MSSP market is growing faster than analyst capacity.",
  points: [
    "Asia-Pacific cybersecurity spend is accelerating under regulatory mandates (MAS TRM, OJK POJK 11, PDPA, India CERT-In).",
    "MDR and SOCaaS providers are winning contracts they cannot deliver at margin without AI-augmented workflows.",
    "SIEM alert volumes are growing 20–30% year-over-year. Analyst hiring is not keeping pace.",
    "LLM-based triage reduces false-positive analyst time by 40–70% in production deployments - the technology is production-ready now.",
  ],
  positioning: {
    headline: "What AiRAT is - and is not.",
    isItems: [
      "Engineering partner that builds AI automation inside your existing SIEM/XDR stack",
      "Specialists in production AI systems - not demo-quality prototypes",
      "Delivery team with live deployments in UAE, India, and APAC",
    ],
    isNotItems: [
      "A generic MSSP or managed service reseller",
      "An endpoint software vendor (not Sophos, CrowdStrike)",
      "A CDN or platform company (not Akamai, Cloudflare)",
      "A compliance SaaS with a black-box model",
    ],
  },
} as const;

/** SECTION 6: PROOF */
export const APAC_PROOF = {
  eyebrow: "Proof from the field",
  headline: "Production deployments - not sandbox experiments.",
  cases: [
    {
      domain: "Security · UAE",
      title: "csoc - Multi-Tenant SIEM/XDR Platform",
      outcomes: ["87% alert noise reduced", "60% faster MTTD", "2,000+ daily alerts handled"],
      body: "A UAE enterprise SOC team processing 2,000+ daily alerts needed automation without replacing their SIEM. AiRAT built a multi-tenant correlation and evidence layer on top of existing infrastructure.",
      relevantFor: "Relevant for: MSSPs · Enterprise SOC teams",
      to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
    },
    {
      domain: "AI · FinTech · India",
      title: "Enterprise XDR Agent - Autonomous Threat Response",
      outcomes: ["99.95% uptime over 14 months", "Millisecond remediation", "Audit-ready logs"],
      body: "A FinTech needed threat response that didn't wait for human approval on high-confidence verdicts. The XDR Agent reasons, correlates, and acts - with full audit trails.",
      relevantFor: "Relevant for: MDR providers · SOCaaS platforms",
      to: "/portfolio/enterprise-xdr-agent-windows-endpoint-protection",
    },
    {
      domain: "AI · Compliance",
      title: "SOCAI Compliance Bot - RAG for Policy Q&A",
      outcomes: ["40s vs 3 days compliance queries", "Policy citations in every answer", "Audit-ready outputs"],
      body: "Compliance questions that took three days of manual research now take 40 seconds with cited policy clauses. No hallucination - every answer cites the source document.",
      relevantFor: "Relevant for: Compliance teams · Regulated enterprises",
      to: "/portfolio",
    },
  ],
} as const;

/** SECTION 7: ENGAGEMENT MODEL */
export const APAC_ENGAGEMENT = {
  eyebrow: "How a diagnostic works",
  headline: "30-minute SOC Automation Diagnostic - free, structured, useful.",
  steps: [
    { n: "01", step: "You describe your alert volume, SIEM stack, and biggest workflow bottleneck" },
    { n: "02", step: "We map your current triage process and identify the top 2–3 automation leverage points" },
    { n: "03", step: "We outline which of the 6 productized workflows fits your environment and team size" },
    { n: "04", step: "We agree on a scoped 2-week pilot or assessment - with defined outputs before we start" },
    { n: "05", step: "NDA available before any technical discussion. We respect data residency constraints" },
    { n: "06", step: "No pitch deck. You leave with a concrete improvement map even if we don't work together" },
  ],
  note: "Timezone: APAC overlap available (SG / HK / MY / ID / IN timezones). Remote or in-person for Singapore and India.",
} as const;

/** SECTION 8: FINAL CTA */
export const APAC_FINAL_CTA = {
  headline: "Book a 1:1 SOC Automation Diagnostic",
  lead: "30 minutes. Bring your SIEM, XDR, or alert triage bottleneck. We'll map the automation leverage points - no contract required.",
  primaryCta: "Book the diagnostic",
  primaryCtaIntent: "apac-soc-diagnostic",
  secondaryCta: "Contact us instead",
  secondaryCtaTo: "/contact?intent=apac-soc&region=apac",
  trust: ["NDA-friendly", "APAC timezones covered", "On-prem · VPC · Hybrid delivery", "No black-box AI"],
} as const;

/** FAQ */
export const APAC_FAQ = [
  {
    q: "Which SIEM and XDR platforms does AiRAT support for SOC automation?",
    a: "AiRAT builds AI workflows on top of Splunk, Microsoft Sentinel, Elastic SIEM, Wazuh, IBM QRadar, and custom log pipelines. We do not require a SIEM replacement - we augment what you run today.",
  },
  {
    q: "How does AiRAT's AI SOC automation differ from an MSSP or a SIEM vendor?",
    a: "AiRAT is an engineering partner, not a managed service reseller or software vendor. We build custom AI triage, evidence, and compliance workflows inside your infrastructure - your team owns and operates what we deliver.",
  },
  {
    q: "What does a 2-week alert noise sprint actually deliver?",
    a: "The sprint delivers: correlation rules for your top alert types, suppression logic reducing false-positive volume, and a before/after noise baseline with percentage reduction. You receive the rules, documentation, and metrics - not just a report.",
  },
  {
    q: "Can AiRAT comply with MAS TRM, OJK, PDPA, and RBI data residency requirements?",
    a: "Yes. AiRAT designs systems with data residency built in - on-premises, VPC-isolated, or hybrid. We are experienced with MAS TRM (Singapore), OJK POJK 11 (Indonesia), India CERT-In, and UAE data localization requirements.",
  },
  {
    q: "How long does a full SOC automation platform take to deliver?",
    a: "A scoped engagement starts with a 1-week assessment. Individual sprints (triage engine, evidence layer, RAG) run 2–4 weeks each. A full SOC automation platform across multiple workflows typically delivers in 8–14 weeks with agreed SLO acceptance criteria.",
  },
  {
    q: "What is RAG for cybersecurity operations and why does it matter?",
    a: "RAG (Retrieval-Augmented Generation) for cybersecurity lets analysts ask natural-language questions of your policies, runbooks, and incident history - and receive answers citing exact source documents. This reduces policy lookup time from hours to seconds and eliminates hallucination by grounding responses in your actual documentation.",
  },
] as const;

export type ApacFaq = typeof APAC_FAQ[number];
