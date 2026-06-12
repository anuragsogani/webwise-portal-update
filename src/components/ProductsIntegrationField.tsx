/**
 * ProductsIntegrationField - the CSOC intelligence core ingesting a customer's
 * existing stack (SIEM, EDR, ticketing, identity, threat intel …) plus AiRAT's
 * own planes. Hybrid HTML + SVG: crisp HTML chips with depth (size / opacity /
 * blur), SVG curved connectors and particles that flow inward and shift from
 * grey to lime at the core - raw telemetry becoming intelligence.
 *
 * Coordinates are percentages; the container locks aspect-ratio so the SVG
 * viewBox (0..1000 × 0..780) maps 1:1 to chip left/top %. Reduced-motion safe.
 */
import { memo } from "react";

type Tier = "far" | "mid" | "near" | "plane";
type Node = { label: string; x: number; y: number; tier: Tier; accent?: string };

/* x,y in percent of the field. Core sits at 50/50. */
const NODES: Node[] = [
  // AiRAT planes - first-class, accented
  { label: "Endpoint", x: 50, y: 13, tier: "plane", accent: "#46838c" },
  { label: "Cloud", x: 85, y: 73, tier: "plane", accent: "#c79a3e" },
  { label: "Agents", x: 15, y: 73, tier: "plane", accent: "#17100d" },
  // existing stack - the tools customers already run
  { label: "SIEM", x: 23, y: 25, tier: "near" },
  { label: "EDR / XDR", x: 77, y: 23, tier: "near" },
  { label: "Ticketing", x: 84, y: 45, tier: "mid" },
  { label: "Threat Intel", x: 13, y: 45, tier: "mid" },
  { label: "Firewall", x: 33, y: 71, tier: "mid" },
  { label: "Identity / IAM", x: 67, y: 69, tier: "mid" },
  { label: "Vuln Mgmt", x: 11, y: 59, tier: "far" },
  { label: "Email Security", x: 89, y: 59, tier: "far" },
  { label: "NDR", x: 41, y: 88, tier: "far" },
  { label: "DLP", x: 61, y: 89, tier: "far" },
  { label: "PAM", x: 91, y: 31, tier: "far" },
  { label: "CASB", x: 9, y: 31, tier: "far" },
  { label: "WAF", x: 65, y: 11, tier: "far" },
  { label: "MDM", x: 35, y: 11, tier: "far" },
  { label: "Backup", x: 6, y: 70, tier: "far" },
  { label: "SOAR", x: 94, y: 85, tier: "far" },
];

const CORE = { x: 500, y: 390 };

function pathFor(x: number, y: number): string {
  const X = x * 10;
  const Y = y * 7.8;
  const cx = (X + CORE.x) / 2 + (Y - CORE.y) * 0.12;
  const cy = (Y + CORE.y) / 2 - (X - CORE.x) * 0.12;
  return `M${X} ${Y} Q ${cx} ${cy} ${CORE.x} ${CORE.y}`;
}

function ProductsIntegrationFieldImpl() {
  return (
    <div
      className="pif"
      role="img"
      aria-label="A customer's existing security stack - SIEM, EDR, ticketing, identity, threat intel and more - plus AiRAT's Endpoint, Cloud and Agent planes, all flowing into the central CSOC intelligence core."
    >
      <svg className="pif__links" viewBox="0 0 1000 780" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <radialGradient id="pif-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#aeec1d" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#aeec1d" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#aeec1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {NODES.map((n, i) => {
          const d = pathFor(n.x, n.y);
          const isPlane = n.tier === "plane";
          return (
            <path
              key={`c${i}`}
              className={`pif-conn${isPlane ? " pif-conn--plane" : ""} pif-conn--${n.tier}`}
              d={d}
              style={isPlane ? { stroke: n.accent } : undefined}
            />
          );
        })}

        <circle className="pif-halo" cx={CORE.x} cy={CORE.y} r="170" fill="url(#pif-halo)" />
        <circle className="pif-ring" cx={CORE.x} cy={CORE.y} r="70" />
        <circle className="pif-ring pif-ring--2" cx={CORE.x} cy={CORE.y} r="70" />

        {NODES.map((n, i) => {
          const d = pathFor(n.x, n.y);
          const isPlane = n.tier === "plane";
          return (
            <circle
              key={`p${i}`}
              className={`pif-sig${isPlane ? " pif-sig--plane" : ""}`}
              r={isPlane ? 3 : 2.4}
              style={{ offsetPath: `path('${d}')`, animationDelay: `${(i % 7) * 0.45}s`, ...(isPlane ? { color: n.accent } : {}) } as React.CSSProperties}
            />
          );
        })}
      </svg>

      <div className="pif__chips">
        {NODES.map((n, i) => (
          <span
            key={`l${i}`}
            className={`pif-chip pif-chip--${n.tier}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, ...(n.accent ? ({ "--p": n.accent } as React.CSSProperties) : {}) }}
          >
            {n.label}
          </span>
        ))}

        <div className="pif-core">
          <span className="pif-core__name">CSOC</span>
          <span className="pif-core__sub">INTELLIGENCE CORE</span>
        </div>
      </div>
    </div>
  );
}

export const ProductsIntegrationField = memo(ProductsIntegrationFieldImpl);
