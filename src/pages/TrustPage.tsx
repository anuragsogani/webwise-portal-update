import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import {
  TRUST_CENTER,
  TRUST_NEXT_UP,
  TRUST_PAGE_HERO,
  TRUST_PAGE_SEO,
  TRUST_SECTIONS,
} from "../content/trustPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/trust-page.css";

export default function TrustPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-trust",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: "Trust", path: "/resources/trust" },
      ]),
    );
    return () => {
      rmBc();
    };
  }, []);

  return (
    <AiratShell>
      <SEO title={TRUST_PAGE_SEO.title} description={TRUST_PAGE_SEO.description} />
      <SiteHeader />

      <main id="main-content" className="trust-page">
        <section className="hero-band section trust-page__hero">
          <div className="container hero-band__inner">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/resources" className="page-breadcrumb__link">
                ← Resources
              </Link>
            </nav>
            <p className="eyebrow">{TRUST_PAGE_HERO.eyebrow}</p>
            <h1 className="display-2xl hero-band__title">{TRUST_PAGE_HERO.headline}</h1>
            <p className="body-lg hero-band__lead trust-page__hero-lead">{TRUST_PAGE_HERO.lead}</p>
          </div>
        </section>

        {TRUST_SECTIONS.map((section, index) => {
          const reverse = index % 2 === 1;
          const paragraphs = section.paragraphs ?? [];
          const richParagraphs = section.richParagraphs ?? [];

          return (
            <section
              key={section.id}
              id={section.id}
              className={`section${index % 2 === 0 ? " section--soft" : ""}`}
              aria-labelledby={`trust-${section.id}-title`}
            >
              <div className={`container feature-module${reverse ? " feature-module--reverse" : ""}`}>
                <div
                  className={`feature-module__header${
                    !section.image ? " feature-module__header--copy-only" : ""
                  }`}
                >
                  <div className="feature-module__intro">
                    <h2 id={`trust-${section.id}-title`} className="display-lg feature-module__title">
                      {section.title}
                    </h2>
                    {paragraphs.map((p) => (
                      <p key={p.slice(0, 48)} className="body-md">
                        {p}
                      </p>
                    ))}
                    {richParagraphs.map((p) => (
                      <p
                        key={p.html.slice(0, 48)}
                        className="body-md"
                        dangerouslySetInnerHTML={{ __html: p.html }}
                      />
                    ))}
                  </div>
                  {section.image ? (
                    <img
                      className="feature-module__image"
                      src={section.image.src}
                      alt={section.image.alt}
                      width={section.image.width}
                      height={section.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>

                {section.subFeatures && section.subFeatures.length > 0 ? (
                  <div className="sub-feature-row hairline-top trust-page__sub-features">
                    {section.subFeatures.map((item) => (
                      <article key={item.title} className="sub-feature">
                        <h3 className="title-md">{item.title}</h3>
                        <p className="body-sm">{item.body}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          );
        })}

        <section className="section section--warm" aria-labelledby="trust-center-title">
          <div className="container feature-module feature-module--reverse trust-page__trust-center">
            <div className="feature-module__header">
              <div className="feature-module__intro">
                <h2 id="trust-center-title" className="display-lg feature-module__title">
                  {TRUST_CENTER.title}
                </h2>
                <p className="body-md">{TRUST_CENTER.body}</p>
                <Link to={TRUST_CENTER.ctaTo} className="btn btn--primary">
                  {TRUST_CENTER.ctaLabel}
                </Link>
              </div>
              <img
                className="feature-module__image"
                src={TRUST_CENTER.image.src}
                alt={TRUST_CENTER.image.alt}
                width={TRUST_CENTER.image.width}
                height={TRUST_CENTER.image.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="section section--soft" aria-labelledby="trust-next-up-title">
          <div className="container">
            <h2 id="trust-next-up-title" className="display-lg trust-page__next-title">
              {TRUST_NEXT_UP.title}
            </h2>
            <div className="next-up-carousel">
              <div className="next-up-carousel__track">
                {TRUST_NEXT_UP.items.map((item) => (
                  <Link key={item.to} to={item.to} className="next-up-card">
                    <span className="next-up-card__title">{item.title}</span>
                    <span className="next-up-card__desc">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
