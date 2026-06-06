/** UI-only strings for the interactive “stacks” explorer (tags + eyebrow hooks) */

export const SERVICE_STACK_TAGS: Record<string, readonly string[]> = {
  fintech: ["Trading", "KYC/AML", "MPC", "Ledger", "Matching", "InsurTech"],
  genai: ["RAG", "Agents", "LLM", "Pinecone", "Qdrant", "Eval"],
  datalakes: ["Medallion", "Kafka", "CDC", "AWS", "GCP", "BI"],
  elk: ["OpenSearch", "Elasticsearch", "TLS", "Analyzers", "Hybrid", "CDC"],
  cyber: ["SIEM", "XDR", "EDR", "NTA", "UEBA", "Triage"],
  ecom: ["OpenSearch", "Redis", "Postgres", "Facets", "i18n", "ETL"],
  aiops: ["Logs", "Metrics", "Traces", "Synthetics", "Noise", "SLOs"],
  cloud: ["Kubernetes", "Docker", "Terraform", "GitHub", "IaC", "Vault"],
  internal: ["RBAC", "Workflows", "Web", "iOS", "Android", "ERP"],
};

export const SERVICE_STACK_EYEBROWS: Record<string, string> = {
  fintech: "Capital markets  -  throughput without regulatory regret",
  genai: "Signal  -  models you can observe, evaluate, and govern",
  datalakes: "Lakehouse  -  bronze to gold without losing the thread",
  elk: "Search & logs  -  relevance and retention under real load",
  cyber: "Consoles analysts actually live in  -  fewer false positives",
  ecom: "Catalog & checkout  -  sub-second when traffic spikes",
  aiops: "On-call reality  -  signal up, pager noise down",
  cloud: "Release velocity  -  same guardrails, faster ships",
  internal: "Operations core  -  workflows your org already speaks",
};

