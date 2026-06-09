/**
 * EndpointVisuals — live, on-brand visuals for the Endpoint product page.
 *  - AgentMap: one agent feeding six capabilities and the CSOC core.
 *  - LiveQueryConsole: a fleet query streaming results back.
 *  - ActiveResponseFlow: detect → rule → admin gate → respond.
 * Pure SVG/HTML + CSS, reduced-motion safe. Teal endpoint accent.
 */
import { memo } from "react";

const ACCENT = "#46838c";

/* ── Agent capability map ─────────────────────────────────────── */
const AGENT_NODES = [
  { label: "Live query", x: 250, y: 40 },
  { label: "Integrity", x: 430, y: 120 },
  { label: "Telemetry", x: 430, y: 250 },
  { label: "Response", x: 250, y: 320 },
  { label: "Patching", x: 70, y: 250 },
  { label: "Remote ops", x: 70, y: 120 },
];
const AC = { x: 250, y: 185 };

function AgentMapImpl() {
  return (
    <svg className="ev-agent" viewBox="0 0 500 380" role="img" aria-label="One endpoint agent powering live query, integrity, telemetry, response, patching and remote operations, feeding the CSOC core." xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ev-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
          <stop offset="60%" stopColor={ACCENT} stopOpacity="0.04" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="ev-agent__links" fill="none">
        {AGENT_NODES.map((n, i) => (
          <line key={n.label} x1={AC.x} y1={AC.y} x2={n.x} y2={n.y} style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>

      {AGENT_NODES.map((n, i) => (
        <circle
          key={`s${n.label}`}
          className="ev-agent__sig"
          r="3"
          style={{ offsetPath: `path('M${AC.x} ${AC.y} L${n.x} ${n.y}')`, animationDelay: `${i * 0.45}s` } as React.CSSProperties}
        />
      ))}

      <circle className="ev-agent__halo" cx={AC.x} cy={AC.y} r="120" fill="url(#ev-halo)" />
      <circle className="ev-agent__ring" cx={AC.x} cy={AC.y} r="40" />
      <rect className="ev-agent__core" x={AC.x - 34} y={AC.y - 34} width="68" height="68" rx="6" />
      <text className="ev-agent__coreLabel" x={AC.x} y={AC.y - 2} textAnchor="middle">
        AGENT
      </text>
      <text className="ev-agent__coreSub" x={AC.x} y={AC.y + 16} textAnchor="middle">
        admin-only
      </text>

      {AGENT_NODES.map((n) => (
        <g key={`n${n.label}`} className="ev-agent__node">
          <rect x={n.x - 46} y={n.y - 15} width="92" height="30" rx="4" />
          <text x={n.x} y={n.y + 4} textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
export const AgentMap = memo(AgentMapImpl);

/* ── Live query console ───────────────────────────────────────── */
const QUERY_ROWS = [
  ["host-042", "chrome.exe", "121.0 · signed"],
  ["host-1187", "svc-update", "unsigned · flagged"],
  ["host-0098", "node.exe", "20.11 · signed"],
  ["host-2210", "pwsh.exe", "7.4 · signed"],
  ["host-0451", "unknown.bin", "no signature · flagged"],
];

function LiveQueryConsoleImpl() {
  return (
    <div className="ev-term" role="img" aria-label="A live fleet query returning process results from thousands of endpoints in under a second.">
      <div className="ev-term__bar">
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__title">fleet · live query</span>
      </div>
      <div className="ev-term__body">
        <p className="ev-term__prompt">
          <span className="ev-term__caret">›</span> processes <span className="ev-term__kw">where</span> signed = false
          <span className="ev-term__cursor" />
        </p>
        <div className="ev-term__rows">
          {QUERY_ROWS.map((r, i) => (
            <div key={r[0]} className="ev-term__row" style={{ animationDelay: `${0.6 + i * 0.22}s` }}>
              <span className="ev-term__host">{r[0]}</span>
              <span className="ev-term__val">{r[1]}</span>
              <span className={`ev-term__tag${r[2].includes("flag") ? " is-flag" : ""}`}>{r[2]}</span>
            </div>
          ))}
        </div>
        <p className="ev-term__foot">
          <span className="ev-term__count">4,812</span> endpoints answered · <span className="ev-term__time">0.9s</span>
        </p>
      </div>
    </div>
  );
}
export const LiveQueryConsole = memo(LiveQueryConsoleImpl);

/* ── Active response flow ─────────────────────────────────────── */
const RESPONSE_ACTIONS = ["Isolate host", "Kill process", "Quarantine file", "Disable account"];

function ActiveResponseFlowImpl() {
  return (
    <div className="ev-flow" role="img" aria-label="Active response flow: a detection passes through a rule and an admin gate, then triggers a configurable response.">
      <div className="ev-flow__track">
        <span className="ev-flow__pulse" />
      </div>
      <div className="ev-flow__stages">
        <div className="ev-flow__stage" style={{ ["--d" as string]: "0s" }}>
          <span className="ev-flow__node ev-flow__node--alert" />
          <span className="ev-flow__label">Detect</span>
        </div>
        <div className="ev-flow__stage" style={{ ["--d" as string]: "0.9s" }}>
          <span className="ev-flow__node" />
          <span className="ev-flow__label">Rule</span>
        </div>
        <div className="ev-flow__stage" style={{ ["--d" as string]: "1.8s" }}>
          <span className="ev-flow__node ev-flow__node--gate" />
          <span className="ev-flow__label">Admin gate</span>
        </div>
        <div className="ev-flow__stage" style={{ ["--d" as string]: "2.7s" }}>
          <span className="ev-flow__node ev-flow__node--act" />
          <span className="ev-flow__label ev-flow__label--act">
            <span className="ev-flow__actions">
              {RESPONSE_ACTIONS.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
export const ActiveResponseFlow = memo(ActiveResponseFlowImpl);
