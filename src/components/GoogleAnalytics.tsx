import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGa, trackPageView } from "../lib/analytics";
import { trackFpPageView } from "../lib/firstPartyAnalytics";

/** Route-aware GA4 + first-party page views on every route change. */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initGa();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
    trackFpPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
