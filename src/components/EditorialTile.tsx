import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "../styles/editorial-tile.css";

export type EditorialTileMeta = {
  readonly label: string;
  readonly value: string;
};

type EditorialTileBaseProps = {
  title: string;
  description: string;
  meta?: readonly EditorialTileMeta[];
  ctaLabel?: string;
  variant?: "default" | "industry";
  className?: string;
  children?: ReactNode;
};

type EditorialTileLinkProps = EditorialTileBaseProps & {
  href: string;
  onClick?: () => void;
};

type EditorialTileStaticProps = EditorialTileBaseProps & {
  href?: undefined;
  onClick?: undefined;
};

export type EditorialTileProps = EditorialTileLinkProps | EditorialTileStaticProps;

function EditorialTileContent({
  title,
  description,
  meta,
  ctaLabel,
  children,
}: EditorialTileBaseProps) {
  return (
    <>
      <div className="editorial-tile__main">
        {children}
        <h3 className="editorial-tile__title">{title}</h3>
        <p className="editorial-tile__desc">{description}</p>
      </div>
      {(meta?.length || ctaLabel) && (
        <div className="editorial-tile__foot">
          {meta && meta.length > 0 && (
            <dl className="editorial-tile__meta">
              {meta.map((row) => (
                <div key={row.label} className="editorial-tile__meta-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {ctaLabel ? <span className="editorial-tile__cta">{ctaLabel}</span> : null}
        </div>
      )}
    </>
  );
}

export default function EditorialTile(props: EditorialTileProps) {
  const { href, className, variant = "default", onClick, ...contentProps } = props;
  const classes = ["editorial-tile", variant === "industry" ? "editorial-tile--industry" : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={classes} onClick={onClick}>
          <EditorialTileContent {...contentProps} variant={variant} />
        </a>
      );
    }

    return (
      <Link to={href} className={classes} onClick={onClick}>
        <EditorialTileContent {...contentProps} variant={variant} />
      </Link>
    );
  }

  return (
    <article className={classes}>
      <EditorialTileContent {...contentProps} variant={variant} />
    </article>
  );
}
