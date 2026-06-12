import { getApiBaseUrl } from "../lib/apiBaseUrl";
import { subscribeToInsights } from "./blog";

function getContactFormEndpoint(): string {
  const explicit = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim();
  if (explicit) return explicit;
  const fromEnv = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");
  if (fromEnv) return `${fromEnv}/contact`;
  return `${getApiBaseUrl()}/contact`;
}

/** Capture a work email from the pre-footer Get started form. */
export async function submitLeadEmail(email: string, source?: string): Promise<void> {
  const trimmed = email.trim();
  const endpoint = getContactFormEndpoint();
  const page_url = typeof window !== "undefined" ? window.location.href : "";
  const resolvedSource = source ?? "cta-get-started";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Website lead",
      email: trimmed,
      message: "Follow-up requested via Get started form (pre-footer).",
      source: resolvedSource,
      page_url,
    }),
  });

  if (response.status === 429) {
    throw new Error("Too many requests. Please try again later.");
  }

  if (response.ok) return;

  // Fallback when contact endpoint is unavailable - still store the email.
  if (response.status === 404 || response.status === 503) {
    await subscribeToInsights(trimmed);
    return;
  }

  let detail = "Something went wrong. Please try again.";
  try {
    const payload = await response.json();
    detail = payload?.detail || detail;
  } catch {
    // Ignore parse errors.
  }
  throw new Error(detail);
}
