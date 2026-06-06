import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CTA_PRIMARY_LABEL,
  CTA_SUB,
  CTA_TITLE_BEFORE,
} from "../content/homePageCopy";

type Props = {
  className?: string;
  title?: string;
  sub?: string;
  ctaLabel?: string;
};

export default function CtaGetStarted({
  className = "",
  title = CTA_TITLE_BEFORE,
  sub = CTA_SUB,
  ctaLabel = "Book a strategy call",
}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    navigate(`/contact${q}`);
  }

  return (
    <section className={`cta-get-started ${className}`.trim()} aria-labelledby="cta-get-started-title">
      <div className="container cta-get-started__inner">
        <p className="eyebrow">Get started</p>
        <h2 id="cta-get-started-title" className="cta-get-started__title">
          {title}
        </h2>
        <p className="cta-get-started__sub">{sub}</p>
        <form className="cta-get-started__form" onSubmit={handleSubmit}>
          <label htmlFor="cta-email" className="sr-only">
            Business email
          </label>
          <input
            id="cta-email"
            type="email"
            name="email"
            className="cta-get-started__input text-input"
            placeholder="Business email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <button type="submit" className="btn btn--primary">
            {ctaLabel}
          </button>
        </form>
        <Link to="/services" className="text-link">
          {CTA_PRIMARY_LABEL} →
        </Link>
      </div>
    </section>
  );
}
