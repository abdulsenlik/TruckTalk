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
interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translation dictionary
export const translations: TranslationDictionary = {
  "home.hero.title": {
    en: "Learn Essential English for Truck Drivers",
    tr: "Kamyon Şoförleri için Temel İngilizce Öğrenin",
    kg: "Жүк ташуучу айдоочулар үчүн негизги англис тилин үйрөнүңүз",
    ru: "Изучите основной английский для водителей грузовиков",
    zh: "学习卡车司机必备英语",
    es: "Aprende Inglés Esencial para Conductores de Camiones",
  },
  "home.hero.subtitle": {
    en: "Master the English phrases you need for traffic stops, roadside inspections, and emergencies in the United States.",
    tr: "Amerika Birleşik Devletleri'nde trafik durdurma, yol kenarı denetimleri ve acil durumlar için ihtiyacınız olan İngilizce ifadeleri öğrenin.",
    kg: "АКШда токтотуу, жол боюндагы текшерүүлөр жана өзгөчө кырдаалдар үчүн керектүү англисче сөздөрдү үйрөнүңүз.",
    ru: "Освойте английские фразы, необходимые для остановки движения, придорожных проверок и чрезвычайных ситуаций в США.",
    zh: "掌握在美国交通停车、路边检查和紧急情况下所需的英语短语。",
    es: "Domina las frases en inglés que necesitas para paradas de tráfico, inspecciones en carretera y emergencias en Estados Unidos.",
  },
  "button.startLearning": {
    en: "Start Learning",
    tr: "Öğrenmeye Başla",
    kg: "Үйрөнүүнү баштоо",
    ru: "Начать обучение",
    zh: "开始学习",
    es: "Comenzar a Aprender",
  },
  "button.emergencyPhrases": {
    en: "Emergency Phrases",
    tr: "Acil Durum İfadeleri",
    kg: "Шашылыш сөздөр",
    ru: "Экстренные фразы",
    zh: "紧急短语",
    es: "Frases de Emergencia",
  },
  "nav.home": {
    en: "Home",
    tr: "Ana Sayfa",
    kg: "Башкы бет",
    ru: "Главная",
    zh: "首页",
    es: "Inicio",
  },
  "nav.modules": {
    en: "Modules",
    tr: "Modüller",
    kg: "Модулдар",
    ru: "Модули",
    zh: "模块",
    es: "Módulos",
  },
  "nav.progress": {
    en: "My Progress",
    tr: "İlerleme Durumum",
    kg: "Менин прогрессим",
    ru: "Мой прогресс",
    zh: "我的进度",
    es: "Mi Progreso",
  },
  "nav.emergency": {
    en: "Emergency Phrases",
    tr: "Acil Durum İfadeleri",
    kg: "Шашылыш сөздөр",
    ru: "Экстренные фразы",
    zh: "紧急短语",
    es: "Frases de Emergencia",
  },
  "modules.title": {
    en: "Learning Modules",
    tr: "Öğrenme Modülleri",
    kg: "Окуу модулдары",
    ru: "Учебные модули",
    zh: "学习模块",
    es: "Módulos de Aprendizaje",
  },
  "modules.viewAll": {
    en: "View All",
    tr: "Tümünü Görüntüle",
    kg: "Баарын көрүү",
    ru: "Посмотреть все",
    zh: "查看全部",
    es: "Ver Todo",
  },
  "subscription.title": {
    en: "Choose Your Plan",
    tr: "Planınızı Seçin",
    kg: "Планыңызды тандаңыз",
    ru: "Выберите свой план",
    zh: "选择您的计划",
    es: "Elige Tu Plan",
  },
  "subscription.subtitle": {
    en: "Select the plan that best fits your learning needs and budget.",
    tr: "Öğrenme ihtiyaçlarınıza ve bütçenize en uygun planı seçin.",
    kg: "Окуу муктаждыктарыңызга жана бюджетиңизге ылайык келген планды тандаңыз.",
    ru: "Выберите план, который лучше всего соответствует вашим потребностям в обучении и бюджету.",
    zh: "选择最适合您学习需求和预算的计划。",
    es: "Selecciona el plan que mejor se adapte a tus necesidades de aprendizaje y presupuesto.",
  },
  "emergency.title": {
    en: "Quick Access: Emergency Phrases",
    tr: "Hızlı Erişim: Acil Durum İfadeleri",
    kg: "Тез кирүү: Шашылыш сөздөр",
    ru: "Быстрый доступ: Экстренные фразы",
    zh: "快速访问：紧急短语",
    es: "Acceso Rápido: Frases de Emergencia",
  },
  "emergency.viewAll": {
    en: "View All",
    tr: "Tümünü Görüntüle",
    kg: "Баарын көрүү",
    ru: "Посмотреть все",
    zh: "查看全部",
    es: "Ver Todo",
  },
  "footer.description": {
    en: "Essential English language training for non-English speaking truck drivers.",
    tr: "İngilizce konuşmayan kamyon şoförleri için temel İngilizce dil eğitimi.",
    kg: "Англис тилин билбеген жүк ташуучу айдоочулар үчүн негизги англис тили боюнча окутуу.",
    ru: "Базовое обучение английскому языку для водителей грузовиков, не говорящих по-английски.",
    zh: "为不会说英语的卡车司机提供基础英语语言培训。",
    es: "Entrenamiento esencial de inglés para conductores de camiones que no hablan inglés.",
  },
  "footer.quickLinks": {
    en: "Quick Links",
    tr: "Hızlı Bağlantılar",
    kg: "Тез шилтемелер",
    ru: "Быстрые ссылки",
    zh: "快速链接",
    es: "Enlaces Rápidos",
  },
  "footer.support": {
    en: "Support",
    tr: "Destek",
    kg: "Колдоо",
    ru: "Поддержка",
    zh: "支持",
    es: "Soporte",
  },
  "footer.helpCenter": {
    en: "Help Center",
    tr: "Yardım Merkezi",
    kg: "Жардам борбору",
    ru: "Центр помощи",
    zh: "帮助中心",
    es: "Centro de Ayuda",
  },
  "footer.contactUs": {
    en: "Contact Us",
    tr: "Bize Ulaşın",
    kg: "Биз менен байланышуу",
    ru: "Связаться с нами",
    zh: "联系我们",
    es: "Contáctanos",
  },
  "footer.privacyPolicy": {
    en: "Privacy Policy",
    tr: "Gizlilik Politikası",
    kg: "Купуялык саясаты",
    ru: "Политика конфиденциальности",
    zh: "隐私政策",
    es: "Política de Privacidad",
  },
  "footer.termsOfService": {
    en: "Terms of Service",
    tr: "Hizmet Şartları",
    kg: "Тейлөө шарттары",
    ru: "Условия обслуживания",
    zh: "服务条款",
    es: "Términos de Servicio",
  },
  "footer.rights": {
    en: "All rights reserved.",
    tr: "Tüm hakları saklıdır.",
    kg: "Бардык укуктар корголгон.",
    ru: "Все права защищены.",
    zh: "保留所有权利。",
    es: "Todos los derechos reservados.",
  },
  "auth.login": {
    en: "Login",
    tr: "Giriş Yap",
    kg: "Кирүү",
    ru: "Войти",
    zh: "登录",
    es: "Iniciar Sesión",
  },
  "auth.signup": {
    en: "Sign Up",
    tr: "Kayıt Ol",
    kg: "Катталуу",
    ru: "Зарегистрироваться",
    zh: "注册",
    es: "Registrarse",
  },
  "auth.logout": {
    en: "Logout",
    tr: "Çıkış Yap",
    kg: "Чыгуу",
    ru: "Выйти",
    zh: "登出",
    es: "Cerrar Sesión",
  },
  "progress.title": {
    en: "My Progress",
    tr: "İlerleme Durumum",
    kg: "Менин прогрессим",
    ru: "Мой прогресс",
    zh: "我的进度",
    es: "Mi Progreso",
  },
  "progress.overall": {
    en: "Overall Progress",
    tr: "Genel İlerleme",
    kg: "Жалпы прогресс",
    ru: "Общий прогресс",
    zh: "总体进度",
    es: "Progreso General",
  },
  "progress.dialoguesCompleted": {
    en: "Dialogues Completed",
    tr: "Tamamlanan Diyaloglar",
    kg: "Аяктаган диалогдор",
    ru: "Завершенные диалоги",
    zh: "已完成对话",
    es: "Diálogos Completados",
  },
  "progress.modulesStarted": {
    en: "Modules Started",
    tr: "Başlanan Modüller",
    kg: "Башталган модулдар",
    ru: "Начатые модули",
    zh: "已开始模块",
    es: "Módulos Iniciados",
  },
  "progress.modulesCompleted": {
    en: "Modules Completed",
    tr: "Tamamlanan Modüller",
    kg: "Аяктаган модулдар",
    ru: "Завершенные модули",
    zh: "已完成模块",
    es: "Módulos Completados",
  },
  "progress.moduleProgress": {
    en: "Module Progress",
    tr: "Modül İlerlemesi",
    kg: "Модуль прогресси",
    ru: "Прогресс модуля",
    zh: "模块进度",
    es: "Progreso del Módulo",
  },
  "progress.achievements": {
    en: "Achievements",
    tr: "Başarılar",
    kg: "Жетишкендиктер",
    ru: "Достижения",
    zh: "成就",
    es: "Logros",
  },
  "button.continue": {
    en: "Continue",
    tr: "Devam Et",
    kg: "Улантуу",
    ru: "Продолжить",
    zh: "继续",
    es: "Continuar",
  },
  "button.back": {
    en: "Back",
    tr: "Geri",
    kg: "Артка",
    ru: "Назад",
    zh: "返回",
    es: "Atrás",
  },
  "emergency.warning": {
    en: "Emergency Use Only",
    tr: "Sadece Acil Durum Kullanımı İçin",
    kg: "Өзгөчө кырдаалдарда гана колдонуу үчүн",
    ru: "Только для использования в экстренных случаях",
    zh: "仅限紧急使用",
    es: "Solo para Uso de Emergencia",
  },
  "emergency.description": {
    en: "These phrases are designed for urgent situations. Tap any phrase to hear it spoken in English.",
    tr: "Bu ifadeler acil durumlar için tasarlanmıştır. İngilizce olarak duymak için herhangi bir ifadeye dokunun.",
    kg: "Бул сөздөр өзгөчө кырдаалдар үчүн иштелип чыккан. Англисче угуу үчүн каалаган сөзгө басыңыз.",
    ru: "Эти фразы предназначены для экстренных ситуаций. Нажмите на любую фразу, чтобы услышать ее на английском языке.",
    zh: "这些短语专为紧急情况设计。点击任何短语即可听到英语发音。",
    es: "Estas frases están diseñadas para situaciones urgentes. Toca cualquier frase para escucharla en inglés.",
  },
  "emergency.search": {
    en: "Search emergency phrases...",
    tr: "Acil durum ifadelerini ara...",
    kg: "Шашылыш сөздөрдү издөө...",
    ru: "Поиск экстренных фраз...",
    zh: "搜索紧急短语...",
    es: "Buscar frases de emergencia...",
  },
  "emergency.all": {
    en: "All",
    tr: "Tümü",
    kg: "Баары",
    ru: "Все",
    zh: "全部",
    es: "Todo",
  },
  "emergency.medical": {
    en: "Medical",
    tr: "Tıbbi",
    kg: "Медициналык",
    ru: "Медицинский",
    zh: "医疗",
    es: "Médico",
  },
  "emergency.vehicle": {
    en: "Vehicle",
    tr: "Araç",
    kg: "Унаа",
    ru: "Транспорт",
    zh: "车辆",
    es: "Vehículo",
  },
  "emergency.accident": {
    en: "Accident",
    tr: "Kaza",
    kg: "Кырсык",
    ru: "Авария",
    zh: "事故",
    es: "Accidente",
  },
  "emergency.police": {
    en: "Police",
    tr: "Polis",
    kg: "Милиция",
    ru: "Полиция",
    zh: "警察",
    es: "Policía",
  },
  "emergency.noResults": {
    en: "No phrases found matching your search.",
    tr: "Aramanızla eşleşen ifade bulunamadı.",
    kg: "Сиздин издөөңүзгө туура келген сөздөр табылган жок.",
    ru: "Не найдено фраз, соответствующих вашему поиску.",
    zh: "未找到与您搜索匹配的短语。",
    es: "No se encontraron frases que coincidan con tu búsqueda.",
  },
  "nav.pricing": {
    en: "Pricing",
    tr: "Fiyatlandırma",
    kg: "Баалар",
    ru: "Цены",
    zh: "价格",
    es: "Precios",
  },
  "subscription.mostPopular": {
    en: "Most Popular",
    tr: "En Popüler",
    kg: "Эң популярдуу",
    ru: "Самый популярный",
    zh: "最受欢迎",
    es: "Más Popular",
  },
  "subscription.perMonth": {
    en: "/month",
    tr: "/ay",
    kg: "/ай",
    ru: "/месяц",
    zh: "/月",
    es: "/mes",
  },
  "payment.processing": {
    en: "Processing your payment...",
    tr: "Ödemeniz işleniyor...",
    kg: "Төлөмүңүз иштелип жатат...",
    ru: "Обработка вашего платежа...",
    zh: "正在处理您的付款...",
    es: "Procesando su pago...",
  },
  "payment.successful": {
    en: "Payment Successful!",
    tr: "Ödeme Başarılı!",
    kg: "Төлөм ийгиликтүү болду!",
    ru: "Оплата прошла успешно!",
    zh: "付款成功！",
    es: "¡Pago Exitoso!",
  },
  "payment.thankYou": {
    en: "Thank you for your subscription to TruckTalk. You now have access to all the premium features.",
    tr: "TruckTalk aboneliğiniz için teşekkür ederiz. Artık tüm premium özelliklere erişiminiz var.",
    kg: "TruckTalk жазылуусу үчүн рахмат. Эми сиз бардык премиум мүмкүнчүлүктөргө кире аласыз.",
    ru: "Спасибо за подписку на TruckTalk. Теперь у вас есть доступ ко всем премиум-функциям.",
    zh: "感谢您订阅TruckTalk。您现在可以访问所有高级功能。",
    es: "Gracias por su suscripción a TruckTalk. Ahora tiene acceso a todas las funciones premium.",
  },
  "button.returnHome": {
    en: "Return to Home",
    tr: "Ana Sayfaya Dön",
    kg: "Башкы бетке кайтуу",
    ru: "Вернуться на главную",
    zh: "返回首页",
    es: "Volver al Inicio",
  },
  "button.loading": {
    en: "Loading...",
    tr: "Yükleniyor...",
    kg: "Жүктөлүүдө...",
    ru: "Загрузка...",
    zh: "加载中...",
    es: "Cargando...",
  },
  "modules.search": {
    en: "Search modules...",
    tr: "Modülleri ara...",
    kg: "Модулдарды издөө...",
    ru: "Поиск модулей...",
    zh: "搜索模块...",
    es: "Buscar módulos...",
  },
  "modules.filterByDifficulty": {
    en: "Filter by difficulty",
    tr: "Zorluk seviyesine göre filtrele",
    kg: "Кыйынчылык деңгээли боюнча чыпкала",
    ru: "Фильтр по сложности",
    zh: "按难度筛选",
    es: "Filtrar por dificultad",
  },
  "modules.allLevels": {
    en: "All Levels",
    tr: "Tüm Seviyeler",
    kg: "Бардык деңгээлдер",
    ru: "Все уровни",
    zh: "所有级别",
    es: "Todos los Niveles",
  },
  "modules.beginner": {
    en: "Beginner",
    tr: "Başlangıç",
    kg: "Башталгыч",
    ru: "Начинающий",
    zh: "初级",
    es: "Principiante",
  },
  "modules.intermediate": {
    en: "Intermediate",
    tr: "Orta",
    kg: "Орто",
    ru: "Средний",
    zh: "中级",
    es: "Intermedio",
  },
  "modules.advanced": {
    en: "Advanced",
    tr: "İleri",
    kg: "Жогорку",
    ru: "Продвинутый",
    zh: "高级",
    es: "Avanzado",
  },
  "modules.noResults": {
    en: "No modules found matching your search criteria.",
    tr: "Arama kriterlerinizle eşleşen modül bulunamadı.",
    kg: "Сиздин издөө критерийлериңизге туура келген модулдар табылган жок.",
    ru: "Не найдено модулей, соответствующих вашим критериям поиска.",
    zh: "未找到符合您搜索条件的模块。",
    es: "No se encontraron módulos que coincidan con sus criterios de búsqueda.",
  },
  "checkout.error": {
    en: "Checkout Error",
    tr: "Ödeme Hatası",
    kg: "Төлөм катасы",
    ru: "Ошибка оформления заказа",
    zh: "结账错误",
    es: "Error de pago",
  },
  "checkout.errorDescription": {
    en: "There was a problem starting the checkout process. Please try again.",
    tr: "Ödeme işlemi başlatılırken bir sorun oluştu. Lütfen tekrar deneyin.",
    kg: "Төлөм процессин баштоодо көйгөй чыкты. Кайра аракет кылыңыз.",
    ru: "Возникла проблема при запуске процесса оформления заказа. Пожалуйста, попробуйте еще раз.",
    zh: "启动结账过程时出现问题。请再试一次。",
    es: "Hubo un problema al iniciar el proceso de pago. Por favor, inténtelo de nuevo.",
  },
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(() => {
    // Try to get from localStorage or default to "en"
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem("language", language);

    // Force a re-render of the entire app when language changes
    document.documentElement.lang = language;

    // Force a re-render by dispatching a custom event
    window.dispatchEvent(
      new CustomEvent("languageChange", { detail: language }),
    );
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
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const LanguageSelector = ({
  onSelectLanguage = () => {},
  selectedLanguage = "en",
  className = "",
}: LanguageSelectorProps) => {
  const languages: Language[] = [
    {
      code: "en",
      name: "English",
      flag: "🇺🇸",
    },
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
      code: "zh",
      name: "中文 (简体)",
      flag: "🇨🇳",
    },
    {
      code: "es",
      name: "Español",
      flag: "🇪🇸",
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
