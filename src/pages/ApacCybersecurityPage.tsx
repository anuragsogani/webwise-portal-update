import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";
import RevealOnScroll from "../components/RevealOnScroll";
import { openHubSpotMeeting } from "../lib/hubspotMeetings";
import { trackEvent } from "../lib/analytics";
import { faqPageSchema } from "../lib/jsonLd";
import {
  APAC_META_TITLE,
  APAC_META_DESCRIPTION,
  APAC_CANONICAL,
  APAC_HERO,
  APAC_WHO,
  APAC_PAIN,
  APAC_OFFERS,
  APAC_WHY_NOW,
  APAC_PROOF,
  APAC_ENGAGEMENT,
  APAC_FINAL_CTA,
  APAC_FAQ,
} from "../content/apacCybersecurityPageCopy";
import "../styles/apac-cybersecurity-page.css";

function ApacCtaButton({ intent, source, children }: { intent: string; source: string; children: React.ReactNode }) {
  const { pathname } = useLocation();
  function handleClick() {
    trackEvent("hubspot_meeting_open", { source, intent, page_path: pathname });
    openHubSpotMeeting(intent, source);
  }
  return (
    <button type="button" className="apac-cta-primary" onClick={handleClick}>
      {children} <span aria-hidden="true">→</span>
    </button>
  );
}

