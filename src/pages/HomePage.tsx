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
  HOME_AI_SHOWCASE,
  HOME_CLIENTS_SECTION,
  HOME_FAQ,
  HOME_STATEMENT,
  SOLUTION_PATHS_SECTION,
} from "../content/homePageCopy";
import PillarVisual from "../components/PillarVisual";
import { SERVICES_PILLARS } from "../content/servicesPageCopy";
import { HOME_SCENE } from "../content/homePageVisuals";
import "../styles/homepage.css";
import "../styles/services-page.css";

const PILLAR_ACCENTS: Record<string, string> = {
  security: "#46838c",
  ai: "#9bd40f",
  data: "#c79a3e",
  platform: "#17100d",
};

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
            <RevealOnScroll delay={4} className="hero-scene__cta">
              <Link to="/contact" className="btn btn--primary">
                Book a strategy call
              </Link>
              <div className="hero-scene__sublinks">
                <Link to="/services" className="btn btn--secondary hero-scene__sublink">
                  Explore services →
                </Link>
                <Link to="/products" className="btn btn--secondary hero-scene__sublink">
                  Explore products →
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        <RevealOnScroll direction="fade" delay={5} className="hero-scene__logos-band">
          <div className="hero-scene__logos">
            <div className="container hero-scene__logos-inner">
              <p className="hero-scene__logos-label">{HOME_CLIENTS_SECTION.lead}</p>
              <ClientLogoMarquee />
            </div>
          </div>
        </RevealOnScroll>

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

          <RevealOnScroll className="container home-ops-grid" as="div">
            {SERVICES_PILLARS.map((pillar) => (
              <Link
                key={pillar.id}
                to={`/services#pillar-${pillar.id}`}
                className="home-ops-card"
                data-accent={pillar.id}
                style={{ ["--ops-accent" as string]: PILLAR_ACCENTS[pillar.id] } as React.CSSProperties}
              >
                <div className="home-ops-card__visual">
                  <PillarVisual id={pillar.id} />
                </div>
                <div className="home-ops-card__copy">
                  <span className="home-ops-card__label label-mono">{pillar.label}</span>
                  <h3 className="title-md home-ops-card__title">{pillar.headline}</h3>
                  <p className="body-sm">{pillar.subhead}</p>
                  <span className="home-ops-card__cta">Explore →</span>
                </div>
              </Link>
            ))}
          </RevealOnScroll>

          <div className="container home-ops-foot">
            <Link to="/services" className="btn btn--secondary">
              View all services →
            </Link>
            <Link to="/products" className="btn btn--secondary">
              Explore products →
            </Link>
          </div>
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
              <p className="display-lg home-statement home-statement--single-line">
                <span className="services-closing-title">{HOME_STATEMENT}</span>
              </p>
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
