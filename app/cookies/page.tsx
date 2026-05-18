"use client";

import Image from "next/image";
import { I18nProvider, useI18n } from "../app/i18n";
import { cookiesPolicy } from "../app/translations";
import { PublicTopControls } from "../components/PublicTopControls";
import { SiteFooter } from "../components/SiteFooter";

export default function CookiesPage() {
  return (
    <I18nProvider>
      <CookiesContent />
    </I18nProvider>
  );
}

function CookiesContent() {
  const { t, language } = useI18n();
  const policy = cookiesPolicy[language];

  return (
    <main className="public-site min-h-screen bg-[#f6f1e7] text-[#1f211f]">
      <div className="relative overflow-hidden">
        

        <div className="mx-auto w-full max-w-4xl px-5 pb-12 pt-10">
          <div className="flex justify-end">
            <PublicTopControls showBack />
          </div>
          <header className="relative overflow-hidden rounded-[28px] border border-[#d8d1bf] bg-white/80 px-6 py-8 shadow-[0_24px_60px_-40px_rgba(32,33,31,0.7)] backdrop-blur">
            <div className="absolute right-6 top-6 hidden h-24 w-60 items-center justify-center rounded-2xl bg-white/85 px-4 shadow-[0_18px_35px_-28px_rgba(32,33,31,0.5)] sm:flex">
              <img src="/patterns/6247dd6f-1.png" alt="SportMe" className="h-12 w-full object-contain" />
            </div>
            <div className="flex flex-col gap-3 sm:max-w-[70%]">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7a7566]">SportMe</p>
              <h1 className="text-3xl font-semibold">{t("cookies.title")}</h1>
              <p className="text-sm text-[#7a7566]">{t("cookies.updated")}</p>
              <p className="text-base text-[#5b564b]">{policy.intro}</p>
            </div>
          </header>

          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr,1fr]">
            <section className="space-y-4">
              {policy.sections.map((section) => (
                <div key={section.title} className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  <div className="mt-2 space-y-2 text-sm text-[#5b564b]">
                    {section.body.map((line, index) => (
                      <p key={`${section.title}-${index}`}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-[#d8d1bf] bg-[#f1f2f4] p-6 shadow-sm">
                <h3 className="text-base font-semibold">{t("cookies.quickSummary")}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[#5b564b]">
                  {policy.summaryItems.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold">{t("cookies.needHelp")}</h3>
                <p className="mt-2 text-sm text-[#5b564b]">{t("cookies.helpText")}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Image src="/globe.svg" alt="Website" width={18} height={18} className="h-4 w-4" />
                  <a className="text-sm font-semibold text-[#1d5f63] underline" href="https://sportme.ro">
                    sportme.ro
                  </a>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Image src="/file.svg" alt="Email" width={18} height={18} className="h-4 w-4" />
                  <a className="text-sm font-semibold text-[#1d5f63] underline" href="mailto:office@sportme.ro">
                    office@sportme.ro
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10">
            <SiteFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