export default function ApacCybersecurityPage() {
  const faqSchema = faqPageSchema(APAC_FAQ.map((f) => ({ question: f.q, answer: f.a })));

  return (
    <AiratShell>
      <SEO
        title={APAC_META_TITLE}
        description={APAC_META_DESCRIPTION}
        url={APAC_CANONICAL}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      <main className="apac-page" id="main-content">

        {/* ── 1. HERO ────────────────────────────────────────────── */}
        <section className="apac-hero" aria-labelledby="apac-h1">
          <div className="apac-hero__geo" aria-label="Regions served">
            {APAC_HERO.geoChips.map((g) => (
              <span key={g} className="apac-hero__geo-chip">{g}</span>
            ))}
          </div>
          <p className="apac-eyebrow">{APAC_HERO.eyebrow}</p>
          <h1 id="apac-h1" className="apac-hero__h1">{APAC_HERO.headline}</h1>
          <p className="apac-hero__lead">{APAC_HERO.lead}</p>
          <div className="apac-hero__ctas">
            <ApacCtaButton intent={APAC_HERO.primaryCtaIntent} source="apac-hero">
              {APAC_HERO.primaryCta}
            </ApacCtaButton>
            <a href={`#${APAC_OFFERS.id}`} className="apac-cta-secondary">
              {APAC_HERO.secondaryCta}
            </a>
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 2. WHO ─────────────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-who-heading">
          <h2 id="apac-who-heading" className="apac-who__headline">{APAC_WHO.headline}</h2>
          <div className="apac-who__grid">
            {APAC_WHO.audiences.map((a) => (
              <RevealOnScroll key={a.label} delay={1} as="div" className="apac-who__card">
                <strong className="apac-who__card-label">{a.label}</strong>
                <p className="apac-who__card-detail">{a.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 3. PAIN ────────────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-pain-heading">
          <p className="apac-eyebrow">{APAC_PAIN.eyebrow}</p>
          <h2 id="apac-pain-heading" className="apac-pain__headline">{APAC_PAIN.headline}</h2>
          <div className="apac-pain__list">
            {APAC_PAIN.bullets.map((b) => (
              <RevealOnScroll key={b.pain} delay={1} as="div" className="apac-pain__item">
                <p className="apac-pain__item-pain">{b.pain}</p>
                <p className="apac-pain__item-detail">{b.detail}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 4. OFFERS ──────────────────────────────────────────── */}
        <section id={APAC_OFFERS.id} className="apac-section" aria-labelledby="apac-offers-heading">
          <p className="apac-eyebrow">{APAC_OFFERS.eyebrow}</p>
          <h2 id="apac-offers-heading" className="apac-offers__headline">{APAC_OFFERS.headline}</h2>
          <div className="apac-offers__grid">
            {APAC_OFFERS.items.map((offer, i) => (
              <RevealOnScroll key={offer.name} delay={((i % 3) + 1) as 1 | 2 | 3} as="div" className="apac-offer__card">
                <span className="apac-offer__duration">{offer.duration}</span>
                <strong className="apac-offer__name">{offer.name}</strong>
                <p className="apac-offer__output">{offer.output}</p>
                <div className="apac-offer__tags">
                  {offer.tags.map((tag) => (
                    <span key={tag} className="apac-offer__tag">{tag}</span>
                  ))}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 5. WHY NOW ─────────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-why-heading">
          <h2 id="apac-why-heading" className="apac-why-now__headline">{APAC_WHY_NOW.headline}</h2>
          <ul className="apac-why-now__list">
            {APAC_WHY_NOW.points.map((p) => (
              <li key={p} className="apac-why-now__item">{p}</li>
            ))}
          </ul>
          <div className="apac-positioning">
            <p className="apac-positioning__headline">{APAC_WHY_NOW.positioning.headline}</p>
            <div className="apac-positioning__cols">
              <div>
                <p className="apac-positioning__col-label apac-positioning__col-label--is">AiRAT is</p>
                <ul className="apac-positioning__list apac-positioning__list--is">
                  {APAC_WHY_NOW.positioning.isItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="apac-positioning__col-label apac-positioning__col-label--isnot">AiRAT is not</p>
                <ul className="apac-positioning__list apac-positioning__list--isnot">
                  {APAC_WHY_NOW.positioning.isNotItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 6. PROOF ───────────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-proof-heading">
          <p className="apac-eyebrow">{APAC_PROOF.eyebrow}</p>
          <h2 id="apac-proof-heading" className="apac-proof__headline">{APAC_PROOF.headline}</h2>
          <div className="apac-proof__grid">
            {APAC_PROOF.cases.map((c) => (
              <RevealOnScroll key={c.title} delay={1} as="article" className="apac-proof__card">
                <span className="apac-proof__domain">{c.domain}</span>
                <h3 className="apac-proof__title">{c.title}</h3>
                <div className="apac-proof__outcomes">
                  {c.outcomes.map((o) => (
                    <span key={o} className="apac-proof__outcome">✓ {o}</span>
                  ))}
                </div>
                <p className="apac-proof__body">{c.body}</p>
                <p className="apac-proof__relevant">{c.relevantFor}</p>
                <Link to={c.to} className="apac-proof__link">Read case study →</Link>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <hr className="apac-divider" />

        {/* ── 7. ENGAGEMENT ──────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-engagement-heading">
          <p className="apac-eyebrow">{APAC_ENGAGEMENT.eyebrow}</p>
          <h2 id="apac-engagement-heading" className="apac-engagement__headline">{APAC_ENGAGEMENT.headline}</h2>
          <div className="apac-engagement__steps">
            {APAC_ENGAGEMENT.steps.map((s) => (
              <div key={s.n} className="apac-engagement__step">
                <span className="apac-engagement__step-n">{s.n}</span>
                <p className="apac-engagement__step-text">{s.step}</p>
              </div>
            ))}
          </div>
          <p className="apac-engagement__note">{APAC_ENGAGEMENT.note}</p>
        </section>

        <hr className="apac-divider" />

        {/* ── FAQ ────────────────────────────────────────────────── */}
        <section className="apac-section" aria-labelledby="apac-faq-heading">
          <h2 id="apac-faq-heading" className="apac-faq__headline">Common questions</h2>
          <div className="apac-faq__list" itemScope itemType="https://schema.org/FAQPage">
            {APAC_FAQ.map((f) => (
              <div key={f.q} className="apac-faq__item" itemScope itemType="https://schema.org/Question">
                <p className="apac-faq__q" itemProp="name">{f.q}</p>
                <div itemScope itemType="https://schema.org/Answer">
                  <p className="apac-faq__a" itemProp="text">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. FINAL CTA ───────────────────────────────────────── */}
        <section className="apac-final-cta" aria-labelledby="apac-final-cta-heading">
          <h2 id="apac-final-cta-heading" className="apac-final-cta__headline">{APAC_FINAL_CTA.headline}</h2>
          <p className="apac-final-cta__lead">{APAC_FINAL_CTA.lead}</p>
          <div className="apac-final-cta__actions">
            <ApacCtaButton intent={APAC_FINAL_CTA.primaryCtaIntent} source="apac-final-cta">
              {APAC_FINAL_CTA.primaryCta}
            </ApacCtaButton>
            <Link to={APAC_FINAL_CTA.secondaryCtaTo} className="apac-cta-secondary">
              {APAC_FINAL_CTA.secondaryCta}
            </Link>
          </div>
          <div className="apac-final-cta__trust">
            {APAC_FINAL_CTA.trust.map((t) => (
              <span key={t} className="apac-final-cta__trust-item">{t}</span>
            ))}
          </div>
        </section>

      </main>

      <SiteFooter />
    </AiratShell>
  );
}
