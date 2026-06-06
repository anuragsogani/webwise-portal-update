import { ABOUT_CLIENT_MARQUEE_ITEMS } from "../content/aboutPageCopy";

function autoInitials(name: string): string {
  const stripped = name.replace(/\([^)]*\)/g, "").trim();
  const words = stripped.split(/[\s&/]+/).filter((w) => w.length > 0 && !/^\d+$/.test(w));
  if (words.length >= 2) return (words[0]![0]! + words[1]![0]!).toUpperCase();
  return stripped.slice(0, 2).toUpperCase();
}

export default function ClientLogoGrid() {
  return (
    <div className="logo-row" aria-label="Customer and partner organisations">
      <ul className="logo-row__list">
        {ABOUT_CLIENT_MARQUEE_ITEMS.map((item) => {
          const initials = "initials" in item ? item.initials : autoInitials(item.name);
          return (
            <li key={item.name} className="logo-row__item">
              <span className="logo-row__fallback">{initials}</span>
              <span className="logo-row__name">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
