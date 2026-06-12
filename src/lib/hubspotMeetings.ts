import { getApiBaseUrl } from "./apiBaseUrl";

const HUBSPOT_MEETING_URL =
  (import.meta.env.VITE_HUBSPOT_MEETING_URL as string | undefined) ||
  "https://meetings-na2.hubspot.com/anurag-sogani";

const HUBSPOT_TRACKING_ENABLED =
  (import.meta.env.VITE_HUBSPOT_TRACKING_ENABLED as string | undefined) === "true";

let trackingLoaded = false;

function loadHubSpotTracking(): void {
  if (!HUBSPOT_TRACKING_ENABLED || trackingLoaded || typeof window === "undefined") return;
  trackingLoaded = true;
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.id = "hs-script-loader";
  s.async = true;
  s.defer = true;
  s.src = "//js.hs-scripts.com/246323509.js";
  document.head.appendChild(s);
}

/** Fire-and-forget server-side lead record so we capture meeting intent without a form fill. */
function _recordMeetingIntent(intent: string | undefined, source: string | undefined): void {
  const page_url = typeof window !== "undefined" ? window.location.href : "";
  const resolvedSource = source ?? "hubspot-booking";
  fetch(`${getApiBaseUrl()}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Meeting intent",
      email: "booking@airat.in",
      message: `Book-a-call intent from ${resolvedSource}${intent ? ` (${intent})` : ""}`,
      source: resolvedSource,
      intent: intent ?? "",
      page_url,
    }),
  }).catch(() => {
    // Best-effort - don't surface errors to the user
  });
}

export function openHubSpotMeeting(intent?: string, source?: string): void {
  loadHubSpotTracking();
  _recordMeetingIntent(intent, source);
  const url = new URL(HUBSPOT_MEETING_URL);
  if (intent) url.searchParams.set("utm_campaign", intent);
  if (source) url.searchParams.set("utm_source", source || "airat-website");
  url.searchParams.set("utm_medium", "website");
  window.open(url.toString(), "_blank", "noopener,noreferrer");
}

export function getMeetingUrl(intent?: string, source?: string): string {
  const url = new URL(HUBSPOT_MEETING_URL);
  if (intent) url.searchParams.set("utm_campaign", intent);
  url.searchParams.set("utm_source", source || "airat-website");
  url.searchParams.set("utm_medium", "website");
  return url.toString();
}
