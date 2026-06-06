import type { ClientMarqueeItem } from "../content/aboutPageCopy";

export function autoInitials(name: string): string {
  const stripped = name.replace(/\([^)]*\)/g, "").trim();
  const words = stripped.split(/[\s&/]+/).filter((w) => w.length > 0 && !/^\d+$/.test(w));
  if (words.length >= 2) return (words[0]![0]! + words[1]![0]!).toUpperCase();
  return stripped.slice(0, 2).toUpperCase();
}

type Props = {
  item: ClientMarqueeItem;
  /** Slightly larger marks in the static grid */
  size?: "md" | "lg";
};

export default function ClientLogoMark({ item, size = "md" }: Props) {
  const label = item.initials ?? autoInitials(item.name);
  const wrapClass = size === "lg" ? "client-logo-mark client-logo-mark--lg" : "client-logo-mark";

  return (
    <span className={`${wrapClass} client-logo-mark--fallback`} aria-hidden="true">
      {label}
    </span>
  );
}
