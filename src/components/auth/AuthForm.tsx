import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageSelector";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login error:", error);

        let errorMessage = error.message;

        // Handle specific error cases
        if (
          error.message?.toLowerCase().includes("invalid") &&
          error.message?.toLowerCase().includes("email")
        ) {
          errorMessage =
            "Email validation failed. Please check your Supabase project settings - email confirmation might be enabled without proper email delivery configuration.";
        } else if (
          error.message?.toLowerCase().includes("invalid login credentials")
        ) {
          errorMessage =
            "Invalid email or password. Please check your credentials and try again.";
        }

        toast({
          variant: "destructive",
          title: t("auth.loginFailed"),
          description: errorMessage,
        });
        return;
      }

      toast({
        title: t("auth.loginSuccessful"),
        description: t("auth.welcomeBack"),
      });
      navigate("/");
    } catch (error: any) {
      console.error("Login catch error:", error);
      toast({
        variant: "destructive",
        title: t("auth.somethingWrong"),
        description: t("auth.tryAgain"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting signup with:", {
        email: data.email,
        name: data.name,
      });

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      console.log("Signup response:", { authData, error });

      if (error) {
        console.error("Signup error:", error);
        console.error("Full error object:", JSON.stringify(error, null, 2));

        let errorMessage = error.message;

        // Handle specific error cases with more helpful messages
        if (
          error.message?.toLowerCase().includes("invalid") &&
          error.message?.toLowerCase().includes("email")
        ) {
          errorMessage =
            "Email validation failed. This is likely due to Supabase configuration. Please check if:\n\n1. Email confirmation is enabled in your Supabase project\n2. Email delivery is properly configured\n3. There are no domain restrictions\n\nTry disabling email confirmation in Authentication > Settings temporarily.";
        } else if (
          error.message?.toLowerCase().includes("user already registered")
        ) {
          errorMessage =
            "An account with this email already exists. Please try logging in instead.";
        } else if (
          error.message?.toLowerCase().includes("signup is disabled")
        ) {
          errorMessage =
            "Account creation is currently disabled. Please contact support.";
        }

        toast({
          variant: "destructive",
          title: t("auth.signupFailed"),
          description: errorMessage,
        });
        return;
      }

      // Check if user was created successfully
      if (authData.user) {
        toast({
          title: t("auth.signupSuccessful"),
          description: authData.user.email_confirmed_at
            ? "Account created successfully! You can now log in."
            : t("auth.checkEmail"),
        });

        // If email is already confirmed, redirect to login
        if (authData.user.email_confirmed_at) {
          setActiveTab("login");
        }
      } else {
        toast({
          title: t("auth.signupSuccessful"),
          description: t("auth.checkEmail"),
        });
        setActiveTab("login");
      }
    } catch (error: any) {
      console.error("Signup catch error:", error);
      console.error("Full catch error object:", JSON.stringify(error, null, 2));

      toast({
        variant: "destructive",
        title: t("auth.somethingWrong"),
        description:
          "An unexpected error occurred. Please check the console for details and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="text-xl font-bold">TruckTalk</span>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
          <TabsTrigger value="signup">{t("auth.signup")}</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-6">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.emailPlaceholder")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.passwordPlaceholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth.loggingIn") : t("auth.login")}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="signup" className="mt-6">
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
              className="space-y-4"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.emailPlaceholder")}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.passwordPlaceholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("auth.passwordPlaceholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("auth.creatingAccount") : t("auth.signup")}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
