/**
 * ServiceStackHeroDoodle  -  floating domain-symbol illustrations per service.
 * Each stack gets its own set of thematic SVG glyphs that animate with a
 * staggered float so the panel feels alive without any canvas or heavy JS.
 */

type Props = {
  stackId: string;
  label: string;
};

/* ─── shared palette ─────────────────────────────────────────── */
const TEAL  = "#76e4df";
const TEAL3 = "rgba(118,228,223,0.08)";
const DIM   = "rgba(255,255,255,0.30)";
const BG    = "rgba(10,14,18,0.0)"; // transparent  -  let card bg show

/* ─── wrapper that gives each symbol an independent float ────── */
function Sym({
  x, y, delay = 0, dur = 5, children,
}: {
  x: number; y: number; delay?: number; dur?: number;
  children: React.ReactNode;
}) {
  return (
    <g
      style={{
        animation: `svc-float ${dur}s ease-in-out ${delay}s infinite alternate`,
        transformOrigin: `${x}px ${y}px`,
        transformBox: "fill-box",
      }}
    >
      {children}
    </g>
  );
}

/* ─── scene wrapper ──────────────────────────────────────────── */
function Scene({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="services-stack-hero__svg"
      viewBox="0 0 560 168"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* scene bg is transparent  -  border + box-shadow come from CSS */}
      <rect width="560" height="168" rx="12" fill={BG} />
      {children}
    </svg>
  );
}

/* ─── helpers ────────────────────────────────────────────────── */
function CurrencyGlyph({ x, y, char, size = 28, op = 1 }: { x:number; y:number; char:string; size?:number; op?:number }) {
  return (
    <text
      x={x} y={y}
      fontFamily="'Poppins', system-ui, sans-serif"
      fontSize={size}
      fill={TEAL}
      opacity={op}
      textAnchor="middle"
      dominantBaseline="middle"
    >{char}</text>
  );
}

function Ring({ cx, cy, r, op=0.5 }: { cx:number; cy:number; r:number; op?:number }) {
  return <circle cx={cx} cy={cy} r={r} stroke={TEAL} strokeWidth="1.2" fill="none" opacity={op} />;
}

function Dot({ cx, cy, r=3 }: { cx:number; cy:number; r?:number }) {
  return <circle cx={cx} cy={cy} r={r} fill={TEAL} opacity={0.7} />;
}

/* ───────────────────────────────────────────────────────────────
   FINTECH / CRYPTO / INSURTECH
   Floating: $  ₹  ₿  €  ₽  + pulse rings
──────────────────────────────────────────────────────────────── */
function HeroFintech() {
  return (
    <Scene>
      {/* large bitcoin centre */}
      <Sym x={280} y={84} delay={0} dur={6}>
        <circle cx={280} cy={84} r={40} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.7} />
        <text x={280} y={84} fontFamily="'Poppins',system-ui,sans-serif" fontSize={38} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.9}>₿</text>
      </Sym>
      {/* dollar top-left */}
      <Sym x={100} y={60} delay={0.8} dur={5.5}>
        <circle cx={100} cy={60} r={26} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
        <CurrencyGlyph x={100} y={60} char="$" size={24} />
      </Sym>
      {/* rupee bottom-left */}
      <Sym x={88} y={128} delay={1.6} dur={4.8}>
        <circle cx={88} cy={128} r={20} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <CurrencyGlyph x={88} y={128} char="₹" size={18} />
      </Sym>
      {/* euro top-right */}
      <Sym x={460} y={52} delay={0.4} dur={6.2}>
        <circle cx={460} cy={52} r={24} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
        <CurrencyGlyph x={460} y={52} char="€" size={22} />
      </Sym>
      {/* pound bottom-right */}
      <Sym x={478} y={128} delay={1.2} dur={5.0}>
        <circle cx={478} cy={128} r={18} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <CurrencyGlyph x={478} y={128} char="£" size={16} />
      </Sym>
      {/* yen small */}
      <Sym x={170} y={138} delay={2.0} dur={4.6}>
        <CurrencyGlyph x={170} y={138} char="¥" size={14} op={0.45} />
      </Sym>
      {/* ruble small */}
      <Sym x={390} y={140} delay={2.4} dur={4.4}>
        <CurrencyGlyph x={390} y={140} char="₽" size={14} op={0.40} />
      </Sym>
      {/* pulse rings around bitcoin */}
      <Ring cx={280} cy={84} r={52} op={0.18} />
      <Ring cx={280} cy={84} r={66} op={0.09} />
      {/* connector dots */}
      <Dot cx={200} cy={84} />
      <Dot cx={360} cy={84} />
      <line x1={202} y1={84} x2={238} y2={84} stroke={DIM} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1={322} y1={84} x2={358} y2={84} stroke={DIM} strokeWidth="0.8" strokeDasharray="3 3" />
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   CYBERSECURITY & XDR
   Floating: shield  🔒  ⚠  radar arcs  eye
