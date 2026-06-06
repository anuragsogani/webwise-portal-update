import { useEffect } from "react";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TechStackChip from "../components/TechStackChip";
import { faqsToSchemaPairs } from "../content/faqTypes";
import {
  TECH_FAQ,
  TECH_SEO,
  TECH_TABS,
} from "../content/technologyPageCopy";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { SEO } from "../components/SEO";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/technology-page.css";

/* Stack domains shown as left-label sections */
const STACK_DOMAINS = [
  {
    label: "AI & LLM Stack",
    heading: "Models, retrieval, and evaluation",
    body: "We orchestrate LLMs, RAG pipelines, and lakehouse analytics so answers are grounded, observable, and governable for compliance reviewers. Evaluation harnesses ship with every engagement.",
    tabs: ["Data & AI"],
  },
  {
    label: "Security & Detection",
    heading: "SIEM, XDR, and detection engineering",
    body: "Detection rules, enrichment pipelines, and evidence trails designed before the build  -  not retrofitted at audit season. Every automated action has an immutable log and a rollback path.",
    tabs: ["DevSecOps & Security"],
  },
  {
    label: "Data & Search",
    heading: "OpenSearch, lakehouse, and streaming",
    body: "OpenSearch-scale catalogue platforms, Medallion data lakes with Bronze/Silver/Gold governance, and real-time streaming pipelines that finance, product, and investigators trust when numbers diverge.",
    tabs: ["Reporting & Monitoring", "Database & Queues"],
  },
  {
    label: "Infrastructure",
    heading: "Cloud, Kubernetes, and DevSecOps",
    body: "Multi-cloud IaC, hardened Kubernetes patterns, SAST/DAST wired into CI so vulnerabilities surface in PRs  -  not breach notifications. Environments reproducible, auditable, and portable.",
    tabs: ["Cloud Infrastructure", "DevSecOps & Security"],
  },
] as const;

export default function TechnologyExpertisePage() {


  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-tech",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Technology", path: "/technology-expertise" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-tech", faqPageSchema(faqsToSchemaPairs(TECH_FAQ)));
    return () => { rmBc(); rmFaq(); };
  }, []);

  return (
    <AiratShell>
      <SEO title={TECH_SEO.title} description={TECH_SEO.description} />
      <SiteHeader />

      <main className="sp-main te-main" id="main-content">
        {/* Split hero */}
        <div className="sp-hero--split">
          <div>
            <span className="sp-eyebrow">Technology</span>
            <h1 className="sp-hero__h1">The stack is the easy part.</h1>
          </div>
          <div>
            <p className="sp-hero__body">
              We are hired for engineering judgment, not tool familiarity. Every capability listed here is already running in production  -  not a slide-deck stack.
            </p>
          </div>
        </div>

        <hr className="sp-rule" />

        {/* Stack domain sections */}
        {STACK_DOMAINS.map(({ label, heading, body, tabs: tabLabels }) => {
          const matchedTabs = TECH_TABS.filter((t) => (tabLabels as readonly string[]).includes(t.label));
          return (
            <div key={label}>
              <section className="sp-section" aria-labelledby={`te-${label.replace(/\s/g,"-").toLowerCase()}-heading`}>
                <div className="sp-section__label">
                  <span className="sp-label">{label}</span>
                </div>
                <div className="sp-section__body">
                  <h2 id={`te-${label.replace(/\s/g,"-").toLowerCase()}-heading`} className="sp-section-title">{heading}</h2>
                  <p className="sp-intro">{body}</p>
                  {matchedTabs.map((tab) => (
                    <div key={tab.label} className="te-stack-group">
                      <span className="te-stack-group__label">{tab.label}</span>
                      <div className="sp-chips">
                        {tab.tools.map((tool) => (
                          <TechStackChip key={tool.name} name={tool.name} icon={tool.icon} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <hr className="sp-rule" />
            </div>
          );
        })}

        {/* Fullstack also listed separately */}
        <section className="sp-section" aria-labelledby="te-fullstack-heading">
          <div className="sp-section__label">
            <span className="sp-label">Fullstack Engineering</span>
          </div>
          <div className="sp-section__body">
            <h2 id="te-fullstack-heading" className="sp-section-title">APIs, web, and mobile</h2>
            <p className="sp-intro">
              We build APIs, web, and mobile surfaces with CI/CD, observability, and security gates so teams ship weekly without fearing Friday deploys.
            </p>
            {TECH_TABS.filter(t => t.label === "Fullstack Engineering").map((tab) => (
              <div key={tab.label} className="sp-chips">
                {tab.tools.map((tool) => <TechStackChip key={tool.name} name={tool.name} icon={tool.icon} />)}
              </div>
            ))}
          </div>
        </section>

        <hr className="sp-rule" />

        {/* FAQ */}
        <section className="sp-section" aria-labelledby="te-faq-heading">
          <div className="sp-section__label">
            <span className="sp-label">How we choose</span>
          </div>
          <div className="sp-section__body">
            <h2 id="te-faq-heading" className="sp-section-title">Technology decisions  -  how we think</h2>
            <div className="te-faq">
              {TECH_FAQ.map((item) => (
                <div key={item.q} className="te-faq__item">
                  <p className="te-faq__q">{item.q}</p>
                  <p className="te-faq__a">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Read the methodology behind the stack."
          body="Stack choices follow outcomes  -  not the other way around. Five repeatable phases. Same engineers throughout."
          primary={{ label: "Read the methodology", to: "/methodology" }}
          secondary={{ label: "Case studies →", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
