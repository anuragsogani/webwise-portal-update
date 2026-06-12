/**
 * Technical SEO Service Page (/services/technical-seo)
 *
 * Target: CMOs, heads of digital, engineering leads who understand
 * that search performance is fundamentally an infrastructure problem.
 *
 * Angle: Engineering-first SEO - we fix the systems that rankings
 * run on, not just the keywords that point to them.
 */

export const SEO_PAGE_SEO = {
  title: "Technical SEO Engineering | Enterprise Search Infrastructure | AiRAT",
  description:
    "Engineering-led technical SEO for Core Web Vitals, JavaScript rendering, structured data, and crawlability at enterprise scale.",
} as const;

export const SEO_PAGE_HERO = {
  badge: "Technical SEO",
  headline: "Search performance is an infrastructure problem.",
  subheadline: "Most SEO agencies rewrite title tags. We fix the systems underneath.",
  body: "Core Web Vitals, JavaScript rendering, schema markup, crawl architecture, and server-side rendering are engineering decisions that most content teams cannot make alone. AiRAT approaches technical SEO as systems work - auditable, measurable, and tied to organic revenue, not vanity rankings.",
  primaryCta: { label: "Book a technical SEO audit", to: "/contact" },
  secondaryCta: { label: "Read the case studies", to: "/portfolio" },
} as const;

/** Research-backed proof points shown above the fold */
export const SEO_RESEARCH_STATS = [
  {
    stat: "68%",
    label: "of online experiences begin with a search engine",
    source: "BrightEdge Research",
  },
  {
    stat: "53%",
    label: "of mobile site visits are abandoned if pages take more than 3 seconds to load",
    source: "Google Search Central",
  },
  {
    stat: "27.6%",
    label: "of all clicks go to the first organic result - positions 2–10 share the remainder",
    source: "Backlinko SERP Study",
  },
] as const;

export const SEO_PROBLEM_SECTION = {
  eyebrow: "The real problem",
  title: "Rankings break at the infrastructure layer.",
  paragraphs: [
    "Enterprise sites lose organic visibility for reasons content teams cannot fix: JavaScript rendering that blocks Googlebot, Core Web Vitals failures traced to third-party scripts, structured data that validates in isolation but never surfaces as rich results, and crawl budgets wasted on parameter URLs.",
    "The gap between a well-written content strategy and measurable organic growth is almost always a systems gap - render pipeline, server response, internal link architecture, schema implementation. These are engineering problems.",
    "AiRAT closes that gap. We run technical audits that produce prioritised remediation plans grounded in Search Console data, CrUX field data, and production crawl outputs - then we implement the fixes.",
  ],
} as const;

export const SEO_RESEARCH_SECTION = {
  eyebrow: "Research context",
  title: "What the data says about technical SEO in 2025–2026.",
  insights: [
    {
      stat: "Google's Core Web Vitals became a confirmed ranking signal in 2021 and now influence Search Quality Evaluator guidelines across all query types.",
      implication:
        "Sites with 'Poor' LCP scores (above 4 s) lose competitive ranking positions even when their content is strong. The ranking system penalises slow delivery of accurate information.",
      application:
        "AiRAT runs CrUX + lab data analysis to identify the specific scripts, fonts, or API calls causing LCP failures, then implements SSR, resource hints, and image optimisation to bring pages to 'Good' threshold.",
    },
    {
      stat: "According to Google's documentation, over 65% of enterprise sites using JavaScript frameworks have pages that are not fully indexed because Googlebot cannot execute dynamic rendering within crawl budget constraints.",
      implication:
        "Product pages, category pages, and dynamic content built in React, Angular, or Vue often exist to users but are invisible to search engines - creating a gap between actual and indexed content.",
      application:
        "AiRAT implements rendering strategies (SSR, SSG, or dynamic rendering with Puppeteer-class middleware) appropriate to your framework, validated against live Googlebot rendering reports.",
    },
    {
      stat: "According to Moz analysis, pages with correctly implemented structured data (Schema.org) that qualify for rich results achieve 20–30% higher click-through rates than equivalent pages without schema.",
      implication:
        "Rich results (FAQPage, HowTo, Product, Article, BreadcrumbList) differentiate a result visually in SERPs - and in AI Overviews, structured data increases citation likelihood.",
      application:
        "AiRAT implements full JSON-LD schema libraries per page type, validated against Google Rich Results Test and Search Console Enhancement reports, with automated monitoring for schema drift.",
    },
  ],
} as const;

