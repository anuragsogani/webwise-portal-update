/** Pudding-style pixel bust - https://pudding.cool/2021/12/sesame/ */

import type { TrustedLeaderCharacterVariant } from "../content/homePageCopy";

export type TestimonialCharacterVariant = TrustedLeaderCharacterVariant;

type CharacterSpec = {
  readonly gender: "male" | "female";
  readonly hair: string;
  readonly skin: string;
  readonly shirt: string;
};

const CHARACTERS: Record<TestimonialCharacterVariant, CharacterSpec> = {
  dts: { gender: "male", hair: "#2a2018", skin: "#c99263", shirt: "#46838c" },
  aggreko: { gender: "female", hair: "#3a2418", skin: "#d4a574", shirt: "#e86c4a" },
  msazn: { gender: "male", hair: "#1a1816", skin: "#b8845c", shirt: "#3b5bdb" },
  kort: { gender: "female", hair: "#4a3020", skin: "#e0b080", shirt: "#2dd4bf" },
  aithentic: { gender: "male", hair: "#2c241c", skin: "#c48a5a", shirt: "#7c5cbf" },
};

function Pixel({
  x,
  y,
  color,
  size = 8,
}: {
  x: number;
  y: number;
  color: string;
  size?: number;
}) {
  return <rect x={x * size} y={y * size} width={size} height={size} fill={color} />;
}

function MaleBust({ spec }: { spec: CharacterSpec }) {
  const { hair, skin, shirt } = spec;
  return (
    <g>
      <Pixel x={3} y={0} color={hair} />
      <Pixel x={4} y={0} color={hair} />
      <Pixel x={5} y={0} color={hair} />
      <Pixel x={2} y={1} color={hair} />
      <Pixel x={3} y={1} color={hair} />
      <Pixel x={4} y={1} color={hair} />
      <Pixel x={5} y={1} color={hair} />
      <Pixel x={6} y={1} color={hair} />
      <Pixel x={2} y={2} color={hair} />
      <Pixel x={3} y={2} color={skin} />
      <Pixel x={4} y={2} color={skin} />
      <Pixel x={5} y={2} color={skin} />
      <Pixel x={6} y={2} color={hair} />
      <Pixel x={2} y={3} color={skin} />
      <Pixel x={3} y={3} color={skin} />
      <Pixel x={4} y={3} color={skin} />
      <Pixel x={5} y={3} color={skin} />
      <Pixel x={6} y={3} color={skin} />
      <Pixel x={3} y={4} color="#1a1816" />
      <Pixel x={5} y={4} color="#1a1816" />
      <Pixel x={3} y={5} color={skin} />
      <Pixel x={4} y={5} color={skin} />
      <Pixel x={5} y={5} color={skin} />
      <Pixel x={4} y={6} color={skin} />
      <Pixel x={3} y={7} color={shirt} />
      <Pixel x={4} y={7} color={shirt} />
      <Pixel x={5} y={7} color={shirt} />
      <Pixel x={2} y={8} color={shirt} />
      <Pixel x={3} y={8} color={shirt} />
      <Pixel x={4} y={8} color={shirt} />
      <Pixel x={5} y={8} color={shirt} />
      <Pixel x={6} y={8} color={shirt} />
      <Pixel x={2} y={9} color={shirt} />
      <Pixel x={3} y={9} color={shirt} />
      <Pixel x={4} y={9} color={shirt} />
      <Pixel x={5} y={9} color={shirt} />
      <Pixel x={6} y={9} color={shirt} />
      <Pixel x={3} y={10} color={shirt} />
      <Pixel x={4} y={10} color={shirt} />
      <Pixel x={5} y={10} color={shirt} />
      <g className="testimonial-pixel__wave-arm">
        <Pixel x={7} y={5} color={skin} />
        <Pixel x={8} y={4} color={skin} />
        <Pixel x={8} y={3} color={skin} />
        <Pixel x={9} y={2} color={skin} />
      </g>
    </g>
  );
}

