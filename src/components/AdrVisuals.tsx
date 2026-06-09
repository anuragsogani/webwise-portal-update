/**
 * AdrVisuals — live visuals for the Agent Detection & Response page.
 *  - AgentWorkforceMap: the AI workforce monitored by a governance core.
 *  - AgentTrace: a live agent session with one tool call blocked by policy.
 *  - GovernFlow: tool call → policy → decision → audit.
 * Pure SVG/HTML + CSS, reduced-motion safe. Ink structure, lime signals.
 */
import { memo } from "react";

const AGENTS = [
  { label: "Agents", x: 250, y: 40 },
  { label: "MCP servers", x: 430, y: 120 },
  { label: "Copilots", x: 430, y: 250 },
  { label: "RAG", x: 250, y: 320 },
  { label: "Workflows", x: 70, y: 250 },
  { label: "Models", x: 70, y: 120 },
];
const GC = { x: 250, y: 185 };

function AgentWorkforceMapImpl() {
  return (
    <svg className="ev-agent" viewBox="0 0 500 380" role="img" aria-label="Agents, MCP servers, copilots, RAG, workflows and models monitored and governed by one ADR core." xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="adr-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#aeec1d" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#aeec1d" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#aeec1d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="ev-agent__links" fill="none">
        {AGENTS.map((n, i) => (
          <line key={n.label} x1={GC.x} y1={GC.y} x2={n.x} y2={n.y} style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      {AGENTS.map((n, i) => (
        <circle
          key={`s${n.label}`}
          className="ev-agent__sig"
          r="3"
          style={{ offsetPath: `path('M${n.x} ${n.y} L${GC.x} ${GC.y}')`, animationDelay: `${i * 0.4}s` } as React.CSSProperties}
        />
      ))}
      <circle className="ev-agent__halo" cx={GC.x} cy={GC.y} r="120" fill="url(#adr-halo)" />
      <circle className="ev-agent__ring" cx={GC.x} cy={GC.y} r="40" />
      <rect className="ev-agent__core" x={GC.x - 36} y={GC.y - 36} width="72" height="72" rx="6" />
      <text className="ev-agent__coreLabel" x={GC.x} y={GC.y - 2} textAnchor="middle">
        ADR
      </text>
      <text className="ev-agent__coreSub" x={GC.x} y={GC.y + 16} textAnchor="middle">
        governance
      </text>
      {AGENTS.map((n) => (
        <g key={`n${n.label}`} className="ev-agent__node">
          <rect x={n.x - 48} y={n.y - 15} width="96" height="30" rx="4" />
          <text x={n.x} y={n.y + 4} textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
export const AgentWorkforceMap = memo(AgentWorkforceMapImpl);

const TRACE: [string, string, "ok" | "block"][] = [
  ["prompt", "user request received", "ok"],
  ["retrieve", "policy + knowledge base", "ok"],
  ["tool · read_tickets", "scope: support", "ok"],
  ["tool · export_customers", "blocked by policy", "block"],
  ["reasoning", "re-plan within scope", "ok"],
  ["respond", "answer returned", "ok"],
];

function AgentTraceImpl() {
  return (
    <div className="ev-term" role="img" aria-label="A live agent session where one tool call to export customer data is blocked by policy.">
      <div className="ev-term__bar">
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__title">agent session · live</span>
      </div>
      <div className="ev-term__body">
        <div className="ev-term__rows">
          {TRACE.map((r, i) => (
            <div key={r[0]} className="ev-term__row" style={{ animationDelay: `${0.4 + i * 0.28}s` }}>
              <span className="ev-term__host">{r[0]}</span>
              <span className="ev-term__val">{r[1]}</span>
              <span className={`ev-term__tag ${r[2] === "block" ? "is-fail" : "is-pass"}`}>{r[2] === "block" ? "BLOCKED" : "OK"}</span>
            </div>
          ))}
        </div>
        <p className="ev-term__foot">
          <span className="ev-term__count">session #a91f</span> · <span className="cs-fail">1 blocked</span> · policy enforced
        </p>
      </div>
    </div>
  );
}
export const AgentTrace = memo(AgentTraceImpl);

const DECISIONS = ["Allow", "Approve", "Block", "Audit"];

function GovernFlowImpl() {
  return (
    <div className="ev-flow" role="img" aria-label="Governance flow: a tool call passes through policy and a decision, then is audited.">
      <div className="ev-flow__track">
        <span className="ev-flow__pulse" />
      </div>
      <div className="ev-flow__stages">
        <div className="ev-flow__stage">
          <span className="ev-flow__node ev-flow__node--alert" style={{ animationDelay: "0s" }} />
          <span className="ev-flow__label">Tool call</span>
        </div>
        <div className="ev-flow__stage">
          <span className="ev-flow__node ev-flow__node--gate" style={{ animationDelay: "0.9s" }} />
          <span className="ev-flow__label">Policy</span>
        </div>
        <div className="ev-flow__stage">
          <span className="ev-flow__node" style={{ animationDelay: "1.8s" }} />
          <span className="ev-flow__label ev-flow__label--act">
            <span className="ev-flow__actions ev-flow__actions--3">
              {DECISIONS.slice(0, 3).map((a) => (
                <span key={a}>{a}</span>
              ))}
            </span>
          </span>
        </div>
        <div className="ev-flow__stage">
          <span className="ev-flow__node ev-flow__node--act" style={{ animationDelay: "2.7s" }} />
          <span className="ev-flow__label">Audit</span>
        </div>
      </div>
    </div>
  );
}
export const GovernFlow = memo(GovernFlowImpl);
