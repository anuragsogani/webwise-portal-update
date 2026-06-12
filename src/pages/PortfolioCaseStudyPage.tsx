import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { INSIGHT_SLUGS_BY_PORTFOLIO } from "../content/blog/portfolioInsightMap";
import { getPostBySlug } from "../content/blog/posts";
import type { BlogPost } from "../content/blog/types";
import { PORTFOLIO_SEO } from "../content/portfolioPageCopy";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import { getCaseStudyBySlug, type CaseStudy } from "../api/caseStudies";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/case-study-page.css";

export default function PortfolioCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  const [project, setProject] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ── fetch case study ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    getCaseStudyBySlug(slug)
      .then((data) => {
        if (!cancelled) { setProject(data); setLoading(false); }
      })
      .catch((e: Error) => {
        if (cancelled) return;
        setLoading(false);
        if (e.message === "Case study not found") setNotFound(true);
        else setNotFound(true); // treat any error as not-found for UX
      });
    return () => { cancelled = true; };
  }, [slug]);

  // ── related insight posts (still driven by static map) ───────────────────────
  const relatedInsightPosts: BlogPost[] = [];
  if (project) {
    const slugs = INSIGHT_SLUGS_BY_PORTFOLIO[project.slug];
    if (slugs) {
      for (const s of slugs) {
        const p = getPostBySlug(s);
        if (p) relatedInsightPosts.push(p);
      }
    }
  }
  relatedInsightPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // ── JSON-LD ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!project) return;
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      `airat-ld-breadcrumb-case-${project.slug}`,
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Case studies", path: "/portfolio" },
        { name: project.title, path: `/portfolio/${project.slug}` },
      ]),
    );
    const rmFaq =
      project.faqs && project.faqs.length > 0
        ? injectJsonLdScript(
            `airat-ld-faq-case-${project.slug}`,
            faqPageSchema(faqsToSchemaPairs(project.faqs as any)),
          )
        : () => {};
    return () => { rmBc(); rmFaq(); };
  }, [project]);

  // ── not found ────────────────────────────────────────────────────────────────
  if (!loading && notFound) {
    return (
      <AiratShell>
        <SiteHeader />
        <main className="sp-main" id="main-content">
          <div className="sp-hero">
            <h1 className="sp-hero__h1">Case study not found</h1>
            <Link to="/portfolio" className="sp-text-link">← Back to case studies</Link>
          </div>
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  // ── loading skeleton ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <AiratShell>
        <SEO title="Loading… | AiRAT" description={PORTFOLIO_SEO.description} />
        <SiteHeader />
        <main className="sp-main cs-main" id="main-content">
          <div className="sp-hero cs-hero--skeleton">
            <span className="pf-skeleton-cell" style={{ width: "120px", height: "14px", display: "block", marginBottom: "12px" }} />
            <span className="pf-skeleton-cell" style={{ width: "60%", height: "36px", display: "block", marginBottom: "16px" }} />
            <span className="pf-skeleton-cell" style={{ width: "90%", height: "18px", display: "block" }} />
          </div>
          <hr className="sp-rule" />
          {[...Array(4)].map((_, i) => (
            <section key={i} className="sp-section">
              <div className="sp-section__label"><span className="pf-skeleton-cell" style={{ width: "80px", height: "12px", display: "block" }} /></div>
              <div className="sp-section__body">
                <span className="pf-skeleton-cell" style={{ width: "40%", height: "22px", display: "block", marginBottom: "12px" }} />
                <span className="pf-skeleton-cell" style={{ width: "100%", height: "14px", display: "block", marginBottom: "8px" }} />
                <span className="pf-skeleton-cell" style={{ width: "85%", height: "14px", display: "block" }} />
              </div>
            </section>
          ))}
        </main>
        <SiteFooter />
      </AiratShell>
    );
  }

  if (!project) return null;

  return (
    <AiratShell>
      <SEO
        title={project.seo_title ? project.seo_title.replace(" | AiRAT", "") : project.title}
        description={project.seo_description || project.summary || PORTFOLIO_SEO.description}
      />
      <SiteHeader />

      <main className="sp-main cs-main" id="main-content">
        {/* Hero */}
        <div className="sp-hero">
          <span className="sp-eyebrow">{project.category}</span>
          <h1 className="sp-hero__h1">{project.title}</h1>
          <p className="sp-hero__body">{project.description}</p>
        </div>

        <hr className="sp-rule" />

        {/* Problem */}
        <section className="sp-section" aria-labelledby="cs-problem-heading">
          <div className="sp-section__label">
            <span className="sp-label">The Problem</span>
          </div>
          <div className="sp-section__body">
            <h2 id="cs-problem-heading" className="sp-section-title">What we were solving</h2>
            <ul className="cs-prose-list">
              {project.problem.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Approach */}
        <section className="sp-section" aria-labelledby="cs-approach-heading">
          <div className="sp-section__label">
            <span className="sp-label">The Approach</span>
          </div>
          <div className="sp-section__body">
            <h2 id="cs-approach-heading" className="sp-section-title">What we built</h2>
            <ul className="cs-prose-list">
              {project.solution.map((line) => <li key={line}>{line}</li>)}
            </ul>
            {project.architecture_notes && project.architecture_notes.length > 0 && (
              <>
                <h3 className="cs-sub-heading">Architecture notes</h3>
                <ul className="cs-prose-list cs-prose-list--compact">
                  {project.architecture_notes.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </>
            )}
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Outcomes */}
        <section className="sp-section" aria-labelledby="cs-outcomes-heading">
          <div className="sp-section__label">
            <span className="sp-label">Outcomes</span>
          </div>
          <div className="sp-section__body">
            <h2 id="cs-outcomes-heading" className="sp-section-title">Key results</h2>
            <div className="sp-metrics">
              {project.results.map((r) => (
                <div key={r} className="sp-metric">
                  <span className="sp-metric__val">✓</span>
                  <span className="sp-metric__label">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Tech stack */}
        <section className="sp-section" aria-labelledby="cs-tech-heading">
          <div className="sp-section__label">
            <span className="sp-label">Tech Stack</span>
          </div>
          <div className="sp-section__body">
            <h2 id="cs-tech-heading" className="sp-section-title">Technology landscape</h2>
            <p className="sp-intro">
              Representative tools and patterns&nbsp;&mdash; exact vendors vary per client environment.
            </p>
            <div className="cs-stack-groups">
              {project.tech_stack.map((group) => (
                <div key={group.category} className="cs-stack-group">
                  <h3 className="cs-stack-group__title">{group.category}</h3>
                  <div className="sp-chips">
                    {group.items.map((item) => (
                      <span key={item} className="sp-chip">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="sp-rule" />

        {/* Learnings */}
        <section className="sp-section" aria-labelledby="cs-learnings-heading">
          <div className="sp-section__label">
            <span className="sp-label">Learnings</span>
          </div>
          <div className="sp-section__body">
            <h2 id="cs-learnings-heading" className="sp-section-title">What we'd teach next time</h2>
            <ul className="cs-prose-list">
              {project.learnings.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        </section>

        {/* Case FAQ */}
        {project.faqs && project.faqs.length > 0 && (
          <>
            <hr className="sp-rule" />
            <section className="sp-section" aria-labelledby="cs-faq-heading">
              <div className="sp-section__label">
                <span className="sp-label">FAQ</span>
              </div>
              <div className="sp-section__body">
                <h2 id="cs-faq-heading" className="sp-section-title">
                  Questions this engagement anticipated
                </h2>
                <div className="cs-faq">
                  {project.faqs.map((faq) => (
                    <div key={faq.q} className="cs-faq__item">
                      <p className="cs-faq__q">{faq.q}</p>
                      <p className="cs-faq__a">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Related insights */}
        {relatedInsightPosts.length > 0 && (
          <>
            <hr className="sp-rule" />
            <section className="sp-section" aria-labelledby="cs-related-heading">
              <div className="sp-section__label">
                <span className="sp-label">Related reading</span>
              </div>
              <div className="sp-section__body">
                <div className="sp-table">
                  {relatedInsightPosts.map((p) => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} className="sp-table__row">
                      <span className="sp-table__date">Insight</span>
                      <span className="sp-table__cat">Article</span>
                      <span className="sp-table__title">{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        <CtaBand
          title="Compare your situation to this case."
          body="Bring your constraints - environment, timeline, and budget. We scope before we quote."
          primary={{ label: "All case studies", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
