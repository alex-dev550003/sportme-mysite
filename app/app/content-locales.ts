import type { LanguageKey } from "./languages";
import { translateText } from "./public-locales";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import pl from "./locales/pl.json";
import hu from "./locales/hu.json";
import cs from "./locales/cs.json";
import da from "./locales/da.json";
import sv from "./locales/sv.json";
import no from "./locales/no.json";
import is from "./locales/is.json";
import tr from "./locales/tr.json";

// Kept separate from the landing-page dictionary so long-form documents are
// only bundled with the routes that render them. Keys are the original copy.
const dictionaries: Record<Exclude<LanguageKey, "RO">, { english: Record<string, string>; romanian: Record<string, string> }> = {
  EN: en, FR: fr, DE: de, IT: it, ES: es, PT: pt,
  PL: pl, HU: hu, CS: cs, DA: da, SV: sv, NO: no, IS: is, TR: tr,
};

export function translateDocumentText(value: string, language: LanguageKey, source: "english" | "romanian" = "english"): string {
  if (language === "RO") return value;
  return dictionaries[language][source][value] ?? (source === "english" ? translateText(language, value) : value);
}

export function localizeContent<T>(content: T, language: LanguageKey, source: "english" | "romanian" = "english"): T {
  if (typeof content === "string") return translateDocumentText(content, language, source) as T;
  if (Array.isArray(content)) return content.map((item) => localizeContent(item, language, source)) as T;
  if (content && typeof content === "object") return Object.fromEntries(Object.entries(content).map(([key, value]) => [key, localizeContent(value, language, source)])) as T;
  return content;
}
