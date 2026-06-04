import {Analytics} from '@vercel/analytics/react';
import {createContext, useContext, useEffect, useState, type ReactNode} from 'react';
import {CookieBanner} from './components/CookieBanner.tsx';
import {
  getStoredConsent,
  loadConsentGatedAnalytics,
  revokeAnalytics,
  saveConsent,
  type ConsentStatus,
} from './cookieConsent.ts';

interface CookieConsentContextValue {
  consent: ConsentStatus;
  reopenSettings: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}

export function CookieConsentProvider({children}: {children: ReactNode}) {
  const [consent, setConsent] = useState<ConsentStatus>(() => getStoredConsent());
  const [bannerVisible, setBannerVisible] = useState(() => getStoredConsent() === null);

  useEffect(() => {
    if (consent === 'accepted') {
      loadConsentGatedAnalytics();
    }
  }, [consent]);

  const accept = () => {
    saveConsent('accepted');
    setConsent('accepted');
    setBannerVisible(false);
  };

  const reject = () => {
    saveConsent('rejected');
    setConsent('rejected');
    setBannerVisible(false);
    revokeAnalytics();
  };

  const reopenSettings = () => setBannerVisible(true);

  return (
    <CookieConsentContext.Provider value={{consent, reopenSettings}}>
      {children}
      <Analytics />
      {bannerVisible && <CookieBanner onAccept={accept} onReject={reject} />}
    </CookieConsentContext.Provider>
  );
}
