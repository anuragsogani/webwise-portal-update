/**
 * ProductsCoreDiagram - the SOC operating core with three integration layers
 * wired in. Signals flow from each layer into the core; the core pulses.
 * Pure inline SVG + CSS (products-page.css). Reduced-motion safe.
 */
import { memo } from "react";

type Layer = { id: string; label: string; x: number; y: number; accent: string };

const CX = 280;
const CY = 220;

const LAYERS: Layer[] = [
  { id: "xdr", label: "Endpoint", x: 280, y: 64, accent: "#46838c" },
  { id: "cspm", label: "Cloud", x: 466, y: 318, accent: "#c79a3e" },
  { id: "adr", label: "Agents", x: 94, y: 318, accent: "#17100d" },
];

function ProductsCoreDiagramImpl() {
  return (
    <svg className="pcd" viewBox="0 0 560 440" role="img" aria-label="The Autonomous SOC core with Agent Detection & Response, Cloud Security, and GRC layers integrated around it." xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="pcd-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aeec1d" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#aeec1d" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#aeec1d" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* connectors */}
      <g className="pcd-links" fill="none">
        {LAYERS.map((l) => (
          <line key={l.id} x1={l.x} y1={l.y} x2={CX} y2={CY} stroke={l.accent} />
        ))}
      </g>

      {/* signals flowing layer → core */}
      {LAYERS.map((l, i) => (
        <circle
          key={`s${l.id}`}
          className="pcd-signal"
          r={3}
          style={{
            offsetPath: `path('M${l.x} ${l.y} L${CX} ${CY}')`,
            animationDelay: `${i * 0.7}s`,
            fill: l.accent,
          } as React.CSSProperties}
        />
      ))}

      {/* core */}
      <circle className="pcd-coreHalo" cx={CX} cy={CY} r="120" fill="url(#pcd-halo)" />
      <circle className="pcd-ring" cx={CX} cy={CY} r="58" />
      <circle className="pcd-ring pcd-ring--2" cx={CX} cy={CY} r="58" />
      <rect className="pcd-core" x={CX - 44} y={CY - 44} width="88" height="88" rx="6" />
      <text className="pcd-core__label" x={CX} y={CY - 4} textAnchor="middle">
        CSOC
      </text>
      <text className="pcd-core__sub" x={CX} y={CY + 16} textAnchor="middle">
        CORE
      </text>

      {/* layer nodes */}
      {LAYERS.map((l) => (
        <g key={l.id} className="pcd-layer">
          <rect x={l.x - 30} y={l.y - 22} width="60" height="44" rx="5" style={{ stroke: l.accent }} />
          <text x={l.x} y={l.y + 5} textAnchor="middle" className="pcd-layer__label">
            {l.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export const ProductsCoreDiagram = memo(ProductsCoreDiagramImpl);
