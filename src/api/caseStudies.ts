import { getApiBaseUrl } from "../lib/apiBaseUrl";
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
} from "../content/portfolioPageCopy";

function apiUrl(path: string): string {
  return `${getApiBaseUrl()}${path}`;
}

const HOVER_ART_BY_SLUG: Record<string, string> = {
  "hawkeye-multi-tenant-cybersecurity-platform": "/doodles/portfolio/hawkeye-siem-xdr.svg",
  "enterprise-xdr-agent-windows-endpoint-protection": "/doodles/portfolio/windows-xdr-agent.svg",
  "dva-institutional-cryptocurrency-trading-platform": "/doodles/portfolio/crypto-trading-platform.svg",
  "elk-log-observability-tier1-bank": "/doodles/portfolio/elk-observability-bank.svg",
  "msazn-opensearch-ecommerce-search-uae": "/doodles/portfolio/opensearch-ecommerce.svg",
  "genda-phool-hyperlocal-delivery-platform-india": "/doodles/portfolio/genda-phool-delivery.svg",
  "safemargin-ai-cyber-insurance-marketplace": "/doodles/portfolio/safemargin-insurance-ai.svg",
  "socai-bot-ai-cyber-compliance-assistant": "/doodles/portfolio/socai-bot-assistant.svg",
  "athena-unified-ai-cybersecurity-platform-eu": "/doodles/portfolio/athena-unified-platform.svg",
  "enterprise-delta-lake-unified-analytics-platform": "/doodles/portfolio/delta-lake-analytics.svg",
};

function fromPortfolioProject(project: PortfolioProject, index: number): CaseStudy {
  const hoverSrc = HOVER_ART_BY_SLUG[project.slug] ?? "/doodles/security-detection.svg";
  return {
    id: project.slug,
    slug: project.slug,
    title: project.title,
    category: project.category,
    summary: project.summary,
    outcomes: [...(project.outcomes ?? [])],
    description: project.description,
    context: project.context,
    problem: [...project.problem],
    solution: [...project.solution],
    architecture_notes: [...(project.architectureNotes ?? [])],
    tech_stack: project.techStack.map((g) => ({
      category: g.category,
      items: [...g.items],
    })),
    results: [...project.results],
    learnings: [...project.learnings],
    faqs: (project.faqs ?? []).map((f) => ({ q: f.q, a: f.a })),
    seo_title: project.seoTitle ?? project.title,
    seo_description: project.seoDescription ?? project.summary,
    year: "2024",
    hover_art_src: hoverSrc,
    hover_art_alt: project.title,
    hover_art_caption: project.summary,
    sort_order: index,
    is_deleted: false,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-01T00:00:00.000Z",
  };
}

function staticCaseStudies(): CaseStudy[] {
  return PORTFOLIO_PROJECTS.map(fromPortfolioProject);
}

async function readJson<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error("API returned non-JSON (check /api proxy in vite.config.ts)");
  }
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  outcomes: string[];
  description: string;
  context: string;
  problem: string[];
  solution: string[];
  architecture_notes: string[];
  tech_stack: TechStackGroup[];
  results: string[];
  learnings: string[];
  faqs: FaqItem[];
  seo_title: string;
  seo_description: string;
  year: string;
  hover_art_src: string;
  hover_art_alt: string;
  hover_art_caption: string;
  sort_order: number;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseStudyCreateRequest {
  slug: string;
  title: string;
  category?: string;
  summary?: string;
  outcomes?: string[];
  description?: string;
  context?: string;
  problem?: string[];
  solution?: string[];
  architecture_notes?: string[];
  tech_stack?: TechStackGroup[];
  results?: string[];
  learnings?: string[];
  faqs?: FaqItem[];
  seo_title?: string;
  seo_description?: string;
  year?: string;
  hover_art_src?: string;
  hover_art_alt?: string;
  hover_art_caption?: string;
  sort_order?: number;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all case studies (ordered by sort_order). Falls back to static copy if API is unavailable. */
export async function listCaseStudies(): Promise<{ case_studies: CaseStudy[]; count: number }> {
  try {
    const res = await fetch(apiUrl("/case-studies"));
    return await readJson(res);
  } catch {
    const case_studies = staticCaseStudies();
    return { case_studies, count: case_studies.length };
  }
}

/** Fetch a single case study by slug. Falls back to static copy if API is unavailable. */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  try {
    const res = await fetch(apiUrl(`/case-studies/${slug}`));
    if (res.status === 404) throw new Error("Case study not found");
    return await readJson(res);
  } catch (e) {
    if (e instanceof Error && e.message === "Case study not found") throw e;
    const match = staticCaseStudies().find((cs) => cs.slug === slug);
    if (match) return match;
    throw new Error("Case study not found");
  }
}

/** Fetch all distinct categories from the DB. Falls back to static categories. */
export async function listCaseStudyCategories(): Promise<{ categories: string[] }> {
  try {
    const res = await fetch(apiUrl("/case-studies/categories"));
    return await readJson(res);
  } catch {
    return {
      categories: PORTFOLIO_CATEGORIES.filter((c) => c !== "All") as string[],
    };
  }
}

// ─── Admin API ────────────────────────────────────────────────────────────────

function _authHeaders(): HeadersInit {
  const token = localStorage.getItem("airat_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Admin: create a new case study. */
export async function createCaseStudy(data: CaseStudyCreateRequest): Promise<CaseStudy> {
  const res = await fetch(apiUrl("/case-studies"), {
    method: "POST",
    headers: _authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.detail || "Failed to create case study");
  }
  return res.json();
}

/** Admin: update an existing case study by slug. */
export async function updateCaseStudy(
  slug: string,
  data: Partial<CaseStudyCreateRequest>,
): Promise<CaseStudy> {
  const res = await fetch(apiUrl(`/case-studies/${slug}`), {
    method: "PUT",
    headers: _authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.detail || "Failed to update case study");
  }
  return res.json();
}

/** Admin: soft-delete a case study by slug. */
export async function deleteCaseStudy(slug: string): Promise<{ ok: boolean }> {
  const res = await fetch(apiUrl(`/case-studies/${slug}`), {
    method: "DELETE",
    headers: _authHeaders(),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.detail || "Failed to delete case study");
  }
  return res.json();
}

/** Admin: upsert a batch of case studies (seed). */
export async function seedCaseStudies(
  items: CaseStudyCreateRequest[],
): Promise<{ upserted_count: number; error_count: number; errors: Array<{ slug: string; error: string }> }> {
  const res = await fetch(apiUrl("/case-studies/seed"), {
    method: "POST",
    headers: _authHeaders(),
    body: JSON.stringify(items),
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    throw new Error(payload?.detail || "Seed failed");
  }
  return res.json();
}

// ─── Hover art fallback map (client-side only — stored in DB per case study) ──

export const DEFAULT_HOVER_ART = {
  src: "/doodles/security-detection.svg",
  alt: "Pastel doodle representing production security and detection systems",
  caption: "Hover a case study to see a contextual visual preview.",
} as const;
