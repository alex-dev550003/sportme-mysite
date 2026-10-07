"use client";

import { useI18n } from "../app/i18n";
import { LanguageSelector } from "./LanguageSelector";

type PublicTopControlsProps = {
  showBack?: boolean;
  homeHref?: string;
  hideLanguage?: boolean;
  backLabel?: string;
};

export function PublicTopControls({ showBack = false, homeHref = "/", hideLanguage = false, backLabel }: PublicTopControlsProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-end gap-3">
      {!hideLanguage ? <LanguageSelector /> : null}
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
