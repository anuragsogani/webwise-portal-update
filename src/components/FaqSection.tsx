import type { FaqItem } from "../content/faqTypes";

type Props = {
  id: string;
  title: string;
  intro?: string;
  items: readonly FaqItem[];
};

/**
 * Native details/summary for keyboard + SR support without extra ARIA state.
 */
export default function FaqSection({ id, title, intro, items }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section className="faq-section inner-section" id={id} aria-labelledby={headingId}>
      <p className="eyebrow">Common questions</p>
      <h2 id={headingId} className="section-title">
        {title}
      </h2>
      {intro ? <p className="section-lead faq-section__intro">{intro}</p> : null}
      <div className="faq-accordion" role="list">
        {items.map((item) => (
          <details key={item.q} className="faq-details" role="listitem">
            <summary className="faq-summary">{item.q}</summary>
            <div className="faq-panel">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
