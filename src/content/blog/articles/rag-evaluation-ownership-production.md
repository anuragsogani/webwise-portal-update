## TL;DR

- **Ownership beats tooling**: someone must own offline metrics, online drift checks, and rollback criteria before you scale traffic.
- **Evaluation is a product surface**: prompts, retrievers, and rerankers all need versioned tests the same way APIs do.
- **Corpus version is a first-class dependency**: silent corpus updates that bypass evaluation are the most common source of production incidents in RAG systems.
- **Procurement reads receipts**: tie each release to a regression suite outcome  -  not a demo transcript or a vibes-based review.

---

## The failure mode is predictable, but organisations keep hitting it

Retrieval-augmented generation (RAG) systems fail in production for the same reasons repeatedly: stale corpora that no longer reflect the state of the world, silent embedding drift when a model is updated, rerankers trained on synthetic data that amplify the wrong signals in production, and evaluation that never escaped a Jupyter notebook.

The technical implementation is usually reasonable. The ownership structure is where things break.

When a production incident happens  -  "the system stopped surfacing relevant documents for the last three days"  -  the investigation reveals no single person who owned the evaluation gate. The corpus was updated by one team, the embedding model was swapped by another, and the prompt was tweaked by a third. Nobody ran the offline suite before the changes went live because nobody was explicitly responsible for doing so.

This note is for engineering leaders who already shipped a first RAG path, own incidents, and are now being asked cost and compliance questions they cannot answer without better evaluation structure.

---

## What production evaluation must cover

### Retrieval quality

Retrieval evaluation measures whether the system surfaces the documents a user's query actually requires. This is harder than it sounds, because "correct" is often subjective and query language in production diverges from canonical product terminology.

Measure **recall@k** on labelled query sets that reflect real user language  -  not only the clean examples your team wrote during development. Segment performance by user type, language, region, and business unit. Aggregated recall scores hide failing slices that matter to specific user populations.

Key metrics:
- Recall@3, Recall@5, Recall@10 on held-out query sets
- Mean Reciprocal Rank (MRR) for cases where ordering matters
- Segment-level recall to identify underperforming query populations

### Generation quality

Generation evaluation covers whether the system's output is accurate, safe, and useful given the retrieved context.

Use a combination of:
- **Automated checks**: citation presence (did the answer reference retrieved documents?), forbidden span detection (hallucinated names, dates, or prices), and length bounds
- **Sampled human review**: with explicit rubrics for accuracy, relevance, and tone  -  not general "looks good" assessments
- **LLM-as-judge evaluation**: for scale, with human calibration to ensure the judge aligns with ground truth

The failure mode for generation evaluation is over-relying on automated checks while the edge cases  -  the queries where the system hallucinated with confidence  -  accumulate in production.

### Operational signals

Latency, error rates, token spend, and cache hit ratio belong on the same dashboard as quality metrics. A fast wrong answer is still an incident. A slow right answer at 10x projected cost is a budget incident.

Track:
- P50/P95/P99 retrieval and generation latency
- Token consumption per query type (prompt + completion)
- Cache hit rate for repeated queries
- Error rate segmented by failure type (retrieval failure, generation error, timeout)

---

## Corpus versioning as a first-class dependency

The corpus  -  the document collection the retriever searches  -  is a versioned dependency, not a passive data store.

When the corpus is updated, the embedding space changes. Documents that ranked highly under the previous corpus distribution may rank differently under the new one. If you update the corpus without running retrieval evaluation against the new state, you are shipping a system with unknown properties.

Treat the corpus, chunking policy, embedding model, and reranker as **jointly versioned**. When any component changes, run the full offline evaluation suite. Gate deployment on thresholds agreed with risk and product before development begins  -  not thresholds set under pressure after a scheduled release.

---

## The evaluation ownership structure that works

The cleanest production programmes define:

1. **A single evaluation owner**  -  a named role (could be a senior engineer or ML platform lead) who has explicit authority to block release when evaluation thresholds are not met
2. **A weekly review cadence**  -  online metrics reviewed against offline baselines; deviations require documented explanation before the next release
3. **A documented rollback procedure**  -  prior index snapshot, prior model revision, and a communications path to support when answers shift

The evaluation harness itself should be an artefact you can hand to procurement in six months and re-run to validate current performance. If your evaluation only exists as a series of ad-hoc notebook runs, it is not an evaluation system  -  it is a demo preparation process.

---

## Questions procurement will ask

When enterprise procurement reviews a RAG deployment, the questions are predictable:
- "What is the system's accuracy on a standardised query set?"  -  requires a labelled eval set and reported metrics
- "How do you detect when the system's quality degrades?"  -  requires online monitoring with alerting thresholds
- "What is the rollback procedure?"  -  requires documented versioning and a tested restore process
- "Who is responsible for quality?"  -  requires a named owner with defined authority

Tie every release to a regression suite outcome. This protects both the engineering team (clear success criteria) and procurement (auditable evidence of due diligence).

---

## Key takeaways

- Version corpora, chunking policies, embedding models, and rerankers as a set  -  rerun the evaluation suite on every material change.
- Split retrieval and generation metrics by user segment before scaling traffic.
- Put latency, errors, and cost on the same dashboard as quality  -  operational and quality signals are jointly the responsibility of the evaluation owner.
- Define rollback criteria before deployment, not during an incident.
- Produce an evaluation harness as a deliverable, not only a set of notebook results.

For common buyer questions, see the **FAQ** on this page.

*Related: [Governed LLM APIs: rate limits, tenancy, and audit trails](/blog/governed-llm-apis-rate-limits-tenancy) · [LLM evaluation frameworks your CFO can defend](/blog/llm-evaluation-frameworks-procurement)*
