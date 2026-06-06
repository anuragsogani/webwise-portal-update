export interface AiSummaryContext {
  pageTitle?: string;
  pageLabel?: string;
  canonicalUrl?: string;
}

const BRAND_CONTEXT =
  "AiRAT — production platforms for enterprise security (SIEM/XDR), AI & LLM systems (RAG, agents), and data/search estates, delivered in UAE, India, APAC, and Europe.";

export function buildAiSummaryPrompt(ctx: AiSummaryContext): string {
  const title = ctx.pageLabel || (ctx.pageTitle || "").replace(/\s*\|\s*AiRAT\s*$/, "").trim();
  const url = ctx.canonicalUrl || (typeof window !== "undefined" ? window.location.href : "https://airat.in");
  return `Please summarize this page from ${BRAND_CONTEXT} Focus on what the page covers, who it is for, and the key business or technical value. Page: "${title}" — ${url}`;
}

export const LLM_LINKS = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    icon: "✦",
    urlFn: (prompt: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "claude",
    label: "Claude",
    icon: "◆",
    urlFn: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: "gemini",
    label: "Gemini",
    icon: "✧",
    urlFn: (prompt: string) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
] as const;