──────────────────────────────────────────────────────────────── */
function HeroCyber() {
  return (
    <Scene>
      {/* central shield */}
      <Sym x={280} y={84} delay={0} dur={6}>
        <path d="M280 40 L320 58 V96 L280 128 L240 96 V58 Z" fill={TEAL3} stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" opacity={0.85} />
        <path d="M268 86 L278 96 L296 76" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </Sym>
      {/* lock top-left */}
      <Sym x={108} y={64} delay={0.9} dur={5.2}>
        <rect x={88} y={56} width={40} height={30} rx="5" fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.7} />
        <path d="M100 56 V48 Q108 36 116 48 V56" stroke={TEAL} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <circle cx={108} cy={71} r={4} fill={TEAL} opacity={0.8} />
      </Sym>
      {/* warning top-right */}
      <Sym x={450} y={56} delay={1.4} dur={5.8}>
        <path d="M450 30 L478 78 H422 Z" fill="rgba(251,191,36,0.14)" stroke="#fbbf24" strokeWidth="1.4" strokeLinejoin="round" opacity={0.8} />
        <text x={450} y={64} fontFamily="monospace" fontSize={20} fill="#fbbf24" textAnchor="middle" dominantBaseline="middle" opacity={0.85}>!</text>
      </Sym>
      {/* radar arcs */}
      <Sym x={430} y={120} delay={0.5} dur={4.8}>
        <path d="M400 140 Q430 100 460 140" stroke={TEAL} strokeWidth="1" fill="none" opacity={0.4} />
        <path d="M412 140 Q430 112 448 140" stroke={TEAL} strokeWidth="0.8" fill="none" opacity={0.6} />
        <Dot cx={430} cy={140} r={4} />
      </Sym>
      {/* eye / visibility icon bottom-left */}
      <Sym x={100} y={124} delay={1.8} dur={5.4}>
        <ellipse cx={100} cy={124} rx={22} ry={12} stroke={TEAL} strokeWidth="1.2" fill={TEAL3} opacity={0.6} />
        <circle cx={100} cy={124} r={5} fill={TEAL} opacity={0.8} />
      </Sym>
      {/* ring pulse around shield */}
      <Ring cx={280} cy={84} r={54} op={0.14} />
      <Ring cx={280} cy={84} r={70} op={0.07} />
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   GENERATIVE AI & LLM
   Floating: brain nodes  ⚡  token stream  neural mesh
──────────────────────────────────────────────────────────────── */
function HeroGenai() {
  return (
    <Scene>
      {/* central brain cluster */}
      <Sym x={280} y={84} delay={0} dur={6.5}>
        <circle cx={280} cy={84} r={36} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.6} />
        <circle cx={262} cy={74} r={8} fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.8)" strokeWidth="1" />
        <circle cx={298} cy={74} r={7} fill="rgba(167,139,250,0.3)" stroke="rgba(167,139,250,0.8)" strokeWidth="1" />
        <circle cx={280} cy={100} r={7} fill="rgba(167,139,250,0.3)" stroke="rgba(167,139,250,0.8)" strokeWidth="1" />
        <line x1={262} y1={74} x2={298} y2={74} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <line x1={262} y1={74} x2={280} y2={100} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <line x1={298} y1={74} x2={280} y2={100} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
      </Sym>
      {/* lightning bolt left */}
      <Sym x={110} y={80} delay={0.7} dur={5.0}>
        <path d="M118 44 L100 88 H114 L102 128 L132 76 H116 Z" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.4" strokeLinejoin="round" opacity={0.85} />
      </Sym>
      {/* token stream right */}
      <Sym x={430} y={60} delay={1.2} dur={5.6}>
        <rect x={390} y={44} width={82} height={20} rx="10" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.7} />
        <rect x={396} y={70} width={60} height={16} rx="8" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <rect x={396} y={92} width={70} height={16} rx="8" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.35} />
        <text x={431} y={54} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={9} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.8}>{"<token/>"}</text>
      </Sym>
      {/* satellite nodes */}
      <Sym x={160} y={130} delay={2.0} dur={4.8}>
        <circle cx={160} cy={130} r={12} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
        <text x={160} y={130} fontFamily="monospace" fontSize={12} fill={TEAL} textAnchor="middle" dominantBaseline="middle">∑</text>
      </Sym>
      <Sym x={390} y={134} delay={1.6} dur={5.2}>
        <circle cx={390} cy={134} r={12} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.55} />
        <text x={390} y={134} fontFamily="monospace" fontSize={12} fill={TEAL} textAnchor="middle" dominantBaseline="middle">∂</text>
      </Sym>
      {/* mesh lines */}
      <line x1={172} y1={130} x2={244} y2={100} stroke={DIM} strokeWidth="0.7" strokeDasharray="4 4" />
      <line x1={316} y1={100} x2={388} y2={130} stroke={DIM} strokeWidth="0.7" strokeDasharray="4 4" />
      <line x1={120} y1={88} x2={244} y2={84} stroke={DIM} strokeWidth="0.7" strokeDasharray="4 4" />
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   DATA LAKES & ANALYTICS
   Floating: medallion cylinders  ∑  chart bars  flow arrows