function FemaleBust({ spec }: { spec: CharacterSpec }) {
  const { hair, skin, shirt } = spec;
  return (
    <g>
      <Pixel x={2} y={0} color={hair} />
      <Pixel x={3} y={0} color={hair} />
      <Pixel x={4} y={0} color={hair} />
      <Pixel x={5} y={0} color={hair} />
      <Pixel x={6} y={0} color={hair} />
      <Pixel x={1} y={1} color={hair} />
      <Pixel x={2} y={1} color={hair} />
      <Pixel x={3} y={1} color={hair} />
      <Pixel x={4} y={1} color={hair} />
      <Pixel x={5} y={1} color={hair} />
      <Pixel x={6} y={1} color={hair} />
      <Pixel x={7} y={1} color={hair} />
      <Pixel x={1} y={2} color={hair} />
      <Pixel x={2} y={2} color={hair} />
      <Pixel x={3} y={2} color={skin} />
      <Pixel x={4} y={2} color={skin} />
      <Pixel x={5} y={2} color={skin} />
      <Pixel x={6} y={2} color={hair} />
      <Pixel x={7} y={2} color={hair} />
      <Pixel x={1} y={3} color={hair} />
      <Pixel x={2} y={3} color={skin} />
      <Pixel x={3} y={3} color={skin} />
      <Pixel x={4} y={3} color={skin} />
      <Pixel x={5} y={3} color={skin} />
      <Pixel x={6} y={3} color={skin} />
      <Pixel x={7} y={3} color={hair} />
      <Pixel x={2} y={4} color={skin} />
      <Pixel x={3} y={4} color="#1a1816" />
      <Pixel x={4} y={4} color={skin} />
      <Pixel x={5} y={4} color="#1a1816" />
      <Pixel x={6} y={4} color={skin} />
      <Pixel x={2} y={5} color={skin} />
      <Pixel x={3} y={5} color={skin} />
      <Pixel x={4} y={5} color={skin} />
      <Pixel x={5} y={5} color={skin} />
      <Pixel x={6} y={5} color={skin} />
      <Pixel x={3} y={6} color={skin} />
      <Pixel x={4} y={6} color={skin} />
      <Pixel x={5} y={6} color={skin} />
      <Pixel x={1} y={7} color={hair} />
      <Pixel x={2} y={7} color={shirt} />
      <Pixel x={3} y={7} color={shirt} />
      <Pixel x={4} y={7} color={shirt} />
      <Pixel x={5} y={7} color={shirt} />
      <Pixel x={6} y={7} color={shirt} />
      <Pixel x={7} y={7} color={hair} />
      <Pixel x={2} y={8} color={shirt} />
      <Pixel x={3} y={8} color={shirt} />
      <Pixel x={4} y={8} color={shirt} />
      <Pixel x={5} y={8} color={shirt} />
      <Pixel x={6} y={8} color={shirt} />
      <Pixel x={2} y={9} color={shirt} />
      <Pixel x={3} y={9} color={shirt} />
      <Pixel x={4} y={9} color={shirt} />
      <Pixel x={5} y={9} color={shirt} />
      <Pixel x={6} y={9} color={shirt} />
      <Pixel x={3} y={10} color={shirt} />
      <Pixel x={4} y={10} color={shirt} />
      <Pixel x={5} y={10} color={shirt} />
      <g className="testimonial-pixel__wave-arm">
        <Pixel x={0} y={5} color={skin} />
        <Pixel x={0} y={4} color={skin} />
        <Pixel x={0} y={3} color={skin} />
        <Pixel x={0} y={2} color={skin} />
      </g>
    </g>
  );
}

export default function TestimonialPixelCharacter({
  variant,
  className = "",
}: {
  variant: TestimonialCharacterVariant;
  className?: string;
}) {
  const spec = CHARACTERS[variant];
  const label = spec.gender === "female" ? "Illustrated professional (female)" : "Illustrated professional (male)";

  return (
    <svg
      className={`testimonial-pixel${className ? ` ${className}` : ""}`}
      viewBox="0 0 80 96"
      width={240}
      height={288}
      role="img"
      aria-label={label}
    >
      {spec.gender === "female" ? <FemaleBust spec={spec} /> : <MaleBust spec={spec} />}
    </svg>
  );
}
