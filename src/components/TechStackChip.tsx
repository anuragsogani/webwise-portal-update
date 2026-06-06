import SimpleIconImg from "./SimpleIconImg";

type Props = { name: string; icon?: string };

/** Brand icon via Simple Icons CDN when `icon` slug is known; label always shown. */
export default function TechStackChip({ name, icon }: Props) {
  return (
    <span className="tech-stack-chip sp-chip">
      {icon ? <SimpleIconImg slug={icon} size={16} className="tech-stack-chip__icon" /> : null}
      <span className="tech-stack-chip__label">{name}</span>
    </span>
  );
}
