export const SERVICES_SEO = {
  title: "Services | Security, AI & Data Platforms | AiRAT",
  description:
    "Outcome-led engineering for CISOs and CTOs. SIEM/XDR, governed AI and RAG systems, data lakes, OpenSearch-scale search  -  built in UAE, India, and Europe with SLOs agreed before the build.",
} as const;

export const SERVICES_HERO = {
  badge: "Services",
  headline: "Name the problem. We size and ship the fix.",
  body: "SOC teams drowning in alert noise. AI rollouts blocked by governance. Search latency that breaks under campaign peaks. We have shipped production systems for all three. Each service below starts with the business pressure  -  not the tool stack.",
} as const;

export const SERVICES_STACK_SECTION = {
  title: "Service stacks",
  lead: "Select a stack to see the problem class, scope, business outcomes, and a portfolio link.",
} as const;

export type ServiceBlock = {
  id: string;
  /** The pressure the buyer team feels before any tool conversation */
  problemClass: string;
  title: string;
  description: string;
  /** One-line preview on the tile grid */
  tileSummary: string;
  /** Three outcome lines: what changes Monday morning */
  covered: string[];
  q: string;
  a: string;
  caseStudy?: { readonly label: string; readonly to: string };
};

export const SERVICES_LIST: ServiceBlock[] = [
  {
    id: "cyber",
    problemClass: "SOC leaders cannot defend spend when alert volume hides real incidents and evidence lives in disconnected tools.",
    title: "Cybersecurity & XDR Platforms",
    description:
      "We design and deploy enterprise-grade threat detection, correlation, and response platforms that consolidate telemetry across endpoint, network, and cloud  -  giving SOC teams a single timeline instead of five browser tabs.",
    tileSummary: "SIEM / XDR / NTA: fewer alerts, faster triage, board-defensible evidence trails.",
    covered: [
      "Tier-one analysts see correlated timelines  -  not fragmented tool tabs  -  so alert fatigue drops and real incidents surface faster.",
      "Automation clears first-response work that humans shouldn't repeat; every exception lands with evidence already attached.",
      "Board-defensible reporting: SLAs, coverage maps, and drill outcomes defined before heavy build begins  -  not after the first incident.",
    ],
    q: "What is an XDR platform and why does it matter for enterprise security?",
    a: "XDR (Extended Detection and Response) unifies telemetry from endpoints, networks, cloud, and identity in a single correlated timeline. Unlike siloed SIEM or EDR tools, XDR surfaces root-cause context  -  not just individual alerts  -  which reduces mean-time-to-detect and frees tier-one analysts to focus on decisions only humans can make. AiRAT builds XDR platforms with detection logic, automation boundaries, and evidence trails agreed with your security and compliance teams before deployment.",
    caseStudy: {
      label: "Read csoc SIEM / XDR case study",
      to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform",
    },
  },
  {
    id: "genai",
    problemClass: "Legal and security teams block AI rollouts when retrieval quality, logging, and review boundaries are unclear in production.",
    title: "Generative AI & LLM Systems",
    description:
      "We deploy RAG pipelines, autonomous agents, and fine-tuned LLM workflows with the guardrails that allow legal and security teams to sign off  -  not demo prompts frozen in a staging environment nobody monitors.",
    tileSummary: "Governed GenAI: RAG, agents, evaluation harnesses, and production controls  -  not demos.",
    covered: [
      "RAG and agents ship with logging, evaluation, and human review boundaries  -  so legal and security can defend what is running in production.",
      "Institutional knowledge becomes queryable without dumping raw data into an uncontrolled chat interface.",
      "Release cadence tied to measurable accuracy and incident behaviour  -  not a frozen prompt deck that breaks on the first real query.",
    ],
    q: "How does AiRAT make enterprise AI production-safe?",
    a: "We design retrieval boundaries, evaluation harnesses, PII controls, and human review gates before models touch production data. Every RAG deployment includes corpus versioning, retrieval quality metrics, and documented rollback criteria. Agents have explicit tool-use boundaries and logging so behaviour is auditable. We do not ship demos  -  we ship observable systems with acceptance criteria your legal and security teams helped define.",
    caseStudy: {
      label: "Read GenAI / RAG case study",
      to: "/portfolio/enterprise-xdr-agent-windows-endpoint-protection",
    },
  },
  {
    id: "datalakes",
    problemClass: "Finance and product disagree on numbers because pipelines and gold-layer truth drift faster than governance can keep up.",
    title: "Data Lakes & Real-Time Analytics",
    description:
      "We design and deploy terabyte-scale data platforms with Medallion architecture that gives finance, product, and operations a single agreed source of truth  -  backed by streaming pipelines that do not lag days behind operational systems.",
    tileSummary: "Medallion lakes, streaming CDC, and analytics your CFO and engineers trust equally.",
    covered: [
      "Gold-layer datasets finance and product agree on  -  so Monday metrics meetings stop being a reconciliation fight between two dashboard tools.",
      "Streaming and CDC paths that keep analytical stores current with operational systems instead of drifting days behind.",
      "Governance defaults (Bronze/Silver/Gold) that survive the first real audit  -  not just the first demo to the data team.",
    ],
    q: "What is Medallion data architecture and when does it apply?",
    a: "Medallion (Bronze/Silver/Gold) structures data through progressive quality layers. Bronze holds raw ingested data. Silver applies deduplication, typing, and business rules. Gold delivers trusted, aggregated datasets ready for analytics and reporting. It applies when you have multiple source systems producing inconsistent versions of the same metric  -  typically finance vs. product vs. operations. AiRAT designs Medallion platforms with streaming CDC so Gold layers update in near real-time rather than overnight batch.",
    caseStudy: { label: "Browse data & search work", to: "/portfolio?category=Data" },
  },
  {
    id: "elk",
    problemClass: "Investigations slow when search and log platforms cannot answer cross-estate questions in seconds at your data volume.",
    title: "Search & Observability (ELK / OpenSearch)",
    description:
      "We architect, migrate, and tune high-performance search and log analytics clusters that answer cross-estate questions in milliseconds  -  with cutover plans validated before traffic flips and runbooks your team can operate.",
    tileSummary: "Search & logs at scale: migrations, relevance tuning, and clusters you can operate.",
    covered: [
      "Investigators get sub-second answers across the full log and search estate  -  so MTTR drops instead of ticket queues growing.",
      "Migrations include cutover plans: relevance quality, security model, and capacity are validated on production data before traffic switches.",
      "Clusters you can operate long-term: runbooks, ownership boundaries, and cost dashboards so finance understands what moved.",
    ],
    q: "When should a team migrate from SQL or Elasticsearch to OpenSearch?",
    a: "Move to OpenSearch when you need sub-second full-text search, faceted navigation at scale, or real-time log analytics across multiple data sources. Elasticsearch migrations make sense when AWS managed infrastructure reduces operational overhead or when licensing changes affect your total cost. AiRAT validates relevance quality, index mappings, and query performance against production data before any traffic migration  -  we do not flip traffic and hope.",
    caseStudy: {
      label: "Read petabyte search case study",
      to: "/portfolio/msazn-opensearch-ecommerce-search-uae",
    },
  },
  {
    id: "fintech",
    problemClass: "Regulated financial products stall when custody, trading, and compliance workflows cannot keep pace with audits or traffic spikes.",
    title: "FinTech, Crypto & InsurTech Platforms",
    description:
      "We build secure, compliant, and high-performance financial platforms for regulated environments  -  from digital banks and crypto exchanges to InsurTech recommendation engines  -  with data residency and audit trail designed into the first architecture pass.",
    tileSummary: "Bank-grade platforms: trading, custody, KYC/AML, and InsurTech  -  built to stay fast under audit.",
    covered: [
      "Compliance-facing workflows your auditors can trace  -  KYC/AML and custody paths that do not depend on heroics each quarter.",
      "Latency and reliability targets agreed with trading or payments owners  -  not generic 'five nines' slides.",
      "Architecture you own: no surprise vendor lock-in when regulations or regional requirements change.",
    ],
    q: "What does AiRAT build for FinTech and regulated financial companies?",
    a: "We build the compliance-facing workflows and latency-critical paths regulated FinTech teams need to pass audits and scale  -  KYC/AML automation, trading infrastructure, custody, and InsurTech engines. Architecture and data residency are agreed in the first design pass, not retrofitted when regulators ask. All financial platform work includes documented audit trails and SLOs your compliance team can reference.",
    caseStudy: {
      label: "Read FinTech / XDR case study",
      to: "/portfolio/enterprise-xdr-agent-windows-endpoint-protection",
    },
  },
  {
    id: "ecom",
    problemClass: "Revenue leaks when catalog search, relevance, and checkout paths degrade under campaigns or inventory drift.",
    title: "E-Commerce & Marketplace Search",
    description:
      "We engineer catalog search and marketplace platform infrastructure with sub-second relevance, high-volume checkout reliability, and localized experiences that convert  -  built to stay fast when campaigns push traffic.",
    tileSummary: "Catalog search, relevance tuning, and checkout that survive campaign peaks without firefighting.",
    covered: [
      "Search and catalog stay fresh under peak traffic  -  no eight-minute stale results after a product update during a sale.",
      "Checkout and inventory paths that handle campaign spikes without manual intervention or rollbacks.",
      "Relevance and faceting tuned for how buyers actually browse  -  not factory-default analyzers left untouched.",
    ],
    q: "How does AiRAT deliver sub-second catalog search at scale?",
    a: "We index product and inventory data in OpenSearch with Redis acceleration for hot queries, tune analyzers and ranking signals for your specific product taxonomy, and set up index refresh policies that keep catalog data current without sacrificing query speed. For the MSAZN platform, this reduced query latency from 4.2 seconds to 0.35 seconds across a 5 M-product index.",
    caseStudy: {
      label: "Read e-commerce search case study",
      to: "/portfolio/msazn-opensearch-ecommerce-search-uae",
    },
  },
  {
    id: "aiops",
    problemClass: "On-call burns out when signals duplicate across tools and customer-impacting incidents surface without owner context.",
    title: "AIOps & Platform Observability",
    description:
      "We build AI-powered observability platforms that correlate logs, metrics, and traces  -  surfacing real incidents with owner context early, before customer impact escalates.",
    tileSummary: "Correlated logs, metrics, and ML that cut noise so on-call responds to what actually matters.",
    covered: [
      "On-call stops chasing duplicate signals  -  context-rich incidents arrive with suggested owners and prior incident links.",
      "SLOs tied to customer journeys, not just infrastructure charts, so product and platform agree on what 'green' means.",
      "Ingestion and retention tuned so cost spikes are visible on a dashboard before finance opens the bill.",
    ],
    q: "What is AIOps and when does it make sense over traditional monitoring?",
    a: "AIOps applies machine learning to operational telemetry  -  logs, metrics, traces, and events  -  to detect anomalies earlier, correlate related signals into single incidents, and suppress duplicates that cause alert fatigue. It makes sense when your monitoring stack produces more noise than signal, or when on-call teams regularly deal with the same alert patterns across tools without a unified view.",
    caseStudy: { label: "Browse cloud & observability work", to: "/portfolio?category=Cloud" },
  },
  {
    id: "cloud",
    problemClass: "Releases stay risky when legacy estates move to containers without clear domain boundaries, guardrails, or ownership maps.",
    title: "Cloud-Native & Platform Engineering",
    description:
      "We modernise legacy systems into resilient cloud-native architectures with Kubernetes, IaC, and CI/CD pipelines that accelerate delivery without trading away safety or security review.",
    tileSummary: "Kubernetes, IaC, and CI/CD so deployment velocity increases without dropping safety gates.",
    covered: [
      "Release pipelines with guardrails your security reviewers can sign  -  secrets, policy, and blast radius handled as code, not post-deployment checklists.",
      "Services sized to domains your teams already own  -  so ownership doesn't collapse after the migration workshop.",
      "Measurable deploy frequency and rollback behaviour  -  not 'we are on Kubernetes now' as a destination without a map.",
    ],
    q: "What is included in cloud-native transformation at AiRAT?",
    a: "We handle domain modeling, microservice decomposition, and Kubernetes migration  -  but the work starts with a domain ownership map so services align to teams, not technology preferences. CI/CD pipelines include secret scanning, policy-as-code gates, and rollback rehearsal before any production traffic moves. We measure success by deploy frequency and rollback time, not by the number of services containerised.",
    caseStudy: { label: "Browse platform delivery work", to: "/portfolio" },
  },
  {
    id: "internal",
    problemClass: "Operations teams juggle spreadsheets and SaaS fragments when RBAC, workflows, and integrations don't match how the company actually runs.",
    title: "Custom Internal Platforms",
    description:
      "We build bespoke enterprise platforms that enforce access governance, orchestrate operations, and unify teams across web and mobile  -  with integrations shaped to your actual business logic, not a generic template.",
    tileSummary: "RBAC, workflows, and integrations shaped to how your company actually operates day to day.",
    covered: [
      "RBAC and approvals that match how work actually flows  -  not a generic admin template bolted on in the final sprint.",
      "One operational surface across web and mobile so support and ops stop reconciling conflicting tool states.",
      "Integrations that survive ERP and CRM reality: retries, idempotency, and audit trails by default  -  not as afterthoughts.",
    ],
    q: "Why build a custom internal platform over off-the-shelf SaaS?",
    a: "SaaS tools optimise for the median workflow. Custom platforms are justified when your business logic, access controls, or integration landscape is specific enough that SaaS customisation creates long-term friction, forces expensive workarounds, or puts sensitive data through third-party systems unnecessarily. AiRAT builds internal platforms with the same engineering standards as customer-facing products  -  security review, performance testing, and documented handover.",
    caseStudy: { label: "Browse internal platforms work", to: "/portfolio" },
  },
];

