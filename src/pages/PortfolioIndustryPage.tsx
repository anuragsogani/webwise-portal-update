import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import EditorialTile from "../components/EditorialTile";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import {
  PORTFOLIO_INDUSTRY_COPY,
  industryFromSlug,
} from "../content/portfolioPageCopy";
import { listCaseStudies, type CaseStudy } from "../api/caseStudies";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

function caseSummary(project: CaseStudy): string {
  return project.summary || project.description || "Outcome-focused delivery with measurable results.";
}

export default function PortfolioIndustryPage() {
  const { industrySlug } = useParams<{ industrySlug: string }>();
  const industry = industrySlug ? industryFromSlug(industrySlug) : undefined;

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listCaseStudies()
      .then((csRes) => {
        if (cancelled) return;
        const sortedCS = [...csRes.case_studies].sort((a, b) => {
          const yearA = parseInt(a.year || "0", 10);
          const yearB = parseInt(b.year || "0", 10);
          if (yearB !== yearA) return yearB - yearA;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        setCaseStudies(sortedCS);
        setError(null);
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const industryCases = useMemo(() => {
    if (!industry) return [];
    return caseStudies.filter((cs) => cs.category === industry);
  }, [caseStudies, industry]);

  useEffect(() => {
    if (!industry) return;
    const base = getSiteBaseUrl();
    const copy = PORTFOLIO_INDUSTRY_COPY[industry];
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-portfolio-industry",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/portfolio" },
        { name: copy.title, path: `/portfolio/industry/${industrySlug}` },
      ]),
    );
    return () => {
      rmBc();
    };
  }, [industry, industrySlug]);

  if (!industry) {
    return <Navigate to="/portfolio" replace />;
  }

  const copy = PORTFOLIO_INDUSTRY_COPY[industry];

  return (
    <AiratShell>
      <SEO
        title={`${copy.title} case studies | AiRAT`}
        description={copy.description}
      />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="portfolio-industry-back">
              <Link to="/portfolio" className="text-link">
                ← All industries
              </Link>
            </p>
            <p className="eyebrow">Industry</p>
            <h1 className="display-2xl hero-band__title">{copy.title}</h1>
            <p className="body-lg hero-band__lead">{copy.description}</p>
          </div>
        </section>

        <section className="section" aria-label={`${copy.title} case studies`}>
          <div className="container">
            {loading && (
              <div className="editorial-tile-grid">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="editorial-tile editorial-tile--skeleton" aria-hidden />
                ))}
              </div>
            )}

            {!loading && error && <p className="body-md">Failed to load case studies: {error}</p>}

            {!loading && !error && industryCases.length > 0 && (
              <div className="editorial-tile-grid">
                {industryCases.map((project) => (
                  <EditorialTile
                    key={project.slug}
                    title={project.title}
                    description={caseSummary(project)}
                    meta={[
                      { label: "Date", value: project.year || "2023" },
                      { label: "Category", value: project.category },
                    ]}
                    ctaLabel="Read case study"
                    href={`/portfolio/${project.slug}`}
                  />
                ))}
              </div>
            )}

            {!loading && !error && industryCases.length === 0 && (
              <p className="body-md">
                Case studies for {copy.title} are coming soon.{" "}
                <Link to="/contact" className="text-link">
                  Talk to us about your industry →
                </Link>
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