──────────────────────────────────────────────────────────────── */
function HeroDatalakes() {
  return (
    <Scene>
      {/* Bronze cylinder */}
      <Sym x={110} y={96} delay={0.4} dur={5.5}>
        <ellipse cx={110} cy={72} rx={26} ry={9} fill="rgba(180,120,60,0.25)" stroke="#b47c3c" strokeWidth="1.2" opacity={0.8} />
        <rect x={84} y={72} width={52} height={42} fill="rgba(180,120,60,0.12)" stroke="#b47c3c" strokeWidth="1.2" opacity={0.7} />
        <ellipse cx={110} cy={114} rx={26} ry={9} fill="rgba(180,120,60,0.18)" stroke="#b47c3c" strokeWidth="1.2" opacity={0.7} />
        <text x={110} y={96} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill="#b47c3c" textAnchor="middle" dominantBaseline="middle" opacity={0.9}>BRONZE</text>
      </Sym>
      {/* Silver cylinder */}
      <Sym x={240} y={88} delay={0} dur={6}>
        <ellipse cx={240} cy={60} rx={26} ry={9} fill="rgba(148,163,184,0.25)" stroke="#94a3b8" strokeWidth="1.2" opacity={0.8} />
        <rect x={214} y={60} width={52} height={50} fill="rgba(148,163,184,0.12)" stroke="#94a3b8" strokeWidth="1.2" opacity={0.7} />
        <ellipse cx={240} cy={110} rx={26} ry={9} fill="rgba(148,163,184,0.18)" stroke="#94a3b8" strokeWidth="1.2" opacity={0.7} />
        <text x={240} y={88} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill="#94a3b8" textAnchor="middle" dominantBaseline="middle" opacity={0.9}>SILVER</text>
      </Sym>
      {/* Gold cylinder */}
      <Sym x={370} y={80} delay={0.8} dur={5.8}>
        <ellipse cx={370} cy={48} rx={26} ry={9} fill="rgba(234,179,8,0.25)" stroke="#eab308" strokeWidth="1.2" opacity={0.85} />
        <rect x={344} y={48} width={52} height={60} fill="rgba(234,179,8,0.12)" stroke="#eab308" strokeWidth="1.2" opacity={0.75} />
        <ellipse cx={370} cy={108} rx={26} ry={9} fill="rgba(234,179,8,0.18)" stroke="#eab308" strokeWidth="1.2" opacity={0.75} />
        <text x={370} y={80} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill="#eab308" textAnchor="middle" dominantBaseline="middle" opacity={0.9}>GOLD</text>
      </Sym>
      {/* streaming arrows */}
      <Sym x={460} y={84} delay={1.4} dur={4.8}>
        <text x={460} y={84} fontFamily="monospace" fontSize={28} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.7}>⟶</text>
        <text x={460} y={114} fontFamily="monospace" fontSize={14} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.4}>stream</text>
      </Sym>
      {/* flow lines */}
      <line x1={136} y1={84} x2={214} y2={84} stroke={DIM} strokeWidth="0.9" strokeDasharray="5 4" />
      <line x1={266} y1={84} x2={344} y2={84} stroke={DIM} strokeWidth="0.9" strokeDasharray="5 4" />
      <Dot cx={136} cy={84} />
      <Dot cx={214} cy={84} />
      <Dot cx={266} cy={84} />
      <Dot cx={344} cy={84} />
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   SEARCH & OBSERVABILITY (ELK / OPENSEARCH)
   Floating: magnifying glass  log lines  latency arc  index icon
