import type { ReactElement } from "react";
import type { TeamDoodlePreset } from "../content/aboutPageCopy";

type Props = {
  title: string;
  preset: TeamDoodlePreset;
};

const ink = "#16161a";
const sw = 1.35;

function SvgWrap({ cls, children }: { cls: string; children: React.ReactNode }) {
  return (
    <span className={`team-doodle ${cls}`}>
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {children}
      </svg>
    </span>
  );
}

function ArtifactWrap({ cls, children }: { cls: string; children: React.ReactNode }) {
  return (
    <span className={`team-artifact ${cls}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </span>
  );
}

function CenterWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="team-visual__centerpiece" aria-hidden="true">
      <svg className="team-visual__centerpiece-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </div>
  );
}

function CenterAiml() {
  return (
    <CenterWrap>
      <rect x="14" y="12" width="92" height="92" rx="16" fill="#b8cbc4" />
      <rect x="26" y="24" width="68" height="72" rx="9" fill="#f7f2eb" />
      <path
        d="M43 51 C43 42 50 35 59 35 C66 35 72 39 74 46 C80 47 85 53 85 60 C85 69 78 76 69 76 H51 C42 76 35 69 35 60 C35 54 39 49 45 47"
        stroke={ink}
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M51 46 V66 M59 42 V69 M67 46 V66" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M51 55 H67 M47 60 H71" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
      <circle cx="59" cy="78" r="4.8" fill="#e6eef6" stroke={ink} strokeWidth={1.4} />
      <path d="M63 74 L72 66" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="74.5" cy="64.5" r="2.5" fill="#e6eef6" stroke={ink} strokeWidth={1.2} />
      <rect x="78" y="30" width="13" height="12" rx="2" fill="#f0e8dc" stroke={ink} strokeWidth={1.3} />
      <path d="M81 36 H88" stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
    </CenterWrap>
  );
}

function CenterCyber() {
  return (
    <CenterWrap>
      <rect x="14" y="12" width="92" height="92" rx="16" fill="#dbc2c7" />
      <path
        d="M32 57 C32 48 39 42 48 42 C52 34 59 30 68 30 C81 30 92 40 92 53 C97 55 100 60 100 66 C100 75 93 82 84 82 H47 C37 82 29 74 29 64 C29 61 30 59 32 57 Z"
        fill="#f7f2eb"
        stroke={ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M44 58 H62 M44 65 H58" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M68 47 L84 53 V65 C84 73 78 79 68 83 C58 79 52 73 52 65 V53 L68 47 Z" fill="#e8eef8" stroke={ink} strokeWidth={1.9} />
      <path d="M62 65 L67 70 L75 60" stroke={ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="78" r="3.4" stroke={ink} strokeWidth={1.4} />
      <circle cx="49" cy="78" r="3.4" stroke={ink} strokeWidth={1.4} />
      <path d="M43 78 H46" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
    </CenterWrap>
  );
}

/** ELK / search  -  premium “research lens” mark (neutral plate + signal + grid hint). */
function CenterElk() {
  const panel = { x: 32, y: 42, w: 56, h: 34, rx: 7 };
  return (
    <CenterWrap>
      <g className="team-center-elk">
        <g className="team-center-elk__card">
          <rect
            x="24"
            y="34"
            width="72"
            height="52"
            rx="12"
            fill="#ebe9e4"
            stroke="#c5c1b8"
            strokeWidth={1.1}
          />
        </g>
        <g className="team-center-elk__panel">
          <rect
            x={panel.x}
            y={panel.y}
            width={panel.w}
            height={panel.h}
            rx={panel.rx}
            fill="#f7f6f3"
            stroke="#dad7d0"
            strokeWidth={0.9}
          />
        </g>
        <g className="team-center-elk__grid" opacity={0.32}>
          {[46, 54, 62].map((y) => (
            <path key={`h-${y}`} d={`M${panel.x + 4} ${y} H${panel.x + panel.w - 4}`} stroke="#94a3b8" strokeWidth={0.55} strokeLinecap="round" />
          ))}
          {[38, 46, 54, 62, 70].map((x) => (
            <path key={`v-${x}`} d={`M${x} ${panel.y + 4} V${panel.y + panel.h - 4}`} stroke="#94a3b8" strokeWidth={0.55} strokeLinecap="round" />
          ))}
        </g>
        <g className="team-center-elk__signal">
          <path
            d="M 36 60 L 44 56 L 50 58 L 56 52 L 62 54"
            fill="none"
            stroke="#4aa89f"
            strokeWidth={1.1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g className="team-center-elk__focus">
          <circle cx="62" cy="54" r="2.25" fill="#76e4df" stroke={ink} strokeWidth={0.75} />
        </g>
        <g className="team-center-elk__lens">
          <circle cx="76" cy="58" r="11.5" fill="rgba(252, 252, 250, 0.72)" stroke={ink} strokeWidth={1.3} />
          <path d="M 84.2 65.2 L 95.5 76" stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
        </g>
      </g>
    </CenterWrap>
  );
}

function CenterData() {
  return (
    <CenterWrap>
      <rect x="14" y="12" width="92" height="92" rx="16" fill="#cac9de" />
      <rect x="24" y="24" width="72" height="72" rx="10" fill="#f7f2eb" />
      <ellipse cx="48" cy="40" rx="15" ry="5" fill="#e6c089" stroke={ink} strokeWidth={1.3} />
      <path d="M33 40 V58 C33 61 63 61 63 58 V40" fill="#ecd2a8" stroke={ink} strokeWidth={1.3} />
      <ellipse cx="48" cy="58" rx="15" ry="5" fill="#d7d9df" stroke={ink} strokeWidth={1.3} />
      <path d="M64 45 H76 M64 52 H76 M64 59 H76" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M72 42 L77 45 L72 48 M72 49 L77 52 L72 55 M72 56 L77 59 L72 62" stroke={ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="66" y="69" width="20" height="16" rx="2.2" fill="#eef3f9" stroke={ink} strokeWidth={1.3} />
      <path d="M70 80 L73 75 L76 77 L81 71" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 73 H82" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
    </CenterWrap>
  );
}

function CenterDb() {
  return (
    <CenterWrap>
      <ellipse cx="60" cy="34" rx="28" ry="10" fill="#bfdbfe" stroke={ink} strokeWidth={1.4} />
      <path d="M32 34 V70 C32 76 88 76 88 70 V34" fill="#dbeafe" stroke={ink} strokeWidth={1.4} />
      <path d="M32 52 C32 58 88 58 88 52" stroke={ink} strokeWidth={1.1} fill="none" />
      <path d="M32 70 C32 76 88 76 88 70" stroke={ink} strokeWidth={1.1} fill="none" />
      <rect x="44" y="78" width="32" height="14" rx="3" fill="#fde68a" stroke={ink} strokeWidth={1.2} />
    </CenterWrap>
  );
}

function CenterBackend() {
  return (
    <CenterWrap>
      <rect x="30" y="34" width="60" height="52" rx="8" fill="#fef3c7" stroke={ink} strokeWidth={1.5} />
      <path d="M42 48 H78 M42 58 H72 M42 68 H66" stroke={ink} strokeWidth={1.3} strokeLinecap="round" />
      <path
        d="M48 22 L44 30 H52 L48 38 M72 22 L76 30 H68 L72 38"
        stroke={ink}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </CenterWrap>
  );
}

function CenterFrontend() {
  return (
    <CenterWrap>
      <rect x="40" y="28" width="40" height="72" rx="10" fill="#e4e9f0" stroke={ink} strokeWidth={1.45} />
      <rect x="46" y="36" width="28" height="40" rx="4" fill="#fafaf8" stroke="#cfd6e0" strokeWidth={0.95} />
      <circle cx="52" cy="88" r="4" fill="#d1d9e4" stroke={ink} strokeWidth={1} />
      <circle cx="54" cy="48" r="3.5" fill="#b8cfe8" stroke={ink} strokeWidth={0.95} />
      <circle cx="66" cy="56" r="3.5" fill="#76e4df" stroke={ink} strokeWidth={0.95} />
      <circle cx="58" cy="66" r="3.5" fill="#c5d4e8" stroke={ink} strokeWidth={0.95} />
    </CenterWrap>
  );
}

function CenterDevops() {
  return (
    <CenterWrap>
      <rect x="14" y="12" width="92" height="92" rx="16" fill="#c6d6e5" />
      <path
        d="M35 58 C35 50 42 45 50 45 C53 38 59 34 67 34 C79 34 88 43 88 54 C92 56 95 60 95 65 C95 73 89 79 81 79 H51 C42 79 35 72 35 63"
        fill="#f7f2eb"
        stroke={ink}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="48" cy="85" r="6.3" fill="#f8f1d7" stroke={ink} strokeWidth={1.4} />
      <path d="M48 79 V91 M42 85 H54 M44 81 L52 89 M52 81 L44 89" stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
      <path d="M58 85 H78" stroke={ink} strokeWidth={1.6} strokeLinecap="round" />
      <path d="M74 82 L79 85 L74 88" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="62" y="46" width="18" height="15" rx="2.2" fill="#e9edf4" stroke={ink} strokeWidth={1.2} />
      <path d="M66 51 H76 M66 56 H73" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
    </CenterWrap>
  );
}

const CENTER_MAP: Record<TeamDoodlePreset, () => ReactElement> = {
  aiml: CenterAiml,
  cyber: CenterCyber,
  elk: CenterElk,
  data: CenterData,
  db: CenterDb,
  backend: CenterBackend,
  frontend: CenterFrontend,
  devops: CenterDevops,
};

function DoodlesAiml() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <rect x="10" y="10" width="28" height="26" rx="3" fill="#f0e8dc" stroke={ink} strokeWidth={sw} />
        <path d="M15 17 H32 M15 23 H28" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <circle cx="24" cy="24" r="12" fill="#f7f2eb" stroke={ink} strokeWidth={sw} />
        <circle cx="24" cy="24" r="4" fill="#b8cbc4" stroke={ink} strokeWidth={1} />
        <circle cx="14" cy="18" r="3" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
        <circle cx="34" cy="18" r="3" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
        <path d="M17 22 L22 24 L30 20" stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <path d="M10 24 H34" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeDasharray="3 3" />
        <circle cx="12" cy="24" r="2.4" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
        <circle cx="34" cy="24" r="2.4" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <path d="M12 30 L19 16 L27 24 L35 12" fill="none" stroke="#f7f2eb" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="35" cy="12" r="2.3" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tc">
        <rect x="14" y="13" width="20" height="14" rx="2" fill="#f0e8dc" stroke={ink} strokeWidth={sw} />
        <path d="M17 19 L20 22 L24 16" stroke={ink} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
    </>
  );
}

function DoodlesCyber() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <circle cx="22" cy="22" r="12" fill="#f7f2eb" stroke={ink} strokeWidth={sw} />
        <path d="M18 22 L21 25 L27 19" stroke={ink} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <path d="M10 18 H34" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M10 24 H34" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M10 30 H34" stroke={ink} strokeWidth={1.8} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <circle cx="18" cy="22" r="4.3" stroke={ink} strokeWidth={1.5} />
        <circle cx="28" cy="22" r="4.3" stroke={ink} strokeWidth={1.5} />
        <path d="M22 22 H24" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <rect x="12" y="10" width="24" height="26" rx="3" fill="#f0e8dc" stroke={ink} strokeWidth={sw} />
        <path d="M16 17 H30 M16 22 H30" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bc">
        <path d="M11 30 L18 16 L26 24 L35 12" fill="none" stroke="#f7f2eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="35" cy="12" r="2.2" fill="#f7f2eb" stroke={ink} strokeWidth={1} />
      </SvgWrap>
    </>
  );
}

function DoodlesElk() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <circle cx="22" cy="22" r="14" fill="#e0f2fe" stroke={ink} strokeWidth={sw} />
        <path d="M16 22 L20 26 L30 16" stroke={ink} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <rect x="10" y="16" width="26" height="16" rx="2" fill="#fef9c3" stroke={ink} strokeWidth={sw} />
        <path d="M14 22 H32 M14 26 H28" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <path d="M8 34 L12 14 L20 34 L28 12 L32 34" fill="none" stroke="#c4b5fd" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <ellipse cx="24" cy="22" rx="14" ry="8" fill="#fce7f3" stroke={ink} strokeWidth={sw} />
        <path d="M14 22 H34" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tc">
        <rect x="16" y="12" width="16" height="12" rx="1" fill="#bbf7d0" stroke={ink} strokeWidth={sw} />
      </SvgWrap>
    </>
  );
}

function DoodlesData() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <ellipse cx="24" cy="16" rx="12" ry="4" fill="#c28a4a" fillOpacity="0.35" stroke={ink} strokeWidth={sw} />
        <ellipse cx="24" cy="24" rx="12" ry="4" fill="#b5bac5" fillOpacity="0.35" stroke={ink} strokeWidth={sw} />
        <ellipse cx="24" cy="32" rx="12" ry="4" fill="#d9ba52" fillOpacity="0.38" stroke={ink} strokeWidth={sw} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <path d="M10 18 H34" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M30 15 L34 18 L30 21" stroke={ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 30 H34" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M30 27 L34 30 L30 33" stroke={ink} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <circle cx="24" cy="24" r="10" stroke={ink} strokeWidth={1.5} />
        <path d="M24 24 L24 19" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M24 24 L29 26" stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <path d="M12 31 C16 24 20 20 24 16 C28 20 32 24 36 31 C28 33 20 33 12 31 Z" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bc">
        <path d="M10 20 C8 15 12 11 17 13" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
        <path d="M18 10 L20 13 L16 14" stroke={ink} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 28 C31 33 27 37 22 35" stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
        <path d="M21 38 L19 35 L23 34" stroke={ink} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
    </>
  );
}

function DoodlesDb() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <ellipse cx="24" cy="14" rx="14" ry="5" fill="#bfdbfe" stroke={ink} strokeWidth={sw} />
        <path d="M10 14 V28 C10 31 38 31 38 28 V14" fill="#e0f2fe" stroke={ink} strokeWidth={sw} />
        <path d="M10 28 V36 C10 39 38 39 38 36 V28" fill="#dbeafe" stroke={ink} strokeWidth={sw} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <path d="M14 12 L20 36 L26 12" fill="#fde68a" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <path
          d="M14 12 H18 V28 H14 Z M20 12 H24 V28 H20 Z M28 14 H34 V26 H28 Z"
          fill="#fca5a5"
          stroke={ink}
          strokeWidth={sw}
          strokeLinejoin="round"
        />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <circle cx="24" cy="24" r="10" fill="#fbcfe8" stroke={ink} strokeWidth={sw} />
        <path d="M18 24 H30 M24 18 V30" stroke={ink} strokeWidth={1.2} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tc">
        <path d="M12 34 Q24 8 36 34" fill="none" stroke="#86efac" strokeWidth={1.6} strokeLinecap="round" />
      </SvgWrap>
    </>
  );
}

function DoodlesBackend() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <rect x="8" y="10" width="30" height="22" rx="3" fill="#fef3c7" stroke={ink} strokeWidth={sw} />
        <path d="M14 16 L18 20 L14 24 M20 16 V24 M24 16 H34 M24 20 H32 M24 24 H30" stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <rect x="12" y="12" width="24" height="22" rx="2" fill="#e0e7ff" stroke={ink} strokeWidth={sw} />
        <path d="M16 18 H32 M16 24 H28" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <path d="M14 10 L14 34 M14 22 H30" stroke="#7dd3fc" strokeWidth={2} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <rect x="10" y="16" width="28" height="14" fill="#bbf7d0" stroke={ink} strokeWidth={sw} rx="2" />
        <path d="M14 22 H34" stroke={ink} strokeWidth={1.1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bc">
        <rect x="10" y="16" width="26" height="14" rx="2" fill="#e2e8f0" stroke={ink} strokeWidth={sw} />
        <path d="M14 22 H32 M14 26 H26" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
      </SvgWrap>
    </>
  );
}

function DoodlesFrontend() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <rect x="14" y="10" width="20" height="30" rx="4" fill="#fce7f3" stroke={ink} strokeWidth={sw} />
        <path d="M18 16 H30" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <path d="M10 28 Q24 6 38 28" fill="none" stroke="#fde047" strokeWidth={2} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <rect x="12" y="14" width="24" height="16" rx="2" fill="#ddd6fe" stroke={ink} strokeWidth={sw} />
        <path d="M16 20 H32 M16 24 H28" stroke={ink} strokeWidth={0.9} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <circle cx="20" cy="20" r="3" fill="#7dd3fc" stroke={ink} strokeWidth={1} />
        <circle cx="28" cy="16" r="2.5" fill="#fca5a5" stroke={ink} strokeWidth={1} />
        <circle cx="30" cy="26" r="2.5" fill="#86efac" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tc">
        <path d="M12 32 L24 10 L36 32 Z" fill="#fef08a" stroke={ink} strokeWidth={sw} strokeLinejoin="round" opacity="0.95" />
      </SvgWrap>
    </>
  );
}

function DoodlesDevops() {
  return (
    <>
      <SvgWrap cls="team-doodle--tl">
        <path
          d="M12 28 C8 22 12 14 24 14 C36 14 40 22 36 28 C32 34 16 34 12 28 Z"
          fill="#bfdbfe"
          stroke={ink}
          strokeWidth={sw}
        />
      </SvgWrap>
      <SvgWrap cls="team-doodle--tr">
        <circle cx="24" cy="24" r="11" fill="#fef9c3" stroke={ink} strokeWidth={sw} />
        <path d="M24 14 V18 M24 30 V34 M14 24 H18 M30 24 H34" stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bl">
        <path d="M10 20 L18 28 L34 12" fill="none" stroke="#86efac" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </SvgWrap>
      <SvgWrap cls="team-doodle--br">
        <path d="M12 12 H36 V30 H12 Z" fill="#e9d5ff" stroke={ink} strokeWidth={sw} />
        <path d="M16 18 H32 M16 24 H28" stroke={ink} strokeWidth={1} />
      </SvgWrap>
      <SvgWrap cls="team-doodle--bc">
        <path d="M8 26 H40" stroke="#94a3b8" strokeWidth={1.4} strokeLinecap="round" strokeDasharray="2 5" />
      </SvgWrap>
    </>
  );
}

const PRESET_MAP: Record<TeamDoodlePreset, () => ReactElement> = {
  aiml: DoodlesAiml,
  cyber: DoodlesCyber,
  elk: DoodlesElk,
  data: DoodlesData,
  db: DoodlesDb,
  backend: DoodlesBackend,
  frontend: DoodlesFrontend,
  devops: DoodlesDevops,
};

function ArtifactBook() {
  return (
    <ArtifactWrap cls="team-artifact--a1">
      <path d="M10 14 H34 V34 H14 C12 34 10 32 10 30 Z" fill="#f0e8dc" stroke={ink} strokeWidth={1.4} />
      <path d="M14 18 H30 M14 23 H28 M14 28 H26" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
    </ArtifactWrap>
  );
}

function ArtifactDatabase() {
  return (
    <ArtifactWrap cls="team-artifact--a2">
      <ellipse cx="24" cy="14" rx="12" ry="4.4" fill="#d6d8df" stroke={ink} strokeWidth={1.2} />
      <path d="M12 14 V28 C12 31 36 31 36 28 V14" fill="#eef0f4" stroke={ink} strokeWidth={1.2} />
      <ellipse cx="24" cy="28" rx="12" ry="4.4" fill="#eef0f4" stroke={ink} strokeWidth={1.2} />
    </ArtifactWrap>
  );
}

function ArtifactCloud() {
  return (
    <ArtifactWrap cls="team-artifact--a4">
      <path d="M13 26 C13 21 17 17 22 17 C25 13 29 11 34 11 C41 11 47 17 47 24 C47 31 41 37 34 37 H22 C17 37 13 33 13 28 Z" fill="#e9edf4" stroke={ink} strokeWidth={1.2} />
    </ArtifactWrap>
  );
}

function ArtifactChart() {
  return (
    <ArtifactWrap cls="team-artifact--a3">
      <rect x="11" y="12" width="26" height="22" rx="2.5" fill="#f0e8dc" stroke={ink} strokeWidth={1.2} />
      <path d="M15 28 L21 23 L26 25 L33 18" stroke={ink} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 18 V28 H33" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
    </ArtifactWrap>
  );
}

function ArtifactChat() {
  return (
    <ArtifactWrap cls="team-artifact--a3">
      <rect x="11" y="12" width="26" height="18" rx="4" fill="#e2e8f0" stroke={ink} strokeWidth={1.4} />
      <path d="M18 30 L16 36 L24 30" stroke={ink} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M16 19 H32 M16 24 H28" stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
    </ArtifactWrap>
  );
}

function ArtifactBot() {
  return (
    <ArtifactWrap cls="team-artifact--a4">
      <rect x="13" y="15" width="22" height="16" rx="4" fill="#e7f0df" stroke={ink} strokeWidth={1.4} />
      <circle cx="20" cy="23" r="2" fill={ink} />
      <circle cx="28" cy="23" r="2" fill={ink} />
      <path d="M24 11 V15" stroke={ink} strokeWidth={1.2} strokeLinecap="round" />
      <circle cx="24" cy="9" r="1.6" fill="#f8f1d7" stroke={ink} strokeWidth={1} />
    </ArtifactWrap>
  );
}

function ArtifactLock() {
  return (
    <ArtifactWrap cls="team-artifact--a5">
      <rect x="14" y="22" width="20" height="14" rx="2.5" fill="#e6ddec" stroke={ink} strokeWidth={1.4} />
      <path d="M18 22 V19 C18 15 22 13 24 13 C26 13 30 15 30 19 V22" stroke={ink} strokeWidth={1.4} />
      <circle cx="24" cy="28" r="1.6" fill={ink} />
    </ArtifactWrap>
  );
}

const ARTIFACTS_BY_PRESET: Record<TeamDoodlePreset, (() => ReactElement)[]> = {
  aiml: [ArtifactBook, ArtifactChart, ArtifactBot],
  cyber: [ArtifactLock, ArtifactCloud, ArtifactChat],
  elk: [ArtifactChart, ArtifactDatabase, ArtifactChat],
  data: [ArtifactDatabase, ArtifactChart, ArtifactBook],
  db: [ArtifactDatabase, ArtifactLock, ArtifactChart],
  backend: [ArtifactBook, ArtifactChat, ArtifactLock],
  frontend: [ArtifactChat, ArtifactBook, ArtifactChart],
  devops: [ArtifactCloud, ArtifactLock, ArtifactBot],
};

/** Role mascot (center) + extra pastel doodles on card hover  -  no photography. */
export default function TeamRoleHoverVisual({ title, preset }: Props) {
  const Body = PRESET_MAP[preset];
  const Center = CENTER_MAP[preset];
  const Artifacts = ARTIFACTS_BY_PRESET[preset];
  return (
    <div className="team-visual">
      <div className="team-visual__frame team-visual__frame--doodles-only">
        <Center />
        <div className="team-visual__doodles" aria-hidden="true">
          <Body />
        </div>
        <div className="team-visual__artifacts" aria-hidden="true">
          {Artifacts.map((Cmp, idx) => <Cmp key={idx} />)}
        </div>
      </div>
      <span className="visually-hidden">{`Decorative doodle illustration for ${title}. Hover the card for extra sketches around the mascot.`}</span>
    </div>
  );
}
