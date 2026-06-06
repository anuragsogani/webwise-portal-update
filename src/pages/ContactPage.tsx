import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  CONTACT_OUTCOME_CHIPS,
  CONTACT_SEO,
  CONTACT_STORY_BRIDGE,
  CONTACT_TRUST_SIGNAL,
} from "../content/contactPageCopy";
import { faqsToSchemaPairs } from "../content/faqTypes";
import { breadcrumbSchema, faqPageSchema, injectJsonLdScript } from "../lib/jsonLd";
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

const COMPANY_TYPE_OPTIONS = [
  { value: "", label: "Company type (optional)" },
  { value: "mssp", label: "MSSP / Managed Security" },
  { value: "mdr", label: "MDR Provider" },
  { value: "enterprise-soc", label: "Enterprise SOC" },
  { value: "fintech", label: "FinTech / Bank" },
  { value: "cybersecurity-consultancy", label: "Cybersecurity Consultancy" },
  { value: "other", label: "Other" },
];

const COUNTRY_OPTIONS = [
  { value: "", label: "Country (optional)" },
  { value: "sg", label: "Singapore" },
  { value: "id", label: "Indonesia" },
  { value: "my", label: "Malaysia" },
  { value: "vn", label: "Vietnam" },
  { value: "in", label: "India" },
  { value: "ae", label: "UAE" },
  { value: "au", label: "Australia" },
  { value: "gb", label: "UK / Europe" },
  { value: "us", label: "US" },
  { value: "other", label: "Other" },
];

const SIEM_OPTIONS = [
  { value: "", label: "SIEM / XDR tool (optional)" },
  { value: "splunk", label: "Splunk" },
  { value: "sentinel", label: "Microsoft Sentinel" },
  { value: "elastic", label: "Elastic SIEM" },
  { value: "wazuh", label: "Wazuh" },
  { value: "qradar", label: "IBM QRadar" },
  { value: "crowdstrike", label: "CrowdStrike" },
  { value: "custom", label: "Custom / In-house" },
  { value: "none", label: "Not using one yet" },
];

