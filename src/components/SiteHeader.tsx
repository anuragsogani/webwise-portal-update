import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import {
  SITE_NAV_ITEMS,
  type NavDropdownItem,
  type NavItem,
  type NavMegaItem,
} from "../content/siteNavCopy";
import BrandLogo from "./BrandLogo";
import "../styles/site-header.css";

function isActive(pathname: string, to: string) {
  if (to === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
  if (to === "/portfolio") return pathname === "/portfolio" || pathname.startsWith("/portfolio/");
  if (to === "/products") return pathname === "/products" || pathname.startsWith("/products/");
  if (to === "/resources") return pathname === "/resources" || pathname.startsWith("/glossary");
  if (to === "/demo") return pathname === "/demo" || pathname.startsWith("/demo/");
  if (to.includes("#")) {
    const base = to.split("#")[0]!;
    return pathname === base || pathname.startsWith(`${base}/`);
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

function navItemActive(pathname: string, item: NavItem) {
  if (item.type === "link") return isActive(pathname, item.to);
  if (item.type === "dropdown") return item.links.some((l) => isActive(pathname, l.to));
  if (isActive(pathname, item.to)) return true;
  return item.columns.some((col) => col.links.some((l) => isActive(pathname, l.to)));
}

function megaLinks(item: NavMegaItem) {
  return item.columns.flatMap((col) => col.links);
}

function drawerLinkKey(label: string, to: string) {
  return `${to}|${label}`;
}

/** Flatten nav for mobile drawer — skip duplicate to+label pairs from mega + top-level links */
function buildDrawerLinks() {
  const seen = new Set<string>();
  const links: { label: string; to: string }[] = [];

  const push = (label: string, to: string) => {
    const key = drawerLinkKey(label, to);
    if (seen.has(key)) return;
    seen.add(key);
    links.push({ label, to });
  };

  for (const item of SITE_NAV_ITEMS) {
    if (item.type === "link") {
      push(item.label, item.to);
    } else if (item.type === "dropdown") {
      for (const link of item.links) push(link.label, link.to);
    } else {
      push(item.label, item.to);
      for (const link of megaLinks(item)) push(link.label, link.to);
    }
  }

  return links;
}

function MegaMenuColumns({ item }: { item: NavMegaItem }) {
  return (
    <div
      className="nav-mega__inner"
      style={{ "--mega-cols": item.columns.length } as CSSProperties}
    >
      {item.columns.map((col) => (
        <div key={col.heading} className="nav-mega__col">
          <p className="nav-mega__heading">{col.heading}</p>
          <ul className="nav-mega__list">
            {col.links.map((link) => (
              <li key={drawerLinkKey(link.label, link.to)}>
                <Link to={link.to} className="nav-mega__link" role="menuitem">
                  <span className="nav-mega__link-title">{link.label}</span>
                  <span className="nav-mega__link-desc">{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function SiteHeader() {
  const { pathname } = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const cancelCloseMenu = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    cancelCloseMenu();
    setOpenMenu(null);
  }, [cancelCloseMenu]);

  const scheduleCloseMenu = useCallback(() => {
    cancelCloseMenu();
    closeTimerRef.current = window.setTimeout(() => setOpenMenu(null), 140);
  }, [cancelCloseMenu]);

  const openMenuByLabel = useCallback(
    (label: string) => {
      cancelCloseMenu();
      setOpenMenu(label);
    },
    [cancelCloseMenu],
  );

  const toggleMenu = useCallback(
    (label: string) => {
      cancelCloseMenu();
      setOpenMenu((current) => (current === label ? null : label));
    },
    [cancelCloseMenu],
  );

  useEffect(() => {
    setOpen(false);
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    return () => cancelCloseMenu();
  }, [cancelCloseMenu]);

  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerRef.current?.contains(target)) return;
      if (flyoutRef.current?.contains(target)) return;
      closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMegaItem = SITE_NAV_ITEMS.find(
    (entry): entry is NavMegaItem => entry.type === "mega" && entry.label === openMenu,
  );

  useEffect(() => {
    if (!openMegaItem) return;

    const syncFlyoutTop = () => {
      const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setFlyoutTop(bottom + 2);
    };

    syncFlyoutTop();
    window.addEventListener("scroll", syncFlyoutTop, { passive: true });
    window.addEventListener("resize", syncFlyoutTop);
    return () => {
      window.removeEventListener("scroll", syncFlyoutTop);
      window.removeEventListener("resize", syncFlyoutTop);
    };
  }, [openMegaItem]);

  const drawerLinks = buildDrawerLinks();

  const overHero = pathname === "/" || pathname === "/home";

  return (
    <header
      ref={headerRef}
      className={`top-nav${scrolled ? " top-nav--scrolled" : ""}${openMenu ? " top-nav--menu-open" : ""}${overHero ? " top-nav--over-hero" : ""}`}
    >
      <a href="#main-content" className="top-nav__skip">
        Skip to content
      </a>

      <div className="top-nav__inner container">
        <Link className="top-nav__brand" to="/" aria-label="AiRAT — home">
          <BrandLogo size={32} className="top-nav__brand-mark" decorative />
          <span className="top-nav__brand-text" aria-hidden="true">
            AiRAT
          </span>
        </Link>

        <nav className="top-nav__links" aria-label="Primary navigation">
          {SITE_NAV_ITEMS.map((item) => {
            if (item.type === "link") {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`top-nav__link${isActive(pathname, item.to) ? " top-nav__link--active" : ""}`}
                  aria-current={isActive(pathname, item.to) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.type === "mega") {
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className={`nav-dropdown nav-dropdown--mega${navItemActive(pathname, item) ? " nav-dropdown--active" : ""}${isOpen ? " nav-dropdown--open" : ""}`}
                  onMouseEnter={() => openMenuByLabel(item.label)}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <div className="nav-dropdown__trigger-group">
                    <Link
                      to={item.to}
                      className="nav-dropdown__label-link"
                      aria-current={isActive(pathname, item.to) ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="nav-dropdown__caret-btn"
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-label={`${item.label} menu`}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <span className="nav-dropdown__caret" aria-hidden="true">
                        ▾
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            const dropdown = item as NavDropdownItem;
            const isOpen = openMenu === dropdown.label;
            return (
              <div
                key={dropdown.label}
                className={`nav-dropdown${navItemActive(pathname, dropdown) ? " nav-dropdown--active" : ""}${isOpen ? " nav-dropdown--open" : ""}`}
                onMouseEnter={() => openMenuByLabel(dropdown.label)}
                onMouseLeave={scheduleCloseMenu}
              >
                <button
                  type="button"
                  className="nav-dropdown__trigger"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => toggleMenu(dropdown.label)}
                >
                  {dropdown.label}
                  <span className="nav-dropdown__caret" aria-hidden="true">
                    ▾
                  </span>
                </button>
                <div
                  className="nav-dropdown__panel"
                  role="menu"
                  aria-hidden={!isOpen}
                  onMouseEnter={() => openMenuByLabel(dropdown.label)}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <div className="nav-dropdown__surface nav-glass">
                    <p className="nav-dropdown__heading">{dropdown.label}</p>
                    {dropdown.links.map((link) => (
                      <Link key={link.to} to={link.to} className="nav-dropdown__link" role="menuitem">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <Link to="/contact" className="btn btn--dark top-nav__cta">
          Book a strategy call
        </Link>

        <button
          type="button"
          className="top-nav__menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {openMegaItem &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={flyoutRef}
            className="nav-mega__flyout"
            style={{ top: flyoutTop }}
            role="menu"
            onMouseEnter={() => openMenuByLabel(openMegaItem.label)}
            onMouseLeave={scheduleCloseMenu}
          >
            <div className="nav-mega__surface nav-glass">
              <MegaMenuColumns item={openMegaItem} />
            </div>
          </div>,
          document.body,
        )}

      <div className={`top-nav__drawer${open ? " top-nav__drawer--open" : ""}`} aria-hidden={!open}>
        <nav className="top-nav__drawer-nav" aria-label="Mobile navigation">
          {drawerLinks.map((link) => (
            <Link key={drawerLinkKey(link.label, link.to)} to={link.to} className="top-nav__drawer-link">
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn--dark">
            Book a strategy call
          </Link>
        </nav>
      </div>
    </header>
  );
}
