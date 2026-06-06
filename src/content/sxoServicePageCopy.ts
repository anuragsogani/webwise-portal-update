/**
 * SXO (Search Experience Optimisation) Service Page (/services/sxo)
 *
 * Target: Product, growth, and UX leaders who understand that
 * rank isn't enough  -  the page has to earn the click AND the conversion.
 *
 * Angle: SXO is where search intent meets user experience. We
 * engineer both sides of the equation: the signal that earns the
 * position and the page that justifies the trust.
 */

export const SXO_PAGE_SEO = {
  title: "SXO: Search Experience Optimisation | AiRAT",
  description:
    "AiRAT delivers SXO  -  the practice of aligning search intent, page design, content structure, and conversion logic so that earning a ranking also earns the next action. Engineering-led. Outcome-measured.",
} as const;

export const SXO_PAGE_HERO = {
  badge: "Search Experience Optimisation",
  headline: "Ranking is the beginning. What happens next is the business.",
  subheadline: "SXO closes the gap between search position and measurable outcome.",
  body: "Search Experience Optimisation (SXO) is the discipline of aligning how search engines evaluate your content with how users experience it. A page that ranks but bounces at 85% is not performing  -  it is consuming budget. AiRAT engineers the full arc: intent-matched content, technically sound pages, and experience design that moves users from search click to business outcome.",
  primaryCta: { label: "Book an SXO session", to: "/contact" },
  secondaryCta: { label: "See how we work", to: "/services" },
} as const;

export const SXO_RESEARCH_STATS = [
  {
    stat: "88%",
    label: "of online consumers are less likely to return to a site after a bad user experience",
    source: "AWS / research consensus",
  },
  {
    stat: "A 0.1s improvement",
    label: "in site speed increases conversion rates by 8% for retail and 10% for travel sites",
    source: "Deloitte / Google Web Performance Study",
  },
  {
    stat: "70%",
    label: "of searchers click results that match their exact intent  -  mismatch between query and page content is the most common bounce driver",
    source: "Search intent research consensus, 2024",
  },
] as const;

export const SXO_DEFINITION = {
  eyebrow: "What is SXO",
  title: "The intersection of ranking signal and user decision.",
  body: "Traditional SEO optimises for search engine signals. UX design optimises for user behaviour. SXO is the practice of treating both as the same system  -  because they increasingly are. Google's ranking algorithms now incorporate user behaviour signals (click-through rate, dwell time, task completion) alongside content and link signals. A page that consistently disappoints users sends negative signals that erode rankings over time. SXO engineering prevents that decay.",
  pillars: [
    {
      title: "Intent alignment",
      body: "The page must deliver exactly what the search query promised  -  in the right format (article, tool, product, guide) and at the right depth.",
    },
    {
      title: "Experience architecture",
      body: "Page structure, visual hierarchy, navigation, and content flow designed for the specific search context  -  not a generic template.",
    },
    {
      title: "Technical performance",
      body: "Core Web Vitals, accessibility, and mobile experience as baseline requirements  -  not optional enhancements.",
    },
    {
      title: "Conversion continuity",
      body: "Every page in the organic funnel has a designed next action  -  not a dead end or an irrelevant CTA inserted post-launch.",
    },
  ],
} as const;

export const SXO_RESEARCH_SECTION = {
  eyebrow: "Research context",
  title: "Why experience signals now affect rankings.",
  insights: [
    {
      stat: "Google's Helpful Content System, introduced in 2022 and now embedded in core ranking, explicitly targets content created for search engines rather than people. According to Google Search Central, pages with high bounce rates, low dwell time, and poor task completion are downranked regardless of technical SEO quality.",
      implication:
        "A technically perfect page that does not satisfy user intent will lose ranking ground over time. The SEO–UX gap is now a ranking risk, not just a conversion risk.",
      application:
        "AiRAT audits landing pages for intent match, content depth, navigation clarity, and task completion paths  -  then redesigns or refactors the pages that are leaking organic traffic back to SERPs.",
    },
    {
      stat: "According to Deloitte's research on mobile performance, a 0.1-second improvement in page load time correlates with an 8% uplift in conversion rate for retail sites and 10% for travel. Google's own CWV research shows that pages meeting Good CWV thresholds have 24% lower abandonment rates.",
      implication:
        "Page speed is both a ranking signal and a direct revenue driver. Enterprises that fix CWV as a SEO exercise often discover it is also their highest-ROI conversion optimisation.",
      application:
        "AiRAT runs CWV remediation with business case framing  -  mapping speed improvements to both ranking potential and conversion uplift, so engineering investment is justified across two audiences.",
    },
    {
      stat: "Research by Nielsen Norman Group consistently shows that users scan rather than read, with 79% scanning rather than reading word by word. Pages with poor content hierarchy, dense paragraphs, and unclear scent trails fail to communicate value to searchers in the first 10 seconds.",
      implication:
        "High-intent search visitors make rapid judgements. A page that doesn't communicate its value in the first scroll loses the visitor  -  and sends a negative engagement signal to search engines.",
      application:
        "AiRAT implements content hierarchy audits and rewrites that create clear F-pattern and Z-pattern scannability, above-fold value communication, and progressive depth for users who stay.",
    },
  ],
} as const;

