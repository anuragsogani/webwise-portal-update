/**
 * AEO / GEO Service Page (/services/aeo-geo)
 *
 * Target: Marketing and growth leaders who see traffic declining
 * from AI Overviews, losing brand mentions in ChatGPT/Perplexity,
 * or need a strategy for the post-SERP search environment.
 *
 * Angle: We understand how AI retrieval systems work because we
 * build them. That means we optimise for citation, not just ranking.
 */

export const GEO_PAGE_SEO = {
  title: "AEO & GEO: Answer Engine & Generative Engine Optimisation | AiRAT",
  description:
    "AEO and GEO services for structured visibility inside AI Overviews, ChatGPT, Claude, and Perplexity, built by LLM system engineers.",
} as const;

export const GEO_PAGE_HERO = {
  badge: "AEO & GEO",
  headline: "Your brand needs to be inside the answer, not beneath it.",
  subheadline: "AI Overviews, ChatGPT, Perplexity, and Claude are replacing the first click. We optimise for citation.",
  body: "Answer Engine Optimisation (AEO) and Generative Engine Optimisation (GEO) are disciplines that make your content retrievable, quotable, and attributable by AI systems. AiRAT approaches this from the inside  -  we build RAG pipelines and LLM systems professionally, which means we understand precisely why some content gets cited and some does not.",
  primaryCta: { label: "Book a GEO strategy session", to: "/contact" },
  secondaryCta: { label: "See our AI systems work", to: "/portfolio" },
} as const;

export const GEO_RESEARCH_STATS = [
  {
    stat: "25%",
    label: "reduction in traditional search engine volume expected by 2026 as AI chatbots replace queries",
    source: "Gartner, 2024",
  },
  {
    stat: "65%",
    label: "of Google searches end without a click  -  AI Overviews are accelerating zero-click behaviour",
    source: "SparkToro Zero-Click Research",
  },
  {
    stat: "3×",
    label: "higher likelihood of being cited in AI-generated answers for pages with clear entity definitions and FAQ structure",
    source: "Industry GEO research consensus, 2024–2025",
  },
] as const;

export const GEO_PROBLEM_SECTION = {
  eyebrow: "What changed",
  title: "Search is no longer a list of links.",
  paragraphs: [
    "Google's AI Overviews synthesise answers from multiple sources and present them above organic results. ChatGPT, Perplexity, and Claude answer user questions directly  -  pulling from a training corpus and live retrieval. Bing Copilot does the same. In this environment, a brand that doesn't appear in the synthesised answer is effectively invisible, regardless of its organic ranking.",
    "The optimisation logic for this environment is different from traditional SEO. Search engines reward relevance and authority. AI answer engines reward retrievability, structural clarity, and entity recognition. A page that ranks #1 on Google may never be cited by an AI overview if it fails the retrieval criteria that LLMs use.",
    "AEO focuses on featured snippets, People Also Ask positions, and voice search answers. GEO focuses on structured citations in LLM-generated responses. AiRAT delivers both  -  with an engineering depth that most agencies cannot match because they have never built the systems they are optimising for.",
  ],
} as const;

export const GEO_HOW_WE_DIFFER = {
  eyebrow: "Why we are different",
  title: "We build RAG systems. We know what gets retrieved.",
  body: "When we run a GEO programme, we know why some content surfaces and some doesn't  -  not from inference, but from engineering experience. We have built enterprise RAG pipelines, fine-tuned LLMs, designed vector index architectures, and debugged why a specific document wasn't returned in a retrieval query. That knowledge is applied directly to your content strategy and structure.",
  points: [
    "We understand chunking, embedding, and retrieval  -  not just keywords",
    "We know which schema types influence LLM citation patterns",
    "We design content with both human readability and machine retrievability in mind",
    "We monitor AI brand mentions across Perplexity, ChatGPT, Bing Copilot, and Google AI Overviews",
  ],
} as const;

export const GEO_RESEARCH_SECTION = {
  eyebrow: "Research context",
  title: "What drives citation in AI answer systems.",
  insights: [
    {
      stat: "According to Google Search Central documentation, E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signals  -  including author attribution, cited sources, and entity clarity  -  are used by Quality Raters and increasingly by automated systems to assess content.",
      implication:
        "Content without clear entity definitions, author attribution, or cited data is less likely to be used in AI Overviews and similar systems, even when it ranks well organically.",
      application:
        "AiRAT implements entity-rich page structures, explicit author and organisation schema, and citation-ready paragraph formats that signal authority to both human evaluators and automated systems.",
    },
    {
      stat: "Research from Northeastern University (2024) on Generative Engine Optimisation found that adding citations, statistics, and quotations to content increased its inclusion in AI-generated summaries by 40% compared to uncited equivalent content.",
      implication:
        "The presence of verifiable data points and clear attributions is a key signal for LLMs when deciding what to include in synthesised answers.",
      application:
        "AiRAT builds research-backed content templates that integrate data points, expert signals, and answer-first paragraph structures  -  making your content the preferred source for AI synthesis.",
    },
    {
      stat: "According to SparkToro research, 65% of Google searches in 2024 ended without a click  -  up from 50% in 2020. This trend accelerates as AI Overviews expand query coverage.",
      implication:
        "Being 'visible but uncited' in AI Overviews means your brand was used to generate an answer your competitor may receive credit for. Citation  -  with your brand name  -  is the new click.",
      application:
        "AiRAT designs structured data and page architecture that maximises named citation probability: FAQPage schema, HowTo markup, Organisation and WebSite entity signals, and concise answer blocks.",
    },
  ],
} as const;

