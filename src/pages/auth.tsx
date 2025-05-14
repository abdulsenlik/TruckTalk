import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthForm from "@/components/auth/AuthForm";
import { useLanguage } from "@/components/LanguageSelector";
import LanguageSelector from "@/components/LanguageSelector";

const AuthPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              {t("button.back")}
            </Button>
            <h1 className="text-xl font-bold">TruckTalk</h1>
          </div>
          <div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} TruckTalk. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
