## TL;DR

- **Rate limits are a product decision**, not infrastructure trivia: they express fairness guarantees and abuse tolerance per tenant tier.
- **Tenancy spans data, keys, and spend**  -  isolate embedding caches, billing meters, and retrieval indices by tenant, not only HTTP routes.
- **Abuse controls need human escalation paths**: fully automated enforcement creates false positives that become business incidents.
- Multi-tenant LLM gateways that survive production pressure are designed for it at the architecture stage  -  not hardened reactively after the first partner integration spike.

---

## Why "just add a rate limiter" isn't enough

LLM APIs typically enter production with a single API key, shared rate limits, and optimistic budget assumptions. This works fine at prototype scale. The failure modes surface when:

- A partner integration sends a burst of requests that exhausts the shared concurrency pool
- One tenant's poorly-structured prompts generate 10× the token spend of equivalent queries from other tenants
- A prompt injection campaign burns token budget before automated detection fires
- A compliance audit asks for per-tenant usage logs and finds only aggregate billing data

At this point, the platform team is firefighting without levers. Adding per-tenant controls after launch under production load is slower, riskier, and more expensive than designing them in.

This note is for backend leads shipping multi-tenant LLM gateways under enterprise expectations  -  financial services, SaaS platforms, and regulated industries where "we'll add governance later" is not a credible answer to procurement.

---

## Rate limiting as product design

Per-tenant rate limits are not a configuration detail  -  they are a product commitment to each tenant tier about what behaviour the platform guarantees.

**Design decisions that require product input:**

- **Token budgets per billing period**: how many tokens can a tenant consume per day/month before throttling? Different tiers should have different budgets, with clear upgrade paths.
- **Concurrency caps**: how many simultaneous requests can a single tenant send? This protects other tenants from noisy-neighbour effects.
- **Burst windows**: is short-burst traffic above the sustained rate allowed, or is a strict per-second cap enforced? Burst allowances improve user experience for latency-sensitive use cases.
- **Priority tiers**: under system pressure, which tenant requests are processed first? Premium tier guarantees should be encoded in the scheduling logic, not assumed.

**Clear 429 semantics**: rate-limited responses should include `Retry-After` headers with a specific timestamp, a machine-readable error code distinguishing between budget exhaustion and concurrency limit, and a human-readable message that tenant developers can surface to their users without modification.

---

## Tenancy isolation: beyond HTTP routes

True tenancy isolation for LLM workloads requires separation at multiple layers:

**API key isolation**
Each tenant should authenticate with a separate API key. Shared keys make it impossible to attribute usage, enforce per-tenant limits, or revoke access for a specific tenant without affecting others.

**Usage meters and billing**
Per-tenant token consumption should be metered independently and in real time. Surface usage dashboards to tenant administrators  -  not only to engineering  -  so tenants can monitor their own consumption and understand throttling decisions.

**Embedding cache namespacing**
If you cache embedding vectors for performance, namespacing by tenant is not optional. Shared caches without tenant isolation create timing-attack vectors where cross-tenant information leakage is possible under specific access patterns. Design as if this is a real attack surface  -  because in multi-tenant environments, it is.

**Retrieval index isolation**
For RAG workloads where different tenants have access to different document sets, retrieval indices must be isolated by tenant. Cross-tenant index access  -  even accidental, through query construction bugs  -  is a data breach in regulated environments.

---

## Abuse detection and safety controls

Multi-tenant LLM gateways face two categories of abuse: volume-based attacks (prompt flooding, cost exhaustion) and semantic attacks (prompt injection, jailbreaking, prohibited content generation).

**Volume-based controls**:
- Automated pattern detection for request rate anomalies (requests per second, tokens per minute above historical baseline)
- Per-tenant budget alerts at 50%, 80%, and 95% of period allowance
- Circuit breakers that halt a specific tenant's traffic without affecting others

**Semantic controls**:
- Input classification for prohibited content categories, implemented as a fast lightweight classifier before the primary model
- Output scanning for prohibited content, PII, and policy violations
- Logging decisions with enough context to tune classifiers, without storing prohibited content verbatim

**Human escalation paths**
Fully automated enforcement  -  auto-banning tenants who trigger abuse heuristics  -  creates false positives. A legitimate tenant integration that triggers a pattern-based detector will be auto-banned, generating a business-critical support escalation during off-hours. Design human review queues for flagged tenants rather than automatic enforcement for all cases.

---

## Operational readiness: the "tenant compromised" drill

High-governance LLM platforms rehearse specific incident scenarios:

**Scenario: Tenant API key leaked**
- Time to detect anomalous usage
- Time to revoke the compromised key
- Time to issue a replacement key to the legitimate tenant
- Impact on other tenants during key rotation

**Scenario: Tenant sends prohibited content**
- Logging and evidence preservation procedure
- Notification to tenant contact
- Temporary traffic block for affected tenant scope only

Rehearse these drills before a real incident requires them. Document the procedure, time it, and assign owners. The worst time to design the key rotation procedure is during a live incident.

---

## Key takeaways

- Design per-tenant budgets, concurrency caps, and burst windows at the architecture stage.
- Isolate API keys, usage meters, embedding caches, and retrieval indices by tenant.
- Implement clear 429 semantics with machine-readable error codes and `Retry-After` headers.
- Pair automated abuse detection with human review queues for edge cases.
- Rehearse key rotation and partial traffic block procedures before they are needed.

For common buyer questions, see the **FAQ** on this page.

*Related: [RAG evaluation ownership in production](/blog/rag-evaluation-ownership-production) · [LLM evaluation frameworks your CFO can defend](/blog/llm-evaluation-frameworks-procurement)*