export const SXO_SERVICES = {
  eyebrow: "What we deliver",
  title: "Six SXO disciplines. One measurable funnel.",
  items: [
    {
      num: "01",
      title: "Search Intent Mapping & Content Alignment",
      body: "We map your target keyword set to user intent categories (informational, navigational, commercial, transactional) and audit whether your landing pages match. Mismatched pages are redesigned or replaced.",
    },
    {
      num: "02",
      title: "Landing Page Architecture & Content Hierarchy",
      body: "Page structure, heading hierarchy, above-fold content, and internal navigation redesigned around the specific intent of the search visitor  -  not the preferences of the design team.",
    },
    {
      num: "03",
      title: "Core Web Vitals & Mobile Experience",
      body: "LCP, INP, CLS remediation tied directly to the pages driving your organic traffic  -  with mobile-first validation and CrUX field data tracking.",
    },
    {
      num: "04",
      title: "Conversion-Aware Internal Linking",
      body: "Internal link architecture designed to guide organic visitors toward conversion  -  not just improve crawlability. Anchor text, link placement, and next-page recommendations designed around the search-to-conversion path.",
    },
    {
      num: "05",
      title: "Engagement Signal Optimisation",
      body: "Reducing pogo-sticking (returns to SERP), improving dwell time, and increasing scroll depth through content structure, readability improvements, and progressive disclosure design.",
    },
    {
      num: "06",
      title: "A/B Testing & Search Funnel Analytics",
      body: "Structured A/B tests for organic landing pages with statistical rigour  -  measuring both SEO signals (CTR, impressions) and business outcomes (conversions, revenue) simultaneously.",
    },
  ],
} as const;

export const SXO_FAQ = [
  {
    q: "What is the difference between SEO and SXO?",
    a: "Technical SEO optimises for search engine signals: crawlability, structured data, Core Web Vitals, and indexing. SXO extends this to the user experience after the click: content relevance, page design, task completion, and conversion path. Traditional SEO stops at the ranking. SXO continues through to the business outcome.",
  },
  {
    q: "How does Google measure user experience as a ranking signal?",
    a: "Google uses a combination of signals: Core Web Vitals (LCP, INP, CLS) measured from real user data via CrUX; Quality Rater Guidelines that include page experience and helpfulness; and the Helpful Content System that assesses whether content satisfies user intent or exists primarily for search engines. Exact click data usage in ranking is not confirmed, but Google has stated that user satisfaction signals inform system-level evaluation.",
  },
  {
    q: "How do you measure SXO success?",
    a: "We track both search signals and business outcomes. On the search side: CTR from GSC (search click-through rate), average position movement, and impression share for target keywords. On the business side: organic conversion rate, goal completions from organic traffic, and bounce rate segmented by organic landing page. We set baselines before any changes and track against them over 90-day periods.",
  },
  {
    q: "Does AiRAT redesign pages, or only advise?",
    a: "Both, depending on what is needed. We can produce detailed page-level specifications your team implements, provide direct code changes (HTML, CSS, React components), or manage full landing page redesigns. We work within your CMS, component library, or design system  -  we don't impose a generic template.",
  },
] as const;

export const SXO_CTA = {
  headline: "Find out where your search traffic is leaking.",
  body: "We will analyse your top organic landing pages for intent match, experience quality, and conversion continuity  -  then produce a prioritised SXO plan grounded in your Search Console and analytics data.",
  note: "SXO audits typically cover the top 20 organic landing pages by traffic.",
  button: { label: "Request an SXO audit", to: "/contact" },
} as const;

export const SXO_INTERNAL_LINKS = [
  { label: "Technical SEO: the infrastructure underneath", to: "/services/technical-seo" },
  { label: "AEO & GEO: visibility in AI answers", to: "/services/aeo-geo" },
  { label: "AI Visibility: getting cited by LLMs", to: "/services/ai-visibility" },
  { label: "Explore our full service stack", to: "/services" },
] as const;
