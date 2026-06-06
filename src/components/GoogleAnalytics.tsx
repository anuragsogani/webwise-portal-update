import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGa, trackPageView } from "../lib/analytics";

/** Route-aware GA4 page views when `VITE_GA_MEASUREMENT_ID` is configured. */
export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initGa();
  }, []);

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
}
