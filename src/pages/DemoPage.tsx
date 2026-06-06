import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import EditorialTile from "../components/EditorialTile";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { usePageSeo } from "../hooks/usePageSeo";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/demo-page.css";

type DemoItem = {
  id: string;
  number: string;
  title: string;
  role: string;
  description: string;
  outcomes: string[];
  ctaLabel: string;
  ctaTo: string;
};

const DEMOS: DemoItem[] = [
  {
    id: "ecom",
    number: "01",
    title: "E-Commerce Search Engine",
    role: "E-Commerce Platform",
    description:
      "Elasticsearch-powered product discovery with typo tolerance, fast filtering, and result ranking tuned for conversion.",
    outcomes: [
      "E-Commerce search",
      "Filter and sort updates without page reloads",
      "Recommendation-ready search architecture",
    ],
    ctaLabel: "Try E-Commerce Demo",
    ctaTo: "/demo/demoecom",
  },
  {
    id: "xdr",
    number: "02",
    title: "Extended Detection and Response (XDR)",
    role: "Cybersecurity Platform",
    description:
      "Unified security telemetry that correlates endpoint, network, and cloud events into one operator-friendly response view.",
    outcomes: [
      "Threat detection",
      "Playbook-ready incident response workflows",
      "Clear forensic trail for analyst handoff",
    ],
    ctaLabel: "Explore XDR Demo",
    ctaTo: "/demo/demoxdrpage",
  },
  {
    id: "jobs",
    number: "03",
    title: "Intelligent Job Search",
    role: "Search Marketplace",
    description:
      "Role discovery experience with fuzzy matching, relevance ranking, and dynamic filters for high-volume listings.",
    outcomes: [
      "Job discovery",
      "Faceted filtering by role, location, and seniority",
      "Designed for large catalog and traffic spikes",
    ],
    ctaLabel: "Try Job Search Demo",
    ctaTo: "/demo/jobsearch",
  },
  {
    id: "property",
    number: "04",
    title: "Geospatial Property Search",
    role: "Real Estate Platform",
    description:
      "Map-first property discovery with geospatial filters, clustering, and location-aware exploration patterns.",
    outcomes: [
      "Geospatial mapping",
      "Geo-filtering for price, distance, and amenities",
      "High-volume listing support with clustering",
    ],
    ctaLabel: "Explore Property Demo",
    ctaTo: "/demo/propertysearch",
  },
  {
    id: "soc",
    number: "05",
    title: "SOC Monitoring Dashboard",
    role: "Security Operations",
    description:
      "Centralized operational view for alerts, attack-chain visibility, and investigation workflows across critical systems.",
    outcomes: [
      "Operational visibility",
      "Graph-friendly workflows for threat analysis",
      "Faster drill-down from signal to root cause",
    ],
    ctaLabel: "Explore SOC Demo",
    ctaTo: "/demo/cybersecurity",
  },
  {
    id: "android",
    number: "06",
    title: "Mobile Subscription App Flow",
    role: "Android Demo",
    description:
      "Mobile-first journey covering discovery, selection, and checkout flows with smooth interactions and clear state transitions.",
    outcomes: [
      "Mobile flow",
      "Responsive interaction model for mobile screens",
      "Design system patterns ready for scale",
    ],
    ctaLabel: "View Mobile Demo",
    ctaTo: "/demo/androiddemo",
  },
];

// const XDR_PAGES = [
//   "airatDashboard",
//   "alertsPage",
//   "assetsPage",
//   "detectionPage",
//   "incidentsPage",
//   "overviewDashboard",
//   "reportsPage",
//   "vulnerabilitiesPage",
//   "WindowsReplica",
//   "XdrDashboard",
// ] as const;

const FAQS = [
  {
    q: "Are these static mockups?",
    a: "No. These demos represent production-style application flows and architecture patterns we use in real client delivery.",
  },
  {
    q: "Can the demos be customized for our business?",
    a: "Yes. Data model, workflows, integrations, and brand layer can be adapted for your team and use case.",
  },
  {
    q: "How do we request a guided walkthrough?",
    a: "Use the contact page and mention the demo you want to review. We can run a focused technical walkthrough.",
  },
];

export default function DemoPage() {
  usePageSeo(
    "Live Demo Applications | AiRAT",
    "Explore themed demo applications across search, cybersecurity, and mobile experiences.",
    "/demo",
  );

  return (
    <AiratShell>
      <SiteHeader />

      <main className="sp-main dp-main" id="main-content">
        <section className="sp-hero dp-hero">
          <span className="sp-eyebrow">Live demos</span>
          <h1 className="sp-hero__h1">Explore our interactive demo applications.</h1>
          <p className="sp-hero__body">
            Production-style experiences across e-commerce search, XDR, job discovery, property intelligence,
            SOC workflows, and mobile subscriptions. Each demo reflects real architecture choices, not template UI.
          </p>
          <div className="sp-hero__actions">
            <a href="#demo-list" className="dp-btn dp-btn--primary">Browse demos</a>
            <Link to="/contact" className="dp-btn dp-btn--ghost">Book a guided walkthrough</Link>
          </div>
        </section>

        <hr className="sp-rule" />

        <section id="demo-list" className="dp-tiles-section" aria-label="Demo applications">
          <div className="container editorial-tile-grid">
            {DEMOS.map((demo) => (
              <EditorialTile
                key={demo.id}
                title={demo.title}
                description={demo.description}
                meta={[
                  { label: "Type", value: demo.role },
                  { label: "Signal", value: demo.outcomes[0] ?? "" },
                ]}
                ctaLabel={demo.ctaLabel}
                href={demo.ctaTo}
              >
                <span className="dp-tile__number" aria-hidden="true">
                  {demo.number}
                </span>
              </EditorialTile>
            ))}
          </div>
        </section>



        <hr className="sp-rule" />

        <section className="sp-section" aria-labelledby="demo-faq-title">
          <div className="sp-section__label">
            <p className="sp-label">FAQ</p>
          </div>
          <div className="sp-section__body">
            <h2 id="demo-faq-title" className="sp-section-title">Demo page questions</h2>
            <div className="sp-faq">
              {FAQS.map((faq) => (
                <article key={faq.q} className="sp-faq__item">
                  <h3 className="sp-faq__q">{faq.q}</h3>
                  <p className="sp-faq__a">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Want a walkthrough for your use case?"
          body="Share your product context and we will map the closest demo flow, architecture direction, and delivery path."
          primary={{ label: "Book a demo call", to: "/contact" }}
          secondary={{ label: "See case studies", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
