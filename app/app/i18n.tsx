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
const COUNTRY_LANGUAGE: Partial<Record<string, LanguageKey>> = {
  RO: "RO", MD: "RO",
  GB: "EN", IE: "EN", US: "EN", AU: "EN", NZ: "EN",
  FR: "FR",
  DE: "DE", AT: "DE",
  IT: "IT", SM: "IT",
  ES: "ES", MX: "ES", AR: "ES", CO: "ES", CL: "ES", PE: "ES", UY: "ES", PY: "ES", BO: "ES", EC: "ES", VE: "ES",
  PT: "PT", BR: "PT",
};
const I18nContext = createContext<I18nContextValue | null>(null);

function formatMessage(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageKey>("RO");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch { /* Language switching remains usable when storage is blocked. */ }
    if (isLanguageKey(stored)) {
      setLanguageState(stored);
      return;
    }

    const country = document.cookie.match(/(?:^|;\s*)sportmeVisitorCountry=([A-Z]{2})(?:;|$)/)?.[1];
    const countryLanguage = country ? COUNTRY_LANGUAGE[country] : undefined;
    if (countryLanguage) {
      setLanguageState(countryLanguage);
      return;
    }

    const preferredLanguage = [...(navigator.languages ?? []), navigator.language]
      .map((locale) => locale.split("-")[0]?.toUpperCase())
      .find(isLanguageKey);
    if (preferredLanguage) setLanguageState(preferredLanguage);
    else if (country) setLanguageState("EN");
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