export const SERVICES_DELIVERY = {
  title: "How we deliver: aligned before we build.",
  intro:
    "Discovery and strategy phases exist so procurement and engineering leaders share the same definition of 'done'  -  expressed in SLOs and production metrics, not story points alone. We do not disappear into a six-month black box.",
  phases: [
    {
      num: "01",
      title: "Discovery & Assessment",
      body: "We audit your current stack, map your business goals, and identify risk and cost through structured workshops and technical review. You receive a concrete picture  -  not a best-practice list  -  with prioritised gaps and a realistic scope estimate.",
    },
    {
      num: "02",
      title: "Strategy & Planning",
      body: "Findings become a prioritised roadmap with defined milestones, risk assessments, and measurable success criteria. SLOs and acceptance definitions are agreed here  -  before any significant build begins. Scope changes later are handled explicitly with visible impact on timeline and risk.",
    },
    {
      num: "03",
      title: "Implementation",
      body: "Senior engineers execute the roadmap in agile cycles. Checkpoints produce running software, not status decks. Every sprint ends with something observable  -  not a progress percentage.",
    },
    {
      num: "04",
      title: "Stabilisation & Handover",
      body: "Post-deployment, we run the system alongside your team until SLOs are stable and on-call runbooks are tested under realistic conditions. Handover means your engineers own and operate it  -  not 'it passes staging tests'.",
    },
  ],
} as const;

