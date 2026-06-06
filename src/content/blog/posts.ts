import type { BlogPost } from "./types";
import type { FaqItem } from "../faqTypes";

import bodyGeo from "./articles/geo-why-seo-not-enough-2025.md?raw";
import bodyLlmCitation from "./articles/llm-citation-patterns.md?raw";
import bodyEntitySeo from "./articles/entity-seo-knowledge-graph.md?raw";
import bodyApr from "./articles/governed-llm-apis-rate-limits-tenancy.md?raw";
import bodyMar from "./articles/data-contracts-medallion-bronze-silver-gold.md?raw";
import bodyFeb from "./articles/threat-informed-detection-engineering-practice.md?raw";
import bodyJan from "./articles/case-based-thinking-platform-bids.md?raw";
import bodyDec from "./articles/elk-opensearch-migration-cutover-oncall.md?raw";
import bodyNov from "./articles/real-time-analytics-pipelines-sla-finance.md?raw";
import bodyOct from "./articles/observability-ai-systems-logs-traces-outputs.md?raw";
import bodySep from "./articles/llm-evaluation-frameworks-procurement.md?raw";
import bodyAug from "./articles/kyc-ml-pipelines-operational-debt.md?raw";
import bodyJul from "./articles/soc-automation-evidence-auditability.md?raw";
import bodyJun from "./articles/opensearch-vs-elastic-cutover-checklist.md?raw";
import bodyMay from "./articles/rag-evaluation-ownership-production.md?raw";
import bodyMay26W1 from "./articles/ai-overviews-inline-citations-seo-2026.md?raw";
import bodyMay26W2 from "./articles/agentic-ai-governance-identity-enterprise.md?raw";
import bodyMay26W3 from "./articles/deepfake-resistant-authentication-enterprise.md?raw";
import bodyMay26W4 from "./articles/self-healing-data-pipelines-ai-native.md?raw";

