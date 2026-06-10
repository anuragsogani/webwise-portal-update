import { useState } from "react";
import { trackEvent } from "../lib/analytics";
import { subscribeToInsights } from "../api/blog";
import "../styles/newsletter-signup.css";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);

    try {
      await subscribeToInsights(email.trim());
      trackEvent("newsletter_signup", { transport: "api" });
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      if (err?.message?.includes("Too many")) {
        setError("Too many requests. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ns-wrap" aria-label="Newsletter signup">
      <p className="ns-label">Stay current</p>
      <h2 className="ns-headline">Engineering insights, when we publish them.</h2>
      <p className="ns-sub">
        Production notes on AI, security, and data infrastructure. No marketing  -  only the pieces worth reading.
      </p>
      {submitted ? (
        <p className="ns-success" role="status">You're on the list. We'll be in touch when we publish.</p>
      ) : (
        <form className="ns-form" onSubmit={handleSubmit} noValidate data-form-name="newsletter-signup">
          <label htmlFor="ns-email" className="sr-only">Email address</label>
          <input
            id="ns-email"
            type="email"
            className="ns-input"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            autoComplete="email"
          />
          <button type="submit" className="ns-btn" disabled={loading} data-track="newsletter-subscribe" data-track-category="form-cta">
            {loading ? "Subscribing…" : "Get notified"}
          </button>
          {error && <p className="ns-error" role="alert">{error}</p>}
        </form>
      )}
      <p className="ns-note">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
