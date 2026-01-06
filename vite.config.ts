import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use root base path for custom domain (www.studiobura.com)
  // If deploying to GitHub Pages subdirectory, change to "/studio-bura-local/"
  base: "/",
  build: {
    outDir: "dist",
    // Optimize images during build
    assetsInlineLimit: 4096,
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url: URL) => {
        // Convert JPG and PNG to WebP format for better compression
        if (url.searchParams.has("webp") === false) {
          url.searchParams.set("format", "webp");
        }
        // Set quality to 85 for good balance between size and quality
        if (url.searchParams.has("quality") === false) {
          url.searchParams.set("quality", "85");
        }
        return new URLSearchParams(url.searchParams);
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
