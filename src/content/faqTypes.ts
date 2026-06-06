/** Shared FAQ shape for visible UI + FAQPage JSON-LD */
export type FaqItem = { readonly q: string; readonly a: string };

export function faqsToSchemaPairs(items: readonly FaqItem[]) {
  return items.map((i) => ({ question: i.q, answer: i.a }));
}
