/**
 * CoreTarget - the central convergence point. Finely spaced concentric rings,
 * a soft halo, expanding ripples and the AiRAT diamond. Subtle, never glowing
 * aggressively. Ripple/pulse via Framer Motion (declarative is cleanest here).
 */
import { memo } from "react";
import { motion } from "framer-motion";
import type { Ring, Vec2 } from "./types";

interface Props {
  core: Vec2;
  rings: Ring[];
  reducedMotion: boolean;
}

function CoreTargetImpl({ core, rings, reducedMotion }: Props) {
  const { x, y } = core;
  const d = 30; // diamond edge

  return (
    <g className="oif-core" aria-hidden="true">
      <circle className="oif-core__halo" cx={x} cy={y} r={150} />

      {rings.map((r, i) => (
        <circle key={i} className="oif-core__ring" cx={x} cy={y} r={r.r} style={{ opacity: r.opacity }} />
      ))}

      {!reducedMotion && (
        <>
          <motion.circle
            className="oif-core__ripple"
            cx={x}
            cy={y}
            r={20}
            initial={{ scale: 0.4, opacity: 0.4 }}
            animate={{ scale: 4.4, opacity: 0 }}
            transition={{ duration: 6, ease: "easeOut", repeat: Infinity }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.circle
            className="oif-core__ripple"
            cx={x}
            cy={y}
            r={20}
            initial={{ scale: 0.4, opacity: 0.4 }}
            animate={{ scale: 4.4, opacity: 0 }}
            transition={{ duration: 6, ease: "easeOut", repeat: Infinity, delay: 3 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </>
      )}

      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 4.6, ease: "easeInOut", repeat: Infinity }}
      >
        <rect
          className="oif-core__diamond-bg"
          x={x - d / 2}
          y={y - d / 2}
          width={d}
          height={d}
          style={{ transformBox: "fill-box", transformOrigin: "center", rotate: "45deg" }}
        />
        <rect
          className="oif-core__diamond"
          x={x - d / 2}
          y={y - d / 2}
          width={d}
          height={d}
          style={{ transformBox: "fill-box", transformOrigin: "center", rotate: "45deg" }}
        />
      </motion.g>
      <motion.rect
        className="oif-core__dot"
        x={x - 3}
        y={y - 3}
        width={6}
        height={6}
        animate={reducedMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />
    </g>
  );
}

export const CoreTarget = memo(CoreTargetImpl);
