import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import {
  PRODUCT_TILES,
  PRODUCTS_CLOSING,
  getProduct,
  isProductId,
  productPath,
} from "../content/productsPageCopy";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/homepage.css";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();

  if (!productId || !isProductId(productId)) {
    return <Navigate to="/products" replace />;
  }

  const product = getProduct(productId)!;
  const tile = PRODUCT_TILES.find((t) => t.id === productId);

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      `airat-ld-breadcrumb-product-${productId}`,
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: product.title, path: productPath(productId) },
      ]),
    );
    return () => rmBc();
  }, [productId, product.title]);

  return (
    <AiratShell>
      <SEO title={product.seoTitle} description={product.seoDescription} />
      <SiteHeader />

      <main id="main-content">
        <section className="section">
          <div className="container hero-product__inner">
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/products" className="page-breadcrumb__link">
                ← All products
              </Link>
            </nav>
            {tile && <p className="eyebrow">{tile.metaType}</p>}
            <h1 className="display-2xl hero-product__title">{product.title}</h1>
            <p className="body-lg hero-product__lead">{product.lead}</p>
            <div className="chip-list">
              {product.outcomes.map((o) => (
                <span key={o} className="chip chip--lime">
                  {o}
                </span>
              ))}
            </div>
            <div className="hero-band__actions">
              <Link to="/contact" className="btn btn--primary">
                Discuss this product
              </Link>
              <Link to="/portfolio" className="btn btn--secondary">
                See case studies
              </Link>
            </div>
          </div>
        </section>

        <section className="section section--warm" aria-labelledby="workflow-heading">
          <div className="container section-head">
            <p className="eyebrow" id="workflow-heading">
              How we deliver
            </p>
            <h2 className="display-lg">From scope to stable operations</h2>
          </div>
          <div className="container diff-grid">
            {product.workflow.map((step) => (
              <article key={step.step} className="diff-card">
                <span className="label-mono diff-card__num">{step.step}</span>
                <h3 className="title-md">{step.title}</h3>
                <p className="body-sm">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="capabilities-heading">
          <div className="container section-head">
            <p className="eyebrow" id="capabilities-heading">
              Capabilities
            </p>
            <h2 className="display-lg">What ships in production</h2>
          </div>
          <div className="container module-list">
            <ul className="module-list__items">
              {product.capabilities.map((c) => (
                <li key={c} className="module-list__item">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {product.agenticAdr && product.applicationAdr && (
            <div className="container trust-grid" style={{ marginTop: "var(--space-xxl)" }}>
              <article className="trust-card" style={{ color: "inherit", borderColor: "var(--color-hairline)", background: "var(--color-surface-soft)" }}>
                <h3 className="title-md trust-card__title" style={{ color: "var(--color-ink)" }}>
                  {product.agenticAdr.title}
                </h3>
                <p className="body-sm trust-card__body" style={{ color: "var(--color-body)" }}>
                  {product.agenticAdr.lead}
                </p>
                <ul className="body-sm">
                  {product.agenticAdr.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
              <article className="trust-card" style={{ color: "inherit", borderColor: "var(--color-hairline)", background: "var(--color-surface-soft)" }}>
                <h3 className="title-md trust-card__title" style={{ color: "var(--color-ink)" }}>
                  {product.applicationAdr.title}
                </h3>
                <p className="body-sm trust-card__body" style={{ color: "var(--color-body)" }}>
                  {product.applicationAdr.lead}
                </p>
                <ul className="body-sm">
                  {product.applicationAdr.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </div>
          )}
        </section>

        <CtaBand
          title={PRODUCTS_CLOSING.title}
          body={PRODUCTS_CLOSING.body}
          primary={{ label: PRODUCTS_CLOSING.cta, to: PRODUCTS_CLOSING.ctaTo }}
          secondary={{ label: "Back to all products", to: "/products" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
