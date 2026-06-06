import type { FaqItem } from "../faqTypes";

/** Five fixed categories for filtering and IA */
export type BlogCategory = "ai-llm" | "cyber-soc" | "data-search" | "playbooks" | "case-thinking";

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  "ai-llm": "AI & LLM Systems",
  "cyber-soc": "Security & SOC",
  "data-search": "Data & Search",
  playbooks: "Engineering Playbooks",
  "case-thinking": "Decision Frameworks",
};

export const BLOG_CATEGORY_ORDER: readonly BlogCategory[] = [
  "ai-llm",
  "cyber-soc",
  "data-search",
  "playbooks",
  "case-thinking",
];

export type BlogPostMeta = {
  readonly slug: string;
  readonly title: string;
  /** Meta description (~150–160 chars) */
  readonly description: string;
  readonly author: string;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly readingTimeMinutes: number;
  readonly tags: readonly string[];
  readonly category: BlogCategory;
  readonly relatedSlugs: readonly string[];
  readonly faqs: readonly FaqItem[];
  /** Glossary term slugs mentioned in this article  -  drives cross-link chips */
  readonly glossaryLinks?: readonly string[];
  /** 5–7 bullet key takeaways for GEO scannability and AI citation */
  readonly keyTakeaways?: readonly string[];
};

export type BlogPost = BlogPostMeta & {
  readonly bodyMarkdown: string;
};
