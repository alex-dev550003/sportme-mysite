"use client";

import { useI18n } from "../app/i18n";

type PublicTopControlsProps = {
  showBack?: boolean;
  homeHref?: string;
};

export function PublicTopControls({ showBack = false, homeHref = "/about" }: PublicTopControlsProps) {
  const { t, language, setLanguage } = useI18n();

  return (
    <div className="flex flex-col items-end gap-3">
      <div
        className="inline-flex rounded-full border border-[#d8d1bf] bg-white/80 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#4b4a43] shadow-[0_12px_24px_-18px_rgba(32,33,31,0.7)]"
        aria-label={t("about.languageToggleLabel")}
      >
        <button
          type="button"
          onClick={() => setLanguage("RO")}
          aria-pressed={language === "RO"}
          className={`rounded-full px-3 py-1 transition ${
            language === "RO" ? "bg-[#1f211f] text-white" : "text-[#4b4a43] hover:bg-white"
          }`}
        >
          RO
        </button>
        <button
          type="button"
          onClick={() => setLanguage("EN")}
          aria-pressed={language === "EN"}
          className={`rounded-full px-3 py-1 transition ${
            language === "EN" ? "bg-[#1f211f] text-white" : "text-[#4b4a43] hover:bg-white"
          }`}
        >
          EN
        </button>
      </div>
      {showBack ? (
        <a
          className="rounded-full border border-[#d8d1bf] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4b4a43] shadow-[0_12px_24px_-18px_rgba(32,33,31,0.6)] transition hover:bg-white"
          href={homeHref}
        >
          {t("public.backHome")}
        </a>
      ) : null}
    </div>
  );
}
