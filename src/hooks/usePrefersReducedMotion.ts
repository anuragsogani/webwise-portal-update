import { useState } from "react";

export function usePrefersReducedMotion() {
  const [reduceMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  return reduceMotion;
}
