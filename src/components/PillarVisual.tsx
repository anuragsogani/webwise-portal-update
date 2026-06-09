/**
 * PillarVisual — bespoke "before → order" live panels for the services pillars.
 * Each panel animates the exact transformation the pillar sells. The colour
 * adopts the section's --svc-accent. Pure inline SVG + CSS (services-page.css).
 * Reduced-motion safe (animations disabled, end-state shown).
 */

type Meta = { title: string; sub: string; foot: string };

const META: Record<string, Meta> = {
  security: {
    title: "Noise, correlated to signal",
    sub: "Thousands of alerts → the few that matter",
    foot: "AiRAT · correlation engine",
  },
  ai: {
    title: "Every request, through governance",
    sub: "Retrieve · evaluate · review · ship",
    foot: "AiRAT · governed pipeline",
  },
  data: {
    title: "One agreed source of truth",
    sub: "Bronze → silver → gold promotion",
    foot: "AiRAT · medallion layers",
  },
  platform: {
    title: "Scale that stays in order",
    sub: "Ten engineers to fifty, without chaos",
    foot: "AiRAT · platform fabric",
  },
};

function Panel({ id, children }: { id: string; children: React.ReactNode }) {
  const m = META[id];
  return (
    <div className="pillar-panel" data-viz={id}>
      <div className="pillar-panel__head">
        <p className="pillar-panel__title">{m.title}</p>
        <p className="pillar-panel__sub label-mono">{m.sub}</p>
      </div>
      <div className="pillar-panel__body">{children}</div>
      <p className="pillar-panel__foot label-mono">{m.foot}</p>
    </div>
  );
}

/* ── Security: many alerts collapse into one incident ─────────── */
function SecurityViz() {
  const cols = [28, 56, 84, 112, 140];
  const rows = [34, 64, 94, 124];
  const hot = new Set(["1-0", "3-1", "2-3"]);
  return (
    <svg viewBox="0 0 360 170" className="pv-svg" aria-hidden="true">
      <g className="pv-sec-grid">
        {rows.map((y, ri) =>
          cols.map((x, ci) => {
            const isHot = hot.has(`${ci}-${ri}`);
            return (
              <rect
                key={`${ci}-${ri}`}
                x={x}
                y={y}
                width="11"
                height="11"
                rx="1.5"
                className={isHot ? "pv-alert pv-alert--hot" : "pv-alert"}
                style={{ animationDelay: `${(ri + ci) * 0.18}s` }}
              />
            );
          }),
        )}
        <rect className="pv-scan" x="20" y="26" width="2.5" height="110" />
      </g>
      <g className="pv-links" fill="none">
        <path d="M125 39 C 210 39, 230 95, 286 95" />
        <path d="M157 75 C 220 75, 240 95, 286 95" />
        <path d="M101 130 C 200 130, 235 100, 286 95" />
      </g>
      <g className="pv-incident">
        <rect x="286" y="72" width="56" height="46" rx="3" />
        <text x="314" y="100" className="pv-incident__num">
          1
        </text>
      </g>
      <text x="314" y="135" className="pv-cap" textAnchor="middle">
        incident
      </text>
      <text x="84" y="158" className="pv-cap" textAnchor="middle">
        2,847 signals
      </text>
    </svg>
  );
}

/* ── AI: a request flows through governance gates ─────────────── */
function AiViz() {
  const gates = [
    { x: 118, label: "retrieve", cls: "pv-g1" },
    { x: 196, label: "evaluate", cls: "pv-g2" },
    { x: 274, label: "review", cls: "pv-g3" },
  ];
  return (
    <svg viewBox="0 0 360 180" className="pv-svg pv-ai" aria-hidden="true">
      <line className="pv-track" x1="40" y1="70" x2="330" y2="70" />
      <line className="pv-track pv-track--flow" x1="40" y1="70" x2="330" y2="70" />

      <g className="pv-origin">
        <rect x="28" y="58" width="24" height="24" rx="3" />
        <text x="40" y="104" className="pv-cap" textAnchor="middle">
          prompt
        </text>
      </g>

      {gates.map((g) => (
        <g key={g.label} className={`pv-gate ${g.cls}`}>
          <rect x={g.x - 13} y="57" width="26" height="26" rx="3" />
          <text x={g.x} y="104" className="pv-cap" textAnchor="middle">
            {g.label}
          </text>
        </g>
      ))}

      <g className="pv-ship">
        <rect x="320" y="56" width="28" height="28" rx="3" />
        <text x="334" y="104" className="pv-cap" textAnchor="middle">
          ship
        </text>
      </g>

      {/* rejection: the bad request is deflected up into the shield */}
      <g className="pv-reject">
        <path d="M198 54 C 206 40, 214 38, 222 38" fill="none" strokeDasharray="3 3" strokeWidth="1.2" />
        <path
          className="pv-shield"
          d="M226 12 L240 17 L240 28 C240 37 234 42 226 45 C218 42 212 37 212 28 L212 17 Z"
        />
        <path className="pv-shield-check" d="M220 27 l4 4 l8 -9" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="248" y="32" className="pv-cap pv-reject-cap" textAnchor="start">
          rejected
        </text>
      </g>

      {/* good request ships, bad request is caught */}
      <circle className="pv-tok-good" cx="40" cy="70" r="5.5" />
      <circle className="pv-tok-bad" cx="40" cy="70" r="5.5" />

      <text x="180" y="150" className="pv-cap" textAnchor="middle">
        observable · auditable · production-safe
      </text>
    </svg>
  );
}

