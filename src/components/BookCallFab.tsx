import { useLocation } from "react-router-dom";
import { openHubSpotMeeting } from "../lib/hubspotMeetings";
import { trackEvent } from "../lib/analytics";
import "../styles/book-call-fab.css";

const HIDDEN_ROUTES = ["/admin", "/login", "/demo"];

export default function BookCallFab() {
  const { pathname } = useLocation();

  const isHidden = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));
  if (isHidden) return null;

  function handleClick() {
    trackEvent("hubspot_meeting_open", { source: "global_fab", page_path: pathname });
    openHubSpotMeeting("strategy-call", "global-fab");
  }

  return (
    <button type="button" className="bc-fab" onClick={handleClick} aria-label="Book a 30-minute strategy call" data-track="fab-book-a-call" data-track-category="fab-cta">
      <span className="bc-fab__text">
        <span className="bc-fab__primary">Book a call</span>
        <span className="bc-fab__secondary">30 min · No obligation</span>
      </span>
      <span className="bc-fab__arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}
