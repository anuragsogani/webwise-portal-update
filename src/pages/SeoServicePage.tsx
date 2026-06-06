import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  SEO_CTA,
  SEO_FAQ,
  SEO_INTERNAL_LINKS,
  SEO_PAGE_HERO,
  SEO_PAGE_SEO,
  SEO_PROBLEM_SECTION,
  SEO_PROCESS,
  SEO_RESEARCH_SECTION,
  SEO_RESEARCH_STATS,
  SEO_SERVICES,
} from "../content/seoServicePageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/service-detail.css";

export default function SeoServicePage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-seo",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Technical SEO", path: "/services/technical-seo" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-seo", faqPageSchema(faqsToSchemaPairs(SEO_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={SEO_PAGE_SEO.title} description={SEO_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main" id="main-content">

        {/* ── HERO ── */}
        <section className="inner-hero inner-hero--airat">
          <div className="hero-badge">
            <span className="dot" />
            {SEO_PAGE_HERO.badge}
          </div>
          <h1 className="hero-h1">{SEO_PAGE_HERO.headline}</h1>
          <p className="hero-sub svc-hero-sub">{SEO_PAGE_HERO.subheadline}</p>
          <p className="hero-sub">{SEO_PAGE_HERO.body}</p>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" to={SEO_PAGE_HERO.primaryCta.to}>
              {SEO_PAGE_HERO.primaryCta.label} →
            </Link>
            <Link className="btn btn-ghost" to={SEO_PAGE_HERO.secondaryCta.to}>
              {SEO_PAGE_HERO.secondaryCta.label}
            </Link>
          </div>
        </section>

        {/* ── RESEARCH STATS ── */}
        <section className="inner-section">
          <div className="svc-stat-row">
            {SEO_RESEARCH_STATS.map((s) => (
              <div key={s.stat} className="svc-stat-card">
                <div className="svc-stat-value">{s.stat}</div>
                <p className="svc-stat-label">{s.label}</p>
                <span className="svc-stat-source">{s.source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="inner-section" aria-labelledby="seo-problem-heading">
          <p className="eyebrow">{SEO_PROBLEM_SECTION.eyebrow}</p>
          <h2 id="seo-problem-heading" className="section-title">{SEO_PROBLEM_SECTION.title}</h2>
          <div className="svc-prose">
            {SEO_PROBLEM_SECTION.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── RESEARCH INSIGHTS ── */}
        <section className="inner-section" aria-labelledby="seo-research-heading">
          <p className="eyebrow">{SEO_RESEARCH_SECTION.eyebrow}</p>
          <h2 id="seo-research-heading" className="section-title">{SEO_RESEARCH_SECTION.title}</h2>
          <div className="svc-insights-grid">
            {SEO_RESEARCH_SECTION.insights.map((ins, i) => (
              <div key={i} className="svc-insight-card">
                <p className="svc-insight-stat">{ins.stat}</p>
                <div className="svc-insight-row">
                  <div>
                    <p className="svc-insight-label">What it means</p>
                    <p className="svc-insight-body">{ins.implication}</p>
                  </div>
                  <div>
                    <p className="svc-insight-label">How AiRAT applies it</p>
                    <p className="svc-insight-body">{ins.application}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="inner-section" aria-labelledby="seo-services-heading">
          <p className="eyebrow">{SEO_SERVICES.eyebrow}</p>
          <h2 id="seo-services-heading" className="section-title">{SEO_SERVICES.title}</h2>
          <div className="svc-items-grid">
            {SEO_SERVICES.items.map((item) => (
              <div key={item.num} className="svc-item-card">
                <span className="svc-item-num">{item.num}</span>
                <h3 className="svc-item-title">{item.title}</h3>
                <p className="svc-item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="inner-section" aria-labelledby="seo-process-heading">
          <p className="eyebrow">{SEO_PROCESS.eyebrow}</p>
          <h2 id="seo-process-heading" className="section-title">{SEO_PROCESS.title}</h2>
          <ol className="svc-process-list">
            {SEO_PROCESS.steps.map((step) => (
              <li key={step.num} className="svc-process-item">
                <span className="svc-process-num">{step.num}</span>
                <div>
                  <h3 className="svc-process-title">{step.title}</h3>
                  <p className="svc-process-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ── */}
        <FaqSection
          id="seo-faq"
          title="Technical SEO  -  common questions"
          intro="For engineering teams, marketing leads, and procurement stakeholders."
          items={SEO_FAQ}
        />

        {/* ── INTERNAL LINKS ── */}
        <section className="inner-section">
          <p className="eyebrow">Related services</p>
          <div className="svc-related-links">
            {SEO_INTERNAL_LINKS.map((l) => (
              <Link key={l.to} className="svc-related-link" to={l.to}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand
          id="seo-cta-heading"
          title={SEO_CTA.headline}
          body={SEO_CTA.body}
          note={SEO_CTA.note}
          primary={{ label: `${SEO_CTA.button.label} →`, to: SEO_CTA.button.to }}
        />

      </main>
      <SiteFooter />
    </AiratShell>
  );
}
