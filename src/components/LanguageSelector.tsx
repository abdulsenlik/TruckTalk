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
const translations: TranslationDictionary = {
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
  "nav.pricing": {
    en: "Pricing",
    tr: "Fiyatlandırma",
    kg: "Баалар",
    ru: "Цены",
    zh: "价格",
    es: "Precios",
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
  "emergency.downloadAudio": {
    en: "Download Audio",
    tr: "Ses Dosyasını İndir",
    kg: "Аудиону жүктөп алуу",
    ru: "Скачать аудио",
    zh: "下载音频",
    es: "Descargar audio",
  },
  "emergency.viewImage": {
    en: "View Image",
    tr: "Resmi Görüntüle",
    kg: "Сүрөттү көрүү",
    ru: "Просмотр изображения",
    zh: "查看图片",
    es: "Ver imagen",
  },
  "emergency.generateImage": {
    en: "Generate Image",
    tr: "Resim Oluştur",
    kg: "Сүрөт жаратуу",
    ru: "Создать изображение",
    zh: "生成图片",
    es: "Generar imagen",
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
  "auth.title": {
    en: "Sign In to TruckTalk",
    tr: "TruckTalk'a Giriş Yap",
    kg: "TruckTalk'ка кирүү",
    ru: "Войти в TruckTalk",
    zh: "登录TruckTalk",
    es: "Iniciar sesión en TruckTalk",
  },
  "auth.email": {
    en: "Email",
    tr: "E-posta",
    kg: "Электрондук почта",
    ru: "Электронная почта",
    zh: "邮箱",
    es: "Correo electrónico",
  },
  "auth.password": {
    en: "Password",
    tr: "Şifre",
    kg: "Сыр сөз",
    ru: "Пароль",
    zh: "密码",
    es: "Contraseña",
  },
  "auth.emailPlaceholder": {
    en: "Enter your email",
    tr: "E-postanızı girin",
    kg: "Электрондук почтаңызды киргизиңиз",
    ru: "Введите ваш email",
    zh: "输入您的邮箱",
    es: "Ingrese su correo electrónico",
  },
  "auth.passwordPlaceholder": {
    en: "Enter your password",
    tr: "Şifrenizi girin",
    kg: "Сыр сөзүңүздү киргизиңиз",
    ru: "Введите ваш пароль",
    zh: "输入您的密码",
    es: "Ingrese su contraseña",
  },
  "auth.signupSuccess": {
    en: "Account created!",
    tr: "Hesap oluşturuldu!",
    kg: "Эсеп түзүлдү!",
    ru: "Аккаунт создан!",
    zh: "账户已创建！",
    es: "¡Cuenta creada!",
  },
  "auth.signupSuccessDescription": {
    en: "Please check your email to verify your account.",
    tr: "Hesabınızı doğrulamak için e-postanızı kontrol edin.",
    kg: "Эсебиңизди ырастоо үчүн электрондук почтаңызды текшериңиз.",
    ru: "Пожалуйста, проверьте вашу электронную почту для подтверждения аккаунта.",
    zh: "请检查您的邮箱以验证您的账户。",
    es: "Por favor, revise su correo electrónico para verificar su cuenta.",
  },
  "auth.loginSuccess": {
    en: "Welcome back!",
    tr: "Tekrar hoş geldiniz!",
    kg: "Кайра кош келиңиз!",
    ru: "Добро пожаловать обратно!",
    zh: "欢迎回来！",
    es: "¡Bienvenido de vuelta!",
  },
  "auth.loginSuccessDescription": {
    en: "You have successfully signed in.",
    tr: "Başarıyla giriş yaptınız.",
    kg: "Ийгиликтүү кирдиңиз.",
    ru: "Вы успешно вошли в систему.",
    zh: "您已成功登录。",
    es: "Ha iniciado sesión exitosamente.",
  },
  "auth.error": {
    en: "Error",
    tr: "Hata",
    kg: "Ката",
    ru: "Ошибка",
    zh: "错误",
    es: "Error",
  },
  "auth.name": {
    en: "Full Name",
    tr: "Ad Soyad",
    kg: "Толук аты",
    ru: "Полное имя",
    zh: "全名",
    es: "Nombre Completo",
  },
  "auth.confirmPassword": {
    en: "Confirm Password",
    tr: "Şifreyi Onayla",
    kg: "Сыр сөздү ырастоо",
    ru: "Подтвердите пароль",
    zh: "确认密码",
    es: "Confirmar Contraseña",
  },
  "auth.loginFailed": {
    en: "Login failed",
    tr: "Giriş başarısız",
    kg: "Кирүү ийгиликсиз болду",
    ru: "Ошибка входа",
    zh: "登录失败",
    es: "Error de inicio de sesión",
  },
  "auth.signupFailed": {
    en: "Signup failed",
    tr: "Kayıt başarısız",
    kg: "Катталуу ийгиликсиз болду",
    ru: "Ошибка регистрации",
    zh: "注册失败",
    es: "Error de registro",
  },
  "auth.loginSuccessful": {
    en: "Login successful",
    tr: "Giriş başarılı",
    kg: "Ийгиликтүү кирдиңиз",
    ru: "Успешный вход",
    zh: "登录成功",
    es: "Inicio de sesión exitoso",
  },
  "auth.signupSuccessful": {
    en: "Signup successful",
    tr: "Kayıt başarılı",
    kg: "Ийгиликтүү катталдыңыз",
    ru: "Успешная регистрация",
    zh: "注册成功",
    es: "Registro exitoso",
  },
  "auth.welcomeBack": {
    en: "Welcome back to TruckTalk!",
    tr: "TruckTalk'a tekrar hoş geldiniz!",
    kg: "TruckTalk'ка кайра кош келиңиз!",
    ru: "Добро пожаловать обратно в TruckTalk!",
    zh: "欢迎回到TruckTalk！",
    es: "¡Bienvenido de vuelta a TruckTalk!",
  },
  "auth.checkEmail": {
    en: "Please check your email to verify your account.",
    tr: "Hesabınızı doğrulamak için e-postanızı kontrol edin.",
    kg: "Эсебиңизди ырастоо үчүн электрондук почтаңызды текшериңиз.",
    ru: "Пожалуйста, проверьте вашу электронную почту для подтверждения аккаунта.",
    zh: "请检查您的邮箱以验证您的账户。",
    es: "Por favor, revise su correo electrónico para verificar su cuenta.",
  },
  "auth.somethingWrong": {
    en: "Something went wrong",
    tr: "Bir şeyler yanlış gitti",
    kg: "Бир нерсе туура эмес болду",
    ru: "Что-то пошло не так",
    zh: "出了点问题",
    es: "Algo salió mal",
  },
  "auth.tryAgain": {
    en: "Please try again later.",
    tr: "Lütfen daha sonra tekrar deneyin.",
    kg: "Кийинчерээк кайра аракет кылыңыз.",
    ru: "Пожалуйста, попробуйте еще раз позже.",
    zh: "请稍后再试。",
    es: "Por favor, inténtelo de nuevo más tarde.",
  },
  "auth.loggingIn": {
    en: "Logging in...",
    tr: "Giriş yapılıyor...",
    kg: "Кирүү...",
    ru: "Вход в систему...",
    zh: "登录中...",
    es: "Iniciando sesión...",
  },
  "auth.creatingAccount": {
    en: "Creating account...",
    tr: "Hesap oluşturuluyor...",
    kg: "Эсеп түзүлүүдө...",
    ru: "Создание аккаунта...",
    zh: "创建账户中...",
    es: "Creando cuenta...",
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
  "progress.dayStreak": {
    en: "Day Streak",
    tr: "Günlük Seri",
    kg: "Күндүк катар",
    ru: "Дневная серия",
    zh: "连续天数",
    es: "Racha de días",
  },
  "progress.minutesStudied": {
    en: "Minutes Studied",
    tr: "Çalışılan Dakika",
    kg: "Окулган мүнөттөр",
    ru: "Минут изучено",
    zh: "学习分钟数",
    es: "Minutos estudiados",
  },
  "progress.completedOn": {
    en: "Completed on",
    tr: "Tamamlanma tarihi",
    kg: "Аяктаган күнү",
    ru: "Завершено",
    zh: "完成于",
    es: "Completado el",
  },
  "progress.lastAccessed": {
    en: "Last accessed:",
    tr: "Son erişim:",
    kg: "Акыркы кирүү:",
    ru: "Последний доступ:",
    zh: "最后访问：",
    es: "Último acceso:",
  },
  "progress.lessonProgress": {
    en: "Lesson Progress",
    tr: "Ders İlerlemesi",
    kg: "Сабактын прогресси",
    ru: "Прогресс урока",
    zh: "课程进度",
    es: "Progreso de la lección",
  },
  "progress.lessonCompleted": {
    en: "Lesson completed",
    tr: "Ders tamamlandı",
    kg: "Сабак аяктады",
    ru: "Урок завершен",
    zh: "课程已完成",
    es: "Lección completada",
  },
  "progress.complete": {
    en: "Complete",
    tr: "Tamamlandı",
    kg: "Аяктады",
    ru: "Завершено",
    zh: "完成",
    es: "Completado",
  },
  "progress.modulesCompletedCount": {
    en: "1/3 modules completed",
    tr: "1/3 modül tamamlandı",
    kg: "1/3 модуль аяктады",
    ru: "1/3 модулей завершено",
    zh: "1/3 模块已完成",
    es: "1/3 módulos completados",
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
  "lesson.backToModule": {
    en: "Back to Module",
    tr: "Modüle Dön",
    kg: "Модулга кайтуу",
    ru: "Назад к модулю",
    zh: "返回模块",
    es: "Volver al módulo",
  },
  "lesson.estimatedTime": {
    en: "min",
    tr: "dk",
    kg: "мүн",
    ru: "мин",
    zh: "分钟",
    es: "min",
  },
  "lesson.playFullDialogue": {
    en: "Play Full Dialogue",
    tr: "Tam Diyalogu Oynat",
    kg: "Толук диалогду ойнотуу",
    ru: "Воспроизвести полный диалог",
    zh: "播放完整对话",
    es: "Reproducir diálogo completo",
  },
  "lesson.lessonNotFound": {
    en: "Lesson Not Found",
    tr: "Ders Bulunamadı",
    kg: "Сабак табылган жок",
    ru: "Урок не найден",
    zh: "未找到课程",
    es: "Lección no encontrada",
  },
  "lesson.lessonNotFoundDescription": {
    en: "The lesson you're looking for doesn't exist.",
    tr: "Aradığınız ders mevcut değil.",
    kg: "Сиз издеген сабак жок.",
    ru: "Урок, который вы ищете, не существует.",
    zh: "您要查找的课程不存在。",
    es: "La lección que buscas no existe.",
  },
  "module.totalDialogues": {
    en: "dialogues",
    tr: "diyalog",
    kg: "диалог",
    ru: "диалогов",
    zh: "对话",
    es: "diálogos",
  },
  "module.completed": {
    en: "completed",
    tr: "tamamlandı",
    kg: "аяктады",
    ru: "завершено",
    zh: "已完成",
    es: "completado",
  },
  "module.of": {
    en: "of",
    tr: "of",
    kg: "of",
    ru: "из",
    zh: "的",
    es: "de",
  },
  "modules.vocabulary": {
    en: "Vocabulary",
    tr: "Kelime Hazinesi",
    kg: "Сөздүк",
    ru: "Словарный запас",
    zh: "词汇",
    es: "Vocabulario",
  },
  "modules.practiceDialogues": {
    en: "Practice Dialogues",
    tr: "Diyalog Alıştırmaları",
    kg: "Диалог практикасы",
    ru: "Практика диалогов",
    zh: "对话练习",
    es: "Diálogos de práctica",
  },
  "modules.dialoguePractice": {
    en: "Dialogue Practice",
    tr: "Diyalog Alıştırması",
    kg: "Диалог практикасы",
    ru: "Практика диалога",
    zh: "对话练习",
    es: "Práctica de diálogo",
  },
  "modules.aiRoleplay": {
    en: "AI Roleplay",
    tr: "Yapay Zeka Rol Yapma",
    kg: "AI менен ролдук оюн",
    ru: "Ролевая игра с ИИ",
    zh: "AI角色扮演",
    es: "Juego de rol con IA",
  },
  "modules.culturalTips": {
    en: "Cultural Tips",
    tr: "Kültürel İpuçları",
    kg: "Маданий кеңештер",
    ru: "Культурные советы",
    zh: "文化提示",
    es: "Consejos culturales",
  },
  "modules.knowledgeCheck": {
    en: "Knowledge Check",
    tr: "Bilgi Kontrolü",
    kg: "Билимди текшерүү",
    ru: "Проверка знаний",
    zh: "知识检查",
    es: "Comprobación de conocimientos",
  },
  "modules.checkAnswer": {
    en: "Check Answer",
    tr: "Cevabı Kontrol Et",
    kg: "Жоопту текшерүү",
    ru: "Проверить ответ",
    zh: "检查答案",
    es: "Comprobar respuesta",
  },
  "modules.correctAnswer": {
    en: "Correct! Well done.",
    tr: "Doğru! Tebrikler.",
    kg: "Туура! Жакшы иштедиңиз.",
    ru: "Правильно! Молодец.",
    zh: "正确！做得好。",
    es: "¡Correcto! Bien hecho.",
  },
  "modules.incorrectAnswer": {
    en: "Incorrect. The correct answer is:",
    tr: "Yanlış. Doğru cevap:",
    kg: "Туура эмес. Туура жооп:",
    ru: "Неверно. Правильный ответ:",
    zh: "不正确。正确答案是：",
    es: "Incorrecto. La respuesta correcta es:",
  },
  "modules.markComplete": {
    en: "Mark as Complete",
    tr: "Tamamlandı Olarak İşaretle",
    kg: "Аяктады деп белгилөө",
    ru: "Отметить как завершенное",
    zh: "标记为完成",
    es: "Marcar como completado",
  },
  "modules.dialogues": {
    en: "Dialogues",
    tr: "Diyaloglar",
    kg: "Диалогдор",
    ru: "Диалоги",
    zh: "对话",
    es: "Diálogos",
  },
  "modules.resources": {
    en: "Resources",
    tr: "Kaynaklar",
    kg: "Ресурстар",
    ru: "Ресурсы",
    zh: "资源",
    es: "Recursos",
  },
  "modules.vocabularyList": {
    en: "Vocabulary List",
    tr: "Kelime Listesi",
    kg: "Сөздүк тизмеси",
    ru: "Список словарного запаса",
    zh: "词汇列表",
    es: "Lista de vocabulario",
  },
  "modules.noVocabulary": {
    en: "No vocabulary available for this module yet.",
    tr: "Bu modül için henüz kelime hazinesi mevcut değil.",
    kg: "Бул модуль үчүн азырынча сөздүк жок.",
    ru: "Для этого модуля пока нет словарного запаса.",
    zh: "此模块尚无可用词汇。",
    es: "Aún no hay vocabulario disponible para este módulo.",
  },
  "modules.additionalResources": {
    en: "Additional Resources",
    tr: "Ek Kaynaklar",
    kg: "Кошумча ресурстар",
    ru: "Дополнительные ресурсы",
    zh: "额外资源",
    es: "Recursos adicionales",
  },
  "modules.downloadableMaterials": {
    en: "Downloadable materials and practice exercises",
    tr: "İndirilebilir materyaller ve alıştırmalar",
    kg: "Жүктөп алуу материалдары жана практикалык көнүгүүлөр",
    ru: "Загружаемые материалы и практические упражнения",
    zh: "可下载的材料和练习",
    es: "Materiales descargables y ejercicios prácticos",
  },
  "modules.accessResources": {
    en: "Access Resources",
    tr: "Kaynaklara Eriş",
    kg: "Ресурстарга кирүү",
    ru: "Доступ к ресурсам",
    zh: "访问资源",
    es: "Acceder a recursos",
  },
  "modules.questionCount": {
    en: "Question 1 of 3",
    tr: "Soru 1/3",
    kg: "Суроо 1/3",
    ru: "Вопрос 1 из 3",
    zh: "问题 1/3",
    es: "Pregunta 1 de 3",
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
    const storedLanguage = localStorage.getItem("language");
    // Validate that the stored language is one of our supported languages
    const validLanguages = ["en", "tr", "kg", "ru", "zh", "es"];
    return validLanguages.includes(storedLanguage || "")
      ? storedLanguage
      : "en";
  });

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem("language", language);

    // Force a re-render of the entire app when language changes
    document.documentElement.lang = language;
    document.documentElement.setAttribute("data-language", language);

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
export { translations };
