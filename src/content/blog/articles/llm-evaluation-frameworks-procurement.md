## TL;DR

- **Procurement defends numbers, not narratives**: publish latency percentiles, cost per successful task, and regression pass rates  -  not capability descriptions.
- **Separate offline suites from online probes**: both are required and neither replaces the other. Offline suites catch regressions before deployment; online probes detect drift in production.
- **Own the baseline**: the first production week's performance distribution is your reference. Guard it.
- **Publish an evaluation charter** that stakeholders sign before scale  -  so the definition of "good" is agreed once, not re-litigated every sprint.

---

## Why LLM programmes stall at procurement

LLM programmes that start well often stall at the expansion or renewal decision. Engineering has shipped results; the product is working. But when finance asks "What changed between Q2 and Q3?" and risk asks "How do you know the quality is maintained?", the answers are demos and qualitative assessments.

Procurement teams are not being unreasonable. They are applying the same scrutiny to LLM programmes that they apply to any enterprise software purchase: show me the metrics, show me the trend, show me what changed. The problem is that most LLM programmes do not build the evaluation infrastructure to answer those questions.

This note is for technical leads who need to align product, finance, and risk on what "good" means after go-live  -  and who want a framework that survives a vendor renewal conversation.

---

## Framework layer 1: offline regression suites

Offline regression suites are the foundation. They run against a fixed test set on every deployment candidate, gate release on defined thresholds, and produce versioned reports that accumulate over time.

**What an offline regression suite contains:**

- **Golden prompts with expected behaviours**: representative queries with defined correct outputs, including citation presence, structured format validation (JSON validity, required fields), refusal patterns for out-of-scope queries, and known edge cases from production incidents
- **Automated checks**: deterministic validators for format, safety, and completeness  -  things a machine can verify reliably without human judgement
- **Threshold definitions**: what pass rate on each check category is required to allow deployment? Set these before the first production deployment, with stakeholder sign-off

**What the suite should NOT include:**
- The same queries your team used for development  -  those are training examples, not evaluation examples
- Only "best case" queries that you know the system handles well
- Checks that require subjective human judgement at the speed of CI (those belong in periodic human review)

---

## Framework layer 2: online monitoring

Offline suites catch known failure patterns. Online monitoring catches unknown drift  -  changes in production usage patterns, model behaviour shifts, or distribution change in user queries that the offline suite doesn't cover.

**Core online metrics to track:**

- **Task success proxies**: for each major query type, define a proxy for success that can be measured without human review  -  citation presence, response length in expected range, absence of known failure patterns
- **Latency percentiles**: P50, P95, P99 at minimum, segmented by query type and user tier
- **Token spend per successful task**: not total token spend, but cost-per-unit-of-value. A system that uses 50% more tokens per query after a model change is degrading economically even if output quality is unchanged
- **Distribution shift indicators**: statistical tests on query embedding distributions to detect when production usage is diverging from the offline test set

**Alert design:**
Alert on distribution shift, not only error spikes. A system that is processing more queries with no increase in error rate but a significant shift in query content is operating outside the conditions it was evaluated for.

---

## Framework layer 3: human review loops

Automated metrics miss what human judgement catches  -  subtle quality degradation, tone shifts, or context errors that pass automated checks but fail user expectations.

Quarterly rubric-based review is the minimum:

1. Pull a stratified random sample from production (by query type, user tier, and time period)
2. Apply a consistent rubric that two reviewers can apply with >80% agreement  -  if reviewers consistently disagree, the rubric needs revision
3. Record scores in a format that allows trend analysis across review cycles
4. Compare scores to the automated metrics from the same period  -  divergence between human scores and automated proxies is a signal to recalibrate the proxies

The rubric should be short. A rubric that takes more than 3 minutes per example to apply will not be applied consistently. Keep it to 4–6 dimensions with simple 3-point scales.

---

## The evaluation charter

The hardest part of building an evaluation framework is not the technical implementation  -  it is getting alignment on what "good" means before the disagreements happen at scale.

An evaluation charter is a one-page document that defines, per major use case:
- The primary success metric and its threshold
- The measurement methodology (who measures, how often, what tool)
- The escalation path when thresholds are breached
- The stakeholders who have agreed to these definitions

Draft it before launch. Have product, finance, risk, and engineering sign off. When the sprint-14 question "is quality degrading?" comes up, point to the charter  -  not to an ad-hoc re-negotiation of what success means.

---

## What procurement will ask at renewal

Be prepared to answer:
- "What is the regression pass rate trend over the last 12 months?"  -  requires versioned offline suite reports
- "What is the cost per successful task compared to when we launched?"  -  requires cost and success metric tracking from day one
- "What was the last quality incident and what caused it?"  -  requires incident documentation linked to evaluation data
- "What changed between release X and release Y?"  -  requires release artefacts that include evaluation suite run IDs

If these questions require detective work to answer, the evaluation infrastructure is not production-grade.

---

## Key takeaways

- Build offline regression suites before launch, with stakeholder-agreed thresholds.
- Run online monitoring with distribution shift detection, not only error rate alerts.
- Conduct quarterly human review with consistent, short rubrics.
- Publish an evaluation charter and get sign-off before scaling traffic or budget.
- Store suite IDs and outcomes next to release artefacts so they are findable at renewal.

For common buyer questions, see the **FAQ** on this page.

*Related: [RAG evaluation ownership in production](/blog/rag-evaluation-ownership-production) · [Governed LLM APIs: rate limits, tenancy, and audit trails](/blog/governed-llm-apis-rate-limits-tenancy)*
