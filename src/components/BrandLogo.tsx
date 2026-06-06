import { BRAND_LOGO_ROUND, BRAND_NAME } from "../content/brandAssets";
import "../styles/brand-logo.css";

type BrandLogoProps = {
  size?: number;
  className?: string;
  /** Set when visible wordmark is adjacent (avoids duplicate screen reader label). */
  decorative?: boolean;
};

export default function BrandLogo({ size = 36, className, decorative = false }: BrandLogoProps) {
  return (
    <img
      src={BRAND_LOGO_ROUND}
      alt={decorative ? "" : BRAND_NAME}
      width={size}
      height={size}
      className={["brand-logo", className].filter(Boolean).join(" ")}
      decoding="async"
      {...(decorative ? { "aria-hidden": true } : {})}
    />
  );
}
