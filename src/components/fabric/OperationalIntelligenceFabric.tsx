/**
 * OperationalIntelligenceFabric — AiRAT Cognition Field.
 *
 * A self-wiring neural field that perceives and reacts: nodes drift and rewire
 * to nearby neighbours, activation energy propagates across the links like
 * thought, and the field responds to the pointer (lighting up + parallax) while
 * an autonomous attention point keeps it alive. Energy converges on the AiRAT
 * core. One seeded geometry (useMemo) + one rAF engine.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { buildGeometry } from "./geometry";
import { useFabricSimulation } from "./useFabricSimulation";
import { CognitionLayer } from "./CognitionLayer";
import { CoreTarget } from "./CoreTarget";
import type { FabricConfig } from "./types";
import "./fabric.css";

const WIDTH = 1440;
const HEIGHT = 680;

type Tier = "full" | "reduced" | "compact";

interface EnvState {
  tier: Tier;
  reducedMotion: boolean;
}

function readEnv(): EnvState {
  if (typeof window === "undefined") return { tier: "full", reducedMotion: false };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const w = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  let tier: Tier = "full";
  if (w < 700 || (coarse && w < 920)) tier = "compact";
  else if (w < 1100) tier = "reduced";
  return { tier, reducedMotion };
}

function configFor(tier: Tier): FabricConfig {
  const base = { width: WIDTH, height: HEIGHT, seed: 90210 };
  switch (tier) {
    case "compact":
      return { ...base, cols: 90, rows: 40 };
    case "reduced":
      return { ...base, cols: 120, rows: 50 };
    default:
      return { ...base, cols: 148, rows: 60 };
  }
}

export interface OperationalIntelligenceFabricProps {
  className?: string;
}

export default function OperationalIntelligenceFabric({ className }: OperationalIntelligenceFabricProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [env, setEnv] = useState<EnvState>(() => readEnv());

  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = readEnv();
        setEnv((prev) => (prev.tier === next.tier && prev.reducedMotion === next.reducedMotion ? prev : next));
      });
    };
    window.addEventListener("resize", onResize);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener?.("change", onResize);
    };
  }, []);

  const config = useMemo(() => configFor(env.tier), [env.tier]);
  const geometry = useMemo(() => buildGeometry(config), [config]);

  useFabricSimulation(svgRef, geometry, { enabled: !env.reducedMotion });

  return (
    <svg
      ref={svgRef}
      className={["oif", className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="A living field of intelligence that senses, connects and converges on an operational core."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="oif-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aeec1d" stopOpacity="0.2" />
          <stop offset="55%" stopColor="#aeec1d" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#aeec1d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="oif-parallax">
        <CognitionLayer />
        <CoreTarget core={geometry.core} rings={geometry.rings} reducedMotion={env.reducedMotion} />
        {!env.reducedMotion && (
          <g className="oif-services" aria-hidden="true">
            {SERVICE_MARKERS.map((m, i) => (
              <g key={m.label} className="oif-svc" style={{ animationDelay: `${i * 1.4}s` }}>
                <circle className="oif-svc__ring" cx={m.x} cy={m.y} r="5" />
                <rect className="oif-svc__dot" x={m.x - 4} y={m.y - 4} width="8" height="8" />
                <text className="oif-svc__label" x={m.anchor === "end" ? m.x - 14 : m.x + 14} y={m.y + 4} textAnchor={m.anchor}>
                  {m.label}
                </text>
              </g>
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}

const SERVICE_MARKERS = [
  { label: "SECURITY", x: 168, y: 452, anchor: "start" as const },
  { label: "AI", x: 372, y: 556, anchor: "start" as const },
  { label: "DATA", x: 1068, y: 556, anchor: "end" as const },
  { label: "PLATFORM", x: 1272, y: 452, anchor: "end" as const },
];
