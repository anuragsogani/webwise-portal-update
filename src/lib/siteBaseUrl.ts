/** Canonical site origin for meta tags and JSON-LD (no trailing slash). */
export function getSiteBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "https://airat.in";
}

export function absoluteUrl(path: string): string {
  const base = getSiteBaseUrl();
  if (!path || path === "/") return `${base}/`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
