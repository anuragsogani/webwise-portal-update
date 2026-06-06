import { useEffect } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { TERMS_PAGE_BODY, TERMS_PAGE_SEO } from "../content/legalPagesCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/inner-pages.css";

export default function TermsPage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-terms",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Terms", path: "/terms" },
      ]),
    );
    return () => { rmBc(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={TERMS_PAGE_SEO.title.replace(" | AiRAT", "")} description={TERMS_PAGE_SEO.description} />
      <SiteHeader />
      <main className="inner-main legal-page" id="main-content">
        <section className="inner-hero inner-hero--airat">
          <p className="eyebrow">Legal</p>
          <h1 className="hero-h1">{TERMS_PAGE_BODY.headline}</h1>
          <p className="hero-sub">Last updated: {TERMS_PAGE_BODY.updated}</p>
        </section>

        <div className="inner-section legal-page__body">
          {TERMS_PAGE_BODY.sections.map((s) => (
            <section key={s.title} className="legal-page__section">
              <h2 className="section-title legal-page__h2">{s.title}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={`${s.title}-${i}`} className="section-lead legal-page__p">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="inner-section">
          <Link className="btn btn-ghost" to="/">← Back to home</Link>
        </section>
      </main>
      <SiteFooter />
    </AiratShell>
  );
}
