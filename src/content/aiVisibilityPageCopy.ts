/**
 * AI Visibility / AI Search Page (/services/ai-visibility)
 *
 * Target: Enterprise brand managers, CMOs, digital leaders who
 * want their brand to appear accurately and frequently inside
 * LLM-generated content  -  and who need a credible, technical
 * partner to make it happen.
 *
 * Angle: We build LLM systems. We know what gets retrieved and
 * cited. That knowledge is what we bring to your brand's presence
 * inside AI-mediated discovery.
 */

export const AI_VIS_PAGE_SEO = {
  title: "AI Visibility & LLM Brand Presence | AiRAT",
  description:
    "AiRAT helps enterprises build measurable presence inside AI-generated answers: ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews. Built by engineers who design LLM retrieval systems.",
} as const;

export const AI_VIS_PAGE_HERO = {
  badge: "AI Visibility",
  headline: "When AI answers your customer's question, is your brand in the answer?",
  subheadline: "AI-mediated discovery is the fastest-growing channel. Most brands have no strategy for it.",
  body: "ChatGPT, Claude, Perplexity, and Google AI Overviews now answer millions of commercial queries daily. The brands that appear in those answers were not chosen by an algorithm you can reverse-engineer the old way. They were chosen because their content is structured, authoritative, and retrievable. AiRAT builds the technical foundation for that presence  -  because we build the retrieval systems that power it.",
  primaryCta: { label: "Book an AI Visibility audit", to: "/contact" },
  secondaryCta: { label: "How we build AI systems", to: "/services#genai" },
} as const;

export const AI_VIS_RESEARCH_STATS = [
  {
    stat: "100M+",
    label: "active ChatGPT users by early 2023, growing to enterprise-scale adoption by 2025  -  commercial queries now a significant share",
    source: "OpenAI public data, 2023",
  },
  {
    stat: "40%",
    label: "of online shoppers in the US have used AI tools to assist purchase decisions",
    source: "Salesforce State of the Connected Customer, 2024",
  },
  {
    stat: "13%",
    label: "increase in citation likelihood for content with explicit statistics, cited sources, and structured formatting",
    source: "Northeastern GEO Research, 2024",
  },
] as const;

export const AI_VIS_WHAT_IS = {
  eyebrow: "What is AI Visibility",
  title: "A definition worth having.",
  body: "AI Visibility is the measurable presence of a brand, service, or claim inside AI-generated content  -  including synthesised answers, product recommendations, comparison responses, and conversational queries answered by large language models. It is distinct from traditional search visibility (being indexed and ranked) and from social media presence (being followed and engaged). AI Visibility is specifically about whether AI systems retrieve, cite, and accurately represent your brand when a user asks a relevant question.",
  distinction: [
    {
      term: "Traditional SEO",
      def: "Optimising to rank in blue-link SERP positions  -  users see a list of URLs and decide which to click.",
    },
    {
      term: "AEO / GEO",
      def: "Optimising to appear in AI-generated summaries and featured snippets  -  the AI answers the question, your brand gets attributed.",
    },
    {
      term: "AI Visibility",
      def: "The broader practice of ensuring accurate, positive, and frequent presence in all LLM-mediated interactions  -  including conversational queries, product recommendations, and evaluation responses.",
    },
  ],
} as const;

export const AI_VIS_RESEARCH_SECTION = {
  eyebrow: "Research context",
  title: "How LLMs decide what to cite.",
  insights: [
    {
      stat: "Research published by Northeastern University (2024) on Generative Engine Optimisation identified that content with authoritative statistics, explicit citations, and structured argument presentation was cited 40% more frequently in LLM-generated responses than equivalent content without those elements.",
      implication:
        "LLMs are pattern-matching retrieval systems. They favour content that looks like what reliable sources look like  -  data-backed, clearly structured, and attributed. Vague marketing language and unsupported claims are algorithmically disadvantaged.",
      application:
        "AiRAT restructures your key pages using research-backed templates: explicit data points, cited sources, entity-rich paragraph structures, and FAQ blocks that match the conversational patterns LLMs retrieve against.",
    },
    {
      stat: "According to Google's Search Quality Evaluator Guidelines, E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is applied to assess whether content should be surfaced in AI Overviews. Authoritative organisations with clear entity definitions and verifiable expertise signals are preferred sources.",
      implication:
        "Building AI Visibility is partly a technical task (schema, structure, content format) and partly an authority-building task (external citations, Knowledge Panel presence, Wikipedia mentions, industry publication coverage).",
      application:
        "AiRAT designs an authority-building programme alongside technical optimisation  -  targeting third-party citation opportunities, Knowledge Graph entity inclusion, and structured data that signals organisational authority.",
    },
    {
      stat: "Salesforce's 2024 State of the Connected Customer report found that 40% of consumers had used AI tools to help make purchasing decisions, with that figure rising to 58% among consumers aged 18–34.",
      implication:
        "AI-mediated purchase discovery is no longer a niche behaviour. For enterprise brands, the question is not whether customers are using AI to research them  -  it is what those AI systems say when they do.",
      application:
        "AiRAT audits how your brand appears across major AI platforms in your product category, identifies inaccuracies and gaps, and builds a structured programme to improve both frequency and accuracy of AI brand representation.",
    },
  ],
} as const;

