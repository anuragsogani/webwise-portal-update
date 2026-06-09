import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { AgentWorkforceMap, AgentTrace, GovernFlow } from "../components/AdrVisuals";
import {
  ADR_CORE_LINK,
  ADR_CTA,
  ADR_GOVERN,
  ADR_HERO,
  ADR_RESPOND,
  ADR_SEO,
  ADR_WATCH,
} from "../content/adrPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/products-page.css";

export default function AdrProductPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-product-adr",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Agent Detection & Response", path: "/products/adr" },
      ]),
    );
    return () => rmBc();
  }, []);

  return (
    <AiratShell>
      <SEO title={ADR_SEO.title} description={ADR_SEO.description} />
      <SiteHeader />

      <main
        id="main-content"
        className="prod-page prod-page--adr"
        style={{ ["--prod-accent" as string]: "#17100d" } as React.CSSProperties}
      >
        {/* Hero */}
        <section className="hero-band section">
          <div className="container ep-hero">
            <div className="ep-hero__grid">
              <div className="ep-hero__copy">
                <p className="eyebrow">{ADR_HERO.badge}</p>
                <h1 className="display-2xl hero-band__title">{ADR_HERO.headline}</h1>
                <p className="ep-hero__kicker label-mono">
                  {ADR_HERO.keywords.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </p>
                <p className="body-lg hero-band__lead">{ADR_HERO.body}</p>
                <div className="hero-band__actions">
                  <Link to="/contact" className="btn btn--primary">
                    Book a strategy call
                  </Link>
                  <Link to="/products" className="btn btn--secondary">
                    ← All products
                  </Link>
                </div>
                <div className="ep-metrics">
                  {ADR_HERO.metrics.map((m) => (
                    <div key={m.label} className="ep-metric">
                      <span className="ep-metric__v">{m.value}</span>
                      <span className="ep-metric__l">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ep-hero__visual">
                <AgentWorkforceMap />
              </div>
            </div>
            <ul className="ep-caps ep-caps--band">
              {ADR_HERO.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Watch every decision */}
        <section className="section section--warm">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{ADR_WATCH.eyebrow}</p>
              <h2 className="display-md">{ADR_WATCH.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {ADR_WATCH.body}
              </p>
              <ul className="ep-feature__caps">
                {ADR_WATCH.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="ep-feature__outcome">{ADR_WATCH.outcome}</p>
            </div>
            <div className="ep-feature__visual">
              <AgentTrace />
            </div>
          </RevealOnScroll>
        </section>

        {/* Govern every action */}
        <section className="section">
          <RevealOnScroll className="container ep-feature" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{ADR_GOVERN.eyebrow}</p>
              <h2 className="display-md">{ADR_GOVERN.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {ADR_GOVERN.body}
              </p>
              <ul className="ep-feature__caps">
                {ADR_GOVERN.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="ep-feature__outcome">{ADR_GOVERN.outcome}</p>
            </div>
            <div className="ep-feature__visual">
              <GovernFlow />
            </div>
          </RevealOnScroll>
        </section>

        {/* Respond & contain */}
        <section className="section section--soft">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{ADR_RESPOND.eyebrow}</p>
              <h2 className="display-md">{ADR_RESPOND.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {ADR_RESPOND.body}
              </p>
            </div>
            <div className="ep-feature__visual">
              <div className="ep-panel">
                <p className="ep-panel__label">One move · fully audited</p>
                <ul className="ep-panel__caps">
                  {ADR_RESPOND.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Wired to core */}
        <section className="section section--warm">
          <RevealOnScroll className="container section-head" as="div">
            <p className="eyebrow">{ADR_CORE_LINK.eyebrow}</p>
            <h2 className="display-lg">{ADR_CORE_LINK.title}</h2>
            <p className="body-lg">{ADR_CORE_LINK.body}</p>
            <Link to="/products/soc" className="text-link" style={{ display: "inline-block", marginTop: "var(--space-md)" }}>
              See the CSOC core →
            </Link>
          </RevealOnScroll>
        </section>

        <CtaBand
          title={ADR_CTA.title}
          body={ADR_CTA.body}
          primary={{ label: ADR_CTA.cta, to: ADR_CTA.ctaTo }}
          secondary={{ label: "All products →", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
