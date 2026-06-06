import { Link } from "react-router-dom";

export type CtaBandAction = {
  label: string;
  to: string;
};

type Props = {
  title: string;
  body: string;
  primary: CtaBandAction;
  secondary?: CtaBandAction;
  note?: string;
  footnotes?: string;
  id?: string;
  className?: string;
};

/** Full-width dark closing band — headline, body, lime primary action. */
export default function CtaBand({
  title,
  body,
  primary,
  secondary,
  note,
  footnotes,
  id,
  className = "",
}: Props) {
  const headingId = id ?? "cta-band-heading";

  return (
    <section
      className={`section section--dark cta-band ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <div className="container cta-band__inner">
        <h2 id={headingId} className="cta-band__title">
          {title}
        </h2>
        <p className="cta-band__sub">{body}</p>
        {note ? <p className="cta-band__note">{note}</p> : null}
        <div className="cta-band__actions">
          <Link to={primary.to} className="btn btn--primary">
            {primary.label}
          </Link>
          {secondary ? (
            <Link to={secondary.to} className="btn btn--on-dark">
              {secondary.label}
            </Link>
          ) : null}
        </div>
        {footnotes ? <p className="cta-band__footnotes">{footnotes}</p> : null}
      </div>
    </section>
  );
}
