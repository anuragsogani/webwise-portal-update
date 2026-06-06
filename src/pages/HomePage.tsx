import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import EditorialTile from "../components/EditorialTile";
import ParallaxLayer from "../components/ParallaxLayer";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ClientLogoMarquee from "../components/ClientLogoMarquee";
import OutcomesBand from "../components/OutcomesBand";
import TrustedByLeaders from "../components/TrustedByLeaders";
import {
  CASES_EYEBROW,
  CASES_LEAD,
  CASES_TITLE,
  CASES_TITLE_EM,
  FEATURED_PROJECTS,
  HERO_BADGE,
  HERO_H1_LINKS,
  HERO_H1_LINE3,
  HERO_SECONDARY_CTA_LABEL,
  HERO_TERTIARY_CTA_LABEL,
  HOME_AI_SHOWCASE,
  HOME_CLIENTS_SECTION,
  HOME_FAQ,
  HOME_STATEMENT,
  OUTCOME_TAGS,
  SOLUTION_PATHS_SECTION,
} from "../content/homePageCopy";
import FeatureModuleRotator from "../components/FeatureModuleRotator";
import {
  HOME_AI_SERVICE_VISUALS,
  HOME_DATA_SERVICE_VISUALS,
  HOME_PATH_VISUALS,
  HOME_SCENE,
  HOME_SECURITY_SERVICE_VISUALS,
} from "../content/homePageVisuals";
import "../styles/homepage.css";

const HOME_ROTATOR_VISUALS = [
  HOME_SECURITY_SERVICE_VISUALS,
  HOME_AI_SERVICE_VISUALS,
  HOME_DATA_SERVICE_VISUALS,
] as const;
const HOME_ROTATOR_LABELS = [
  "Security capability highlights",
  "AI capability highlights",
  "Data and analytics capability highlights",
] as const;
const HOME_ROTATOR_ID_PREFIXES = ["security-service", "ai-service", "data-service"] as const;

