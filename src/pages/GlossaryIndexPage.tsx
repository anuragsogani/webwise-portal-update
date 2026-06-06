import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { GLOSSARY_TERMS } from "../content/glossaryTerms";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/glossary-page.css";

const PAGE_SEO = {
  title: "Glossary | Enterprise AI, Security & Data Terms | AiRAT",
  description:
    "Production-grade definitions for XDR, RAG, GEO, and other enterprise AI, cybersecurity, and data engineering terms  -  written by engineers who build these systems.",
};

export default function GlossaryIndexPage() {
  const [query, setQuery] = useState("");


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-glossary",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Glossary", path: "/glossary" },
      ]),
    );
    const definedTermSet = {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "AiRAT Engineering Glossary",
      description: "Production-grade definitions for enterprise AI, cybersecurity, and data engineering terms.",
      url: `${base}/glossary`,
      hasPart: GLOSSARY_TERMS.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.shortDef,
        url: `${base}/glossary/${t.slug}`,
      })),
    };
    const rmSet = injectJsonLdScript("airat-ld-glossary-set", definedTermSet);
    return () => { rmBc(); rmSet(); };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return GLOSSARY_TERMS;
    const q = query.toLowerCase();
    return GLOSSARY_TERMS.filter((t) =>
      t.term.toLowerCase().includes(q) ||
      t.shortDef.toLowerCase().includes(q) ||
      t.categoryLabel.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <AiratShell>
      <SEO title={PAGE_SEO.title} description={PAGE_SEO.description} />
      <SiteHeader />

      <main className="sp-main gl-main" id="main-content">
        {/* Split hero */}
        <div className="sp-hero--split">
          <div>
            <span className="sp-eyebrow">Knowledge</span>
            <h1 className="sp-hero__h1">Glossary.</h1>
          </div>
          <div>
            <p className="sp-hero__body">
              Production-grade definitions for XDR, RAG, and other enterprise AI, cybersecurity, and data engineering terms  -  written by engineers who build these systems.
            </p>
            {/* Search */}
            <div className="gl-search">
              <input
                type="search"
                className="gl-search__input"
                placeholder="Search terms…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search glossary terms"
              />
            </div>
          </div>
        </div>

        <hr className="sp-rule" />

        {/* Terms table */}
        <section aria-label="Glossary terms">
          <div className="sp-table gl-table">
            <div className="sp-table__head">
              <span>Category</span>
              <span>Term</span>
              <span>Definition</span>
            </div>
            {filtered.map((t) => (
              <Link key={t.slug} to={`/glossary/${t.slug}`} className="sp-table__row gl-term-row">
                <span className="sp-table__cat">{t.categoryLabel}</span>
                <span className="sp-table__title gl-term__name">{t.term}</span>
                <span className="gl-term__def">{t.shortDef.slice(0, 100)}…</span>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="gl-empty">No terms match your search.</p>
            )}
          </div>
        </section>

        <CtaBand
          title="Running systems that use these technologies?"
          body="We build production-grade security, AI, and data systems for regulated enterprises. Plain-language conversation, no commitment."
          primary={{ label: "Case studies", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
