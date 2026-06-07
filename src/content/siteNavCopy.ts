/** Primary nav — Duna-style mega menus + compact dropdowns */

export type NavMegaLink = {
  readonly label: string;
  readonly description: string;
  readonly to: string;
};

export type NavMegaColumn = {
  readonly heading: string;
  readonly links: readonly NavMegaLink[];
};

export type NavLinkItem = { readonly type: "link"; readonly label: string; readonly to: string };

export type NavMegaItem = {
  readonly type: "mega";
  readonly label: string;
  /** Primary page for this nav item (label click navigates here). */
  readonly to: string;
  readonly columns: readonly NavMegaColumn[];
};

export type NavDropdownItem = {
  readonly type: "dropdown";
  readonly label: string;
  readonly links: readonly { readonly label: string; readonly to: string }[];
};

export type NavItem = NavLinkItem | NavMegaItem | NavDropdownItem;

export const SITE_NAV_ITEMS: readonly NavItem[] = [
  {
    type: "mega",
    label: "Services",
    to: "/services",
    columns: [
      {
        heading: "Delivery",
        links: [
          {
            label: "Security & XDR",
            description: "SIEM, detection engineering, and evidence your auditors can follow",
            to: "/services#cyber",
          },
          {
            label: "AI & LLM systems",
            description: "RAG pipelines, agents, and evaluation harnesses for production",
            to: "/services#ai",
          },
          {
            label: "Data & search",
            description: "Medallion lakes, streaming, and OpenSearch-scale analytics",
            to: "/services#data",
          },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Products",
    to: "/products",
    columns: [
      {
        heading: "Products",
        links: [
          {
            label: "Autonomous SOC Platform",
            description: "AI analysts, attack graphs, and unified visibility across your security stack",
            to: "/products/soc",
          },
          {
            label: "Agent Detection & Response",
            description: "Visibility, governance, and threat detection for AI agents, MCP, and copilots",
            to: "/products/adr",
          },
          {
            label: "Cyber Audit & GRC",
            description: "Risk maturity, regulatory alignment, and audit-ready evidence",
            to: "/products/audit",
          },
          {
            label: "Cloud Security & Governance",
            description: "CSPM, DevSecOps, identity governance, compliance, and cost intelligence",
            to: "/products/cspm",
          },
          {
            label: "All products",
            description: "Managed SOC, ADR, audit, and cloud security accelerators",
            to: "/products",
          },
        ],
      },
    ],
  },
  { type: "link", label: "Case studies", to: "/portfolio" },
  { type: "link", label: "Demo", to: "/demo" },
  { type: "link", label: "Insights", to: "/blog" },
  { type: "link", label: "About us", to: "/about" },
] as const;
