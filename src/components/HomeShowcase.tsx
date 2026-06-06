import type { ShowcaseVisualVariant } from "../content/homePageCopy";
import { SHOWCASE_ROWS, SHOWCASE_SECTION } from "../content/homePageCopy";

type SketchCardProps = {
  paletteClass: string;
  children: React.ReactNode;
};

function SketchCard({ paletteClass, children }: SketchCardProps) {
  return (
    <div className={`topology-panel topology-panel--sketch ${paletteClass}`} aria-hidden="true">
      <svg className="topology-panel__svg" viewBox="0 0 240 180" preserveAspectRatio="xMidYMid meet">
        <rect x="10" y="10" width="220" height="160" rx="28" className="topology-panel__card" />
        {children}
      </svg>
    </div>
  );
}

function TopologySoc() {
  return (
    <div className="topology-panel-wrap">
      <SketchCard paletteClass="topology-panel--blush">
        <path
          d="M52 42 C87 39 126 39 178 41 C181 68 181 98 178 129 C131 131 90 131 56 128 C53 97 52 67 52 42 Z"
          className="topology-panel__paper"
        />
        <circle cx="118" cy="88" r="34" className="topology-panel__stroke" />
        <path d="M141 111 L185 156" className="topology-panel__stroke" />
        <path d="M138 108 L149 98 L191 149 L178 159 Z" className="topology-panel__stroke" />
        <path d="M82 66 C94 63 106 62 117 63" className="topology-panel__detail" />
        <path d="M73 121 C103 118 130 118 163 121" className="topology-panel__detail" />
      </SketchCard>
      <p className="topology-panel__label">Ingest · correlate · route</p>
    </div>
  );
}

function TopologyAi() {
  return (
    <div className="topology-panel-wrap">
      <SketchCard paletteClass="topology-panel--sage">
        <path
          d="M132 40 C113 42 97 54 90 74 C85 87 84 102 88 115 C93 133 107 145 126 148 C144 151 162 141 171 126 C179 113 180 97 174 84 C168 72 156 66 149 57 C143 49 140 43 132 40 Z"
          className="topology-panel__paper-soft"
        />
        <path
          d="M125 40 C100 44 83 67 84 95 C85 124 101 146 126 151 C151 156 173 141 183 117 C191 98 190 77 176 61"
          className="topology-panel__stroke"
        />
        <path d="M91 118 C75 116 60 122 49 139" className="topology-panel__stroke" />
        <path d="M93 126 C78 127 66 131 55 145" className="topology-panel__stroke" />
        <path d="M105 123 C90 132 89 147 101 151 C111 154 118 149 119 139" className="topology-panel__stroke" />
        <path d="M105 140 C90 149 92 163 106 165 C118 166 125 158 125 148" className="topology-panel__stroke" />
        <path d="M108 157 C93 165 97 177 113 178 C124 178 132 171 132 161" className="topology-panel__stroke" />
        <path d="M102 82 L130 82 L149 63" className="topology-panel__node-line" />
        <path d="M130 82 L132 104" className="topology-panel__node-line" />
        <path d="M130 82 L163 104" className="topology-panel__node-line" />
        <path d="M130 82 L94 86" className="topology-panel__node-line" />
        <circle cx="130" cy="82" r="11" className="topology-panel__node" />
        <circle cx="149" cy="63" r="6" className="topology-panel__node" />
        <circle cx="163" cy="104" r="6" className="topology-panel__node" />
        <circle cx="132" cy="104" r="6" className="topology-panel__node" />
        <circle cx="94" cy="86" r="6" className="topology-panel__node" />
      </SketchCard>
      <p className="topology-panel__label">RAG · eval · trace</p>
    </div>
  );
}

function TopologyData() {
  return (
    <div className="topology-panel-wrap">
      <SketchCard paletteClass="topology-panel--lavender">
        <path
          d="M67 34 C102 34 138 33 173 35 C175 49 174 60 173 73 C166 84 156 93 145 101 C160 111 169 123 175 136 C176 148 176 160 175 169 C138 167 102 167 67 168 C66 157 65 146 67 136 C72 123 81 111 97 101 C84 93 74 84 67 74 C66 60 66 48 67 34 Z"
          className="topology-panel__paper"
        />
        <path d="M84 61 C110 59 133 59 159 61 C154 80 141 92 120 103 C101 92 89 80 84 61 Z" className="topology-panel__stroke" />
        <path d="M89 142 C101 129 111 118 121 108 C131 119 142 131 152 144 C131 147 110 147 89 142 Z" className="topology-panel__stroke" />
        <circle cx="120" cy="114" r="3.5" className="topology-panel__stroke-solid" />
        <circle cx="120" cy="124" r="3.5" className="topology-panel__stroke-solid" />
        <circle cx="96" cy="68" r="2" className="topology-panel__grain" />
        <circle cx="104" cy="79" r="2" className="topology-panel__grain" />
        <circle cx="114" cy="65" r="2" className="topology-panel__grain" />
        <circle cx="125" cy="76" r="2" className="topology-panel__grain" />
        <circle cx="137" cy="66" r="2" className="topology-panel__grain" />
        <circle cx="145" cy="80" r="2" className="topology-panel__grain" />
        <circle cx="107" cy="89" r="2" className="topology-panel__grain" />
        <circle cx="123" cy="89" r="2" className="topology-panel__grain" />
        <circle cx="138" cy="91" r="2" className="topology-panel__grain" />
        <path d="M104 139 C109 137 113 138 118 140" className="topology-panel__detail" />
        <path d="M122 136 C126 135 131 136 136 138" className="topology-panel__detail" />
      </SketchCard>
      <p className="topology-panel__label">Lake · search · observe</p>
    </div>
  );
}

function TopologyVisual({ variant }: { variant: ShowcaseVisualVariant }) {
  if (variant === "soc") return <TopologySoc />;
  if (variant === "ai") return <TopologyAi />;
  return <TopologyData />;
}

export default function HomeShowcase() {
  return (
    <section id="s-showcase" className="home-showcase" aria-labelledby="showcase-heading">
      <div className="container home-showcase__inner">
        <header className="home-showcase__header">
          <p className="eyebrow">{SHOWCASE_SECTION.eyebrow}</p>
          <h2 id="showcase-heading" className="section-title home-showcase__title">
            {SHOWCASE_SECTION.titleBefore}
            <em>{SHOWCASE_SECTION.titleEm}</em>
            {SHOWCASE_SECTION.titleAfter}
          </h2>
          <p className="section-lead home-showcase__lead">{SHOWCASE_SECTION.subtitle}</p>
        </header>

        <div className="home-showcase__rows">
          {SHOWCASE_ROWS.map((row) => (
            <div key={row.variant} className="home-showcase__row">
              <div className="home-showcase__visual">
                <div className="topology-stack">
                  <TopologyVisual variant={row.variant} />
                </div>
              </div>
              <div className="home-showcase__bridge" aria-hidden="true">
                <span className="home-showcase__bridge-line" />
                <span className="home-showcase__bridge-dot" />
              </div>
              <div className="home-showcase__copy">
                <p className="home-showcase__name">{row.name}</p>
                <p className="home-showcase__body">{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
