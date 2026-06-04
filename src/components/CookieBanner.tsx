import {LEGAL_LINK_PROPS, ROUTES} from '../constants/legal.ts';

interface CookieBannerProps {
  onAccept: () => void;
  onReject: () => void;
}

export function CookieBanner({onAccept, onReject}: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-sm rounded-lg border border-neutral-200 bg-white p-4 shadow-lg sm:bottom-6 sm:right-6"
    >
      <h2 id="cookie-banner-title" className="text-sm font-semibold text-neutral-900">
        Бисквитки и аналитика
      </h2>
      <p id="cookie-banner-description" className="mt-2 text-xs leading-relaxed text-neutral-600">
        Google Analytics и Microsoft Clarity се зареждат само след вашето изрично съгласие съгласно
        GDPR. Vercel Analytics работи за основна статистика на посещенията независимо от избора ви.
        Можете да приемете или отхвърлите аналитичните бисквитки на Google и Microsoft.{' '}
        <a
          href={ROUTES.cookies}
          {...LEGAL_LINK_PROPS}
          className="text-neutral-800 underline underline-offset-2"
        >
          Политика за бисквитки
        </a>
        {' · '}
        <a
          href={ROUTES.privacy}
          {...LEGAL_LINK_PROPS}
          className="text-neutral-800 underline underline-offset-2"
        >
          Политика за поверителност
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onReject}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Отхвърлям
        </button>
        <button
          type="button"
          onClick={onAccept}
          className="rounded-md bg-neutral-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Приемам
        </button>
      </div>
    </div>
  );
}
