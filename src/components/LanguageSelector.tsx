import React, { useState, useEffect, createContext, useContext } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface TranslationDictionary {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageSelectorProps {
  onSelectLanguage?: (code: string) => void;
  selectedLanguage?: string;
  className?: string;
}

// Create a context for language
export const LanguageContext = createContext<{
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}>({
  language: "tr",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionary
export const translations: TranslationDictionary = {
  "home.hero.title": {
    tr: "Kamyon Şoförleri için Temel İngilizce Öğrenin",
    kg: "Жүк ташуучу айдоочулар үчүн негизги англис тилин үйрөнүңүз",
    ru: "Изучите основной английский для водителей грузовиков",
    en: "Learn Essential English for Truck Drivers",
  },
  "home.hero.subtitle": {
    tr: "Amerika Birleşik Devletleri'nde trafik durdurma, yol kenarı denetimleri ve acil durumlar için ihtiyacınız olan İngilizce ifadeleri öğrenin.",
    kg: "АКШда токтотуу, жол боюндагы текшерүүлөр жана өзгөчө кырдаалдар үчүн керектүү англисче сөздөрдү үйрөнүңүз.",
    ru: "Освойте английские фразы, необходимые для остановки движения, придорожных проверок и чрезвычайных ситуаций в США.",
    en: "Master the English phrases you need for traffic stops, roadside inspections, and emergencies in the United States.",
  },
  "button.startLearning": {
    tr: "Öğrenmeye Başla",
    kg: "Үйрөнүүнү баштоо",
    ru: "Начать обучение",
    en: "Start Learning",
  },
  "button.emergencyPhrases": {
    tr: "Acil Durum İfadeleri",
    kg: "Шашылыш сөздөр",
    ru: "Экстренные фразы",
    en: "Emergency Phrases",
  },
  "nav.home": {
    tr: "Ana Sayfa",
    kg: "Башкы бет",
    ru: "Главная",
    en: "Home",
  },
  "nav.modules": {
    tr: "Modüller",
    kg: "Модулдар",
    ru: "Модули",
    en: "Modules",
  },
  "nav.progress": {
    tr: "İlerleme Durumum",
    kg: "Менин прогрессим",
    ru: "Мой прогресс",
    en: "My Progress",
  },
  "nav.emergency": {
    tr: "Acil Durum İfadeleri",
    kg: "Шашылыш сөздөр",
    ru: "Экстренные фразы",
    en: "Emergency Phrases",
  },
  "modules.title": {
    tr: "Öğrenme Modülleri",
    kg: "Окуу модулдары",
    ru: "Учебные модули",
    en: "Learning Modules",
  },
  "modules.viewAll": {
    tr: "Tümünü Görüntüle",
    kg: "Баарын көрүү",
    ru: "Посмотреть все",
    en: "View All",
  },
  "subscription.title": {
    tr: "Planınızı Seçin",
    kg: "Планыңызды тандаңыз",
    ru: "Выберите свой план",
    en: "Choose Your Plan",
  },
  "subscription.subtitle": {
    tr: "Öğrenme ihtiyaçlarınıza ve bütçenize en uygun planı seçin.",
    kg: "Окуу муктаждыктарыңызга жана бюджетиңизге ылайык келген планды тандаңыз.",
    ru: "Выберите план, который лучше всего соответствует вашим потребностям в обучении и бюджету.",
    en: "Select the plan that best fits your learning needs and budget.",
  },
  "emergency.title": {
    tr: "Hızlı Erişim: Acil Durum İfadeleri",
    kg: "Тез кирүү: Шашылыш сөздөр",
    ru: "Быстрый доступ: Экстренные фразы",
    en: "Quick Access: Emergency Phrases",
  },
  "emergency.viewAll": {
    tr: "Tümünü Görüntüle",
    kg: "Баарын көрүү",
    ru: "Посмотреть все",
    en: "View All",
  },
  "footer.description": {
    tr: "İngilizce konuşmayan kamyon şoförleri için temel İngilizce dil eğitimi.",
    kg: "Англис тилин билбеген жүк ташуучу айдоочулар үчүн негизги англис тили боюнча окутуу.",
    ru: "Базовое обучение английскому языку для водителей грузовиков, не говорящих по-английски.",
    en: "Essential English language training for non-English speaking truck drivers.",
  },
  "footer.quickLinks": {
    tr: "Hızlı Bağlantılar",
    kg: "Тез шилтемелер",
    ru: "Быстрые ссылки",
    en: "Quick Links",
  },
  "footer.support": {
    tr: "Destek",
    kg: "Колдоо",
    ru: "Поддержка",
    en: "Support",
  },
  "footer.helpCenter": {
    tr: "Yardım Merkezi",
    kg: "Жардам борбору",
    ru: "Центр помощи",
    en: "Help Center",
  },
  "footer.contactUs": {
    tr: "Bize Ulaşın",
    kg: "Биз менен байланышуу",
    ru: "Связаться с нами",
    en: "Contact Us",
  },
  "footer.privacyPolicy": {
    tr: "Gizlilik Politikası",
    kg: "Купуялык саясаты",
    ru: "Политика конфиденциальности",
    en: "Privacy Policy",
  },
  "footer.termsOfService": {
    tr: "Hizmet Şartları",
    kg: "Тейлөө шарттары",
    ru: "Условия обслуживания",
    en: "Terms of Service",
  },
  "footer.rights": {
    tr: "Tüm hakları saklıdır.",
    kg: "Бардык укуктар корголгон.",
    ru: "Все права защищены.",
    en: "All rights reserved.",
  },
  "auth.login": {
    tr: "Giriş Yap",
    kg: "Кирүү",
    ru: "Войти",
    en: "Login",
  },
  "auth.signup": {
    tr: "Kayıt Ol",
    kg: "Катталуу",
    ru: "Зарегистрироваться",
    en: "Sign Up",
  },
  "progress.title": {
    tr: "İlerleme Durumum",
    kg: "Менин прогрессим",
    ru: "Мой прогресс",
    en: "My Progress",
  },
  "progress.overall": {
    tr: "Genel İlerleme",
    kg: "Жалпы прогресс",
    ru: "Общий прогресс",
    en: "Overall Progress",
  },
  "progress.dialoguesCompleted": {
    tr: "Tamamlanan Diyaloglar",
    kg: "Аяктаган диалогдор",
    ru: "Завершенные диалоги",
    en: "Dialogues Completed",
  },
  "progress.modulesStarted": {
    tr: "Başlanan Modüller",
    kg: "Башталган модулдар",
    ru: "Начатые модули",
    en: "Modules Started",
  },
  "progress.modulesCompleted": {
    tr: "Tamamlanan Modüller",
    kg: "Аяктаган модулдар",
    ru: "Завершенные модули",
    en: "Modules Completed",
  },
  "progress.moduleProgress": {
    tr: "Modül İlerlemesi",
    kg: "Модуль прогресси",
    ru: "Прогресс модуля",
    en: "Module Progress",
  },
  "progress.achievements": {
    tr: "Başarılar",
    kg: "Жетишкендиктер",
    ru: "Достижения",
    en: "Achievements",
  },
  "button.continue": {
    tr: "Devam Et",
    kg: "Улантуу",
    ru: "Продолжить",
    en: "Continue",
  },
  "button.back": {
    tr: "Geri",
    kg: "Артка",
    ru: "Назад",
    en: "Back",
  },
  "emergency.warning": {
    tr: "Sadece Acil Durum Kullanımı İçin",
    kg: "Өзгөчө кырдаалдарда гана колдонуу үчүн",
    ru: "Только для использования в экстренных случаях",
    en: "Emergency Use Only",
  },
  "emergency.description": {
    tr: "Bu ifadeler acil durumlar için tasarlanmıştır. İngilizce olarak duymak için herhangi bir ifadeye dokunun.",
    kg: "Бул сөздөр өзгөчө кырдаалдар үчүн иштелип чыккан. Англисче угуу үчүн каалаган сөзгө басыңыз.",
    ru: "Эти фразы предназначены для экстренных ситуаций. Нажмите на любую фразу, чтобы услышать ее на английском языке.",
    en: "These phrases are designed for urgent situations. Tap any phrase to hear it spoken in English.",
  },
  "emergency.search": {
    tr: "Acil durum ifadelerini ara...",
    kg: "Шашылыш сөздөрдү издөө...",
    ru: "Поиск экстренных фраз...",
    en: "Search emergency phrases...",
  },
  "emergency.all": {
    tr: "Tümü",
    kg: "Баары",
    ru: "Все",
    en: "All",
  },
  "emergency.medical": {
    tr: "Tıbbi",
    kg: "Медициналык",
    ru: "Медицинский",
    en: "Medical",
  },
  "emergency.vehicle": {
    tr: "Araç",
    kg: "Унаа",
    ru: "Транспорт",
    en: "Vehicle",
  },
  "emergency.accident": {
    tr: "Kaza",
    kg: "Кырсык",
    ru: "Авария",
    en: "Accident",
  },
  "emergency.police": {
    tr: "Polis",
    kg: "Милиция",
    ru: "Полиция",
    en: "Police",
  },
  "emergency.noResults": {
    tr: "Aramanızla eşleşen ifade bulunamadı.",
    kg: "Сиздин издөөңүзгө туура келген сөздөр табылган жок.",
    ru: "Не найдено фраз, соответствующих вашему поиску.",
    en: "No phrases found matching your search.",
  },
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(() => {
    // Try to get from localStorage or default to "tr"
    return localStorage.getItem("language") || "tr";
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || translations[key].en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

const LanguageSelector = ({
  onSelectLanguage = () => {},
  selectedLanguage = "tr",
  className = "",
}: LanguageSelectorProps) => {
  const languages: Language[] = [
    {
      code: "tr",
      name: "Türkçe",
      flag: "🇹🇷",
    },
    {
      code: "kg",
      name: "Кыргызча",
      flag: "🇰🇬",
    },
    {
      code: "ru",
      name: "Русский",
      flag: "🇷🇺",
    },
    {
      code: "en",
      name: "English",
      flag: "🇺🇸",
    },
  ];

  // Use the language context
  const { language, setLanguage } = useLanguage();
  const [selected, setSelected] = useState<string>(
    language || selectedLanguage,
  );

  useEffect(() => {
    // Update selected when language context changes
    setSelected(language);
  }, [language]);

  const handleLanguageSelect = (language: Language) => {
    setSelected(language.code);
    setLanguage(language.code);
    onSelectLanguage(language.code);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === selected) || languages[0];

  return (
    <div className={cn("relative bg-background", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="mr-1">{currentLanguage.flag}</span>
            <span>{currentLanguage.name}</span>
          </div>
          <ChevronDown className="w-4 h-4 ml-2 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent"
              onClick={() => handleLanguageSelect(language)}
            >
              <div className="flex items-center gap-2">
                <span className="mr-1">{language.flag}</span>
                <span>{language.name}</span>
              </div>
              {selected === language.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSelector;
