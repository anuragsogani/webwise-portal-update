import SimpleIconImg from "./SimpleIconImg";

export type ComplianceFrameworkItem = {
  readonly label: string;
  readonly markSrc?: string;
  readonly iconSlug?: string;
};

type Props = {
  listLabel: string;
  frameworks: readonly ComplianceFrameworkItem[];
  othersLabel: string;
  others: readonly string[];
};

function FrameworkMark({ item }: { item: ComplianceFrameworkItem }) {
  if (item.iconSlug) {
    return <SimpleIconImg slug={item.iconSlug} size={28} className="compliance-framework-list__mark" />;
  }

  if (item.markSrc) {
    return (
      <img
        className="compliance-framework-list__mark"
        src={item.markSrc}
        alt=""
        width={28}
        height={28}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span className="compliance-framework-list__mark compliance-framework-list__mark--fallback" aria-hidden="true">
      {item.label.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function ComplianceFrameworkList({ listLabel, frameworks, othersLabel, others }: Props) {
  return (
    <div className="compliance-framework-list">
      <p className="title-sm soc-pillar-label">{listLabel}</p>
      <ul className="compliance-framework-list__grid">
        {frameworks.map((item) => (
          <li key={item.label} className="compliance-framework-list__item">
            <FrameworkMark item={item} />
            <span className="compliance-framework-list__label">{item.label}</span>
          </li>
        ))}
      </ul>
      {others.length > 0 ? (
        <div className="compliance-framework-list__others">
          <p className="compliance-framework-list__others-label">{othersLabel}</p>
          <ul className="compliance-framework-list__others-list">
            {others.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
