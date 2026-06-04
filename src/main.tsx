import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {SpeedInsights} from '@vercel/speed-insights/react';
import {CookieConsentProvider} from './CookieConsentProvider.tsx';
import {AppRouter} from './AppRouter.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookieConsentProvider>
      <AppRouter />
      <SpeedInsights />
    </CookieConsentProvider>
  </StrictMode>,
);
