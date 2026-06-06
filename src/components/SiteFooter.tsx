import { Link, useLocation } from "react-router-dom";
import {
  FOOTER_COLUMNS,
  FOOTER_LEGAL,
  FOOTER_SUPPORT,
  FOOTER_WATERMARK,
} from "../content/footerCopy";
import { HOME_SCENE } from "../content/homePageVisuals";
import GetAiSummaryLinks from "./GetAiSummaryLinks";
import CtaGetStarted from "./CtaGetStarted";
import "../styles/footer.css";

function FooterLink({ to, children }: { to: string; children: string }) {
  if (to.startsWith("mailto:") || to.startsWith("http") || to.endsWith(".xml")) {
    return (
      <a href={to} className="footer__link">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className="footer__link">
      {children}
    </Link>
  );
}

const SKIP_PRE_FOOTER = new Set(["/", "/contact"]);

export default function SiteFooter() {
  const { pathname } = useLocation();
  const showPreFooter = !SKIP_PRE_FOOTER.has(pathname);

  return (
    <>
      {showPreFooter ? <CtaGetStarted /> : null}
      <footer className="footer footer--scene">
        <div className="footer__scene" aria-hidden="true">
          <img
            className="footer__scene-img"
            src={HOME_SCENE.footer}
            alt=""
            width={1920}
            height={900}
            loading="lazy"
            decoding="async"
          />
          <div className="footer__scene-overlay" />
          <p className="footer__watermark" aria-hidden="true">
            {FOOTER_WATERMARK}
          </p>
        </div>

        <div className="footer__content">
          <div className="container footer__nav-grid">
            {FOOTER_COLUMNS.map((col) => (
              <nav key={col.heading} className="footer__col" aria-label={col.heading}>
                <h2 className="footer__col-heading">{col.heading}</h2>
                <ul className="footer__col-list">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink to={link.to}>{link.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="container footer__bottom">
            <div className="footer__bottom-start">
              <p className="footer__copy">
                © {new Date().getFullYear()} {FOOTER_LEGAL.companyName}
              </p>
              <div className="footer__legal">
                {FOOTER_LEGAL.links.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
                <a href={FOOTER_LEGAL.sitemapTo}>{FOOTER_LEGAL.sitemapLabel}</a>
              </div>
            </div>
            <div className="footer__bottom-end">
              <a className="footer__email" href={FOOTER_SUPPORT.mailto}>
                {FOOTER_SUPPORT.email}
              </a>
              <GetAiSummaryLinks compact />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
