## TL;DR

- **Commercial posture matters as much as shard math**: map licence obligations, support SLAs, and on-call ownership before selecting a target.
- **Cutover is a data movement programme**: dual-write or dual-read windows, reindex throughput under production load, and documented rollback paths are the real schedule drivers.
- **Templates and pipelines travel**: inventory ILM policies, ingest pipelines, and security realms in week one  -  surprises surface in edge indices, not the happy path.
- **Shadow traffic is not optional** for customer-facing search: scoring regressions are invisible until you compare results at production query load.

---

## Why this decision is made badly

The Elasticsearch vs OpenSearch decision is frequently framed as a technical comparison  -  query DSL compatibility, performance benchmarks, plugin availability. In practice, the decision is driven by commercial considerations that engineering teams often don't own: licence cost, vendor support terms, compliance certification status, and who answers a P1 call at 3 a.m.

The engineering team evaluates features. Finance evaluates the licence renewal line item. Legal evaluates certification coverage (SOC 2, ISO 27001, etc.) and vendor lock-in risk. Procurement evaluates support SLA alignment with your error budgets. If these conversations don't happen before the architecture decision, they happen as blockers after the decision is announced.

This article is for CTOs and platform leads who need a defensible evaluation checklist  -  not a feature matrix from 2019.

---

## Commercial and support evaluation

Before comparing index throughput or query latency, answer four commercial questions:

**1. Who invoices whom under which terms?**
Elastic's licensing history has included significant changes (SSPL in 2021) that surprised organisations that assumed OSS flexibility. OpenSearch is Apache 2.0 licensed with an explicit commitment from AWS. If licence terms have board-level visibility, document the history and trajectory of both.

**2. Who owns incident response at 3 a.m.?**
Managed offerings (Elastic Cloud, Amazon OpenSearch Service) transfer incident ownership to the vendor within SLA boundaries. Self-managed deployments on EC2 or bare metal transfer it to your platform team. Evaluate this against your current platform team capacity and on-call structure  -  not against an idealised future state.

**3. What are the RPO/RTO requirements for the search tier?**
For customer-facing search with 99.9% availability SLAs, the replication configuration, snapshot policy, and restore time must be validated against those commitments. Planned migrations regularly underestimate restore time across regions or cloud zones.

**4. What does the compliance certification matrix look like?**
If your environment requires FedRAMP, HIPAA, PCI DSS, or regional equivalents, verify that the managed service or self-managed configuration covers those requirements. Certification coverage changes  -  validate at migration time, not at last year's audit.

---

## Inventory before you commit to dates

The most common cause of migration schedule overruns is discovering incompatible configurations late in the project. Inventory these in week one, not week four:

**Index templates and component templates**
Export all index templates and classify each as: (a) compatible with target version, (b) needs modification, or (c) uses features not available in target. Templates for edge indices  -  monitoring, audit, and system indices  -  are frequently forgotten until cutover.

**Ingest pipelines**
Each ingest pipeline processor must be validated against the target version. Pipelines using `convert`, `gsub`, or custom processor plugins are common sources of surprises. Map each pipeline to the indices that depend on it.

**ILM policies**
Index Lifecycle Management policy syntax and feature coverage differs between Elasticsearch versions and between Elasticsearch and OpenSearch. Audit every ILM policy for actions or transitions that may require rewriting.

**Security realms and role mappings**
Security configuration  -  authentication realm setup, role mappings, field-level security  -  must be translated explicitly. Authentication mechanisms that work by default in Elastic Cloud may require explicit configuration in OpenSearch.

**Cross-cluster search and replication**
If you use cross-cluster search (CCS) or cross-cluster replication (CCR), these configurations must be explicitly recreated. The topology assumptions may not transfer.

---

## Capacity modelling for migration

Reindex operations and shadow traffic runs stress the cluster differently from normal query load. Model capacity separately for:

- **Reindex throughput**  -  how many documents per second can the target cluster ingest while still serving query traffic at acceptable latency?
- **Snapshot and restore timing**  -  under realistic network conditions (including cross-region egress), how long does a full snapshot restore take? Run this with actual data volumes, not small-scale tests.
- **Peak query load + migration background load**  -  migration runs concurrently with production traffic. Model the combined load and set throttling limits on reindex jobs to protect user-facing latency.

---

## The cutover phases in practice

### Shadow traffic phase (minimum 2 weeks for customer-facing search)

Run queries against both clusters simultaneously. Log the top-N results from each for a sampled set of queries. Compare: document scores, result ordering, and latency distribution. Scoring regressions in full-text search are not visible in document count comparisons  -  they only appear in relevance comparisons.

End the shadow phase only when you have documented that result quality and latency are acceptable on the target cluster at production query load.

### Schema freeze

Freeze all schema changes (new indices, template modifications, pipeline changes) for a minimum of 5 business days before the cutover window. Changes during this period introduce variables that are difficult to isolate if the cutover reveals unexpected behaviour.

### The flip

- Name a single incident commander with authority to initiate rollback without escalation
- Pre-position a DNS or load balancer switch that routes reads back to the previous cluster without consumer redeploys
- Have a tested snapshot restore path available  -  rehearsed the previous week, with restore timings documented
- Communicate a read-only window for destructive index operations (delete by query, force merge) spanning the cutover window
- Set up real-time alerting on query latency, error rate, and index throughput before initiating the cutover

---

## Key takeaways

- Evaluate commercial, support, and compliance posture before technical feature comparison.
- Inventory templates, pipelines, ILM, and security realms in week one.
- Model reindex throughput, snapshot restore time, and peak query load under pessimistic network assumptions.
- Run shadow traffic for at least two weeks before cutover for customer-facing search.
- Assign a named rollback owner with pre-tested snapshot restore procedure.

For common buyer questions, see the **FAQ** on this page.

*Related: [ELK to OpenSearch: cutover plans that respect on-call](/blog/elk-opensearch-migration-cutover-oncall) · [How we built OpenSearch-scale search for ecommerce](/portfolio)*
