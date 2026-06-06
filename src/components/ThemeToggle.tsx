import { useTheme } from "../theme/ThemeContext";

type Props = { variant?: "default" | "footer" | "header" };

export default function ThemeToggle({ variant = "default" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const footer = variant === "footer";
  const header = variant === "header";

  return (
    <button
      type="button"
      className={`theme-toggle${footer ? " theme-toggle--footer" : ""}${header ? " theme-toggle--header" : ""}`}
      onClick={toggleTheme}
      aria-pressed={isLight}
      aria-label={
        isLight
          ? "Switch to current design (dark theme)"
          : "Switch to new design preview (light theme)"
      }
      title={isLight ? "Current design" : "New design preview"}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
        <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3 8.5 8.5 0 1 0 21 14.5Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </span>
      {footer ? (
        <span className="theme-toggle__label theme-toggle__label--footer">
          {isLight ? "New design" : "Current"}
        </span>
      ) : !header ? (
        <span className="theme-toggle__label">{isLight ? "New design" : "Current"}</span>
      ) : null}
    </button>
  );
}
