import { Link } from "react-router-dom";
import type { PortfolioIndustry } from "../content/portfolioPageCopy";
import IndustryFloatingIcons from "./IndustryFloatingIcons";
import "../styles/industry-tile.css";

type IndustryTileProps = {
  industry: PortfolioIndustry;
  title: string;
  description: string;
  href: string;
  caseCount?: number;
};

export default function IndustryTile({
  industry,
  title,
  description,
  href,
  caseCount,
}: IndustryTileProps) {
  return (
    <Link to={href} className="industry-tile">
      <IndustryFloatingIcons industry={industry} />
      <div className="industry-tile__body">
        <h2 className="industry-tile__title">{title}</h2>
        <p className="industry-tile__desc">{description}</p>
        {caseCount !== undefined && (
          <p className="industry-tile__count">
            {caseCount} {caseCount === 1 ? "case study" : "case studies"}
          </p>
        )}
      </div>
      <span className="industry-tile__arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}
