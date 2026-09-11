"use client";

import { useI18n } from "../app/i18n";
import { trackEvent } from "../utils/analytics";

type PublicTopControlsProps = {
  showBack?: boolean;
  homeHref?: string;
  hideLanguage?: boolean;
  backLabel?: string;
};

export function PublicTopControls({ showBack = false, homeHref = "/", hideLanguage = false, backLabel }: PublicTopControlsProps) {
  const { t, language, setLanguage } = useI18n();

  const switchLanguage = (nextLanguage: "RO" | "EN") => {
    setLanguage(nextLanguage);
    trackEvent(nextLanguage === "RO" ? "language_switch_ro" : "language_switch_en");
  };

  return (
    <div className="flex flex-col items-end gap-3">
      {!hideLanguage ? (
        <div
          className="inline-flex rounded-full border border-[#d7dfe9] bg-white/75 p-1 text-xs font-semibold uppercase tracking-normal text-[#182032]/70 shadow-[0_14px_34px_rgba(44,55,76,0.11)] backdrop-blur-md"
          aria-label={t("about.languageToggleLabel")}
        >
          <button
            type="button"
            onClick={() => switchLanguage("RO")}
            aria-pressed={language === "RO"}
            className={`rounded-full px-3 py-1 transition ${
              language === "RO" ? "bg-[#182032] text-white" : "text-[#182032]/68 hover:bg-white"
            }`}
          >
            RO
          </button>
          <button
            type="button"
            onClick={() => switchLanguage("EN")}
            aria-pressed={language === "EN"}
            className={`rounded-full px-3 py-1 transition ${
              language === "EN" ? "bg-[#182032] text-white" : "text-[#182032]/68 hover:bg-white"
            }`}
          >
            EN
          </button>
        </div>
      ) : null}
      {showBack ? (
        <a
          className="rounded-full border border-[#d7dfe9] bg-white/65 px-3 py-1.5 text-[11px] font-medium text-[#182032]/70 shadow-[0_10px_22px_rgba(44,55,76,0.1)] transition hover:bg-white/85"
          href={homeHref}
        >
          {backLabel ?? t("public.backHome")}
        </a>
      ) : null}
    </div>
  );
}
