/** Shared capability / stack copy - used outside the homepage narrative */

export const EXPLORE_DOMAIN_LINKS = [
  { label: "Agentic AI Platforms", to: "/portfolio?category=AI" },
  { label: "Cloud & Observability", to: "/portfolio?category=Cloud" },
  { label: "E-Commerce Search", to: "/portfolio?category=Ecommerce" },
  { label: "Retail Tech Platforms", to: "/portfolio?category=Retail" },
  { label: "Data & Search Engineering", to: "/portfolio?category=Data" },
  { label: "FinTech & Crypto", to: "/portfolio?category=FinTech" },
] as const;

export const SERVICES_SECTION_EYEBROW = "What we build";
export const SERVICES_SECTION_TITLE = "Seven production-grade";
export const SERVICES_SECTION_TITLE_EM = "platform capabilities";
export const SERVICES_SECTION_LEAD =
  "Every engagement ends with a running system. Not a recommendation. Not a proof-of-concept. A platform your team uses Monday morning.";

export const HOME_SERVICES = [
  {
    icon: "🤖",
    name: "Agentic AI & RAG Systems",
    tag: "AI · LLMs · Automation",
    body: "Your teams spend hours searching documents they can't query, waiting on analyses no one has time to run. We build AI agents that retrieve, reason, and act - so your teams spend their time on decisions, not data hunting. Custom RAG pipelines, LLM copilots, autonomous decision agents.",
  },
  {
    icon: "🛡️",
    name: "Cybersecurity & SIEM / XDR",
    tag: "Security · Threat Detection",
    body: "Every alert your SOC reviews costs 15–20 minutes - and most alerts are noise. We build AI-native threat platforms that surface only what matters, cutting alert load by up to 87% and automating first-response on the rest.",
  },
  {
    icon: "🔍",
    name: "Petabyte-Scale Search",
    tag: "Search · ELK · OpenSearch",
    body: "When an incident happens, every second of investigation time is risk exposure. We build petabyte-scale search infrastructure that returns answers in milliseconds, not minutes - across your entire data estate.",
  },
  {
    icon: "🔐",
    name: "Zero Trust Architecture",
    tag: "Zero Trust · IAM · Security",
    body: "Perimeter security died when your team went remote. We architect zero-trust systems where every request is verified, every access is logged, and lateral threats are caught before they become a breach.",
  },
  {
    icon: "☁️",
    name: "Cloud Infra & DevSecOps",
    tag: "AWS · GCP · Kubernetes",
    body: "Releases shouldn't depend on who remembers which compliance check ran last. We ship cloud infra and DevSecOps where compliance is continuous and your team deploys with confidence - not anxiety.",
  },
  {
    icon: "📊",
    name: "Data Engineering & Pipelines",
    tag: "Kafka · Spark · Databricks",
    body: "Data lives in dozens of systems that don't agree - and every broken pipeline becomes an apology to the business. We build real-time pipelines that make your estate queryable, reliable, and actionable across every source.",
  },
  {
    icon: "🧠",
    name: "ML Platform Engineering",
    tag: "MLOps · Model Serving",
    body: "Models that never leave the notebook don't change revenue or risk. We build ML platforms that move work from notebook to production - reliably, repeatably, at enterprise scale.",
  },
] as const;

export const STACK_EYEBROW = "Engineering foundation";
export const STACK_TITLE = "The stack behind every";
export const STACK_TITLE_EM = "platform we ship";
export const STACK_NOTE =
  "No experimental tools. No vendor lock-in. Every technology is production-proven across enterprise deployments in UAE, India, Singapore, and Europe. We choose tools that earn their place - or we build what doesn't exist yet.";

export type HomeStackTool = { readonly name: string; readonly role: string; readonly icon?: string };

export const STACK_PANELS: readonly {
  readonly id: string;
  readonly label: string;
  readonly tools: readonly HomeStackTool[];
}[] = [
  {
    id: "ai",
    label: "Agentic AI",
    tools: [
      { name: "LangChain", role: "Agent orchestration", icon: "langchain" },
      { name: "LlamaIndex", role: "RAG pipelines" },
      { name: "OpenAI / Anthropic", role: "LLM APIs", icon: "openai" },
      { name: "Ollama", role: "Local inference", icon: "ollama" },
      { name: "Weaviate", role: "Vector database" },
      { name: "FastAPI", role: "AI service layer", icon: "fastapi" },
      { name: "Celery", role: "Task orchestration", icon: "celery" },
      { name: "MLflow", role: "Experiment tracking", icon: "mlflow" },
    ],
  },
  {
    id: "sec",
    label: "Cybersecurity",
    tools: [
      { name: "OpenSearch", role: "SIEM log store", icon: "opensearch" },
      { name: "Wazuh", role: "HIDS / NIDS" },
      { name: "Suricata", role: "Network IDS/IPS" },
      { name: "Zeek", role: "Network analysis" },
      { name: "MITRE ATT&CK", role: "Threat framework" },
      { name: "Sigma Rules", role: "Detection rules" },
      { name: "TheHive", role: "Case management" },
      { name: "STIX/TAXII", role: "Threat intel" },
    ],
  },
  {
    id: "search",
    label: "Search & Data",
    tools: [
      { name: "Elasticsearch", role: "Full-text search", icon: "elasticsearch" },
      { name: "Apache Kafka", role: "Event streaming", icon: "apachekafka" },
      { name: "Apache Spark", role: "Batch processing", icon: "apachespark" },
      { name: "Databricks", role: "Data lakehouse", icon: "databricks" },
      { name: "Snowflake", role: "Cloud warehouse", icon: "snowflake" },
      { name: "dbt", role: "Data transformation", icon: "dbt" },
      { name: "Airflow", role: "Pipeline orchestration", icon: "apacheairflow" },
      { name: "Neo4j", role: "Graph database", icon: "neo4j" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud Infra",
    tools: [
      { name: "AWS", role: "Primary cloud", icon: "amazonaws" },
      { name: "GCP", role: "AI / ML workloads", icon: "googlecloud" },
      { name: "Azure", role: "Enterprise Microsoft", icon: "microsoftazure" },
      { name: "Kubernetes", role: "Container orchestration", icon: "kubernetes" },
      { name: "Terraform", role: "Infrastructure as code", icon: "terraform" },
      { name: "Helm", role: "K8s packages", icon: "helm" },
      { name: "Istio", role: "Service mesh", icon: "istio" },
      { name: "Vault", role: "Secrets management", icon: "vault" },
    ],
  },
  {
    id: "obs",
    label: "Observability",
    tools: [
      { name: "Grafana", role: "Dashboards", icon: "grafana" },
      { name: "Prometheus", role: "Metrics", icon: "prometheus" },
      { name: "Jaeger", role: "Distributed tracing", icon: "jaeger" },
      { name: "Loki", role: "Log aggregation" },
      { name: "OpenTelemetry", role: "Observability", icon: "opentelemetry" },
      { name: "Kibana", role: "Log visualization", icon: "kibana" },
    ],
  },
  {
    id: "dev",
    label: "DevSecOps",
    tools: [
      { name: "GitLab CI/CD", role: "Pipelines", icon: "gitlab" },
      { name: "SonarQube", role: "Code quality", icon: "sonarqube" },
      { name: "Trivy", role: "Container scanning", icon: "trivy" },
      { name: "OWASP ZAP", role: "DAST testing", icon: "owasp" },
      { name: "Falco", role: "Runtime security", icon: "falco" },
      { name: "OPA / Gatekeeper", role: "Policy enforcement" },
    ],
  },
];
