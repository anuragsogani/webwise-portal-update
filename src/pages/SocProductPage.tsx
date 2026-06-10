import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import FeatureModuleRotator from "../components/FeatureModuleRotator";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import StatCounter from "../components/StatCounter";
import { SEO } from "../components/SEO";
import {
  SOC_HERO,
  SOC_METRICS,
  SOC_PRODUCT_SEO,
  SOC_INTELLIGENCE_ROTATOR_VISUALS,
  SOC_SCROLL_ONE,
  SOC_SCROLL_THREE,
  SOC_SCROLL_TWO,
} from "../content/socProductPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/soc-product-page.css";

export default function SocProductPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-product-soc",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Autonomous Security Operations Platform", path: "/products/soc" },
      ]),
    );
    return () => rmBc();
  }, []);

  const { intelligence, aiSoc, context, automation } = SOC_SCROLL_TWO;
  const { why, cta } = SOC_SCROLL_THREE;

  return (
    <AiratShell>
      <SEO title={SOC_PRODUCT_SEO.title} description={SOC_PRODUCT_SEO.description} />
      <SiteHeader />

      <main id="main-content">

        {/* ── PANEL 1: Hero + KPI metrics ──────────────────────────── */}
        <section
          className="soc-scroll-panel soc-first-scroll section soc-scroll-band"
          aria-labelledby="soc-hero-title"
        >
          <div className="soc-first-scroll__bg" aria-hidden="true">
            <img
              src={SOC_HERO.background.src}
              alt=""
              width={SOC_HERO.background.width}
              height={SOC_HERO.background.height}
              fetchPriority="high"
              decoding="async"
            />
            <div className="soc-first-scroll__fade" />
          </div>

          <div className="container soc-first-scroll__body">
            <div className="hero-band__inner soc-first-scroll__copy">
              <nav className="page-breadcrumb" aria-label="Breadcrumb">
                <Link to="/products" className="page-breadcrumb__link">
                  ← All products
                </Link>
              </nav>
              <p className="eyebrow">{SOC_HERO.eyebrow}</p>
              <h1 id="soc-hero-title" className="display-2xl hero-band__title">
                {SOC_HERO.title}
              </h1>
              <p className="body-lg hero-band__lead">{SOC_HERO.lead}</p>
              <div className="hero-band__actions">
                <Link to={SOC_HERO.primaryCta.to} className="btn btn--primary">
                  {SOC_HERO.primaryCta.label}
                </Link>
                <Link to={SOC_HERO.secondaryCta.to} className="btn btn--secondary">
                  {SOC_HERO.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="soc-hero-metrics" aria-label="Platform metrics">
              <div className="soc-metrics-row" role="list">
                {SOC_METRICS.map((m, i) => (
                  <RevealOnScroll
                    key={m.label}
                    className="soc-metric"
                    delay={(i + 1) as 1 | 2 | 3 | 4 | 5}
                    as="article"
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
            </div>
          </div>
        </section>

        {/* ── PANEL 2: Unified Visibility ──────────────────────────── */}
        <section
          className="soc-scroll-panel section soc-scroll-band"
          aria-labelledby="soc-visibility-title"
        >
          <div className="container feature-module">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{SOC_SCROLL_ONE.eyebrow}</p>
                <h2 id="soc-visibility-title" className="display-lg feature-module__title">
                  {SOC_SCROLL_ONE.title}
                </h2>
                <p className="body-md">{SOC_SCROLL_ONE.lead}</p>
              </div>
            </div>
            <div className="feature-module__body feature-module__body--visual-only">
              <div className="feature-module__visual">
                <RevealOnScroll
                  className="feature-module__visual-inner"
                  direction="fade"
                  threshold={0.12}
                >
                  <img
                    className="feature-module__image soc-feature-image"
                    src={SOC_SCROLL_ONE.visual.src}
                    alt={SOC_SCROLL_ONE.visual.alt}
                    width={SOC_SCROLL_ONE.visual.width}
                    height={SOC_SCROLL_ONE.visual.height}
                    loading="lazy"
                    decoding="async"
                  />
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* ── PANEL 3: Intelligence Engine ─────────────────────────── */}
        <section
          className="soc-scroll-panel section section--warm soc-scroll-band"
          aria-labelledby="soc-intel-title"
        >
          <div className="container feature-module feature-module--reverse">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{intelligence.eyebrow}</p>
                <h2 id="soc-intel-title" className="display-lg feature-module__title">
                  {intelligence.title}
                </h2>
                <p className="body-md soc-contrast">{intelligence.contrast}</p>
                <p className="body-md">{intelligence.lead}</p>
              </div>
            </div>
            <div className="feature-module__body feature-module__body--rotator">
              <RevealOnScroll
                delay={2}
                className="feature-module-rotator-reveal reveal--slow soc-intel-rotator soc-intel-rotator--stacked"
              >
                <FeatureModuleRotator
                  services={intelligence.capabilities.map((c) => ({
                    title: c.title,
                    description: c.body,
                  }))}
                  visuals={SOC_INTELLIGENCE_ROTATOR_VISUALS}
                  listLabel="Intelligence capabilities"
                  idPrefix="soc-intel"
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ── PANEL 4: AI SOC Analysts ─────────────────────────────── */}
        <section
          className="soc-scroll-panel section section--warm soc-scroll-band"
          aria-labelledby="soc-ai-title"
        >
          <div className="container feature-module">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{aiSoc.eyebrow}</p>
                <h2 id="soc-ai-title" className="display-lg feature-module__title">
                  {aiSoc.title}
                </h2>
                <p className="body-md">{aiSoc.lead}</p>
              </div>
            </div>
            <div className="soc-ai-stack">
              <RevealOnScroll className="soc-ai-visual" direction="fade" threshold={0.12}>
                <img
                  className="feature-module__image soc-feature-image"
                  src={aiSoc.visual.src}
                  alt={aiSoc.visual.alt}
                  width={aiSoc.visual.width}
                  height={aiSoc.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ── PANEL 5: Context Layer ───────────────────────────────── */}
        <section
          className="soc-scroll-panel section section--warm soc-scroll-band"
          aria-labelledby="soc-context-title"
        >
          <div className="container soc-context-stack">
            <div className="soc-context-copy">
              <p className="eyebrow">{context.eyebrow}</p>
              <h2 id="soc-context-title" className="display-lg">{context.title}</h2>
              <p className="body-md">{context.lead}</p>
            </div>
            <RevealOnScroll className="soc-context-visual" direction="fade" threshold={0.12}>
              <img
                className="feature-module__image soc-feature-image"
                src={context.visual.src}
                alt={context.visual.alt}
                width={context.visual.width}
                height={context.visual.height}
                loading="lazy"
                decoding="async"
              />
            </RevealOnScroll>
          </div>
        </section>

        {/* ── PANEL 6: Automated Response ──────────────────────────── */}
        <section
          className="soc-scroll-panel section soc-scroll-band"
          aria-labelledby="soc-automation-title"
        >
          <div className="container soc-automation-grid">
            <div className="soc-automation-intro">
              <p className="eyebrow">{automation.eyebrow}</p>
              <h2 id="soc-automation-title" className="display-lg">{automation.title}</h2>
              <p className="body-md">{automation.lead}</p>
              <div className="chip-list soc-action-chips">
                {automation.actions.map((a) => (
                  <span key={a} className="chip">{a}</span>
                ))}
              </div>
            </div>
            <ul className="soc-mode-cards" aria-label="Automation modes">
              {automation.modes.map((m, i) => (
                <li key={m.title} className={`soc-mode-card${i === automation.modes.length - 1 ? " soc-mode-card--featured" : ""}`}>
                  <span className="soc-mode-card__step" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="title-sm soc-mode-card__title">{m.title}</span>
                  <p className="body-sm soc-mode-card__body">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── PANEL 7: Why Teams Choose Us ─────────────────────────── */}
        <section
          className="soc-scroll-panel section section--soft soc-scroll-band"
          aria-labelledby="soc-why-title"
        >
          <div className="container">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{why.eyebrow}</p>
                <h2 id="soc-why-title" className="display-lg feature-module__title">
                  {why.title}
                </h2>
              </div>
            </div>
            <ul className="soc-why-grid" aria-label="Key outcomes">
              {why.items.map((item) => (
                <li key={item.title} className="soc-why-card">
                  <h3 className="title-sm soc-why-card__title">{item.title}</h3>
                  <p className="body-sm soc-why-card__body">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CTA Band ─────────────────────────────────────────────── */}
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
