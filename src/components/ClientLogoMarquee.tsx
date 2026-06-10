import { ABOUT_CLIENT_MARQUEE_ITEMS } from "../content/aboutPageCopy";
import ClientLogoMark from "./ClientLogoMark";

export default function ClientLogoMarquee() {
  const items = [...ABOUT_CLIENT_MARQUEE_ITEMS, ...ABOUT_CLIENT_MARQUEE_ITEMS];

  return (
    <div className="client-marquee" aria-label="Customer and partner organisations">
      <div className="client-marquee__viewport">
        <div className="client-marquee__track">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={`client-marquee__item${"logoWide" in item && item.logoWide ? " client-marquee__item--wide" : ""}`}
            >
              <ClientLogoMark item={item} size="lg" />
              <span className="sr-only">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
