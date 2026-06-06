import { useEffect, useRef } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { getTiffanyParticlesConfig } from "../lib/particles-config";

let slimLoaded = false;

async function ensureSlimLoaded() {
  if (!slimLoaded) {
    await loadSlim(tsParticles);
    slimLoaded = true;
  }
}

function getTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function useHeroParticles(
  containerId: string,
  prefersReducedMotion: boolean,
) {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let destroyed = false;

    async function init() {
      await ensureSlimLoaded();
      if (destroyed) return;

      await tsParticles.load({
        id: containerId,
        options: getTiffanyParticlesConfig(getTheme()),
      });

      initializedRef.current = true;
    }

    init();

    // Watch for theme changes and refresh particle colors
    const observer = new MutationObserver(() => {
      const container = tsParticles.domItem(0);
      if (!container) return;
      const theme = getTheme();
      const config = getTiffanyParticlesConfig(theme);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opts = container.options as any;
      opts.particles.color.value = config.particles?.color?.value ?? "#0ABFBC";
      if (opts.particles.links) {
        opts.particles.links.color =
          (config.particles?.links as { color?: string })?.color ?? "#0ABFBC";
      }
      container.refresh();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      destroyed = true;
      observer.disconnect();
      const container = tsParticles.domItem(0);
      if (container) {
        container.destroy();
      }
      initializedRef.current = false;
    };
  }, [containerId, prefersReducedMotion]);
}
