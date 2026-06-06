## TL;DR

- **Coverage maps are not quality**: rule count ≠ resilience. Measure noise rate, mean time to detect (MTTD), and analyst false-positive burden  -  not MITRE technique coverage percentage.
- **Unit tests for detections** are mainstream  -  treat detection rules like application code with peer review, version control, and automated tests against fixture telemetry.
- **MITRE alignment is a communication tool**, not a competitive scoreboard to maximise at the expense of operational quality.
- **Retirement is as important as creation**: a noisy rule that consumes analyst attention without producing true positives is worse than no rule at all.

---

## The problem worth naming directly

Detection engineering teams are drowning in alert volume while boards request "threat-informed" security programmes. The phrase is defensible  -  but without a detection engineering practice behind it, threat-informed is a label applied to a backlog of rules nobody owns.

According to Panther's 2023 SOC Productivity Report, the average SOC analyst spends 27% of their time on false positives. In environments with 500+ active detection rules, that figure increases significantly. The operational cost of poor detection quality is not a metric most CISOs surface to their boards  -  but it is a leading indicator of team attrition and incident response degradation.

This note is for security leaders building a sustainable detection lifecycle  -  not a one-time content drop that claims MITRE coverage and then stagnates.

---

## What "threat-informed" requires in practice

A threat-informed detection programme aligns rule development to the threats your organisation is actually likely to face  -  based on sector threat intelligence, your own incident history, and attacker TTPs observed in your supply chain.

The MITRE ATT&CK framework is the communication layer, not the goal. Aligning every Sub-Technique you can implement creates a long list of low-confidence rules that generate alert noise without proportionate threat signal. The goal is **fewer, higher-confidence detections** that cover the techniques most relevant to your threat model.

Prioritisation inputs:
- **Sector-specific threat intelligence** (FS-ISAC for financial services, HC3 for healthcare, etc.)
- **Your own incident post-mortems**  -  attackers who succeeded or nearly succeeded in your environment used specific techniques; those should be covered first
- **Supply chain risk**  -  techniques used against vendors or partners in your ecosystem
- **Red team and purple team findings**  -  what actually bypassed your controls in controlled testing

---

## Building a detection engineering practice

### Intake and triage

Before a new rule is developed, it should have a documented hypothesis: which specific technique is it targeting, under what conditions should it fire, and what is the expected true-positive rate based on the telemetry available?

Rules without hypotheses are noise waiting to happen. The intake gate prevents the accumulation of detections nobody fully understands.

### Development standards

Apply software engineering discipline to detection content:

- **Version control**: every rule in a git repository with commit history and reviewer attribution
- **Peer review**: at least one review by an analyst who did not write the rule, focused on false-positive risk and telemetry coverage
- **Automated tests**: representative telemetry fixtures (benign and malicious) that the rule should and should not fire on  -  run in CI before merge
- **Documentation**: attack scenario, data sources, expected true/false positive behaviour, and tuning guidance

If you cannot replay a detection firing in a staging environment against known-good and known-malicious telemetry, you do not understand the rule well enough to run it in production.

### Tuning and maintenance

Production detections require ongoing maintenance. Field telemetry changes, attacker techniques evolve, and legitimate user behaviour that previously was rare becomes common. Rules that are not maintained become either over-sensitive (analyst fatigue) or under-sensitive (detection gaps).

Track per-rule:
- True positive rate over a rolling 90-day window
- Analyst override rate (how often analysts close the alert without action)
- Mean time from alert creation to analyst triage
- False positive rate by environment (cloud vs on-prem, by BU or region)

Rules that have zero true positives in 180 days should be reviewed for retirement or redesign. Rules with analyst override rates above 80% are noise  -  they should be tuned immediately regardless of theoretical coverage value.

### Retirement with discipline

Retiring a noisy rule requires the same process as shipping a new one: documented rationale, stakeholder notification, and a record of the retirement decision. "We disabled it because it was noisy" is not sufficient documentation for a post-incident review or a regulatory audit.

---

## MITRE alignment as communication, not competition

MITRE ATT&CK alignment is valuable for communicating detection coverage to non-technical stakeholders and for gap analysis. It is not a measure of operational quality.

A programme with 30 high-confidence detections covering the 10 techniques most relevant to its threat model is more operationally effective than a programme with 300 low-confidence detections claiming coverage of 150 Sub-Techniques.

Present MITRE coverage alongside **confidence and freshness ratings**  -  not as a standalone percentage. A Technique covered by a rule last tuned in 2019 against telemetry that has since changed is not meaningfully covered.

---

## Detection deltas: making the programme legible

High-trust detection programmes publish weekly detection deltas to stakeholders: rules added, rules tuned, rules retired, and the hypothesis behind each change. This creates accountability, enables feedback from analysts and threat intelligence teams, and produces an audit trail that withstands post-incident scrutiny.

A delta report should be scannable in five minutes. If stakeholders need to read it for twenty minutes to understand what changed and why, the communication is not working.

---

## Key takeaways

- Prioritise TTPs from sector intelligence and your own incident history  -  not catalogue completeness.
- Apply software engineering discipline: version control, peer review, automated tests, documentation.
- Track true positive rates, analyst override rates, and MTTD per rule  -  retire what is not working.
- Align MITRE coverage reports with confidence and freshness ratings.
- Publish weekly detection deltas that are scannable and stakeholder-accessible.

For common buyer questions, see the **FAQ** on this page.

*Related: [SOC automation and evidence auditability](/blog/soc-automation-evidence-auditability) · [ELK to OpenSearch migration for SOC environments](/blog/elk-opensearch-migration-cutover-oncall)*
