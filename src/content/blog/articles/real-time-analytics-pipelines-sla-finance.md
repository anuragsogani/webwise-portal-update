## TL;DR

- **Finance reads contracts on freshness**: every metric delivered via streaming must have a documented latency SLA and permissible staleness definition  -  agreed in writing with the consumers, not assumed by engineering.
- **Streaming without explicit SLAs is an expensive experiment**: backpressure, late data, and replay scenarios must be owned by a named team with defined escalation paths.
- **Batch reconciliation is not a fallback  -  it is a design requirement**: every streaming metric should have a batch truth that validates it within agreed tolerance, with automated alerting when they diverge.
- "Real-time analytics" that finance doesn't trust is not real-time analytics. It is shadow-spreadsheet creation at scale.

---

## The problem that doesn't appear in the technical spec

Organisations invest in real-time analytics pipelines  -  Kafka, Flink, ClickHouse, or similar  -  and discover that finance is still running month-end close from batch exports. Product dashboards show one number; the CFO's spreadsheet shows a different one. Nobody knows which is right.

This isn't a technology problem. The same architecture that delivers reliable real-time analytics in some organisations fails in others with identical tooling. The difference is governance: agreed definitions, documented SLAs, tested reconciliation, and clear ownership of when numbers diverge.

This note is for data leads aligning product analytics with finance readouts under honest, defensible SLAs  -  in environments where the board will eventually ask "why did the Q3 dashboard show X but the audit showed Y?"

---

## Start with definitions, not architecture

Before any pipeline exists, the following must be agreed in writing with all metric consumers:

**Event time vs processing time**
Does the metric measure when the event occurred (event time) or when it was processed by the pipeline (processing time)? These produce different numbers when there is pipeline lag. Finance and product must agree which is appropriate for each metric, and the choice must be reflected in both the pipeline design and the metric documentation.

**Allowed lateness and watermarking**
For streaming systems, late-arriving events are a reality. Define: how late can an event be and still be included in the current period's aggregation? After what point does an event go into the next period or trigger a restatement? Document the watermark policy and ensure consumers understand what "real-time" means in practice.

**Restatement policy**
When upstream data is corrected, does the affected metric get restated? How far back does restatement propagate? Who approves a restatement? Who is notified? Without a written restatement policy, a data quality fix becomes a trust-destroying surprise when executives see numbers change after they were used in a board presentation.

**Permissible staleness per metric class**
Not all metrics have the same freshness requirements. Define staleness tolerance explicitly:
- **Operational metrics** (transaction throughput, error rate): < 60 seconds
- **Customer-facing metrics** (user balance, order status): defined by product SLA
- **Finance metrics** (revenue, ARR movement): defined by finance  -  typically < 15 minutes during business hours, with agreed degraded-mode tolerance

---

## SLA design for streaming pipelines

A streaming analytics SLA is a contract with four components:

1. **Freshness SLA**: the maximum lag between event occurrence and metric availability to consumers
2. **Correctness SLA**: the maximum acceptable error rate in reported metric values
3. **Availability SLA**: the minimum percentage of time the pipeline must be operational
4. **Restatement SLA**: the maximum time to correct and propagate a data quality fix

Define these per metric category, not as a single system-level SLA. A 99.9% availability SLA that covers both fraud alert metrics and marketing attribution metrics is not useful  -  the severity of downtime is fundamentally different.

---

## Backpressure: the failure mode that happens slowly

Streaming pipelines under load develop backpressure  -  upstream producers outpace downstream consumers. In Kafka-based architectures this manifests as consumer group lag. In Flink it manifests as operator buffer saturation. Both degrade freshness before they generate errors, which makes them easy to miss until finance asks why the dashboard is 40 minutes behind.

**Design decisions for backpressure handling:**

- **Drop**: discard events when consumer lag exceeds a threshold. Appropriate for metrics where approximate counts are acceptable (product analytics). Never appropriate for financial reporting.
- **Sample**: reduce ingestion rate to match consumer capacity. Creates representation bias  -  document which events are sampled and why.
- **Spill to cold storage**: persist excess events for replay after consumer capacity recovers. Adds latency but preserves completeness. Define who owns the spill storage cost and the replay trigger.

Choose explicitly. The pipeline under pressure will do one of these things  -  the question is whether you chose it or it happened by default.

---

## Batch reconciliation as a first-class design requirement

Every streaming metric should have a batch reconciliation job that:
1. Runs daily (minimum) at a defined time against authoritative source data
2. Computes the same metric using batch processing
3. Compares batch result to streaming result within an agreed tolerance window
4. Alerts when the difference exceeds tolerance  -  before anyone notices it manually

The reconciliation job is not a fallback for streaming failure. It is a permanent safety net that detects both streaming pipeline errors and definition drift (cases where the streaming and batch logic have diverged over time).

Document the reconciliation tolerance for each metric. "Revenue from streaming vs batch should differ by less than 0.01% over any 24-hour period" is a specific, testable commitment. "The numbers should be close" is not.

---

## The metric catalogue as operational infrastructure

Mature analytics estates maintain a metric catalogue with:
- Metric name and business definition
- Owner (team and named individual)
- SLA class (freshness, correctness, availability)
- Upstream dependencies (which data sources, which pipelines)
- Downstream consumers (which dashboards, which finance systems, which external reports)
- Restatement history (dated list of past corrections with root cause)

The metric catalogue is not documentation  -  it is operational infrastructure. When a metric fails or a reconciliation alert fires, the catalogue is where the on-call engineer finds the owner and the escalation path.

Build the catalogue at system launch. Retrofitting it after incidents have occurred is harder, more political, and less complete.

---

## Key takeaways

- Write freshness, correctness, availability, and restatement SLAs per metric class  -  agreed with finance before launch.
- Choose backpressure handling explicitly: drop, sample, or spill. Document the choice and its implications.
- Build batch reconciliation into the initial design with automated tolerance alerting.
- Maintain a metric catalogue with owners, SLA class, and dependency mapping.
- Treat the reconciliation alert as a trust signal  -  finance trusts streaming numbers when they know a batch check runs nightly.

For common buyer questions, see the **FAQ** on this page.

*Related: [Data contracts in Medallion lakes](/blog/data-contracts-medallion-bronze-silver-gold) · [KYC ML pipelines and operational debt](/blog/kyc-ml-pipelines-operational-debt)*
