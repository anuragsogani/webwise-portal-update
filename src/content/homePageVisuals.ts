/** Homepage visual slots - Duna layout positions, AiRAT-owned assets */

/** Scenic backgrounds - user landscape + sky band */
export const HOME_SCENE = {
  hero: "/images/scenes/hero_image.png",
  footer: "/images/trust/data-encryption.png",
  sky: "/images/scenes/sky-clouds.png",
} as const;

export type HomeVisual = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

/** Duna-style product UI mockups (original AiRAT art - not third-party assets) */
const DUNA = "/images/duna-style";

/** Feature-module screenshots - Security, AI, Data (max ~28rem wide in CSS) */
export const HOME_PATH_VISUALS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/feature-security-siem-timeline.svg`,
    alt: "SIEM correlated incident timeline showing endpoint, identity, and cloud signals converging on one event",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-ai-rag-wordcloud.svg`,
    alt: "Circular word map of RAG concepts including vectors, chunks, citations, and grounding boundaries",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-data-medallion-layers.svg`,
    alt: "Medallion data lake diagram with bronze, silver, and gold promotion layers",
    width: 560,
    height: 560,
  },
] as const;

/** Security & detection feature-module rotator - one visual per service heading */
export const HOME_SECURITY_SERVICE_VISUALS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/feature-security-siem-timeline.svg`,
    alt: "SIEM correlated incident timeline showing endpoint, identity, and cloud signals converging on one event",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-security-response-workflow.svg`,
    alt: "SOC response chart comparing auto-resolved alerts and analyst escalations by shift",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-security-detection-matrix.svg`,
    alt: "Detection engineering coverage matrix across severity tiers and log sources",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-security-evidence-trails.svg`,
    alt: "Immutable evidence trail with timestamps and audit events for board and regulator review",
    width: 560,
    height: 560,
  },
] as const;

/** AI & LLM feature-module rotator - one visual per service heading */
export const HOME_AI_SERVICE_VISUALS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/feature-ai-rag-wordcloud.svg`,
    alt: "Circular word map of RAG concepts including vectors, chunks, citations, and grounding boundaries",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-ai-agent-capabilities.svg`,
    alt: "Grid comparing production agent capabilities with safety guardrails for review, logging, and halt conditions",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-ai-evaluation-timeline.svg`,
    alt: "Evaluation harness timeline showing improving accuracy scores across model release versions",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-ai-compliance-dashboard.svg`,
    alt: "PII and compliance dashboard with redaction metrics, review queues, and declining hallucination rates",
    width: 560,
    height: 560,
  },
] as const;

/** Data & search feature-module rotator - one visual per service heading */
export const HOME_DATA_SERVICE_VISUALS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/feature-data-medallion-layers.svg`,
    alt: "Medallion data lake diagram with bronze, silver, and gold promotion layers",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-data-streaming-cdc.svg`,
    alt: "Change-data-capture streaming diagram from operational sources to analytical stores",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-data-opensearch-console.svg`,
    alt: "OpenSearch operations console with query latency, index health, and throughput metrics",
    width: 560,
    height: 560,
  },
  {
    src: `${DUNA}/feature-data-gold-metrics.svg`,
    alt: "Gold-layer metrics catalog with finance-approved KPI definitions and shared reporting views",
    width: 560,
    height: 560,
  },
] as const;

/** AI compliance showcase (dark-band slot when used) */
export const HOME_AI_SHOWCASE_VISUAL: HomeVisual = {
  src: `${DUNA}/ai-compliance-console.svg`,
  alt: "AI compliance workflow console with agent tasks, document verification, and audit events",
  width: 640,
  height: 640,
};

/** Trust feature-split pair (2-up compact grid) */
export const HOME_TRUST_VISUALS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/trust-evidence-console.svg`,
    alt: "Immutable evidence chain panel for SOC and compliance reviewers",
    width: 320,
    height: 320,
  },
  {
    src: `${DUNA}/trust-compliance-console.svg`,
    alt: "Compliance controls dashboard mapped to UAE, RBI, and EU frameworks",
    width: 320,
    height: 320,
  },
] as const;

/** Case study card thumbnails - Duna news-grid pattern */
export const HOME_CASE_THUMBS: readonly HomeVisual[] = [
  {
    src: `${DUNA}/feature-security-siem-timeline.svg`,
    alt: "",
    width: 480,
    height: 320,
  },
  {
    src: `${DUNA}/feature-ai-rag-wordcloud.svg`,
    alt: "",
    width: 480,
    height: 320,
  },
  {
    src: `${DUNA}/feature-data-medallion-layers.svg`,
    alt: "",
    width: 480,
    height: 320,
  },
] as const;
