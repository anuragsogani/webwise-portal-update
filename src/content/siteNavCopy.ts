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
      {
        heading: "How we work",
        links: [
          {
            label: "All services",
            description: "Full catalogue across security, AI, and data platforms",
            to: "/services",
          },
          {
            label: "Integrations",
            description: "SIEM, cloud, data, and AI tooling we connect in your estate",
            to: "/integrations",
          },
          {
            label: "Methodology",
            description: "Discovery through production SLOs — not slide milestones",
            to: "/methodology",
          },
          {
            label: "Technology stack",
            description: "OpenSearch, Elastic, Kafka, and cloud-native tooling",
            to: "/technology-expertise",
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
            label: "Managed CSOC & XDR",
            description: "24/7 detection, triage, and threat hunting with correlated timelines",
            to: "/products/soc",
          },
          {
            label: "Detection & Response",
            description: "Agentic AI and application runtime protection in one stack",
            to: "/products/adr",
          },
          {
            label: "Cyber Audit & GRC",
            description: "Risk maturity, regulatory alignment, and audit-ready evidence",
            to: "/products/audit",
          },
        ],
      },
      {
        heading: "Platform",
        links: [
          {
            label: "Agentic Cloud Defender",
            description: "Multicloud misconfiguration detection and drift control",
            to: "/products/cspm",
          },
          {
            label: "All products",
            description: "Managed SOC, ADR, audit, and cloud security accelerators",
            to: "/products",
          },
          {
            label: "Case studies",
            description: "Shipped platforms across security, AI, and search",
            to: "/portfolio",
          },
        ],
      },
    ],
  },
  { type: "link", label: "Case studies", to: "/portfolio" },
  { type: "link", label: "Demo", to: "/demo" },
  {
    type: "dropdown",
    label: "Resources",
    links: [
      { label: "Resources hub", to: "/resources" },
      { label: "Insights", to: "/blog" },
      { label: "Glossary", to: "/glossary" },
      { label: "Methodology", to: "/methodology" },
    ],
  },
  {
    type: "dropdown",
    label: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Technology", to: "/technology-expertise" },
    ],
  },
] as const;
