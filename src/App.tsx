import React, { useState, useEffect } from "react";
import { 
  Brain, 
  Rocket, 
  BookOpen, 
  Award, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown, 
  Users, 
  Target, 
  Sparkles, 
  Menu, 
  X, 
  Mail, 
  TrendingUp, 
  MousePointer, 
  Globe, 
  Check,
  ChevronRight,
  Shield,
  Laptop,
  User
} from "lucide-react";

import HERO_IMAGE from "./assets/images/ai_startup_hero_bg_bulgarian_1780401928788.png";
import EMO_IMAGE from "./assets/images/Emo.png";
import SEVDELIN_IMAGE from "./assets/images/Sevdelin.png";
import { useCookieConsent } from "./CookieConsentProvider.tsx";
import { LEGAL_LINK_PROPS, ROUTES } from "./constants/legal.ts";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeb_14TsUdqAwmDXOvAxKAK_OzGufzwV8X8NtwY_NU8Tkn2sQ/viewform?usp=dialog";

export default function App() {
  const { reopenSettings } = useCookieConsent();

  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [scrolled, setScrolled] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [showRedirectToast, setShowRedirectToast] = useState(false);

  // Time Countdown to June 17, 2026 at 18:30 (Bulgaria Time EET)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Target launch date: June 17, 2026, 18:30:00 (EET / Bulgaria time is UTC +3 under standard DST in June)
    const targetDate = new Date("2026-06-17T18:30:00+03:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, ended: true }));
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d,
          hours: h,
          minutes: m,
          seconds: s,
          ended: false
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Show user a helpful micro-toast that they are accessing the official application form
    setShowRedirectToast(true);
    setTimeout(() => {
      setShowRedirectToast(false);
    }, 4500);
  };

  const toggleFaq = (index: number) => {
    setSelectedFaq(selectedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-deep font-sans text-white selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden" id="app-root">
      
      {/* Toast Alert representing Elite feedback */}
      {showRedirectToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce max-w-sm bg-white text-slate-900 rounded-xl shadow-2xl p-4 border-l-4 border-brand-accent flex items-start gap-3">
          <div className="p-1 bg-brand-accent/20 text-brand-accent rounded-full shrink-0">
            <Check className="h-5 w-5 stroke-[3]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-neutral-900">Пренасочване...</h4>
            <p className="text-xs text-neutral-600 mt-0.5"> отваряме регистрационната форма на Google Forms за заявяване на интерес в момента.</p>
          </div>
        </div>
      )}

      {/* STICKY HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-brand-medium/30 py-3" 
            : "bg-transparent py-5"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#app-root" className="flex items-center gap-2.5 group">
              <div className="bg-brand-accent/15 border border-brand-accent/40 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(255,140,66,0.15)]">
                <Brain className="h-6 w-6 text-brand-accent animate-pulse-slow" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg sm:text-xl tracking-tight leading-none text-white group-hover:text-brand-accent transition-colors">
                  AI за стартиращ бизнес
                </span>
                <span className="text-[10px] tracking-widest text-[#FFC19E]/80 uppercase font-bold mt-1">
                  Безплатен онлайн курс
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#about" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">Какво ще научите</a>
              <a href="#program" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">Програма</a>
              <a href="#schedule" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">График</a>
              <a href="#lecturers" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">Лектори</a>
              <a href="#audience" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">За кого е</a>
              <a href="#faq" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">ЧЗВ</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                onClick={handleCtaClick}
                className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 border border-brand-accent"
                id="nav-cta"
              >
                <span>Заяви желание</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-brand-medium/50 hover:bg-brand-medium text-neutral-200 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-dark/95 backdrop-blur-lg border-b border-brand-medium/30 transition-all duration-300 animate-fadeIn" id="mobile-dropdown">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                Какво ще научите
              </a>
              <a 
                href="#program" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                Програма
              </a>
              <a 
                href="#schedule" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                График
              </a>
              <a 
                href="#lecturers" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                Лектори
              </a>
              <a 
                href="#audience" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                За кого е подходящ
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-semibold text-neutral-200 hover:bg-brand-medium/40 hover:text-brand-accent transition-all"
              >
                ЧЗВ
              </a>
              <div className="pt-2">
                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    handleCtaClick(e);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center bg-brand-accent hover:bg-brand-accent-hover text-white block py-3.5 rounded-xl font-bold tracking-wide shadow-lg transition-all"
                  id="mobile-nav-cta"
                >
                  Заяви желание
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-deep" id="hero">
        {/* Background blobs for premium depth */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-medium/30 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-brand-accent/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        
        {/* Premium thin diagonal lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Visual Text Left */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-brand-medium border border-brand-accent/25 px-4 py-1.5 rounded-full text-brand-accent text-xs sm:text-sm font-semibold tracking-wide animate-float" id="hero-badge">
                <Sparkles className="h-4 w-4" />
                <span>AI Академия за Новатори</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-left">
                Научете как да стартирате бизнес с помощта на <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-400 to-emerald-300">AI</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#D8E6DF] leading-relaxed max-w-2xl text-left">
                Без технически опит. Без програмиране. Само практически инструменти за идеи, маркетинг, клиенти и растеж. Започнете и развийте вашия нов бизнес сега!
              </p>

              {/* HIGHLIGHT CHIPS - TWO ROWS AS REQUESTED */}
              <div className="flex flex-col gap-3 w-full pt-2" id="hero-highlights">
                {/* Row 1 */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  {[
                    { label: "Безплатен курс", icon: Shield },
                    { label: "Безплатни AI инструменти", icon: Laptop },
                    { label: "Включване в AI общност", icon: Users },
                    { label: "Онлайн обучение", icon: Globe }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 bg-brand-medium/55 border border-brand-medium/50 px-3.5 py-2.5 rounded-xl hover:border-brand-accent/30 hover:bg-brand-medium/70 transition-all duration-300 shrink-0"
                    >
                      <div className="p-1 bg-brand-accent/10 rounded-lg text-brand-accent">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-100">{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex flex-wrap gap-2.5 items-center">
                  {[
                    { label: "4 практически лекции", icon: BookOpen },
                    { label: "Общо 6 часа", icon: Clock },
                    { label: "На български език", icon: CheckCircle2 }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 bg-brand-medium/55 border border-brand-medium/50 px-3.5 py-2.5 rounded-xl hover:border-brand-accent/30 hover:bg-brand-medium/70 transition-all duration-300 shrink-0"
                    >
                      <div className="p-1 bg-brand-accent/10 rounded-lg text-brand-accent">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-neutral-100">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BIG CALL TO ACTION BUTTON */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-4 sm:w-auto" id="hero-actions">
                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white text-lg font-extrabold px-10 py-4.5 rounded-2xl shadow-[0_10px_30px_rgba(255,140,66,0.35)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-[0.98] border border-brand-accent"
                  id="hero-cta"
                >
                  <span>Заяви желание за безплатен курс</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </a>
              </div>

              {/* Urgency Counter Widget */}
              <div className="bg-brand-dark/45 border border-brand-medium/40 p-4 rounded-2xl flex flex-wrap items-center gap-4 max-w-md w-full" id="countdown-widget">
                <div className="flex items-center gap-2 text-[#FFC19E]">
                  <Clock className="h-5 w-5 animate-pulse-slow shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Начало след:</span>
                </div>
                {!timeLeft.ended ? (
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="font-mono text-xl font-black text-rose-100">{timeLeft.days}</div>
                      <div className="text-[9px] uppercase text-neutral-300">дни</div>
                    </div>
                    <span className="opacity-40 font-mono text-xl">:</span>
                    <div className="text-center">
                      <div className="font-mono text-xl font-black text-rose-100">{timeLeft.hours}</div>
                      <div className="text-[9px] uppercase text-neutral-300">часа</div>
                    </div>
                    <span className="opacity-40 font-mono text-xl">:</span>
                    <div className="text-center">
                      <div className="font-mono text-xl font-black text-rose-100">{timeLeft.minutes}</div>
                      <div className="text-[9px] uppercase text-neutral-300 font-mono">мин</div>
                    </div>
                    <span className="opacity-40 font-mono text-xl">:</span>
                    <div className="text-center">
                      <div className="font-mono text-xl font-black text-brand-accent">{timeLeft.seconds}</div>
                      <div className="text-[9px] uppercase text-neutral-300">сек</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-emerald-400">Курсът стартира или записването продължава в момента!</div>
                )}
              </div>

            </div>

            {/* Hero Image Right */}
            <div className="lg:col-span-5 relative group" id="hero-visual">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-accent to-emerald-500 rounded-3xl blur opacity-35 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-brand-dark rounded-3xl overflow-hidden border border-brand-medium/55 shadow-2xl">
                <img 
                  src={HERO_IMAGE} 
                  alt="Предприемачи използващи AI за стартиращ бизнес" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Micro overlay block */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-dark/90 backdrop-blur-md border border-brand-medium/60 p-4 rounded-xl flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#FFC19E]">100% Практика</div>
                    <div className="text-[11px] text-neutral-200 mt-0.5">Включва работа с водещи софтуери като ChatGPT, Lovable, Gemini</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: ЗА КУРСА */}
      <section className="py-20 bg-brand-medium/35 relative border-y border-brand-medium/40" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">Основен фокус</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Какво ще научите?</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
            <p className="text-base sm:text-lg text-neutral-200 pt-3 leading-relaxed">
              Този практически курс е създаден за хора, които искат да стартират собствен бизнес или да валидират своя идея с помощта на съвременни AI инструменти. Ще преминете през целия процес – от генериране на бизнес идея до намиране на първите клиенти и измерване на резултатите.
            </p>
          </div>

          {/* BENEFIT CARDS (6 items) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="benefits-grid">
            {[
              {
                title: "Генериране на бизнес идеи",
                desc: "Откриване на жизнеспособни иновативни ниши и валидиране на концепции с помощта на изкуствен интелект само за броени минути.",
                badge: "Стъпка 1"
              },
              {
                title: "Изграждане на уеб сайт с AI",
                desc: "Създаване на професионално присъствие и целеви страници без писане на код, използвайки най-новите визуализатори и No-Code инструменти.",
                badge: "Стъпка 2"
              },
              {
                title: "Маркетинг и реклама",
                desc: "Генериране на зашеметяващи рекламни формати, копирайтинг стратегии и рекламни бюджети за Facebook, Instagram и Google чрез AI генератори.",
                badge: "Стъпка 3"
              },
              {
                title: "Имейл кампании",
                desc: "Автоматизация на продажбени фунии и писане на персонализирани писма за студени контакти, водещи до високи резултати.",
                badge: "Стъпка 4"
              },
              {
                title: "SEO и анализ",
                desc: "Анализ на конкуренцията, търсене на ключови думи и оптимизация на съдържание за Google търсачката чрез специализирани помощници.",
                badge: "Стъпка 5"
              },
              {
                title: "Продажби и клиенти",
                desc: "Управление на потенциални сделки, изграждане на търговски предложения, ценообразуване и симулиране на преговори.",
                badge: "Стъпка 6"
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="bg-brand-dark/50 hover:bg-brand-dark border border-brand-medium/55 rounded-2xl p-6.5 hover:border-brand-accent/40 shadow-xl transition-all duration-300 hover:-translate-y-2.5 relative group"
              >
                <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-2.5 py-1 rounded-md border border-brand-accent/35">
                  {card.badge}
                </div>
                <div className="h-12 w-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">{card.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed leading-[1.65]">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Inline CTA block for section 2 */}
          <div className="mt-16 text-center">
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-3.5 rounded-xl font-extrabold text-base tracking-wide transition-all shadow-lg hover:shadow-brand-accent/20"
              id="about-cta"
            >
              <span>Започнете практическото обучение</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 3: ПРОГРАМА НА ОБУЧЕНИЕТО */}
      <section className="py-20 bg-brand-deep" id="program">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">Професионална Интензивност</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Програма на обучението</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
            <p className="text-base text-neutral-300 pt-2">
              4 изцяло практични лекции, структурирани логически за максимално бързо усвояване на материалите и приложение в реалния живот.
            </p>
          </div>

          {/* Interactive tab headers for Lectures */}
          <div className="flex flex-wrap justify-center gap-3 mb-10" id="lecture-tabs">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setActiveTab(num)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === num 
                    ? "bg-brand-accent text-white shadow-lg" 
                    : "bg-brand-medium/55 text-neutral-300 hover:text-white hover:bg-brand-medium hover:-translate-y-0.5"
                }`}
                id={`tab-btn-${num}`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Лекция {num}</span>
              </button>
            ))}
          </div>

          {/* Active Lecture Details Container */}
          <div className="bg-brand-dark/45 border border-brand-medium/60 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden" id="lecture-content">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full filter blur-xl"></div>
            
            {activeTab === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">Лектор на живо: Емилиян Кадийски</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Лекция 1: Генериране на бизнес идеи, уеб сайтове и анализ
                </h3>
                <div className="h-[2px] bg-brand-medium/40 w-full my-4"></div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5" />
                      <span>Водещи AI инструменти в модула:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Lovable", "Figma Make", "Google AI Studio", "Icanpreneur", "Ideaproof"].map((tool, tIdx) => (
                        <span key={tIdx} className="bg-brand-medium px-3.5 py-1.5 rounded-xl border border-brand-medium/80 text-xs font-mono text-zinc-100 font-semibold">{tool}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                      <span>Практическо упражнение:</span>
                    </h4>
                    <p className="text-zinc-200 text-sm leading-relaxed leading-[1.65]">
                      Участниците ще преминат през генериране на реални дигитални стартиращи идеи според техните силни страни и бизнес направления. Ще се научат как да проследят началния трафик и потребителския интерес с леки прототипи.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">Лектор на живо: Севделин Димитров</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Лекция 2: Копирайтинг, рекламни текстове и имейл маркетинг
                </h3>
                <div className="h-[2px] bg-brand-medium/40 w-full my-4"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5" />
                      <span>Инструменти и канали в модула:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Facebook реклами", "Instagram реклами", "Buffer", "Copy.ai", "BizDev"].map((tool, tIdx) => (
                        <span key={tIdx} className="bg-brand-medium px-3.5 py-1.5 rounded-xl border border-brand-medium/80 text-xs font-mono text-zinc-100 font-semibold">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Практическо упражнение:</span>
                    </h4>
                    <p className="text-zinc-200 text-sm leading-relaxed leading-[1.65]">
                      Участниците ще създадат рекламни послания и копирайтинг текстове за реални рекламни кампании в социалните мрежи, както и ще напишат/автоматизират поредица от ангажиращи имейл бюлетини за студени клиенти.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">Лектор на живо: Емилиян Кадийски</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Лекция 3: Измерване на успеваемостта и SEO
                </h3>
                <div className="h-[2px] bg-brand-medium/40 w-full my-4"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5" />
                      <span>Аналитични платформи и инструменти:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Microsoft Clarity", "Google Analytics", "Google PageSpeed", "SEO Checker", "Analyze Keyword Difficulty"].map((tool, tIdx) => (
                        <span key={tIdx} className="bg-brand-medium px-3.5 py-1.5 rounded-xl border border-brand-medium/80 text-xs font-mono text-zinc-100 font-semibold">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Практическо упражнение:</span>
                    </h4>
                    <p className="text-zinc-200 text-sm leading-relaxed leading-[1.65]">
                      Практическо измерване на поведението на потребителите с Clarity и Analytics. Оптимално настройване на SEO заглавия, намиране на ключови думи с ниска трудност и висока ефективност при търсене.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono">Лектор на живо: Севделин Димитров</div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  Лекция 4: Бизнес развитие и привличане на клиенти
                </h3>
                <div className="h-[2px] bg-brand-medium/40 w-full my-4"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5" />
                      <span>Ключови теми и AI асистенти в модула:</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["AI за проучване на клиенти", "ChatGPT", "Perplexity", "Gemini", "Оферти", "Продажбени фунии"].map((tool, tIdx) => (
                        <span key={tIdx} className="bg-brand-medium px-3.5 py-1.5 rounded-xl border border-brand-medium/80 text-xs font-mono text-zinc-100 font-semibold">{tool}</span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-brand-accent flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Практическо упражнение:</span>
                    </h4>
                    <p className="text-zinc-200 text-sm leading-relaxed leading-[1.65]">
                      Разработване на ценова оферта и тактики за привличане на първите 5-10 купувачи/клиенти за вашия проект чрез целеви групи, отстъпки и уникално стойностно предложение.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION 4: ГРАФИК */}
      <section className="py-20 bg-brand-medium/25 border-y border-brand-medium/40 relative" id="schedule">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">Срокове и присъствие</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Дати и часове</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
            <p className="text-sm sm:text-base text-neutral-300 pt-1">
              Сесиите се провеждат изцяло онлайн с възможности за въпроси и отговори в реално време.
            </p>
          </div>

          {/* SCHEDULE CARDS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" id="schedule-grid">
            {[
              {
                lecture: "Лекция 1",
                title: "Идеи и Анализ",
                date: "17 юни 2026",
                time: "18:30 – 20:00",
                day: "Сряда"
              },
              {
                lecture: "Лекция 2",
                title: "Копирайтинг и Имейли",
                date: "20 юни 2026",
                time: "14:00 – 15:30",
                day: "Събота"
              },
              {
                lecture: "Лекция 3",
                title: "Измерване и SEO",
                date: "24 юни 2026",
                time: "18:30 – 20:00",
                day: "Сряда"
              },
              {
                lecture: "Лекция 4",
                title: "Бизнес и Клиенти",
                date: "27 юни 2026",
                time: "14:00 – 15:30",
                day: "Събота"
              }
            ].map((sched, idx) => (
              <div 
                key={idx}
                className="bg-brand-dark/50 border border-brand-medium/55 rounded-2xl p-6 shadow-lg hover:border-brand-accent/50 hover:bg-brand-dark/80 transition-all text-center relative group"
              >
                <div className="text-[10px] uppercase font-bold text-brand-accent bg-brand-accent/10 py-1 px-2 rounded-md inline-block mb-3 border border-brand-accent/30">
                  {sched.lecture}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 leading-tight">
                  {sched.title}
                </h4>
                <div className="p-3.5 bg-brand-medium/40 rounded-xl my-4 space-y-1">
                  <div className="flex items-center justify-center gap-2 font-black text-white text-base">
                    <Calendar className="h-4 w-4 text-brand-accent" />
                    <span>{sched.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-neutral-300 font-semibold">
                    <Clock className="h-3.5 w-3.5 text-zinc-300" />
                    <span>{sched.time}</span>
                  </div>
                </div>
                <span className="text-xs text-[#FFC19E] font-medium uppercase tracking-wider">
                  {sched.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center" id="schedule-note">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-xs text-neutral-300 font-semibold">
              Всички часове са по българско време (EET / София). Записите ще са налични!
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 5: ЗА ЛЕКТОРИТЕ */}
      <section className="py-20 bg-brand-medium/25 border-y border-brand-medium/40" id="lecturers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">Ментори с богат опит</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Вашите лектори</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
            <p className="text-base text-zinc-300 pt-1">
              Практично ориентирани специалисти с над 10 години опит в ИТ компаниите, дигиталното образование и продажбите.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto" id="lecturers-grid">
            
            <div className="bg-brand-dark/50 border border-brand-medium/65 rounded-3xl p-8 flex flex-col items-center gap-4 hover:border-brand-accent/40 relative group shadow-xl">
              <div className="h-40 w-40 sm:h-48 sm:w-48 shrink-0 overflow-hidden rounded-full border-2 border-brand-accent/35 shadow-xl ring-4 ring-brand-accent/10">
                <img
                  src={EMO_IMAGE}
                  alt="Емилиян Кадийски"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="space-y-3 w-full text-center">
                <span className="text-xs font-bold uppercase text-brand-accent tracking-widest bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/25">Лектор на лекции 1 и 3</span>
                <h3 className="text-2xl font-black text-white pt-2">Емилиян Кадийски</h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal leading-[1.65]">
                  Емилиян Кадийски е ИТ предприемач, обучител и съосновател на „Враца Софтуер Общество“ – организация с ключов принос за развитието на дигиталното образование и предприемачество в Северозападна България. Основател на две софтуерни компании – Вола Софт и Лудогорие Софт, с над 10 години опит в изграждането на софтуерни бизнеси.
                </p>
              </div>
            </div>

            <div className="bg-brand-dark/50 border border-brand-medium/65 rounded-3xl p-8 flex flex-col items-center gap-4 hover:border-brand-accent/40 relative group shadow-xl">
              <div className="h-40 w-40 sm:h-48 sm:w-48 shrink-0 overflow-hidden rounded-full border-2 border-brand-accent/35 shadow-xl ring-4 ring-brand-accent/10">
                <img
                  src={SEVDELIN_IMAGE}
                  alt="Севделин Димитров"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="space-y-3 w-full text-center">
                <span className="text-xs font-bold uppercase text-brand-accent tracking-widest bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/25">Лектор на лекции 2 и 4</span>
                <h3 className="text-2xl font-black text-white pt-2">Севделин Димитров</h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal leading-[1.65]">
                  Севделин Димитров е специалист с богат опит в бизнес развитие, привличане на клиенти и оптимизиране на маркетингови процеси с помощта на AI. Комбинира модерни технологии с доказани стратегии за продажби и растеж.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: ЗА КОГО Е ПОДХОДЯЩ */}
      <section className="py-20 bg-brand-deep" id="audience">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">Профил на участника</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">За кого е подходящ курсът?</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
            <p className="text-base text-zinc-300 pt-2">
              Това обучение не изисква специални познания по ИТ или програмиране. Курсът е изцяло пригоден за хора без практически опит.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" id="audience-grid">
            {[
              {
                title: "Студенти",
                desc: "Искащи да се докоснат до най-новите технологии за бъдещо професионално развитие и предприемачество.",
                icon: Users
              },
              {
                title: "Бъдещи предприемачи",
                desc: "Търсещи начин да валидират своите смели идеи бързо, евтино и ефективно.",
                icon: Target
              },
              {
                title: "Хора с бизнес идея",
                desc: "Желаещи веднага да започнат първите стъпки – уеб сайт, маркетинг, брандинг без инвестиции.",
                icon: Brain
              },
              {
                title: "Стартиращи компании",
                desc: "Искащи да оптимизират продуктивността си с AI на ново ниво.",
                icon: Rocket
              },
              {
                title: "Фрилансъри",
                desc: "Които желаят да привлекат повече клиенти, като напишат перфектни оферти.",
                icon: User
              },
              {
                title: "Малки бизнеси",
                desc: "Стремящи се към мащабиране на продажбите си чрез бюджетни техники за реклама.",
                icon: TrendingUp
              }
            ].map((audience, index) => {
              const IconComponent = audience.icon;
              return (
                <div 
                  key={index}
                  className="bg-brand-medium/35 border border-brand-medium/55 p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-brand-accent/40 hover:bg-brand-medium/50 transition-all text-left"
                >
                  <div className="h-11 w-11 bg-brand-accent/15 text-brand-accent rounded-xl flex items-center justify-center shrink-0 border border-brand-accent/20">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight">{audience.title}</h4>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed leading-[1.6]">
                      {audience.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div 
            className="mt-12 bg-gradient-to-r from-brand-medium to-brand-dark border border-brand-accent/25 rounded-2xl p-6.5 text-center max-w-3xl mx-auto" 
            id="no-code-highlight"
          >
            <h4 className="text-xl font-bold text-white flex items-center justify-center gap-2 mb-1.5 flex-wrap">
              <Laptop className="h-5 w-5 text-brand-accent" />
              <span>Важно уточнение</span>
            </h4>
            <p className="text-sm text-neutral-200">
              <span className="font-bold text-brand-accent">Не се изискват технически умения</span> или опит в програмирането. Курсът е ориентиран изцяло към уеб-базиран визуален софтуер, интуитивни изкуствени интелекти и практически шаблони.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 7: КАКВО ЩЕ ПОЛУЧИТЕ */}
      <section className="py-20 bg-brand-deep" id="deliverables">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-brand-medium to-brand-dark border border-brand-medium/55 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden" id="deliverables-container">
            <div className="absolute top-1/2 right-1/12 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-3xl"></div>
            
            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Придобивки</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Какво ще получите от нас?</h2>
                <div className="h-1 w-16 bg-brand-accent rounded-full mt-2"></div>
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed leading-[1.65]">
                  Участието в курса не се свежда само до пасивно слушане. Всеки записан участник получава цялостен инструментариум за изграждане на бизнес проект.
                </p>
              </div>

              {/* Icon Based Grid */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4" id="deliverables-grid">
                {[
                  "6 часа практическо обучение",
                  "Запознаване с водещи AI инструменти",
                  "Реални бизнес упражнения",
                  "Практически шаблони",
                  "Нови идеи за бизнес",
                  "Дигитален сертификат за завършване"
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 bg-brand-deep/60 p-4.5 rounded-xl border border-brand-medium/50 hover:border-brand-accent/30 transition-colors"
                  >
                    <div className="h-6 w-6 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-neutral-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: ЧЕСТО ЗАДАВАНИ ВЪПРОСИ (FAQ) */}
      <section className="py-20 bg-brand-medium/25 border-y border-brand-medium/40" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">Повече информация</h2>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Често задавани въпроси</h1>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2"></div>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {[
              {
                q: "Нужни ли са технически умения?",
                a: "Не. Курсът е предназначен за напълно начинаещи. Всички AI софтуери и платформи се управляват чрез интуитивни интерфейси на разбираем език без писане на програмен код."
              },
              {
                q: "На какъв език се провежда?",
                a: "Курсът се провежда изцяло на български език, както лекциите на живо, така и презентационните материали и упражненията ни."
              },
              {
                q: "Безплатен ли е курсът?",
                a: "Да, участието е напълно безплатно за всички одобрени участници, които заявят интерес навреме чрез уеб формуляра."
              },
              {
                q: "Ще получа ли сертификат?",
                a: "Да. След успешно преминаване на 4-те срещи ще получите дигитален сертификат за завършване от Враца Софтуер Общество, доказващ вашите нови умения."
              }
            ].map((faq, index) => {
              const isOpen = selectedFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-brand-dark/50 border border-brand-medium/60 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-brand-medium/25 transition-colors"
                    id={`faq-btn-${index}`}
                  >
                    <span className="font-bold text-neutral-100 sm:text-lg">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-brand-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-6 pt-0 text-sm sm:text-base leading-relaxed text-zinc-300 border-t border-brand-medium/20 bg-brand-dark/25 animate-fadeIn" id={`faq-ans-${index}`}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 9: FINAL CALL TO ACTION */}
      <section className="py-20 md:py-24 bg-brand-deep relative overflow-hidden" id="final-cta-section">
        {/* Glow behind final box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-accent/20 rounded-full filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-brand-medium via-brand-dark to-brand-medium border-2 border-brand-accent/40 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-accent/5 rounded-full filter blur-xl"></div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-accent/25 border border-brand-accent/40 px-4 py-1.5 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wider">Ограничени места</div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Готови ли сте да стартирате своя бизнес с помощта на AI?
              </h2>
              
              <p className="text-base sm:text-lg text-neutral-200">
                Заявете интерес още днес. Възползвайте се от безплатното практическо онлайн обучение.
              </p>

              <div className="pt-6">
                <a 
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCtaClick}
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white text-lg sm:text-xl font-extrabold px-12 py-5 rounded-2xl shadow-[0_15px_35px_rgba(255,140,66,0.35)] transition-all duration-300 hover:scale-[1.03] inline-flex items-center justify-center gap-3 active:scale-[0.97] border border-brand-accent"
                  id="final-cta-btn"
                >
                  <span>Заяви желание</span>
                  <ArrowRight className="h-6 w-6 stroke-[3]" />
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-8 pt-4 flex-wrap text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>100% Безплатен Достъп</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Официален Сертификат</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Онлайн за всяко устройство</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: FOOTER */}
      <footer className="bg-brand-dark border-t border-brand-medium/50 py-12 relative z-10" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            
            {/* Logo/Name in Footer */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-brand-accent/20 p-1.5 rounded-lg border border-brand-accent/30">
                  <Brain className="h-5 w-5 text-brand-accent" />
                </div>
                <span className="font-bold text-lg text-white">AI за стартиращ бизнес</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Безплатен практически курс по изкуствен интелект и предприемачество за бъдещи лидери, студенти и фрийлансъри.
              </p>
            </div>

            {/* Middle Nav Links */}
            <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center text-xs text-neutral-300">
              <a href="#about" className="hover:text-brand-accent transition-colors">Какво ще научите</a>
              <a href="#program" className="hover:text-brand-accent transition-colors">Програма</a>
              <a href="#schedule" className="hover:text-brand-accent transition-colors">График</a>
              <a href="#lecturers" className="hover:text-brand-accent transition-colors">Лектори</a>
              <a href="#audience" className="hover:text-brand-accent transition-colors">За кого е</a>
              <a href="#faq" className="hover:text-brand-accent transition-colors">ЧЗВ</a>
              <a
                href={ROUTES.privacy}
                {...LEGAL_LINK_PROPS}
                className="hover:text-brand-accent transition-colors"
              >
                Поверителност
              </a>
              <a
                href={ROUTES.cookies}
                {...LEGAL_LINK_PROPS}
                className="hover:text-brand-accent transition-colors"
              >
                Бисквитки
              </a>
            </div>

            {/* Right copyright details */}
            <div className="md:col-span-3 text-left md:text-right space-y-1">
              <div className="text-xs text-[#FFC19E] font-bold">Безплатен онлайн курс</div>
              <p className="text-xs text-neutral-400 mt-2">© 2026 Всички права запазени.</p>
              <button
                type="button"
                onClick={reopenSettings}
                className="text-[10px] text-neutral-500 underline-offset-2 hover:text-neutral-300 hover:underline"
              >
                Настройки за бисквитки
              </button>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}

// Custom simple hook/icon to resolve Users plus icon which satisfies typescript checks
function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
