import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
import "../styles/fintech-page.css";

const PAGE_SEO = {
  title: "FinTech & Banking Engineering | AiRAT",
  description:
    "Production-grade security, AI, and data platforms for FinTech and banking under UAE Central Bank, RBI, and EU regulatory frameworks. SIEM/XDR, governed LLM systems, and OpenSearch-scale search for regulated financial institutions.",
};

const CHALLENGES = [
  {
    num: "01",
    title: "Regulatory compliance built in, not bolted on",
    body: "UAE Central Bank (CBUAE), RBI, MAS, and EU frameworks (DORA, GDPR) impose requirements on data residency, audit trails, and incident response timelines. We treat these as first-class engineering constraints.",
  },
  {
    num: "02",
    title: "Alert volume that hides real threats",
    body: "Financial institutions generate high-volume security telemetry across trading systems and customer-facing applications. Without correlation and enrichment, analysts drown in noise and real incidents hide in the queue.",
  },
  {
    num: "03",
    title: "AI adoption blocked by governance gaps",
    body: "Legal, risk, and compliance teams block AI rollouts when retrieval quality, PII handling, and audit trails are unclear. We build governance-first AI systems where legal and security teams can sign off before models touch customer data.",
  },
  {
    num: "04",
    title: "Search and data latency at trading scale",
    body: "Institutional trading, risk monitoring, and customer intelligence need sub-second query responses across petabyte-scale data under peak load. Infrastructure that holds during volatility spikes cannot be addressed after the fact.",
  },
];

const OUTCOMES = [
  { metric: "60%", label: "Faster MTTD for FinTech SOC client" },
  { metric: "40s", label: "Query time for 2.5M compliance docs (vs 3 days)" },
  { metric: "99.95%", label: "Platform uptime over 14 months" },
  { metric: "87%", label: "Alert noise eliminated" },
];

const SERVICES = [
  {
    title: "SIEM / XDR platforms",
    body: "Threat detection, correlation, and incident response for financial institution SOC teams  -  with compliance evidence trails built in.",
    link: { label: "Explore security services →", to: "/services#cyber" },
  },
  {
    title: "Governed AI & LLM systems",
    body: "RAG pipelines for compliance document retrieval, regulatory intelligence, and customer intelligence  -  with PII boundaries and audit trails.",
    link: { label: "Explore AI services →", to: "/services#ai" },
  },
  {
    title: "Data platforms & search",
    body: "Real-time trading data pipelines, risk aggregation, and OpenSearch-scale search for financial data at institutional velocity.",
    link: { label: "Explore data services →", to: "/services#data" },
  },
];

const FAQS = [
  {
    q: "Which regulatory frameworks does AiRAT have experience with?",
    a: "We have delivered production systems under UAE Central Bank (CBUAE) digital banking frameworks, RBI IT governance requirements, MAS Technology Risk Management guidelines, DORA, and GDPR. Data residency is a first-class engineering requirement.",
  },
  {
    q: "Does AiRAT build systems for trading firms and exchanges?",
    a: "Yes  -  we have delivered platforms for institutional cryptocurrency trading (MPC custody, compliance onboarding, high-throughput matching engine) and financial data pipelines.",
  },
  {
    q: "How does AiRAT handle PII and sensitive financial data?",
    a: "PII handling, data residency, and access controls are designed into the architecture before any pipeline is built: least-privilege access, encryption at rest and in transit, PII detection in AI pipelines, and immutable audit logging.",
  },
  {
    q: "How long does a FinTech security or AI programme take?",
    a: "A SIEM/XDR deployment for a mid-size FinTech SOC typically takes 12–20 weeks from architecture review to go-live. A governed RAG pipeline for compliance retrieval typically takes 8–14 weeks including evaluation harness.",
  },
] as const;

function CurrencyGlyphDollar() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="24" cy="24" r="17" fill="#d8f2dc" />
      <circle cx="24" cy="24" r="17" stroke="#111318" strokeWidth="1.8" />
      <path d="M24 13V35" stroke="#111318" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M29.5 16.5H21.5C18.8 16.5 17 18.1 17 20.3C17 22.4 18.5 23.7 21.1 24.3L26.9 25.7C29.5 26.3 31 27.6 31 29.7C31 31.9 29.2 33.5 26.5 33.5H18.5" stroke="#111318" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CurrencyGlyphCoinStack() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="24" cy="13" rx="14" ry="5" fill="#ffe08a" stroke="#111318" strokeWidth="1.6" />
      <path d="M10 13V25C10 28 38 28 38 25V13" fill="#ffefb8" stroke="#111318" strokeWidth="1.6" />
      <ellipse cx="24" cy="25" rx="14" ry="5" fill="#ffefb8" stroke="#111318" strokeWidth="1.6" />
      <path d="M20 18H28M24 15V21" stroke="#111318" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function CurrencyGlyphArrow() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="7" width="34" height="34" rx="11" fill="#d8e8ff" />
      <path d="M14 31L24 17L34 22" stroke="#111318" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 15H36V21" stroke="#111318" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="31" r="2" fill="#111318" />
      <circle cx="24" cy="17" r="2" fill="#111318" />
      <circle cx="34" cy="22" r="2" fill="#111318" />
    </svg>
  );
}

