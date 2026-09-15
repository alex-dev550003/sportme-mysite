"use client";

import { useI18n } from "../app/i18n";
import { openCookieSettings } from "../utils/consent";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="sportme-site-footer rounded-[28px] border border-transparent bg-transparent px-4 py-4 shadow-none md:px-5 md:py-4">
      <div className="flex flex-col gap-2 text-sm text-[#5b564b] md:flex-row md:items-center md:justify-between">
        <div className="text-xs uppercase tracking-[0.3em] text-[#7a7566]">SportMe</div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <a className="font-normal text-[#0564ff] no-underline" href="/terms">
            {t("footer.terms")}
          </a>
          <a className="font-normal text-[#0564ff] no-underline" href="/cookies">
            {t("footer.cookies")}
          </a>
          <button
            type="button"
            className="font-normal text-[#0564ff] no-underline"
            onClick={openCookieSettings}
          >
            {t("footer.cookieSettings")}
          </button>
          <a className="font-normal text-[#0564ff] no-underline" href="/privacy-policy">
            {t("privacy.title")}
          </a>
          <a className="font-normal text-[#0564ff] no-underline" href="mailto:office@sportme.ro">
            office@sportme.ro
          </a>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#7a7566] md:mt-3">
        <a
          className="inline-flex items-center rounded-lg border border-[#d8d1bf] bg-white px-2 py-1 shadow-sm transition hover:shadow-md"
          href="https://reclamatiisal.anpc.ro/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/anpc-sal.png" alt="ANPC SAL" className="h-8 w-auto" />
        </a>
        <a
          className="inline-flex items-center rounded-lg border border-[#d8d1bf] bg-white px-2 py-1 shadow-sm transition hover:shadow-md"
          href="https://consumer-redress.ec.europa.eu/index_en"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/anpc-sol.png" alt="ANPC SOL" className="h-8 w-auto" />
        </a>
      </div>
    </footer>
  );
}
