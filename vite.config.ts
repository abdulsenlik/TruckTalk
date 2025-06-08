import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    // Only include tempo plugin when VITE_TEMPO is true
    ...(process.env.VITE_TEMPO === "true" ? [tempo()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
      // Mark tempo-routes as external during production builds
      external: process.env.VITE_TEMPO !== "true" ? ["tempo-routes"] : [],
    },
  },
  server: {
    host: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "priceless-shtern4-wmeud.view-3.tempo-dev.app",
      ".tempo-dev.app", // Allow all tempo-dev.app subdomains
    ],
  },
  // Add optimizeDeps to handle tempo-routes properly
  optimizeDeps: {
    exclude: ["tempo-routes"], // Always exclude tempo-routes from pre-bundling
    include: [], // Don't force include anything that might conflict
  },
});
