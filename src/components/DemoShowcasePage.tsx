import { Link } from "react-router-dom";
import AiratShell from "./AiratShell";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/demo-page.css";

type DemoShowcasePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
};

export default function DemoShowcasePage({ eyebrow, title, description, highlights }: DemoShowcasePageProps) {
  return (
    <AiratShell>
      <SiteHeader />
      <main className="sp-main dp-main" id="main-content">
        <section className="sp-hero dp-hero">
          <span className="sp-eyebrow">{eyebrow}</span>
          <h1 className="sp-hero__h1">{title}</h1>
          <p className="sp-hero__body">{description}</p>
          <div className="sp-hero__actions">
            <Link to="/contact" className="dp-btn dp-btn--primary">Book guided demo</Link>
            <Link to="/demo" className="dp-btn dp-btn--ghost">Back to all demos</Link>
          </div>
        </section>
        <hr className="sp-rule" />
        <section className="sp-section" aria-label="Demo highlights">
          <div className="sp-section__label">
            <p className="sp-label">Highlights</p>
          </div>
          <div className="sp-section__body">
            <div className="sp-faq">
              {highlights.map((item) => (
                <article className="sp-faq__item" key={item}>
                  <p className="sp-faq__a">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AiratShell>
  );
}
