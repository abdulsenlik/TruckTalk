import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
            "@radix-ui/react-progress",
            "@radix-ui/react-toast",
            "@radix-ui/react-accordion",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-label",
            "@radix-ui/react-separator",
            "@radix-ui/react-switch",
          ],
          "supabase-vendor": ["@supabase/supabase-js"],
          "utils-vendor": [
            "lucide-react",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
          // App chunks
          pages: [
            "./src/pages/modules.tsx",
            "./src/pages/module/[id].tsx",
            "./src/pages/lesson/[id].tsx",
            "./src/pages/auth.tsx",
            "./src/pages/pricing.tsx",
            "./src/pages/progress.tsx",
            "./src/pages/emergency.tsx",
            "./src/pages/success.tsx",
          ],
          components: [
            "./src/components/DialoguePlayer.tsx",
            "./src/components/RoleplayDialogue.tsx",
            "./src/components/ModuleCard.tsx",
            "./src/components/LanguageSelector.tsx",
            "./src/components/UserAuthButton.tsx",
            "./src/components/SubscriptionPlans.tsx",
            "./src/components/CheckoutButton.tsx",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
});
