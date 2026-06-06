import type { ISourceOptions } from "@tsparticles/engine";

const TIFFANY_LIGHT_COLORS = ["#0ABFBC", "#81D8D0", "#078f8b", "#B2E8E6"];
const TIFFANY_DARK_COLORS = ["#81D8D0", "#B2E8E6", "#ffffff", "#0ABFBC"];

export function getTiffanyParticlesConfig(theme: "light" | "dark"): ISourceOptions {
  const isDark = theme === "dark";

  return {
    background: { color: { value: "transparent" } },
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,

    particles: {
      number: {
        value: 80,
        density: { enable: true, width: 900, height: 900 },
      },

      color: {
        value: isDark ? TIFFANY_DARK_COLORS : TIFFANY_LIGHT_COLORS,
      },

      opacity: {
        value: {
          min: isDark ? 0.15 : 0.08,
          max: isDark ? 0.70 : 0.45,
        },
        animation: {
          enable: true,
          speed: 0.6,
          sync: false,
        },
      },

      size: {
        value: { min: 1, max: 3.5 },
        animation: {
          enable: true,
          speed: 1.2,
          sync: false,
        },
      },

      shape: { type: "circle" },

      move: {
        enable: true,
        speed: { min: 0.15, max: 0.6 },
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
        attract: { enable: false },
      },

      links: {
        enable: true,
        color: isDark ? "#81D8D0" : "#0ABFBC",
        opacity: 0.12,
        width: 0.8,
        distance: 140,
        triangles: { enable: false },
      },
    },

    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true, delay: 0.5 },
      },
      modes: {
        grab: {
          distance: 160,
          links: { opacity: 0.35, color: "#0ABFBC" },
        },
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 },
      },
    },
  };
}