function readingMinutesFor(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function post(
  meta: Omit<BlogPost, "bodyMarkdown" | "readingTimeMinutes"> & { readonly bodyMarkdown: string },
): BlogPost {
  const { bodyMarkdown, ...rest } = meta;
  return {
    ...rest,
    bodyMarkdown,
    readingTimeMinutes: readingMinutesFor(bodyMarkdown),
  };
}

const F = (q: string, a: string): FaqItem => ({ q, a });

const RAW: BlogPost[] = [
  post({
    slug: "entity-seo-knowledge-graph",
    title: "Entity SEO: Building a Knowledge Graph Presence for Enterprise Brands",
    description:
      "How to build accurate, consistent entity signals so search engines and AI systems correctly identify, represent, and cite your brand  -  from Organisation schema to Wikidata.",
    author: "AiRAT",
    publishedAt: "2026-04-13",
    tags: ["entity SEO", "Knowledge Graph", "GEO", "structured data"],
    category: "ai-llm",
    relatedSlugs: ["geo-why-seo-not-enough-2025", "llm-citation-patterns"],
    glossaryLinks: ["geo"],
    keyTakeaways: [
      "Entity signals  -  Organisation schema, Wikidata, and external citations  -  determine how AI systems represent your brand in generated answers",
      "Google Knowledge Panels are earned through entity signal quality and consistent cross-platform presence, not directly requested",
      "Wikidata is a primary structured source for LLM training data; accurate entries improve both search and AI brand accuracy",
      "NAP consistency (name, address, phone) across LinkedIn, Crunchbase, and GitHub is foundational for entity disambiguation",
      "External citations in authoritative sources (analyst reports, trade publications, Wikipedia) amplify entity trust signals",
      "JSON-LD Organisation schema on your homepage with sameAs links is the minimum entity SEO implementation",
    ],
    faqs: [
      F(
        "What is a Google Knowledge Panel and how do I get one?",
        "A Knowledge Panel is a structured information box Google shows for recognised entities. Earning one requires consistent Organisation schema, Wikidata presence, external authoritative citations, and sufficient brand search volume. It is earned through entity signal quality, not directly requested.",
      ),
      F(
        "How does Wikidata affect AI brand visibility?",
        "Wikidata is a structured knowledge base that feeds Google's Knowledge Graph and is well-represented in LLM training data. Complete, accurate Wikidata entries improve both traditional search entity recognition and LLM brand accuracy.",
      ),
      F(
        "What is the most important entity signal for LLM visibility?",
        "Consistent entity representation across owned properties (website, LinkedIn, Crunchbase, GitHub) combined with external citations in authoritative sources that are likely in LLM training data  -  Wikipedia, analyst reports, trade publications.",
      ),
      F(
        "Can AiRAT help with entity SEO and GEO?",
        "Yes  -  we implement entity-based SEO as part of our GEO and AI Visibility programmes. Book a strategy call to discuss your brand's current entity representation and where gaps exist.",
      ),
    ],
    bodyMarkdown: bodyEntitySeo,
  }),
  post({
    slug: "llm-citation-patterns",
    title: "LLM Citation Patterns: What Gets Retrieved and What Doesn't",
    description:
      "How large language models decide what content to include in generated answers  -  and the specific content structures that improve your brand's citation probability.",
    author: "AiRAT",
    publishedAt: "2026-04-10",
    tags: ["GEO", "LLM", "citation", "content strategy"],
    category: "ai-llm",
    relatedSlugs: ["geo-why-seo-not-enough-2025", "entity-seo-knowledge-graph"],
    glossaryLinks: ["rag", "geo"],
    keyTakeaways: [
      "Statistics with source attribution increase LLM citation rates by ~52% (Aggarwal et al.); quotations by ~47%",
      "Answer-first structure  -  main claim in the first sentence of each section  -  improves retrieval in RAG-augmented AI systems",
      "Perplexity and ChatGPT with browsing use live retrieval; base ChatGPT draws from parametric knowledge  -  requiring different optimisation approaches",
      "LLMs use semantic similarity, not keyword matching, so clarity and directness outperform keyword density",
      "Content cited in AI answers typically has higher E-E-A-T signals: author expertise, external citations, institutional credibility",
      "Measure GEO impact by sampling 20–30 target queries across major AI platforms before and after content changes",
    ],
    faqs: [
      F(
        "What content changes most improve LLM citation probability?",
        "Adding explicit statistics with source attribution and structuring content to answer questions in the first sentence of each section. Research by Aggarwal et al. found that statistics + citations combined increased citation rates by ~52%.",
      ),
      F(
        "Is there a difference between how Perplexity and ChatGPT cite content?",
        "Yes. Perplexity uses live RAG retrieval and cites specific sources in its responses. ChatGPT (base, without browsing) draws primarily from parametric knowledge. GPT-4 with browsing uses live retrieval similar to Perplexity. Each requires slightly different optimisation priorities.",
      ),
      F(
        "Does keyword density affect LLM retrieval?",
        "Not in the same way as traditional SEO. LLMs use semantic similarity, not keyword matching, for retrieval. Content that clearly answers the query in plain language outperforms content with high keyword density but low clarity.",
      ),
      F(
        "How do I measure if my GEO changes are working?",
        "Sample 20–30 target queries across major AI platforms before and after changes. Track mention frequency, accuracy, and competitive context. Changes in RAG-augmented systems typically reflect within 4–8 weeks.",
      ),
    ],
    bodyMarkdown: bodyLlmCitation,
  }),
  post({
    slug: "geo-why-seo-not-enough-2025",
    title: "GEO: Why SEO Alone Is Not Enough in 2025",
    description:
      "Gartner predicts 25% of traditional search volume will shift to AI by 2026. This is what that means for brand visibility  -  and what to do about it.",
    author: "AiRAT",
    publishedAt: "2026-04-07",
    tags: ["GEO", "SEO", "AI search", "brand visibility"],
    category: "ai-llm",
    relatedSlugs: ["llm-citation-patterns", "entity-seo-knowledge-graph"],
    glossaryLinks: ["geo", "rag"],
    keyTakeaways: [
      "Gartner predicts 25% of traditional search volume will shift to AI-powered surfaces by 2026",
      "GEO (Generative Engine Optimisation) addresses visibility in ChatGPT, Perplexity, Claude, and Google AI Overviews  -  surfaces SEO cannot reach",
      "Answer-first content structure, FAQPage schema, and entity clarity are the three highest-leverage GEO investments",
      "Traditional organic search and GEO run in parallel; the most effective strategies optimise for both simultaneously",
      "AI Overviews in Google reduce click-through rates for some query types while maintaining brand visibility  -  measure impressions and mentions, not just clicks",
      "The quickest GEO win is restructuring key pages to answer-first format and implementing FAQPage schema for high-value Q&A content",
    ],
    faqs: [
      F(
        "What is GEO (Generative Engine Optimisation)?",
        "GEO is the discipline of structuring content, building authority signals, and implementing technical foundations that improve the probability of an LLM-powered system retrieving, citing, and accurately representing your brand in a generated response.",
      ),
      F(
        "Is GEO replacing traditional SEO?",
        "No. Traditional organic search still drives significant discovery traffic. GEO extends visibility to surfaces SEO alone cannot reach: AI-generated answers in ChatGPT, Perplexity, Claude, and Google AI Overviews. The most effective strategies run both in parallel.",
      ),
      F(
        "What is the quickest win in GEO?",
        "Restructuring key pages to answer-first format  -  putting the main claim in the first sentence of each section  -  combined with implementing FAQPage schema for high-value Q&A content. These changes are typically indexable within weeks.",
      ),
      F(
        "How does AiRAT help with GEO?",
        "Our AEO & GEO service covers structured content audit, FAQ and schema implementation, entity clarity work, and monitoring brand presence across major AI platforms. Book a strategy session to start with an AI brand presence audit.",
      ),
    ],
    bodyMarkdown: bodyGeo,
  }),
  post({
    slug: "rag-evaluation-ownership-production",
    title: "Production RAG Without the Demo Tax: Evaluation, Drift, and Ownership",
    description:
      "How to own RAG evaluation in production: drift, versioning, and procurement-defensible metrics - beyond the demo slice.",
    author: "AiRAT",
    publishedAt: "2025-05-12",
    tags: ["RAG", "LLM", "MLOps", "evaluation"],
    category: "ai-llm",
    relatedSlugs: ["llm-evaluation-frameworks-procurement", "observability-ai-systems-logs-traces-outputs"],
    glossaryLinks: ["rag"],
    keyTakeaways: [
      "Own your RAG evaluation harness before moving to production  -  vendor benchmarks measure different things than production distributions",
      "Drift is a retrieval problem first, a model problem second  -  track score distributions and retrieval overlap, not just model outputs",
      "Version your retriever, your index, and your eval suite together; tie every release to a suite ID stored in CI artefacts",
      "Assign a single accountable owner across product, ML, and platform who can block releases when offline checks fail",
      "The minimum viable evaluation set for a regulated buyer includes versioned corpora, labelled queries, automated forbidden-output checks, and human rubrics",
      "Demo slices and production distributions diverge within weeks of launch  -  sample real user traffic for continuous evaluation",
    ],
    faqs: [
      F(
        "Who should own RAG evaluation after go-live?",
        "Assign a single accountable owner across product, ML, and platform - someone who can block releases when offline suites or online drift checks fail. Splitting ownership across three VPs produces pretty RACI charts and late-night incidents.",
      ),
      F(
        "What is the minimum viable evaluation set for a regulated buyer?",
        "At least: versioned corpora, labelled queries per segment, automated checks for citations and forbidden outputs, and sampled human rubrics on stratified traffic. Tie each release to suite IDs stored next to CI artefacts.",
      ),
      F(
        "How do we detect embedding or reranker drift without perfect labels?",
        "Track score distributions, retrieval overlap vs prior index snapshots, and task success proxies. Pair statistical shift detectors with periodic human review on the slices that moved most.",
      ),
      F(
        "Where does AiRAT help on RAG programmes?",
        "We design evaluation harnesses, observability, and governance so models stay auditable in production - not frozen demo prompts. Start from the services page for AI delivery and book a strategy call when you have a concrete workload.",
      ),
    ],
    bodyMarkdown: bodyMay,
  }),
  post({
    slug: "opensearch-vs-elastic-cutover-checklist",
    title: "OpenSearch vs Managed Elastic: A Buyer’s Cutover Checklist",
    description:
      "Licence posture, index templates, ILM, and shadow traffic - what actually breaks during OpenSearch or Elastic migrations and how to plan the cutover.",
    author: "AiRAT",
    publishedAt: "2025-06-09",
    tags: ["OpenSearch", "Elasticsearch", "migration", "search"],
    category: "data-search",
    relatedSlugs: ["elk-opensearch-migration-cutover-oncall", "real-time-analytics-pipelines-sla-finance"],
    glossaryLinks: ["opensearch"],
    keyTakeaways: [
      "Licence economics, cloud portability, and operational maturity  -  not ideology  -  should drive the OpenSearch vs Managed Elastic decision",
      "The biggest hidden migration cost is reindex duration under realistic constraints, not template rewrites",
      "Shadow traffic comparison before flipping writes lets analysts validate relevance before cutover",
      "Dual-read is safer than dual-write; only adopt dual-write when write availability during the window is a hard requirement",
      "Test snapshot restore to a clean cluster with IAM and network paths verified before the cutover window opens",
    ],
    faqs: [
      F(
        "When is OpenSearch the pragmatic default?",
        "When licence economics, cloud portability, or in-house operational maturity favour an Apache-2.0 line and you can fund the engineering to own upgrades. The checklist is about fit, not ideology.",
      ),
      F(
        "What is the biggest hidden cost in search migrations?",
        "Reindex duration under realistic network and disk constraints, plus dashboard and security realm rewrites. Templates and ingest pipelines look small on a spreadsheet and large on cutover weekend.",
      ),
      F(
        "Should we dual-write or dual-read first?",
        "Most teams dual-read with shadow scoring comparisons before flipping writes, so analysts can trust relevance. Dual-write adds complexity - only do it when you must preserve write availability during the window.",
      ),
      F(
        "How does AiRAT support search estates?",
        "We architect and migrate OpenSearch-scale systems with cutover plans your on-call can execute - see data and search services and portfolio references where publishable.",
      ),
    ],
    bodyMarkdown: bodyJun,
  }),
  post({
    slug: "soc-automation-evidence-auditability",
    title: "SOC Automation That Survives the Audit: Evidence, Not Theatre",
    description:
      "Design SOAR and SOC automation so auditors - and your future self - get immutable context, not screenshots in tickets.",
    author: "AiRAT",
    publishedAt: "2025-07-14",
    tags: ["SOC", "SOAR", "SIEM", "compliance"],
    category: "cyber-soc",
    relatedSlugs: ["threat-informed-detection-engineering-practice", "case-based-thinking-platform-bids"],
    glossaryLinks: ["xdr", "siem", "soar"],
    keyTakeaways: [
      "SOC automation fails audits when it produces screenshots in tickets instead of immutable, timestamped evidence chains",
      "Every automated action must record: rule pack revision, policy version, approver identity, input artefact hashes, and ticket links",
      "Account disables, network isolation, and customer-visible actions must require human approval in the workflow  -  not tribal memory",
      "Dry-run modes and transparent scoring build analyst trust faster than any performance metric",
      "Publish weekly rule performance deltas so analysts see the programme listening to their feedback",
      "Audit survival requires evidence that stands alone  -  not context that lives only in analysts' heads",
    ],
    faqs: [
      F(
        "Which automations should never run without human approval?",
        "Anything customer-visible, legally sensitive, or hard to undo: account disables, isolation actions that take revenue paths offline, and outbound customer comms. Encode the list in workflow, not tribal memory.",
      ),
      F(
        "What evidence fields should every automated action include?",
        "Rule pack revision, policy version, principal who approved (if applicable), input artefact hashes, and links to tickets. If you cannot answer ‘why did this fire?’ in one screen, keep iterating.",
      ),
      F(
        "How do we reduce analyst mistrust of automation?",
        "Dry-run modes, transparent scoring, and fast disable switches. Publish weekly deltas of tuned vs noisy rules so analysts see the programme listening.",
      ),
      F(
        "Does AiRAT build SOC platforms?",
        "Yes - SIEM/XDR engineering, detection lifecycle, and evidence trails procurement can defend. Use the cybersecurity section on services for scope language.",
      ),
    ],
    bodyMarkdown: bodyJul,
  }),
  post({
    slug: "kyc-ml-pipelines-operational-debt",
    title: "KYC Pipelines: When ML Helps - and When It Becomes Operational Debt",
    description:
      "Route ML to triage first, instrument queues, and version policies with models - so KYC automation shortens review instead of hiding risk.",
    author: "AiRAT",
    publishedAt: "2025-08-11",
    tags: ["KYC", "ML", "workflows", "risk"],
    category: "playbooks",
    relatedSlugs: ["data-contracts-medallion-bronze-silver-gold", "governed-llm-apis-rate-limits-tenancy"],
    glossaryLinks: ["rag", "data-contract"],
    keyTakeaways: [
      "Route ML to triage and deduplication first; measure queue latency and override rates before automating adverse decisions",
      "If analysts re-type context after automation, your integration failed  -  not your model",
      "Version ML models and decision policies together so compliance can map any decision to the exact model and policy in force at that time",
      "Shadow spreadsheets are a signal that structured analyst decisions are not flowing back to systems of record",
      "Monthly compliance metrics must include decision latency percentiles, override rates, and incident counts tied to automation errors",
      "Avoid binary automation of KYC decisions; graduated automation with human escalation at exception thresholds is more defensible",
    ],
    faqs: [
      F(
        "What is the safest first ML step in KYC?",
        "Triage and deduplication with human decisions on exceptions - measure queue latency and override rates before you automate adverse actions.",
      ),
      F(
        "How do we avoid ‘shadow spreadsheets’ after automation?",
        "Export structured analyst decisions back to systems of record. If analysts re-type context, your integration failed - not your model.",
      ),
      F(
        "What metrics should compliance see monthly?",
        "Decision latency percentiles by segment, override rates, model and policy versions in production, and incident counts tied to automation errors.",
      ),
      F(
        "Where does AiRAT fit?",
        "Data pipelines, governed ML interfaces, and platform engineering for regulated workloads - see services for data and AI paths.",
      ),
    ],
    bodyMarkdown: bodyAug,
  }),
  post({
    slug: "llm-evaluation-frameworks-procurement",
    title: "LLM Evaluation Frameworks Your CFO Can Defend",
    description:
      "Offline suites, online probes, and spend dashboards - how to make LLM releases legible to finance and procurement, not only to ML.",
    author: "AiRAT",
    publishedAt: "2025-09-08",
    tags: ["LLM", "evaluation", "FinOps", "governance"],
    category: "ai-llm",
    relatedSlugs: ["rag-evaluation-ownership-production", "governed-llm-apis-rate-limits-tenancy"],
    glossaryLinks: ["rag"],
    keyTakeaways: [
      "LLM release gates must include regression suite IDs with pass/fail results, latency and cost percentiles, and a change note stakeholders can skim",
      "Human rubric reviews should run quarterly at minimum for production systems, monthly after major model upgrades",
      "Mirror critical vendor metrics into your own observability stack  -  you cannot be blind during vendor incidents",
      "FinOps dashboards for LLMs need per-model, per-feature cost attribution to make budget decisions defensible",
      "Procurement and finance teams need legible evaluation artefacts  -  suite IDs, version labels, baseline comparisons  -  not ML jargon",
      "Pre-defined performance thresholds tied to business SLOs make release decisions objective, not political",
    ],
    faqs: [
      F(
        "What should a release gate include for LLM features?",
        "Regression suite IDs with pass/fail, latency and cost percentiles against the prior baseline, and a short change note stakeholders can skim.",
      ),
      F(
        "How often should human rubric reviews run?",
        "Quarterly at minimum for production systems; monthly during early scale or after major model upgrades.",
      ),
      F(
        "Can we use vendor dashboards as the source of truth?",
        "Mirror critical metrics into your observability stack so finance and engineering read the same numbers - and so you are not blind during vendor incidents.",
      ),
      F(
        "How does AiRAT help?",
        "We implement evaluation harnesses, gateways, and observability for governed LLM systems - see AI services and portfolio case studies.",
      ),
    ],
    bodyMarkdown: bodySep,
  }),
  post({
    slug: "observability-ai-systems-logs-traces-outputs",
    title: "Observability for AI Systems: Logs, Traces, and Model Outputs",
    description:
      "Classify outputs, sample by risk tier, and split spans across retrieval and generation - without drowning SREs or compliance.",
    author: "AiRAT",
    publishedAt: "2025-10-13",
    tags: ["observability", "LLM", "tracing", "PII"],
    category: "ai-llm",
    relatedSlugs: ["rag-evaluation-ownership-production", "governed-llm-apis-rate-limits-tenancy"],
    glossaryLinks: ["rag"],
    keyTakeaways: [
      "Default to redacting full prompts at capture and retaining hashes  -  only log complete prompts when data classification explicitly allows it",
      "The five spans that matter in RAG traces: corpus snapshot ID, retrieval latency, rerank decisions, model revision, and token usage",
      "Sample by risk tier: higher sampling on regulated or high-value flows, lower on public FAQ  -  document and review the policy quarterly",
      "Separate AI observability from traditional APM: model outputs require semantic classifiers, not just latency histograms",
      "Output classifiers run before logging decisions  -  not as an afterthought  -  to prevent PII from entering log stores at scale",
      "Incident replay without dumping customer text requires enough metadata: corpus version, retrieval context hashes, and query representations",
    ],
    faqs: [
      F(
        "Should full prompts be logged?",
        "Only when data classification explicitly allows it. Default to redaction at capture and retain hashes or derived features for debugging.",
      ),
      F(
        "What spans matter most in RAG traces?",
        "Corpus snapshot ID, retrieval latency, rerank decisions, model revision, and token usage - enough to replay incidents without dumping customer text into dashboards.",
      ),
      F(
        "How do we pick sampling rates?",
        "By risk tier: higher sampling on regulated or high-value flows, lower on public FAQ - document the policy and review quarterly.",
      ),
      F(
        "Does AiRAT implement this stack?",
        "Yes, alongside platform SRE patterns - pair with our AI delivery and observability conversations on services.",
      ),
    ],
    bodyMarkdown: bodyOct,
  }),
  post({
    slug: "real-time-analytics-pipelines-sla-finance",
    title: "Real-Time Analytics Pipelines: Contracts, SLAs, and the Finance Readout",
    description:
      "Define freshness and restatement policy per metric, plan backpressure, and keep batch reconciliation as a safety net finance trusts.",
    author: "AiRAT",
    publishedAt: "2025-11-10",
    tags: ["streaming", "SLA", "data", "finance"],
    category: "data-search",
    relatedSlugs: ["data-contracts-medallion-bronze-silver-gold", "opensearch-vs-elastic-cutover-checklist"],
    glossaryLinks: ["medallion-architecture", "data-contract", "data-lake"],
    keyTakeaways: [
      "Finance teams distrust streaming dashboards because metric definitions, restatement rules, and batch reconciliation were never formalised",
      "Data contracts fix the politics; infrastructure fixes the latency  -  conflating the two produces solutions to the wrong problem",
      "Operational metrics that drive same-day decisions can stream; month-end close and audited KPIs usually need batch reconciliation with signed tolerances",
      "Define allowed lateness and restatement windows per metric before the pipeline is built, not after the first finance complaint",
      "Backpressure plans are architectural decisions, not operational responses  -  size queues for peak load at design time",
      "A metric catalogue stakeholders actually read is more valuable than any streaming architecture",
    ],
    faqs: [
      F(
        "Why do finance teams distrust streaming dashboards?",
        "Often because metric definitions, restatement rules, and reconciliation to batch truth were never written down. Contracts fix politics, not Flink.",
      ),
      F(
        "What belongs on the hot path vs batch?",
        "Operational metrics that drive same-day decisions can stream; month-end close and audited KPIs usually need batch reconciliation with signed tolerances.",
      ),
      F(
        "How do we handle late-arriving events?",
        "Agree allowed lateness and restatement windows per metric. Communicate changes in a metric catalogue stakeholders actually read.",
      ),
      F(
        "How does AiRAT deliver here?",
        "Medallion lakes, streaming, and search estates anchored to SLOs - see data services and case studies.",
      ),
    ],
    bodyMarkdown: bodyNov,
  }),
  post({
    slug: "elk-opensearch-migration-cutover-oncall",
    title: "ELK to OpenSearch Migrations: Cutover Plans That Respect On-Call",
    description:
      "Templates, ILM, shadow traffic, snapshot restore drills - how to migrate search and logs without inventing rollback at 03:00.",
    author: "AiRAT",
    publishedAt: "2025-12-08",
    tags: ["ELK", "OpenSearch", "migration", "on-call"],
    category: "data-search",
    relatedSlugs: ["opensearch-vs-elastic-cutover-checklist", "observability-ai-systems-logs-traces-outputs"],
    glossaryLinks: ["opensearch"],
    keyTakeaways: [
      "Shadow traffic must cover weekly and monthly traffic shapes before cutover  -  multiple weeks for customer-facing search, shorter for internal-only",
      "The minimum rollback artefact is a tested snapshot restore to a clean cluster with IAM, network paths, and a DNS switch documented on one page",
      "A named incident commander with rollback authority is required  -  shared accountability during cutover is no accountability",
      "ILM policy translation is one of the most common sources of post-cutover incidents; validate against production data volumes",
      "Template index mapping must match the target OpenSearch version  -  field type mismatches fail silently until query time",
      "Go/no-go criteria must be agreed and documented before the migration window opens, not negotiated during it",
    ],
    faqs: [
      F(
        "How long should shadow traffic run?",
        "Long enough to cover weekly and monthly traffic shapes - often multiple weeks for customer-facing search, shorter for internal-only if risk is lower.",
      ),
      F(
        "What is the minimum rollback artefact?",
        "Tested snapshot restore to a clean cluster, with IAM and network paths verified, plus a DNS or traffic switch documented in one page.",
      ),
      F(
        "Who should hold the pager during cutover?",
        "A named incident commander with authority to extend read-only windows or rollback - shared accountability is no accountability.",
      ),
      F(
        "Has AiRAT done OpenSearch migrations?",
        "Yes - see portfolio entries for search and observability estates where references are publishable.",
      ),
    ],
    bodyMarkdown: bodyDec,
  }),
  post({
    slug: "case-based-thinking-platform-bids",
    title: "Case-Based Thinking for Platform Bids: From Incident to Architecture",
    description:
      "Win technical selection with incident-shaped narratives, SLO language, and appendices procurement can forward - without NDA becoming vagueness.",
    author: "AiRAT",
    publishedAt: "2026-01-12",
    tags: ["sales engineering", "SLO", "procurement", "platform"],
    category: "case-thinking",
    relatedSlugs: ["soc-automation-evidence-auditability", "rag-evaluation-ownership-production"],
    glossaryLinks: ["xdr", "rag"],
    keyTakeaways: [
      "Incident-shaped narratives beat feature matrices in technical selection: incident class, constraints, architecture choices, and measured outcomes",
      "Anonymise names under NDA  -  not metrics or methodology; buyers defend numbers, not adjectives",
      "SLO language that ties to the buyer's existing error budgets and operational metrics resonates more than invented vanity KPIs",
      "Appendices with RACI and rollback plans let legal and procurement teams forward your document without engineering present",
      "A single crisp problem statement that resonates with the buyer's lived experience is worth more than ten technical differentiators",
      "Senior engineers who can stand behind architecture in live reviews are a competitive advantage over polished slide decks",
    ],
    faqs: [
      F(
        "What beats a feature matrix in a shortlist defence?",
        "A crisp story: incident class, constraints, architecture choices, and measured outcomes - plus appendices with RACI and rollback that legal can skim.",
      ),
      F(
        "How specific can we be under NDA?",
        "Anonymise names, not metrics or methodology. Buyers defend numbers, not adjectives.",
      ),
      F(
        "What SLO language resonates with enterprise buyers?",
        "Tie to their existing error budgets and operational metrics - MTTR, latency percentiles, audit findings closed - not invented vanity KPIs.",
      ),
      F(
        "How does AiRAT support bids?",
        "We bring senior engineers who can stand behind architecture in live reviews - start with a strategy call and relevant case studies.",
      ),
    ],
    bodyMarkdown: bodyJan,
  }),
  post({
    slug: "threat-informed-detection-engineering-practice",
    title: "Building a Threat-Informed Detection Engineering Practice",
    description:
      "Prioritise TTPs from your sector, apply code-quality practices to rules, and retire noise explicitly - without treating MITRE coverage as a scoreboard.",
    author: "AiRAT",
    publishedAt: "2026-02-09",
    tags: ["detection", "MITRE", "SOC", "engineering"],
    category: "cyber-soc",
    relatedSlugs: ["soc-automation-evidence-auditability", "case-based-thinking-platform-bids"],
    glossaryLinks: ["xdr", "siem", "mitre-attck"],
    keyTakeaways: [
      "Optimise detection content for the incident classes your sector actually faces, not for MITRE ATT&CK coverage percentage",
      "Unit tests for detections mean version-controlled rules with CI replay against representative telemetry fixtures",
      "Retiring noisy rules requires published override rates and last true positives  -  not political negotiation",
      "Detection-as-code practices  -  peer review, changelog, version control  -  apply the same quality bar as application engineering",
      "Threat intelligence without a prioritisation framework produces a firehose that overwhelms rather than guides the detection programme",
      "MITRE heatmaps are communication tools, not optimisation targets; the target is incident classes you actually face",
    ],
    faqs: [
      F(
        "Do we need a MITRE heatmap on the wall?",
        "Communication tools help, but optimise for incidents you actually see and business risk - not colouring every cell green.",
      ),
      F(
        "What does ‘unit tests for detections’ mean in practice?",
        "Version-controlled rules with CI replay against representative telemetry fixtures, plus reviewer checklists for edge cases.",
      ),
      F(
        "How do we retire noisy rules without political drama?",
        "Publish override rates and last true positives; require owners to defend or sunset rules on a cadence.",
      ),
      F(
        "Does AiRAT staff detection engineering?",
        "Yes, alongside SIEM/XDR platform work - see cybersecurity services.",
      ),
    ],
    bodyMarkdown: bodyFeb,
  }),
  post({
    slug: "data-contracts-medallion-bronze-silver-gold",
    title: "Data Contracts in Medallion Lakes: Bronze Is Not a Junk Drawer",
    description:
      "Enforce producer SLAs and CI-tested contracts at Bronze and Silver so Gold metrics survive audits and new hires in finance.",
    author: "AiRAT",
    publishedAt: "2026-03-10",
    tags: ["data contracts", "medallion", "governance", "lake"],
    category: "playbooks",
    relatedSlugs: ["real-time-analytics-pipelines-sla-finance", "kyc-ml-pipelines-operational-debt"],
    glossaryLinks: ["medallion-architecture", "data-contract", "data-lake"],
    keyTakeaways: [
      "Bronze is not a junk drawer: enforce producer SLAs and CI-tested contracts at ingestion, or every downstream layer inherits the technical debt",
      "The smallest useful data contract specifies producer, consumer, schema evolution rules, freshness SLA, and tests that fail CI when upstream drifts",
      "A named data producer with on-call rotation owns Bronze ingestion approvals  -  not 'the platform team' as a vague sponge",
      "Gold metrics require semantic definitions readable outside engineering and column-level lineage to Silver tests stakeholders can inspect",
      "CI-tested schema contracts catch breaking changes before they reach Gold  -  the cost of a schema mismatch is paid at commit, not at quarter-close",
      "Medallion architecture without enforced contracts is just a folder structure with aspirational naming",
    ],
    faqs: [
      F(
        "What is the smallest useful data contract?",
        "Producer, consumer, schema evolution rules, freshness SLA, and tests that fail CI when upstream drifts beyond agreed bounds.",
      ),
      F(
        "Who owns Bronze ingestion approvals?",
        "A named data producer with on-call rotation - not ‘the platform team’ as a vague sponge.",
      ),
      F(
        "How do we keep Gold trustworthy?",
        "Semantic definitions readable outside engineering, with column-level lineage to Silver tests stakeholders can inspect.",
      ),
      F(
        "How does AiRAT implement medallion estates?",
        "Bronze/Silver/Gold with governance that survives audits - see data services and tier-one case references where allowed.",
      ),
    ],
    bodyMarkdown: bodyMar,
  }),
  post({
    slug: "governed-llm-apis-rate-limits-tenancy",
    title: "Governed LLM APIs: Rate Limits, Tenancy, and Abuse Controls at Scale",
    description:
      "Per-tenant token budgets, isolated caches, and human-reviewed abuse edges - how to ship multi-tenant LLM gateways finance and security can trust.",
    author: "AiRAT",
    publishedAt: "2026-04-07",
    tags: ["LLM", "API", "multi-tenant", "abuse"],
    category: "ai-llm",
    relatedSlugs: ["llm-evaluation-frameworks-procurement", "observability-ai-systems-logs-traces-outputs"],
    glossaryLinks: ["rag"],
    keyTakeaways: [
      "Per-tenant token and concurrency budgets with clear 429 semantics and Retry-After headers are the foundation  -  before exotic abuse classifiers",
      "Cache keys and namespaces must be tenant-scoped; shared embedding stores without strict partitioning create cross-tenant leakage risk",
      "Volume spikes, banned-topic patterns, and spend anomalies are the three abuse signals worth automating first",
      "Human review queues for borderline abuse cases prevent automation from becoming a liability in regulated environments",
      "Governance artefacts  -  PII boundaries, audit trails, rate limit policies  -  must be documented before models touch production data",
      "Multi-tenant LLM gateways require the same security engineering as multi-tenant SaaS: assume tenants attempt to reach each other",
    ],
    faqs: [
      F(
        "What is the first rate limit we should implement?",
        "Per-tenant token and concurrency budgets with clear 429 semantics and Retry-After - before exotic abuse classifiers.",
      ),
      F(
        "How do we prevent cross-tenant cache leakage?",
        "Namespace caches and keys by tenant, assume timing attacks matter, and avoid shared embedding stores without strict partitioning.",
      ),
      F(
        "What abuse signals are worth automating first?",
        "Volume spikes, banned-topic patterns, and spend anomalies - with human review queues for borderline cases.",
      ),
      F(
        "Can AiRAT review our gateway design?",
        "Yes - book a strategy call with your constraints and traffic expectations; we ship governed LLM stacks to production.",
      ),
    ],
    bodyMarkdown: bodyApr,
  }),
  post({
    slug: "ai-overviews-inline-citations-seo-2026",
    title: "Google AI Overviews Inline Citations: The End of Rank-and-Click SEO",
    description:
      "Google's May 2026 inline citation rollout decouples ranking from visibility. How to optimise for citation-based GEO when rank no longer guarantees traffic.",
    author: "AiRAT",
    publishedAt: "2026-05-05",
    tags: ["GEO", "SEO", "AI Overviews", "inline citations", "brand visibility"],
    category: "ai-llm",
    relatedSlugs: ["geo-why-seo-not-enough-2025", "llm-citation-patterns", "entity-seo-knowledge-graph"],
    glossaryLinks: ["geo", "rag"],
    keyTakeaways: [
      "Google's May 2026 inline citations place source links next to the specific text they support  -  brands cited in AI answers are visible at the point of consumption",
      "The correlation between traditional organic ranking and AI Overview citation has collapsed; source-worthiness is evaluated independently of rank",
      "Expert Advice blocks specifically reward first-hand expertise, original data, and practitioner perspectives  -  generic aggregated content is excluded",
      "Click-through rates for traditional organic results on AI Overview pages have declined by as much as 61%, accelerating zero-click behaviour",
      "SEO success in 2026 is measured by citation frequency and brand authority, not just organic traffic volume",
      "Enterprise brands need parallel SEO and GEO programmes  -  they share technical foundations but target different visibility surfaces",
    ],
    faqs: [
      F(
        "What is the difference between SEO and GEO?",
        "SEO optimises for ranking in traditional search results. GEO (Generative Engine Optimisation) optimises for citation and accurate representation in AI-generated answers  -  Google AI Overviews, ChatGPT, Perplexity, and Claude. Both share technical foundations but target different visibility surfaces.",
      ),
      F(
        "Will AI Overviews eliminate organic search traffic?",
        "Not entirely. Transactional and navigational queries still drive significant click-through. Informational queries are seeing reduced CTR as AI provides complete answers. The shift is from all-traffic-through-clicks to visibility through citations plus clicks.",
      ),
      F(
        "How do I get cited in Google's Expert Advice blocks?",
        "Publish content with demonstrable first-hand experience: proprietary data, case study outcomes, methodology documentation, and practitioner perspectives. Generic aggregated content is systematically excluded.",
      ),
      F(
        "Does AiRAT help with GEO strategy?",
        "Yes  -  our AEO and GEO service covers AI brand presence audits, content restructuring for answer-first retrieval, entity authority building, and citation monitoring across major AI platforms.",
      ),
    ],
    bodyMarkdown: bodyMay26W1,
  }),
  post({
    slug: "agentic-ai-governance-identity-enterprise",
    title: "Agentic AI in Production: Governance, Identity, and the Control Plane Gap",
    description:
      "Enterprises deploy agents faster than they can audit them. Control planes, scoped identities, and kill switches  -  the governance architecture agentic AI requires.",
    author: "AiRAT",
    publishedAt: "2026-05-12",
    tags: ["agentic AI", "governance", "IAM", "control plane", "enterprise"],
    category: "ai-llm",
    relatedSlugs: ["governed-llm-apis-rate-limits-tenancy", "observability-ai-systems-logs-traces-outputs", "llm-evaluation-frameworks-procurement"],
    glossaryLinks: ["rag", "zero-trust"],
    keyTakeaways: [
      "A centralised control plane  -  agent registry, policy enforcement, kill switches, audit trails, and cost boundaries  -  is required for production agentic AI",
      "Traditional IAM fails for agents: implement JIT permissions with TTLs, enforce control plane registration to prevent shadow agents, and verify trust at every delegation boundary",
      "Multi-agent orchestration introduces non-linear complexity: race conditions, cascading failures, and unreproducible errors requiring circuit breakers and reasoning chain logging",
      "Cost governance must include per-agent budgets, per-workflow caps, anomaly detection, and cost attribution to business functions",
      "Human-in-the-loop requirements should be encoded in control plane policy, covering irreversible, customer-visible, and financially material actions",
      "Organisations succeeding with agentic AI in 2026 adopted governance-first architectures  -  not governance as a retrofit",
    ],
    faqs: [
      F(
        "What is a control plane for agentic AI?",
        "A centralised enforcement layer that provides an agent registry, runtime policy enforcement, kill switches, immutable audit trails, and cost boundaries. It answers: how many agents are in production, what can they access, who approved them, and what are they doing right now.",
      ),
      F(
        "How is agentic AI identity different from traditional IAM?",
        "Traditional IAM assumes a human decision-maker. Agents need scoped, time-bound, auditable identities with just-in-time permission grants, automatic expiration, and cryptographic trust verification at delegation boundaries.",
      ),
      F(
        "What are shadow agents and why are they dangerous?",
        "Shadow agents are autonomous systems operating outside organisational governance  -  deployed with personal API keys or running on developer machines without control plane registration. They can take actions in production without any visibility or oversight.",
      ),
      F(
        "Can AiRAT help with agentic AI governance?",
        "Yes  -  we design governance architectures, control plane implementations, and observability stacks for agentic AI deployments. Book a strategy session to discuss your current agent landscape.",
      ),
    ],
    bodyMarkdown: bodyMay26W2,
  }),
  post({
    slug: "deepfake-resistant-authentication-enterprise",
    title: "Deepfake-Resistant Authentication: Securing Enterprise Identity in 2026",
    description:
      "Standalone identity verification fails against AI deepfakes. Layered continuous authentication, biological signal detection, and procedural controls that survive synthetic media.",
    author: "AiRAT",
    publishedAt: "2026-05-19",
    tags: ["deepfake", "authentication", "identity", "biometrics", "zero-trust"],
    category: "cyber-soc",
    relatedSlugs: ["soc-automation-evidence-auditability", "threat-informed-detection-engineering-practice"],
    glossaryLinks: ["zero-trust", "xdr", "mdr"],
    keyTakeaways: [
      "Standalone identity verification is no longer sufficient  -  deepfake attacks require layered, continuous, risk-based authentication combining device integrity, behavioural biometrics, and biological signal analysis",
      "Real-time video call impersonation is the most dangerous enterprise deepfake vector  -  participants have no reason to question what they see and hear without technical detection",
      "Biological signal analysis (sub-surface scattering, blood flow patterns, micro-expression timing) represents the detection frontier",
      "Procedural controls  -  out-of-band verification, pre-agreed passphrases, callback protocols  -  remain the most robust defence layer",
      "FIDO passkeys eliminate the credential layer that deepfake attacks typically exploit as a precursor  -  deploy them enterprise-wide",
      "Every organisation needs a deepfake-specific incident response playbook with containment, evidence preservation, and verified communication protocols",
    ],
    faqs: [
      F(
        "Can current AI deepfakes defeat enterprise video authentication?",
        "Yes. Commodity deepfake tools can produce real-time synthetic video and audio that defeats visual inspection and basic biometric matching under normal conditions. Reliable detection requires multimodal analysis or biological signal analysis.",
      ),
      F(
        "What is the single most effective defence against deepfake impersonation?",
        "Procedural controls  -  particularly out-of-band verification through pre-registered channels and pre-agreed verbal passphrases. These controls do not depend on the authenticity of what is seen or heard.",
      ),
      F(
        "Should we implement deepfake detection in our video conferencing tools?",
        "Yes, for high-risk interactions. Solutions now embed directly into Zoom, Teams, and call centre platforms for real-time analysis. Prioritise deployment for executive communications and financial authorisations.",
      ),
      F(
        "Can AiRAT help with deepfake-resistant security architecture?",
        "Yes  -  we design authentication architectures, detection integrations, and incident response playbooks for synthetic media threats as part of our cybersecurity and SOC services.",
      ),
    ],
    bodyMarkdown: bodyMay26W3,
  }),
  post({
    slug: "self-healing-data-pipelines-ai-native",
    title: "Self-Healing Data Pipelines: From Brittle ETL to AI-Native Engineering",
    description:
      "Autonomous diagnosis, schema drift adaptation, and LLM-driven remediation  -  architectural patterns for data pipelines that fix themselves within contract bounds.",
    author: "AiRAT",
    publishedAt: "2026-05-25",
    tags: ["data engineering", "self-healing", "AI-native", "data contracts", "observability"],
    category: "data-search",
    relatedSlugs: ["data-contracts-medallion-bronze-silver-gold", "real-time-analytics-pipelines-sla-finance", "elk-opensearch-migration-cutover-oncall"],
    glossaryLinks: ["data-contract", "medallion-architecture", "data-lake", "opensearch"],
    keyTakeaways: [
      "Self-healing pipelines operate on graduated response levels: automatic retry, schema drift adaptation, root cause diagnosis, and automated remediation within defined guardrails",
      "AI-native pipelines produce vectors, embeddings, and structured context for AI systems  -  the pipeline is the memory layer for AI agents",
      "Data contracts are non-negotiable for AI-serving pipelines: they define boundary conditions for automated adaptation and prevent self-propagating errors",
      "The centaur model  -  AI agents for execution, humans for architecture and judgment  -  delivers 25-50 percent productivity gains",
      "Intelligent observability has moved from reactive alerting to pattern learning, predictive bottleneck detection, and automatic downstream impact analysis",
      "Schema drift, credential expiration, and upstream API changes are the three most common pipeline failures  -  all candidates for automated remediation",
    ],
    faqs: [
      F(
        "What is the difference between self-healing and auto-retry?",
        "Auto-retry handles transient failures with repeated attempts. Self-healing is a graduated system that also detects schema drift, diagnoses root causes, and executes remediation actions within defined guardrails. Auto-retry is level 1; self-healing includes levels 2 through 4.",
      ),
      F(
        "Do self-healing pipelines eliminate the need for data engineers?",
        "No. They shift the role from builder to architect. Engineers define policies, set guardrails, make architecture decisions, and provide quality judgment. AI agents handle routine execution and maintenance.",
      ),
      F(
        "What is the risk of automated pipeline remediation?",
        "Without data contracts and guardrails, automated remediation can propagate errors faster than manual processes. Contracts define the boundary between acceptable adaptation and human escalation.",
      ),
      F(
        "Can AiRAT implement self-healing data pipelines?",
        "Yes  -  we design and implement AI-native data architectures with self-healing patterns, data contracts, and intelligent observability. See our data and search services.",
      ),
    ],
    bodyMarkdown: bodyMay26W4,
  }),
];

export const BLOG_POSTS: BlogPost[] = [...RAW].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function getPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined;
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  const bySlug = new Map(BLOG_POSTS.map((p) => [p.slug, p] as const));
  const out: BlogPost[] = [];
  for (const s of post.relatedSlugs) {
    const p = bySlug.get(s);
    if (p && p.slug !== post.slug) out.push(p);
  }
  return out.slice(0, 3);
}

/** Newest first, for home / cross-sell strips */
export function getLatestPosts(count: number): BlogPost[] {
  return BLOG_POSTS.slice(0, count);
}
