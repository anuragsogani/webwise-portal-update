import { useEffect } from "react";
import EditorialTile from "../components/EditorialTile";
import CtaBand from "../components/CtaBand";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { SERVICE_BLOCK_VISUALS } from "../content/servicesPageVisuals";
import {
  SERVICES_DELIVERY,
  SERVICES_FAQ,
  SERVICES_FAQ_SECTION,
  SERVICES_HERO,
  SERVICES_LIST,
  SERVICES_SEO,
  SERVICES_STACK_SECTION,
} from "../content/servicesPageCopy";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

export default function ServicesPage() {
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

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{SERVICES_HERO.badge}</p>
            <h1 className="display-2xl hero-band__title">{SERVICES_HERO.headline}</h1>
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
        </section>

        <section className="section section--warm" aria-labelledby="services-stack-heading">
          <div className="container section-head">
            <p className="eyebrow" id="services-stack-heading">
              {SERVICES_STACK_SECTION.title}
            </p>
            <h2 className="display-lg">Ten stacks. One delivery model.</h2>
            <p className="body-lg">{SERVICES_STACK_SECTION.lead}</p>
          </div>
          <div className="container editorial-tile-grid">
            {SERVICES_LIST.map((s) => (
              <EditorialTile
                key={s.id}
                title={s.title}
                description={s.tileSummary}
                meta={[{ label: "Stack", value: s.problemClass }]}
                ctaLabel="View service"
                href={`#service-${s.id}`}
              />
            ))}
          </div>
        </section>

        {SERVICES_LIST.map((service, index) => {
          const visual = SERVICE_BLOCK_VISUALS[service.id];
          return (
            <section
              key={service.id}
              id={`service-${service.id}`}
              className={`section${index % 2 === 0 ? "" : " section--soft"}`}
              aria-labelledby={`service-title-${service.id}`}
            >
              <div className="container feature-module">
                <div className="feature-module__header">
                  <div className="feature-module__intro">
                    <p className="eyebrow">Problem class</p>
                    <p className="body-md">{service.problemClass}</p>
                    <h2 id={`service-title-${service.id}`} className="display-lg feature-module__title">
                      {service.title}
                    </h2>
                    <p className="body-md">{service.description}</p>
                    {service.caseStudy && (
                      <Link to={service.caseStudy.to} className="text-link">
                        {service.caseStudy.label} →
                      </Link>
                    )}
                  </div>
                  {visual ? (
                    <img
                      className="feature-module__image"
                      src={visual.src}
                      alt={visual.alt}
                      width={visual.width}
                      height={visual.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="feature-module__image"
                      style={{
                        background: "var(--color-surface-soft)",
                        border: "1px solid var(--color-hairline)",
                        minHeight: "12rem",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="sub-feature-row hairline-top">
                  {service.covered.map((line) => (
                    <article key={line} className="sub-feature">
                      <p className="body-sm">{line}</p>
                    </article>
                  ))}
                </div>
                <details className="faq-details" style={{ marginTop: "var(--space-xl)" }}>
                  <summary className="faq-summary">{service.q}</summary>
                  <div className="faq-panel">
                    <p>{service.a}</p>
                  </div>
                </details>
              </div>
            </section>
          );
        })}

        <section className="section section--warm" aria-labelledby="delivery-heading">
          <div className="container section-head">
            <p className="eyebrow" id="delivery-heading">
              Delivery
            </p>
            <h2 className="display-lg">{SERVICES_DELIVERY.title}</h2>
            <p className="body-lg">{SERVICES_DELIVERY.intro}</p>
          </div>
          <div className="container diff-grid">
            {SERVICES_DELIVERY.phases.map((phase) => (
              <article key={phase.num} className="diff-card">
                <span className="label-mono diff-card__num">{phase.num}</span>
                <h3 className="title-md">{phase.title}</h3>
                <p className="body-sm">{phase.body}</p>
              </article>
            ))}
          </div>
        </section>

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
          title="Pick one problem. We will help you size the fix."
          body="Bring a concrete scenario — SOC alert volume, RAG accuracy in production, search latency at peak, or compliance evidence gaps."
          primary={{ label: "Book a strategy call", to: "/contact" }}
          secondary={{ label: "View products →", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
