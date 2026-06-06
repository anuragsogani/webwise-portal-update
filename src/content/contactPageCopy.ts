export const CONTACT_SEO = {
  title: "Contact AiRAT | Book a Strategy Call",
  description:
    "Reach AiRAT to discuss production security, AI, and data platforms. Book a 30-minute strategy call  -  no commitment  -  or send a brief for async review. UAE, India, Europe.",
} as const;

export const CONTACT_HERO = {
  badge: "Get in touch",
  title: "Tell us what's breaking. We'll tell you what's realistic.",
  body: "No sales script. No deck. A 30-minute call where we scope the problem, tell you what is realistic, and confirm whether we are the right fit. Most technical questions get answered in the first session.",
} as const;

export const CONTACT_TRUST_SIGNAL = {
  quote:
    "Three vendors said it wasn't possible at our data volume. AiRAT shipped a working prototype in two weeks and moved it to production in six.",
  attrib: "CTO",
  org: "Scale-up Technology · London, UK",
  metric: "2 weeks to prototype",
} as const;

export const CONTACT_OUTCOME_CHIPS = [
  "87% alert noise eliminated",
  "0.35s search latency",
  "99.95% platform uptime",
] as const;

export const CONTACT_FORM = {
  title: "Send a message",
  lead: "Share the problem in a few lines. We reply with clear next steps — usually within one business day.",
  optionalTitle: "Add context (optional)",
  submitLabel: "Send message",
  submitSending: "Sending…",
  success: "Message received. We will reply with clear next steps  -  usually within one business day.",
} as const;

export const CONTACT_ASIDE = {
  title: "Direct lines",
  locationTitle: "Registered office",
  emailTitle: "Email",
  hoursTitle: "Availability",
  hoursBody:
    "Monday – Friday: 9:00 – 19:00 (IST / Gulf-friendly overlap)\nSaturday: 10:00 – 17:00\nSunday: Closed",
} as const;

export const CONTACT_STORY_BRIDGE =
  "Prefer context before the call? Skim the portfolio for your domain, then the services page for how we structure delivery.";

export const CONTACT_FAQ_SECTION = {
  title: "Before you write",
  intro: "Include these points to reduce back-and-forth  -  we can respond with a useful next step immediately.",
} as const;

export const CONTACT_FAQ = [
  {
    q: "What should I include in the first message?",
    a: "Problem statement, environment (cloud/on-prem, regions), compliance or regulatory drivers, timeline pressure, and what success looks like in 90 days. Links or anonymised architecture diagrams help but are optional.",
  },
  {
    q: "How quickly do you respond?",
    a: "Typically within one business day  -  either clarifying questions or a proposed next step (call slot or written follow-up).",
  },
  {
    q: "Is the strategy call free?",
    a: "Yes. It is a 30-minute working session to establish mutual fit  -  not a scripted product demo.",
  },
  {
    q: "Do you sign NDAs before deep-dive conversations?",
    a: "For early conversations, anonymised context is usually enough. When designs or data models are sensitive, we can align on mutual NDA templates your legal team prefers before going deeper.",
  },
] as const;
