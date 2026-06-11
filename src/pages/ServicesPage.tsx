import { useEffect } from "react";
import CtaBand from "../components/CtaBand";
import { Link, useLocation } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import RevealOnScroll from "../components/RevealOnScroll";
import { OperationalIntelligenceFabric } from "../components/fabric";
import PillarVisual from "../components/PillarVisual";
import { SEO } from "../components/SEO";
import { faqsToSchemaPairs } from "../content/faqTypes";
import {
  SERVICES_CLOSING,
  SERVICES_ENGAGEMENT,
  SERVICES_FAQ,
  SERVICES_FAQ_SECTION,
  SERVICES_HERO,
  SERVICES_PILLARS,
  SERVICES_PILLARS_SECTION,
  SERVICES_SEO,
  SERVICES_WHY,
} from "../content/servicesPageCopy";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/services-page.css";

const KICKER_WORDS = SERVICES_HERO.kicker
  .split(".")
  .map((w) => w.trim())
  .filter(Boolean);

const num2 = (i: number) => String(i + 1).padStart(2, "0");

export default function ServicesPage() {
  const { hash } = useLocation();

  // scroll to a pillar when arriving with /services#pillar-<id>
  useEffect(() => {
    if (!hash) return;
    const legacyAliases: Record<string, string> = {
      cyber: "pillar-security",
      security: "pillar-security",
      ai: "pillar-ai",
      data: "pillar-data",
      platform: "pillar-platform",
    };
    const raw = hash.slice(1);
    const id = legacyAliases[raw] ?? raw;
    let tries = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries++ < 10) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [hash]);

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-services",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-services", faqPageSchema(faqsToSchemaPairs(SERVICES_FAQ)));
    return () => {
      rmBc();
      rmFaq();
    };
  }, []);

  return (
    <AiratShell>
      <SEO title={SERVICES_SEO.title} description={SERVICES_SEO.description} />
      <SiteHeader />

      <main id="main-content" className="services-page">
        {/* Hero — full-bleed interactive cognition field with copy overlaid */}
        <section className="hero-band section services-hero hero-enter">
          <div className="services-hero__fabric" aria-hidden="true">
            <OperationalIntelligenceFabric />
          </div>
          <div className="container hero-band__inner services-hero__content">
            <div className="services-hero__copy">
              <RevealOnScroll className="eyebrow" as="p" direction="fade">
                {SERVICES_HERO.badge}
              </RevealOnScroll>
              <h1 className="display-2xl hero-band__title">{SERVICES_HERO.headline}</h1>
              <p className="services-hero__kicker label-mono" aria-label={SERVICES_HERO.kicker}>
                {KICKER_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </p>
              <p className="body-lg hero-band__lead">{SERVICES_HERO.body}</p>
              <div className="hero-band__actions">
                <Link to="/contact" className="btn btn--primary">
                  Book a strategy call
                </Link>
                <Link to="/portfolio" className="btn btn--secondary">
                  Read case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pillar overview / quick-nav */}
        <section className="section section--warm" aria-labelledby="services-pillars-heading">
          <div className="container section-head">
            <p className="eyebrow" id="services-pillars-heading">
              What we do
            </p>
            <h2 className="display-lg">{SERVICES_PILLARS_SECTION.title}</h2>
            <p className="body-lg">{SERVICES_PILLARS_SECTION.lead}</p>
          </div>
          <RevealOnScroll className="container pillar-nav" as="div">
            {SERVICES_PILLARS.map((p, i) => (
              <a key={p.id} href={`#pillar-${p.id}`} className="pillar-nav__item" data-accent={p.id}>
                <span className="pillar-nav__index">{num2(i)}</span>
                <span className="label-mono pillar-nav__label">{p.label}</span>
                <span className="body-sm pillar-nav__sub">{p.subhead}</span>
                <span className="pillar-nav__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </RevealOnScroll>

          <RevealOnScroll className="container svc-statement" as="div">
            <h3 className="display-md svc-statement__lead">{SERVICES_WHY.title}</h3>
            <p className="body-lg svc-statement__sub">{SERVICES_WHY.intro}</p>
          </RevealOnScroll>
        </section>

        {/* Pillar detail blocks */}
        {SERVICES_PILLARS.map((pillar, index) => {
          return (
            <section
              key={pillar.id}
              id={`pillar-${pillar.id}`}
              data-accent={pillar.id}
              className={`section pillar-section${index % 2 === 0 ? "" : " section--soft pillar-section--reverse"}`}
              aria-labelledby={`pillar-title-${pillar.id}`}
            >
              <RevealOnScroll className="container feature-module" as="div">
                <div className="feature-module__header">
                  <div className="feature-module__intro">
                    <div className="pillar-mark">
                      <span className="pillar-mark__num" aria-hidden="true">
                        {num2(index)}
                      </span>
                      <p className="eyebrow">{pillar.label}</p>
                    </div>
                    <h2 id={`pillar-title-${pillar.id}`} className="display-lg feature-module__title">
                      {pillar.headline}
                    </h2>
                    <p className="pillar-subhead">{pillar.subhead}</p>
                    <p className="body-md pillar-lead">{pillar.lead}</p>
                    {pillar.caseStudy && (
                      <Link to={pillar.caseStudy.to} className="text-link">
                        {pillar.caseStudy.label} →
                      </Link>
                    )}
                  </div>
                  <div className="feature-module__image feature-module__visual-slot">
                    <PillarVisual id={pillar.id} />
                  </div>
                </div>

                <div className="pillar-detail hairline-top">
                  <div className="pillar-detail__col">
                    <p className="label-mono pillar-detail__label">Common challenges</p>
                    <ul className="pillar-challenges">
                      {pillar.challenges.map((line) => (
                        <li key={line} className="body-sm">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pillar-detail__col">
                    <p className="label-mono pillar-detail__label">What we deliver</p>
                    <div className="pillar-chips">
                      {pillar.deliver.map((cap) => (
                        <span key={cap} className="chip">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="pillar-outcome">
                  <span className="label-mono pillar-outcome__label">Business outcome</span>
                  {pillar.outcome}
                </p>
              </RevealOnScroll>
            </section>
          );
        })}

        {/* Engagement models */}
        <section className="section section--warm" aria-labelledby="services-engagement-heading">
          <div className="container section-head">
            <p className="eyebrow" id="services-engagement-heading">
              Engagement models
            </p>
            <h2 className="display-lg">{SERVICES_ENGAGEMENT.title}</h2>
            <p className="body-lg">{SERVICES_ENGAGEMENT.intro}</p>
          </div>
          <div className="container svc-quad engagement-grid">
            {SERVICES_ENGAGEMENT.models.map((model, i) => (
              <article key={model.title} className="eng-card">
                <span className="eng-card__node">{num2(i)}</span>
                <h3 className="title-md">{model.title}</h3>
                <p className="body-sm">{model.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Closing statement */}
        <section className="section">
          <RevealOnScroll className="container section-head" as="div">
            <p className="eyebrow">{SERVICES_CLOSING.eyebrow}</p>
            <h2 className="display-lg">
              <span className="services-closing-title">{SERVICES_CLOSING.title}</span>
            </h2>
            <p className="body-lg">{SERVICES_CLOSING.body}</p>
          </RevealOnScroll>
        </section>

        {/* FAQ */}
        <section className="section section--soft">
          <div className="container section-head">
            <p className="eyebrow">Quick answers</p>
            <h2 className="display-lg">{SERVICES_FAQ_SECTION.title}</h2>
            <p className="body-md">{SERVICES_FAQ_SECTION.intro}</p>
          </div>
          <div className="container faq-accordion" role="list">
            {SERVICES_FAQ.map((item) => (
              <details key={item.q} className="faq-details" role="listitem">
                <summary className="faq-summary">{item.q}</summary>
                <div className="faq-panel">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <CtaBand
          title="Let's build systems that scale with your ambition."
          body="Whether you're modernising security operations, deploying AI at scale, building data platforms, or transforming engineering operations  -  bring one concrete problem and we'll help you size the fix."
          primary={{ label: "Book a strategy call", to: "/contact" }}
          secondary={{ label: "View products →", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
