import { Link } from "react-router-dom";
import {
  type FeaturedProductSlide,
  SLIDE_DURATION_MS,
} from "../content/productsPageCopy";
import "../styles/case-study-slider.css";

interface FeaturedProductSliderProps {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  slides: readonly FeaturedProductSlide[];
}

export default function FeaturedProductSlider({
  activeIndex,
  onActiveIndexChange,
  slides,
}: FeaturedProductSliderProps) {
  if (!slides.length) return null;

  const safeIndex = activeIndex % slides.length;
  const active = slides[safeIndex]!;

  return (
    <>
      <div
        className="cs-slider-info"
        style={{ display: "flex", flexDirection: "column", gap: "1rem", minHeight: "240px" }}
      >
        <h2 className="hp-feature__title">{active.title}</h2>
        <p className="hp-feature__sub">{active.summary}</p>
        <Link className="hp-feature__cta" to={active.ctaTo}>
          {active.ctaLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div
        className="cs-slider"
        style={{ ["--slide-duration-ms" as string]: `${SLIDE_DURATION_MS}ms` }}
      >
        <div className="cs-slider__dots" role="tablist" aria-label="Featured products">
          {slides.map((slide, idx) => {
            const isActive = idx === safeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={slide.title}
                className={`cs-slider__dot ${isActive ? "is-active" : ""}`}
                onClick={() => onActiveIndexChange(idx)}
              >
                {isActive && (
                  <div className="cs-slider__dot-progress" key={safeIndex} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
