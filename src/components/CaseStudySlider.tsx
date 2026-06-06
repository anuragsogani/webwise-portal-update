import { Link } from "react-router-dom";
import type { CaseStudy } from "../api/caseStudies";
import "../styles/case-study-slider.css";

interface CaseStudySliderProps {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  caseStudies: CaseStudy[];
}

export default function CaseStudySlider({ activeIndex, onActiveIndexChange, caseStudies }: CaseStudySliderProps) {

  if (!caseStudies || !caseStudies.length) return null;

  const safeIndex = activeIndex % caseStudies.length;
  const activeProject = caseStudies[safeIndex];

  return (
    <>
      <div className="cs-slider-info" style={{ display: "flex", flexDirection: "column", gap: "1rem", minHeight: "240px" }}>
        <h2 className="hp-feature__title">{activeProject.title}</h2>
        <p className="hp-feature__sub">{activeProject.summary || activeProject.description}</p>
        <Link className="hp-feature__cta" to={`/portfolio/${activeProject.slug}`}>
          Read the case study <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="cs-slider">
        <div className="cs-slider__dots" aria-hidden="true">
          {caseStudies.map((project, idx) => {
            const isActive = idx === safeIndex;
            return (
              <div
                key={project.slug}
                className={`cs-slider__dot ${isActive ? "is-active" : ""}`}
                onClick={() => onActiveIndexChange(idx)}
              >
                {isActive && <div className="cs-slider__dot-progress" key={idx} />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
