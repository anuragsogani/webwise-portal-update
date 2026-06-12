import { useEffect, useState } from "react";
import AiratShell from "../components/AiratShell";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import {
  CONTACT_ASIDE,
  CONTACT_FAQ,
  CONTACT_FAQ_SECTION,
  CONTACT_FORM,
  CONTACT_HERO,
  CONTACT_SEO,
} from "../content/contactPageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getApiBaseUrl } from "../lib/apiBaseUrl";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import { trackEvent } from "../lib/analytics";
import "../styles/homepage.css";
import "../styles/contact-page.css";

const ERR = {
  nameRequired: "Name is required",
  emailRequired: "Email is required",
  emailInvalid: "Invalid email address",
  messageRequired: "Please describe what's breaking",
  tooMany: "Too many submissions. Please try again later.",
  unavailable: "Contact is temporarily unavailable. Please try again later.",
  sendFailed: "Failed to send message. Please try again.",
} as const;

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function getContactFormEndpoint(): string {
  const explicit = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim();
  if (explicit) return explicit;
  return `${getApiBaseUrl()}/contact`;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FieldErrors, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rmBc = injectJsonLdScript(
      "airat-ld-breadcrumb-contact",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    );
    const rmFaq = injectJsonLdScript("airat-ld-faq-contact", faqPageSchema(faqsToSchemaPairs(CONTACT_FAQ)));
    return () => {
      rmBc();
      rmFaq();
    };
  }, []);

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = ERR.nameRequired;
    if (!email.trim()) e.email = ERR.emailRequired;
    else if (!validateEmail(email)) e.email = ERR.emailInvalid;
    if (!message.trim()) e.message = ERR.messageRequired;
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const e = validate();
    setFieldErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    setGlobalError("");

    const endpoint = getContactFormEndpoint();
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source") ?? "contact-page";
    const intent = urlParams.get("intent") ?? "contact";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          source,
          intent,
          page_url: window.location.href,
        }),
      });
      if (res.status === 429) {
        setStatus("error");
        setGlobalError(ERR.tooMany);
        return;
      }
      if (res.status === 503) {
        setStatus("error");
        setGlobalError(ERR.unavailable);
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setGlobalError(ERR.sendFailed);
        return;
      }
      trackEvent("contact_form_submit", {
        source,
        intent,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setTouched({});
      setFieldErrors({});
    } catch {
      setStatus("error");
      setGlobalError(ERR.sendFailed);
    }
  }

  return (
    <AiratShell>
      <SEO title={CONTACT_SEO.title} description={CONTACT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="contact-simple">
          <div className="container contact-simple__inner">
            <header className="contact-simple__head">
              <p className="eyebrow contact-simple__eyebrow">{CONTACT_HERO.badge}</p>
              <h1 className="display-2xl contact-simple__title">{CONTACT_HERO.title}</h1>
              <p className="body-lg contact-simple__lead">{CONTACT_HERO.body}</p>
            </header>

            <div className="contact-simple__form-shell">
              <header className="contact-simple__form-head">
                <h2 className="contact-simple__form-title">{CONTACT_FORM.title}</h2>
                <p className="contact-simple__form-lead">{CONTACT_FORM.lead}</p>
              </header>

              {status === "success" && (
                <div className="contact-banner contact-banner--success" role="status">
                  {CONTACT_FORM.success}
                </div>
              )}

              {status === "error" && globalError && (
                <div className="contact-banner contact-banner--error" role="alert">
                  {globalError}
                </div>
              )}

              <form className="contact-simple__form" onSubmit={handleSubmit} noValidate data-form-name="contact-form">
                <div className="contact-simple__row">
                  <div className="contact-simple__field">
                    <label htmlFor="ct-name" className="contact-simple__label">Name</label>
                    <input
                      id="ct-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      aria-invalid={touched.name && !!fieldErrors.name}
                      className="contact-simple__input"
                    />
                    {touched.name && fieldErrors.name && (
                      <span className="contact-field__error">{fieldErrors.name}</span>
                    )}
                  </div>

                  <div className="contact-simple__field">
                    <label htmlFor="ct-company" className="contact-simple__label">Company</label>
                    <input
                      id="ct-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company (optional)"
                      value={company}
                      onChange={(ev) => setCompany(ev.target.value)}
                      className="contact-simple__input"
                    />
                  </div>
                </div>

                <div className="contact-simple__field">
                  <label htmlFor="ct-email" className="contact-simple__label">Email</label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    aria-invalid={touched.email && !!fieldErrors.email}
                    className="contact-simple__input"
                  />
                  {touched.email && fieldErrors.email && (
                    <span className="contact-field__error">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="contact-simple__field">
                  <label htmlFor="ct-msg" className="contact-simple__label">What&apos;s breaking?</label>
                  <textarea
                    id="ct-msg"
                    name="message"
                    rows={5}
                    placeholder="Describe the problem: SOC alert overload, LLM hallucinations, search latency, or audit gap. What does success look like in 90 days?"
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    aria-invalid={touched.message && !!fieldErrors.message}
                    className="contact-simple__input contact-simple__textarea"
                  />
                  {touched.message && fieldErrors.message && (
                    <span className="contact-field__error">{fieldErrors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn--primary contact-simple__submit" disabled={status === "sending"}>
                  {status === "sending" ? CONTACT_FORM.submitSending : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container section-head">
            <p className="eyebrow">{CONTACT_ASIDE.title}</p>
            <h2 className="display-lg">Direct lines</h2>
          </div>
          <div className="container contact-direct-grid">
            <div className="contact-direct-item">
              <span className="contact-direct-item__label">{CONTACT_ASIDE.emailTitle}</span>
              <a href="mailto:shared@airat.in" className="body-md">
                shared@airat.in
              </a>
            </div>
            <div className="contact-direct-item">
              <span className="contact-direct-item__label">{CONTACT_ASIDE.locationTitle}</span>
              <span className="body-md">Jaipur, Rajasthan, India</span>
            </div>
            <div className="contact-direct-item">
              <span className="contact-direct-item__label">{CONTACT_ASIDE.hoursTitle}</span>
              <span className="body-md contact-direct-item__hours">{CONTACT_ASIDE.hoursBody}</span>
            </div>
            <div className="contact-direct-item">
              <span className="contact-direct-item__label">Timezones</span>
              <span className="body-md">UAE · India · Singapore · Indonesia · EU · AUS · US</span>
            </div>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container section-head">
            <p className="eyebrow">{CONTACT_FAQ_SECTION.title}</p>
            <h2 className="display-lg">Before you write</h2>
            <p className="body-md">{CONTACT_FAQ_SECTION.intro}</p>
          </div>
          <div className="container faq-accordion" role="list">
            {CONTACT_FAQ.map((item) => (
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
          title="Not ready to reach out yet?"
          body="Read case studies to compare your situation, or explore services to understand how we deliver."
          primary={{ label: "Read case studies", to: "/portfolio" }}
          secondary={{ label: "Explore services →", to: "/services" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
