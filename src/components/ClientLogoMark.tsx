import { useMemo, useState } from "react";
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
  const [localFailed, setLocalFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const domain = item.domain;
  const label = item.initials ?? autoInitials(item.name);
  const logoSrc = item.logoSrc;

  const faviconSz = size === "lg" ? 128 : 64;

  const urls = useMemo(() => {
    if (!domain) return [];
    return [
      `https://logo.clearbit.com/${domain}`,
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${faviconSz}`,
    ] as const;
  }, [domain, faviconSz]);

  const wrapClass = size === "lg" ? "client-logo-mark client-logo-mark--lg" : "client-logo-mark";
  const imgPx = size === "lg" ? 48 : 40;

  if (logoSrc && !localFailed) {
    return (
      <img
        className={`${wrapClass} client-logo-mark--img`}
        src={logoSrc}
        alt=""
        width={imgPx}
        height={imgPx}
        loading="lazy"
        decoding="async"
        onError={() => setLocalFailed(true)}
      />
    );
  }

  if (!domain || attempt >= urls.length) {
    return (
      <span className={`${wrapClass} client-logo-mark--fallback`} aria-hidden="true">
        {label}
      </span>
    );
  }

  return (
    <img
      key={attempt}
      className={`${wrapClass} client-logo-mark--img`}
      src={urls[attempt]!}
      alt=""
      width={imgPx}
      height={imgPx}
      loading="lazy"
      decoding="async"
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}
