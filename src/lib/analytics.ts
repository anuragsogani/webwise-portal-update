/**
 * GA4 when `VITE_GA_MEASUREMENT_ID` is set; otherwise no-ops.
 * All trackEvent calls also fire first-party analytics to /api/events.
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let booted = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ensure GA4 is ready (index.html loads gtag; this is a no-op fallback for dev). */
export function initGa(): void {
  if (!GA_ID || typeof window === "undefined" || booted) return;
  booted = true;

  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
}

export function trackPageView(pathWithSearch: string): void {
  if (!GA_ID || !window.gtag) return;
  const path = pathWithSearch.startsWith("/") ? pathWithSearch : `/${pathWithSearch}`;
  const page_location = `${window.location.origin}${path}`;
  // GA4 recommended SPA pattern: update config on route change (sends page_view).
  window.gtag("config", GA_ID, {
    page_path: path,
    page_location,
    page_title: document.title,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  // GA4
  if (GA_ID && window.gtag) {
    const cleaned = params
      ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
      : undefined;
    window.gtag("event", name, cleaned);
  }
  // First-party
  import("./firstPartyAnalytics").then(({ trackFpEvent }) => {
    const meta = params
      ? (Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) as Record<string, unknown>)
      : undefined;
    trackFpEvent(name, meta);
  }).catch(() => {});
}