──────────────────────────────────────────────────────────────── */
function HeroElk() {
  return (
    <Scene>
      {/* large search lens centre */}
      <Sym x={280} y={80} delay={0} dur={6}>
        <circle cx={268} cy={72} r={34} fill={TEAL3} stroke={TEAL} strokeWidth="1.6" opacity={0.75} />
        <line x1={294} y1={98} x2={316} y2={120} stroke={TEAL} strokeWidth="3" strokeLinecap="round" opacity={0.8} />
        <text x={268} y={72} fontFamily="monospace" fontSize={24} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.85}>⌕</text>
      </Sym>
      {/* log lines left */}
      <Sym x={96} y={84} delay={0.8} dur={5.2}>
        <rect x={60} y={50} width={72} height={68} rx="6" fill="rgba(15,20,28,0.7)" stroke={TEAL} strokeWidth="0.8" opacity={0.7} />
        <line x1={72} y1={66} x2={120} y2={66} stroke={TEAL} strokeWidth="0.9" opacity={0.6} />
        <line x1={72} y1={78} x2={108} y2={78} stroke={TEAL} strokeWidth="0.9" opacity={0.4} />
        <line x1={72} y1={90} x2={116} y2={90} stroke={TEAL} strokeWidth="0.9" opacity={0.5} />
        <line x1={72} y1={102} x2={100} y2={102} stroke={TEAL} strokeWidth="0.9" opacity={0.35} />
      </Sym>
      {/* latency sparkline right */}
      <Sym x={440} y={80} delay={1.2} dur={5.6}>
        <path d="M400 110 L418 78 L436 96 L454 58 L472 80 L490 68" stroke={TEAL} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity={0.75} />
        <circle cx={454} cy={58} r={5} fill={TEAL} opacity={0.9} />
        <text x={454} y={46} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={9} fill={TEAL} textAnchor="middle" opacity={0.8}>0.35ms</text>
      </Sym>
      {/* index icon bottom-right */}
      <Sym x={460} y={130} delay={2.0} dur={4.8}>
        <text x={460} y={132} fontFamily="monospace" fontSize={22} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.55}>⊞</text>
      </Sym>
      {/* connector */}
      <line x1={132} y1={84} x2={234} y2={80} stroke={DIM} strokeWidth="0.8" strokeDasharray="4 4" />
      <line x1={316} y1={100} x2={400} y2={100} stroke={DIM} strokeWidth="0.8" strokeDasharray="4 4" />
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   E-COMMERCE & MARKETPLACE SEARCH
   Floating: cart  price-tag  search bar  conversion arrow
