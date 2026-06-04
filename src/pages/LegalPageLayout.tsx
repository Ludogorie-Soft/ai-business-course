import {ArrowLeft} from 'lucide-react';
import type {ReactNode} from 'react';
import {useCookieConsent} from '../CookieConsentProvider.tsx';
import {DATA_CONTROLLER, LAST_UPDATED, LEGAL_LINK_PROPS, ROUTES, SITE_NAME} from '../constants/legal.ts';

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({title, children}: LegalPageLayoutProps) {
  const {reopenSettings} = useCookieConsent();

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a
            href={ROUTES.home}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Към началото
          </a>
          <span className="text-xs text-neutral-500">{SITE_NAME}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Последна актуализация: {LAST_UPDATED} · {DATA_CONTROLLER}
        </p>
        <article className="prose-legal mt-8 space-y-8 text-sm leading-relaxed text-neutral-700">
          {children}
        </article>
      </main>

      <footer className="mt-12 border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a
              href={ROUTES.privacy}
              {...LEGAL_LINK_PROPS}
              className="hover:text-neutral-800 hover:underline"
            >
              Политика за поверителност
            </a>
            <a
              href={ROUTES.cookies}
              {...LEGAL_LINK_PROPS}
              className="hover:text-neutral-800 hover:underline"
            >
              Политика за бисквитки
            </a>
            <button
              type="button"
              onClick={reopenSettings}
              className="text-left hover:text-neutral-800 hover:underline"
            >
              Настройки за бисквитки
            </button>
          </div>
          <p>© 2026 {DATA_CONTROLLER}</p>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({title, children}: {title: string; children: ReactNode}) {
  return (
    <section>
      <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
