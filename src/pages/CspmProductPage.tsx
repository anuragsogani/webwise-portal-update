import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import ComplianceFrameworkList from "../components/ComplianceFrameworkList";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import StatCounter from "../components/StatCounter";
import { SEO } from "../components/SEO";
import {
  CSPM_HERO,
  CSPM_METRICS,
  CSPM_PRODUCT_SEO,
  CSPM_SCROLL_ONE,
  CSPM_SCROLL_THREE,
  CSPM_SCROLL_TWO,
} from "../content/cspmProductPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/soc-product-page.css";

type ChecklistBlockProps = {
  listLabel: string;
  items: readonly string[];
};

function ChecklistBlock({ listLabel, items }: ChecklistBlockProps) {
  return (
    <>
      <p className="title-sm soc-pillar-label">{listLabel}</p>
      <ul className="soc-checklist soc-checklist--stack">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

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

  const { posture, devSecOps, cost } = CSPM_SCROLL_TWO;
  const { identity, compliance, dashboard, why, cta } = CSPM_SCROLL_THREE;

  return (
    <AiratShell>
      <SEO title={CSPM_PRODUCT_SEO.title} description={CSPM_PRODUCT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section soc-scroll-band" aria-labelledby="cspm-hero-title">
          <div className="container hero-band__inner">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/products" className="page-breadcrumb__link">
                ← All products
              </Link>
            </nav>
            <p className="eyebrow">{CSPM_HERO.eyebrow}</p>
            <h1 id="cspm-hero-title" className="display-2xl hero-band__title">
              {CSPM_HERO.title}
            </h1>
            <p className="body-lg hero-band__lead">{CSPM_HERO.lead}</p>
            <p className="body-md hero-band__lead">{CSPM_HERO.sublead}</p>
            <p className="eyebrow soc-tagline">{CSPM_HERO.tagline}</p>
            <div className="hero-band__actions">
              <Link to={CSPM_HERO.primaryCta.to} className="btn btn--primary">
                {CSPM_HERO.primaryCta.label}
              </Link>
              <Link to={CSPM_HERO.secondaryCta.to} className="btn btn--secondary">
                {CSPM_HERO.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--warm soc-scroll-band" aria-label="Platform metrics">
          <div className="container soc-metrics-row" role="list">
            {CSPM_METRICS.map((m, i) => (
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

        <section className="section soc-scroll-band" aria-labelledby="cspm-visibility-title">
          <div className="container feature-module feature-module--split">
            <div className="feature-module__body">
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{CSPM_SCROLL_ONE.eyebrow}</p>
                  <h2 id="cspm-visibility-title" className="display-lg feature-module__title">
                    {CSPM_SCROLL_ONE.title}
                  </h2>
                  <p className="body-md">{CSPM_SCROLL_ONE.lead}</p>
                </div>
                <ChecklistBlock listLabel={CSPM_SCROLL_ONE.listLabel} items={CSPM_SCROLL_ONE.items} />
              </div>
              <RevealOnScroll className="feature-module__visual" direction="fade" threshold={0.12}>
                <img
                  className="feature-module__image soc-feature-image"
                  src={CSPM_SCROLL_ONE.visual.src}
                  alt={CSPM_SCROLL_ONE.visual.alt}
                  width={CSPM_SCROLL_ONE.visual.width}
                  height={CSPM_SCROLL_ONE.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="section section--warm soc-scroll-band" aria-labelledby="cspm-posture-title">
          <div className="container feature-module feature-module--split feature-module--reverse">
            <div className="feature-module__body">
              <div className="feature-module__visual">
                <img
                  className="feature-module__image soc-feature-image"
                  src={posture.visual.src}
                  alt={posture.visual.alt}
                  width={posture.visual.width}
                  height={posture.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{posture.eyebrow}</p>
                  <h2 id="cspm-posture-title" className="display-lg feature-module__title">
                    {posture.title}
                  </h2>
                  <p className="body-md">{posture.lead}</p>
                </div>
                <ChecklistBlock listLabel={posture.listLabel} items={posture.items} />
              </div>
            </div>
          </div>

          <div className="container soc-dual-grid soc-subsection">
            <div>
              <p className="eyebrow">{devSecOps.eyebrow}</p>
              <h2 className="display-lg">{devSecOps.title}</h2>
              <p className="body-md">{devSecOps.lead}</p>
              <ChecklistBlock listLabel={devSecOps.listLabel} items={devSecOps.items} />
            </div>
            <div>
              <p className="eyebrow">{cost.eyebrow}</p>
              <h2 className="display-lg">{cost.title}</h2>
              <p className="body-md">{cost.lead}</p>
              <ChecklistBlock listLabel={cost.listLabel} items={cost.items} />
            </div>
          </div>
        </section>

        <section className="section soc-scroll-band" aria-labelledby="cspm-identity-title">
          <div className="container soc-dual-grid">
            <div>
              <p className="eyebrow">{identity.eyebrow}</p>
              <h2 id="cspm-identity-title" className="display-lg">
                {identity.title}
              </h2>
              <p className="body-md">{identity.lead}</p>
              <ChecklistBlock listLabel={identity.listLabel} items={identity.items} />
            </div>
            <div>
              <p className="eyebrow">{compliance.eyebrow}</p>
              <h2 className="display-lg">{compliance.title}</h2>
              <p className="body-md">{compliance.lead}</p>
              <ComplianceFrameworkList
                listLabel={compliance.listLabel}
                frameworks={compliance.frameworks}
                othersLabel={compliance.othersLabel}
                others={compliance.others}
              />
            </div>
          </div>

          <div className="container feature-module feature-module--split soc-subsection">
            <div className="feature-module__body">
              <div className="feature-module__copy">
                <div className="feature-module__intro">
                  <p className="eyebrow">{dashboard.eyebrow}</p>
                  <h2 className="display-lg feature-module__title">{dashboard.title}</h2>
                  <p className="body-md">{dashboard.lead}</p>
                  <p className="title-sm">{dashboard.listLabel}</p>
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
