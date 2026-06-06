import { useCallback, useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import {
  HOME_TRUSTED_LEADERS_SECTION,
  TRUSTED_LEADER_TESTIMONIALS,
} from "../content/homePageCopy";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import TestimonialPixelCharacter from "./TestimonialPixelCharacter";

export const TRUSTED_LEADER_ROTATOR_MS = 5000;

export default function TrustedByLeaders() {
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);
  const count = TRUSTED_LEADER_TESTIMONIALS.length;
  const safeIndex = count > 0 ? activeIndex % count : 0;
  const active = TRUSTED_LEADER_TESTIMONIALS[safeIndex];

  const advance = useCallback(() => {
    if (count < 2) return;
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) advance();
    }, TRUSTED_LEADER_ROTATOR_MS);
    return () => window.clearInterval(id);
  }, [advance, count, reduceMotion]);

  const select = (index: number) => {
    setActiveIndex(index);
  };

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  if (!active) return null;

  const { title, lead } = HOME_TRUSTED_LEADERS_SECTION;

  return (
    <section className="trusted-leaders section" aria-labelledby="trusted-leaders-heading">
      <div className="container trusted-leaders__inner">
        <RevealOnScroll className="trusted-leaders__head">
          <h2 id="trusted-leaders-heading" className="display-lg trusted-leaders__title">
            {title}
          </h2>
          <p className="body-lg trusted-leaders__lead">{lead}</p>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div
            className="trusted-leaders__logos"
            role="tablist"
            aria-label="Select client testimonial"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocusCapture={pause}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                resume();
              }
            }}
          >
            <ul className="trusted-leaders__logo-list">
              {TRUSTED_LEADER_TESTIMONIALS.map((item, index) => {
                const isActive = index === safeIndex;
                return (
                  <li key={item.id} className="trusted-leaders__logo-item">
                    <button
                      type="button"
                      role="tab"
                      id={`trusted-leader-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls="trusted-leader-panel"
                      className={`trusted-leaders__logo-btn${isActive ? " trusted-leaders__logo-btn--active" : ""}`}
                      onClick={() => select(index)}
                    >
                      <img
                        className="trusted-leaders__logo-img"
                        src={item.logoSrc}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="sr-only">{item.clientName}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={2} className="trusted-leaders__card reveal--slow">
          <blockquote
            id="trusted-leader-panel"
            role="tabpanel"
            aria-labelledby={`trusted-leader-tab-${active.id}`}
            className="trusted-leaders__quote-panel"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocusCapture={pause}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                resume();
              }
            }}
          >
            <p
              key={`${active.id}-quote`}
              className={`trusted-leaders__quote${reduceMotion ? "" : " trusted-leaders__quote--enter"}`}
            >
              {active.quote}
            </p>
            <footer
              key={`${active.id}-attrib`}
              className={`trusted-leaders__attrib${reduceMotion ? "" : " trusted-leaders__attrib--enter"}`}
            >
              <cite className="trusted-leaders__name">{active.name}</cite>
              <span className="trusted-leaders__role">{active.role}</span>
            </footer>
          </blockquote>
          <figure className="trusted-leaders__portrait">
            <TestimonialPixelCharacter
              key={active.characterVariant}
              variant={active.characterVariant}
              className={reduceMotion ? "" : "trusted-leaders__portrait-character--enter"}
            />
          </figure>
        </RevealOnScroll>
      </div>
    </section>
  );
}
