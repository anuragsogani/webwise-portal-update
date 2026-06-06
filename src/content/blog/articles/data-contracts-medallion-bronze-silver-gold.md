## TL;DR

- **Bronze is a contract boundary**, not a junk drawer: every stream needs a named producer, schema policy, and freshness SLA before data lands.
- **Silver is where business logic becomes testable**: joins, cleansing rules, and finance definitions converge here with CI-enforced tests.
- **Gold exposes promises**: every column in an exec dashboard should trace to a contract test and a semantic definition.
- Programmes that skip contracts at Bronze pay for it in Silver remediation and Gold audit failures  -  typically at the worst possible moment.

---

## The problem worth naming

Medallion architectures are structurally sound. Bronze → Silver → Gold is a clean mental model for progressive data quality. The failure mode is not architectural  -  it is governance.

Teams treat Bronze as "dump everything here and sort it out later." That decision compounds. By the time data reaches Gold, lineage is opaque, semantic definitions are missing, and finance has stopped trusting the numbers. At that point, the problem is no longer a data engineering problem  -  it is a credibility problem.

According to Gartner's research on data quality, poor data quality costs organisations an average of $12.9 million per year. For financial services firms under regulatory frameworks like UAE Central Bank requirements or EU DORA, the cost includes regulatory exposure as well as operational waste.

This article is for data architects and engineering leads who are aligning **lake governance** with how the business actually decides  -  and who want to know where contracts need to go before volume, not after incidents.

---

## What a data contract actually contains

A data contract is a machine-readable agreement between a data producer and its consumers. It names:

- **Producer**  -  the team or system generating the data, with an on-call contact
- **Schema**  -  field names, types, nullability, and evolution rules (additive vs breaking)
- **Freshness SLA**  -  maximum acceptable lag between event time and availability in Bronze
- **Quality checks**  -  null rate thresholds, referential integrity, and anomaly bounds
- **Breaking-change calendar**  -  scheduled dates for schema migrations, with consumer notification lead time

Contracts are enforced in CI on pull requests that touch schemas or transformation logic  -  not in documentation wikis that nobody reads at midnight.

---

## Bronze: ingest with a contract or don't ingest at all

Bronze receives raw or lightly-typed events with immutable audit fields: ingestion timestamp, source system, and processing version. The most important governance decision at Bronze is the admission gate.

**Reject streams without a named producer on-call.** This sounds harsh. In practice, it prevents the situation where a source system changes its schema silently and three weeks later an analyst discovers the pipeline broke before the platform team did.

Bronze contracts should specify:
- Which fields are guaranteed vs best-effort
- What happens when the producer violates the SLA (alert thresholds, circuit breaker policy)
- Retention period and deletion governance

The Bronze layer should never be where cleansing happens. That is Silver's job. Bronze should be a high-fidelity audit record that survives a reprocessing run.

---

## Silver: where opinions must converge

Silver is where raw events become business-meaningful records. Joins, deduplication, business rule application, and the merge of domain definitions all happen here.

This is also where contracts become most contentious  -  because Silver is where Engineering and Finance first disagree about what a number means.

**Example**: Is "active user" defined by last login, last transaction, or a product-specific event? Finance uses one definition for ARR calculations. Product uses another for activation metrics. If Silver doesn't resolve this with a tested, versioned definition, Gold inherits two incompatible numbers and the executive dashboard shows whatever the last BI analyst hardcoded.

Enforce Silver contracts with automated tests that fail CI when:
- Upstream schema drift breaks transformation assumptions
- Null rates exceed agreed thresholds
- Record counts deviate more than 3 standard deviations from the rolling window average

The Silver contract is also where **lineage documentation** becomes non-optional. Every Gold column should trace to a Silver transformation, which traces to a Bronze source contract. Lineage without traceability is decoration.

---

## Gold: publish promises, not assumptions

Gold exposes curated aggregates and dimensions. The audience includes finance, product, executives, and external audit requirements. Every Gold column should have:

1. A **semantic definition** readable by a new hire in finance  -  not an internal system ID reference
2. A **test** in the pipeline that validates the column against its definition
3. A **source trace** back through Silver to Bronze contracts

When a Gold metric fails an audit  -  "why did this number change on Thursday?"  -  the answer should be findable in the contract test logs, not in a Slack thread.

---

## Operationalising contracts at scale

Programmes that maintain lake governance under growth pressure run contract tests in the pipeline and publish a breaking-change calendar. They also designate a data contract owner per domain  -  not a centralised governance team that becomes a bottleneck, but a federated model where the producer owns the contract and the platform enforces compliance.

Tools that support this pattern include Great Expectations, dbt tests, and schema registries (Confluent, AWS Glue Schema Registry). The tooling matters less than the discipline: **contracts must exist before volume, not be retrofitted under incident pressure**.

---

## Key takeaways

- Require producer, SLA, and schema policy before any new Bronze stream is accepted.
- Enforce contracts in CI at every layer, not only in documentation.
- Resolve business definition conflicts at Silver  -  not in BI tools downstream.
- Keep Gold columns traceable to tests, Silver transforms, and Bronze source contracts.
- Publish a breaking-change calendar with adequate consumer lead time.
- Treat the contract owner as an engineering role, not a governance checkbox.

For common buyer questions, see the **FAQ** on this page.

*Related: [Real-time analytics pipelines with finance-grade SLAs](/blog/real-time-analytics-pipelines-sla-finance) · [KYC ML pipelines and operational debt](/blog/kyc-ml-pipelines-operational-debt)*
