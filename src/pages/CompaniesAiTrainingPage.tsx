import {useEffect, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Euro,
  ExternalLink,
  Globe2,
  Handshake,
  Languages,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import COURSE_LOGO from '../assets/images/AI-course-logo.png';
import {ContactMeetingModal} from '../components/ContactMeetingModal.tsx';
import {useCookieConsent} from '../CookieConsentProvider.tsx';
import {DATA_CONTROLLER, LEGAL_LINK_PROPS, ROUTES, SITE_NAME} from '../constants/legal.ts';

const SEMINAR_INCLUDES = [
  {icon: Clock, text: '90 минути структурирано обучение'},
  {icon: Users, text: 'Адаптиран за вашия екип и бизнес'},
  {icon: Languages, text: 'На български или английски език'},
  {icon: Zap, text: 'Практически AI инструменти'},
  {
    icon: Handshake,
    text: 'Решения на реални казуси във фирмата в реално време съвместно с екипа на фирмата',
  },
  {
    icon: BookOpen,
    text: 'Библиотека от 20+ специализирани промпта, адаптирани за вашите работни процеси',
  },
] as const;

const WHY_US_REASONS = [
  {
    icon: Award,
    title: 'Имаме добър опит в AI обученията',
    desc: 'Водещият обученията, Емилиян Кадийски има над 15г професионален опит като уеб програмист и преподавател. Последните години работи активно с AI и го е прилагал в редица проекти с различни цели. Успешно проведените от нас обучения и нашият курс „AI за стартиращ бизнес“ ни дадоха ясна представа къде компаниите срещат най-големи затруднения при приемането на AI и как да ги преодолеем бързо и лесно.',
  },
  {
    icon: Clock,
    title: 'Спестяваме ценно време',
    desc: 'Всеки служител ще се научи да пести от няколко часа до няколко десетки часа седмично от рутинни административни задачи.',
  },
  {
    icon: Euro,
    title: 'Имаме ценови предимства',
    desc: 'Докато конкурентите ни искат по 150 € на участник за предварително записани лекции, ние от Ludogoriesoft ви предлагаме нещо напълно различно. Нашата цена за обучение е 399 € за екип до 12 човека. Това ви дава по-ниска средна цена на участник спрямо конкурентите ни и максимална възвръщаемост на инвестицията.',
  },
] as const;

const COVERAGE_TOPICS = [
  'Комуникация и вътрешна координация',
  'Маркетинг и генериране на съдържание',
  'Финанси и отчетност',
  'Логистика и управление на процеси',
  'Клиентско обслужване с AI',
  'Автоматизация на повтарящи се задачи',
] as const;

const PROCESS_FREE_STEPS = [
  {
    num: '01',
    title: 'Запазете безплатна среща',
    desc: 'Свържете се с екипа на Ludogoriesoft и уговорете предварителна консултация без ангажимент.',
  },
  {
    num: '02',
    title: 'Анализираме вашия бизнес',
    desc: 'Провеждаме 40-минутна онлайн среща, на която обсъждаме специфичните процеси и предизвикателства на вашата компания и идентифицираме областите с най-голям потенциал за автоматизация с AI.',
  },
] as const;

const PROCESS_PAID_STEP = {
  num: '03',
  title: 'Персонализиран семинар',
  desc: 'Провеждаме 90-минутен семинар, изцяло структуриран около реалните нужди на вашия екип.',
} as const;

const TOOLS = [
  {
    icon: Mail,
    title: 'Автоматизиране на имейл кампании',
    desc: 'Настройка и автоматизация на имейл кампании за привличане и задържане на клиенти.',
    url: 'https://ai-first-biz-dev-b2b-organizer-fe.vercel.app/setup',
    tag: 'Маркетинг',
  },
  {
    icon: TrendingUp,
    title: 'Business Intelligence',
    desc: 'Извличане на полезни контакти и персонализирана информация за всеки от тях.',
    url: 'https://ai-first-companies-intelligence-fe.onrender.com/',
    tag: 'Анализ',
  },
  {
    icon: MapPin,
    title: 'Каталог за бизнес събития',
    desc: 'Събития във Враца, София и онлайн — с абонамент и имейл нотификации на дневна или седмична база.',
    url: 'https://business-events-catalog.vercel.app/',
    tag: 'Мрежи',
  },
  {
    icon: Megaphone,
    title: 'Генератор за постове в соц. мрежи',
    desc: 'Генерира публикации за социални мрежи на база RSS feed и други източници.',
    url: 'https://ai-first-social-networks-post-assis-eta.vercel.app/login',
    tag: 'Съдържание',
  },
  {
    icon: Code2,
    title: 'Технически консултации',
    desc: 'Възможност за технически консултации с екип от опитни програмисти.',
    tag: 'Консултации',
  },
] as const;

const FAQ_ITEMS = [
  {
    q: 'Как адаптирате обучението конкретно за нашия екип и бизнес?',
    a: 'Провеждаме 40-минутна онлайн среща, на която вие ни разказвате повече за вашия бизнес и какви предизвикателства имате. Тази среща е напълно безплатна. На база на срещата подготвяме план за обучението, който Ви представяме и обсъждаме. И съответно провеждаме платено обучение, само ако Ви хареса планът.',
  },
  {
    q: 'На какъв език се провежда семинарът?',
    a: 'Семинарът може да се проведе на български или на английски език, в зависимост от предпочитанията на вашия екип.',
  },
  {
    q: 'Колко хора могат да участват?',
    a: 'Препоръчваме до 20 участника за оптимален интерактивен формат. При по-голям интерес можем да обсъдим разширен формат.',
  },
  {
    q: 'Каква е цената на семинара?',
    a: 'Цената на семинара е 399 евро за екип до 12 човека. При специфични изисквания или по-голям обхват, финалната стойност може да бъде уточнена индивидуално след предварителната консултация.',
  },
  {
    q: 'Нужни ли са предварителни технически познания?',
    a: 'Не. Семинарът е достъпен за всякакъв профил участници — от мениджъри до оперативен персонал. Акцентът е върху практическа приложимост.',
  },
] as const;

export function CompaniesAiTrainingPage() {
  const {reopenSettings} = useCookieConsent();
  const [scrolled, setScrolled] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);

  useEffect(() => {
    document.title = `AI обучения за фирми | ${SITE_NAME}`;

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-brand-deep font-sans text-white selection:bg-brand-accent selection:text-brand-dark overflow-x-hidden">
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg border-b border-brand-medium/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <a href={ROUTES.home} className="flex items-center gap-2.5 group shrink-0">
              <img
                src={COURSE_LOGO}
                alt={SITE_NAME}
                className="h-10 w-auto shrink-0 rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base tracking-tight leading-none text-white group-hover:text-brand-accent transition-colors">
                  {SITE_NAME}
                </span>
                <span className="text-[10px] tracking-widest text-[#FFC19E]/80 uppercase font-bold mt-1">
                  AI обучения за фирми
                </span>
              </div>
            </a>

            <nav className="hidden lg:flex items-center gap-6">
              <a href="#why-us" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">
                Защо нас
              </a>
              <a href="#coverage" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">
                Обхват
              </a>
              <a href="#process" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">
                Процес
              </a>
              <a href="#tools" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">
                Инструменти
              </a>
              <a href="#faq" className="text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors">
                ЧЗВ
              </a>
            </nav>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setMeetingModalOpen(true)}
                className="bg-brand-accent hover:bg-brand-accent-hover text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 border border-brand-accent"
              >
                <span className="hidden sm:inline">Запазете среща</span>
                <span className="sm:hidden">Среща</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={ROUTES.home}
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <span>Към началото</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-brand-deep">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-medium/30 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-brand-accent/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-medium border border-brand-accent/25 px-4 py-1.5 rounded-full text-brand-accent text-xs sm:text-sm font-semibold tracking-wide">
                <Building2 className="h-4 w-4" />
                <span>AI Семинар · 90 мин · Персонализиран</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                Въведете AI в{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-400 to-emerald-300">
                  бизнес процесите
                </span>{' '}
                на вашата компания
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#D8E6DF] leading-relaxed max-w-2xl">
                90-минутен семинар, изцяло персонализиран за вашата индустрия и екип. Показваме кои AI
                инструменти работят реално — и как да ги внедрите от утре.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(true)}
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white text-base font-extrabold px-8 py-4 rounded-2xl shadow-[0_10px_30px_rgba(255,140,66,0.35)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-3 border border-brand-accent"
                >
                  <span>Запазете безплатна среща</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </button>
                <a
                  href="#tools"
                  className="w-full sm:w-auto text-neutral-200 hover:text-white text-sm font-semibold px-6 py-4 rounded-2xl border border-brand-medium/60 hover:border-brand-accent/40 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Wrench className="h-4 w-4" />
                  Безплатни инструменти
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-brand-dark/55 border border-brand-medium/60 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Семинарът включва
                </div>

                <div className="space-y-4">
                  {SEMINAR_INCLUDES.map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm text-neutral-200 leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-brand-medium/50 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#FFC19E] font-bold uppercase tracking-wider mb-1">Цена</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-white">399 €</span>
                      <span className="text-xs text-neutral-400 font-semibold">за екип до 12 човека</span>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono text-right">ludogoriesoft.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why-us" className="py-20 bg-brand-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">Предимства</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Защо да изберете нас?</h3>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full" />
          </div>

          <div className="bg-gradient-to-br from-brand-accent/15 to-brand-dark/60 border-2 border-brand-accent/45 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-brand-accent/20 text-brand-accent rounded-xl flex items-center justify-center shrink-0">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Персонализираме всяко обучение.
                </h4>
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Стандартните курсове предлагат общи примери. Ние правим предварителен одит на вашите процеси и
                  работим целенасочено за работещи решения по вашите казуси.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_US_REASONS.map((reason) => (
              <div
                key={reason.title}
                className="bg-brand-dark/50 border border-brand-medium/55 hover:border-brand-accent/40 rounded-2xl p-6 sm:p-7 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="h-12 w-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                  {reason.title}
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="py-20 bg-brand-medium/35 relative border-y border-brand-medium/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">
                <Target className="h-4 w-4" />
                Обхват
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">Какво покриваме</h2>
              <div className="h-1 w-20 bg-brand-accent rounded-full" />
              <p className="text-base text-neutral-200 leading-relaxed">
                Семинарът се адаптира към специфичните предизвикателства на вашата компания. Избираме темите
                заедно с вас предварително.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {COVERAGE_TOPICS.map((topic) => (
                <div
                  key={topic}
                  className="bg-brand-dark/50 border border-brand-medium/55 hover:border-brand-accent/40 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-neutral-100 leading-snug">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-brand-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">Процес</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Как работи</h3>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3" aria-label="Стъпки 1 и 2 са безплатни">
                <div className="h-px flex-1 bg-brand-accent/45" />
                <span className="shrink-0 inline-flex items-center gap-2 bg-brand-accent/15 border border-brand-accent/40 text-brand-accent text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  Безплатно · 0 €
                </span>
                <div className="h-px flex-1 bg-brand-accent/45" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {PROCESS_FREE_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="bg-brand-dark/50 border border-brand-accent/30 hover:border-brand-accent/50 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group h-full"
                  >
                    <div className="text-4xl font-black text-brand-accent/40 group-hover:text-brand-accent/70 transition-colors mb-4 font-mono">
                      {step.num}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3" aria-hidden>
                <div className="h-px flex-1 bg-brand-medium/60" />
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2">
                  Платено
                </span>
                <div className="h-px flex-1 bg-brand-medium/60" />
              </div>

              <div className="bg-brand-dark/50 border border-brand-medium/55 hover:border-brand-accent/40 rounded-2xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group h-full">
                <div className="text-4xl font-black text-brand-accent/40 group-hover:text-brand-accent/70 transition-colors mb-4 font-mono">
                  {PROCESS_PAID_STEP.num}
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                  {PROCESS_PAID_STEP.title}
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">{PROCESS_PAID_STEP.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="py-20 bg-brand-medium/35 relative border-y border-brand-medium/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">
                <Sparkles className="h-4 w-4" />
                Безплатно
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Нашите инструменти — достъпни веднага
              </h2>
              <div className="h-1 w-20 bg-brand-accent rounded-full" />
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Изпробвайте ги сега. Без регистрация за повечето от тях.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((tool) => {
              const cardClassName =
                'bg-brand-dark/50 hover:bg-brand-dark border border-brand-medium/55 hover:border-brand-accent/40 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group block';
              const cardBody = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="h-12 w-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC19E] bg-brand-accent/10 px-2.5 py-1 rounded-md border border-brand-accent/25">
                      {tool.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">{tool.desc}</p>
                  {'url' in tool && tool.url && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                      Отвори инструмента
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </span>
                  )}
                </>
              );

              if ('url' in tool && tool.url) {
                return (
                  <a
                    key={tool.title}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {cardBody}
                  </a>
                );
              }

              return (
                <div key={tool.title} className={cardClassName}>
                  {cardBody}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-brand-deep">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent">
              <MessageSquare className="h-4 w-4" />
              Въпроси
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Често задавани въпроси</h2>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const open = selectedFaq === index;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    open
                      ? 'bg-brand-dark border-brand-accent/40'
                      : 'bg-brand-dark/50 border-brand-medium/55 hover:border-brand-accent/30'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedFaq(open ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-brand-accent shrink-0 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-sm text-neutral-300 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-medium/35 relative border-t border-brand-medium/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-medium via-brand-dark to-brand-medium border-2 border-brand-accent/40 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-accent/25 border border-brand-accent/40 px-4 py-1.5 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wider">
                <CalendarDays className="h-4 w-4" />
                Следваща стъпка
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Готови ли сте да въведете AI в компанията си?
              </h2>

              <p className="text-base text-neutral-200 leading-relaxed">
                Свържете се с нас за безплатна предварителна среща. Заедно ще определим как да структурираме
                семинара така, че да е максимално полезен за вашия бизнес.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(true)}
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white text-base sm:text-lg font-extrabold px-10 py-4 rounded-2xl shadow-[0_10px_30px_rgba(255,140,66,0.35)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-3 border border-brand-accent"
                >
                  <span>Запазете среща</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </button>
                <a
                  href="https://ludogoriesoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-neutral-200 hover:text-white text-sm font-semibold px-6 py-4 rounded-2xl border border-brand-medium/60 hover:border-brand-accent/40 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Globe2 className="h-4 w-4" />
                  ludogoriesoft.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-brand-dark border-t border-brand-medium/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-brand-accent/20 p-1.5 rounded-lg border border-brand-accent/30">
                  <Brain className="h-5 w-5 text-brand-accent" />
                </div>
                <span className="font-bold text-lg text-white">{SITE_NAME}</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                AI обучения за фирми — персонализирани семинари и безплатни инструменти за внедряване на AI в
                бизнес процесите.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center text-xs text-neutral-300">
              <a href={ROUTES.home} className="hover:text-brand-accent transition-colors">
                Начало
              </a>
              <a href={ROUTES.companiesTraining} className="hover:text-brand-accent transition-colors">
                AI обучения за фирми
              </a>
              <a href={ROUTES.preAccelerator} className="hover:text-brand-accent transition-colors">
                Pre-accelerator
              </a>
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

            <div className="md:col-span-3 text-left md:text-right space-y-1">
              <div className="text-xs text-[#FFC19E] font-bold">© 2026 {DATA_CONTROLLER}</div>
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

      <ContactMeetingModal open={meetingModalOpen} onClose={() => setMeetingModalOpen(false)} />
    </div>
  );
}
