import React from "react";

interface SeverityBadgeProps {
  severity: string;
  size?: "xs" | "sm";
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, size = "xs" }) => {
  let colors = "";
  switch (severity) {
    case "Critical":
      colors = "bg-red-50 text-red-700 border-red-200";
      break;
    case "High":
      colors = "bg-orange-50 text-orange-700 border-orange-200";
      break;
    case "Medium":
      colors = "bg-amber-50 text-amber-700 border-amber-200";
      break;
    case "Low":
      colors = "bg-emerald-50 text-emerald-700 border-emerald-200";
      break;
    default:
      colors = "bg-blue-50 text-blue-700 border-blue-200";
      break;
  }

  const textSize =
    size === "sm" ? "text-[11px] px-2.5 py-1" : "text-[10px] px-2 py-0.5";

  return (
    <span
      className={`inline-flex items-center justify-center rounded font-bold uppercase tracking-wider border ${colors} ${textSize}`}
    >
      {severity}
    </span>
  );
};

