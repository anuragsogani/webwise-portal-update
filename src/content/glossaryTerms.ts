/** AiRAT Glossary  -  production-grade definitions for AI search visibility (AEO/GEO) */

export type GlossaryTerm = {
  readonly slug: string;
  readonly term: string;
  readonly shortDef: string;
  readonly categoryLabel: string;
  readonly body: readonly string[];
  readonly examples: readonly { readonly label: string; readonly detail: string }[];
  readonly faqs: readonly { readonly q: string; readonly a: string }[];
  readonly relatedSlugs: readonly string[];
  readonly seoTitle: string;
  readonly seoDescription: string;
  readonly schema?: {
    readonly termCode?: string;
    readonly inDefinedTermSet?: string;
  };
};

export const GLOSSARY_TERMS: readonly GlossaryTerm[] = [
  {
    slug: "xdr",
    term: "XDR",
    shortDef: "Extended Detection and Response  -  a cybersecurity architecture that unifies telemetry from endpoints, networks, cloud, and identity into a single correlated investigation timeline.",
    categoryLabel: "Cybersecurity",
    body: [
      "XDR (Extended Detection and Response) is a security architecture that consolidates telemetry from endpoints (EDR), networks (NTA/NDR), cloud workloads (CWPP), and identity systems into a single, correlated investigation timeline. Unlike siloed tools such as EDR or SIEM operating independently, XDR correlates events across surfaces to surface root-cause context rather than individual alerts.",
      "A mature XDR platform reduces mean-time-to-detect (MTTD) by giving tier-one analysts a unified view of an incident's full context  -  lateral movement paths, process ancestry, network edges, and identity changes  -  in one investigation shell rather than five browser tabs. It also reduces mean-time-to-respond (MTTR) by enabling policy-driven automated responses for high-confidence, low-risk alert classes.",
      "XDR differs from SIEM (Security Information and Event Management) in its emphasis on correlation and context over log aggregation and compliance reporting. Modern deployments often use both: SIEM for long-term retention, compliance evidence, and threat-hunting; XDR for real-time detection, enrichment, and response orchestration.",
      "AiRAT builds XDR platforms with detection logic, enrichment pipelines, and evidence trails agreed with security and compliance teams before deployment. The csoc platform  -  delivered for a UAE enterprise SOC  -  reduced alert noise by 87% and MTTD by 60% in the first month after go-live.",
    ],
    examples: [
      {
        label: "Alert consolidation",
        detail: "A lateral movement event spanning three endpoints, two cloud identities, and a firewall rule change produces one correlated case in XDR  -  not 47 individual alerts that never get triaged.",
      },
      {
        label: "Automated response",
        detail: "An XDR policy isolates a compromised endpoint and revokes its active session tokens automatically when a high-confidence ransomware indicator is detected, while logging every action for audit review.",
      },
      {
        label: "Evidence trail",
        detail: "Forensic timeline with MITRE ATT&CK tactic tags, alert confidence scores, enrichment sources, and analyst decisions  -  all immutable and exportable for compliance review.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between XDR and SIEM?",
        a: "SIEM (Security Information and Event Management) aggregates and retains logs for compliance reporting and threat hunting. XDR focuses on real-time detection, cross-source correlation, and response orchestration. Modern security programmes use both: SIEM for retention and compliance evidence, XDR for detection fidelity and response speed. Some vendors market 'XDR-enabled SIEM'  -  evaluate whether correlation is genuine or marketing labelling.",
      },
      {
        q: "What is the difference between XDR and EDR?",
        a: "EDR (Endpoint Detection and Response) covers endpoint telemetry  -  process events, file changes, and network connections on managed devices. XDR extends this to network, cloud, and identity surfaces, providing cross-source correlation that EDR alone cannot offer. XDR typically replaces multiple point tools with a unified investigation interface.",
      },
      {
        q: "How long does an XDR implementation take?",
        a: "A greenfield XDR deployment for a 500-analyst SOC typically takes 12–20 weeks from architecture review to production go-live, covering data source integration, detection rule tuning, automation policy review, and analyst training. Legacy system migration adds 4–8 weeks depending on connector complexity.",
      },
      {
        q: "Does AiRAT build custom XDR platforms?",
        a: "Yes  -  AiRAT designs and deploys production XDR systems tailored to your environment, threat model, and compliance requirements. We have delivered multi-tenant XDR and SIEM platforms for UAE enterprise SOC teams. Book a strategy call to discuss your detection engineering requirements.",
      },
    ],
    relatedSlugs: ["rag", "geo"],
    seoTitle: "XDR Explained | Extended Detection and Response | AiRAT Glossary",
    seoDescription:
      "What is XDR? A clear definition of Extended Detection and Response  -  how it differs from SIEM and EDR, how it reduces MTTD, and what a production XDR implementation looks like in a regulated enterprise SOC.",
    schema: {
      termCode: "XDR",
      inDefinedTermSet: "AiRAT Cybersecurity Glossary",
    },
  },
  {
    slug: "rag",
    term: "RAG",
    shortDef: "Retrieval-Augmented Generation  -  an AI architecture that grounds LLM responses in retrieved documents rather than relying solely on parametric training knowledge.",
    categoryLabel: "AI & LLM Systems",
    body: [
      "RAG (Retrieval-Augmented Generation) is an AI architecture that combines a retrieval system with a large language model (LLM) to produce factually grounded responses. When a query arrives, the retrieval layer (typically a vector store or semantic search index) retrieves relevant documents from a curated knowledge base. These retrieved chunks are injected into the LLM's context window as grounding material before the model generates a response.",
      "RAG solves the core problem of LLM hallucination for knowledge-intensive tasks: without retrieval, a model answers from its parametric training knowledge, which may be outdated, incomplete, or inaccurate for domain-specific questions. With retrieval, answers are grounded in current, authoritative source documents  -  and citations can be surfaced so users can verify responses.",
      "A production RAG system comprises several interdependent components: a document ingestion and chunking pipeline, an embedding model that converts text to dense vector representations, a vector store for approximate nearest-neighbour retrieval, a reranker that scores retrieved chunks for relevance, and an LLM that generates responses conditioned on retrieved context. Evaluation harnesses and drift monitoring are required to maintain quality over time as documents and user queries evolve.",
      "AiRAT builds production RAG systems with evaluation harnesses, PII boundaries, human review checkpoints, and observability designed from the first sprint. One FinTech client's legal team now queries 2.5 million documents in 40 seconds  -  work that previously required three days of analyst time.",
    ],
    examples: [
      {
        label: "Legal document retrieval",
        detail: "A FinTech compliance team queries a 2.5M-document repository in natural language. RAG retrieves the five most relevant policy clauses, grounds the LLM's response in those specific documents, and surfaces citations so analysts can verify each claim.",
      },
      {
        label: "SOC threat intelligence",
        detail: "A SOC analyst asks 'what tactics does Lazarus Group typically use for initial access?'  -  RAG retrieves current threat intel reports, IOC databases, and previous case notes, grounding the LLM's answer in live intelligence rather than training-time knowledge.",
      },
      {
        label: "Product support automation",
        detail: "A customer support RAG system retrieves relevant FAQ chunks and release notes for each query, grounding responses in current documentation rather than generating plausible-but-incorrect answers from model parameters.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between RAG and fine-tuning?",
        a: "Fine-tuning adapts a model's weights on domain-specific data  -  improving style, tone, and domain vocabulary, but not guaranteeing up-to-date factual accuracy. RAG retrieves current documents at inference time, providing factual grounding without modifying model weights. Most production AI systems use both: fine-tuning for domain adaptation and RAG for knowledge currency and citation support.",
      },
      {
        q: "What causes RAG to fail in production?",
        a: "The most common production failures are: poor chunking strategy (chunks too large or too small lose context or miss relevant passages); embedding model mismatch (embedding model trained on different domain than retrieval corpus); retrieval recall failure (relevant documents not retrieved due to vocabulary gaps or poor query expansion); and reranker drift (reranker scores degrade as corpus grows and is not re-evaluated). AiRAT builds evaluation harnesses that catch each failure class before it reaches users.",
      },
      {
        q: "How do you evaluate RAG quality in production?",
        a: "A robust RAG evaluation stack covers: retrieval recall and precision (are the right chunks being retrieved?), faithfulness (does the generated answer stay grounded in retrieved documents?), answer relevance (does the answer address the query?), and context utilisation (is retrieved context being used, or is the model ignoring it?). Continuous monitoring of these metrics alongside business proxies (task completion rate, escalation rate) is required after go-live.",
      },
      {
        q: "Does AiRAT build RAG systems?",
        a: "Yes  -  RAG pipeline design, evaluation harness implementation, and production monitoring are core to our AI & LLM Systems service. We have delivered governed RAG systems for FinTech, legal, and SOC environments. Book a strategy call to scope your RAG programme.",
      },
    ],
    relatedSlugs: ["xdr", "geo"],
    seoTitle: "RAG Explained | Retrieval-Augmented Generation | AiRAT Glossary",
    seoDescription:
      "What is RAG? A production-grade definition of Retrieval-Augmented Generation  -  how retrieval grounds LLM responses, what makes RAG fail in production, and how AiRAT builds and evaluates RAG systems.",
    schema: {
      termCode: "RAG",
      inDefinedTermSet: "AiRAT AI & LLM Glossary",
    },
  },
  {
    slug: "geo",
    term: "GEO",
    shortDef: "Generative Engine Optimisation  -  the discipline of structuring content, building entity signals, and implementing technical foundations that improve brand visibility in AI-generated search responses.",
    categoryLabel: "AI Search & Visibility",
    body: [
      "GEO (Generative Engine Optimisation) is the discipline of improving the probability that an AI-powered system  -  ChatGPT, Perplexity, Claude, or Google AI Overviews  -  retrieves, accurately represents, and cites your brand in its generated responses. As AI assistants absorb a growing share of information queries, traditional SEO's focus on link-building and keyword ranking is insufficient for brands that need to be discoverable inside LLM-generated answers.",
      "GEO extends the established practice of SEO with three additional disciplines: entity optimisation (ensuring AI systems correctly identify and represent your brand as a distinct entity), content structuring for retrieval (formatting content so LLM retrieval systems can extract precise, citable answers), and authority signal building (ensuring your brand appears in data sources that are well-represented in LLM training data  -  Wikipedia, Wikidata, analyst reports, trade publications).",
      "GEO differs from traditional SEO in its target surface. SEO optimises for blue-link ranking on search engine results pages (SERPs). GEO optimises for retrieval and citation within AI-generated text responses that may contain no traditional links. Both surfaces matter: Gartner (2024) forecasts a 25% decline in traditional search engine queries by 2026 as AI assistants absorb them, but significant search volume remains in traditional SERPs.",
      "AiRAT builds GEO programmes as part of its AI visibility and AEO service. This includes structured content audit, FAQPage and other schema markup implementation, entity clarity work across owned and third-party properties, and systematic monitoring of brand presence across major AI platforms.",
    ],
    examples: [
      {
        label: "FAQ schema optimisation",
        detail: "A company implements FAQPage JSON-LD on its key service pages with clear, concise Q&A pairs. These structured answers are retrieved more reliably by AI systems seeking factual responses to related queries.",
      },
      {
        label: "Entity signal building",
        detail: "An Organisation schema implementation on the homepage, consistent LinkedIn and Crunchbase profiles, and a Wikidata entry together create consistent entity signals that help AI systems correctly identify and represent a brand.",
      },
      {
        label: "Answer-first content restructuring",
        detail: "Key product and service pages are restructured so each H2 section opens with a clear, direct answer to the implied question before providing supporting detail  -  improving the probability that the opening sentence is retrieved and cited.",
      },
    ],
    faqs: [
      {
        q: "Is GEO replacing traditional SEO?",
        a: "No. Traditional organic search still drives significant discovery traffic. GEO extends visibility to surfaces SEO alone cannot reach: AI-generated answers in ChatGPT, Perplexity, Claude, and Google AI Overviews. The most effective strategies run both in parallel, with shared content quality and entity signal foundations.",
      },
      {
        q: "How long does it take to see GEO results?",
        a: "Changes in RAG-augmented systems like Perplexity typically reflect within 4–8 weeks of content updates, as retrieval indexes update regularly. Changes to LLM parametric knowledge (how a model answers without retrieval) require training cycle inclusion and may take significantly longer. Focus initial GEO investment on RAG-augmented systems for fastest measurable results.",
      },
      {
        q: "What is AEO and how does it relate to GEO?",
        a: "AEO (Answer Engine Optimisation) is the practice of structuring content to appear in traditional search answer features  -  Featured Snippets, People Also Ask, Knowledge Panels. GEO extends this to AI-generated responses from LLM-powered systems. The two disciplines share content quality and entity signal foundations but target different technical retrieval mechanisms.",
      },
      {
        q: "Does AiRAT provide GEO services?",
        a: "Yes  -  AiRAT's AI Visibility service covers GEO and AEO strategy, structured content audits, schema markup implementation, entity signal building, and ongoing AI brand presence monitoring. Book a strategy call to discuss your current AI search visibility.",
      },
    ],
    relatedSlugs: ["xdr", "rag"],
    seoTitle: "GEO Explained | Generative Engine Optimisation | AiRAT Glossary",
    seoDescription:
      "What is GEO? A clear definition of Generative Engine Optimisation  -  how it differs from SEO, what makes content retrievable by AI systems, and how AiRAT builds GEO strategies for enterprise brands.",
    schema: {
      termCode: "GEO",
      inDefinedTermSet: "AiRAT AI Search Glossary",
    },
  },
  {
    slug: "siem",
    term: "SIEM",
    shortDef: "Security Information and Event Management  -  a platform that aggregates, correlates, and retains security event logs across an organisation for threat detection, compliance reporting, and forensic investigation.",
    categoryLabel: "Cybersecurity",
    body: [
      "SIEM (Security Information and Event Management) is the central log aggregation and correlation platform in a modern SOC. It ingests events from firewalls, endpoint agents, identity systems, cloud APIs, and application logs  -  normalising them into a common schema so analysts can write detection rules, build dashboards, and run threat hunts across the entire environment in a single query interface.",
      "Modern SIEM platforms combine real-time streaming ingestion with long-term retention (often 12–24 months for compliance) and support scheduled or interactive queries against cold storage. Detection engineering teams maintain libraries of SIEM rules  -  written in languages like Sigma, SPL, KQL, or Elasticsearch Query Language  -  that fire alerts when telemetry matches known attacker behaviours or anomalous baselines.",
      "SIEM differs from XDR in its emphasis on retention, compliance evidence, and customisable detection engineering over out-of-the-box correlation. Most mature security programmes run both: SIEM for long-term data and bespoke detection, XDR for real-time multi-source correlation and automated response. AiRAT builds custom SIEM deployments using Elasticsearch/OpenSearch and Splunk  -  tuning detection libraries to the client's threat model rather than shipping vendor defaults.",
    ],
    examples: [
      {
        label: "Compliance reporting",
        detail: "A SIEM retains 18 months of authentication logs and generates automated evidence packs for PCI-DSS and ISO 27001 audits  -  reducing audit preparation from weeks to hours.",
      },
      {
        label: "Threat hunting",
        detail: "An analyst queries the SIEM for DNS requests matching a newly published IoC list, pivoting across 90 days of logs to identify devices that communicated with the malicious domain before the indicator was published.",
      },
      {
        label: "Detection rule library",
        detail: "500+ Sigma rules maintained in version control, tested against a synthetic telemetry dataset on every merge, and automatically deployed to the production SIEM via CI/CD pipeline.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between SIEM and XDR?",
        a: "SIEM is primarily a log aggregation, retention, and compliance platform with flexible custom detection. XDR focuses on real-time multi-source correlation, enrichment, and automated response. Modern SOCs use both: SIEM for long-term retention and compliance evidence, XDR for detection fidelity. The boundary is blurring as vendors add features to both  -  evaluate based on your primary use case.",
      },
      {
        q: "What log sources should a SIEM ingest?",
        a: "Priority log sources: endpoint agents (process, network, file events), firewall and network telemetry, identity provider logs (Active Directory, Okta), cloud API activity logs (AWS CloudTrail, Azure Monitor), and application authentication logs. Start with the highest-signal sources for your threat model rather than ingesting everything and drowning in noise.",
      },
      {
        q: "How do you reduce SIEM alert fatigue?",
        a: "Alert fatigue reduction requires detection engineering discipline: tune rule thresholds against your baseline, suppress known-good automated processes, enrich alerts with asset criticality and user context before they reach analysts, and enforce a detection lifecycle  -  rules that generate no true positives in 90 days should be retired or retuned.",
      },
    ],
    relatedSlugs: ["xdr", "soar", "mdr"],
    seoTitle: "SIEM Explained | Security Information and Event Management | AiRAT Glossary",
    seoDescription: "What is SIEM? A clear definition of Security Information and Event Management  -  how it works, how it differs from XDR, and how production SIEM deployments are tuned for detection quality in enterprise SOCs.",
    schema: { termCode: "SIEM", inDefinedTermSet: "AiRAT Cybersecurity Glossary" },
  },
  {
    slug: "soar",
    term: "SOAR",
    shortDef: "Security Orchestration, Automation and Response  -  a platform that automates repeatable SOC workflows (alert triage, enrichment, containment) using playbooks, reducing analyst toil on high-volume, low-complexity cases.",
    categoryLabel: "Cybersecurity",
    body: [
      "SOAR (Security Orchestration, Automation and Response) platforms connect a SOC's tools  -  SIEM, ticketing, threat intelligence, EDR, firewalls  -  into automated playbooks that execute containment, enrichment, and notification actions without requiring analyst clicks for every step. A SOAR playbook triggered by a phishing alert might automatically extract the sender domain, query threat intelligence APIs, check delivery logs, isolate the recipient endpoint, and open a pre-populated ticket  -  in under 60 seconds.",
      "SOAR reduces analyst toil on high-volume, low-complexity alert classes such as phishing reports, account lockouts, and known malware detections. This frees tier-two and tier-three analysts for genuine threat hunting and complex incident response. Alert-to-ticket mean time drops from hours to seconds for playbook-covered cases; MTTR (mean time to respond) falls proportionally.",
      "Effective SOAR deployment requires detection quality upstream  -  automating responses to noisy, low-fidelity alerts creates false containment actions that frustrate users and undermine trust. AiRAT's approach: tune SIEM detection quality first, then build SOAR playbooks only for alert classes with precision above agreed thresholds. Every automated containment action logs a human-readable audit trail for compliance review.",
    ],
    examples: [
      {
        label: "Phishing response playbook",
        detail: "Inbound phishing report triggers SOAR: email headers parsed, URLs submitted to sandbox, domain reputation queried, identical emails across mailboxes quarantined, IOCs pushed to perimeter block lists, analyst ticket opened with evidence summary  -  all within 90 seconds of the initial report.",
      },
      {
        label: "Account compromise containment",
        detail: "Impossible travel alert triggers SOAR playbook: session tokens revoked, MFA re-enrollment enforced, user notified, manager alerted, and incident ticket created with enriched context  -  without analyst intervention for the first three actions.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between SOAR and XDR?",
        a: "SOAR is a workflow automation layer that orchestrates actions across multiple security tools based on playbooks. XDR provides integrated detection, correlation, and response within a unified platform. XDR handles detection and correlation natively; SOAR automates workflows across disparate tools that may not share a data model. Many programmes use XDR for detection and SOAR for cross-tool orchestration.",
      },
      {
        q: "What playbooks should a SOC automate first?",
        a: "Prioritise high-volume, low-complexity, high-precision alert classes: phishing triage, known-malware IOC matches, account lockout enrichment, and compliance evidence collection. Avoid automating containment actions for alert classes with precision below 85%  -  false positives cause more damage than the automation saves.",
      },
    ],
    relatedSlugs: ["siem", "xdr", "mdr"],
    seoTitle: "SOAR Explained | Security Orchestration Automation Response | AiRAT Glossary",
    seoDescription: "What is SOAR? A clear definition of Security Orchestration, Automation and Response  -  how SOC playbooks work, how SOAR differs from XDR, and how to prioritise automation without false containment.",
    schema: { termCode: "SOAR", inDefinedTermSet: "AiRAT Cybersecurity Glossary" },
  },
  {
    slug: "mdr",
    term: "MDR",
    shortDef: "Managed Detection and Response  -  a security service where a third-party provider monitors an organisation's environment 24/7, investigates alerts, and performs containment actions on behalf of the client's security team.",
    categoryLabel: "Cybersecurity",
    body: [
      "MDR (Managed Detection and Response) is an outsourced security operations service that provides 24/7 threat monitoring, alert triage, investigation, and containment actions in a customer's environment. Unlike traditional MSSP (Managed Security Service Provider) models that focus on log management and compliance reporting, MDR providers emphasise active threat hunting, rapid incident response, and measurable detection outcomes.",
      "MDR fills the SOC capacity gap for organisations that cannot staff 24/7 security operations internally  -  mid-market enterprises, regulated businesses without a dedicated security team, and organisations in high-threat sectors where security is critical but not a core competency. The MDR provider brings detection engineers, threat hunters, and incident responders who operate using the client's security tooling or the provider's own stack.",
      "Evaluating MDR providers requires scrutiny of their detection methodology (vendor-agnostic vs locked to a specific platform), response authority (do they contain threats directly or only notify the client?), SLAs for MTTD and MTTR, and evidence of detection outcomes rather than compliance metrics. AiRAT helps enterprises evaluate and transition to MDR providers, design internal SOC programmes, and implement the tooling that MDR teams operate against.",
    ],
    examples: [
      {
        label: "24/7 alert triage",
        detail: "MDR analysts monitor 500+ daily SIEM alerts overnight, triaging 490 as false positives and escalating 10 to client security leads with full investigation context by 07:00 local time.",
      },
      {
        label: "Proactive threat hunting",
        detail: "MDR threat hunters run weekly hypothesis-driven hunts across client telemetry, looking for TTPs not yet codified in detection rules  -  surfacing a dormant lateral movement campaign missed by automated alerting.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between MDR and MSSP?",
        a: "Traditional MSSPs focus on log management, alert forwarding, and compliance reporting  -  they monitor and notify. MDR providers investigate, make containment decisions, and take action. MDR is outcomes-focused (MTTD, MTTR, true-positive rate) where MSSP is often process-focused (uptime, log retention). MDR has largely superseded MSSP as the expectation for outsourced SOC capability.",
      },
      {
        q: "Should we build an internal SOC or use MDR?",
        a: "MDR makes economic sense when staffing a 24/7 internal SOC would cost more than the MDR contract and when the organisation lacks the detection engineering bench depth to run a high-fidelity programme. Internal SOC makes sense for organisations with complex, classified, or highly regulated environments where outsourced access is prohibited or risky. Many organisations run a hybrid: MDR for overnight coverage, internal team for daytime operations and threat hunting.",
      },
    ],
    relatedSlugs: ["siem", "xdr", "soar"],
    seoTitle: "MDR Explained | Managed Detection and Response | AiRAT Glossary",
    seoDescription: "What is MDR? A clear definition of Managed Detection and Response  -  how it differs from MSSP, what 24/7 threat monitoring covers, and how to evaluate MDR providers for your security programme.",
    schema: { termCode: "MDR", inDefinedTermSet: "AiRAT Cybersecurity Glossary" },
  },
  {
    slug: "data-lake",
    term: "Data Lake",
    shortDef: "A centralised storage repository that holds raw structured, semi-structured, and unstructured data at any scale, enabling analytics, machine learning, and operational processing without requiring a pre-defined schema.",
    categoryLabel: "Data Engineering",
    body: [
      "A data lake is a centralised repository that stores data in its native format  -  structured tables, semi-structured JSON/Parquet, unstructured logs, documents, and binary assets  -  without requiring a pre-defined schema at write time. This 'schema-on-read' approach gives data engineers and scientists the flexibility to load data quickly and define processing logic later, in contrast to data warehouses which enforce schema-on-write.",
      "Modern data lakes are built on cloud object storage (AWS S3, Azure Data Lake Storage Gen2, GCS) with open table formats  -  Apache Iceberg, Delta Lake, Apache Hudi  -  that add ACID transactions, schema evolution, and time-travel queries on top of raw files. This combination, often called a 'lakehouse', eliminates the historical trade-off between lake flexibility and warehouse reliability.",
      "Data lake architecture quality is determined by governance, not capacity. Without data contracts, quality checks, and a clear medallion tiering strategy (Bronze for raw ingestion, Silver for cleaned and enriched data, Gold for business-ready aggregates), lakes become 'data swamps'  -  vast repositories of untrusted data that nobody queries. AiRAT builds production data lakes with embedded quality gates, contract-enforced schemas, and access control aligned to data classification.",
    ],
    examples: [
      {
        label: "Multi-source raw ingestion",
        detail: "POS transaction logs, web clickstream events, and IoT sensor telemetry land in the Bronze layer of a retail data lake in their native formats  -  no schema transformation at ingest, full fidelity preserved for downstream use cases.",
      },
      {
        label: "Gold layer for business intelligence",
        detail: "A Gold-layer aggregation table joins cleansed transaction data with enriched customer segments and inventory snapshots, serving as the single authoritative source for the finance BI dashboard and the fraud detection model.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a data lake and a data warehouse?",
        a: "A data warehouse enforces a pre-defined schema at write time, optimising for fast query performance on structured, curated data. A data lake stores data in raw format with schema applied at read time, optimising for flexibility and raw storage cost. Modern lakehouses (Delta Lake, Iceberg) combine both: raw storage with warehouse-quality reliability and query performance.",
      },
      {
        q: "How do you prevent a data lake from becoming a data swamp?",
        a: "Prevention requires: data contracts at ingestion points that enforce schema and quality SLAs, medallion tiering (Bronze/Silver/Gold) with explicit quality gates between layers, a data catalogue with ownership metadata, and usage monitoring to identify stale or untrusted datasets. Governance tooling (Apache Atlas, DataHub, Unity Catalog) enforces these policies at scale.",
      },
    ],
    relatedSlugs: ["medallion-architecture", "data-contract"],
    seoTitle: "Data Lake Explained | Data Lake Architecture | AiRAT Glossary",
    seoDescription: "What is a data lake? A clear definition of data lake architecture  -  how it differs from data warehouses, why lakes become swamps, and how medallion tiering prevents data quality failures.",
    schema: { termCode: "DataLake", inDefinedTermSet: "AiRAT Data Engineering Glossary" },
  },
  {
    slug: "medallion-architecture",
    term: "Medallion Architecture",
    shortDef: "A data lake design pattern that organises data into three progressive quality tiers  -  Bronze (raw), Silver (cleansed and enriched), and Gold (business-ready aggregates)  -  with quality gates between each layer.",
    categoryLabel: "Data Engineering",
    body: [
      "Medallion Architecture (also called the Bronze/Silver/Gold pattern) is a data engineering design pattern that organises a data lake or lakehouse into three progressive quality tiers. Bronze holds raw data exactly as ingested  -  full fidelity, no transformations, append-only. Silver holds cleansed, deduplicated, and schema-validated records that have passed quality gates. Gold holds business-ready aggregations and domain models that power analytics dashboards, machine learning features, and operational APIs.",
      "The value of medallion tiering is explicit quality semantics: consumers of Silver data know it has passed quality checks; consumers of Gold data know it has been curated for a specific business use case. This eliminates the 'I'm not sure if I should trust this' uncertainty that pervades ungoverned data lakes.",
      "Medallion Architecture maps naturally to data contracts: Bronze-to-Silver promotion is gated by a contract that specifies required fields, acceptable null rates, and value range constraints. Silver-to-Gold promotion requires additional business logic validation. AiRAT implements medallion pipelines using Apache Spark on Databricks or EMR, with Delta Lake or Iceberg table formats providing ACID guarantees, schema enforcement, and time-travel for audit and rollback.",
    ],
    examples: [
      {
        label: "Financial transaction pipeline",
        detail: "Raw payment events land in Bronze with full schema. Silver validates account numbers, removes test transactions, and enriches with merchant category codes. Gold aggregates daily settlement totals and running exposure by counterparty  -  used by both treasury reporting and fraud monitoring.",
      },
      {
        label: "Schema evolution across tiers",
        detail: "A new field added to upstream payment events appears in Bronze immediately. Silver promotion adds the field only after a data contract update is approved and quality checks pass. Gold tables are only updated when the finance team's business logic validation is complete.",
      },
    ],
    faqs: [
      {
        q: "Does every data lake need medallion architecture?",
        a: "Not necessarily  -  but any data lake serving multiple consumer teams benefits significantly from explicit quality tiers. If you have a single consumer and a simple ingestion pattern, medallion adds overhead without value. As soon as you have multiple teams consuming data with different quality expectations, tiering prevents the trust breakdown that turns lakes into swamps.",
      },
      {
        q: "What is the difference between Bronze, Silver, and Gold?",
        a: "Bronze: raw data, exactly as ingested, no transformations, append-only, full fidelity. Silver: cleansed, deduplicated, schema-validated data that has passed automated quality gates  -  trusted for analysis. Gold: business-curated aggregates and domain models optimised for specific consumers  -  dashboards, models, or operational APIs. Each tier has a data contract that defines what 'passing' means.",
      },
    ],
    relatedSlugs: ["data-lake", "data-contract"],
    seoTitle: "Medallion Architecture Explained | Bronze Silver Gold Data Lake | AiRAT Glossary",
    seoDescription: "What is Medallion Architecture? A clear definition of the Bronze/Silver/Gold data lake pattern  -  how quality tiers work, what data contracts govern each promotion, and how AiRAT builds lakehouse pipelines.",
    schema: { termCode: "MedallionArchitecture", inDefinedTermSet: "AiRAT Data Engineering Glossary" },
  },
  {
    slug: "data-contract",
    term: "Data Contract",
    shortDef: "A formal, machine-readable agreement between a data producer and its consumers that specifies schema, quality SLAs, semantics, and ownership  -  enforced automatically at pipeline ingestion points.",
    categoryLabel: "Data Engineering",
    body: [
      "A data contract is a formal, version-controlled specification that defines what a data producer commits to delivering to its consumers: the schema (field names, types, required/optional status), quality SLAs (acceptable null rates, value range constraints, timeliness), semantic definitions (what 'order_total' means in business terms, what currency unit applies), and ownership (who to contact when the contract is violated).",
      "Data contracts solve the silent failure problem endemic to data pipelines: upstream teams change a field name or data type, downstream dashboards and models break silently, and analysts discover the issue only when a business decision is made on bad data. With contracts enforced at ingestion  -  using tools like Great Expectations, Soda, or custom validation layers  -  violations are caught at the pipeline boundary, not in the boardroom.",
      "AiRAT implements data contracts as versioned YAML or JSON schema files stored in the same repository as pipeline code, with CI/CD enforcement that prevents promotion from Bronze to Silver unless the incoming data passes all contract assertions. Breaking contract changes require a deprecation notice and a migration window, governed by the producing team's SLA.",
    ],
    examples: [
      {
        label: "Schema version enforcement",
        detail: "A payment processor adds a new mandatory field to its API response. The data contract version bumps from v1.2 to v2.0, the downstream Silver promotion pipeline fails until the transformation layer handles both versions, and the producing team is notified via automated alerting.",
      },
      {
        label: "Quality SLA breach",
        detail: "The data contract for customer profile data requires null_rate(email) < 2%. When a CRM export lands with 15% null emails, the ingestion job halts, an incident is opened, and the producing team's on-call is paged  -  before any corrupted data reaches Silver.",
      },
    ],
    faqs: [
      {
        q: "What format should a data contract use?",
        a: "Common formats include YAML schema files (human-readable, git-compatible), JSON Schema (tooling-compatible), or domain-specific contract languages like OpenDataContract (ODCS). The format matters less than version control, CI/CD enforcement, and producer/consumer sign-off. Start with a simple YAML file in the producer's repo and enforce it with a validation step in the ingestion pipeline.",
      },
      {
        q: "Who owns a data contract?",
        a: "The producing team owns and maintains the contract  -  they commit to its SLAs. Consuming teams are stakeholders who review and accept changes. A data platform team typically provides the tooling and enforcement layer. Without producer ownership, contracts become wishful documentation that nobody enforces.",
      },
    ],
    relatedSlugs: ["data-lake", "medallion-architecture"],
    seoTitle: "Data Contract Explained | Data Quality SLA | AiRAT Glossary",
    seoDescription: "What is a data contract? A clear definition of data contracts for pipelines  -  schema enforcement, quality SLAs, ownership, and how contracts prevent silent data failures between producer and consumer teams.",
    schema: { termCode: "DataContract", inDefinedTermSet: "AiRAT Data Engineering Glossary" },
  },
  {
    slug: "opensearch",
    term: "OpenSearch",
    shortDef: "An open-source search and analytics engine (forked from Elasticsearch 7.10) used for full-text search, log analytics, observability, and security analytics workloads at scale.",
    categoryLabel: "Data Engineering",
    body: [
      "OpenSearch is an open-source, distributed search and analytics engine maintained by AWS and a community of contributors, forked from Elasticsearch 7.10 in 2021 following Elastic's licence change. It uses an inverted index architecture for full-text search and supports structured queries, aggregations, vector search (k-NN), and real-time analytics  -  making it suitable for search, log analytics, SIEM, and observability use cases.",
      "OpenSearch clusters scale horizontally by adding nodes, distributing shards across the cluster. Index design  -  shard count, mapping, field data types, and ingest pipeline configuration  -  determines both query latency and storage efficiency. Over-sharded indexes (too many small shards) degrade cluster health; under-sharded indexes (too few large shards) limit parallelism and query throughput.",
      "AiRAT migrated a major retail client from a 15-node Elasticsearch cluster to OpenSearch, achieving sub-40ms p99 query latency on a 2TB product catalog with 8M daily queries. The migration involved index re-mapping, ingest pipeline refactoring, and a blue-green cutover strategy that delivered zero downtime across a four-hour migration window. For SOC deployments, AiRAT uses OpenSearch as the SIEM backend  -  ingesting, indexing, and querying security telemetry at petabyte scale.",
    ],
    examples: [
      {
        label: "Product search at scale",
        detail: "2TB product catalogue indexed across 12 OpenSearch shards, serving 8M daily queries with sub-40ms p99 latency using custom relevance scoring, synonym expansion, and query-time boosting for personalised results.",
      },
      {
        label: "Security analytics backend",
        detail: "OpenSearch ingests 500GB/day of normalised security telemetry from 40 log sources, enabling analysts to run correlation queries across 90 days of data in under 5 seconds  -  replacing a legacy SIEM that required 40-second query times.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between OpenSearch and Elasticsearch?",
        a: "OpenSearch is a community-maintained open-source fork of Elasticsearch 7.10, released under Apache 2.0 licence. Elasticsearch continues development under the Elastic Source Licence (SSPL/ELv2), which restricts offering it as a managed service. For self-hosted or AWS-managed deployments, OpenSearch is functionally equivalent and actively developed. For Elastic Cloud managed deployments, Elasticsearch is the natural choice. AiRAT works with both.",
      },
      {
        q: "How many shards should an OpenSearch index have?",
        a: "A common starting point: aim for shard sizes of 20–50GB for search workloads and 10–30GB for log analytics. Over-sharding increases cluster overhead (more shard metadata, more coordination); under-sharding limits query parallelism. For time-series data (logs, events), use daily or weekly indices with ILM (Index Lifecycle Management) to roll, shrink, and delete old indices automatically.",
      },
    ],
    relatedSlugs: ["data-lake", "siem"],
    seoTitle: "OpenSearch Explained | Search and Analytics Engine | AiRAT Glossary",
    seoDescription: "What is OpenSearch? A clear definition of OpenSearch  -  how it differs from Elasticsearch, how shard design affects performance, and how AiRAT deploys OpenSearch for search and SIEM workloads at scale.",
    schema: { termCode: "OpenSearch", inDefinedTermSet: "AiRAT Data Engineering Glossary" },
  },
  {
    slug: "zero-trust",
    term: "Zero Trust",
    shortDef: "A security model that eliminates implicit trust from networks and identities  -  every access request is verified explicitly, regardless of whether it originates inside or outside the corporate perimeter.",
    categoryLabel: "Cybersecurity",
    body: [
      "Zero Trust is a security architecture principle  -  codified in NIST SP 800-207  -  that replaces implicit perimeter-based trust with explicit, continuous verification of every access request. The core tenet: never trust, always verify. No user, device, or workload is trusted by default simply because it is inside the corporate network. Every request must be authenticated, authorised against policy, and continuously validated for the duration of the session.",
      "Zero Trust implementation spans five control planes: identity (strong authentication, least-privilege access policies), devices (device health verification before access is granted), networks (micro-segmentation, software-defined perimeters), applications (access brokered through a proxy that applies policy per-session), and data (classification-based access controls, encryption at rest and in transit). Most organisations begin with identity and work outward.",
      "Zero Trust is not a product  -  it is an architecture philosophy that requires multiple integrated controls. Vendors sell 'Zero Trust Network Access' (ZTNA) solutions that address the network and application planes; identity providers enforce the identity plane. AiRAT designs Zero Trust architectures for FinTech and enterprise clients, mapping each control plane to existing tooling and defining a phased implementation roadmap aligned to compliance requirements (PCI-DSS, ISO 27001, UAE IA).",
    ],
    examples: [
      {
        label: "Identity-first access",
        detail: "A developer's VPN session is eliminated. All application access is brokered through a ZTNA proxy that checks identity (SAML/OIDC), device compliance posture (MDM-enrolled, patch-current, disk encryption active), and access policy (role-scoped) before proxying the connection  -  re-evaluated every 15 minutes.",
      },
      {
        label: "Micro-segmentation",
        detail: "East-west traffic between application tiers is controlled by software-defined firewall policies that allow only explicitly permitted flows  -  a compromised web server cannot reach the database tier without a firewall rule change, logged and alerted.",
      },
    ],
    faqs: [
      {
        q: "Is Zero Trust a product I can buy?",
        a: "No  -  Zero Trust is an architecture principle, not a product. Vendors sell components that implement Zero Trust controls: ZTNA products for network access, identity platforms for authentication and authorisation, MDM for device compliance, and data classification tools. An effective Zero Trust programme integrates these components into a coherent architecture  -  which requires design, not just procurement.",
      },
      {
        q: "Where should a Zero Trust implementation start?",
        a: "Start with identity: enforce MFA for all users, implement least-privilege access policies, and eliminate shared credentials and standing admin access. Identity is the highest-ROI Zero Trust control and the prerequisite for every other plane. Once identity is hardened, move to device compliance verification before extending to network micro-segmentation and application proxying.",
      },
    ],
    relatedSlugs: ["xdr", "siem", "mdr"],
    seoTitle: "Zero Trust Explained | Zero Trust Security Architecture | AiRAT Glossary",
    seoDescription: "What is Zero Trust? A clear definition of Zero Trust security  -  NIST SP 800-207, the five control planes, and how to design a phased Zero Trust implementation for enterprise and FinTech environments.",
    schema: { termCode: "ZeroTrust", inDefinedTermSet: "AiRAT Cybersecurity Glossary" },
  },
  {
    slug: "mitre-attck",
    term: "MITRE ATT&CK",
    shortDef: "A publicly maintained knowledge base of adversary tactics, techniques, and procedures (TTPs) derived from real-world observations, used by detection engineers and threat hunters to model, detect, and communicate attacker behaviour.",
    categoryLabel: "Cybersecurity",
    body: [
      "MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is a globally recognised framework of adversary behaviour, maintained by MITRE Corporation from real-world threat intelligence. The framework organises attacker behaviour into tactics (high-level goals such as Persistence, Lateral Movement, Exfiltration) and techniques (specific methods used to achieve each tactic, such as T1566 Phishing or T1078 Valid Accounts). Each technique includes sub-techniques, procedure examples, detection guidance, and mitigation recommendations.",
      "Detection engineers use ATT&CK to structure detection rule libraries  -  mapping each SIEM or XDR rule to the technique it detects, and using a 'heat map' view of coverage to identify gaps in the detection programme. A red team exercise against ATT&CK techniques reveals which attacker behaviours have no detective controls, enabling prioritised investment in detection engineering. Threat intelligence teams use ATT&CK to communicate about specific threat actor groups (APT29, FIN7) and their known TTP patterns.",
      "AiRAT structures detection libraries using ATT&CK mappings across all client SOC deployments. The csoc platform uses ATT&CK tactic and technique tags on every alert  -  enabling security leads to view coverage heatmaps and prioritise detection investment based on the techniques most commonly used by threat actors relevant to their sector.",
    ],
    examples: [
      {
        label: "Detection coverage heatmap",
        detail: "ATT&CK Navigator heatmap showing detection coverage across 14 tactics and 196 techniques  -  highlighting Credential Access (T1003, T1110) as a gap prioritised for new SIEM rule development in Q2.",
      },
      {
        label: "Threat actor profiling",
        detail: "Threat intelligence report mapping a FinTech-sector threat actor's observed TTPs to ATT&CK techniques, enabling the detection team to identify which techniques are already covered by existing rules and which require new detection logic.",
      },
    ],
    faqs: [
      {
        q: "Is MITRE ATT&CK free to use?",
        a: "Yes  -  MITRE ATT&CK is publicly available under a Creative Commons Attribution licence. The framework, ATT&CK Navigator (a heatmap visualisation tool), and ATT&CK Workbench (a tool for extending and customising the framework) are all freely available at attack.mitre.org. Commercial threat intelligence platforms add enrichment and automation on top of the public framework.",
      },
      {
        q: "How do you map SIEM rules to ATT&CK?",
        a: "Each detection rule should be tagged with the ATT&CK technique(s) it detects at the time of authoring. Sigma (an open detection rule format) includes ATT&CK tags as a standard field. This mapping enables coverage visualisation in ATT&CK Navigator, integration with threat intelligence platforms, and automated gap analysis when new threat intelligence identifies undetected techniques.",
      },
    ],
    relatedSlugs: ["xdr", "siem", "soar"],
    seoTitle: "MITRE ATT&CK Explained | Adversary Tactics Techniques | AiRAT Glossary",
    seoDescription: "What is MITRE ATT&CK? A clear definition of the adversary tactics and techniques framework  -  how detection engineers use ATT&CK for coverage mapping, threat hunting, and SOC programme design.",
    schema: { termCode: "MITREATTCK", inDefinedTermSet: "AiRAT Cybersecurity Glossary" },
  },
];

export function getTermBySlug(slug: string | undefined): GlossaryTerm | undefined {
  return GLOSSARY_TERMS.find((t) => t.slug === slug);
}
