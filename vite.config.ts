import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = process.env.GITHUB_PAGES_BASE || "/";
  // Ensure base ends with / and remove leading / from icon paths to avoid double slashes
  const basePath = base.endsWith("/") ? base : `${base}/`;
  
  return {
    base: basePath,
    server: {
      host: "::",
      port: 8000,
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "RosettaScript",
          short_name: "RosettaScript",
          description: "Developer tools for converting, automating, and building. Word to HTML converters, database visualization, and more.",
          start_url: basePath,
          scope: basePath,
          display: "standalone",
          background_color: "#16181d",
          theme_color: "#22c55e",
          orientation: "portrait-primary",
          icons: [
            {
              src: `${basePath}icon-192.png`,
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: `${basePath}icon-512.png`,
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
          categories: ["developer tools", "utilities", "productivity"],
        },
        // Use manifest.json instead of manifest.webmanifest
        manifestFilename: "manifest.json",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
