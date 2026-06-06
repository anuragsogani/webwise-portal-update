import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { submitLeadEmail } from "../api/leads";
import {
  CTA_EYEBROW,
  CTA_FORM_BUTTON,
  CTA_FORM_NOTE,
  CTA_FORM_SUCCESS,
  CTA_PRIMARY_LABEL,
  CTA_SUB,
  CTA_TITLE_BEFORE,
} from "../content/homePageCopy";
import { trackEvent } from "../lib/analytics";

type Props = {
  className?: string;
  title?: string;
  sub?: string;
  ctaLabel?: string;
};

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function CtaGetStarted({
  className = "",
  title = CTA_TITLE_BEFORE,
  sub = CTA_SUB,
  ctaLabel = CTA_FORM_BUTTON,
}: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your work email.");
      return;
    }
    if (!validateEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await submitLeadEmail(trimmed);
      trackEvent("lead_capture", { source: "cta-get-started", transport: "api" });
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`cta-get-started ${className}`.trim()} aria-labelledby="cta-get-started-title">
      <div className="container cta-get-started__inner">
        <p className="eyebrow">{CTA_EYEBROW}</p>
        <h2 id="cta-get-started-title" className="cta-get-started__title">
          {title}
        </h2>
        <p className="cta-get-started__sub">{sub}</p>
        {submitted ? (
          <p className="cta-get-started__success" role="status">
            {CTA_FORM_SUCCESS}
          </p>
        ) : (
          <form className="cta-get-started__form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="cta-email" className="sr-only">
              Work email
            </label>
            <input
              id="cta-email"
              type="email"
              name="email"
              className="cta-get-started__input text-input"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
              autoComplete="email"
            />
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? "Sending…" : ctaLabel}
            </button>
            {error ? (
              <p className="cta-get-started__error" role="alert">
                {error}
              </p>
            ) : null}
          </form>
        )}
        <p className="cta-get-started__note">{CTA_FORM_NOTE}</p>
        <Link to="/services" className="text-link">
          {CTA_PRIMARY_LABEL} →
        </Link>
      </div>
    </section>
  );
}
