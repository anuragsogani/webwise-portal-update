import { useEffect } from "react";

/**
 * Adds `is-inview` to `.reveal-on-scroll` elements inside `rootSelector` when they enter the viewport.
 */
export function useRevealOnScroll(rootSelector = "main", enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootSelector, enabled]);
}
