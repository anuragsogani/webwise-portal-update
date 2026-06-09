import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import RevealOnScroll from "../components/RevealOnScroll";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { AgentMap, LiveQueryConsole, ActiveResponseFlow } from "../components/EndpointVisuals";
import {
  ENDPOINT_CORE_LINK,
  ENDPOINT_CTA,
  ENDPOINT_HERO,
  ENDPOINT_LIVE,
  ENDPOINT_PROTECT,
  ENDPOINT_RESPOND,
  ENDPOINT_SCALE,
  ENDPOINT_SEO,
} from "../content/endpointProductPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";
import "../styles/products-page.css";

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  capabilities: readonly string[];
  outcome: string;
};

function FeatureCopy({ data, withCaps = true }: { data: Feature; withCaps?: boolean }) {
  return (
    <div className="ep-feature__copy">
      <p className="label-mono ep-pillar__eyebrow">{data.eyebrow}</p>
      <h2 className="display-md">{data.title}</h2>
      <p className="body-md" style={{ marginTop: "0.4rem" }}>
        {data.body}
      </p>
      {withCaps && (
        <ul className="ep-feature__caps">
          {data.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
      <p className="ep-feature__outcome">{data.outcome}</p>
    </div>
  );
}

function CapsPanel({ label, caps }: { label: string; caps: readonly string[] }) {
  return (
    <div className="ep-panel">
      <p className="ep-panel__label">{label}</p>
      <ul className="ep-panel__caps">
        {caps.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default function EndpointProductPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-product-endpoint",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Endpoint Operations & Security Platform", path: "/products/endpoint" },
      ]),
    );
    return () => rmBc();
  }, []);

  return (
    <AiratShell>
      <SEO title={ENDPOINT_SEO.title} description={ENDPOINT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        {/* Hero */}
        <section className="hero-band section">
          <div className="container ep-hero">
            <div className="ep-hero__grid">
              <div className="ep-hero__copy">
                <p className="eyebrow">{ENDPOINT_HERO.badge}</p>
                <h1 className="display-2xl hero-band__title">{ENDPOINT_HERO.headline}</h1>
                <p className="ep-hero__kicker label-mono">
                  {ENDPOINT_HERO.keywords.map((k) => (
                    <span key={k}>{k}</span>
                  ))}
                </p>
                <p className="body-lg hero-band__lead">{ENDPOINT_HERO.body}</p>
                <div className="hero-band__actions">
                  <Link to="/contact" className="btn btn--primary">
                    Book a strategy call
                  </Link>
                  <Link to="/products" className="btn btn--secondary">
                    ← All products
                  </Link>
                </div>
                <div className="ep-metrics">
                  {ENDPOINT_HERO.metrics.map((m) => (
                    <div key={m.label} className="ep-metric">
                      <span className="ep-metric__v">{m.value}</span>
                      <span className="ep-metric__l">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ep-hero__visual">
                <AgentMap />
              </div>
            </div>
            <ul className="ep-caps ep-caps--band">
              {ENDPOINT_HERO.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Live discovery */}
        <section className="section">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <FeatureCopy data={ENDPOINT_LIVE} />
            <div className="ep-feature__visual">
              <LiveQueryConsole />
            </div>
          </RevealOnScroll>
        </section>

        {/* Continuous protection */}
        <section className="section section--soft">
          <RevealOnScroll className="container ep-feature" as="div">
            <FeatureCopy data={ENDPOINT_PROTECT} withCaps={false} />
            <div className="ep-feature__visual">
              <CapsPanel label="Always-on, on every device" caps={ENDPOINT_PROTECT.capabilities} />
            </div>
          </RevealOnScroll>
        </section>

        {/* Active response */}
        <section className="section">
          <RevealOnScroll className="container ep-feature ep-feature--reverse" as="div">
            <FeatureCopy data={ENDPOINT_RESPOND} />
            <div className="ep-feature__visual">
              <ActiveResponseFlow />
            </div>
          </RevealOnScroll>
        </section>

        {/* Operations at scale */}
        <section className="section section--soft">
          <RevealOnScroll className="container ep-feature" as="div">
            <FeatureCopy data={ENDPOINT_SCALE} withCaps={false} />
            <div className="ep-feature__visual">
              <CapsPanel label="One secured console" caps={ENDPOINT_SCALE.capabilities} />
            </div>
          </RevealOnScroll>
        </section>

        {/* Wired to the core */}
        <section className="section section--warm">
          <RevealOnScroll className="container section-head" as="div">
            <p className="eyebrow">{ENDPOINT_CORE_LINK.eyebrow}</p>
            <h2 className="display-lg">{ENDPOINT_CORE_LINK.title}</h2>
            <p className="body-lg">{ENDPOINT_CORE_LINK.body}</p>
            <Link to="/products/soc" className="text-link" style={{ display: "inline-block", marginTop: "var(--space-md)" }}>
              See the CSOC core →
            </Link>
          </RevealOnScroll>
        </section>

        <CtaBand
          title={ENDPOINT_CTA.title}
          body={ENDPOINT_CTA.body}
          primary={{ label: ENDPOINT_CTA.cta, to: ENDPOINT_CTA.ctaTo }}
          secondary={{ label: "All products →", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