const PRIMARY_PAIN_OPTIONS = [
  { value: "", label: "Primary pain point (optional)" },
  { value: "alert-fatigue", label: "Alert fatigue / too much noise" },
  { value: "evidence-scattered", label: "Evidence scattered across tools" },
  { value: "compliance-evidence", label: "Compliance evidence / audit readiness" },
  { value: "ai-pilot-stalled", label: "AI pilot stalled in production" },
  { value: "rag-llm", label: "RAG / LLM system needed" },
  { value: "search-latency", label: "Search / data latency" },
  { value: "soc-automation", label: "SOC automation generally" },
  { value: "other", label: "Other" },
];

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function getContactFormEndpoint(): string | undefined {
  const explicit = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim();
  if (explicit) return explicit;
  const base = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");
  if (base) return `${base}/contact`;
  return undefined;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [country, setCountry] = useState("");
  const [siemTool, setSiemTool] = useState("");
  const [primaryPain, setPrimaryPain] = useState("");
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

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, company, urgency, message, companyType, country, siemTool, primaryPain }),
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
          transport: "api",
          company_type: companyType,
          country,
          siem_tool: siemTool,
          intent: primaryPain,
        });
        setStatus("success");
        setName("");
        setEmail("");
        setCompany("");
        setUrgency("");
        setMessage("");
        setCompanyType("");
        setCountry("");
        setSiemTool("");
        setPrimaryPain("");
        setTouched({});
        setFieldErrors({});
      } catch {
        setStatus("error");
        setGlobalError(ERR.sendFailed);
      }
      return;
    }

    await new Promise((r) => setTimeout(r, 900));
    trackEvent("contact_form_submit", {
      transport: "demo",
      company_type: companyType,
      country,
      siem_tool: siemTool,
      intent: primaryPain,
    });
    setStatus("success");
    setName("");
    setEmail("");
    setCompany("");
    setUrgency("");
    setMessage("");
    setCompanyType("");
    setCountry("");
    setSiemTool("");
    setPrimaryPain("");
    setTouched({});
    setFieldErrors({});
  }

  return (
    <AiratShell>
      <SEO title={CONTACT_SEO.title} description={CONTACT_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{CONTACT_HERO.badge}</p>
            <h1 className="display-2xl hero-band__title">{CONTACT_HERO.title}</h1>
            <p className="body-lg hero-band__lead">{CONTACT_HERO.body}</p>
            <div className="chip-list">
              {CONTACT_OUTCOME_CHIPS.map((chip) => (
                <span key={chip} className="chip chip--lime">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--warm">
          <div className="container form-split">
            <aside className="form-split__visual">
              <blockquote className="contact-aside__quote">
                “{CONTACT_TRUST_SIGNAL.quote}”
              </blockquote>
              <cite className="contact-aside__cite">
                — {CONTACT_TRUST_SIGNAL.attrib}, {CONTACT_TRUST_SIGNAL.org}
              </cite>
              <p className="contact-aside__metric">{CONTACT_TRUST_SIGNAL.metric}</p>
              <p className="contact-aside__bridge">{CONTACT_STORY_BRIDGE}</p>
              <nav className="contact-aside__links" aria-label="Related pages">
                <Link to="/portfolio" className="text-link">
                  Case studies →
                </Link>
                <Link to="/services" className="text-link">
                  Services →
                </Link>
              </nav>
            </aside>

            <div className="form-split__form-wrap">
              <header>
                <h2 className="contact-form-panel__title">{CONTACT_FORM.title}</h2>
                <p className="contact-form-panel__lead">{CONTACT_FORM.lead}</p>
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

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-field">
                    <label htmlFor="ct-name" className="contact-field__label">
                      Name
                    </label>
                    <input
                      id="ct-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      aria-invalid={touched.name && !!fieldErrors.name}
                      className="text-input"
                    />
                    {touched.name && fieldErrors.name && (
                      <span className="contact-field__error">{fieldErrors.name}</span>
                    )}
                  </div>

                  <div className="contact-field">
                    <label htmlFor="ct-company" className="contact-field__label">
                      Company
                    </label>
                    <input
                      id="ct-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="text-input"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-email" className="contact-field__label">
                    Email
                  </label>
                  <input
                    id="ct-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    aria-invalid={touched.email && !!fieldErrors.email}
                    className="text-input"
                  />
                  {touched.email && fieldErrors.email && (
                    <span className="contact-field__error">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="contact-field">
                  <label htmlFor="ct-msg" className="contact-field__label">
                    What&apos;s breaking?
                  </label>
                  <textarea
                    id="ct-msg"
                    name="message"
                    rows={5}
                    placeholder="Describe the problem: SOC alert overload, LLM hallucinations, search latency, or audit gap. What does success look like in 90 days?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    aria-invalid={touched.message && !!fieldErrors.message}
                    className="text-input"
                  />
                  {touched.message && fieldErrors.message && (
                    <span className="contact-field__error">{fieldErrors.message}</span>
                  )}
                </div>

                <details className="contact-form__optional">
                  <summary>{CONTACT_FORM.optionalTitle}</summary>
                  <div className="contact-form__optional-body">
                    <div className="contact-form__row">
                      <div className="contact-field">
                        <label htmlFor="ct-company-type" className="contact-field__label">
                          Organisation type
                        </label>
                        <select
                          id="ct-company-type"
                          name="companyType"
                          value={companyType}
                          onChange={(e) => setCompanyType(e.target.value)}
                          className="text-input"
                        >
                          {COMPANY_TYPE_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="ct-country" className="contact-field__label">
                          Country
                        </label>
                        <select
                          id="ct-country"
                          name="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="text-input"
                        >
                          {COUNTRY_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="contact-form__row">
                      <div className="contact-field">
                        <label htmlFor="ct-siem" className="contact-field__label">
                          Current SIEM / XDR
                        </label>
                        <select
                          id="ct-siem"
                          name="siemTool"
                          value={siemTool}
                          onChange={(e) => setSiemTool(e.target.value)}
                          className="text-input"
                        >
                          {SIEM_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="ct-pain" className="contact-field__label">
                          Primary challenge
                        </label>
                        <select
                          id="ct-pain"
                          name="primaryPain"
                          value={primaryPain}
                          onChange={(e) => setPrimaryPain(e.target.value)}
                          className="text-input"
                        >
                          {PRIMARY_PAIN_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="ct-urgency" className="contact-field__label">
                        Timeline
                      </label>
                      <select
                        id="ct-urgency"
                        name="urgency"
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="text-input"
                      >
                        <option value="">Select timeline (optional)</option>
                        <option value="immediate">Now — production issue or active rollout</option>
                        <option value="weeks">Within weeks — planning phase</option>
                        <option value="quarter">This quarter</option>
                        <option value="exploring">Exploring, no fixed date</option>
                      </select>
                    </div>
                  </div>
                </details>

                <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? CONTACT_FORM.submitSending : CONTACT_FORM.submitLabel}
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
