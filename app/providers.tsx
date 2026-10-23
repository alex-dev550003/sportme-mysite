"use client";

import { ReactNode } from "react";
import { I18nProvider } from "./app/i18n";
import { CookieConsent } from "./components/CookieConsent";
import type { LanguageKey } from "./app/languages";

export function Providers({ children, initialLanguage }: { children: ReactNode; initialLanguage: LanguageKey }) {
  return (
    <I18nProvider initialLanguage={initialLanguage}>
      {children}
      <CookieConsent />
    </I18nProvider>
  );
}

