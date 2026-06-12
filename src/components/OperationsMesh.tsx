/**
 * OperationsMesh - wide services hero centrepiece.
 * A sprawling constellation: four pillar nodes route signal through an
 * organic network into a central AiRAT core. Reads as "fragmented systems,
 * one intelligent operation." Pure inline SVG + CSS (services-page.css).
 * Fully reduced-motion safe.
 */
import { BRAND_LOGO_ROUND, BRAND_NAME } from "../content/brandAssets";

const CX = 380;
const CY = 290;

type Pillar = { id: string; label: string; x: number; y: number; accent: string; anchor: "start" | "end" };

const PILLARS: Pillar[] = [
  { id: "ai", label: "AI", x: 150, y: 70, accent: "var(--svc-ai)", anchor: "start" },
  { id: "security", label: "SECURITY", x: 640, y: 70, accent: "var(--svc-security)", anchor: "start" },
  { id: "platform", label: "PLATFORM", x: 150, y: 512, accent: "var(--svc-platform)", anchor: "start" },
  { id: "data", label: "DATA", x: 640, y: 512, accent: "var(--svc-data)", anchor: "start" },
];

/* rounded-elbow route from a pillar into the core */
function routeTo(x: number, y: number) {
  const midX = (x + CX) / 2;
  const dirY = y < CY ? 1 : -1;
  const bendY = y + (CY - y) * 0.55 * dirY * dirY;
  return `M ${x} ${y} C ${midX} ${y}, ${x + (CX - x) * 0.25} ${bendY}, ${CX} ${CY}`;
}

/* faint background constellation - organic scatter + thin links */
const FIELD: { x: number; y: number; r: number; solid?: boolean }[] = [
  { x: 250, y: 150, r: 4 }, { x: 330, y: 110, r: 3, solid: true }, { x: 300, y: 210, r: 5 },
  { x: 210, y: 250, r: 4, solid: true }, { x: 160, y: 330, r: 5 }, { x: 250, y: 360, r: 3 },
  { x: 470, y: 130, r: 4 }, { x: 540, y: 180, r: 5, solid: true }, { x: 600, y: 250, r: 4 },
  { x: 510, y: 300, r: 3 }, { x: 470, y: 380, r: 5 }, { x: 560, y: 420, r: 4, solid: true },
  { x: 300, y: 430, r: 4 }, { x: 360, y: 480, r: 5, solid: true }, { x: 250, y: 470, r: 3 },
  { x: 620, y: 350, r: 4 }, { x: 200, y: 410, r: 3 }, { x: 430, y: 230, r: 3, solid: true },
];
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [2, 17], [17, 6], [6, 7], [7, 8],
  [8, 9], [9, 17], [9, 10], [10, 11], [10, 12], [12, 13], [13, 14], [11, 15], [15, 8], [16, 4], [12, 16],
];

/* lime accent packets sitting along the routes */
const PACKETS = [
  { x: 246, y: 262, d: 0 }, { x: 286, y: 470, d: 0.6 }, { x: 470, y: 318, d: 1.2 },
  { x: 1238 / 2 - 90, y: 196, d: 0.9 }, { x: 540, y: 300, d: 1.6 },
];

export default function OperationsMesh() {
  return (
    <svg
      className="ops-mesh"
      viewBox="0 0 760 580"
      role="img"
      aria-label={`Four operational domains - security, AI, data, and platform - routing signal into a central ${BRAND_NAME} operations core.`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ops-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
          <stop offset="55%" stopColor="var(--color-primary)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ops-core-clip">
          <circle cx={CX} cy={CY} r="30" />
        </clipPath>
      </defs>

      {/* faint constellation */}
      <g className="ops-mesh__field" aria-hidden="true">
        {LINKS.map(([a, b], i) => (
          <line key={i} x1={FIELD[a].x} y1={FIELD[a].y} x2={FIELD[b].x} y2={FIELD[b].y} />
        ))}
        {FIELD.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            className={n.solid ? "ops-mesh__dot ops-mesh__dot--solid" : "ops-mesh__dot"}
            style={{ animationDelay: `${(i % 6) * 0.5}s` }}
          />
        ))}
      </g>

      {/* accent routes pillar → core */}
      <g className="ops-mesh__links" fill="none" strokeLinecap="round">
        {PILLARS.map((p, i) => (
          <path key={p.id} d={routeTo(p.x, p.y)} stroke={p.accent} style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </g>

      {/* lime packets riding the field */}
      <g className="ops-mesh__packets" aria-hidden="true">
        {PACKETS.map((p, i) => (
          <rect key={i} x={p.x - 4} y={p.y - 4} width="8" height="8" style={{ animationDelay: `${p.d}s` }} />
        ))}
      </g>

      {/* core */}
      <circle className="ops-mesh__glow" cx={CX} cy={CY} r="150" fill="url(#ops-core-glow)" />
      <circle className="ops-mesh__ring" cx={CX} cy={CY} r="52" />
      <circle className="ops-mesh__ring ops-mesh__ring--2" cx={CX} cy={CY} r="52" />
      <g className="ops-mesh__diamond">
        <rect x={CX - 30} y={CY - 30} width="60" height="60" className="ops-mesh__diamond-box" />
      </g>
      <circle className="ops-mesh__core-disc" cx={CX} cy={CY} r="30" />
      <image
        href={BRAND_LOGO_ROUND}
        x={CX - 28}
        y={CY - 28}
        width="56"
        height="56"
        clipPath="url(#ops-core-clip)"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      />

      {/* pillar nodes */}
      <g className="ops-mesh__nodes">
        {PILLARS.map((p, i) => (
          <g key={p.id} className="ops-mesh__node" style={{ animationDelay: `${i * 0.5}s` }}>
            <rect x={p.x - 14} y={p.y - 14} width="28" height="28" style={{ stroke: p.accent }} />
            <rect
              x={p.x - 5}
              y={p.y - 5}
              width="10"
              height="10"
              className="ops-mesh__node-fill"
              style={{ fill: p.accent }}
            />
            <text x={p.x + 24} y={p.y + 4} textAnchor={p.anchor} className="ops-mesh__node-label">
              {p.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
