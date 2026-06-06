import { createContext, useCallback, useContext, useEffect, useMemo } from "react";

export type SiteTheme = "light";

const STORAGE_KEY = "airat-theme-v2";

function applyDomTheme() {
  document.documentElement.setAttribute("data-theme", "light");
}

function syncThemeColorMeta() {
  let el = document.querySelector('meta[name="theme-color"]');
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", "theme-color");
    document.head.appendChild(el);
  }
  el.setAttribute("content", "#ffffff");
}

type ThemeContextValue = {
  theme: SiteTheme;
  setTheme: (t: SiteTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Light-only theme for the Duna design preview. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    applyDomTheme();
    syncThemeColorMeta();
    try {
      localStorage.setItem(STORAGE_KEY, "light");
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((_t: SiteTheme) => {
    applyDomTheme();
  }, []);

  const toggleTheme = useCallback(() => {
    applyDomTheme();
  }, []);

  const value = useMemo(
    () => ({ theme: "light" as const, setTheme, toggleTheme }),
    [setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
