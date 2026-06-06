import { useLocation, Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";
import RevealOnScroll from "../components/RevealOnScroll";
import { openHubSpotMeeting } from "../lib/hubspotMeetings";
import { trackEvent } from "../lib/analytics";
import { faqPageSchema } from "../lib/jsonLd";
import {
  MSSP_META_TITLE,
  MSSP_META_DESCRIPTION,
  MSSP_CANONICAL,
  MSSP_HERO,
  MSSP_PAINS,
  MSSP_PROOF,
  MSSP_OFFER,
  MSSP_FAQ,
} from "../content/msspPageCopy";
import "../styles/apac-cybersecurity-page.css";

function MsspCtaButton({ children, intent }: { children: React.ReactNode; intent: string }) {
  const { pathname } = useLocation();
  function handleClick() {
    trackEvent("hubspot_meeting_open", { source: "for-mssps", intent, page_path: pathname });
    openHubSpotMeeting(intent, "for-mssps");
  }
  return (
    <button type="button" className="apac-cta-primary" onClick={handleClick}>
      {children} <span aria-hidden="true">→</span>
    </button>
  );
}

export default function ForMsspsPage() {
  const faqSchema = faqPageSchema(MSSP_FAQ.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <AiratShell>
      <SEO
        title={MSSP_META_TITLE}
        description={MSSP_META_DESCRIPTION}
        url={MSSP_CANONICAL}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      <main className="apac-page" id="main-content">

        {/* HERO */}
        <section className="apac-hero" aria-labelledby="mssp-h1">
          <p className="apac-eyebrow">{MSSP_HERO.eyebrow}</p>
          <h1 id="mssp-h1" className="apac-hero__h1">{MSSP_HERO.headline}</h1>
          <p className="apac-hero__lead">{MSSP_HERO.lead}</p>
          <div className="apac-hero__ctas">
            <MsspCtaButton intent={MSSP_HERO.primaryCtaIntent}>{MSSP_HERO.primaryCta}</MsspCtaButton>
            <Link to={MSSP_HERO.secondaryCtaTo} className="apac-cta-secondary">{MSSP_HERO.secondaryCta}</Link>
          </div>
        </section>

        <hr className="apac-divider" />

        {/* PAINS */}
        <section className="apac-section" aria-labelledby="mssp-pain-heading">
          <h2 id="mssp-pain-heading" className="apac-pain__headline">The MSSP margin problem — and why headcount alone can't solve it.</h2>
          <div className="apac-pain__list">
            {MSSP_PAINS.map((b) => (
              <RevealOnScroll key={b.pain} delay={1} as="div" className="apac-pain__item">
                <p className="apac-pain__item-pain">{b.pain}</p>
                <p className="apac-pain__item-detail">{b.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* PROOF */}
        <section className="apac-section" aria-labelledby="mssp-proof-heading">
          <p className="apac-eyebrow">From the field</p>
          <h2 id="mssp-proof-heading" className="apac-proof__headline">{MSSP_PROOF.headline}</h2>
          <div style={{ maxWidth: 680 }}>
            <RevealOnScroll delay={1} as="article" className="apac-proof__card">
              <div className="apac-proof__outcomes">
                {MSSP_PROOF.outcomes.map((o) => (
                  <span key={o} className="apac-proof__outcome">✓ {o}</span>
                ))}
              </div>
              <p className="apac-proof__body">{MSSP_PROOF.detail}</p>
              <Link to={MSSP_PROOF.to} className="apac-proof__link">Read the full case study →</Link>
            </RevealOnScroll>
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ENGAGEMENT */}
        <section className="apac-section" aria-labelledby="mssp-engagement-heading">
          <p className="apac-eyebrow">How we start</p>
          <h2 id="mssp-engagement-heading" className="apac-engagement__headline">{MSSP_OFFER.name}</h2>
          <div className="apac-engagement__steps">
            {MSSP_OFFER.steps.map((s) => (
              <div key={s.n} className="apac-engagement__step">
                <span className="apac-engagement__step-n">{s.n}</span>
                <div>
                  <strong style={{ display: "block", fontSize: "0.9rem", color: "#ebeef7", marginBottom: "0.2rem" }}>{s.label}</strong>
                  <p className="apac-engagement__step-text">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* FAQ */}
        <section className="apac-section" aria-labelledby="mssp-faq-heading">
          <h2 id="mssp-faq-heading" className="apac-faq__headline">Questions from MSSPs</h2>
          <div className="apac-faq__list">
            {MSSP_FAQ.map((f) => (
              <div key={f.q} className="apac-faq__item">
                <p className="apac-faq__q">{f.q}</p>
                <p className="apac-faq__a">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="apac-final-cta" aria-labelledby="mssp-final-cta-heading">
          <h2 id="mssp-final-cta-heading" className="apac-final-cta__headline">Map your alert workflow — 30 minutes.</h2>
          <p className="apac-final-cta__lead">
            Bring your current SIEM stack, alert volume, and triage bottleneck. We map the automation leverage points — no contract required.
          </p>
          <div className="apac-final-cta__actions">
            <MsspCtaButton intent={MSSP_HERO.primaryCtaIntent}>{MSSP_HERO.primaryCta}</MsspCtaButton>
            <Link to="/apac-cybersecurity-ai-soc-automation" className="apac-cta-secondary">
              APAC cybersecurity services →
            </Link>
          </div>
          <div className="apac-final-cta__trust">
            {["NDA-friendly", "APAC timezones covered", "On-prem · VPC · Hybrid", "No black-box AI"].map((t) => (
              <span key={t} className="apac-final-cta__trust-item">{t}</span>
            ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </AiratShell>
  );
}