export const GEO_SERVICES = {
  eyebrow: "What we deliver",
  title: "AEO + GEO across five surfaces.",
  items: [
    {
      num: "01",
      title: "AI Overview Optimisation (Google SGE)",
      body: "We audit your content against the retrieval criteria Google uses for AI Overviews  -  entity clarity, answer structure, schema implementation, and E-E-A-T signals  -  and implement structural changes that improve inclusion rates.",
    },
    {
      num: "02",
      title: "Featured Snippet & PAA Capture",
      body: "We identify high-value 'People Also Ask' and featured snippet opportunities in your target keyword set, then implement answer-first paragraph structures, FAQ schema, and HowTo markup to capture position-zero placements.",
    },
    {
      num: "03",
      title: "LLM Brand Mention Strategy",
      body: "We audit how your brand appears (or doesn't) in responses from ChatGPT, Perplexity, Claude, and Bing Copilot  -  then implement a content and entity strategy that improves brand mention frequency and accuracy.",
    },
    {
      num: "04",
      title: "Entity SEO & Knowledge Graph Optimisation",
      body: "We build entity definitions, structured data, and external citation signals (Wikipedia, Wikidata, industry databases) that help AI systems recognise and accurately represent your brand, services, and expertise.",
    },
    {
      num: "05",
      title: "Content Architecture for AI Retrieval",
      body: "We redesign content structures  -  chunking logic, heading hierarchies, definition blocks, and summary sections  -  to be more easily indexed and cited by LLM retrieval systems.",
    },
  ],
} as const;

export const GEO_FAQ = [
  {
    q: "What is Generative Engine Optimisation (GEO)?",
    a: "GEO is the discipline of structuring content so that AI-powered search systems  -  including Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot  -  are more likely to retrieve, cite, and accurately represent your brand in their generated answers. Unlike traditional SEO, which targets link positions in SERPs, GEO targets inclusion in synthesised answers where a brand's name or claim appears as a cited source.",
  },
  {
    q: "What is Answer Engine Optimisation (AEO)?",
    a: "AEO is the older practice of optimising for direct-answer surfaces: Google's featured snippets, Knowledge Panels, People Also Ask boxes, and voice search results. It relies on structured data (especially FAQPage and HowTo schema), concise answer-first paragraphs, and clear entity definitions. GEO extends AEO principles into LLM-native retrieval systems.",
  },
  {
    q: "Can we measure GEO performance?",
    a: "GEO measurement is still evolving, but AiRAT tracks: AI Overview inclusion rates for target queries (via manual sampling and tools like SE Ranking's AI Overview tracker), brand mention frequency in ChatGPT and Perplexity responses, featured snippet capture rates, and PAA ranking positions  -  all mapped to target keyword sets.",
  },
  {
    q: "How does your experience building RAG systems help with GEO?",
    a: "RAG (Retrieval-Augmented Generation) systems work by embedding documents, storing them in a vector index, and retrieving relevant chunks at query time. We have built enterprise-scale RAG pipelines professionally  -  which means we understand exactly why some content chunks are retrieved and others are not. That knowledge informs how we structure your content for maximum retrievability in both internal AI systems and external answer engines.",
  },
  {
    q: "How long does GEO take to show results?",
    a: "Featured snippet and PAA improvements can appear in 4–12 weeks. AI Overview inclusion varies by platform  -  Google SGE changes typically reflect within 4–8 weeks after indexing updates. LLM brand mention improvements depend on training data refresh cycles, which for externally deployed models can take several months. We focus on changes with the shortest feedback loop first.",
  },
] as const;

export const GEO_CTA = {
  headline: "Find out where your brand lives in AI answers.",
  body: "We will audit your brand's current presence in AI-generated answers across Google, ChatGPT, Perplexity, and Bing Copilot  -  then design a structured programme to improve citation frequency, accuracy, and attribution.",
  note: "GEO audit includes: 50 target queries × 5 AI surfaces × brand citation analysis.",
  button: { label: "Book a GEO audit session", to: "/contact" },
} as const;

export const GEO_INTERNAL_LINKS = [
  { label: "Technical SEO: the infrastructure layer", to: "/services/technical-seo" },
  { label: "AI Visibility: LLM citation strategy", to: "/services/ai-visibility" },
  { label: "SXO: search experience optimisation", to: "/services/sxo" },
  { label: "How we build RAG and LLM systems", to: "/services#genai" },
] as const;
