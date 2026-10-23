"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { translations, type TranslationKey, type LanguageKey } from "./translations";
import { detectVisitorLanguage, isLanguageKey, languages } from "./languages";
import { translateText } from "./public-locales";

type I18nContextValue = {
  language: LanguageKey;
  locale: string;
  setLanguage: (lang: LanguageKey) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  text: (english: string, romanian?: string) => string;
};

const LANGUAGE_STORAGE_KEY = "appLanguage";
const I18nContext = createContext<I18nContextValue | null>(null);

function persistLanguageCookie(language: LanguageKey) {
  try {
    document.cookie = `sportmeLanguage=${language}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch { /* Language selection still works if cookies are blocked. */ }
}

function formatMessage(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function I18nProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: LanguageKey }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<LanguageKey>(initialLanguage);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch { /* Language switching remains usable when storage is blocked. */ }
    if (isLanguageKey(stored)) {
      setLanguageState(stored);
      persistLanguageCookie(stored);
      if (stored !== initialLanguage) router.refresh();
      return;
    }

    const selectedCookie = document.cookie.match(/(?:^|;\s*)sportmeLanguage=(RO|EN|FR|DE|IT|ES|PT)(?:;|$)/)?.[1];
    if (isLanguageKey(selectedCookie)) {
      setLanguageState(selectedCookie);
      return;
    }

    const country = document.cookie.match(/(?:^|;\s*)sportmeVisitorCountry=([A-Z]{2})(?:;|$)/)?.[1];
    const detected = detectVisitorLanguage(country, [...(navigator.languages ?? []), navigator.language]);
    setLanguageState(detected);
    if (detected !== initialLanguage) {
      persistLanguageCookie(detected);
      router.refresh();
    }
  }, [initialLanguage, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (isLanguageKey(event.newValue)) {
        setLanguageState(event.newValue);
        persistLanguageCookie(event.newValue);
        router.refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [router]);

  const setLanguage = useCallback((lang: LanguageKey) => {
    setLanguageState(lang);
    persistLanguageCookie(lang);
    if (typeof window !== "undefined") {
      try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch { /* Optional persistence. */ }
      router.refresh();
    }
  }, [router]);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const template = translateText(language, translations.EN[key] ?? key, translations.RO[key] ?? translations.EN[key] ?? key);
      return formatMessage(template, params);
    },
    [language]
  );

  const text = useCallback((english: string, romanian?: string) => translateText(language, english, romanian), [language]);
  useEffect(() => { document.documentElement.lang = language.toLowerCase(); }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      locale: languages.find((item) => item.code === language)!.locale,
      setLanguage,
      t,
      text,
    }),
    [language, setLanguage, t, text]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
