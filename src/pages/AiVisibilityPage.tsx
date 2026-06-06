import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  AI_VIS_CTA,
  AI_VIS_FAQ,
  AI_VIS_INTERNAL_LINKS,
  AI_VIS_PAGE_HERO,
  AI_VIS_PAGE_SEO,
  AI_VIS_RESEARCH_SECTION,
  AI_VIS_RESEARCH_STATS,
  AI_VIS_SERVICES,
  AI_VIS_WHAT_IS,
  AI_VIS_WHY_AiRAT,
} from "../content/aiVisibilityPageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/service-detail.css";

export default function AiVisibilityPage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-aiv",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI Visibility", path: "/services/ai-visibility" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-aiv", faqPageSchema(faqsToSchemaPairs(AI_VIS_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={AI_VIS_PAGE_SEO.title} description={AI_VIS_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main" id="main-content">

        {/* ── HERO ── */}
        <section className="inner-hero inner-hero--airat">
          <div className="hero-badge">
            <span className="dot" />
            {AI_VIS_PAGE_HERO.badge}
          </div>
          <h1 className="hero-h1">{AI_VIS_PAGE_HERO.headline}</h1>
          <p className="hero-sub svc-hero-sub">{AI_VIS_PAGE_HERO.subheadline}</p>
          <p className="hero-sub">{AI_VIS_PAGE_HERO.body}</p>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            <Link className="btn btn-primary" to={AI_VIS_PAGE_HERO.primaryCta.to}>
              {AI_VIS_PAGE_HERO.primaryCta.label} →
            </Link>
            <Link className="btn btn-ghost" to={AI_VIS_PAGE_HERO.secondaryCta.to}>
              {AI_VIS_PAGE_HERO.secondaryCta.label}
            </Link>
          </div>
        </section>

        {/* ── RESEARCH STATS ── */}
        <section className="inner-section">
          <div className="svc-stat-row">
            {AI_VIS_RESEARCH_STATS.map((s) => (
              <div key={s.stat} className="svc-stat-card">
                <div className="svc-stat-value">{s.stat}</div>
                <p className="svc-stat-label">{s.label}</p>
                <span className="svc-stat-source">{s.source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEFINITION ── */}
        <section className="inner-section" aria-labelledby="aiv-def-heading">
          <p className="eyebrow">{AI_VIS_WHAT_IS.eyebrow}</p>
          <h2 id="aiv-def-heading" className="section-title">{AI_VIS_WHAT_IS.title}</h2>
          <p className="section-lead">{AI_VIS_WHAT_IS.body}</p>
          <div className="svc-distinction-grid">
            {AI_VIS_WHAT_IS.distinction.map((d) => (
              <div key={d.term} className="svc-distinction-card">
                <h3 className="svc-distinction-term">{d.term}</h3>
                <p className="svc-distinction-def">{d.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH INSIGHTS ── */}
        <section className="inner-section" aria-labelledby="aiv-research-heading">
          <p className="eyebrow">{AI_VIS_RESEARCH_SECTION.eyebrow}</p>
          <h2 id="aiv-research-heading" className="section-title">{AI_VIS_RESEARCH_SECTION.title}</h2>
          <div className="svc-insights-grid">
            {AI_VIS_RESEARCH_SECTION.insights.map((ins, i) => (
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
        <section className="inner-section" aria-labelledby="aiv-services-heading">
          <p className="eyebrow">{AI_VIS_SERVICES.eyebrow}</p>
          <h2 id="aiv-services-heading" className="section-title">{AI_VIS_SERVICES.title}</h2>
          <div className="svc-items-grid">
            {AI_VIS_SERVICES.items.map((item) => (
              <div key={item.num} className="svc-item-card">
                <span className="svc-item-num">{item.num}</span>
                <h3 className="svc-item-title">{item.title}</h3>
                <p className="svc-item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY AiRAT ── */}
        <section className="inner-section" aria-labelledby="aiv-why-heading">
          <p className="eyebrow">{AI_VIS_WHY_AiRAT.eyebrow}</p>
          <h2 id="aiv-why-heading" className="section-title">{AI_VIS_WHY_AiRAT.title}</h2>
          <div className="svc-why-grid">
            {AI_VIS_WHY_AiRAT.points.map((pt) => (
              <div key={pt.title} className="svc-why-card">
                <h3 className="svc-why-title">{pt.title}</h3>
                <p className="svc-why-body">{pt.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <FaqSection
          id="aiv-faq"
          title="AI Visibility  -  common questions"
          intro="For CMOs, brand strategists, and digital leads assessing LLM brand presence."
          items={AI_VIS_FAQ}
        />

        {/* ── INTERNAL LINKS ── */}
        <section className="inner-section">
          <p className="eyebrow">Related services</p>
          <div className="svc-related-links">
            {AI_VIS_INTERNAL_LINKS.map((l) => (
              <Link key={l.to} className="svc-related-link" to={l.to}>
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <CtaBand
          id="aiv-cta-heading"
          title={AI_VIS_CTA.headline}
          body={AI_VIS_CTA.body}
          note={AI_VIS_CTA.note}
          primary={{ label: `${AI_VIS_CTA.button.label} →`, to: AI_VIS_CTA.button.to }}
        />

      </main>
      <SiteFooter />
    </AiratShell>
  );
}
