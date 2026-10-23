import { cache } from "react";
import { cookies, headers } from "next/headers";
import { detectVisitorLanguage, isLanguageKey, type LanguageKey } from "./languages";

export const getServerLanguage = cache(async (): Promise<LanguageKey> => {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const selected = cookieStore.get("sportmeLanguage")?.value;
  if (isLanguageKey(selected)) return selected;

  const country = headerStore.get("x-vercel-ip-country") ?? cookieStore.get("sportmeVisitorCountry")?.value;
  const preferredLocales = (headerStore.get("accept-language") ?? "")
    .split(",")
    .map((entry) => {
      const [locale, quality] = entry.trim().split(";q=");
      return { locale, quality: quality ? Number(quality) : 1 };
    })
    .filter(({ locale, quality }) => locale && Number.isFinite(quality) && quality > 0)
    .sort((a, b) => b.quality - a.quality)
    .map(({ locale }) => locale);

  return detectVisitorLanguage(country, preferredLocales);
});
