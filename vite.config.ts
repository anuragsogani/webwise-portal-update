import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const apiProxyTarget = env.VITE_API_PROXY_TARGET || "https://airat.in";
  const isLocalBackend =
    apiProxyTarget.includes("127.0.0.1") || apiProxyTarget.includes("localhost");

  return {
    base: env.VITE_BASE ?? "/",
    plugins: [react()],
    server: {
      fs: {
        allow: [".."],
      },
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: !isLocalBackend,
          ...(isLocalBackend
            ? { rewrite: (path: string) => path.replace(/^\/api/, "") }
            : {}),
        },
      },
    },
  };
});
