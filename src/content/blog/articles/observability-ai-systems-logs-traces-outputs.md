## TL;DR

- **Treat model outputs like PII-bearing events**: classify, redact, and retain with the same rigour you apply to authentication logs  -  not as generic application logs.
- **Traces help when you know the question**: instrument retrieval, reranking, and generation as separate spans with explicit parent-child relationships. One giant trace per request does not help you debug retrieval failures at 3 a.m.
- **Sampling is policy, not default**: 100% capture of LLM inputs and outputs at production scale drowns your observability pipeline and creates compliance exposure. Sample by risk tier with documented justification.
- Classic APM tools were built for deterministic request/response services. LLM observability requires a different model.

---

## Why classic observability fails for AI systems

Distributed tracing tools (Jaeger, Zipkin, OpenTelemetry) and structured logging platforms (ELK, OpenSearch, Datadog) were designed for services with predictable inputs, deterministic outputs, and bounded latency. LLM systems violate all three assumptions:

- **Inputs can contain customer data verbatim**  -  prompts that include user-submitted text are sensitive in ways that generic request payloads are not
- **Outputs are non-deterministic**  -  the same input produces different outputs across runs, making traditional replay debugging unreliable
- **Latency is highly variable and context-dependent**  -  generation latency depends on output length, which depends on the prompt content
- **Chain length is dynamic**  -  a single user query may invoke retrieval, reranking, and multiple generation calls in a pattern that varies with query type

Classic observability captures what happened. AI observability needs to capture *which variant of the system* was running, *what inputs entered it*, and *whether the output met quality criteria*  -  not just whether the request completed in under 200ms.

---

## Signals taxonomy: metrics, logs, and traces

### Metrics (rates, saturation, cost)

Use metrics for operational signals that need low-latency alerting:
- Request rate and error rate by query category
- P50/P95/P99 latency by pipeline stage (retrieval, generation, total)
- Token consumption rate and cost per period
- Cache hit rate for embedding and completion caches
- Queue depth for async generation jobs

Metrics should not contain user data. They should contain counters, distributions, and derived values that are safe to retain indefinitely.

### Structured logs (discrete decisions)

Use structured logs for discrete decision events that require audit capability:
- Which corpus version was used for this query
- Which model version and temperature settings were applied
- Which policy bundle version was active
- Which moderation decision was made and why (category matched, threshold exceeded)
- Which retrieval documents were selected (by ID, not by content  -  unless your data classification explicitly permits content logging)

Structured logs support incident investigation. The question "which corpus version was serving queries when the accuracy regression appeared on Tuesday?" requires structured logs with version fields, not raw output dumps.

### Traces (latency attribution across pipeline stages)

Use distributed traces to attribute latency to specific pipeline stages. For RAG systems, this means separate spans for:
- Query preprocessing and embedding
- Vector search / keyword retrieval
- Reranking
- Context assembly (chunking, windowing)
- Generation (with token count as a span attribute)
- Output postprocessing and moderation

Distributed traces that capture the full chain allow on-call engineers to answer "was this slow because retrieval was slow or because generation was slow?" without parsing through raw logs.

---

## Data classification and redaction policy

LLM observability creates tension between debugging capability and data protection. The resolution is data classification at capture time, not at query time.

**Data classification tiers (example  -  adapt to your compliance requirements):**
- **Public / low sensitivity**: queries about publicly available information with no user-specific context. Full prompt logging acceptable per data retention policy.
- **Internal / medium sensitivity**: queries that include organisation-specific context but no regulated personal data. Log query intent and retrieved document IDs; redact named entities before logging.
- **Regulated / high sensitivity**: queries involving PII, financial data, health information, or other regulated categories. Log structured metadata only; do not log prompts or completions verbatim.

Apply redaction at the edge of capture  -  at the instrumentation layer  -  not at query time in the observability UI. Redaction that runs at display time does not protect data in transit or at rest in the logging pipeline.

---

## Retention policies by data class

Retention windows should differ by data class and compliance requirement:

- **Operational metrics**: 90 days hot, indefinite aggregated rollups
- **Structured event logs**: 1–2 years for typical enterprise compliance requirements (verify against your specific regulatory framework)
- **Traces with latency attribution**: 30 days is typically sufficient for incident investigation
- **Sampled output logs (low sensitivity)**: 30 days or as required for quality monitoring
- **Regulated category logs (metadata only)**: as required by applicable regulation, with audit trail

Work with your legal and compliance teams to define retention periods before the system goes live. Changing retention policy after the fact is technically and legally complex.

---

## Risk tiers and sampling policy

At production scale, logging 100% of LLM inputs and outputs is operationally expensive and creates unnecessary compliance surface. Define sampling rates by risk tier:

- **Public FAQ queries**: 1–5% sampling for quality monitoring; full error logging
- **Internal knowledge assistant queries**: 10% sampling with PII-safe redaction; full error logging
- **Regulated advice or decision support**: 100% metadata logging; sampled content logging only for low-risk category queries

Document the sampling policy as a written policy artefact. When a compliance officer asks "how do you know the system isn't degrading on regulated queries?" the answer is the sampling policy and the metrics it produces  -  not a guess.

---

## Incident drill design

Effective observability is validated by whether on-call engineers can answer specific questions during an incident without resorting to vendor consoles or post-hoc log mining:

- Which model revision was serving requests at 14:32 UTC on Tuesday?
- Which corpus snapshot was active when the accuracy regression appeared?
- What was the P95 generation latency for financial advisory queries in the 30 minutes before the alert fired?
- Which feature flags were enabled for tenant X during the incident window?

Design quarterly incident drills that test these specific questions against your observability infrastructure. If on-call engineers cannot answer them in under 5 minutes using available tooling, the observability system is not production-grade.

---

## Key takeaways

- Classify LLM outputs before logging; apply redaction at capture, not at display.
- Instrument retrieval, reranking, and generation as separate spans with explicit stage attributes.
- Separate metrics (operational alerting) from structured logs (audit trail) from traces (latency attribution).
- Define sampling rates by risk tier and document the policy.
- Validate observability through incident drills, not assumptions.

For common buyer questions, see the **FAQ** on this page.

*Related: [RAG evaluation ownership in production](/blog/rag-evaluation-ownership-production) · [Governed LLM APIs: rate limits, tenancy, and audit trails](/blog/governed-llm-apis-rate-limits-tenancy)*
