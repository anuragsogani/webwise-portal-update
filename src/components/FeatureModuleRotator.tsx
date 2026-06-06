import { useCallback, useEffect, useRef, useState } from "react";
import type { HomeVisual } from "../content/homePageVisuals";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export const FEATURE_MODULE_ROTATOR_MS = 5000;

export type FeatureModuleRotatorService = {
  readonly title: string;
  readonly description?: string;
};

interface FeatureModuleRotatorProps {
  readonly services: readonly FeatureModuleRotatorService[];
  readonly visuals: readonly HomeVisual[];
  readonly intervalMs?: number;
  readonly listLabel?: string;
  readonly idPrefix?: string;
}

export default function FeatureModuleRotator({
  services,
  visuals,
  intervalMs = FEATURE_MODULE_ROTATOR_MS,
  listLabel = "Capability highlights",
  idPrefix = "feature-service",
}: FeatureModuleRotatorProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const count = Math.min(services.length, visuals.length);
  const safeIndex = count > 0 ? activeIndex % count : 0;
  const activeVisual = visuals[safeIndex];

  const advance = useCallback(() => {
    if (count < 2) return;
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) advance();
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [advance, count, intervalMs, reduceMotion]);

  const select = (index: number) => {
    setActiveIndex(index);
  };

  if (!count || !activeVisual) return null;

  return (
    <>
      <div
        className="feature-module__visual feature-module-rotator__visual"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onFocusCapture={() => { pausedRef.current = true; }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            pausedRef.current = false;
          }
        }}
      >
        <img
          key={activeVisual.src}
          className={`feature-module__image feature-module-rotator__image${reduceMotion ? "" : " feature-module-rotator__image--enter"}`}
          src={activeVisual.src}
          alt={activeVisual.alt}
          width={activeVisual.width}
          height={activeVisual.height}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="feature-module__services feature-module-rotator__services">
        <ul
          className="feature-module__service-list feature-module-rotator__list"
          role="tablist"
          aria-label={listLabel}
        >
          {services.slice(0, count).map((service, index) => {
            const isActive = index === safeIndex;
            return (
              <li
                key={service.title}
                role="presentation"
                className={`feature-module__service feature-module-rotator__service${isActive ? " feature-module__service--highlight feature-module-rotator__service--active" : ""}`}
              >
                <button
                  type="button"
                  role="tab"
                  id={`${idPrefix}-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`${idPrefix}-panel-${index}`}
                  className="feature-module-rotator__trigger"
                  onClick={() => select(index)}
                >
                  <h4 className="title-sm feature-module-rotator__title">{service.title}</h4>
                </button>
                {isActive && service.description ? (
                  <p
                    id={`${idPrefix}-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`${idPrefix}-tab-${index}`}
                    className="body-sm feature-module-rotator__panel"
                  >
                    {service.description}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
