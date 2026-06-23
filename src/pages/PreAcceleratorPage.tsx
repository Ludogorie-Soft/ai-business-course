import {useEffect, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CalendarDays,
  Code2,
  Euro,
  ExternalLink,
  Handshake,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquarePlus,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import COURSE_LOGO from '../assets/images/AI-course-logo.png';
import {useCookieConsent} from '../CookieConsentProvider.tsx';
import {DATA_CONTROLLER, LEGAL_LINK_PROPS, ROUTES, SITE_NAME} from '../constants/legal.ts';

const INTEREST_FORM_URL = 'https://forms.gle/E2qZ1u8P1pzoPVjn7';

const BIZDEV_B2B_URL = 'https://ai-first-biz-dev-b2b-organizer-fe.vercel.app/';
const BUSINESS_EVENTS_URL = 'https://business-events-catalog.vercel.app/';

type FeatureItem = {
  icon: typeof Users;
  title: string;
  desc: string;
  href?: string;
  inDevelopment?: boolean;
  highlight?: boolean;
};

const FEATURE_GROUPS: {title: string; subtitle: string; items: FeatureItem[]}[] = [
  {
    title: 'Общност и мрежа',
    subtitle: 'Хора със сходен интерес, които растат заедно',
    items: [
      {
        icon: Users,
        title: 'Активна общност',
        desc: 'Общност от хора със сходен интерес, които взаимно учат един от друг и си помагат.',
      },
      {
        icon: CalendarDays,
        title: 'Ежеседмични срещи',
        desc: 'Редовни срещи за обмяна на опит и покриване на конкретни теми около стартирането на бизнес.',
      },
      {
        icon: Handshake,
        title: 'Кооператив за взаимна подкрепа',
        desc: 'Подобно на BNI — бизнес чрез препоръки и взаимно насочване на клиенти.',
      },
    ],
  },
  {
    title: 'Инструменти и софтуер',
    subtitle: 'Практични дигитални решения подбрани специално за стартиращи бизнеси',
    items: [
      {
        icon: Mail,
        title: 'Автоматизиране на имейл кампании',
        desc: 'Настройка и автоматизация на имейл кампании за привличане и задържане на клиенти.',
        href: BIZDEV_B2B_URL,
      },
      {
        icon: TrendingUp,
        title: 'Business intelligence',
        desc: 'Извличане на полезни контакти и персонализирана информация за всеки от тях.',
        inDevelopment: true,
      },
      {
        icon: MapPin,
        title: 'Каталог за бизнес събития',
        desc: 'Събития във Враца, София и онлайн — с абонамент и имейл нотификации на дневна или седмична база.',
        href: BUSINESS_EVENTS_URL,
      },
      {
        icon: MessageSquarePlus,
        title: 'Предстоят още инструменти',
        desc: 'Давайте предложения — какъв софтуер още ви е нужен? Ще го добавим заедно.',
        highlight: true,
      },
    ],
  },
  {
    title: 'Експертна подкрепа',
    subtitle: 'Техническа и административна помощ, докато тествате идеята си',
    items: [
      {
        icon: Code2,
        title: 'Технически консултации',
        desc: 'Възможност за технически консултации с екип от опитни програмисти.',
      },
      {
        icon: Lightbulb,
        title: 'Прокси фирма за фактури',
        desc: 'Издаване на фактури за първите 500 € приходи, за да се фокусирате изцяло върху продукта или услугата си — без правни и счетоводни ангажименти в тестов период.',
        highlight: true,
      },
    ],
  },
];

export function PreAcceleratorPage() {
  const {reopenSettings} = useCookieConsent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = `Група за стартиращи проекти | ${SITE_NAME}`;

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
                  Pre-accelerator
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                href={INTEREST_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-accent hover:bg-brand-accent-hover text-white px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 border border-brand-accent"
              >
                <span>Заяви интерес</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={ROUTES.home}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-200 hover:text-brand-accent transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                <span>Към началото</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-brand-deep">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-medium/30 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-brand-accent/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-medium border border-brand-accent/25 px-4 py-1.5 rounded-full text-brand-accent text-xs sm:text-sm font-semibold tracking-wide">
              <Rocket className="h-4 w-4" />
              <span>Pre-accelerator програма</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Група за{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-amber-400 to-emerald-300">
                стартиращи проекти
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#D8E6DF] leading-relaxed max-w-3xl mx-auto">
              Общност за хора, които развиват малък бизнес като странично занимание — с активна помощ от AI,
              практични инструменти и взаимна подкрепа.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-medium/35 relative border-y border-brand-medium/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-accent mb-4">
                <Target className="h-4 w-4" />
                Цел
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Общност за радълбочено развитие на малък бизнес
              </h2>
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
                Да създадем общност от хора, които имат интерес към развитие на малък бизнес (странично
                занимание) с активна помощ от AI. Заедно споделяме опит, инструменти и възможности — за да
                преминете от идея към първи клиенти по-бързо и уверено.
              </p>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-brand-dark/55 border border-brand-medium/60 rounded-2xl p-6 shadow-xl hover:border-brand-accent/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">Индивидуално</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-white">20</span>
                  <Euro className="h-6 w-6 text-brand-accent" />
                  <span className="text-sm text-neutral-300 font-semibold">/ месец на човек</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-dark/70 to-brand-medium/40 border-2 border-brand-accent/45 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-brand-accent bg-brand-accent/15 px-2.5 py-1 rounded-md border border-brand-accent/35">
                  Екипна отстъпка
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 bg-brand-accent/20 text-brand-accent rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFC19E]">Екипен проект</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-white">10</span>
                  <Euro className="h-6 w-6 text-brand-accent" />
                  <span className="text-sm text-neutral-300 font-semibold">/ месец на човек</span>
                </div>
                <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
                  За екипи, които работят по един и същ проект.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFC19E]">
              Какво включва програмата
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Акселераторска програма с практическа стойност
            </h3>
            <div className="h-1 w-20 bg-brand-accent mx-auto rounded-full mt-2" />
            <p className="text-base text-neutral-300 pt-2 leading-relaxed">
              Комбинация от общност, софтуер и експертна подкрепа — всичко насочено към стартиране и растеж на
              малък бизнес с помощта на AI.
            </p>
          </div>

          <div className="space-y-16">
            {FEATURE_GROUPS.map((group) => (
              <div key={group.title}>
                <div className="mb-8">
                  <h4 className="text-xl sm:text-2xl font-bold text-white">{group.title}</h4>
                  <p className="text-sm text-neutral-400 mt-1">{group.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 group relative ${
                        item.highlight
                          ? 'bg-gradient-to-br from-brand-accent/15 to-brand-dark/60 border-2 border-brand-accent/50'
                          : 'bg-brand-dark/50 hover:bg-brand-dark border border-brand-medium/55 hover:border-brand-accent/40'
                      }`}
                    >
                      {item.inDevelopment && (
                        <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-md border border-amber-500/35">
                          В процес на разработка
                        </div>
                      )}
                      <div className="h-12 w-12 bg-brand-accent/10 text-brand-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h5 className="text-lg font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-sm text-neutral-300 leading-relaxed">{item.desc}</p>
                      {item.href && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors"
                        >
                          <span>Отвори инструмента</span>
                          <ExternalLink className="h-4 w-4" aria-hidden />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-medium/35 relative border-t border-brand-medium/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-medium via-brand-dark to-brand-medium border-2 border-brand-accent/40 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 bg-brand-accent/25 border border-brand-accent/40 px-4 py-1.5 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Присъединете се
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Готови ли сте да развиете своя проект в подкрепяща общност?
              </h2>

              <p className="text-base text-neutral-200 leading-relaxed">
                Заявете интерес и ще се свържем с вас с подробности за следващата група и началото на
                програмата.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={INTEREST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent-hover text-white text-base sm:text-lg font-extrabold px-10 py-4 rounded-2xl shadow-[0_10px_30px_rgba(255,140,66,0.35)] transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-3 border border-brand-accent"
                >
                  <span>Заяви интерес</span>
                  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
                </a>
                <a
                  href={ROUTES.home}
                  className="w-full sm:w-auto text-neutral-200 hover:text-white text-sm font-semibold px-6 py-4 rounded-2xl border border-brand-medium/60 hover:border-brand-accent/40 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Към безплатния курс
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
                Група за стартиращи проекти — общност, инструменти и подкрепа за малък бизнес с AI.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center text-xs text-neutral-300">
              <a href={ROUTES.home} className="hover:text-brand-accent transition-colors">
                Начало
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
    </div>
  );
}
