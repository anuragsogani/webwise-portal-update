/** Primary nav — Duna-style mega menus + compact dropdowns */

import { PRODUCT_TILES } from "./productsPageCopy";
import { SERVICES_PILLARS } from "./servicesPageCopy";

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
        heading: "Services",
        links: SERVICES_PILLARS.map((pillar) => ({
          label: pillar.label,
          description: pillar.subhead,
          to: `/services#pillar-${pillar.id}`,
        })),
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
        links: PRODUCT_TILES.map((tile) => ({
          label: tile.title,
          description: tile.body,
          to: `/products#product-${tile.id}`,
        })),
      },
    ],
  },
  { type: "link", label: "Case studies", to: "/portfolio" },
  { type: "link", label: "Demo", to: "/demo" },
  { type: "link", label: "Insights", to: "/blog" },
  { type: "link", label: "About us", to: "/about" },
] as const;
