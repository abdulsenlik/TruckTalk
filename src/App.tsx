import { Suspense, lazy, useEffect, useState } from "react";
import { useRoutes, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import { Toaster } from "./components/ui/toaster";
import { supabase } from "./lib/supabase";
import ErrorBoundary from "./components/ErrorBoundary";
import { AudioPermissionProvider } from "./components/AudioPermissionProvider";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import UpsellModal from "./components/UpsellModal";
import { useSubscription } from "./contexts/SubscriptionContext";
import { LanguageProvider } from "./components/LanguageSelector";

// Tempo routes component to handle conditional routing
function TempoRoutes() {
  const [routes, setRoutes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only attempt to load tempo-routes if VITE_TEMPO is explicitly true
    if (import.meta.env.VITE_TEMPO === "true") {
      setIsLoading(true);

      // Use a timeout to prevent hanging the startup
      const timeoutId = setTimeout(() => {
        console.warn(
          "[App] Tempo routes loading timeout - continuing without tempo routes",
        );
        setHasError(true);
        setIsLoading(false);
      }, 5000); // 5 second timeout

      import("tempo-routes")
        .then((module) => {
          clearTimeout(timeoutId);
          console.log("[App] Tempo routes loaded successfully");
          if (module.default && Array.isArray(module.default)) {
            setRoutes(module.default);
          } else {
            console.warn("[App] Invalid tempo routes format");
            setHasError(true);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          console.warn("[App] Failed to load tempo-routes:", error);
          setHasError(true);
          setIsLoading(false);
        });
    }
  }, []);

  // Don't render anything while loading or if there's an error
  if (isLoading || hasError || !routes) {
    return null;
  }

  // Use the routes hook only when we have valid routes
  try {
    return useRoutes(routes);
  } catch (error) {
    console.error("[App] Error rendering tempo routes:", error);
    return null;
  }
}

// Lazy load pages for better performance
const ModuleDetailPage = lazy(() => import("./pages/module/[id]"));
const LessonDetailPage = lazy(() => import("./pages/lesson/[id]"));
const SuccessPage = lazy(() => import("./pages/success"));
const ModulesPage = lazy(() => import("./pages/modules"));
const EmergencyPage = lazy(() => import("./pages/emergency"));
const ProgressPage = lazy(() => import("./pages/progress"));
const AuthPage = lazy(() => import("./pages/auth"));
const PricingPage = lazy(() => import("./pages/pricing"));
const LandingPage = lazy(() => import("./pages/landing"));

// Inner App component that uses subscription context
function AppContent() {
  const navigate = useNavigate();
  const { upgradeModalVisible, upgradeFeature, hideUpgradeModal } =
    useSubscription();

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
    <>
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
            <Route path="/landing" element={<LandingPage />} />
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
          {/* Tempo routes component handles conditional routing */}
          <TempoRoutes />
          <Toaster />
        </>
      </Suspense>

      {/* Global Upsell Modal */}
      <UpsellModal
        open={upgradeModalVisible}
        onClose={hideUpgradeModal}
        feature={upgradeFeature}
      />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AudioPermissionProvider>
          <SubscriptionProvider>
            <AppContent />
          </SubscriptionProvider>
        </AudioPermissionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