export const SERVICES_CTA = {
  headline: "Pick one problem. We will help you size the fix.",
  body: "Bring a concrete scenario  -  SOC alert volume, RAG accuracy in production, search latency at peak, or compliance evidence gaps. You will leave a strategy call with a clearer picture of scope, risk, and what 'production-ready' means for your environment.",
  note: "No slide-only roadmap sessions. If we are not the right team, we will say so early.",
  button: { label: "Explore services", to: "/services" },
} as const;

export const SERVICES_STORY_BRIDGE =
  "Each stack links to case studies and the technology page. Read the cases first  -  stack lists alone don't tell you whether the team can deliver under your constraints.";

export const SERVICES_FAQ_SECTION = {
  title: "Services  -  procurement-friendly answers",
  intro: "How we engage, what we own, and what to expect before a statement of work.",
} as const;

export const SERVICES_FAQ = [
  {
    q: "Do you offer staff augmentation or outcome-led delivery?",
    a: "Outcome-led. We embed with your team but anchor delivery to agreed KPIs and production milestones  -  not open-ended headcount. Scope changes are handled explicitly with visible impact on timeline and risk.",
  },
  {
    q: "Can AiRAT work inside our security and procurement rules?",
    a: "Yes. We routinely work inside bank-grade change windows, vendor security questionnaires, and segmented networks. Bring your non-negotiables to the first call so architecture and access patterns reflect them from day one.",
  },
  {
    q: "Which industries do you decline?",
    a: "We decline work where success cannot be defined, where shortcuts would compromise safety in regulated environments, or where we cannot put senior engineers on the critical path. We say no early when fit is weak  -  not after months of scoping.",
  },
  {
    q: "How do AI engagements stay governable?",
    a: "We design retrieval boundaries, evaluation harnesses, logging, and human review gates up front so models are observable and auditable. RAG and agent deployments ship with guardrails appropriate to your data classification  -  not demo prompts frozen in production.",
  },
] as const;
