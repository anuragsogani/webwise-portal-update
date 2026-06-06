import { useEffect, useMemo, useState } from "react";
import AiratShell from "../components/AiratShell";
import EditorialTile from "../components/EditorialTile";
import CtaBand from "../components/CtaBand";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SEO } from "../components/SEO";
import {
  INTEGRATIONS_CATALOG,
  INTEGRATIONS_HERO,
  INTEGRATIONS_PAGE_SIZE,
  INTEGRATIONS_SEO,
  INTEGRATION_TYPE_FILTERS,
  PLATFORM_FILTERS,
  type IntegrationEntry,
  type IntegrationTypeFilter,
  type PlatformFilter,
} from "../content/integrationsCatalog";
import { breadcrumbSchema, injectJsonLdScript } from "../lib/jsonLd";
import { getSiteBaseUrl } from "../lib/siteBaseUrl";
import "../styles/integrations-page.css";
import "../styles/homepage.css";

const INTEGRATION_CTA = "Discuss integration";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function matchesType(entry: IntegrationEntry, filter: IntegrationTypeFilter) {
  return entry.category.toLowerCase() === filter.toLowerCase();
}

function matchesPlatform(entry: IntegrationEntry, filter: PlatformFilter) {
  return entry.platform.toLowerCase() === filter.toLowerCase();
}

export default function IntegrationsPage() {
  const [filterMode, setFilterMode] = useState<"integrations" | "platforms">("integrations");
  const [typeFilters, setTypeFilters] = useState<Set<IntegrationTypeFilter>>(new Set());
  const [platformFilters, setPlatformFilters] = useState<Set<PlatformFilter>>(new Set());
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(INTEGRATIONS_PAGE_SIZE);

  useEffect(() => {
    const base = getSiteBaseUrl();
    const rm = injectJsonLdScript(
      "airat-ld-breadcrumb-integrations",
      breadcrumbSchema(base, [
        { name: "Home", path: "/" },
        { name: "Integrations", path: "/integrations" },
      ]),
    );
    return () => rm();
  }, []);

  const filtered = useMemo(() => {
    const query = normalizeSearch(search);
    return INTEGRATIONS_CATALOG.filter((entry) => {
      if (typeFilters.size > 0 && ![...typeFilters].some((f) => matchesType(entry, f))) return false;
      if (platformFilters.size > 0 && ![...platformFilters].some((f) => matchesPlatform(entry, f))) return false;
      if (!query) return true;
      const haystack = `${entry.title} ${entry.description} ${entry.category} ${entry.platform} ${entry.id}`;
      return normalizeSearch(haystack).includes(query);
    });
  }, [typeFilters, platformFilters, search]);

  useEffect(() => {
    setVisibleCount(INTEGRATIONS_PAGE_SIZE);
  }, [typeFilters, platformFilters, search]);

  const visible = filtered.slice(0, visibleCount);
  const totalPages = Math.max(1, Math.ceil(filtered.length / INTEGRATIONS_PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.max(1, Math.ceil(visibleCount / INTEGRATIONS_PAGE_SIZE)));
  const hasMore = visibleCount < filtered.length;

  const toggleType = (value: IntegrationTypeFilter) => {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const togglePlatform = (value: PlatformFilter) => {
    setPlatformFilters((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const clearFilters = () => {
    setTypeFilters(new Set());
    setPlatformFilters(new Set());
    setSearch("");
  };

  return (
    <AiratShell>
      <SEO title={INTEGRATIONS_SEO.title} description={INTEGRATIONS_SEO.description} />
      <SiteHeader />

      <main id="main-content">
        <section className="hero-band section">
          <div className="container hero-band__inner">
            <p className="eyebrow">{INTEGRATIONS_HERO.eyebrow}</p>
            <h1 className="display-2xl hero-band__title">{INTEGRATIONS_HERO.headline}</h1>
            <p className="body-lg hero-band__lead">{INTEGRATIONS_HERO.body}</p>
          </div>
        </section>

        <section className="section section--warm" aria-label="Integration finder">
          <div className="container int-finder">
            <div className="int-finder__toolbar">
              <span className="int-finder__label">Filter by</span>
              <div className="int-finder__mode" role="tablist" aria-label="Filter group">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filterMode === "integrations"}
                  className={`int-finder__mode-btn ${filterMode === "integrations" ? "is-active" : ""}`}
                  onClick={() => setFilterMode("integrations")}
                >
                  Integrations
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filterMode === "platforms"}
                  className={`int-finder__mode-btn ${filterMode === "platforms" ? "is-active" : ""}`}
                  onClick={() => setFilterMode("platforms")}
                >
                  Platforms
                </button>
              </div>
              <label className="int-finder__search">
                <span className="sr-only">Search integrations</span>
                <input
                  type="search"
                  placeholder="Search integrations…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </label>
              {(typeFilters.size > 0 || platformFilters.size > 0 || search) && (
                <button type="button" className="int-finder__clear" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>

            <div className="int-finder__layout">
              <aside
                className="int-filters"
                aria-label={filterMode === "integrations" ? "Integration types" : "Platforms"}
              >
                {filterMode === "integrations" ? (
                  <ul className="int-filters__list">
                    {INTEGRATION_TYPE_FILTERS.map((value) => (
                      <li key={value}>
                        <label className="int-filters__item">
                          <input
                            type="checkbox"
                            checked={typeFilters.has(value)}
                            onChange={() => toggleType(value)}
                          />
                          <span className="int-filters__box" aria-hidden="true" />
                          <span>{value}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="int-filters__list">
                    {PLATFORM_FILTERS.map((value) => (
                      <li key={value}>
                        <label className="int-filters__item">
                          <input
                            type="checkbox"
                            checked={platformFilters.has(value)}
                            onChange={() => togglePlatform(value)}
                          />
                          <span className="int-filters__box" aria-hidden="true" />
                          <span>{value}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>

              <div className="int-results">
                <p className="int-results__meta" aria-live="polite">
                  Showing {Math.min(visibleCount, filtered.length)} of {filtered.length}
                </p>

                {filtered.length === 0 ? (
                  <p className="int-results__empty">
                    No integrations match your filters. Try clearing filters or another search.
                  </p>
                ) : (
                  <ul className="editorial-tile-grid int-results__grid" role="list">
                    {visible.map((entry) => (
                      <li key={entry.id} id={entry.id} className="int-results__item">
                        <EditorialTile
                          title={entry.title}
                          description={entry.description}
                          meta={[
                            { label: "Type", value: entry.category },
                            { label: "Platform", value: entry.platform },
                          ]}
                          ctaLabel={INTEGRATION_CTA}
                          href="/contact"
                        >
                          <div className="editorial-tile__visual editorial-tile__visual--logo">
                            {entry.logoUrl ? (
                              <img src={entry.logoUrl} alt="" loading="lazy" decoding="async" />
                            ) : (
                              <span className="int-logo-fallback">{entry.title.charAt(0)}</span>
                            )}
                          </div>
                        </EditorialTile>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="int-results__footer">
                  {hasMore && (
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => setVisibleCount((count) => count + INTEGRATIONS_PAGE_SIZE)}
                    >
                      Load more
                    </button>
                  )}
                  <p className="int-pagination">
                    {currentPage} / {totalPages}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          title="Need a connector your stack depends on?"
          body="Tell us what you run today — we will map AiRAT to your SIEM, cloud, and data platforms before build starts."
          primary={{ label: "Book a strategy call", to: "/contact" }}
        />
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
