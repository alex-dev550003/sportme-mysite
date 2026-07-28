"use client";

import { ReactNode } from "react";
import { I18nProvider } from "./app/i18n";
import { CookieConsent } from "./components/CookieConsent";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      {children}
      <CookieConsent />
    </I18nProvider>
  );
}