──────────────────────────────────────────────────────────────── */
function HeroEcom() {
  return (
    <Scene>
      {/* shopping cart centre */}
      <Sym x={280} y={80} delay={0} dur={6}>
        <path d="M248 52 H258 L272 104 H308 L320 68 H268" stroke={TEAL} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.85} />
        <circle cx={278} cy={114} r={6} fill={TEAL} opacity={0.8} />
        <circle cx={304} cy={114} r={6} fill={TEAL} opacity={0.8} />
      </Sym>
      {/* price tag left */}
      <Sym x={110} y={76} delay={0.8} dur={5.4}>
        <path d="M78 54 H130 L142 76 L130 98 H78 Z" fill={TEAL3} stroke={TEAL} strokeWidth="1.2" opacity={0.75} />
        <circle cx={90} cy={76} r={5} fill={TEAL} opacity={0.7} />
        <CurrencyGlyph x={116} y={76} char="$" size={18} op={0.85} />
      </Sym>
      {/* search-results right */}
      <Sym x={438} y={70} delay={1.2} dur={5.8}>
        <rect x={400} y={44} width={76} height={14} rx="7" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.7} />
        <rect x={400} y={64} width={76} height={14} rx="7" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <rect x={400} y={84} width={76} height={14} rx="7" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.35} />
        <text x={438} y={51} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.8}>relevance ↑</text>
      </Sym>
      {/* conversion arrow bottom */}
      <Sym x={280} y={140} delay={1.6} dur={5.0}>
        <text x={280} y={140} fontFamily="monospace" fontSize={22} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.5}>↗</text>
        <text x={280} y={154} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.4}>conversion</text>
      </Sym>
      {/* catalogue dots */}
      <Sym x={108} y={128} delay={2.2} dur={4.6}>
        <rect x={86} y={116} width={20} height={20} rx="3" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.55} />
        <rect x={110} y={116} width={20} height={20} rx="3" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.4} />
      </Sym>
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   AIOPS & PLATFORM OBSERVABILITY
   Floating: gauge  alert bell  trace timeline  SLO%
