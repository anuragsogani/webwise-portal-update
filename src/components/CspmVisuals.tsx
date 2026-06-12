/**
 * CspmVisuals - live visuals for the Cloud Security & Governance page.
 *  - CloudScanMap: clouds feeding a continuous scanner core.
 *  - PostureScan: a live scan streaming pass/fail check results.
 *  - FindingsPriority: raw findings ranked into the few that matter.
 * Pure SVG/HTML + CSS, reduced-motion safe. Accent inherits --prod-accent.
 */
import { memo } from "react";

const CLOUDS = [
  { label: "AWS", x: 250, y: 40 },
  { label: "Azure", x: 430, y: 120 },
  { label: "GCP", x: 430, y: 250 },
  { label: "K8s", x: 250, y: 320 },
  { label: "OCI", x: 70, y: 250 },
  { label: "M365", x: 70, y: 120 },
];
const SC = { x: 250, y: 185 };

function CloudScanMapImpl() {
  return (
    <svg className="ev-agent" viewBox="0 0 500 380" role="img" aria-label="Six clouds - AWS, Azure, GCP, Kubernetes, OCI and M365 - continuously scanned by one engine." xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cs-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c79a3e" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#c79a3e" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c79a3e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="ev-agent__links" fill="none">
        {CLOUDS.map((n, i) => (
          <line key={n.label} x1={SC.x} y1={SC.y} x2={n.x} y2={n.y} style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>
      {CLOUDS.map((n, i) => (
        <circle
          key={`s${n.label}`}
          className="ev-agent__sig"
          r="3"
          style={{ offsetPath: `path('M${n.x} ${n.y} L${SC.x} ${SC.y}')`, animationDelay: `${i * 0.4}s` } as React.CSSProperties}
        />
      ))}
      <circle className="ev-agent__halo" cx={SC.x} cy={SC.y} r="120" fill="url(#cs-halo)" />
      <circle className="ev-agent__ring" cx={SC.x} cy={SC.y} r="40" />
      <rect className="ev-agent__core" x={SC.x - 36} y={SC.y - 36} width="72" height="72" rx="6" />
      <text className="ev-agent__coreLabel" x={SC.x} y={SC.y - 2} textAnchor="middle">
        SCAN
      </text>
      <text className="ev-agent__coreSub" x={SC.x} y={SC.y + 16} textAnchor="middle">
        continuous
      </text>
      {CLOUDS.map((n) => (
        <g key={`n${n.label}`} className="ev-agent__node">
          <rect x={n.x - 40} y={n.y - 15} width="80" height="30" rx="4" />
          <text x={n.x} y={n.y + 4} textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
export const CloudScanMap = memo(CloudScanMapImpl);

const POSTURE_ROWS: [string, string, "pass" | "fail"][] = [
  ["s3-bucket-publicread", "public access", "fail"],
  ["rds-prod-01", "encryption at rest", "pass"],
  ["iam-role-deployer", "least privilege", "fail"],
  ["vpc-flowlogs", "logging enabled", "pass"],
  ["kms-key-rotation", "key rotation", "pass"],
  ["sg-ingress-0.0.0.0", "open to internet", "fail"],
];

function PostureScanImpl() {
  return (
    <div className="ev-term" role="img" aria-label="A live cloud posture scan streaming pass and fail results across resources.">
      <div className="ev-term__bar">
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__dot" />
        <span className="ev-term__title">posture · live scan</span>
      </div>
      <div className="ev-term__body">
        <div className="cs-scanbar">
          <span className="cs-scanbar__fill" />
        </div>
        <div className="ev-term__rows">
          {POSTURE_ROWS.map((r, i) => (
            <div key={r[0]} className="ev-term__row" style={{ animationDelay: `${0.5 + i * 0.22}s` }}>
              <span className="ev-term__host">{r[0]}</span>
              <span className="ev-term__val">{r[1]}</span>
              <span className={`ev-term__tag ${r[2] === "fail" ? "is-fail" : "is-pass"}`}>{r[2] === "fail" ? "FAIL" : "PASS"}</span>
            </div>
          ))}
        </div>
        <p className="ev-term__foot">
          <span className="ev-term__count">1,284</span> checks · <span className="cs-fail">37 findings</span> · 6 clouds
        </p>
      </div>
    </div>
  );
}
export const PostureScan = memo(PostureScanImpl);

const SEVERITIES = [
  { label: "Critical", count: 12, pct: 100, cls: "is-crit" },
  { label: "High", count: 48, pct: 64, cls: "is-high" },
  { label: "Medium", count: 310, pct: 40, cls: "is-med" },
  { label: "Low", count: 3630, pct: 22, cls: "is-low" },
];

function FindingsPriorityImpl() {
  return (
    <div className="cs-find" role="img" aria-label="Thousands of raw findings ranked by severity into twelve critical issues to fix first.">
      <div className="cs-find__head">
        <span className="cs-find__total">4,000 raw findings</span>
        <span className="cs-find__arrow">→</span>
        <span className="cs-find__focus">12 to fix first</span>
      </div>
      {SEVERITIES.map((s, i) => (
        <div key={s.label} className="cs-find__row">
          <span className="cs-find__label">{s.label}</span>
          <span className="cs-find__track">
            <span className={`cs-find__bar ${s.cls}`} style={{ ["--w" as string]: `${s.pct}%`, animationDelay: `${i * 0.15}s` }} />
          </span>
          <span className="cs-find__count">{s.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
export const FindingsPriority = memo(FindingsPriorityImpl);
