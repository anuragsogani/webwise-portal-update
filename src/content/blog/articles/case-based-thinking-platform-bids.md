## TL;DR

- **Procurement rewards specificity**: incidents avoided, hours returned, and SLO language in acceptance criteria beat "digital transformation" as a bid strategy.
- **Architecture should trace to a case-shaped story**: problem → constraints → decision → measurable outcome. The case shapes the architecture narrative; the architecture does not stand alone.
- **NDA is not an excuse for vagueness**: anonymise client names, not methodology, metrics, or decision rationale. A well-constructed anonymised case is more credible than a vague named reference.
- Winning bids give procurement teams the language they need to defend shortlisting internally.

---

## Why platform bids collapse before final evaluation

Enterprise technology bids fail for reasons that have nothing to do with technical quality. The engineering team submits a proposal that demonstrates real capability  -  architecture choices, technology selection rationale, delivery model  -  and loses to a response that is structurally easier for procurement to defend.

The evaluator scoring the bid is often not the technical decision-maker. They are a procurement officer, a programme manager, or a business analyst who needs to justify shortlisting a vendor to a steering committee. They are not reading for technical depth  -  they are looking for:
- Evidence that you have done this before
- Language they can reuse in internal approval documents
- A clear answer to "what will have changed after go-live?"

Understanding this evaluator does not mean dumbing down the proposal. It means structuring technical depth in a case-shaped narrative that serves both the technical reviewer and the procurement officer simultaneously.

---

## The case-shaped narrative structure

A case-based narrative answers four questions in sequence:

**1. What was the problem?**
Describe the specific failure mode or operational gap  -  not the general category of problem, but the specific incident class that was costing the organisation money, time, or regulatory risk.

Good: "Search results were stale for up to 4 hours after catalogue updates, causing customer service escalations during promotion periods and affecting approximately 12% of product queries."

Not useful: "The client had search infrastructure challenges."

**2. What were the constraints?**
Name the constraints that determined the architecture choices. Budget, timeline, existing technology estate, compliance requirements, team skills  -  whatever shaped the decision space.

This section is where technical depth creates credibility. Naming constraints demonstrates that you understood the specific situation, not a generic problem pattern.

**3. What decisions were made and why?**
The architecture rationale is the most valuable section for technical evaluators. Walk through the decision points: why CDC over batch export, why this chunk size for the RAG retriever, why ISM policy over manual index management.

Decisions without rationale are architectural assertions. Decisions with rationale are defensible engineering choices.

**4. What changed, and how was it measured?**
This is the section procurement needs to forward to the steering committee. State the outcome in SLO language: "Search staleness reduced from P95 4h to P95 90s, measured over 30 days post-launch against the same query sample." This is not vanity  -  it is acceptance criteria language that the buyer can reuse in their project closure report.

---

## SLO language as the shared vocabulary

Procurement teams in regulated industries understand SLO language because their infrastructure teams use it. Using it in proposals signals that you think about delivery the same way their engineers do.

Map your outcome claims to SLOs the buyer already tracks:
- **MTTR** (mean time to restore): relevant for infrastructure, security, and search reliability programmes
- **Error budget**: relevant for platform teams with defined availability SLAs
- **Query latency percentiles** (P95, P99): relevant for search and data platform improvements
- **False positive rate**: relevant for fraud, KYC, and detection engineering programmes

If the buyer's current SLO for their system is "P95 query latency < 500ms," and your proposal says "we will reduce P95 query latency from 850ms to below 400ms," that is a specific, verifiable commitment in language the buyer understands.

---

## Anonymisation without losing rigour

NDAs restrict client identification, not methodology. A strong anonymised case study retains:
- The industry vertical and rough size category ("a regional bank with 2M+ retail customers")
- The specific problem metrics ("search latency P95 840ms, generating ~500 support contacts/week")
- The decision rationale ("we chose event-driven index invalidation over scheduled reindexing because the promotion frequency made scheduled windows too wide")
- The outcome metrics ("P95 latency reduced to 390ms; support contacts down 68% in the following quarter")

What you remove: client name, geography (if identifying), specific technology vendor names where contractually restricted.

An anonymised case with this level of detail is more credible to a technical evaluator than a named reference with vague claims. Technical evaluators can identify over-generalised cases. They respond to specificity.

---

## The appendices that procurement needs

Winning bids include appendices that evaluators can forward directly for internal approval without modification:

**RACI**: which roles on the client side own which decisions during delivery. Procurement teams under change management governance need this.

**Rollback plan**: what happens if the go-live is not satisfactory. A documented rollback plan signals delivery maturity and reduces procurement risk perception.

**90-day success definition**: what will be measurably true 90 days after go-live, in terms the buyer can verify independently.

**Risk register with mitigations**: the top 5–7 programme risks, named and with documented mitigations. Buyers defending the shortlist need to show they considered risk.

These appendices are not sales collateral  -  they are the working documents the buyer's project team will use if you win. Supplying them in the proposal demonstrates that you understand delivery, not just technology.

---

## Key takeaways

- Lead with case-shaped stories: specific problem, named constraints, decision rationale, outcome in SLO language.
- Use SLO and acceptance criteria language the buyer's engineering team already uses.
- Anonymise client names, not metrics or methodology.
- Ship appendices (RACI, rollback plan, 90-day success definition, risk register) that buyers can paste directly into internal approval documents.
- Give the non-technical evaluator the language to defend your shortlisting before they ask for it.

For common buyer questions, see the **FAQ** on this page.

*Related: [Explore AiRAT case studies and delivery outcomes](/portfolio) · [How AiRAT structures engagements](/services)*
