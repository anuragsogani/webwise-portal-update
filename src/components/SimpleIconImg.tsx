import { useMemo, useState } from "react";
import { SIMPLE_ICON_BRAND_HEX } from "../lib/simpleIconBrandHex";

type Props = {
  slug: string;
  size?: number;
  className?: string;
  monochrome?: boolean;
  colorHex?: string;
};

function iconifySrc(slug: string, size: number, color?: string) {
  const q = new URLSearchParams({ width: String(size), height: String(size) });
  if (color) q.set("color", color);
  return `https://api.iconify.design/simple-icons:${encodeURIComponent(slug)}.svg?${q}`;
}

function sourceChain(slug: string, size: number): string[] {
  const hex = SIMPLE_ICON_BRAND_HEX[slug];
  const chain: string[] = [];
  if (hex) chain.push(iconifySrc(slug, size, hex));
  chain.push(`https://cdn.simpleicons.org/${encodeURIComponent(slug)}`);
  chain.push(iconifySrc(slug, size));
  return [...new Set(chain)];
}

function monoSourceChain(slug: string, size: number, colorHex: string): string[] {
  return [
    iconifySrc(slug, size, colorHex),
    iconifySrc(slug, size),
    `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`,
  ];
}

/**
 * Simple Icons with official brand hex (Iconify `color` replaces `currentColor`).
 * Falls back to simpleicons CDN, then monochrome Iconify, before hiding.
 */
export default function SimpleIconImg({
  slug,
  size = 20,
  className,
  monochrome = false,
  colorHex = "1a1a18",
}: Props) {
  const sources = useMemo(
    () => (monochrome ? monoSourceChain(slug, size, colorHex) : sourceChain(slug, size)),
    [slug, size, monochrome, colorHex],
  );
  const [i, setI] = useState(0);
  if (i >= sources.length) return null;

  return (
    <img
      key={i}
      src={sources[i]}
      alt=""
      width={size}
      height={size}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setI((x) => x + 1)}
    />
  );
}
