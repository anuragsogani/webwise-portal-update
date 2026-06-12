/**
 * CsocFunnel - a live mini-console for the CSOC core: thousands of raw alerts
 * on the left funnel through an AI triage node and resolve into a handful of
 * prioritized incidents on the right. Signals shift grey → lime as they pass
 * triage (raw telemetry becoming intelligence). Pure SVG + CSS, reduced-motion
 * safe.
 */
import { memo } from "react";

const ALERT_COLS = [24, 38, 52, 66, 80];
const ALERT_ROWS = [40, 56, 72, 88, 104, 120, 136, 152];
const TRIAGE = { x: 188, y: 100 };
const INC_Y = [60, 100, 140];
const INC_X = 300;

const FEED_PATHS = [
  `M86 60 Q150 70 ${TRIAGE.x} ${TRIAGE.y}`,
  `M86 100 L${TRIAGE.x} ${TRIAGE.y}`,
  `M86 140 Q150 130 ${TRIAGE.x} ${TRIAGE.y}`,
  `M72 88 Q150 96 ${TRIAGE.x} ${TRIAGE.y}`,
];
const OUT_PATHS = INC_Y.map((y) => `M${TRIAGE.x} ${TRIAGE.y} Q255 ${(TRIAGE.y + y) / 2} ${INC_X} ${y}`);

function CsocFunnelImpl() {
  return (
    <svg className="cf" viewBox="0 0 380 200" role="img" aria-label="Thousands of daily alerts funnel through AI triage into twelve prioritized incidents." xmlns="http://www.w3.org/2000/svg">
      <text className="cf-lbl" x="22" y="28">ALERTS</text>
      <text className="cf-lbl" x="22" y="178">≈ 2,000 / day</text>
      <text className="cf-lbl cf-lbl--mid" x="188" y="166" textAnchor="middle">AI TRIAGE</text>
      <text className="cf-lbl cf-lbl--accent" x="300" y="178" textAnchor="middle">12 INCIDENTS</text>

      {/* raw alert field */}
      <g className="cf-field">
        {ALERT_ROWS.map((y) =>
          ALERT_COLS.map((x) => (
            <rect key={`${x}-${y}`} className="cf-alert" x={x} y={y} width="4" height="4" rx="1" style={{ animationDelay: `${((x + y) % 9) * 0.32}s` }} />
          )),
        )}
        <rect className="cf-scan" x="18" y="34" width="2" height="124" />
      </g>

      {/* funnel + fan guides */}
      <g>
        {FEED_PATHS.map((d, i) => (
          <path key={`f${i}`} className="cf-funnel" d={d} />
        ))}
        {OUT_PATHS.map((d, i) => (
          <path key={`o${i}`} className="cf-fan" d={d} />
        ))}
      </g>

      {/* triage core */}
      <circle className="cf-ring" cx={TRIAGE.x} cy={TRIAGE.y} r="22" />
      <rect className="cf-triage" x={TRIAGE.x - 15} y={TRIAGE.y - 15} width="30" height="30" rx="3" />

      {/* prioritized incidents */}
      {INC_Y.map((y, i) => (
        <g key={`inc${y}`}>
          <rect className="cf-inc" x={INC_X - 16} y={y - 13} width="68" height="26" rx="3" style={{ animationDelay: `${i * 0.5}s` }} />
          <circle className="cf-incdot" cx={INC_X - 4} cy={y} r="3" />
          <text className="cf-inc__t" x={INC_X + 8} y={y + 4}>
            INC-{(i + 1).toString().padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* signals: grey into triage, lime out to incidents */}
      {FEED_PATHS.map((d, i) => (
        <circle key={`sg${i}`} className="cf-sigG" r="2.2" style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.5}s` } as React.CSSProperties} />
      ))}
      {OUT_PATHS.map((d, i) => (
        <circle key={`sl${i}`} className="cf-sigL" r="2.6" style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.6 + 0.4}s` } as React.CSSProperties} />
      ))}
    </svg>
  );
}

export const CsocFunnel = memo(CsocFunnelImpl);
