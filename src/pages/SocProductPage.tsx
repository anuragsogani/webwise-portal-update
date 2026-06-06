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
  SOC_HERO,
  SOC_METRICS,
  SOC_PRODUCT_SEO,
  SOC_SCROLL_ONE,
  SOC_SCROLL_THREE,
  SOC_SCROLL_TWO,
} from "../content/socProductPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/soc-product-page.css";

const ROLE_ICONS: Record<string, string> = {
  shield: "🛡",
  search: "🔍",
  target: "🎯",
  bolt: "⚡",
};

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
  const { dashboard, why, cta } = SOC_SCROLL_THREE;

  return (
    <AiratShell>
      <SEO title={SOC_PRODUCT_SEO.title} description={SOC_PRODUCT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        {/* Scroll 1 — Hero, metrics, unified visibility */}
        <section className="hero-band section soc-scroll-band" aria-labelledby="soc-hero-title">
          <div className="container hero-band__inner">
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
            <p className="eyebrow soc-tagline">{SOC_HERO.tagline}</p>
            <div className="hero-band__actions">
              <Link to={SOC_HERO.primaryCta.to} className="btn btn--primary">
                {SOC_HERO.primaryCta.label}
              </Link>
              <Link to={SOC_HERO.secondaryCta.to} className="btn btn--secondary">
                {SOC_HERO.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--warm soc-scroll-band" aria-label="Platform metrics">
          <div className="container soc-metrics-row" role="list">
            {SOC_METRICS.map((m, i) => (
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

        <section className="section soc-scroll-band" aria-labelledby="soc-visibility-title">
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
            <div className="feature-module__body">
              <div className="feature-module__services">
                <ul className="feature-module__service-list">
                  {SOC_SCROLL_ONE.integrationGroups.map((g) => (
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
        </section>

        {/* Scroll 2 — Intelligence, AI SOC, context, automation */}
        <section className="section section--warm soc-scroll-band" aria-labelledby="soc-intel-title">
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
            <div className="feature-module__body">
              <div className="feature-module__visual">
                <img
                  className="feature-module__image soc-feature-image"
                  src={intelligence.visual.src}
                  alt={intelligence.visual.alt}
                  width={intelligence.visual.width}
                  height={intelligence.visual.height}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="feature-module__services">
                <ul className="feature-module__service-list">
                  {intelligence.capabilities.map((c, i) => (
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

          <div className="container feature-module soc-subsection">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{aiSoc.eyebrow}</p>
                <h2 className="display-lg feature-module__title">{aiSoc.title}</h2>
                <p className="body-md">{aiSoc.lead}</p>
              </div>
            </div>
            <div className="soc-ai-row">
              <ul className="feature-module__service-list soc-role-list">
                {aiSoc.roles.map((r) => (
                  <li key={r.title} className="feature-module__service feature-module__service--highlight">
                    <span className="title-sm">
                      <span aria-hidden="true">{ROLE_ICONS[r.icon] ?? "◆"} </span>
                      {r.title}
                    </span>
                    <p className="body-sm">{r.body}</p>
                  </li>
                ))}
              </ul>
              <div className="soc-outcome-compare" aria-label="Alert reduction outcome">
                <div>
                  <span className="soc-outcome-compare__num soc-outcome-compare__num--before">
                    {aiSoc.outcomeBefore}
                  </span>
                  <span className="soc-outcome-compare__label">{aiSoc.outcomeBeforeLabel}</span>
                </div>
                <span className="soc-outcome-compare__arrow" aria-hidden="true">
                  →
                </span>
                <div>
                  <span className="soc-outcome-compare__num">{aiSoc.outcomeAfter}</span>
                  <span className="soc-outcome-compare__label">{aiSoc.outcomeAfterLabel}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container soc-dual-grid soc-subsection">
            <div>
              <p className="eyebrow">{context.eyebrow}</p>
              <h2 className="display-lg">{context.title}</h2>
              <p className="body-md">{context.lead}</p>
              <ul className="soc-checklist">
                {context.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="body-sm soc-context-result">{context.result}</p>
            </div>
            <div>
              <p className="eyebrow">{automation.eyebrow}</p>
              <h2 className="display-lg">{automation.title}</h2>
              <p className="body-md">{automation.lead}</p>
              <ul className="feature-module__service-list">
                {automation.modes.map((m) => (
                  <li key={m.title} className="feature-module__service">
                    <span className="title-sm">{m.title}</span>
                    <p className="body-sm">{m.body}</p>
                  </li>
                ))}
              </ul>
              <div className="chip-list soc-action-chips">
                {automation.actions.map((a) => (
                  <span key={a} className="chip">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scroll 3 — Dashboard, why choose, CTA */}
        <section className="section soc-scroll-band" aria-labelledby="soc-dashboard-title">
          <div className="container feature-module">
            <div className="feature-module__top">
              <div className="feature-module__top-copy">
                <p className="eyebrow">{dashboard.eyebrow}</p>
                <h2 id="soc-dashboard-title" className="display-lg feature-module__title">
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
            <div className="feature-module__body feature-module__body--visual-only">
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
