import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { absoluteUrl } from "../lib/siteBaseUrl";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  indexable?: boolean;
}

const DEFAULT_TITLE = "AiRAT - Production security, AI & data platforms";
const DEFAULT_DESCRIPTION = "AiRAT builds production security, AI, and data platforms for regulated enterprises in UAE, India, and Europe. Senior-led delivery. SLO-anchored outcomes.";
const DEFAULT_IMAGE = "webwise-portal-update/public/brand-logo-round.png";

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  indexable = true,
}) => {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} | AiRAT` : DEFAULT_TITLE;
  const canonicalUrl = url || absoluteUrl(pathname);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Indexability */}
      {!indexable && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
