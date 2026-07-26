const STORAGE_KEY = 'cookie-consent';
const CONSENT_VERSION = 1;
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 3 months

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID ?? 'G-JYZ1RKX9HZ';
const CLARITY_ID = import.meta.env.VITE_CLARITY_PROJECT_ID ?? 'x1xhd22x43';

export type ConsentStatus = 'accepted' | 'rejected' | null;

interface ConsentRecord {
  status: Exclude<ConsentStatus, null>;
  timestamp: number;
  version: number;
}

let analyticsLoaded = false;

export function getStoredConsent(): ConsentStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const record = JSON.parse(raw) as ConsentRecord;
    if (record.version !== CONSENT_VERSION) return null;
    if (Date.now() - record.timestamp > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return record.status;
  } catch {
    return null;
  }
}

export function saveConsent(status: Exclude<ConsentStatus, null>): void {
  const record: ConsentRecord = {
    status,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Loads Google Analytics and Microsoft Clarity only — not Vercel Analytics. */
export function loadConsentGatedAnalytics(): void {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  loadGoogleAnalytics();
  loadClarity();
}

export function revokeAnalytics(): void {
  analyticsLoaded = false;

  if (window.gtag) {
    window.gtag('consent', 'update', {analytics_storage: 'denied'});
  }

  document.getElementById('ga-script')?.remove();
  document.getElementById('clarity-script')?.remove();
}

function loadGoogleAnalytics(): void {
  if (document.getElementById('ga-script')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.onload = () => {
    window.gtag!('js', new Date());
    window.gtag!('config', GA_ID);
  };
  document.head.appendChild(script);
}

function loadClarity(): void {
  if (document.getElementById('clarity-script')) return;

  // Ensure the queue stub exists in case index.html stub was somehow bypassed.
  window.clarity = window.clarity || function (...args: unknown[]) {
    (window.clarity!.q = window.clarity!.q || []).push(args);
  };

  const script = document.createElement('script');
  script.id = 'clarity-script';
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}
