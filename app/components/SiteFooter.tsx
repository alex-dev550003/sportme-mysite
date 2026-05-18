"use client";

import { useI18n } from "../app/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="rounded-[28px] border border-[#d8d1bf] bg-white px-6 py-5 shadow-[0_24px_60px_-40px_rgba(32,33,31,0.6)]">
      <div className="flex flex-col gap-4 text-sm text-[#5b564b] md:flex-row md:items-center md:justify-between">
        <div className="text-xs uppercase tracking-[0.3em] text-[#7a7566]">SportMe</div>
        <div className="flex flex-wrap items-center gap-4">
          <a className="font-semibold text-[#1d5f63] underline" href="/terms">
            {t("footer.terms")}
          </a>
          <a className="font-semibold text-[#1d5f63] underline" href="/cookies">
            {t("footer.cookies")}
          </a>
          <a className="font-semibold text-[#1d5f63] underline" href="/privacy-policy">
            {t("privacy.title")}
          </a>
          <a className="font-semibold text-[#1d5f63] underline" href="mailto:office@sportme.ro">
            office@sportme.ro
          </a>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#7a7566] md:mt-5">
        <a
          className="inline-flex items-center rounded-lg border border-[#d8d1bf] bg-white px-2 py-1 shadow-sm transition hover:shadow-md"
          href="https://reclamatiisal.anpc.ro/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/anpc-sal.png" alt="ANPC SAL" className="h-9 w-auto" />
        </a>
        <a
          className="inline-flex items-center rounded-lg border border-[#d8d1bf] bg-white px-2 py-1 shadow-sm transition hover:shadow-md"
          href="https://consumer-redress.ec.europa.eu/index_en"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/anpc-sol.png" alt="ANPC SOL" className="h-9 w-auto" />
        </a>
      </div>
    </footer>
  );
}
