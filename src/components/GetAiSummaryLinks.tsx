import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { buildAiSummaryPrompt, LLM_LINKS } from "../lib/buildAiSummaryPrompt";
import { trackEvent } from "../lib/analytics";

interface Props {
  pageLabel?: string;
  /** Icon-only row for scenic footer bar (Duna pattern) */
  compact?: boolean;
}

export default function GetAiSummaryLinks({ pageLabel, compact = false }: Props) {
  const { pathname } = useLocation();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const title = document.title;
    const url = `https://airat.in${pathname === "/" ? "" : pathname}`;
    setPrompt(buildAiSummaryPrompt({ pageTitle: title, pageLabel, canonicalUrl: url }));
  }, [pathname, pageLabel]);

  if (!prompt) return null;

  return (
    <div
      className={`ai-summary-links${compact ? " ai-summary-links--compact" : ""}`}
      role="group"
      aria-label="Summarize this page with AI"
    >
      <span className="ai-summary-links__label">Get an AI summary of AiRAT:</span>
      <div className="ai-summary-links__icons">
        {LLM_LINKS.map((llm) => (
          <a
            key={llm.id}
            href={llm.urlFn(prompt)}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-summary-links__btn"
            aria-label={`Summarize with ${llm.label}`}
            title={llm.label}
            onClick={() => trackEvent("ai_summary_click", { llm: llm.id, page_path: pathname })}
          >
            <span aria-hidden="true">{llm.icon}</span>
            {!compact ? <span className="ai-summary-links__btn-label">{llm.label}</span> : null}
          </a>
        ))}
      </div>
    </div>
  );
}
