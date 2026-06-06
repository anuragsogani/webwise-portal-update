export type FaqPair = { readonly question: string; readonly answer: string };

export type BreadcrumbItem = { readonly name: string; readonly path: string };

export function faqPageSchema(faqs: readonly FaqPair[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(origin: string, items: readonly BreadcrumbItem[]) {
  const list = items.map((item, i) => {
    const isLast = i === items.length - 1;
    const path = item.path === "/" ? "/" : item.path.startsWith("/") ? item.path : `/${item.path}`;
    const url = `${origin.replace(/\/$/, "")}${path === "/" ? "/" : path}`;
    const el: Record<string, unknown> = {
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
    };
    if (!isLast) el.item = url;
    return el;
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list,
  };
}

/** BlogPosting / Article-style structured data for insights posts */
export function blogPostingSchema(options: {
  origin: string;
  headline: string;
  description: string;
  urlPath: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}) {
  const base = options.origin.replace(/\/$/, "");
  const path = options.urlPath.startsWith("/") ? options.urlPath : `/${options.urlPath}`;
  const url = `${base}${path === "/" ? "/" : path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: {
      "@type": "Organization",
      name: "AiRAT",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "AiRAT",
      url: base,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: options.imageUrl ?? `${base}/og-image.png`,
  };
}

export function siteNavigationSchema(origin: string, links: readonly { readonly label: string; readonly to: string }[]) {
  const base = origin.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": links.map((link) => {
      const path = link.to.startsWith("/") ? link.to : `/${link.to}`;
      return {
        "@type": "SiteNavigationElement",
        name: link.label,
        url: `${base}${path === "/" ? "/" : path}`,
      };
    }),
  };
}

export function injectJsonLdScript(id: string, data: unknown): () => void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return () => {
    el?.remove();
  };
}