/* ── Data: raw values refine and converge into one trusted figure ─ */
const DATA_FUNNELS = [
  "M60 150 Q120 104 180 44",
  "M110 154 Q150 106 180 44",
  "M160 150 Q172 104 180 44",
  "M210 154 Q196 104 180 44",
  "M262 150 Q224 104 180 44",
  "M86 152 Q140 104 180 44",
  "M236 152 Q210 104 180 44",
];

function DataViz() {
  return (
    <svg viewBox="0 0 360 180" className="pv-svg pv-data" aria-hidden="true">
      <text className="pv-stage" x="40" y="48">GOLD</text>
      <text className="pv-stage" x="40" y="104">SILVER</text>
      <text className="pv-stage" x="40" y="150">BRONZE</text>

      {/* converging refinement guides */}
      {DATA_FUNNELS.map((d, i) => (
        <path key={i} className="pv-funnel" d={d} fill="none" />
      ))}

      {/* raw, inconsistent inputs at the bronze layer */}
      <g className="pv-raw">
        {[60, 86, 110, 136, 160, 186, 210, 236, 262].map((x, i) => (
          <rect
            key={x}
            x={x - 3}
            y={146 + ((i * 7) % 9)}
            width="6"
            height="6"
            rx="1"
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}
      </g>

      {/* silver consolidation */}
      <circle className="pv-silver" cx="150" cy="100" r="3.4" />
      <circle className="pv-silver" cx="210" cy="100" r="3.4" style={{ animationDelay: "0.7s" }} />

      {/* particles streaming up the funnels */}
      {DATA_FUNNELS.map((d, i) => (
        <circle
          key={`p${i}`}
          className="pv-flowdot"
          r={2.4}
          style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.5}s` } as React.CSSProperties}
        />
      ))}

      {/* the single agreed gold figure */}
      <g className="pv-goldnode">
        <rect x="132" y="30" width="96" height="28" rx="4" />
        <text x="180" y="49" className="pv-goldfig" textAnchor="middle">
          $4.20M
        </text>
      </g>
    </svg>
  );
}

/* ── Platform: a few services scale into an ordered lattice ────── */
function PlatformViz() {
  const cols = [150, 184, 218, 252, 286, 320];
  const rows = [78, 112, 146];
  return (
    <svg viewBox="0 0 360 180" className="pv-svg pv-platform" aria-hidden="true">
      {/* deploy pipeline */}
      <line className="pv-pipe" x1="40" y1="40" x2="320" y2="40" />
      <line className="pv-pipe pv-pipe--flow" x1="40" y1="40" x2="320" y2="40" />
      <g className="pv-pipe-check">
        <circle cx="320" cy="40" r="9" />
        <path d="M316 40 l3 3 l5 -6" fill="none" />
      </g>

      {/* alignment guides — the order beneath the growth */}
      <g className="pv-guides">
        {cols.map((x) => (
          <line key={`v${x}`} x1={x + 8} y1="64" x2={x + 8} y2="162" />
        ))}
        {rows.map((y) => (
          <line key={`h${y}`} x1="100" y1={y + 8} x2="334" y2={y + 8} />
        ))}
      </g>

      {/* containing bracket that scales with the lattice */}
      <path className="pv-bracket" d="M104 66 L96 66 L96 162 L104 162" fill="none" />
      <path className="pv-bracket" d="M330 66 L338 66 L338 162 L330 162" fill="none" />

      {/* seed services */}
      <g className="pv-seed">
        {rows.map((y) => (
          <rect key={`s${y}`} x="56" y={y} width="16" height="16" rx="2.5" />
        ))}
      </g>

      {/* the lattice grows column by column, always aligned */}
      {rows.map((y, ri) =>
        cols.map((x, ci) => (
          <rect
            key={`${ci}-${ri}`}
            x={x}
            y={y}
            width="16"
            height="16"
            rx="2.5"
            className="pv-cell"
            style={{ animationDelay: `${ci * 0.42 + ri * 0.12}s` }}
          />
        )),
      )}
    </svg>
  );
}

const VIZ: Record<string, () => JSX.Element> = {
  security: SecurityViz,
  ai: AiViz,
  data: DataViz,
  platform: PlatformViz,
};

export default function PillarVisual({ id }: { id: string }) {
  const Viz = VIZ[id];
  if (!Viz) return null;
  return (
    <Panel id={id}>
      <Viz />
    </Panel>
  );
}
