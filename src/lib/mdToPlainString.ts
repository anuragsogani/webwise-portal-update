import { isValidElement } from "react";
import type { ReactNode } from "react";

/** Flatten react-markdown heading children to plain text for slug IDs */
export function mdToPlainString(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(mdToPlainString).join("");
  if (isValidElement(node) && node.props && typeof node.props === "object" && "children" in node.props) {
    return mdToPlainString((node.props as { children?: ReactNode }).children);
  }
  return "";
}
