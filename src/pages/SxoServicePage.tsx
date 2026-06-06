import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  SXO_CTA,
  SXO_DEFINITION,
  SXO_FAQ,
  SXO_INTERNAL_LINKS,
  SXO_PAGE_HERO,
  SXO_PAGE_SEO,
  SXO_RESEARCH_SECTION,
  SXO_RESEARCH_STATS,
  SXO_SERVICES,
} from "../content/sxoServicePageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/service-detail.css";

export default function SxoServicePage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-sxo",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "SXO", path: "/services/sxo" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-sxo", faqPageSchema(faqsToSchemaPairs(SXO_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={SXO_PAGE_SEO.title} description={SXO_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main" id="main-content">

        {/* ── HERO ── */}
        <section className="inner-hero inner-hero--airat">
          <div className="hero-badge">
            <span className="dot" />
            {SXO_PAGE_HERO.badge}
          </div>
          <h1 className="hero-h1">{SXO_PAGE_HERO.headline}</h1>
          <p className="hero-sub svc-hero-sub">{SXO_PAGE_HERO.subheadline}</p>
          <p className="hero-sub">{SXO_PAGE_HERO.body}</p>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" to={SXO_PAGE_HERO.primaryCta.to}>
              {SXO_PAGE_HERO.primaryCta.label} →
            </Link>
            <Link className="btn btn-ghost" to={SXO_PAGE_HERO.secondaryCta.to}>
              {SXO_PAGE_HERO.secondaryCta.label}
            </Link>
          </div>
        </section>

        {/* ── RESEARCH STATS ── */}
        <section className="inner-section">
          <div className="svc-stat-row">
            {SXO_RESEARCH_STATS.map((s) => (
              <div key={s.stat} className="svc-stat-card">
                <div className="svc-stat-value">{s.stat}</div>
                <p className="svc-stat-label">{s.label}</p>
                <span className="svc-stat-source">{s.source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEFINITION ── */}
        <section className="inner-section" aria-labelledby="sxo-def-heading">
          <p className="eyebrow">{SXO_DEFINITION.eyebrow}</p>
          <h2 id="sxo-def-heading" className="section-title">{SXO_DEFINITION.title}</h2>
          <p className="section-lead">{SXO_DEFINITION.body}</p>
          <div className="svc-pillars-grid">
            {SXO_DEFINITION.pillars.map((pillar) => (
              <div key={pillar.title} className="svc-pillar-card">
                <h3 className="svc-pillar-title">{pillar.title}</h3>
                <p className="svc-pillar-body">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH INSIGHTS ── */}
        <section className="inner-section" aria-labelledby="sxo-research-heading">
          <p className="eyebrow">{SXO_RESEARCH_SECTION.eyebrow}</p>
          <h2 id="sxo-research-heading" className="section-title">{SXO_RESEARCH_SECTION.title}</h2>
          <div className="svc-insights-grid">
            {SXO_RESEARCH_SECTION.insights.map((ins, i) => (
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
        <section className="inner-section" aria-labelledby="sxo-services-heading">
          <p className="eyebrow">{SXO_SERVICES.eyebrow}</p>
          <h2 id="sxo-services-heading" className="section-title">{SXO_SERVICES.title}</h2>
          <div className="svc-items-grid">
            {SXO_SERVICES.items.map((item) => (
              <div key={item.num} className="svc-item-card">
                <span className="svc-item-num">{item.num}</span>
                <h3 className="svc-item-title">{item.title}</h3>
                <p className="svc-item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <FaqSection
          id="sxo-faq"
          title="SXO  -  common questions"
          intro="For product, growth, and digital marketing leads."
          items={SXO_FAQ}
        />

        {/* ── INTERNAL LINKS ── */}
        <section className="inner-section">
          <p className="eyebrow">Related services</p>
          <div className="svc-related-links">
            {SXO_INTERNAL_LINKS.map((l) => (
              <Link key={l.to} className="svc-related-link" to={l.to}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand
          id="sxo-cta-heading"
          title={SXO_CTA.headline}
          body={SXO_CTA.body}
          note={SXO_CTA.note}
          primary={{ label: `${SXO_CTA.button.label} →`, to: SXO_CTA.button.to }}
        />

      </main>
      <SiteFooter />
    </AiratShell>
  );
}
