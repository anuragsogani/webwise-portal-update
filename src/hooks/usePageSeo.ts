import { useEffect } from "react";
import { absoluteUrl, getSiteBaseUrl } from "../lib/siteBaseUrl";

const MANAGED = "data-airat-seo";

function findMeta(attr: "name" | "property", key: string): HTMLMetaElement | null {
  const attrSel = attr === "property" ? "property" : "name";
  const nodes = document.querySelectorAll(`meta[${attrSel}]`);
  for (let i = 0; i < nodes.length; i++) {
    const m = nodes[i] as HTMLMetaElement;
    if (m.getAttribute(attrSel) === key) return m;
  }
  return null;
}

function ensureMeta(attr: "name" | "property", key: string): HTMLMetaElement {
  let el = findMeta(attr, key);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute(MANAGED, "true");
    document.head.appendChild(el);
  } else if (!el.hasAttribute(MANAGED)) {
    el.setAttribute(MANAGED, "true");
  }
  return el;
}

export type PageSeoExtras = {
  ogTitle?: string;
  ogDescription?: string;
  /** Defaults to `website`; use `article` for blog posts */
  ogType?: string;
  /** Per-page OG image path (relative to public root)  -  overrides global /og-image.png */
  ogImage?: string;
  /** When set (e.g. `noindex, nofollow` for soft 404), manages `meta[name="robots"]`. */
  robots?: string;
};

/**
 * Sets document title, meta description, Open Graph, Twitter cards, and canonical.
 * Restores previous values on unmount.
 */
export function usePageSeo(title: string, description: string, path: string, extras?: PageSeoExtras) {
  useEffect(() => {
    const ogTitle = extras?.ogTitle ?? title;
    const ogDescription = extras?.ogDescription ?? description;
    const canonicalHref = absoluteUrl(path);
    const base = getSiteBaseUrl();
    const ogImageAbs = extras?.ogImage ? `${base}${extras.ogImage}` : `${base}/og-image.png`;

    const prevTitle = document.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";

    const ogTitleEl = ensureMeta("property", "og:title");
    const prevOgTitle = ogTitleEl.getAttribute("content") ?? "";
    const ogDescEl = ensureMeta("property", "og:description");
    const prevOgDesc = ogDescEl.getAttribute("content") ?? "";
    const ogUrlEl = ensureMeta("property", "og:url");
    const prevOgUrl = ogUrlEl.getAttribute("content") ?? "";
    const ogTypeEl = ensureMeta("property", "og:type");
    const prevOgType = ogTypeEl.getAttribute("content") ?? "";
    const ogImageEl = ensureMeta("property", "og:image");
    const prevOgImage = ogImageEl.getAttribute("content") ?? "";

    const twCardEl = ensureMeta("name", "twitter:card");
    const prevTwCard = twCardEl.getAttribute("content") ?? "";
    const twTitleEl = ensureMeta("name", "twitter:title");
    const prevTwTitle = twTitleEl.getAttribute("content") ?? "";
    const twDescEl = ensureMeta("name", "twitter:description");
    const prevTwDesc = twDescEl.getAttribute("content") ?? "";
    const twImageEl = ensureMeta("name", "twitter:image");
    const prevTwImage = twImageEl.getAttribute("content") ?? "";

    let canonical = document.querySelector(`link[rel="canonical"]`) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.setAttribute(MANAGED, "true");
      document.head.appendChild(canonical);
    } else if (!canonical.hasAttribute(MANAGED)) {
      canonical.setAttribute(MANAGED, "true");
    }
    const prevCanonical = canonical.getAttribute("href") ?? "";

    document.title = title;
    metaDesc?.setAttribute("content", description);

    ogTitleEl.setAttribute("content", ogTitle);
    ogDescEl.setAttribute("content", ogDescription);
    ogUrlEl.setAttribute("content", canonicalHref);
    ogTypeEl.setAttribute("content", extras?.ogType ?? "website");
    ogImageEl.setAttribute("content", ogImageAbs);

    twCardEl.setAttribute("content", "summary_large_image");
    twTitleEl.setAttribute("content", ogTitle);
    twDescEl.setAttribute("content", ogDescription);
    twImageEl.setAttribute("content", ogImageAbs);

    let robotsEl: HTMLMetaElement | null = null;
    let prevRobots = "";
    if (extras?.robots) {
      robotsEl = ensureMeta("name", "robots");
      prevRobots = robotsEl.getAttribute("content") ?? "";
      robotsEl.setAttribute("content", extras.robots);
    }

    canonical.setAttribute("href", canonicalHref);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.setAttribute("content", prevDesc);
      ogTitleEl.setAttribute("content", prevOgTitle);
      ogDescEl.setAttribute("content", prevOgDesc);
      ogUrlEl.setAttribute("content", prevOgUrl);
      ogTypeEl.setAttribute("content", prevOgType);
      ogImageEl.setAttribute("content", prevOgImage);
      twCardEl.setAttribute("content", prevTwCard);
      twTitleEl.setAttribute("content", prevTwTitle);
      twDescEl.setAttribute("content", prevTwDesc);
      twImageEl.setAttribute("content", prevTwImage);
      if (robotsEl) {
        if (prevRobots) robotsEl.setAttribute("content", prevRobots);
        else robotsEl.removeAttribute("content");
      }
      if (prevCanonical) canonical.setAttribute("href", prevCanonical);
      else canonical.removeAttribute("href");
    };
  }, [title, description, path, extras?.ogTitle, extras?.ogDescription, extras?.ogType, extras?.ogImage, extras?.robots]);
}
