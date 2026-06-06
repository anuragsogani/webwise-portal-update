import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { GLOSSARY_TERMS, getTermBySlug } from "../content/glossaryTerms";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/glossary-page.css";

export default function GlossaryPage() {
  const { term: slug } = useParams<{ term: string }>();
  const term = getTermBySlug(slug);
  const path = `/glossary/${slug ?? ""}`;


  useEffect(() => {
    if (!term) return;
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      `airat-ld-breadcrumb-gloss-${term.slug}`,
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Glossary", path: "/glossary" },
        { name: term.term, path },
      ]),
    );
    const termSchema = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: term.term,
      description: term.shortDef,
      ...(term.schema?.inDefinedTermSet && {
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: term.schema.inDefinedTermSet,
          url: `${base}/glossary`,
        },
      }),
    };
    const rmTerm = injectJsonLdScript(`airat-ld-term-${term.slug}`, termSchema);
    return () => { rmBc(); rmTerm(); };
  }, [term, path]);

  if (!term) {
    return (
      <AiratShell>
        <SiteHeader />
        <main className="sp-main" id="main-content">
          <div className="sp-hero">
            <h1 className="sp-hero__h1">Term not found</h1>
            <Link to="/glossary" className="sp-text-link">← Back to glossary</Link>
          </div>
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  const related = GLOSSARY_TERMS.filter((t) => term.relatedSlugs.includes(t.slug));

  return (
    <AiratShell>
      <SEO
        title={term ? term.seoTitle.replace(" | AiRAT", "") : "Term not found"}
        description={term?.seoDescription ?? "The requested glossary entry could not be found."}
      />
      <SiteHeader />

      <main className="sp-main gl-main" id="main-content">
        {/* Hero */}
        <div className="sp-hero">
          <span className="sp-eyebrow">{term.categoryLabel} · Glossary</span>
          <h1 className="sp-hero__h1">{term.term}</h1>
          <p className="sp-hero__body">{term.shortDef}</p>
        </div>

        <hr className="sp-rule" />

        {/* Definition */}
        <section className="sp-section" aria-labelledby="gl-def-heading">
          <div className="sp-section__label">
            <span className="sp-label">Definition</span>
          </div>
          <div className="sp-section__body">
            <h2 id="gl-def-heading" className="sp-section-title">What is {term.term}?</h2>
            <div className="gl-body">
              {term.body.map((para, i) => (
                <p key={i} className="sp-body">{para}</p>
              ))}
            </div>
          </div>
        </section>

        {term.examples.length > 0 && (
          <>
            <hr className="sp-rule" />
            <section className="sp-section" aria-labelledby="gl-examples-heading">
              <div className="sp-section__label">
                <span className="sp-label">In Practice</span>
              </div>
              <div className="sp-section__body">
                <h2 id="gl-examples-heading" className="sp-section-title">Examples in production</h2>
                <div className="sp-grid-2">
                  {term.examples.map((ex) => (
                    <div key={ex.label} className="sp-card">
                      <p className="sp-card__title">{ex.label}</p>
                      <p className="sp-card__body">{ex.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {related.length > 0 && (
          <>
            <hr className="sp-rule" />
            <section className="sp-section" aria-labelledby="gl-related-heading">
              <div className="sp-section__label">
                <span className="sp-label">Related terms</span>
              </div>
              <div className="sp-section__body">
                <h2 id="gl-related-heading" className="sp-section-title">Explore further</h2>
                <div className="sp-chips">
                  {related.map((t) => (
                    <Link key={t.slug} to={`/glossary/${t.slug}`} className="sp-chip sp-chip--lime gl-related-chip">
                      {t.term}
                    </Link>
                  ))}
                </div>
                {/* Full table of related terms */}
                <div className="sp-table" style={{ marginTop: "1rem" }}>
                  {related.map((t) => (
                    <Link key={t.slug} to={`/glossary/${t.slug}`} className="sp-table__row">
                      <span className="sp-table__cat">{t.categoryLabel}</span>
                      <span className="sp-table__title">{t.term}</span>
                      <span className="gl-term__def">{t.shortDef.slice(0, 90)}…</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {term.faqs.length > 0 && (
          <>
            <hr className="sp-rule" />
            <section className="sp-section" aria-labelledby="gl-faq-heading">
              <div className="sp-section__label">
                <span className="sp-label">FAQ</span>
              </div>
              <div className="sp-section__body">
                <h2 id="gl-faq-heading" className="sp-section-title">Questions about {term.term}</h2>
                <div className="gl-faq">
                  {term.faqs.map((faq) => (
                    <div key={faq.q} className="gl-faq__item">
                      <p className="gl-faq__q">{faq.q}</p>
                      <p className="gl-faq__a">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <CtaBand
          title={`Running a system that uses ${term.term}?`}
          body={`We build production-grade ${term.categoryLabel.toLowerCase()} systems for regulated enterprises.`}
          primary={{ label: "Back to glossary", to: "/glossary" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
