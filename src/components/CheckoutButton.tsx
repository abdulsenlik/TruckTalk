import React, { useState } from "react";
import { useLanguage } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/lib/stripe";
import { useToast } from "@/components/ui/use-toast";

interface CheckoutButtonProps {
  priceId: string;
  buttonText: string;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  customerEmail?: string;
}

const CheckoutButton = ({
  priceId,
  buttonText,
  disabled = false,
  variant = "default",
  className,
  customerEmail,
}: CheckoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Skip checkout for free tier
  if (priceId === "free") {
    return (
      <Button className={className} variant={variant} disabled={true}>
        {buttonText}
      </Button>
    );
  }

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data } = await createCheckoutSession({
        priceId,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/`,
        customerEmail,
      });

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: t ? t("checkout.error") : "Checkout Error",
        description: t
          ? t("checkout.errorDescription")
          : "There was a problem starting the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className={className}
      variant={variant}
      disabled={disabled || isLoading}
      onClick={handleCheckout}
    >
      {isLoading ? "Loading..." : buttonText}
    </Button>
  );
};

export default CheckoutButton;