export default function HomePage() {
  return (
    <AiratShell>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-scene section">
          <div className="hero-scene__art" aria-hidden="true">
            <ParallaxLayer className="hero-scene__parallax" speed={0.12}>
              <img
                src={HOME_SCENE.hero}
                alt=""
                width={2528}
                height={1664}
                fetchPriority="high"
                decoding="async"
              />
            </ParallaxLayer>
            <div className="hero-scene__fade" />
          </div>
          <div className="container hero-band__inner hero-scene__inner hero-enter">
            <RevealOnScroll delay={1}>
              <Link to="/blog" className="pill announcement-pill hero-scene__announcement">
                {HERO_BADGE}
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <h1 className="display-2xl hero-band__title">
                <span className="hero-band__title-line">
                  Production systems for{" "}
                  <Link to={HERO_H1_LINKS.security.to} className="hero-band__word-link">
                    {HERO_H1_LINKS.security.label}
                  </Link>
                  ,{" "}
                  <Link to={HERO_H1_LINKS.ai.to} className="hero-band__word-link">
                    {HERO_H1_LINKS.ai.label}
                  </Link>
                  , and{" "}
                  <Link to={HERO_H1_LINKS.data.to} className="hero-band__word-link">
                    {HERO_H1_LINKS.data.label}
                  </Link>
                </span>
                <span className="hero-band__title-line hero-band__title-line--secondary">
                  {HERO_H1_LINE3.trim()}
                </span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={3}>
              <div className="hero-band__tags">
                {OUTCOME_TAGS.map((tag) => (
                  <span key={tag.text} className="badge-pill">
                    {tag.text}
                  </span>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={4}>
              <div className="hero-band__actions">
                <Link to="/contact" className="btn btn--primary">
                  Book a strategy call
                </Link>
                <Link to="/portfolio" className="btn btn--secondary">
                  {HERO_SECONDARY_CTA_LABEL}
                </Link>
                <Link to="/services" className="text-link">
                  {HERO_TERTIARY_CTA_LABEL} →
                </Link>
              </div>
            </RevealOnScroll>
          </div>
          <RevealOnScroll direction="fade" delay={5} className="hero-scene__logos">
            <div className="container hero-scene__logos-inner">
              <p className="hero-scene__logos-label">{HOME_CLIENTS_SECTION.lead}</p>
              <ClientLogoMarquee />
            </div>
          </RevealOnScroll>
        </section>

        <OutcomesBand />

        <TrustedByLeaders />

        <section className="product-showcase-sky" aria-labelledby="home-ai-showcase-title">
          <div className="product-showcase-sky__bg" aria-hidden="true">
            <img
              src={HOME_SCENE.sky}
              alt=""
              width={2760}
              height={1504}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container product-showcase-sky__inner">
            <RevealOnScroll direction="fade" delay={1}>
              <p className="product-showcase-sky__badge">
                <span className="product-showcase-sky__badge-icon" aria-hidden="true" />
                {HOME_AI_SHOWCASE.badge}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <h2 id="home-ai-showcase-title" className="display-2xl product-showcase-sky__title">
                {HOME_AI_SHOWCASE.title}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={3}>
              <p className="body-lg product-showcase-sky__body">{HOME_AI_SHOWCASE.body}</p>
            </RevealOnScroll>
            <RevealOnScroll delay={4}>
              <Link to={HOME_AI_SHOWCASE.ctaTo} className="btn product-showcase-sky__cta">
                {HOME_AI_SHOWCASE.ctaLabel} →
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        <section className="section home-solution-paths">
          <div className="container section-head">
            <RevealOnScroll>
              <p className="eyebrow">{SOLUTION_PATHS_SECTION.eyebrow}</p>
              <h2 className="display-lg">{SOLUTION_PATHS_SECTION.title}</h2>
              <p className="body-lg">{SOLUTION_PATHS_SECTION.lead}</p>
            </RevealOnScroll>
          </div>

          {SOLUTION_PATHS_SECTION.paths.map((path, pathIndex) => {
            const isReverse = pathIndex % 2 === 1;
            const copyDirection = isReverse ? "right" : "left";
            const imageDirection = isReverse ? "left" : "right";

            return (
              <div
                key={path.title}
                className={`container feature-module${isReverse ? " feature-module--reverse" : ""}`}
              >
                <div className="feature-module__top">
                  <RevealOnScroll className="feature-module__top-copy" direction={copyDirection}>
                    <p className="eyebrow">{path.metaType}</p>
                    <h3 className="display-lg feature-module__title">{path.title}</h3>
                    <p className="body-md">{path.body}</p>
                  </RevealOnScroll>
                  <RevealOnScroll direction="up" delay={1}>
                    <Link to={path.to} className="btn btn--explore">
                      {SOLUTION_PATHS_SECTION.exploreLabel} →
                    </Link>
                  </RevealOnScroll>
                </div>

                <div className="feature-module__body">
                  {pathIndex < HOME_ROTATOR_VISUALS.length ? (
                    <RevealOnScroll delay={2} className="feature-module-rotator reveal--slow">
                      <FeatureModuleRotator
                        services={path.services}
                        visuals={HOME_ROTATOR_VISUALS[pathIndex]!}
                        listLabel={HOME_ROTATOR_LABELS[pathIndex]}
                        idPrefix={HOME_ROTATOR_ID_PREFIXES[pathIndex]}
                      />
                    </RevealOnScroll>
                  ) : (
                    <>
                      {HOME_PATH_VISUALS[pathIndex] ? (
                        <RevealOnScroll direction={imageDirection} delay={2} className="feature-module__visual reveal--slow">
                          <img
                            className="feature-module__image"
                            src={HOME_PATH_VISUALS[pathIndex]!.src}
                            alt={HOME_PATH_VISUALS[pathIndex]!.alt}
                            width={HOME_PATH_VISUALS[pathIndex]!.width}
                            height={HOME_PATH_VISUALS[pathIndex]!.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </RevealOnScroll>
                      ) : null}
                      <RevealOnScroll delay={3} className="feature-module__services">
                        <ul className="feature-module__service-list">
                          {path.services.map((service) => (
                            <li
                              key={service.title}
                              className={`feature-module__service${"highlight" in service && service.highlight ? " feature-module__service--highlight" : ""}`}
                            >
                              <h4 className="title-sm">{service.title}</h4>
                              {service.description ? <p className="body-sm">{service.description}</p> : null}
                            </li>
                          ))}
                        </ul>
                      </RevealOnScroll>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <section className="section section--soft" id="case-studies">
          <div className="container section-head">
            <RevealOnScroll>
              <p className="eyebrow">{CASES_EYEBROW}</p>
              <h2 className="display-lg">
                {CASES_TITLE}
                <em>{CASES_TITLE_EM}</em>
              </h2>
              <p className="body-lg">{CASES_LEAD}</p>
            </RevealOnScroll>
          </div>
          <div className="container editorial-tile-grid">
            {FEATURED_PROJECTS.map((project, i) => (
              <RevealOnScroll key={project.title} delay={(i + 1) as 1 | 2 | 3}>
                <EditorialTile
                  title={project.title}
                  description={project.body}
                  meta={[
                    { label: "Industry", value: project.domain.split("·")[0]?.trim() ?? project.domain },
                    { label: "Outcomes", value: project.outcomes.join(" · ") },
                  ]}
                  ctaLabel={project.ctaLabel}
                  href={project.to}
                />
              </RevealOnScroll>
            ))}
          </div>
          <div className="container news-section__more">
            <RevealOnScroll delay={2}>
              <Link to="/portfolio" className="text-link">
                See more case studies →
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        <section className="section section--soft home-statement-band home-statement-band--pre-faq">
          <div className="container section-head section-head--center">
            <RevealOnScroll>
              <p className="display-lg home-statement home-statement--single-line">{HOME_STATEMENT}</p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="section section--warm">
          <div className="container section-head">
            <RevealOnScroll>
              <p className="eyebrow">Common questions</p>
              <h2 className="display-lg">FAQ</h2>
            </RevealOnScroll>
          </div>
          <div className="container faq-accordion faq-accordion--cards">
            {HOME_FAQ.map((item, i) => (
              <RevealOnScroll
                key={item.q}
                as="details"
                className="faq-details"
                delay={(Math.min(i + 1, 5)) as 1 | 2 | 3 | 4 | 5}
              >
                <summary className="faq-summary">{item.q}</summary>
                <div className="faq-panel">
                  <p>{item.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </AiratShell>
  );
}
