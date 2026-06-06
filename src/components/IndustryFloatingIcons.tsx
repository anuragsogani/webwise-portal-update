import type { PortfolioIndustry } from "../content/portfolioPageCopy";

type IconPath = {
  d: string;
  fill?: boolean;
};

type FloatSpec = {
  paths: IconPath[];
  top: string;
  left: string;
  size: number;
  motion: "drift-a" | "drift-b" | "drift-c" | "drift-d";
  delay: string;
  duration: string;
};

const ICONS: Record<PortfolioIndustry, FloatSpec[]> = {
  Cybersecurity: [
    {
      paths: [{ d: "M12 3 4 6v6c0 4.8 3.4 8.7 8 10.5 4.6-1.8 8-5.7 8-10.5V6l-8-3z" }],
      top: "12%",
      left: "72%",
      size: 34,
      motion: "drift-a",
      delay: "0s",
      duration: "9s",
    },
    {
      paths: [
        { d: "M8 11V8a4 4 0 0 1 8 0v3" },
        { d: "M7 11h10v8H7z" },
      ],
      top: "28%",
      left: "88%",
      size: 26,
      motion: "drift-b",
      delay: "-2s",
      duration: "11s",
    },
    {
      paths: [{ d: "M12 3a6 6 0 0 0-6 6v1h12V9a6 6 0 0 0-6-6zm-8 9v8h16v-8" }],
      top: "52%",
      left: "78%",
      size: 30,
      motion: "drift-c",
      delay: "-4s",
      duration: "10s",
    },
    {
      paths: [{ d: "M4 12a8 8 0 0 1 16 0M12 12v6M8 18h8" }],
      top: "68%",
      left: "62%",
      size: 28,
      motion: "drift-d",
      delay: "-1s",
      duration: "12s",
    },
  ],
  "AI Platforms": [
    {
      paths: [
        { d: "M12 4a3 3 0 0 0-3 3v2h6V7a3 3 0 0 0-3-3z" },
        { d: "M6 9h12v3a6 6 0 0 1-12 0V9z" },
        { d: "M9 18v2M15 18v2M8 22h8" },
      ],
      top: "14%",
      left: "80%",
      size: 32,
      motion: "drift-b",
      delay: "-1.5s",
      duration: "10s",
    },
    {
      paths: [
        { d: "M7 7h10v10H7z" },
        { d: "M9 9h6M9 12h6M9 15h4" },
      ],
      top: "34%",
      left: "66%",
      size: 28,
      motion: "drift-a",
      delay: "-3s",
      duration: "11s",
    },
    {
      paths: [{ d: "M12 2l1.8 5.5H19l-4.5 3.3 1.7 5.5L12 13l-4.2 3.3 1.7-5.5L5 7.5h5.2L12 2z" }],
      top: "48%",
      left: "86%",
      size: 24,
      motion: "drift-c",
      delay: "0s",
      duration: "9s",
    },
    {
      paths: [
        { d: "M5 8h14v8H5z" },
        { d: "M8 8V6a4 4 0 0 1 8 0v2" },
      ],
      top: "70%",
      left: "74%",
      size: 26,
      motion: "drift-d",
      delay: "-2.5s",
      duration: "12s",
    },
  ],
  "Data & Search": [
    {
      paths: [
        { d: "M6 5h12v14H6z" },
        { d: "M9 9h6M9 12h6M9 15h4" },
      ],
      top: "16%",
      left: "84%",
      size: 30,
      motion: "drift-c",
      delay: "-2s",
      duration: "10s",
    },
    {
      paths: [{ d: "M10 10a4 4 0 1 1 5.6 0l3.4 3.4M14 14v4" }],
      top: "30%",
      left: "68%",
      size: 32,
      motion: "drift-a",
      delay: "0s",
      duration: "11s",
    },
    {
      paths: [{ d: "M5 18V8M12 18V4M19 18v-6" }],
      top: "56%",
      left: "80%",
      size: 28,
      motion: "drift-b",
      delay: "-3.5s",
      duration: "9s",
    },
    {
      paths: [
        { d: "M4 8h16v8H4z" },
        { d: "M8 12h8" },
      ],
      top: "72%",
      left: "64%",
      size: 26,
      motion: "drift-d",
      delay: "-1s",
      duration: "12s",
    },
  ],
  "Cloud & Observability": [
    {
      paths: [{ d: "M7 14a4 4 0 0 1 .2-8 5.5 5.5 0 0 1 10.6 1.8A3.5 3.5 0 0 1 17 14H7z" }],
      top: "12%",
      left: "76%",
      size: 34,
      motion: "drift-a",
      delay: "-2s",
      duration: "10s",
    },
    {
      paths: [{ d: "M4 14c2-4 5-6 8-6s6 2 8 6M4 18h16" }],
      top: "36%",
      left: "88%",
      size: 26,
      motion: "drift-d",
      delay: "0s",
      duration: "11s",
    },
    {
      paths: [
        { d: "M6 6h12v12H6z" },
        { d: "M9 9h6v6H9z" },
      ],
      top: "54%",
      left: "70%",
      size: 28,
      motion: "drift-b",
      delay: "-4s",
      duration: "9s",
    },
    {
      paths: [{ d: "M12 4a4 4 0 0 1 4 4v1h1a2 2 0 0 1 0 4h-1v1a4 4 0 0 1-8 0v-1H7a2 2 0 0 1 0-4h1V8a4 4 0 0 1 4-4z" }],
      top: "70%",
      left: "82%",
      size: 24,
      motion: "drift-c",
      delay: "-1.5s",
      duration: "12s",
    },
  ],
  "FinTech & Trading": [
    {
      paths: [{ d: "M5 17l4-6 4 3 6-9" }, { d: "M16 5h3v3" }],
      top: "14%",
      left: "82%",
      size: 32,
      motion: "drift-b",
      delay: "-1s",
      duration: "10s",
    },
    {
      paths: [
        { d: "M8 8h8v8H8z" },
        { d: "M12 8v8M8 12h8" },
      ],
      top: "32%",
      left: "66%",
      size: 26,
      motion: "drift-c",
      delay: "-3s",
      duration: "11s",
    },
    {
      paths: [{ d: "M12 4v16M8 8h8M8 16h8" }],
      top: "50%",
      left: "86%",
      size: 28,
      motion: "drift-a",
      delay: "-2.5s",
      duration: "9s",
    },
    {
      paths: [{ d: "M6 10h12M6 14h12M9 6v12M15 6v12" }],
      top: "68%",
      left: "74%",
      size: 30,
      motion: "drift-d",
      delay: "0s",
      duration: "12s",
    },
  ],
  "E-Commerce": [
    {
      paths: [
        { d: "M6 8h12l-1.2 8H7.2L6 8z" },
        { d: "M9 8V6a3 3 0 0 1 6 0v2" },
      ],
      top: "15%",
      left: "78%",
      size: 32,
      motion: "drift-c",
      delay: "-2s",
      duration: "10s",
    },
    {
      paths: [{ d: "M6 6h12v12H6zM9 9h6v6H9z" }],
      top: "34%",
      left: "64%",
      size: 26,
      motion: "drift-a",
      delay: "0s",
      duration: "11s",
    },
    {
      paths: [{ d: "M5 8h14l-2 10H7L5 8zM9 8V6a3 3 0 0 1 6 0v2" }],
      top: "52%",
      left: "88%",
      size: 28,
      motion: "drift-d",
      delay: "-3.5s",
      duration: "9s",
    },
    {
      paths: [{ d: "M6 10h12v8H6zM9 7V5h6v2" }],
      top: "70%",
      left: "72%",
      size: 30,
      motion: "drift-b",
      delay: "-1s",
      duration: "12s",
    },
  ],
  "Retail & Enterprise Platforms": [
    {
      paths: [
        { d: "M5 10h14v10H5z" },
        { d: "M9 10V7h6v3" },
        { d: "M5 14h14" },
      ],
      top: "12%",
      left: "84%",
      size: 32,
      motion: "drift-a",
      delay: "-1.5s",
      duration: "10s",
    },
    {
      paths: [
        { d: "M4 8h16v10H4z" },
        { d: "M8 8V6h8v2M6 18h12" },
      ],
      top: "30%",
      left: "68%",
      size: 28,
      motion: "drift-d",
      delay: "-3s",
      duration: "11s",
    },
    {
      paths: [
        { d: "M6 8h12v8H6z" },
        { d: "M9 11h6" },
      ],
      top: "54%",
      left: "80%",
      size: 26,
      motion: "drift-b",
      delay: "0s",
      duration: "9s",
    },
    {
      paths: [{ d: "M6 8h12l-2 10H8L6 8zM12 8V5" }],
      top: "72%",
      left: "62%",
      size: 30,
      motion: "drift-c",
      delay: "-2s",
      duration: "12s",
    },
  ],
};

function FloatIcon({ spec }: { spec: FloatSpec }) {
  return (
    <span
      className={`industry-float industry-float--${spec.motion}`}
      style={{
        top: spec.top,
        left: spec.left,
        width: spec.size,
        height: spec.size,
        animationDuration: spec.duration,
        animationDelay: spec.delay,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {spec.paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill={path.fill ? "currentColor" : "none"}
            stroke={path.fill ? "none" : "currentColor"}
            strokeWidth={path.fill ? undefined : 1.35}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </span>
  );
}

type Props = {
  industry: PortfolioIndustry;
};

export default function IndustryFloatingIcons({ industry }: Props) {
  const specs = ICONS[industry];
  if (!specs?.length) return null;

  return (
    <div className="industry-tile__floats" aria-hidden="true">
      {specs.map((spec, index) => (
        <FloatIcon key={`${industry}-${index}`} spec={spec} />
      ))}
    </div>
  );
}
