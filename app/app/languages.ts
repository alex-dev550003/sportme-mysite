export const languages = [
  { code: "RO", name: "Română", locale: "ro-RO", flags: ["ro"] },
  { code: "EN", name: "English", locale: "en-GB", flags: ["gb", "us"] },
  { code: "FR", name: "Français", locale: "fr-FR", flags: ["fr"] },
  { code: "DE", name: "Deutsch", locale: "de-DE", flags: ["de"] },
  { code: "IT", name: "Italiano", locale: "it-IT", flags: ["it"] },
  { code: "ES", name: "Español", locale: "es-ES", flags: ["mx", "es"] },
  { code: "PT", name: "Português", locale: "pt-PT", flags: ["pt", "br"] },
] as const;

export type LanguageKey = (typeof languages)[number]["code"];
export type BaseLanguageKey = "RO" | "EN";
export const isLanguageKey = (value: unknown): value is LanguageKey => languages.some(({ code }) => code === value);

const countryLanguage: Partial<Record<string, LanguageKey>> = {
  RO: "RO", MD: "RO",
  GB: "EN", IE: "EN", US: "EN", AU: "EN", NZ: "EN",
  FR: "FR",
  DE: "DE", AT: "DE",
  IT: "IT", SM: "IT",
  ES: "ES", MX: "ES", AR: "ES", CO: "ES", CL: "ES", PE: "ES", UY: "ES", PY: "ES", BO: "ES", EC: "ES", VE: "ES",
  PT: "PT", BR: "PT",
};

export function detectVisitorLanguage(country: string | null | undefined, preferredLocales: readonly string[]): LanguageKey {
  const normalizedCountry = country?.toUpperCase();
  const fromCountry = normalizedCountry ? countryLanguage[normalizedCountry] : undefined;
  if (fromCountry) return fromCountry;

  const fromBrowser = preferredLocales
    .map((locale) => locale.split("-")[0]?.toUpperCase())
    .find(isLanguageKey);
  return fromBrowser ?? (normalizedCountry ? "EN" : "RO");
}