──────────────────────────────────────────────────────────────── */
function HeroAiops() {
  return (
    <Scene>
      {/* gauge centre */}
      <Sym x={280} y={84} delay={0} dur={6}>
        <path d="M240 100 A40 40 0 0 1 320 100" stroke={TEAL} strokeWidth="2" fill="none" opacity={0.7} />
        <path d="M240 100 A40 40 0 0 1 308 68" stroke={TEAL} strokeWidth="3" fill="none" strokeLinecap="round" opacity={0.9} />
        <circle cx={280} cy={100} r={6} fill={TEAL} opacity={0.9} />
        <line x1={280} y1={94} x2={302} y2={72} stroke={TEAL} strokeWidth="2" strokeLinecap="round" opacity={0.85} />
        <text x={280} y={130} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={10} fill={TEAL} textAnchor="middle" opacity={0.7}>99.9%</text>
      </Sym>
      {/* bell alert left */}
      <Sym x={108} y={72} delay={0.9} dur={5.2}>
        <path d="M108 42 Q130 44 132 68 L138 86 H78 L84 68 Q86 44 108 42 Z" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.3" opacity={0.8} />
        <path d="M100 86 Q108 96 116 86" stroke="#fbbf24" strokeWidth="1.3" fill="none" opacity={0.8} />
        <circle cx={108} cy={36} r={5} fill="#fbbf24" opacity={0.85} />
      </Sym>
      {/* trace timeline right */}
      <Sym x={440} y={76} delay={1.3} dur={5.7}>
        <rect x={400} y={52} width={80} height={10} rx="5" fill="rgba(118,228,223,0.2)" stroke={TEAL} strokeWidth="0.8" opacity={0.8} />
        <rect x={400} y={68} width={52} height={10} rx="5" fill="rgba(118,228,223,0.15)" stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
        <rect x={400} y={84} width={68} height={10} rx="5" fill="rgba(118,228,223,0.12)" stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <text x={440} y={110} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={8} fill={TEAL} textAnchor="middle" opacity={0.7}>traces</text>
      </Sym>
      {/* ML anomaly dot bottom-left */}
      <Sym x={160} y={128} delay={2.0} dur={4.8}>
        <path d="M120 140 L138 108 L156 124 L174 96 L192 120" stroke={TEAL} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity={0.6} />
        <circle cx={174} cy={96} r={5} fill="#fbbf24" opacity={0.9} />
        <text x={174} y={84} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill="#fbbf24" textAnchor="middle" opacity={0.8}>anomaly</text>
      </Sym>
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   CLOUD-NATIVE & PLATFORM ENGINEERING
   Floating: cloud  K8s wheel  CI/CD pipeline  IaC braces
──────────────────────────────────────────────────────────────── */
function HeroCloud() {
  return (
    <Scene>
      {/* cloud shape centre */}
      <Sym x={280} y={72} delay={0} dur={6.2}>
        <path d="M230 96 C206 96 206 64 228 60 C230 40 268 36 284 54 C300 38 334 46 338 68 C364 64 376 96 352 96 Z" fill={TEAL3} stroke={TEAL} strokeWidth="1.4" opacity={0.8} />
      </Sym>
      {/* K8s 6-spoke wheel left */}
      <Sym x={104} y={108} delay={0.7} dur={5.4}>
        <circle cx={104} cy={108} r={28} fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.7)" strokeWidth="1.2" opacity={0.8} />
        <circle cx={104} cy={108} r={8} fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.9)" strokeWidth="1.2" />
        {[0,60,120,180,240,300].map((deg,i) => {
          const rad = (deg * Math.PI) / 180;
          const x2 = 104 + Math.cos(rad) * 20;
          const y2 = 108 + Math.sin(rad) * 20;
          return <line key={i} x1={104} y1={108} x2={x2} y2={y2} stroke="rgba(99,102,241,0.75)" strokeWidth="1.4" />;
        })}
        <text x={104} y={108} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill="rgba(99,102,241,0.9)" textAnchor="middle" dominantBaseline="middle">K8s</text>
      </Sym>
      {/* CI/CD pipeline right */}
      <Sym x={436} y={96} delay={1.2} dur={5.8}>
        <circle cx={400} cy={96} r={10} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.8} />
        <line x1={410} y1={96} x2={428} y2={96} stroke={TEAL} strokeWidth="1" strokeDasharray="3 2" opacity={0.6} />
        <circle cx={438} cy={96} r={10} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.7} />
        <line x1={448} y1={96} x2={466} y2={96} stroke={TEAL} strokeWidth="1" strokeDasharray="3 2" opacity={0.5} />
        <circle cx={476} cy={96} r={10} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.6} />
        <text x={400} y={96} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill={TEAL} textAnchor="middle" dominantBaseline="middle">CI</text>
        <text x={438} y={96} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill={TEAL} textAnchor="middle" dominantBaseline="middle">CD</text>
        <text x={476} y={96} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill={TEAL} textAnchor="middle" dominantBaseline="middle">✓</text>
      </Sym>
      {/* IaC braces */}
      <Sym x={280} y={134} delay={1.8} dur={5.0}>
        <text x={280} y={140} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={22} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.5}>{"{IaC}"}</text>
      </Sym>
      {/* droplets */}
      <Sym x={450} y={50} delay={2.2} dur={4.8}>
        <text x={450} y={52} fontFamily="monospace" fontSize={20} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.45}>☁</text>
      </Sym>
    </Scene>
  );
}

