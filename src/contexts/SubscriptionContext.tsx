import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

export type SubscriptionTier = "free" | "pro" | "premium";

interface SubscriptionFeatures {
  maxModules: number;
  hasQuizzes: boolean;
  hasAITutor: boolean;
  hasProgressTracking: boolean;
  hasOfflineDownloads: boolean;
  hasAudioPronunciation: boolean;
  hasPrioritySupport: boolean;
  hasCustomLearningPath: boolean;
}

interface SubscriptionContextType {
  currentTier: SubscriptionTier;
  features: SubscriptionFeatures;
  isLoading: boolean;
  canAccessFeature: (feature: keyof SubscriptionFeatures) => boolean;
  showUpgradeModal: (feature: string) => void;
  hideUpgradeModal: () => void;
  upgradeModalVisible: boolean;
  upgradeFeature: string;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
};

const getFeaturesByTier = (tier: SubscriptionTier): SubscriptionFeatures => {
  switch (tier) {
    case "free":
      return {
        maxModules: 2,
        hasQuizzes: false,
        hasAITutor: false,
        hasProgressTracking: false,
        hasOfflineDownloads: false,
        hasAudioPronunciation: false,
        hasPrioritySupport: false,
        hasCustomLearningPath: false,
      };
    case "pro":
      return {
        maxModules: -1, // unlimited
        hasQuizzes: true,
        hasAITutor: false,
        hasProgressTracking: true,
        hasOfflineDownloads: false,
        hasAudioPronunciation: true,
        hasPrioritySupport: false,
        hasCustomLearningPath: false,
      };
    case "premium":
      return {
        maxModules: -1, // unlimited
        hasQuizzes: true,
        hasAITutor: true,
        hasProgressTracking: true,
        hasOfflineDownloads: true,
        hasAudioPronunciation: true,
        hasPrioritySupport: true,
        hasCustomLearningPath: true,
      };
    default:
      return getFeaturesByTier("free");
  }
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>("free");
  const [isLoading, setIsLoading] = useState(true);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("");

  const features = getFeaturesByTier(currentTier);

  const refreshSubscription = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCurrentTier("free");
        setIsLoading(false);
        return;
      }

      // Check user's subscription status from database
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("id", user.id)
        .single();

      if (profile?.subscription_tier) {
        setCurrentTier(profile.subscription_tier as SubscriptionTier);
      } else {
        setCurrentTier("free");
      }
    } catch (error) {
      console.error("Error fetching subscription:", error);
      setCurrentTier("free");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshSubscription();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        refreshSubscription();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const canAccessFeature = (feature: keyof SubscriptionFeatures): boolean => {
    return features[feature] === true || features[feature] === -1;
  };

  const showUpgradeModal = (feature: string) => {
    setUpgradeFeature(feature);
    setUpgradeModalVisible(true);
  };

  const hideUpgradeModal = () => {
    setUpgradeModalVisible(false);
    setUpgradeFeature("");
  };

  const contextValue: SubscriptionContextType = {
    currentTier,
    features,
    isLoading,
    canAccessFeature,
    showUpgradeModal,
    hideUpgradeModal,
    upgradeModalVisible,
    upgradeFeature,
    refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};
