export const TECH_SEO = {
  title: "Engineering Capabilities | AiRAT - Production-Proven Technology",
  description:
    "The production-proven tools, patterns, and engineering capabilities behind AiRAT systems. Every stack choice maps to shipped, running outcomes in regulated and high-scale environments across UAE, India, Singapore, and Europe.",
} as const;

export const TECH_HERO = {
  badge: "Engineering capabilities",
  headline: "Every capability listed here is already running in production.",
  subhead:
    "No slide-deck tooling. No resume padding. Each category maps to shipped systems with agreed SLOs, compliance evidence, and teams that still run them.",
} as const;

export const TECH_INTRO = {
  eyebrow: "How we choose",
  title: "We choose for reliability, not recognition.",
  body:
    "Reliability under load, compliance defensibility, and long-term operational cost drive every technology decision. If something newer or flashier exists but has no proven production track record in regulated environments, we prototype explicitly - we don't ship it as your default. This page is the 'how' chapter: once you know we solve your class of problem, here is what we stake our reputation on.",
} as const;

export const TECH_STORY_BRIDGE =
  "Stack choices follow outcomes - not the other way. If you have not yet reviewed outcomes, start with the case studies, then return here for the engineering patterns behind them.";

export const TECH_CAPABILITY_NARRATIVE = [
  {
    title: "Detection engineering that survives audits",
    body: "SIEM/XDR platforms where detection rules, enrichment pipelines, and evidence trails are designed before the build - not retrofitted when audit season arrives. Every alert has context. Every automated action has an immutable log.",
    domains: ["SIEM", "XDR", "SOAR", "NTA"],
  },
  {
    title: "AI systems that governance teams can sign off",
    body: "RAG pipelines and LLM workflows with evaluation harnesses, PII handling, human review checkpoints, and drift monitoring designed in from first sprint. Models stay observable and auditable in production - not frozen in a demo environment.",
    domains: ["RAG", "LLM evaluation", "MLOps", "Governance"],
  },
  {
    title: "Search and data infrastructure that holds under load",
    body: "OpenSearch-scale catalogue and search platforms, Medallion data lakes with Bronze/Silver/Gold governance, and real-time streaming pipelines that finance, product, and investigators trust when numbers diverge.",
    domains: ["OpenSearch", "Medallion lakes", "Real-time streaming"],
  },
] as const;

export const TECH_FAQ_SECTION = {
  title: "Technology choices - how we think",
  intro: "For architects and platform owners evaluating whether our defaults match your estate.",
} as const;

export const TECH_FAQ = [
  {
    q: "Do you mandate a single cloud vendor?",
    a: "No. We deploy on AWS, GCP, and Azure where required, with Kubernetes, Terraform, and portable service boundaries so you are not locked into patterns that only work in one vendor's happy path.",
  },
  {
    q: "How do you pick LLM and RAG components?",
    a: "We choose based on latency, cost, evaluation quality, and governance - not headline model names. Retrieval, tracing, and offline eval harnesses are part of production design, not afterthoughts.",
  },
  {
    q: "What about legacy systems and mainframes?",
    a: "We integrate through APIs, events, and controlled batch interfaces, prioritising stable contracts and observability so modern surfaces do not amplify fragility in older tiers.",
  },
  {
    q: "Where does security enter the lifecycle?",
    a: "From day one: supply-chain scanning, policy-as-code, secrets management, and least-privilege networking are baseline. DevSecOps tooling in the tabs reflects how we run pipelines - not a separate 'security phase' at the end.",
  },
] as const;

/** `icon` = Simple Icons slug (https://simpleicons.org) for CDN `cdn.simpleicons.org` */
export type TechTool = { readonly name: string; readonly icon?: string };

export const TECH_TABS: readonly {
  readonly label: string;
  readonly description: string;
  readonly tools: readonly TechTool[];
}[] = [
  {
    label: "Data & AI",
    description:
      "When models and pipelines fail in production, the cost is trust - not GPU bills. We orchestrate LLMs, RAG, and lakehouse analytics so answers are grounded, observable, and governable for compliance reviewers.",
    tools: [
      { name: "Databricks", icon: "databricks" },
      { name: "Snowflake", icon: "snowflake" },
      { name: "Spark", icon: "apachespark" },
      { name: "Airflow", icon: "apacheairflow" },
      { name: "BigQuery", icon: "googlebigquery" },
      { name: "Llama", icon: "meta" },
      { name: "OpenAI", icon: "openai" },
      { name: "Anthropic", icon: "anthropic" },
      { name: "LangChain", icon: "langchain" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "dbt", icon: "dbt" },
    ],
  },
  {
    label: "Fullstack Engineering",
    description:
      "Buyers care whether releases slow down revenue experiments. We build APIs, web, and mobile surfaces with CI/CD, observability, and security gates so teams ship weekly without fearing Friday deploys.",
    tools: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django", icon: "django" },
      { name: "Java Spring Boot", icon: "springboot" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "GraphQL", icon: "graphql" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React Native", icon: "react" },
      { name: "Angular", icon: "angular" },
    ],
  },
  {
    label: "Reporting & Monitoring",
    description:
      "If incidents are guessed from screenshots, you are already losing. We standardise logs, metrics, and traces so MTTR drops and leadership gets defensible post-incident narratives.",
    tools: [
      { name: "Elasticsearch", icon: "elasticsearch" },
      { name: "Logstash", icon: "logstash" },
      { name: "Kibana", icon: "kibana" },
      { name: "OpenSearch", icon: "opensearch" },
      { name: "Grafana", icon: "grafana" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Power BI", icon: "powerbi" },
      { name: "Looker Studio", icon: "looker" },
    ],
  },
  {
    label: "Database & Queues",
    description:
      "Data platforms fail on coupling and hot partitions, not on logo counts. We design brokers and stores for replay, back-pressure, and recovery windows your CFO can reason about.",
    tools: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Cassandra", icon: "apachecassandra" },
      { name: "DynamoDB", icon: "amazondynamodb" },
      { name: "Redis", icon: "redis" },
      { name: "Kafka", icon: "apachekafka" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Amazon SQS", icon: "amazonsqs" },
      { name: "Neo4j", icon: "neo4j" },
    ],
  },
  {
    label: "Cloud Infrastructure",
    description:
      "Cloud is a procurement and reliability story. We use IaC and hardened Kubernetes patterns so environments are reproducible, auditable, and portable across AWS, GCP, and Azure where required.",
    tools: [
      { name: "AWS", icon: "amazonaws" },
      { name: "GCP", icon: "googlecloud" },
      { name: "Azure", icon: "microsoftazure" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Terraform", icon: "terraform" },
      { name: "Helm", icon: "helm" },
      { name: "Istio", icon: "istio" },
    ],
  },
  {
    label: "DevSecOps & Security",
    description:
      "Security shifted left means fewer emergency CAB meetings. We wire SAST/DAST, supply-chain scanning, and policy-as-code so vulnerabilities surface in PRs - not in breach notifications.",
    tools: [
      { name: "GitLab CI", icon: "gitlab" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "SonarQube", icon: "sonarqube" },
      { name: "Trivy", icon: "trivy" },
      { name: "OWASP ZAP", icon: "owasp" },
      { name: "OPA / Gatekeeper" },
      { name: "Vault", icon: "vault" },
      { name: "OAuth2 / OIDC" },
    ],
  },
];
