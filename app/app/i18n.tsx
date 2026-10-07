"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, type TranslationKey, type LanguageKey } from "./translations";
import { isLanguageKey, languages } from "./languages";
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

function formatMessage(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageKey>("RO");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguageKey(stored)) setLanguageState(stored);
    } catch { /* Language switching remains usable when storage is blocked. */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (isLanguageKey(event.newValue)) {
        setLanguageState(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLanguage = useCallback((lang: LanguageKey) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      try { window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch { /* Optional persistence. */ }
    }
  }, []);

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
