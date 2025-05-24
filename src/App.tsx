import { Suspense, lazy, useEffect } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { Toaster } from "./components/ui/toaster";
import { supabase } from "./lib/supabase";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load pages for better performance
const ModuleDetailPage = lazy(() => import("./pages/module/[id]"));
const LessonDetailPage = lazy(() => import("./pages/lesson/[id]"));
const SuccessPage = lazy(() => import("./pages/success"));
const ModulesPage = lazy(() => import("./pages/modules"));
const EmergencyPage = lazy(() => import("./pages/emergency"));
const ProgressPage = lazy(() => import("./pages/progress"));
const AuthPage = lazy(() => import("./pages/auth"));
const PricingPage = lazy(() => import("./pages/pricing"));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // User has signed in, you can redirect or update state
        console.log("User signed in:", session?.user);
      } else if (event === "SIGNED_OUT") {
        // User has signed out, you can redirect or update state
        console.log("User signed out");
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        }
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/module/:id" element={<ModuleDetailPage />} />
            <Route path="/lesson/:id" element={<LessonDetailPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Add tempobook route to prevent catchall from capturing it */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Toaster />
        </>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
