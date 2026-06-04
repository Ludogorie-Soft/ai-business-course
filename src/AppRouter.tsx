import {useEffect, useState} from 'react';
import App from './App.tsx';
import {ROUTES} from './constants/legal.ts';
import {CookiePolicyPage} from './pages/CookiePolicyPage.tsx';
import {PrivacyPolicyPage} from './pages/PrivacyPolicyPage.tsx';

function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const onNavigate = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onNavigate);
    return () => window.removeEventListener('popstate', onNavigate);
  }, []);

  return pathname;
}

export function AppRouter() {
  const pathname = usePathname();

  switch (pathname) {
    case ROUTES.privacy:
      return <PrivacyPolicyPage />;
    case ROUTES.cookies:
      return <CookiePolicyPage />;
    default:
      return <App />;
  }
}
