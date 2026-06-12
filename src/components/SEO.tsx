import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl } from "../lib/siteBaseUrl";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  indexable?: boolean;
}

const DEFAULT_TITLE = "AiRAT - Production platforms for security, AI & data";
const DEFAULT_DESCRIPTION = "AiRAT builds production security, AI, and data platforms for regulated enterprises in UAE, India, Singapore, and Europe. Senior-led delivery. SLO-anchored outcomes.";
const DEFAULT_IMAGE = "/og/default.png";

function ensureMeta(attr: "name" | "property", key: string): HTMLMetaElement {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
}

function ensureCanonical(): HTMLLinkElement {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  return el;
}

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  indexable = true,
}: SEOProps) => {
  const { pathname } = useLocation();
  const fullTitle = title ? (/\bAiRAT\b$/i.test(title.trim()) ? title : `${title} | AiRAT`) : DEFAULT_TITLE;
  const canonicalUrl = url || absoluteUrl(pathname);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  useEffect(() => {
    document.title = fullTitle;
    ensureMeta("name", "description").content = description;
    ensureCanonical().href = canonicalUrl;

    ensureMeta("property", "og:type").content = type;
    ensureMeta("property", "og:url").content = canonicalUrl;
    ensureMeta("property", "og:title").content = fullTitle;
    ensureMeta("property", "og:description").content = description;
    ensureMeta("property", "og:image").content = imageUrl;

    ensureMeta("name", "twitter:card").content = "summary_large_image";
    ensureMeta("name", "twitter:url").content = canonicalUrl;
    ensureMeta("name", "twitter:title").content = fullTitle;
    ensureMeta("name", "twitter:description").content = description;
    ensureMeta("name", "twitter:image").content = imageUrl;

    const existingRobots = document.head.querySelector('meta[name="robots"]');
    if (indexable) {
      existingRobots?.remove();
    } else {
      ensureMeta("name", "robots").content = "noindex, nofollow";
    }
  }, [canonicalUrl, description, fullTitle, imageUrl, indexable, type]);

  return null;
};

export default SEO;
