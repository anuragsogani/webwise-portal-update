import { useEffect } from "react";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/methodology-page.css";

const PAGE_SEO = {
  title: "How We Work | AiRAT Delivery Methodology",
  description:
    "AiRAT's delivery methodology: senior-led engineering, SLO-anchored milestones, security-by-design, and production handover  -  from brief to go-live in regulated enterprise environments.",
};

const PHASES = [
  {
    num: "01",
    title: "Architecture review",
    duration: "Week 1–2",
    body: "A senior engineer reviews your environment, threat model, and compliance constraints. We identify the failure states first  -  including ours.",
    deliverable: "Scope document + risk register",
  },
  {
    num: "02",
    title: "Foundation sprint",
    duration: "Week 2–4",
    body: "Data pipeline architecture, security boundary design, and infrastructure-as-code baseline. Observable, testable components from day one.",
    deliverable: "Running infrastructure + observability baseline",
  },
  {
    num: "03",
    title: "Core delivery",
    duration: "Week 4–16",
    body: "Iterative delivery in two-week sprints with working software at each milestone. Every sprint ends in a deployed, observable system  -  not a presentation.",
    deliverable: "Running production components per sprint",
  },
  {
    num: "04",
    title: "Stabilisation",
    duration: "Week 14–18",
    body: "SLA validation under realistic load. Alert tuning, runbook creation, and documentation your team can operate without us.",
    deliverable: "SLA evidence + operational runbooks",
  },
  {
    num: "05",
    title: "Handover",
    duration: "Week 16–20",
    body: "Architecture documentation, incident playbooks, monitoring dashboards, and a 30-day hypercare period. Same engineers who built  -  run knowledge transfer.",
    deliverable: "Architecture docs + 30-day hypercare",
  },
];

const PRINCIPLES = [
  { title: "SLOs before build", body: "We agree success criteria  -  latency, uptime, alert reduction  -  before we write a line of production code." },
  { title: "Senior engineers stay", body: "The engineer reviewing your brief deploys to production. We do not use engagements as training grounds." },
  { title: "Security by design", body: "Detection, access control, encryption, and evidence trails are in the first design pass. Not a phase." },
  { title: "Observable from the start", body: "Every component is instrumented before production. When something breaks at 2am, your team has traces  -  not a phone call." },
  { title: "Compliance as architecture", body: "Data residency, audit trails, PII handling are first-class engineering constraints, not post-build checklists." },
  { title: "Production or we stop", body: "A milestone is not complete until the system is deployed, observable, and meeting its agreed SLOs." },
];

const FAQS = [
  {
    q: "Do you work fixed-price or time-and-materials?",
    a: "Both models are available depending on scope clarity. For well-defined programmes, fixed-price with agreed change control. For exploratory work, time-and-materials with monthly delivery reviews.",
  },
  {
    q: "What happens if we need to change scope mid-delivery?",
    a: "Scope changes are managed through a lightweight change control process  -  we document, assess impact, and agree before proceeding. No surprise charges.",
  },
  {
    q: "What is included in the architecture review?",
    a: "Environment assessment, threat model, integration points, performance and reliability requirements, and a delivery scope definition with agreed KPIs.",
  },
  {
    q: "What does hypercare look like after handover?",
    a: "A 30-day period of prioritised response for production issues. Delivery team remains available for incident support and runbook clarification.",
  },
] as const;

export default function MethodologyPage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-methodology",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Methodology", path: "/methodology" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-methodology", faqPageSchema(faqsToSchemaPairs(FAQS)));
    const howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How AiRAT delivers production engineering programmes",
      description: PAGE_SEO.description,
      step: PHASES.map((ph) => ({
        "@type": "HowToStep",
        name: ph.title,
        text: ph.body,
        position: parseInt(ph.num, 10),
      })),
    };
    const rmHowTo = injectJsonLdScript("airat-ld-howto-methodology", howTo);
    return () => { rmBc(); rmFaq(); rmHowTo(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={PAGE_SEO.title} description={PAGE_SEO.description} />
      <SiteHeader />

      <main className="sp-main me-main" id="main-content">
        {/* Hero */}
        <div className="sp-hero">
          <span className="sp-eyebrow">How we work</span>
          <h1 className="sp-hero__h1">Five phases. Same engineers throughout.</h1>
          <p className="sp-hero__body">
            Senior-led delivery, SLO-anchored milestones, and production handover. No junior parachute teams. No slide-deck milestones.
          </p>
        </div>

        <hr className="sp-rule" />

        {/* Numbered phases */}
        <section className="sp-section" aria-labelledby="me-phases-heading">
          <div className="sp-section__label">
            <span className="sp-label">Delivery phases</span>
          </div>
          <div className="sp-section__body">
            <h2 id="me-phases-heading" className="sp-section-title">From brief to production</h2>
            <div className="sp-values me-phases">
              {PHASES.map((ph, i) => (
                <RevealOnScroll key={ph.num} delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="sp-value-item">
                  <span className="sp-value-item__num">{ph.num}</span>
                  <div>
                    <p className="sp-value-item__title">
                      {ph.title}
                      <span className="me-phase__duration">{ph.duration}</span>
                    </p>
                    <p className="sp-value-item__sub">{ph.body}</p>
                    <span className="me-phase__deliverable">{ph.deliverable}</span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Engineering principles */}
        <section className="sp-section" aria-labelledby="me-principles-heading">
          <div className="sp-section__label">
            <span className="sp-label">Engineering principles</span>
          </div>
          <div className="sp-section__body">
            <h2 id="me-principles-heading" className="sp-section-title">How we make decisions</h2>
            <div className="sp-grid-2">
              {PRINCIPLES.map((p, i) => (
                <RevealOnScroll key={p.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="sp-card">
                  <p className="sp-card__title">{p.title}</p>
                  <p className="sp-card__body">{p.body}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* FAQ */}
        <section className="sp-section" aria-labelledby="me-faq-heading">
          <div className="sp-section__label">
            <span className="sp-label">FAQ</span>
          </div>
          <div className="sp-section__body">
            <h2 id="me-faq-heading" className="sp-section-title">Engagement questions</h2>
            <div className="me-faq">
              {FAQS.map((item) => (
                <div key={item.q} className="me-faq__item">
                  <p className="me-faq__q">{item.q}</p>
                  <p className="me-faq__a">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="See case studies for proof."
          body="Five phases, production outcomes, honest constraints. Read the case studies, then compare to your situation."
          primary={{ label: "See case studies", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
