/** GA4 when `VITE_GA_MEASUREMENT_ID` is set; otherwise no-ops. */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let booted = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Define `gtag` and load gtag.js once (SPA-friendly: page views sent separately). */
export function initGa(): void {
  if (!GA_ID || typeof window === "undefined" || booted) return;
  booted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

export function trackPageView(pathWithSearch: string): void {
  if (!GA_ID || !window.gtag) return;
  const path = pathWithSearch.startsWith("/") ? pathWithSearch : `/${pathWithSearch}`;
  const page_location = `${window.location.origin}${path}`;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location,
    page_title: document.title,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!GA_ID || !window.gtag) return;
  const cleaned = params
    ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
    : undefined;
  window.gtag("event", name, cleaned);
}
