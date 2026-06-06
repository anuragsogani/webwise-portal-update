import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { ThemeProvider } from "./theme/ThemeContext";
import "./styles/tokens.css";
import "./styles/theme.css";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/responsive.css";
import "./styles/scroll-animations.css";
import "./styles/duna-light-pages.css";
import "./styles/layout-spacing.css";
import "./styles/duna-theme-overrides.css";
import "./styles/editorial-tile.css";
import "./styles/industry-tile.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <GoogleAnalytics />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
);
