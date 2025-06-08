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
  },
});
