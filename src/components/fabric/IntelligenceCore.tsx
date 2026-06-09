/**
 * IntelligenceCore — the AiRAT diamond toward the centre-right.
 * A rotated-square (diamond) frame holds the brand SVG logo in a clean square.
 * Subtle pulse via Framer Motion (the one place motion state is beneficial).
 * Particles are drawn toward it by the simulation — intelligence aggregation.
 */
import { memo } from "react";
import { motion } from "framer-motion";
import type { Vec2 } from "./types";

const LOGO_SRC = "/old_logo/brand-logo-square.svg";

interface Props {
  core: Vec2;
  reducedMotion: boolean;
}

function IntelligenceCoreImpl({ core, reducedMotion }: Props) {
  const { x, y } = core;
  const diamond = 132; // rotated square edge
  const logo = 60;

  return (
    <g className="oif-core" aria-hidden="true">
      {/* expanding diamond pulse */}
      {!reducedMotion && (
        <motion.rect
          className="oif-core__pulse"
          x={x - diamond / 2}
          y={y - diamond / 2}
          width={diamond}
          height={diamond}
          style={{ transformBox: "fill-box", transformOrigin: "center", rotate: 45 }}
          initial={{ scale: 0.72, opacity: 0.5 }}
          animate={{ scale: [0.72, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 6, ease: "easeOut", repeat: Infinity }}
        />
      )}

      {/* core diamond frame — gentle breathing scale */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reducedMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
      >
        <rect
          className="oif-core__diamond"
          x={x - diamond / 2}
          y={y - diamond / 2}
          width={diamond}
          height={diamond}
          style={{ transformBox: "fill-box", transformOrigin: "center", rotate: "45deg" }}
        />
      </motion.g>

      {/* clean square holding the logo */}
      <rect
        className="oif-core__frame"
        x={x - logo / 2 - 7}
        y={y - logo / 2 - 7}
        width={logo + 14}
        height={logo + 14}
      />
      <image
        href={LOGO_SRC}
        x={x - logo / 2}
        y={y - logo / 2}
        width={logo}
        height={logo}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* lime aggregation point */}
      <motion.circle
        className="oif-core__spark"
        cx={x}
        cy={y - logo / 2 - 7}
        r={2.6}
        animate={reducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
      />
    </g>
  );
}

export const IntelligenceCore = memo(IntelligenceCoreImpl);
