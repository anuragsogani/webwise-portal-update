import { useEffect } from "react";
import EditorialTile from "../components/EditorialTile";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import ClientLogoMarquee from "../components/ClientLogoMarquee";
import CtaBand from "../components/CtaBand";
import { SEO } from "../components/SEO";
import {
  ABOUT_CLIENTS_PRESENTATION,
  ABOUT_FAQ,
  ABOUT_FAQ_SECTION,
  ABOUT_FOOTER_CTA,
  ABOUT_HERO,
  ABOUT_NARRATIVE_SPINE,
  ABOUT_RAT_STORY,
  ABOUT_SEO,
  ABOUT_TEAM,
  ABOUT_TEAM_ROLES,
  ABOUT_TRUST_STATS,
} from "../content/aboutPageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

export default function AboutPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-about",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    );
    const rmFaq = injectJsonLdScript(
      "airat-ld-faq-about",
      faqPageSchema(faqsToSchemaPairs(ABOUT_FAQ)),
    );
    return () => {
      rmBc();
      rmFaq();
    };
  }, []);

  const workingValues = [
    {
      title: "Senior-led delivery",
      body: "The engineers who scope the work stay through build, launch, and handover.",
    },
    {
      title: "Embedded with your team",
      body: "We work inside your tools, rituals, and constraints instead of handing over generic recommendations.",
    },
    {
      title: "Measured by outcomes",
      body: "Success is defined in board-defensible metrics: alert reduction, uptime, latency, audit evidence, or time-to-production.",
    },
    {
      title: "Built to be owned",
      body: "Runbooks, ownership boundaries, and onboarding docs ship with the platform so your team can run it.",
    },
  ];

  return (
    <AiratShell>
      <SEO title={ABOUT_SEO.title} description={ABOUT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">About AiRAT</p>
            <h1 className="display-2xl hero-band__title">{ABOUT_HERO.headline}</h1>
            <p className="body-lg hero-band__lead">{ABOUT_HERO.body}</p>
          </div>
        </section>

        <section className="section section--warm" aria-labelledby="purpose-heading">
          <div className="container section-head">
            <p className="eyebrow" id="purpose-heading">
              Our purpose
            </p>
            <h2 className="display-lg">{ABOUT_RAT_STORY.title}</h2>
            <p className="body-lg">{ABOUT_RAT_STORY.body}</p>
          </div>
          <div className="container diff-grid diff-grid--2col">
            {ABOUT_NARRATIVE_SPINE.chapters.map((ch) => (
              <article key={ch.title} className="diff-card">
                <h3 className="title-md">{ch.title}</h3>
                <p className="body-sm">{ch.body}</p>
              </article>
            ))}
            <article className="diff-card">
              <h3 className="title-md">Built to be owned</h3>
              <p className="body-sm">
                Runbooks, ownership boundaries, and onboarding docs ship with every platform. Your team runs it
                independently the week after we leave.
              </p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="team-heading">
          <div className="container section-head">
            <p className="eyebrow" id="team-heading">
              {ABOUT_TEAM.eyebrow}
            </p>
            <h2 className="display-lg">Who builds your platform</h2>
            <p className="body-lg">{ABOUT_TEAM.lead}</p>
          </div>
          <div className="container">
            <div className="editorial-tile-grid about-role-grid">
            {ABOUT_TEAM_ROLES.map((r, index) => (
              <EditorialTile
                key={r.role}
                title={r.role}
                description={r.description}
                className="about-role-tile"
              >
                <span className="about-role-tile__num">{String(index + 1).padStart(2, "0")}</span>
              </EditorialTile>
            ))}
            </div>
          </div>
        </section>

        <section className="section section--soft" aria-label="Company metrics">
          <div className="container stat-row stat-row--2col">
            {ABOUT_TRUST_STATS.map((s) => (
              <div key={s.label} className="stat-block">
                <strong className="stat-block__value">{s.value}</strong>
                <span className="stat-block__label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="values-heading">
          <div className="container section-head">
            <p className="eyebrow" id="values-heading">
              What we value
            </p>
            <h2 className="display-lg">How we act on every engagement</h2>
            <p className="body-lg">
              We choose fewer engagements, stay accountable through go-live, and measure success in metrics you can
              defend to a board - not billable hours.
            </p>
          </div>
          <div className="container diff-grid diff-grid--2col">
            {workingValues.map((v, i) => (
              <article key={v.title} className="diff-card">
                <span className="label-mono diff-card__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="title-md">{v.title}</h3>
                <p className="body-sm">{v.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--warm" id="clients" aria-labelledby="clients-heading">
          <div className="container section-head">
            <p className="eyebrow" id="clients-heading">
              Our customers
            </p>
            <p className="body-lg">{ABOUT_CLIENTS_PRESENTATION.lead}</p>
            <Link to={ABOUT_CLIENTS_PRESENTATION.ctaTo} className="text-link">
              {ABOUT_CLIENTS_PRESENTATION.ctaLabel} →
            </Link>
          </div>
          <div className="container">
            <ClientLogoMarquee />
          </div>
        </section>

        <section className="section section--soft">
          <div className="container section-head">
            <p className="eyebrow">Quick answers</p>
            <h2 className="display-lg">{ABOUT_FAQ_SECTION.title}</h2>
            <p className="body-md">{ABOUT_FAQ_SECTION.intro}</p>
          </div>
          <div className="container faq-accordion" role="list">
            {ABOUT_FAQ.map((item) => (
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
          id="about-footer-cta"
          title={ABOUT_FOOTER_CTA.headline}
          body={ABOUT_FOOTER_CTA.body}
          primary={ABOUT_FOOTER_CTA.button}
          footnotes={ABOUT_FOOTER_CTA.footnotes}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
