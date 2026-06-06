import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { usePageSeo } from "../hooks/usePageSeo";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/inner-pages.css";

export default function NotFoundPage() {
  const { pathname } = useLocation();

  usePageSeo(
    "Page not found | AiRAT",
    "The page you requested is not available. Explore services, insights, or contact AiRAT.",
    pathname || "/404",
    { robots: "noindex, nofollow" },
  );

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-404",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Not found", path: pathname || "/404" },
      ]),
    );
    return () => { rmBc(); };
  }, [pathname]);

  return (
    <AiratShell>
      <SiteHeader />
      <main className="inner-main" id="main-content">
        <section className="inner-hero inner-hero--airat">
          <p className="eyebrow">404</p>
          <h1 className="hero-h1">This page is not here.</h1>
          <p className="hero-sub">
            The URL <code className="legal-page__code">{pathname}</code> does not match any published route.
            If you followed a link from elsewhere, it may be out of date.
          </p>
        </section>

        <section className="inner-section">
          <h2 className="section-title">Where to go next</h2>
          <div className="cta-row">
            <Link className="btn btn-ghost" to="/">Home</Link>
            <Link className="btn btn-ghost" to="/services">Services</Link>
            <Link className="btn btn-ghost" to="/blog">Insights</Link>
            <Link className="btn btn-ghost" to="/contact">Contact</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AiratShell>
  );
}
