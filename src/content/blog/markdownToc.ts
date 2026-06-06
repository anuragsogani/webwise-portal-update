import { slugifyHeading } from "../../lib/slugifyHeading";

export type TocEntry = { readonly text: string; readonly id: string };

/** Build stable ids for `##` headings (deduped). */
export function tocFromMarkdownH2(markdown: string): TocEntry[] {
  const re = /^## (.+)$/gm;
  const out: TocEntry[] = [];
  const used = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    const text = m[1].trim().replace(/\s+#+\s*$/, "");
    let base = slugifyHeading(text);
    let id = base;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n++}`;
    }
    used.add(id);
    out.push({ text, id });
  }
  return out;
}