function CurrencyGlyphCard() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="7" y="11" width="34" height="26" rx="5" fill="#e3dcff" stroke="#111318" strokeWidth="1.7" />
      <path d="M10 19H38" stroke="#111318" strokeWidth="1.5" />
      <circle cx="16" cy="28" r="2.2" fill="#111318" />
      <path d="M23 28H33" stroke="#111318" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FloatingCurrencyDoodles() {
  return (
    <div className="fi-float-layer" aria-hidden="true">
      <span className="fi-float fi-float--1"><span className="fi-float__motion"><CurrencyGlyphDollar /></span></span>
      <span className="fi-float fi-float--2"><span className="fi-float__motion"><CurrencyGlyphCoinStack /></span></span>
      <span className="fi-float fi-float--3"><span className="fi-float__motion"><CurrencyGlyphArrow /></span></span>
      <span className="fi-float fi-float--4"><span className="fi-float__motion"><CurrencyGlyphCard /></span></span>
      <span className="fi-float fi-float--5"><span className="fi-float__motion"><CurrencyGlyphDollar /></span></span>
      <span className="fi-float fi-float--6"><span className="fi-float__motion"><CurrencyGlyphCoinStack /></span></span>
      <span className="fi-float fi-float--7"><span className="fi-float__motion"><CurrencyGlyphArrow /></span></span>
      <span className="fi-float fi-float--8"><span className="fi-float__motion"><CurrencyGlyphCard /></span></span>
    </div>
  );
}

export default function GlossaryFintechPage() {
  const mainRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-fintech",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "FinTech & Banking", path: "/industries/fintech" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-fintech", faqPageSchema(faqsToSchemaPairs(FAQS)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    let raf = 0;
    const setMotion = (mx: number, my: number) => {
      main.style.setProperty("--fi-mx", mx.toFixed(3));
      main.style.setProperty("--fi-my", my.toFixed(3));
    };

    const onPointerMove = (e: PointerEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = main.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
        const my = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
        setMotion(mx, my);
      });
    };

    const onPointerLeave = () => setMotion(0, 0);

    main.addEventListener("pointermove", onPointerMove, { passive: true });
    main.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      main.removeEventListener("pointermove", onPointerMove);
      main.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <AiratShell>
      <SEO title={PAGE_SEO.title} description={PAGE_SEO.description} />
      <SiteHeader />

      <main className="sp-main fi-main" id="main-content" ref={mainRef}>
        <FloatingCurrencyDoodles />
        {/* Hero */}
        <div className="sp-hero">
          <span className="sp-eyebrow">FinTech & Banking</span>
          <h1 className="sp-hero__h1">Engineering for financial institutions where compliance is architecture.</h1>
          <p className="sp-hero__body">
            AiRAT builds SIEM/XDR, governed AI, and data platforms for FinTech and banking environments under UAE Central Bank, RBI, and EU regulatory frameworks.
          </p>
        </div>

        <hr className="sp-rule" />

        {/* Outcomes */}
        <section className="sp-section" aria-label="Delivered outcomes">
          <div className="sp-section__label">
            <span className="sp-label">Outcomes</span>
          </div>
          <div className="sp-section__body">
            <div className="sp-metrics">
              {OUTCOMES.map((o, i) => (
                <RevealOnScroll key={o.label} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="sp-metric">
                  <span className="sp-metric__val">{o.metric}</span>
                  <span className="sp-metric__label">{o.label}</span>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Engineering challenges */}
        <section className="sp-section" aria-labelledby="fi-challenges-heading">
          <div className="sp-section__label">
            <span className="sp-label">What we solve</span>
          </div>
          <div className="sp-section__body">
            <h2 id="fi-challenges-heading" className="sp-section-title">Engineering problems FinTech teams face</h2>
            <div className="sp-values">
              {CHALLENGES.map((ch) => (
                <div key={ch.num} className="sp-value-item">
                  <span className="sp-value-item__num">{ch.num}</span>
                  <div>
                    <p className="sp-value-item__title">{ch.title}</p>
                    <p className="sp-value-item__sub">{ch.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Services */}
        <section className="sp-section" aria-labelledby="fi-services-heading">
          <div className="sp-section__label">
            <span className="sp-label">Services</span>
          </div>
          <div className="sp-section__body">
            <h2 id="fi-services-heading" className="sp-section-title">What we deliver for FinTech</h2>
            <div className="sp-grid-3">
              {SERVICES.map((s) => (
                <div key={s.title} className="sp-card">
                  <p className="sp-card__title">{s.title}</p>
                  <p className="sp-card__body">{s.body}</p>
                  <Link to={s.link.to} className="sp-text-link" style={{ marginTop: "0.75rem" }}>
                    {s.link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* FAQ */}
        <section className="sp-section" aria-labelledby="fi-faq-heading">
          <div className="sp-section__label">
            <span className="sp-label">FAQ</span>
          </div>
          <div className="sp-section__body">
            <h2 id="fi-faq-heading" className="sp-section-title">FinTech & banking  -  common questions</h2>
            <div className="fi-faq">
              {FAQS.map((item) => (
                <div key={item.q} className="fi-faq__item">
                  <p className="fi-faq__q">{item.q}</p>
                  <p className="fi-faq__a">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Discuss your FinTech programme."
          body="Bring a real scenario  -  SOC alert volume, AI governance, trading data latency, or regulatory compliance gaps. We scope the problem before discussing solutions."
          primary={{ label: "Read case studies", to: "/portfolio" }}
        />

      </main>

      <SiteFooter />
    </AiratShell>
  );
}
