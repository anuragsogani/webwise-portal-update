import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ServiceBlock } from "../content/servicesPageCopy";
import { SERVICE_STACK_EYEBROWS, SERVICE_STACK_TAGS } from "../content/servicesStackUi";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type Props = {
  services: readonly ServiceBlock[];
  sectionTitle: string;
  sectionLead: string;
};

export default function ServiceStackExplorer({ services, sectionTitle, sectionLead }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const sectionRef = useRef<HTMLElement>(null);

  const active = services.find((s) => s.id === activeId) ?? services[0]!;
  const activeIndex = Math.max(0, services.findIndex((s) => s.id === active.id));
  const tags = SERVICE_STACK_TAGS[active.id] ?? [];
  const eyebrow = SERVICE_STACK_EYEBROWS[active.id] ?? "Scope  -  production systems, not slide decks";

  const select = useCallback((id: string) => {
    setActiveId(id);
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}#${id}`);
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && services.some((s) => s.id === hash)) setActiveId(hash);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [services]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || !services.some((s) => s.id === hash)) return;
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    });
  }, [services, reduceMotion]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const idx = services.findIndex((s) => s.id === activeId);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const n = services[Math.min(services.length - 1, idx + 1)];
        if (n) select(n.id);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const n = services[Math.max(0, idx - 1)];
        if (n) select(n.id);
      } else if (e.key === "Home") {
        e.preventDefault();
        select(services[0]!.id);
      } else if (e.key === "End") {
        e.preventDefault();
        select(services[services.length - 1]!.id);
      }
    },
    [activeId, services, select],
  );

  const progressPct = ((activeIndex + 1) / services.length) * 100;

  return (
    <section
      ref={sectionRef}
      className="services-stack-section inner-section"
      id="service-stacks"
      aria-labelledby="services-stack-heading"
    >
      <div className="services-stack-blueprint" aria-hidden="true" />
      <h2 id="services-stack-heading" className="section-title">
        {sectionTitle}
      </h2>
      <p className="section-lead services-stack-lead">{sectionLead}</p>

      <div className="services-stack-layout">
        <aside className="services-stack-aside">
          <p className="services-stack-label">Stacks</p>
          <div className="services-stack-tablist" role="tablist" aria-label="Service stacks" onKeyDown={onKeyDown}>
            {services.map((svc) => {
              const selected = svc.id === activeId;
              return (
                <button
                  key={svc.id}
                  type="button"
                  role="tab"
                  id={`stack-tab-${svc.id}`}
                  aria-selected={selected}
                  aria-controls="services-stack-panel"
                  tabIndex={selected ? 0 : -1}
                  className={`services-stack-tab${selected ? " is-active" : ""}`}
                  onClick={() => select(svc.id)}
                  onMouseEnter={() => select(svc.id)}
                >
                  <span className="services-stack-tab__text">{svc.title}</span>
                </button>
              );
            })}
          </div>
          <div className="services-stack-rail" aria-hidden="true">
            <div className="services-stack-rail__fill" style={{ width: `${progressPct}%` }} />
          </div>
        </aside>

        <div className="services-stack-main">
          <div
            role="tabpanel"
            id="services-stack-panel"
            aria-labelledby={`stack-tab-${active.id}`}
            className="services-stack-panel-outer"
          >
            <div key={active.id} className={`services-stack-panel${reduceMotion ? "" : " is-anim"}`}>
              <ServiceStackHeroDoodle stackId={active.id} label={`${active.title}  -  illustrated concept sketch`} />

              <div className="services-stack-bridge" aria-hidden="true">
                <span className="services-stack-bridge__line" />
                <span className="services-stack-bridge__dot" />
              </div>

              <div className="services-stack-copy">
                <p className="services-stack-problem">{active.problemClass}</p>
                <p className="services-stack-eyebrow">{eyebrow}</p>
                <h3 className="services-stack-title">{active.title}</h3>
                <p className="services-stack-body">{active.description}</p>
                <p className="eyebrow services-stack-sub">What you get Monday</p>
                <ul className="services-stack-bullets">
                  {active.covered.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                {active.caseStudy ? (
                  <p className="services-stack-case">
                    <Link className="services-stack-case__link" to={active.caseStudy.to}>
                      {active.caseStudy.label} <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                ) : null}
                <dl className="service-qa services-stack-qa">
                  <dt>{active.q}</dt>
                  <dd>{active.a}</dd>
                </dl>
                {tags.length > 0 ? (
                  <div className="services-stack-tags" aria-label="Technologies and patterns">
                    {tags.map((t) => (
                      <span key={t} className="services-stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
