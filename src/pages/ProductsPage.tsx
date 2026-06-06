import { useEffect } from "react";
import EditorialTile from "../components/EditorialTile";
import CtaBand from "../components/CtaBand";
import { Link } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import { faqsToSchemaPairs } from "../content/faqTypes";
import {
  CYBER_SOLUTIONS,
  PRODUCT_TILE_ICONS,
  PRODUCT_TILES,
  PRODUCTS_CLOSING,
  PRODUCTS_FAQ,
  PRODUCTS_FAQ_SECTION,
  PRODUCTS_HERO,
  PRODUCTS_SEO,
  productPath,
  type ProductId,
} from "../content/productsPageCopy";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

export default function ProductsPage() {
  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-products",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-products", faqPageSchema(faqsToSchemaPairs(PRODUCTS_FAQ)));
    return () => {
      rmBc();
      rmFaq();
    };
  }, []);

  return (
    <AiratShell>
      <SEO title={PRODUCTS_SEO.title} description={PRODUCTS_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{PRODUCTS_HERO.badge}</p>
            <h1 className="display-2xl hero-band__title">{PRODUCTS_HERO.headline}</h1>
            <p className="body-lg hero-band__lead">{PRODUCTS_HERO.body}</p>
            <div className="hero-band__actions">
              <Link to="/contact" className="btn btn--primary">
                Book a strategy call
              </Link>
              <Link to="/services" className="btn btn--secondary">
                Explore services
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--warm" aria-labelledby="products-grid-heading">
          <div className="container section-head">
            <p className="eyebrow" id="products-grid-heading">
              Core products
            </p>
            <h2 className="display-lg">Choose a product</h2>
            <p className="body-lg">
              Each product ships with agreed SLAs, delivery workflow, and capabilities on its own page.
            </p>
          </div>
          <div className="container">
            <div className="editorial-tile-grid editorial-tile-grid--2col-centered">
            {PRODUCT_TILES.map((tile, i) => (
              <EditorialTile
                key={tile.id}
                title={tile.title}
                description={tile.body}
                meta={[
                  { label: "Type", value: tile.metaType },
                  { label: "Signal", value: tile.metaSignal },
                ]}
                ctaLabel={tile.ctaLabel}
                href={productPath(tile.id as ProductId)}
              >
                <img
                  className="editorial-tile__icon"
                  src={PRODUCT_TILE_ICONS[i]?.src ?? PRODUCT_TILE_ICONS[0]!.src}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                />
              </EditorialTile>
            ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">Accelerators</p>
            <h2 className="display-lg">Focused solutions with defined outcomes</h2>
            <p className="body-lg">
              Products are long-term platforms. Solutions are time-boxed accelerators — SIEM migration, SOC stand-up,
              audit readiness — to reach production faster.
            </p>
          </div>
          <div className="container editorial-tile-grid">
            {CYBER_SOLUTIONS.map((solution) => (
              <EditorialTile
                key={solution.id}
                title={solution.title}
                description={solution.oneLiner}
                meta={[
                  { label: "Type", value: "Accelerator" },
                  { label: "Product", value: solution.relatedProductId.toUpperCase() },
                ]}
                ctaLabel="Explore accelerator"
                href={productPath(solution.relatedProductId as ProductId)}
              />
            ))}
          </div>
        </section>

        <section className="section section--soft">
          <div className="container section-head">
            <p className="eyebrow">Quick answers</p>
            <h2 className="display-lg">{PRODUCTS_FAQ_SECTION.title}</h2>
            <p className="body-md">{PRODUCTS_FAQ_SECTION.intro}</p>
          </div>
          <div className="container faq-accordion" role="list">
            {PRODUCTS_FAQ.map((item) => (
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
          title={PRODUCTS_CLOSING.title}
          body={PRODUCTS_CLOSING.body}
          primary={{ label: PRODUCTS_CLOSING.cta, to: PRODUCTS_CLOSING.ctaTo }}
          secondary={{ label: "Read case studies →", to: "/portfolio" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
