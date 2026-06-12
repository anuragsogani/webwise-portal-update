import { getApiBaseUrl } from "../lib/apiBaseUrl";

function apiUrl(path: string): string {
  return `${getApiBaseUrl()}${path}`;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  reading_time_minutes: number;
  key_takeaways: any[];
  glossary_links: any[];
  faqs: any[];
  body_markdown: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCreateRequest {
  title: string;
  slug?: string;
  description?: string;
  author?: string;
  category?: string;
  tags?: string[];
  key_takeaways?: any[];
  faqs?: any[];
  body_markdown: string;
  published_at?: string | null;
}

export async function createBlog(data: BlogCreateRequest) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let detail = "Failed to create blog post";
    try {
      const payload = await response.json();
      if (Array.isArray(payload?.detail)) {
        detail = payload.detail.map((err: any) => err.msg).join(", ");
      } else {
        detail = payload?.detail || detail;
      }
    } catch {
      // Ignore
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function bulkCreateBlogs(data: BlogCreateRequest[]) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/bulk"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let detail = "Bulk import failed";
    try {
      const payload = await response.json();
      if (Array.isArray(payload?.detail)) {
        detail = payload.detail.map((err: any) => err.msg).join(", ");
      } else {
        detail = payload?.detail || detail;
      }
    } catch {
      // Ignore
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function getAdminBlogs() {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/admin"), {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error("Failed to fetch admin blogs");
  return response.json();
}

export async function reorderBlogs(orders: { id: string; sort_order: number }[]) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/reorder"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ orders }),
  });
  if (!response.ok) throw new Error("Failed to reorder blogs");
  return response.json();
}

export async function bulkUpdateBlogs(ids: string[], status?: string, published_at?: string | null) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/bulk-update"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ ids, status, published_at }),
  });
  if (!response.ok) throw new Error("Failed to update blogs");
  return response.json();
}

export async function getSlots() {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/slots"), {
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error("Failed to fetch slots");
  return response.json();
}

export async function addSlot(slot_time: string, day_of_week?: number | null) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl("/blogs/slots"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ slot_time, day_of_week }),
  });
  if (!response.ok) throw new Error("Failed to add slot");
  return response.json();
}

export async function deleteSlot(id: string) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl(`/blogs/slots/${id}`), {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (!response.ok) throw new Error("Failed to delete slot");
  return response.json();
}

export async function listPublishedBlogs(): Promise<{ blogs: Blog[]; count: number }> {
  const response = await fetch(apiUrl("/blogs"));
  if (!response.ok) throw new Error("Failed to fetch published blogs");
  return response.json();
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const response = await fetch(apiUrl(`/blogs/${slug}`));
  if (!response.ok) {
    if (response.status === 404) throw new Error("Article not found");
    throw new Error("Failed to fetch blog post");
  }
  return response.json();
}

export async function deleteBlog(id: string) {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl(`/blogs/${id}`), {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete blog");
  return response.json();
}

export async function getBlogById(id: string): Promise<Blog> {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl(`/blogs/admin/${id}`), {
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Blog not found");
  return response.json();
}

export async function updateBlog(id: string, data: BlogCreateRequest): Promise<Blog> {
  const token = localStorage.getItem("airat_token");
  const response = await fetch(apiUrl(`/blogs/${id}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    let detail = "Failed to update blog post";
    try {
      const payload = await response.json();
      detail = Array.isArray(payload?.detail)
        ? payload.detail.map((e: any) => e.msg).join(", ")
        : payload?.detail || detail;
    } catch { /* ignore */ }
    throw new Error(detail);
  }
  return response.json();
}

export async function listCategories(): Promise<{ categories: string[] }> {
  const response = await fetch(apiUrl("/blogs/categories"));
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

/** Known category labels - used as a display-name lookup for well-known slugs. */
export const KNOWN_CATEGORY_LABELS: Record<string, string> = {
  "ai-llm": "AI & LLM Systems",
  "cyber-soc": "Security & SOC",
  "data-search": "Data & Search",
  "playbooks": "Engineering Playbooks",
  "case-thinking": "Decision Frameworks",
};

/** Humanise any category slug into a display label. */
export function formatCategoryLabel(slug: string): string {
  if (KNOWN_CATEGORY_LABELS[slug]) return KNOWN_CATEGORY_LABELS[slug];
  return slug
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}


// ─── Subscription API ──────────────────────────────────────────────────────

export async function subscribeToInsights(email: string): Promise<{ ok: boolean; message: string }> {
  const response = await fetch(apiUrl("/subscribe"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    let detail = "Failed to subscribe";
    try {
      const payload = await response.json();
      detail = payload?.detail || detail;
    } catch {
      // Ignore
    }
    throw new Error(detail);
  }

  return response.json();
}

export async function unsubscribeFromInsights(email: string): Promise<{ ok: boolean; message: string }> {
  const response = await fetch(apiUrl("/unsubscribe"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    let detail = "Failed to unsubscribe";
    try {
      const payload = await response.json();
      detail = payload?.detail || detail;
    } catch {
      // Ignore
    }
    throw new Error(detail);
  }

  return response.json();
}

