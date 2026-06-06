import { useEffect, useRef, type ReactNode } from "react";
import "../styles/scroll-animations.css";

interface RevealOnScrollProps {
  children: ReactNode;
  /** Delay class suffix: 1–5 maps to .reveal--delay-N (80ms increments) */
  delay?: 1 | 2 | 3 | 4 | 5;
  /** Enter direction */
  direction?: "up" | "left" | "right" | "scale" | "fade";
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** Extra class names to forward to the wrapper div */
  className?: string;
  /** HTML tag to render as wrapper (default: div) */
  as?: keyof JSX.IntrinsicElements;
}

export default function RevealOnScroll({
  children,
  delay,
  direction = "up",
  threshold = 0.12,
  className = "",
  as: Tag = "div",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion at the JS level too  -  skip observer
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      el.classList.add("reveal--visible");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal--visible");
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const classes = [
    "reveal",
    direction === "left"
      ? "reveal--from-left"
      : direction === "right"
        ? "reveal--from-right"
        : direction === "scale"
          ? "reveal--scale"
          : direction === "fade"
            ? "reveal--fade"
            : "",
    delay ? `reveal--delay-${delay}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // @ts-expect-error  -  polymorphic ref typing; safe for DOM elements
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
