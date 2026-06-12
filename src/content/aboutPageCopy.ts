export const ABOUT_SEO = {
  title: "About AiRAT | Senior-Led Engineering for Security, AI & Data",
  description:
    "Senior-led engineering for security, AI, and data platforms. AiRAT takes regulated enterprises from brief to go-live with the same delivery team.",
} as const;

export const ABOUT_HERO = {
  badge: "Enterprise security & AI · UAE · India · Singapore · Europe · Australia · US",
  headline: "Four years. Thirteen production systems. The same engineers from brief to go-live.",
  body: "AiRAT is a senior-led engineering firm. We ship production security, AI, and data systems where KPIs are agreed before heavy build, the same engineers stay through go-live, and your team can run the platform the week after we leave.",
  primaryCta: { label: "Explore services", to: "/services" },
  secondaryCta: { label: "Contact us", to: "/contact" },
} as const;

/** Three-chapter spine - who / how / proof */
export const ABOUT_NARRATIVE_SPINE = {
  eyebrow: "Three things worth knowing early",
  title: "Who we're for. How we work. What proof looks like here.",
  chapters: [
    {
      title: "Who we're for",
      body: "CISOs, CTOs, and programme sponsors who own uptime, audits, and AI roadmaps - and need a partner who can speak board risk and production architecture in the same meeting.",
    },
    {
      title: "How we work",
      body: "Senior-led squads embedded with your team. Shared definitions of done. KPIs tied to incidents avoided, time returned, and systems still running a year later. The same engineers on the hook after go-live - not a handoff deck.",
    },
    {
      title: "What counts as proof",
      body: "Running platforms, SLO language agreed before heavy build, and portfolio-backed metrics you can defend in procurement. If we are not a fit, we say so early - not after six months of discovery.",
    },
  ],
} as const;

export const ABOUT_TRUST_STATS = [
  { value: "4+", label: "Years shipping production systems" },
  { value: "10+", label: "Senior engineers on delivery" },
  { value: "13+", label: "Enterprise programmes delivered" },
  { value: "20+", label: "Strategic partner relationships" },
] as const;

export const ABOUT_PARTNERS = {
  headline: "Fewer clients. Deeper accountability.",
  paragraphs: [
    "Most vendors optimise for billable hours. AiRAT optimises for the story you can tell procurement after go-live: MTTR down, alert noise down, revenue paths unblocked.",
    "We work across banking, FinTech, crypto, healthcare, energy, HR tech, and e-commerce - environments where regulation, uptime, and data gravity make shortcuts expensive.",
    "We do not chase volume. We pursue engagements where the same senior team that designs the architecture is still on the hook when it runs in production.",
  ],
  points: [
    {
      title: "Senior-led throughout",
      body: "The engineer who reviews your architecture brief is the same one deploying to production. No bait-and-switch after the statement of work is signed.",
    },
    {
      title: "Embedded, not visiting",
      body: "We join your standups, use your tools, and write acceptance criteria against your definition of done - not a generic delivery checklist detached from your codebase.",
    },
    {
      title: "KPI-anchored delivery",
      body: "Before heavy build begins, we align on three to five metrics you can defend to your board: alert reduction, MTTD, search latency, uptime SLOs, or time-to-production for AI features.",
    },
    {
      title: "Built to be owned",
      body: "Runbooks, ownership boundaries, and onboarding docs ship with the platform. Your team runs it independently after we leave - not because they remember a conversation.",
    },
  ],
} as const;

export type TeamDoodlePreset = "aiml" | "cyber" | "elk" | "data" | "db" | "backend" | "frontend" | "devops";

export const ABOUT_TEAM_ROLES = [
  {
    role: "AI/ML Engineers",
    description:
      "RAG pipelines, fine-tuned LLMs, and production evaluation harnesses. Models stay observable and auditable - not frozen demo prompts that break on the first real query.",
    proof: "Enterprise RAG System",
    proofTo: "/portfolio/rag-document-retrieval-system",
    doodlePreset: "aiml" as const,
  },
  {
    role: "Cybersecurity Engineers",
    description:
      "Enterprise XDR, SIEM, and Zero Trust architectures across on-prem and cloud. Detection and evidence trails designed in - not bolted on at audit time.",
    proof: "csoc XDR Platform",
    proofTo: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
    doodlePreset: "cyber" as const,
  },
  {
    role: "Data Engineers",
    description:
      "Medallion data lakes and real-time streaming pipelines where finance and product work from the same numbers. Bronze/Silver/Gold governance survives the first real audit.",
    proof: "Medallion Data Lake (Tier-1 pension fund, Asia)",
    proofTo: "/portfolio",
    doodlePreset: "data" as const,
  },
  {
    role: "Platform & DevOps",
    description:
      "CI/CD pipelines, Kubernetes clusters, and compliance-as-code so releases are auditable and rollbacks are rehearsed before they are needed.",
    proof: "OpenSearch E-Commerce Platform",
    proofTo: "/portfolio/msazn-opensearch-ecommerce-search-uae",
    doodlePreset: "devops" as const,
  },
] as const;

/** Proof band on About */
export const ABOUT_PROOF_SECTION = {
  eyebrow: "Proof",
  title: "Case studies",
  lead: "Named references below. Full problem → approach → outcome narratives sit in the portfolio.",
  ctaLabel: "Read case studies",
  ctaTo: "/portfolio",
} as const;

