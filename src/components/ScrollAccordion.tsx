import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export type AccordionItem = {
  readonly num: string;
  readonly title: string;
  readonly body: string;
  readonly linkLabel: string;
  readonly linkTo: string;
};

interface Props {
  items: readonly AccordionItem[];
  sectionTitle?: string;
  eyebrow?: string;
}

export default function ScrollAccordion({ items, sectionTitle, eyebrow }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(idx);
            }
          });
        },
        {
          root: null,
          // Activate when item crosses the 40% mark of the viewport
          rootMargin: "-35% 0px -40% 0px",
          threshold: 0,
        },
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="scroll-accordion">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {sectionTitle && (
        <h2 className="section-title scroll-accordion__heading">{sectionTitle}</h2>
      )}

      <ul className="scroll-accordion__list" role="list">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <li
              key={item.num}
              ref={(el) => { itemRefs.current[idx] = el; }}
              className={`scroll-accordion__item${isActive ? " scroll-accordion__item--active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <button
                className="scroll-accordion__trigger"
                aria-expanded={isActive}
                onClick={() => setActiveIndex(idx)}
                type="button"
              >
                <span className="scroll-accordion__num" aria-hidden="true">
                  {item.num}
                </span>
                <span className="scroll-accordion__title">{item.title}</span>
                {isActive && (
                  <span className="scroll-accordion__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </button>

              <div
                className="scroll-accordion__panel"
                role="region"
                aria-label={item.title}
                hidden={!isActive}
              >
                <p className="scroll-accordion__body">{item.body}</p>
                <Link
                  className="scroll-accordion__link"
                  to={item.linkTo}
                >
                  {item.linkLabel} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
