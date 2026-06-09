import { useEffect } from "react";
import CtaBand from "../components/CtaBand";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import { ProductsIntegrationField } from "../components/ProductsIntegrationField";
import { CsocFunnel } from "../components/CsocFunnel";
import { SEO } from "../components/SEO";
import {
  PRODUCTS_CORE_CTA,
  PRODUCTS_CORE_STATS,
  PRODUCTS_HERO,
  PRODUCTS_MODEL,
  PRODUCTS_SEO,
  PRODUCT_SHOWCASE,
} from "../content/productsPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/products-page.css";

export default function ProductsPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-products",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ]),
    );
    return () => rmBc();
  }, []);

  const core = PRODUCT_SHOWCASE.find((p) => p.role === "core")!;
  const layers = PRODUCT_SHOWCASE.filter((p) => p.role === "layer");

  return (
    <AiratShell>
      <SEO title={PRODUCTS_SEO.title} description={PRODUCTS_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        {/* Hero */}
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{PRODUCTS_HERO.badge}</p>
            <h1 className="display-2xl hero-band__title">{PRODUCTS_HERO.headline}</h1>
            <p className="body-lg hero-band__lead">{PRODUCTS_HERO.body}</p>
            <div className="hero-band__actions">
              <Link to="/contact" className="btn btn--primary">
                Book a strategy call
              </Link>
              <Link to={core.to} className="btn btn--secondary">
                See the core platform
              </Link>
            </div>
          </div>
        </section>

        {/* The model — diagram + explanation */}
        <section className="section section--warm" aria-labelledby="products-model-heading">
          <div className="container products-model__grid">
            <RevealOnScroll className="products-model__visual" as="div" direction="scale">
              <ProductsIntegrationField />
            </RevealOnScroll>
            <div className="products-model__copy">
              <p className="eyebrow" id="products-model-heading">
                {PRODUCTS_MODEL.eyebrow}
              </p>
              <h2 className="display-lg">{PRODUCTS_MODEL.title}</h2>
              <p className="body-lg">{PRODUCTS_MODEL.body}</p>
              <div className="products-model__stats">
                {PRODUCTS_MODEL.stats.map((s) => (
                  <div key={s.label} className="pm-stat">
                    <span className="pm-stat__value">{s.value}</span>
                    <span className="pm-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CSOC core feature block */}
        <section className="section" aria-labelledby="products-core-heading">
          <div className="container">
            <div className="product-core" style={{ "--pc-accent": core.accent } as React.CSSProperties}>
              <div className="product-core__main">
                <p className="label-mono product-core__kicker">{core.kicker}</p>
                <h2 id="products-core-heading" className="display-md" style={{ marginTop: "0.6rem" }}>
                  {core.title}
                </h2>
                <p className="body-lg" style={{ marginTop: "0.5rem" }}>
                  {core.oneLiner}
                </p>
                <ul className="pc-checks">
                  {core.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link to={core.to} className="text-link" style={{ display: "inline-block", marginTop: "var(--space-lg)" }}>
                  {core.ctaLabel} →
                </Link>
              </div>
              <div className="product-core__aside">
                <CsocFunnel />
                <p className="pc-outcome">{core.outcome}</p>
              </div>
              <div className="product-core__stats">
                {PRODUCTS_CORE_STATS.map((s) => (
                  <div key={s.label} className="pcs">
                    <span className="pcs__v">{s.value}</span>
                    <span className="pcs__l">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integration layers */}
        <section className="section section--soft" aria-labelledby="products-layers-heading">
          <div className="container section-head">
            <p className="eyebrow" id="products-layers-heading">
              Integration layers
            </p>
            <h2 className="display-lg">Three planes, wired to the core from day one.</h2>
            <p className="body-lg">
              Each shares the CSOC's data model, telemetry, and response fabric — so coverage expands without a new
              integration project.
            </p>
          </div>
          <RevealOnScroll className="container products-layers" as="div">
            {layers.map((l, i) => (
              <article key={l.id} className="player-card" style={{ "--pl-accent": l.accent } as React.CSSProperties}>
                <div className="player-card__head">
                  <span className="player-card__kicker">{l.kicker}</span>
                  <span className="player-card__index">{`0${i + 2}`}</span>
                </div>
                <h3 className="title-md player-card__title">{l.title}</h3>
                <p className="player-card__line">{l.oneLiner}</p>
                <div className="player-card__metric">
                  <span className="pcs__v">{l.metric.value}</span>
                  <span className="pcs__l">{l.metric.label}</span>
                </div>
                <ul className="pc-checks">
                  {l.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="pc-outcome body-sm">{l.outcome}</p>
                <Link to={l.to} className="text-link player-card__cta">
                  {l.ctaLabel}
                </Link>
              </article>
            ))}
          </RevealOnScroll>
        </section>

        <CtaBand
          title={PRODUCTS_CORE_CTA.title}
          body={PRODUCTS_CORE_CTA.body}
          primary={{ label: PRODUCTS_CORE_CTA.cta, to: PRODUCTS_CORE_CTA.ctaTo }}
          secondary={{ label: "Read case studies →", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