/* ───────────────────────────────────────────────────────────────
   CUSTOM INTERNAL PLATFORMS
   Floating: gear  workflow nodes  RBAC tree  grid widget
──────────────────────────────────────────────────────────────── */
function HeroInternal() {
  return (
    <Scene>
      {/* large gear centre */}
      <Sym x={280} y={84} delay={0} dur={7}>
        <circle cx={280} cy={84} r={32} fill={TEAL3} stroke={TEAL} strokeWidth="1.2" opacity={0.7} />
        <circle cx={280} cy={84} r={14} fill="rgba(10,14,18,0.8)" stroke={TEAL} strokeWidth="1.2" opacity={0.9} />
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const rad = (deg * Math.PI) / 180;
          const ix = 280 + Math.cos(rad) * 32;
          const iy = 84 + Math.sin(rad) * 32;
          return <circle key={i} cx={ix} cy={iy} r={5} fill={TEAL} opacity={0.6} />;
        })}
        <text x={280} y={84} fontFamily="monospace" fontSize={14} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.9}>⚙</text>
      </Sym>
      {/* RBAC tree left */}
      <Sym x={96} y={72} delay={0.9} dur={5.5}>
        <circle cx={96} cy={48} r={10} fill={TEAL3} stroke={TEAL} strokeWidth="1" opacity={0.8} />
        <text x={96} y={48} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={7} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.9}>RBAC</text>
        <line x1={82} y1={58} x2={72} y2={80} stroke={DIM} strokeWidth="0.8" />
        <line x1={110} y1={58} x2={120} y2={80} stroke={DIM} strokeWidth="0.8" />
        <circle cx={72} cy={88} r={8} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
        <circle cx={120} cy={88} r={8} fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.6} />
      </Sym>
      {/* workflow nodes right */}
      <Sym x={440} y={76} delay={1.4} dur={5.8}>
        <rect x={408} y={48} width={24} height={16} rx="4" fill={TEAL3} stroke={TEAL} strokeWidth="0.9" opacity={0.7} />
        <line x1={432} y1={56} x2={444} y2={56} stroke={TEAL} strokeWidth="0.8" markerEnd="url(#arr)" opacity={0.6} />
        <rect x={444} y={48} width={24} height={16} rx="4" fill={TEAL3} stroke={TEAL} strokeWidth="0.9" opacity={0.65} />
        <line x1={456} y1={64} x2={456} y2={76} stroke={TEAL} strokeWidth="0.8" opacity={0.5} />
        <rect x={444} y={76} width={24} height={16} rx="4" fill={TEAL3} stroke={TEAL} strokeWidth="0.9" opacity={0.6} />
        <text x={420} y={56} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={6} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.85}>req</text>
        <text x={456} y={56} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={6} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.85}>auth</text>
        <text x={456} y={84} fontFamily="ui-monospace, Menlo, Monaco, monospace" fontSize={6} fill={TEAL} textAnchor="middle" dominantBaseline="middle" opacity={0.85}>log</text>
      </Sym>
      {/* small widgets bottom */}
      <Sym x={180} y={132} delay={1.8} dur={5.0}>
        <rect x={152} y={120} width={20} height={20} rx="3" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.55} />
        <rect x={176} y={120} width={20} height={20} rx="3" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.4} />
        <rect x={200} y={120} width={20} height={20} rx="3" fill={TEAL3} stroke={TEAL} strokeWidth="0.8" opacity={0.3} />
      </Sym>
    </Scene>
  );
}

/* ─── registry ───────────────────────────────────────────────── */
const HERO_MAP: Record<string, () => React.ReactElement> = {
  fintech:   HeroFintech,
  genai:     HeroGenai,
  datalakes: HeroDatalakes,
  elk:       HeroElk,
  cyber:     HeroCyber,
  ecom:      HeroEcom,
  aiops:     HeroAiops,
  cloud:     HeroCloud,
  internal:  HeroInternal,
};

export default function ServiceStackHeroDoodle({ stackId, label }: Props) {
  const Cmp = HERO_MAP[stackId] ?? HeroGenai;
  return (
    <div className="services-stack-hero" role="img" aria-label={label}>
      <Cmp />
    </div>
  );
}
