import React, { useEffect, useState } from "react";
import "../styles/preloader.css";

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Show preloader for a consistent 2s every time the component mounts
    // This ensures it works on every navigation to the home page.
    const duration = 1000;

    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(() => setLoading(false), 1000);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`airat-preloader ${exit ? "airat-preloader--exit" : ""}`} aria-hidden="true">
      <div className="airat-preloader__content">
        <div className="airat-preloader__logo-container">
          <span className="airat-preloader__text">AiRAT</span>
          <div className="airat-preloader__glitch-layer">AiRAT</div>
          <div className="airat-preloader__glitch-layer">AiRAT</div>
        </div>
        <div className="airat-preloader__track">
          <div className="airat-preloader__progress"></div>
        </div>
        <div className="airat-preloader__status">Initializing Core Systems...</div>
      </div>
    </div>
  );
};

export default Preloader;