export const AI_VIS_SERVICES = {
  eyebrow: "What we deliver",
  title: "Four AI Visibility disciplines.",
  items: [
    {
      num: "01",
      title: "AI Brand Presence Audit",
      body: "We systematically test how your brand appears in responses from ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot across 50–100 target queries relevant to your category. We document: mentions, accuracy, competitor co-citations, and gaps.",
    },
    {
      num: "02",
      title: "Content Restructuring for LLM Retrieval",
      body: "We reformat key pages to improve retrievability: explicit definitional blocks, research citations, entity-rich descriptions, FAQ sections, and structured data that matches the patterns LLMs use when sampling training data and live retrieval results.",
    },
    {
      num: "03",
      title: "Entity & Knowledge Graph Strategy",
      body: "We build and maintain your entity presence: Organisation and Person schema, Wikidata entries, Wikipedia presence where justified, industry database listings, and cross-platform entity consistency  -  so AI systems can accurately identify and represent your brand.",
    },
    {
      num: "04",
      title: "AI Visibility Monitoring & Reporting",
      body: "Monthly reporting on brand mention frequency, accuracy, and sentiment across major AI platforms  -  with a competitive benchmark showing how your presence compares to named competitors across the same query set.",
    },
  ],
} as const;

export const AI_VIS_WHY_AiRAT = {
  eyebrow: "Why AiRAT",
  title: "We build the systems. We know what they retrieve.",
  points: [
    {
      title: "We build enterprise RAG pipelines",
      body: "Our engineering work includes building retrieval-augmented generation systems for large enterprises. We understand chunking strategies, embedding models, vector index architecture, and why some content is retrieved and some is not.",
    },
    {
      title: "We build LLM evaluation harnesses",
      body: "We design the evaluation systems that measure whether LLM outputs are accurate, cited, and appropriately bounded. That perspective directly informs how we structure content for citation.",
    },
    {
      title: "We understand entity recognition in language models",
      body: "Named entity recognition, entity linking, and knowledge graph integration are not abstract concepts for us  -  they are systems we implement and debug. We apply that knowledge directly to your AI Visibility strategy.",
    },
  ],
} as const;

export const AI_VIS_FAQ = [
  {
    q: "What is AI Visibility and why does it matter now?",
    a: "AI Visibility is a brand's measurable presence inside AI-generated content: the answers ChatGPT, Claude, Perplexity, and Google AI Overviews produce when users ask relevant questions. It matters now because these systems are answering commercial queries at scale  -  product comparisons, vendor selection, category education  -  and brands that don't appear in those answers lose influence over discovery before the buyer even reaches a website.",
  },
  {
    q: "Can AI Visibility be measured?",
    a: "Yes, though it requires different tools from traditional SEO. We track: mention frequency (how often your brand is cited across a defined query set), mention accuracy (whether the AI's description of your brand is correct), competitive share of AI mentions (your mentions vs. named competitors), and sentiment (positive, neutral, or negative framing). We sample systematically across ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot.",
  },
  {
    q: "How is AI Visibility different from GEO?",
    a: "GEO (Generative Engine Optimisation) is the technical practice of structuring content for AI retrieval. AI Visibility is the broader strategic goal: the measurable presence of your brand in AI-generated answers, including accuracy, frequency, and competitive context. GEO is one set of tactics that contributes to AI Visibility. Authority building, entity strategy, and monitoring are others.",
  },
  {
    q: "Why is AiRAT uniquely qualified for AI Visibility work?",
    a: "Most agencies optimising for AI visibility are working from the outside  -  inferring how LLMs retrieve and cite content. AiRAT builds enterprise RAG pipelines, fine-tunes LLMs, and designs retrieval systems professionally. We have direct knowledge of how these systems decide what to include in generated responses. That knowledge is applied directly to your content and entity strategy.",
  },
  {
    q: "How quickly can AI Visibility be improved?",
    a: "Some improvements are fast: restructuring existing pages for better retrievability typically reflects in AI responses within 4–8 weeks as AI systems re-crawl and update their retrieval indices. Authority signals (Knowledge Graph, Wikipedia, industry citations) take longer  -  typically 3–6 months for sustained improvement. LLM training data reflects in model outputs on the model's update schedule, which varies by platform.",
  },
] as const;

export const AI_VIS_CTA = {
  headline: "Find out what AI says about your brand.",
  body: "We will audit your brand's current presence in AI-generated answers across five major platforms, map gaps and inaccuracies, and design a programme to improve how AI systems describe and cite your organisation.",
  note: "AI Visibility audit: 100 queries × 5 platforms. Report delivered within 15 business days.",
  button: { label: "Book an AI Visibility audit", to: "/contact" },
} as const;

export const AI_VIS_INTERNAL_LINKS = [
  { label: "GEO & AEO: content structure for AI answers", to: "/services/aeo-geo" },
  { label: "Technical SEO: infrastructure that enables visibility", to: "/services/technical-seo" },
  { label: "How we build RAG and LLM systems", to: "/services#genai" },
  { label: "From the field: AI & LLM insights", to: "/blog?category=ai-llm" },
] as const;
