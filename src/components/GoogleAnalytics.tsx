import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGa, trackPageView } from "../lib/analytics";
import { trackFpPageView, initAutoTracking } from "../lib/firstPartyAnalytics";

/** Route-aware GA4 + first-party analytics on every route change. Auto-tracking initialised once. */
export default function GoogleAnalytics() {
  const location = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    initGa();
    initAutoTracking(); // sets up click, scroll, time-on-page, form, outbound listeners
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    // index.html gtag config already sends the initial page_view.
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
    } else {
      trackPageView(path);
    }
    trackFpPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
