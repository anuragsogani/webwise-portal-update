import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  target: number;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
};

function formatStat(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals);
  return String(Math.round(value));
}

export default function StatCounter({
  target,
  suffix = "",
  decimals = 0,
  durationMs = 1400,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!active) return;

    let start: number | null = null;
    let frame = 0;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
      else setValue(target);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {formatStat(value, decimals)}
      {suffix}
    </span>
  );
}