export const SEO_SERVICES = {
  eyebrow: "What we deliver",
  title: "Six technical disciplines. One ranked outcome.",
  items: [
    {
      num: "01",
      title: "Core Web Vitals & Performance Engineering",
      body: "LCP, INP, and CLS audited against field data (CrUX), not just lab tools. Fixes target the specific resources - not a generic optimisation checklist - and are validated before deployment.",
    },
    {
      num: "02",
      title: "JavaScript SEO & Rendering Architecture",
      body: "We audit how Googlebot renders your pages, identify content that is invisible after JavaScript execution, and implement SSR, SSG, or dynamic rendering where appropriate.",
    },
    {
      num: "03",
      title: "Structured Data & Schema Engineering",
      body: "Full JSON-LD implementation across all page types: Organisation, WebSite, BreadcrumbList, Article, FAQPage, HowTo, Product, and SoftwareApplication - tested, monitored, and adapted as Google updates eligibility criteria.",
    },
    {
      num: "04",
      title: "Crawl Architecture & Index Management",
      body: "Crawl budget analysis, parameter handling, canonical implementation, robots.txt optimisation, and XML sitemap architecture - ensuring search engines index what matters and skip what doesn't.",
    },
    {
      num: "05",
      title: "Technical SEO Audits & Prioritisation",
      body: "Comprehensive audits using Screaming Frog, Search Console API, and CrUX data - with findings prioritised by projected organic impact, not theoretical severity.",
    },
    {
      num: "06",
      title: "International SEO & Hreflang",
      body: "Hreflang implementation, multilingual URL architecture, and geo-targeting configuration for enterprises operating across UAE, India, Singapore, Europe, and the US.",
    },
  ],
} as const;

export const SEO_PROCESS = {
  eyebrow: "How we work",
  title: "Audit. Prioritise. Implement. Measure.",
  steps: [
    {
      num: "01",
      title: "Technical audit with Search Console data",
      body: "We combine Screaming Frog crawl data, GSC API queries, CrUX field metrics, and server log analysis to produce a complete picture of technical gaps - not a tool export with 400 uncategorised issues.",
    },
    {
      num: "02",
      title: "Prioritisation by organic revenue impact",
      body: "Issues are mapped to pages with the highest organic traffic and conversion potential. Fixes are sequenced by projected impact × implementation complexity.",
    },
    {
      num: "03",
      title: "Engineering-backed implementation",
      body: "We implement fixes directly - rendering changes, schema libraries, CWV remediation, and architecture updates - with your engineering team or independently, to agreed deployment windows.",
    },
    {
      num: "04",
      title: "Validation and monitoring",
      body: "Post-deployment, we validate changes in Search Console, monitor rich result status, and track ranking movement against the pages targeted - not a generic domain-level visibility score.",
    },
  ],
} as const;

export const SEO_FAQ = [
  {
    q: "What makes technical SEO different from regular SEO?",
    a: "Technical SEO addresses the infrastructure layer: how search engines crawl, render, and index your site. It includes Core Web Vitals, JavaScript rendering, structured data, site architecture, and server configuration. These are engineering decisions that affect whether your content is visible to search engines at all - regardless of content quality or link building.",
  },
  {
    q: "How do you prioritise what to fix first?",
    a: "We prioritise by expected organic revenue impact multiplied by implementation effort. High-traffic pages with clear rendering or CWV failures that are also conversion targets come first. We produce a prioritised backlog with each issue's estimated traffic recovery and implementation complexity before any work begins.",
  },
  {
    q: "Do you work with existing engineering teams?",
    a: "Yes. We can embed with your team to implement changes directly, provide detailed technical specifications your team implements, or take full ownership of a remediation programme - depending on your internal capacity and preference.",
  },
  {
    q: "How long before technical SEO changes show results?",
    a: "Crawl and indexing changes typically reflect in Search Console within 2–6 weeks. Core Web Vitals improvements measured in CrUX field data take 28+ days to appear (Google's CrUX window). Ranking changes from improved crawlability can appear within a few weeks for frequently crawled pages, but organic traffic recovery on large sites typically takes 2–4 months of sustained improvement.",
  },
  {
    q: "Does AiRAT handle content SEO as well?",
    a: "Our primary specialisation is technical SEO - the infrastructure layer. For content strategy and keyword research, we work alongside your content team or refer to specialists where we are not the right fit. We do implement on-page elements that straddle technical and content: title tag patterns, meta description templates, heading hierarchy, and internal link architecture.",
  },
] as const;

export const SEO_CTA = {
  headline: "Start with a technical audit.",
  body: "We will audit your site against Google Search Central guidelines, CrUX field data, and your current Search Console performance - then prioritise the issues worth fixing. No generic reports. No 400-item checklists.",
  note: "Typical audit turnaround: 10–15 business days for enterprise sites.",
  button: { label: "Request a technical audit", to: "/contact" },
} as const;

export const SEO_INTERNAL_LINKS = [
  { label: "AEO & GEO: visibility in AI-generated answers", to: "/services/aeo-geo" },
  { label: "AI Visibility: getting cited by LLMs", to: "/services/ai-visibility" },
  { label: "SXO: search experience optimisation", to: "/services/sxo" },
  { label: "Engineering services overview", to: "/services" },
] as const;
