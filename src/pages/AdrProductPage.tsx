import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import StatCounter from "../components/StatCounter";
import { SEO } from "../components/SEO";
import {
  ADR_HERO,
  ADR_METRICS,
  ADR_PRODUCT_SEO,
  ADR_SCROLL_ONE,
  ADR_SCROLL_THREE,
  ADR_SCROLL_TWO,
} from "../content/adrProductPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/soc-product-page.css";

export default function AdrProductPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-product-adr",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Agent Detection & Response (ADR)", path: "/products/adr" },
      ]),
    );
    return () => rmBc();
  }, []);

  const { threatDetection, promptSecurity, governance, runtime } = ADR_SCROLL_TWO;
  const { ecosystem, response, dashboard, why, cta } = ADR_SCROLL_THREE;

  return (
    <AiratShell>
      <SEO title={ADR_PRODUCT_SEO.title} description={ADR_PRODUCT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section soc-scroll-band" aria-labelledby="adr-hero-title">
          <div className="container hero-band__inner">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/products" className="page-breadcrumb__link">
                ← All products
              </Link>
            </nav>
            <p className="eyebrow">{ADR_HERO.eyebrow}</p>
            <h1 id="adr-hero-title" className="display-2xl hero-band__title">
              {ADR_HERO.title}
            </h1>
            <p className="body-lg hero-band__lead">{ADR_HERO.lead}</p>
            <p className="body-md hero-band__lead">{ADR_HERO.sublead}</p>
            <p className="eyebrow soc-tagline">{ADR_HERO.tagline}</p>
            <div className="hero-band__actions">
              <Link to={ADR_HERO.primaryCta.to} className="btn btn--primary">
                {ADR_HERO.primaryCta.label}
              </Link>
              <Link to={ADR_HERO.secondaryCta.to} className="btn btn--secondary">
                {ADR_HERO.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--warm soc-scroll-band" aria-label="Platform metrics">
          <div className="container soc-metrics-row" role="list">
            {ADR_METRICS.map((m, i) => (
              <RevealOnScroll
                key={m.label}
                className="soc-metric"
                delay={(i + 1) as 1 | 2 | 3 | 4 | 5}
                as="article"
                role="listitem"
              >
                <span className="soc-metric__value">
                  {"counter" in m && m.counter ? (
                    <StatCounter
                      className="soc-metric__counter"
                      target={m.counter.target}
                      prefix={"prefix" in m.counter ? m.counter.prefix : ""}
                      suffix={m.counter.suffix}
                    />
                  ) : (
                    m.fallback
                  )}
                </span>
                <span className="soc-metric__label">{m.label}</span>
                <p className="body-sm soc-metric__detail">{m.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="section soc-scroll-band" aria-labelledby="adr-visibility-title">
          <div className="container feature-module feature-module--split">
            <div className="feature-module__body">
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{ADR_SCROLL_ONE.eyebrow}</p>
                  <h2 id="adr-visibility-title" className="display-lg feature-module__title">
                    {ADR_SCROLL_ONE.title}
                  </h2>
                  <p className="body-md">{ADR_SCROLL_ONE.lead}</p>
                </div>
                <ul className="feature-module__service-list">
                  {ADR_SCROLL_ONE.visibilityGroups.map((g) => (
                    <li key={g.category} className="feature-module__service">
                      <span className="title-sm">{g.category}</span>
                      <p className="body-sm">{g.tools.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <RevealOnScroll className="feature-module__visual" direction="fade" threshold={0.12}>
                <img
                  className="feature-module__image soc-feature-image"
                  src={ADR_SCROLL_ONE.visual.src}
                  alt={ADR_SCROLL_ONE.visual.alt}
                  width={ADR_SCROLL_ONE.visual.width}
                  height={ADR_SCROLL_ONE.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="section section--warm soc-scroll-band" aria-labelledby="adr-threat-title">
          <div className="container feature-module feature-module--split feature-module--reverse">
            <div className="feature-module__body">
              <div className="feature-module__visual">
                <img
                  className="feature-module__image soc-feature-image"
                  src={threatDetection.visual.src}
                  alt={threatDetection.visual.alt}
                  width={threatDetection.visual.width}
                  height={threatDetection.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{threatDetection.eyebrow}</p>
                  <h2 id="adr-threat-title" className="display-lg feature-module__title">
                    {threatDetection.title}
                  </h2>
                  <p className="body-md soc-contrast">{threatDetection.contrast}</p>
                  <p className="body-md">{threatDetection.lead}</p>
                </div>
                <ul className="feature-module__service-list">
                  {threatDetection.capabilities.map((c, i) => (
                    <li
                      key={c.title}
                      className={`feature-module__service${i === 0 ? " feature-module__service--highlight" : ""}`}
                    >
                      <span className="title-sm">{c.title}</span>
                      <p className="body-sm">{c.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="container soc-dual-grid soc-subsection">
            <div>
              <p className="eyebrow">{governance.eyebrow}</p>
              <h2 className="display-lg">{governance.title}</h2>
              <p className="body-md">{governance.lead}</p>
              <ul className="soc-checklist">
                {governance.controls.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="body-sm soc-context-result">{governance.result}</p>
            </div>
            <div>
              <p className="eyebrow">{promptSecurity.eyebrow}</p>
              <h2 className="display-lg">{promptSecurity.title}</h2>
              <p className="body-md">{promptSecurity.lead}</p>
              <ul className="soc-checklist">
                {promptSecurity.controls.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="container feature-module feature-module--split soc-subsection">
            <div className="feature-module__body">
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{runtime.eyebrow}</p>
                  <h2 className="display-lg feature-module__title">{runtime.title}</h2>
                  <p className="body-md">{runtime.lead}</p>
                </div>
                <ul className="feature-module__service-list soc-role-list">
                  {runtime.modes.map((m) => (
                  <li key={m.title} className="feature-module__service feature-module__service--highlight soc-role-card">
                    <span className="title-sm soc-role-card__title">{m.title}</span>
                    <p className="body-sm soc-role-card__body">{m.body}</p>
                  </li>
                  ))}
                </ul>
              </div>
              <div className="soc-outcome-compare soc-outcome-compare--panel" aria-label="Runtime protection capabilities">
                <p className="eyebrow soc-outcome-compare__eyebrow">{runtime.capabilitiesHeading}</p>
                <ul className="soc-checklist soc-checklist--stack">
                  {runtime.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section soc-scroll-band" aria-labelledby="adr-dashboard-title">
          <div className="container soc-dual-grid">
            <div>
              <p className="eyebrow">{ecosystem.eyebrow}</p>
              <h2 className="display-lg">{ecosystem.title}</h2>
              <p className="body-md">{ecosystem.lead}</p>
              <ul className="soc-checklist">
                {ecosystem.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="body-sm soc-context-result">{ecosystem.result}</p>
            </div>
            <div>
              <p className="eyebrow">{response.eyebrow}</p>
              <h2 className="display-lg">{response.title}</h2>
              <p className="body-md">{response.lead}</p>
              <div className="chip-list soc-action-chips">
                {response.actions.map((a) => (
                  <span key={a} className="chip">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="container feature-module feature-module--split soc-subsection">
            <div className="feature-module__body">
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{dashboard.eyebrow}</p>
                  <h2 id="adr-dashboard-title" className="display-lg feature-module__title">
                    {dashboard.title}
                  </h2>
                  <p className="body-md">{dashboard.lead}</p>
                  <div className="chip-list">
                    {dashboard.highlights.map((h) => (
                      <span key={h} className="chip chip--lime">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="feature-module__visual">
                <img
                  className="feature-module__image soc-feature-image"
                  src={dashboard.visual.src}
                  alt={dashboard.visual.alt}
                  width={dashboard.visual.width}
                  height={dashboard.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="container soc-subsection">
            <p className="eyebrow">{why.eyebrow}</p>
            <h2 className="display-lg">{why.title}</h2>
            <div className="soc-why-grid">
              {why.items.map((item) => (
                <article key={item.title} className="value-prop">
                  <h3 className="value-prop__title">{item.title}</h3>
                  <p className="value-prop__body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title={cta.title}
          body={cta.lead}
          note={cta.subtitle}
          primary={cta.primary}
          secondary={cta.secondary}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
