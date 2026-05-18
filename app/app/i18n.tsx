"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations, type TranslationKey, type LanguageKey } from "./translations";

type I18nContextValue = {
  language: LanguageKey;
  locale: string;
  setLanguage: (lang: LanguageKey) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
};

const LANGUAGE_STORAGE_KEY = "appLanguage";
const I18nContext = createContext<I18nContextValue | null>(null);

const localeByLanguage: Record<LanguageKey, string> = {
  EN: "en-GB",
  RO: "ro-RO",
};

function formatMessage(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageKey>("RO");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "EN" || stored === "RO") {
      setLanguageState(stored);
      return;
    }
    setLanguageState("RO");
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "RO");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;
      if (event.newValue === "EN" || event.newValue === "RO") {
        setLanguageState(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setLanguage = useCallback((lang: LanguageKey) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      const template = translations[language][key] ?? translations.EN[key] ?? key;
      return formatMessage(template, params);
    },
    [language]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      locale: localeByLanguage[language],
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
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
