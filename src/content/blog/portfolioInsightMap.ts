/** Map portfolio case slug → related insight slugs (internal linking). */
export const INSIGHT_SLUGS_BY_PORTFOLIO: Record<string, readonly string[]> = {
  "elk-log-observability-tier1-bank": ["elk-opensearch-migration-cutover-oncall", "opensearch-vs-elastic-cutover-checklist"],
  "msazn-opensearch-ecommerce-search-uae": ["opensearch-vs-elastic-cutover-checklist", "rag-evaluation-ownership-production"],
  "enterprise-xdr-agent-windows-endpoint-protection": [
    "threat-informed-detection-engineering-practice",
    "soc-automation-evidence-auditability",
  ],
  "socai-bot-ai-cyber-compliance-assistant": ["soc-automation-evidence-auditability", "llm-evaluation-frameworks-procurement"],
  "enterprise-delta-lake-unified-analytics-platform": [
    "data-contracts-medallion-bronze-silver-gold",
    "real-time-analytics-pipelines-sla-finance",
  ],
  "hawkeye-multi-tenant-cybersecurity-platform": ["threat-informed-detection-engineering-practice", "case-based-thinking-platform-bids"],
};
