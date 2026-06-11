/** Site footer  -  micro1-style layout; watermark branding */

/** Primary wordmark in the footer column (high contrast on dark bar) */
export const FOOTER_BRAND_MARK = "AiRAT" as const;

export const FOOTER_TAGLINE =
  "Security and AI platforms for regulated enterprises in UAE, India, and Europe - outcomes before acronyms.";

export const FOOTER_ADDRESS_LINES = ["E-238A Ramnagar Vivek Vihar", "Jaipur, Rajasthan, India"] as const;

export type FooterLink = { readonly label: string; readonly to: string };

export type FooterColumn = {
  readonly heading: string;
  readonly links: readonly FooterLink[];
};

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "All services", to: "/services" },
      { label: "Integrations", to: "/integrations" },
      { label: "Security & XDR", to: "/services#cyber" },
      { label: "GenAI & RAG", to: "/services#ai" },
      { label: "Data & search", to: "/services#data" },
      { label: "How we work", to: "/methodology" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "All products", to: "/products" },
      { label: "Autonomous SOC Platform", to: "/products/soc" },
      { label: "Endpoint Operations & Security", to: "/products/endpoint" },
      { label: "Cloud Security & Governance", to: "/products/cspm" },
      { label: "Agent Detection & Response", to: "/products/adr" },
    ],
  },
  {
    heading: "Work",
    links: [
      { label: "Case studies", to: "/portfolio" },
      { label: "Multi-tenant XDR · MSSPs", to: "/portfolio/hawkeye-multi-tenant-cybersecurity-platform" },
      { label: "FinTech & Banking", to: "/industries/fintech" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resources hub", to: "/resources" },
      { label: "Trust", to: "/resources/trust" },
      { label: "Insights", to: "/blog" },
      { label: "Glossary", to: "/glossary" },
      { label: "Methodology", to: "/methodology" },
      { label: "AI & LLM systems", to: "/blog/category/ai-llm" },
      { label: "Security & SOC", to: "/blog/category/cyber-soc" },
      { label: "Data & search", to: "/blog/category/data-search" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Technology", to: "/technology-expertise" },
    ],
  },
  {
    heading: "Support",
    links: [{ label: "shared@airat.in", to: "mailto:shared@airat.in" }],
  },
] as const;

export const FOOTER_SUPPORT = {
  heading: "Support",
  email: "shared@airat.in",
  mailto: "mailto:shared@airat.in",
} as const;

export const FOOTER_LEGAL = {
  companyName: "AiRAT",
  sitemapLabel: "Sitemap",
  sitemapTo: "/sitemap.xml",
  links: [
    { label: "Terms", to: "/terms" },
    { label: "Privacy", to: "/privacy" },
    { label: "Security", to: "/resources/trust" },
  ] as const,
} as const;

/** Large footer watermark (display typography, cropped at bottom edge) */
export const FOOTER_WATERMARK = FOOTER_BRAND_MARK;

export const FOOTER_SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/airat-io",
    ariaLabel: "AiRAT on LinkedIn",
    icon: "in",
  },
  {
    label: "X",
    url: "https://x.com/AiRAT238",
    ariaLabel: "AiRAT on X (Twitter)",
    icon: "𝕏",
  },
] as const;
