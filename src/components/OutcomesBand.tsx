import RevealOnScroll from "./RevealOnScroll";
import StatCounter from "./StatCounter";
import {
  IMPACT_METRICS,
  METRICS_SECTION_EYEBROW,
  METRICS_SECTION_TITLE,
  METRICS_SECTION_TITLE_EM,
} from "../content/homePageCopy";

export default function OutcomesBand() {
  return (
    <section className="outcomes-band section" aria-labelledby="outcomes-band-heading">
      <div className="container outcomes-band__inner">
        <RevealOnScroll className="outcomes-band__head">
          <p className="eyebrow">{METRICS_SECTION_EYEBROW}</p>
          <h2 id="outcomes-band-heading" className="outcomes-band__title">
            {METRICS_SECTION_TITLE}
            <em>{METRICS_SECTION_TITLE_EM}</em>
          </h2>
        </RevealOnScroll>

        <div className="outcomes-band__stats" role="list">
          {IMPACT_METRICS.map((m, i) => (
            <RevealOnScroll
              key={m.label}
              className="outcomes-stat"
              delay={(i + 1) as 1 | 2 | 3}
              as="div"
            >
              <StatCounter
                className="outcomes-stat__value"
                target={m.target}
                suffix={m.suffix}
                decimals={m.decimals}
              />
              <span className="outcomes-stat__label">{m.label}</span>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={2}>
          <div className="outcomes-band__rule" aria-hidden="true" />
        </RevealOnScroll>

        <div className="outcomes-band__details">
          {IMPACT_METRICS.map((m, i) => (
            <RevealOnScroll key={m.label} delay={(i + 1) as 1 | 2 | 3}>
              <article className="outcomes-detail">
                <h3 className="outcomes-detail__title">{m.label}</h3>
                <p className="outcomes-detail__body">{m.detail}</p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
