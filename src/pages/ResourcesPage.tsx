import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import FaqSection from "../components/FaqSection";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import {
  CONTENT_CLUSTERS,
  FEATURED_RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCES_CTA,
  RESOURCES_FAQ,
  RESOURCES_PAGE_HERO,
  RESOURCES_PAGE_SEO,
} from "../content/resourcesPageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/homepage.css";
import "../styles/inner-pages.css";
import "../styles/resources-page.css";

export default function ResourcesPage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-resources",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-resources", faqPageSchema(faqsToSchemaPairs(RESOURCES_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={RESOURCES_PAGE_SEO.title} description={RESOURCES_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main" id="main-content">

        {/* ── HERO ── */}
        <section className="inner-hero inner-hero--airat">
          <p className="eyebrow">{RESOURCES_PAGE_HERO.eyebrow}</p>
          <h1 className="hero-h1">{RESOURCES_PAGE_HERO.headline}</h1>
          <p className="hero-sub">{RESOURCES_PAGE_HERO.lead}</p>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="inner-section" aria-labelledby="res-categories-heading">
          <h2 id="res-categories-heading" className="section-title sr-only">Browse by topic</h2>
          <div className="res-category-grid">
            {RESOURCE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="res-category-card">
                <h3 className="res-category-title">{cat.label}</h3>
                <p className="res-category-desc">{cat.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED RESOURCES ── */}
        <section className="inner-section" aria-labelledby="res-featured-heading">
          <p className="eyebrow">Featured</p>
          <h2 id="res-featured-heading" className="section-title">Start here.</h2>
          <div className="res-featured-grid">
            {FEATURED_RESOURCES.map((res) => (
              <Link key={res.slug} className="res-featured-card" to={res.slug}>
                <div className="res-featured-card__meta">
                  <span className="res-type-pill">{res.type}</span>
                  <span className="res-category-tag">{res.category}</span>
                </div>
                <h3 className="res-featured-card__title">{res.title}</h3>
                <p className="res-featured-card__desc">{res.description}</p>
                <div className="res-featured-card__footer">
                  <span className="res-read-time">
                    {"readHint" in res && res.readHint ? res.readHint : `${res.readingTimeMinutes} min read`}
                  </span>
                  <span className="res-read-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CONTENT CLUSTERS ── */}
        <section className="inner-section" aria-labelledby="res-clusters-heading">
          <p className="eyebrow">Topic clusters</p>
          <h2 id="res-clusters-heading" className="section-title">Explore by problem domain.</h2>
          <div className="res-clusters-grid">
            {CONTENT_CLUSTERS.map((cluster) => (
              <div key={cluster.id} className="res-cluster-card">
                <p className="eyebrow">{cluster.eyebrow}</p>
                <h3 className="res-cluster-title">{cluster.title}</h3>
                <p className="res-cluster-desc">{cluster.description}</p>
                <ul className="res-cluster-articles">
                  {cluster.articles.map((a) => (
                    <li key={a.slug}>
                      <Link to={a.slug}>{a.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── INSIGHTS LINK ── */}
        <section className="inner-section res-insights-bridge">
          <p className="eyebrow">Long-form writing</p>
          <h2 className="section-title">More in-depth? Read the Insights.</h2>
          <p className="section-lead">Full-length articles on production systems, search architecture, and enterprise AI  -  written to the same standard as our delivery work.</p>
          <div className="cta-row">
            <Link className="btn btn-ghost" to="/blog">Browse all insights →</Link>
            <Link className="btn btn-ghost" to="/blog?category=ai-llm">AI & LLM →</Link>
            <Link className="btn btn-ghost" to="/blog?category=data-search">Data & Search →</Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FaqSection
          id="resources-faq"
          title="About this hub"
          intro="How the resources are organised and updated."
          items={RESOURCES_FAQ}
        />

        <CtaBand
          id="res-cta-heading"
          title={RESOURCES_CTA.headline}
          body={RESOURCES_CTA.body}
          primary={{ label: `${RESOURCES_CTA.button.label} →`, to: RESOURCES_CTA.button.to }}
          secondary={{ label: RESOURCES_CTA.secondaryButton.label, to: RESOURCES_CTA.secondaryButton.to }}
        />

      </main>
      <SiteFooter />
    </AiratShell>
  );
}
