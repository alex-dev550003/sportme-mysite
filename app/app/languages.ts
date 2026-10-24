export const languages = [
  { code: "RO", name: "Română", locale: "ro-RO", flags: ["ro"] },
  { code: "EN", name: "English", locale: "en-GB", flags: ["gb", "us"] },
  { code: "FR", name: "Français", locale: "fr-FR", flags: ["fr"] },
  { code: "DE", name: "Deutsch", locale: "de-DE", flags: ["de"] },
  { code: "IT", name: "Italiano", locale: "it-IT", flags: ["it"] },
  { code: "ES", name: "Español", locale: "es-ES", flags: ["mx", "es"] },
  { code: "PT", name: "Português", locale: "pt-PT", flags: ["pt", "br"] },
  { code: "PL", name: "Polski", locale: "pl-PL", flags: ["pl"] },
  { code: "HU", name: "Magyar", locale: "hu-HU", flags: ["hu"] },
  { code: "CS", name: "Čeština", locale: "cs-CZ", flags: ["cz"] },
  { code: "DA", name: "Dansk", locale: "da-DK", flags: ["dk"] },
  { code: "SV", name: "Svenska", locale: "sv-SE", flags: ["se"] },
  { code: "NO", name: "Norsk bokmål", locale: "nb-NO", flags: ["no"] },
  { code: "IS", name: "Íslenska", locale: "is-IS", flags: ["is"] },
  { code: "TR", name: "Türkçe", locale: "tr-TR", flags: ["tr"] },
] as const;

export type LanguageKey = (typeof languages)[number]["code"];
export type BaseLanguageKey = "RO" | "EN";
export const isLanguageKey = (value: unknown): value is LanguageKey => languages.some(({ code }) => code === value);

const countryLanguage: Partial<Record<string, LanguageKey>> = {
  RO: "RO", MD: "RO",
  GB: "EN", IE: "EN", US: "EN", AU: "EN", NZ: "EN",
  FR: "FR",
  DE: "DE", AT: "DE", CH: "DE", LI: "DE",
  IT: "IT", SM: "IT",
  ES: "ES", MX: "ES", AR: "ES", CO: "ES", CL: "ES", PE: "ES", UY: "ES", PY: "ES", BO: "ES", EC: "ES", VE: "ES",
  PT: "PT", BR: "PT",
  PL: "PL", HU: "HU", CZ: "CS", DK: "DA", SE: "SV", NO: "NO", IS: "IS", TR: "TR",
};

export function languageFromLocale(locale: string): LanguageKey | undefined {
  const base = locale.trim().replace(/_/g, "-").split("-")[0]?.toUpperCase();
  // Browsers use both the generic Norwegian tag and Bokmal/Nynorsk tags.
  if (base === "NB" || base === "NN") return "NO";
  return isLanguageKey(base) ? base : undefined;
}

export function detectVisitorLanguage(country: string | null | undefined, preferredLocales: readonly string[]): LanguageKey {
  const fromBrowser = preferredLocales.map(languageFromLocale).find((value) => value !== undefined);
  if (fromBrowser) return fromBrowser;

  const normalizedCountry = country?.toUpperCase();
  const fromCountry = normalizedCountry ? countryLanguage[normalizedCountry] : undefined;
  if (fromCountry) return fromCountry;
  return "EN";
}
