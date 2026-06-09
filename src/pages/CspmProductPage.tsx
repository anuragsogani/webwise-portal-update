import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { CloudScanMap, PostureScan, FindingsPriority } from "../components/CspmVisuals";
import {
  CSPM_COMPLIANCE,
  CSPM_CORE_LINK,
  CSPM_CTA,
  CSPM_HERO,
  CSPM_IDENTITY,
  CSPM_POSTURE,
  CSPM_PRIORITIZE,
  CSPM_SEO,
} from "../content/cspmPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/products-page.css";

export default function CspmProductPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-product-cspm",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Cloud Security & Governance Platform", path: "/products/cspm" },
      ]),
    );
    return () => rmBc();
  }, []);

  return (
    <AiratShell>
      <SEO title={CSPM_SEO.title} description={CSPM_SEO.description} />
      <SiteHeader />

      <main id="main-content" className="prod-page" style={{ ["--prod-accent" as string]: "#c79a3e" } as React.CSSProperties}>
        {/* Hero */}
        <section className="hero-band section">
          <div className="container ep-hero">
            <div className="ep-hero__grid">
              <div className="ep-hero__copy">
                <p className="eyebrow">{CSPM_HERO.badge}</p>
                <h1 className="display-2xl hero-band__title">{CSPM_HERO.headline}</h1>
                <p className="ep-hero__kicker label-mono">
                  {CSPM_HERO.keywords.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </p>
                <p className="body-lg hero-band__lead">{CSPM_HERO.body}</p>
                <div className="hero-band__actions">
                  <Link to="/contact" className="btn btn--primary">
                    Book a strategy call
                  </Link>
                  <Link to="/products" className="btn btn--secondary">
                    ← All products
                  </Link>
                </div>
                <div className="ep-metrics">
                  {CSPM_HERO.metrics.map((m) => (
                    <div key={m.label} className="ep-metric">
                      <span className="ep-metric__v">{m.value}</span>
                      <span className="ep-metric__l">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ep-hero__visual">
                <CloudScanMap />
              </div>
            </div>
            <ul className="ep-caps ep-caps--band">
              {CSPM_HERO.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Continuous posture */}
        <section className="section section--warm">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{CSPM_POSTURE.eyebrow}</p>
              <h2 className="display-md">{CSPM_POSTURE.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {CSPM_POSTURE.body}
              </p>
              <ul className="ep-feature__caps">
                {CSPM_POSTURE.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="ep-feature__outcome">{CSPM_POSTURE.outcome}</p>
            </div>
            <div className="ep-feature__visual">
              <PostureScan />
            </div>
          </RevealOnScroll>
        </section>

        {/* Prioritized findings */}
        <section className="section">
          <RevealOnScroll className="container ep-feature" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{CSPM_PRIORITIZE.eyebrow}</p>
              <h2 className="display-md">{CSPM_PRIORITIZE.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {CSPM_PRIORITIZE.body}
              </p>
              <ul className="ep-feature__caps">
                {CSPM_PRIORITIZE.capabilities.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="ep-feature__outcome">{CSPM_PRIORITIZE.outcome}</p>
            </div>
            <div className="ep-feature__visual">
              <FindingsPriority />
            </div>
          </RevealOnScroll>
        </section>

        {/* Identity & shift-left */}
        <section className="section section--soft">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <div className="ep-feature__copy">
              <p className="label-mono ep-pillar__eyebrow">{CSPM_IDENTITY.eyebrow}</p>
              <h2 className="display-md">{CSPM_IDENTITY.title}</h2>
              <p className="body-md" style={{ marginTop: "0.4rem" }}>
                {CSPM_IDENTITY.body}
              </p>
            </div>
            <div className="ep-feature__visual">
              <div className="ep-panel">
                <p className="ep-panel__label">Before it ships · across every identity</p>
                <ul className="ep-panel__caps">
                  {CSPM_IDENTITY.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Compliance & cost */}
        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">{CSPM_COMPLIANCE.eyebrow}</p>
            <h2 className="display-lg">{CSPM_COMPLIANCE.title}</h2>
            <p className="body-lg">{CSPM_COMPLIANCE.body}</p>
            <div className="cs-frameworks">
              {CSPM_COMPLIANCE.frameworks.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </div>
            <p className="cs-cost">{CSPM_COMPLIANCE.costNote}</p>
          </div>
        </section>

        {/* Wired to core */}
        <section className="section section--warm">
          <RevealOnScroll className="container section-head" as="div">
            <p className="eyebrow">{CSPM_CORE_LINK.eyebrow}</p>
            <h2 className="display-lg">{CSPM_CORE_LINK.title}</h2>
            <p className="body-lg">{CSPM_CORE_LINK.body}</p>
            <Link to="/products/soc" className="text-link" style={{ display: "inline-block", marginTop: "var(--space-md)" }}>
              See the CSOC core →
            </Link>
          </RevealOnScroll>
        </section>

        <CtaBand
          title={CSPM_CTA.title}
          body={CSPM_CTA.body}
          primary={{ label: CSPM_CTA.cta, to: CSPM_CTA.ctaTo }}
          secondary={{ label: "All products →", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
