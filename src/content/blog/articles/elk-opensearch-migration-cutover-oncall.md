## TL;DR

- **On-call owns the rollback story**, not the migration deck: snapshot restore paths must be rehearsed, timed, and documented before the cutover window opens.
- **Dual traffic beats big bang** when scoring or dashboards matter: compare results over at least 10 business days before writing traffic to the new cluster.
- **Index templates are landmines**: inventory them before cutover week, not during it  -  especially Kibana/OpenSearch Dashboards index patterns.
- **Never start a Sunday cutover with an untested restore**  -  the engineer on call at midnight should not be problem-solving, they should be executing a rehearsed plan.

---

## The recurring failure mode

ELK-to-OpenSearch migrations fail for predictable reasons that have nothing to do with the technical quality of either platform. They fail because:

1. **Teams inventory configurations during the migration**, not before  -  discovering incompatible ingest processors or ILM policy syntax issues during the cutover window
2. **Snapshot restore timings are unknown until they matter**  -  a restore that takes six hours under realistic conditions is a very different conversation at 2 a.m. than one that takes forty minutes
3. **Rollback authority is unclear**  -  when the cutover shows unexpected latency or missing dashboards, the question "do we roll back?" takes longer to answer than the rollback itself
4. **Observability goes dark during the migration**  -  the very platform being migrated is often also the observability stack, creating a window where teams can't see what's failing

This checklist is for platform teams who know how to index logs and now need to move a production environment without taking observability offline.

---

## Phase 0: Discovery (weeks 1–2)

Discovery is the most valuable phase and the most frequently compressed. A thorough discovery prevents the majority of cutover-week surprises.

### Configuration inventory

Run a full inventory of:
- All index templates (legacy templates and composable component templates separately)
- All index patterns in Kibana / OpenSearch Dashboards
- All ingest pipelines with their processors listed
- All ILM policies with phases and actions
- All role mappings and security realm configurations
- All saved searches, dashboards, and alerting rules
- Cross-cluster search or replication configurations if present

For each item, classify as: (a) confirmed compatible, (b) needs rewrite, (c) uses unsupported features.

### Cluster health baseline

Document the current cluster's performance baseline before migration work begins:
- P50, P95, P99 query latency by index category
- Indexing throughput under peak load
- Shard count and distribution
- Snapshot duration for a full cluster backup

This baseline becomes your acceptance criteria for the target cluster.

### On-call readiness assessment

Identify who is on-call during the cutover window, verify they have access to both clusters and the rollback procedure, and confirm they have the authority to initiate rollback without escalation if latency or error thresholds are breached.

---

## Phase 1: Target cluster setup (weeks 2–4)

Build the target OpenSearch cluster to match or exceed the production capacity of the source.

**Template and pipeline migration**:
- Recreate all classified-as-compatible templates first
- Rewrite incompatible templates and validate against sample documents before any shadow traffic begins
- Test all ingest pipelines against representative documents, including edge cases

**ILM policy translation**:
OpenSearch's Index State Management (ISM) differs from Elasticsearch's ILM in syntax and some capabilities. Translate ILM policies to ISM policies explicitly  -  do not assume automatic compatibility. Test ISM policies on non-production indices before shadow indexing begins.

**Security configuration**:
Recreate security realms, role definitions, and role mappings explicitly. Test authentication flows under the same conditions as production before any production traffic is routed to the target.

---

## Phase 2: Parallel operations (minimum 10 business days)

### Shadow indexing

Configure the indexing pipeline to write to both clusters simultaneously. For logging infrastructure (Logstash, Fluent Bit), this typically involves forking output to both Elasticsearch and OpenSearch endpoints.

During shadow indexing:
- Compare document counts daily between source and target for each index
- Compare field mapping consistency  -  fields that appear in source but not target indicate ingest pipeline processing differences
- Monitor the target cluster's performance under the additional write load

### Shadow traffic (for query-facing indices)

If the migrated cluster serves customer-facing or analyst-facing queries, run shadow query traffic: log queries against the source, replay the same queries against the target, and compare result sets.

Use a sampled subset (typically 1–5% of production query volume) rather than full traffic mirroring. Log the top-10 results from each cluster for a representative query sample. A human review of score differences is more reliable than an automated score comparison for full-text relevance assessment.

Minimum shadow traffic period before cutover: **10 business days** for customer-facing search, **5 business days** for internal/operational search.

---

## Phase 3: Cutover preparation

### Schema freeze

No template, pipeline, or configuration changes to either cluster for the 5 business days before the cutover window. Changes during this period introduce confounding variables.

### Rehearsal snapshot restore

The week before cutover:
1. Take a full cluster snapshot of the target cluster
2. Restore it to a temporary environment
3. Measure restore duration end-to-end
4. Document: who ran it, how long it took, what commands were used

This document is the rollback procedure. The on-call engineer executes it from documentation, not from memory.

### DNS/routing pre-positioning

Configure the load balancer or DNS layer for a single-command switch between source and target. The switch must not require consumer redeploys. Test the switch to target and back to source in a pre-production environment.

---

## Phase 4: Cutover execution

**The hour before the window**:
- Verify both clusters are healthy and document their baseline metrics
- Confirm on-call contact is available and has read the rollback procedure
- Announce the maintenance window to stakeholders

**During the window**:
- Switch writes to target cluster
- Monitor error rate, latency, and document count on target for 30 minutes
- If thresholds are breached: rollback immediately using the documented procedure  -  do not troubleshoot during the window
- If stable: switch reads to target

**Rollback thresholds (example  -  adjust to your SLAs)**:
- Query P95 latency > 150% of baseline
- Indexing throughput < 70% of baseline
- Error rate > 0.5%

**After the window**:
- Keep source cluster in shadow-read mode for 48 hours minimum
- Monitor both clusters continuously during this period
- Do not decommission the source cluster for at least 72 hours after the cutover

---

## Key takeaways

- Inventory templates, pipelines, ILM, and security configurations in week one  -  not week five.
- Run parallel indexing for at least 10 business days; compare document counts and field mappings daily.
- Rehearse snapshot restore the week before cutover and document the timed procedure.
- Assign a named incident commander with clear rollback authority and threshold triggers.
- Keep source cluster available for at least 72 hours after cutover completes.

For common buyer questions, see the **FAQ** on this page.

*Related: [OpenSearch vs Elasticsearch: the evaluation checklist](/blog/opensearch-vs-elastic-cutover-checklist) · [How we built OpenSearch-scale search infrastructure](/portfolio)*
