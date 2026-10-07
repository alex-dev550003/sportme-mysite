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
