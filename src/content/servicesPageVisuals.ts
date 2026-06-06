/** Services page problem-class visuals — Duna-style AiRAT-owned SVGs */

import type { HomeVisual } from "./homePageVisuals";

const DUNA = "/images/duna-style";

export const SERVICE_BLOCK_VISUALS: Record<string, HomeVisual> = {
  cyber: {
    src: `${DUNA}/feature-security-siem-timeline.svg`,
    alt: "SIEM correlated incident timeline showing endpoint, identity, and cloud signals converging on one event",
    width: 560,
    height: 560,
  },
  genai: {
    src: `${DUNA}/feature-ai-rag-wordcloud.svg`,
    alt: "Circular word map of RAG concepts including vectors, chunks, citations, and grounding boundaries",
    width: 560,
    height: 560,
  },
  datalakes: {
    src: `${DUNA}/feature-data-medallion-layers.svg`,
    alt: "Medallion data lake diagram with bronze, silver, and gold promotion layers",
    width: 560,
    height: 560,
  },
  elk: {
    src: `${DUNA}/feature-service-elk-opensearch.svg`,
    alt: "OpenSearch observability dashboard with query latency, shard throughput, and migration cutover readiness",
    width: 560,
    height: 560,
  },
  fintech: {
    src: `${DUNA}/feature-service-fintech.svg`,
    alt: "FinTech platform diagram with KYC traceability, trade latency, and audit-ready custody workflows",
    width: 560,
    height: 560,
  },
  ecom: {
    src: `${DUNA}/feature-service-ecommerce.svg`,
    alt: "E-commerce search chart with sub-second catalog latency, relevance tuning, and campaign-ready checkout",
    width: 560,
    height: 560,
  },
  aiops: {
    src: `${DUNA}/feature-service-aiops.svg`,
    alt: "AIOps diagram correlating logs, metrics, and traces into owner-context incidents with journey SLOs",
    width: 560,
    height: 560,
  },
  cloud: {
    src: `${DUNA}/feature-service-cloud-native.svg`,
    alt: "Cloud-native platform diagram with Kubernetes domains, CI/CD guardrails, and deploy frequency trends",
    width: 560,
    height: 560,
  },
  internal: {
    src: `${DUNA}/feature-service-internal-platform.svg`,
    alt: "Internal platform diagram with RBAC workflows, unified web and mobile surfaces, and ERP integrations",
    width: 560,
    height: 560,
  },
};
