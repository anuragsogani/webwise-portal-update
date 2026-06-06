import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import IndustryTile from "../components/IndustryTile";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { faqsToSchemaPairs } from "../content/faqTypes";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_FAQ,
  PORTFOLIO_FAQ_SECTION,
  PORTFOLIO_HERO,
  PORTFOLIO_INDUSTRY_COPY,
  PORTFOLIO_SEO,
  industryFromQueryParam,
  industryPortfolioPath,
  type PortfolioIndustry,
} from "../content/portfolioPageCopy";
import { listCaseStudies } from "../api/caseStudies";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [caseCounts, setCaseCounts] = useState<Partial<Record<PortfolioIndustry, number>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listCaseStudies()
      .then((csRes) => {
        if (cancelled) return;
        const counts: Partial<Record<PortfolioIndustry, number>> = {};
        for (const cs of csRes.case_studies) {
          const category = cs.category as PortfolioIndustry;
          counts[category] = (counts[category] ?? 0) + 1;
        }
        setCaseCounts(counts);
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

  const industries = useMemo(() => {
    const order = PORTFOLIO_CATEGORIES.filter((c) => c !== "All") as PortfolioIndustry[];
    return order.map((industry) => ({
      industry,
      copy: PORTFOLIO_INDUSTRY_COPY[industry],
      caseCount: caseCounts[industry] ?? 0,
    }));
  }, [caseCounts]);

  useEffect(() => {
    const raw = searchParams.get("category");
    if (!raw) return;
    const matched = industryFromQueryParam(raw);
    if (matched) {
      navigate(industryPortfolioPath(matched), { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-portfolio",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/portfolio" },
      ]),
    );
    const rmFaq = injectJsonLdScript(
      "airat-ld-faq-portfolio",
      faqPageSchema(faqsToSchemaPairs(PORTFOLIO_FAQ)),
    );
    return () => {
      rmBc();
      rmFaq();
    };
  }, []);

  return (
    <AiratShell>
      <SEO title={PORTFOLIO_SEO.title} description={PORTFOLIO_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{PORTFOLIO_HERO.badge}</p>
            <h1 className="display-2xl hero-band__title">{PORTFOLIO_HERO.headline}</h1>
            <p className="body-lg hero-band__lead">{PORTFOLIO_HERO.intro}</p>
          </div>
        </section>

        <section className="section" aria-label="Industries">
          <div className="container industry-tile-grid">
            {loading &&
              [...Array(6)].map((_, i) => (
                <div key={i} className="industry-tile industry-tile--skeleton" aria-hidden />
              ))}

            {!loading && error && <p className="body-md">Failed to load industries: {error}</p>}

            {!loading &&
              !error &&
              industries.map(({ industry, copy, caseCount }) => (
                <IndustryTile
                  key={industry}
                  industry={industry}
                  title={copy.title}
                  description={copy.description}
                  caseCount={caseCount}
                  href={industryPortfolioPath(industry)}
                />
              ))}
          </div>
        </section>

        <section className="section section--soft">
          <div className="container section-head">
            <p className="eyebrow">Quick answers</p>
            <h2 className="display-lg">{PORTFOLIO_FAQ_SECTION.title}</h2>
            <p className="body-md">{PORTFOLIO_FAQ_SECTION.intro}</p>
          </div>
          <div className="container faq-accordion" role="list">
            {PORTFOLIO_FAQ.map((item) => (
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
          title="Ready to discuss your situation?"
          body="Bring one concrete problem — SOC throughput, stalled AI, or search under load. We scope before we quote."
          primary={{ label: "Contact us", to: "/contact" }}
          secondary={{ label: "Explore services →", to: "/services" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