export type ClientMarqueeItem = {
  readonly name: string;
  /** On-site mark from `/public/clients_logos/` (preferred over remote favicons) */
  readonly logoSrc?: string;
  /** Wide horizontal marks need a larger marquee slot (e.g. wordmark logos) */
  readonly logoWide?: boolean;
  /** Keep brand colors instead of monochrome treatment */
  readonly logoColor?: boolean;
  readonly domain?: string;
  readonly initials?: string;
};

/** Logos ship from `public/clients_logos/` (synced from repo `clients_logos/`). */
export const ABOUT_CLIENT_MARQUEE_ITEMS = [
  { name: "DTS Solutions", domain: "dtsolutions.com", logoSrc: "/clients_logos/dts-solutions.png" },
  { name: "Aggreko", domain: "aggreko.com", logoSrc: "/clients_logos/aggreko.png" },
  { name: "MSAZN", domain: "msazn.com", logoSrc: "/clients_logos/msazn.png" },
  { name: "Kort", domain: "kort.io", logoSrc: "/clients_logos/kort.png" },
  { name: "Aithentic", domain: "aithentic.com", logoSrc: "/clients_logos/aithentic.png" },
  {
    name: "GuardHawk",
    domain: "guardhawk.com",
    logoSrc: "/clients_logos/guardhawk.png",
    logoWide: true,
    logoColor: true,
  },
  { name: "Tier-1 pension fund", initials: "Asia" },
  {
    name: "Athena Security Group",
    domain: "athenasecuritygroup.ai",
    logoSrc: "/clients_logos/athena.png",
  },
  { name: "Energy enterprise", initials: "Europe" },
  { name: "Genda Phool", domain: "gendaphool.com", logoSrc: "/clients_logos/gendaphool.png" },
  { name: "Masarrati", domain: "masarrati.com", logoSrc: "/clients_logos/masarrati.png" },
  { name: "Hireswift", domain: "hireswift.com", logoSrc: "/clients_logos/snapmagic.png" },
  { name: "EADX", domain: "eadx.com", logoSrc: "/clients_logos/eadx.png" },
  { name: "OAK Consultancy", domain: "oakconsultancy.com.sg", logoSrc: "/clients_logos/oakconsultancy.png" },
] as const satisfies readonly ClientMarqueeItem[];

/** Homepage + About: Brex-style customers block (shared layout) */
export const ABOUT_CLIENTS_PRESENTATION = {
  title: "Our customers",
  lead: "Companies we have delivered production systems for.",
  ctaLabel: "See case studies",
  ctaTo: "/portfolio",
} as const;

export const ABOUT_DIFFERENTIATOR = {
  eyebrow: "Why AiRAT",
  title: "Not another generic systems integrator.",
  lines: [
    { lead: "Unlike consultancies", rest: "we engineer from first principles - you own the architecture, not a slide deck." },
    { lead: "Unlike product vendors", rest: "we build to your environment and integrate what you already run." },
    { lead: "Unlike offshore factories", rest: "the engineers who design your platform are the same ones who ship, stabilise, and hand it over." },
  ],
} as const;

export const ABOUT_RAT_STORY = {
  eyebrow: "Brand story",
  title: "Intelligence that finds a way - even through the dead ends.",
  body:
    "Enterprise data and threats don't arrive clean. AiRAT is named for adaptive intelligence: a system that treats every failure state as signal, maps the full environment - including the paths that don't work - and uses that knowledge so your teams don't relearn the same costly lesson twice.",
} as const;

export const ABOUT_TEAM = {
  eyebrow: "Engineering disciplines",
  title: "The specialists behind each domain",
  lead: "How roles map to delivery. Proof still lives in the portfolio and case studies - stack lists alone don't close programmes.",
} as const;

export const ABOUT_FOOTER_CTA = {
  headline: "The next step is a conversation, not a contract.",
  body: "Tell us what is breaking - SOC throughput, stalled AI initiatives, search latency under load, or compliance drag. On a strategy call we will tell you what is realistic, what it takes, and whether AiRAT is the right fit.",
  button: { label: "Contact us", to: "/contact" },
  footnotes: "No sales script · Plain-language follow-up · UAE, India, Singapore, EU, AUS, US",
} as const;

export const ABOUT_STORY_BRIDGE =
  "Read the case studies for proof, then the services page for how we structure delivery.";

export const ABOUT_FAQ_SECTION = {
  title: "About AiRAT - quick answers",
  intro: "For executives and technical leads scanning before a call.",
} as const;

export const ABOUT_FAQ = [
  {
    q: "Where does AiRAT operate?",
    a: "We deliver production systems for enterprises across the UAE, India, Singapore, Europe, Australia, and the US, with data residency and compliance constraints designed in from the first architecture review - not bolted on later.",
  },
  {
    q: "What does AiRAT deliver for enterprise teams?",
    a: "We are a senior-led engineering partner that ships platforms to production: governed AI and LLM systems, cybersecurity, search, and data stacks. You own the roadmap; we own execution quality and operational readiness.",
  },
  {
    q: "How do you measure success?",
    a: "We align on KPIs before major build phases - examples include alert noise reduction, investigation time, search latency, uptime SLOs, and time-to-production for AI features - using definitions both security and product leadership can defend to the board.",
  },
  {
    q: "Can we talk to engineers, not only sales?",
    a: "Yes. Strategy calls are structured so technical stakeholders can ask architecture, security, and delivery questions directly. We expect the same clarity from your side about constraints and timelines.",
  },
] as const;
