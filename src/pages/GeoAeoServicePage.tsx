import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  GEO_CTA,
  GEO_FAQ,
  GEO_HOW_WE_DIFFER,
  GEO_INTERNAL_LINKS,
  GEO_PAGE_HERO,
  GEO_PAGE_SEO,
  GEO_PROBLEM_SECTION,
  GEO_RESEARCH_SECTION,
  GEO_RESEARCH_STATS,
  GEO_SERVICES,
} from "../content/geoAeoServicePageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/service-detail.css";

export default function GeoAeoServicePage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-geo",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AEO & GEO", path: "/services/aeo-geo" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-geo", faqPageSchema(faqsToSchemaPairs(GEO_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={GEO_PAGE_SEO.title} description={GEO_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main" id="main-content">

        {/* ── HERO ── */}
        <section className="inner-hero inner-hero--airat">
          <div className="hero-badge">
            <span className="dot" />
            {GEO_PAGE_HERO.badge}
          </div>
          <h1 className="hero-h1">{GEO_PAGE_HERO.headline}</h1>
          <p className="hero-sub svc-hero-sub">{GEO_PAGE_HERO.subheadline}</p>
          <p className="hero-sub">{GEO_PAGE_HERO.body}</p>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" to={GEO_PAGE_HERO.primaryCta.to}>
              {GEO_PAGE_HERO.primaryCta.label} →
            </Link>
            <Link className="btn btn-ghost" to={GEO_PAGE_HERO.secondaryCta.to}>
              {GEO_PAGE_HERO.secondaryCta.label}
            </Link>
          </div>
        </section>

        {/* ── RESEARCH STATS ── */}
        <section className="inner-section">
          <div className="svc-stat-row">
            {GEO_RESEARCH_STATS.map((s) => (
              <div key={s.stat} className="svc-stat-card">
                <div className="svc-stat-value">{s.stat}</div>
                <p className="svc-stat-label">{s.label}</p>
                <span className="svc-stat-source">{s.source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="inner-section" aria-labelledby="geo-problem-heading">
          <p className="eyebrow">{GEO_PROBLEM_SECTION.eyebrow}</p>
          <h2 id="geo-problem-heading" className="section-title">{GEO_PROBLEM_SECTION.title}</h2>
          <div className="svc-prose">
            {GEO_PROBLEM_SECTION.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ── HOW WE DIFFER ── */}
        <section className="inner-section" aria-labelledby="geo-differ-heading">
          <p className="eyebrow">{GEO_HOW_WE_DIFFER.eyebrow}</p>
          <h2 id="geo-differ-heading" className="section-title">{GEO_HOW_WE_DIFFER.title}</h2>
          <p className="section-lead">{GEO_HOW_WE_DIFFER.body}</p>
          <ul className="svc-bullet-list">
            {GEO_HOW_WE_DIFFER.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </section>

        {/* ── RESEARCH INSIGHTS ── */}
        <section className="inner-section" aria-labelledby="geo-research-heading">
          <p className="eyebrow">{GEO_RESEARCH_SECTION.eyebrow}</p>
          <h2 id="geo-research-heading" className="section-title">{GEO_RESEARCH_SECTION.title}</h2>
          <div className="svc-insights-grid">
            {GEO_RESEARCH_SECTION.insights.map((ins, i) => (
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
        <section className="inner-section" aria-labelledby="geo-services-heading">
          <p className="eyebrow">{GEO_SERVICES.eyebrow}</p>
          <h2 id="geo-services-heading" className="section-title">{GEO_SERVICES.title}</h2>
          <div className="svc-items-grid">
            {GEO_SERVICES.items.map((item) => (
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
          id="geo-faq"
          title="AEO & GEO  -  common questions"
          intro="For marketing leads, growth teams, and technical decision-makers."
          items={GEO_FAQ}
        />

        {/* ── INTERNAL LINKS ── */}
        <section className="inner-section">
          <p className="eyebrow">Related services</p>
          <div className="svc-related-links">
            {GEO_INTERNAL_LINKS.map((l) => (
              <Link key={l.to} className="svc-related-link" to={l.to}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand
          id="geo-cta-heading"
          title={GEO_CTA.headline}
          body={GEO_CTA.body}
          note={GEO_CTA.note}
          primary={{ label: `${GEO_CTA.button.label} →`, to: GEO_CTA.button.to }}
        />

      </main>
      <SiteFooter />
    </AiratShell>
  );
}
