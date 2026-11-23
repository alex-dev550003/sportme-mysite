"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useI18n } from "../../app/i18n";
import { PublicGuideHeader } from "../../components/PublicGuideHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { playerGuideCopy } from "./guide-copy";

const ProductAccessFlow = dynamic(() => import("../../components/ProductAccessFlow"), { ssr: false });

export function PlayerQuickStartContent() {
  const { language, locale, text } = useI18n();
  const [showAccess, setShowAccess] = useState(false);
  const copy = playerGuideCopy[language];
  const startLabel = text("Start now", "Începe acum");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: copy.title,
    description: copy.intro,
    inLanguage: locale,
    url: "https://www.sportme.ro/player/quick-start",
    step: copy.steps.map((step, index) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
      url: `https://www.sportme.ro/player/quick-start#step-${index + 1}`,
    })),
  };

  return (
    <main className="public-site public-dark min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PublicGuideHeader />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-24 sm:px-5 md:px-8 lg:pb-16 lg:pt-28">
        <header className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6aa7ff]">SPORTME PLAYER</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">{copy.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/72">{copy.intro}</p>
          <button type="button" onClick={() => setShowAccess(true)} className="mt-6 inline-flex rounded-full bg-[#106dff] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#005be6]">{startLabel}</button>
        </header>

        <ol className="mt-14 space-y-12">
          {copy.steps.map((step, index) => (
            <li key={index} id={`step-${index + 1}`} className="max-w-5xl scroll-mt-24">
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-lg font-semibold text-white shadow-[0_16px_32px_rgba(16,109,255,0.28)]">{index + 1}</span>
                <h2 className="text-2xl font-semibold leading-tight md:text-3xl">{step.title}</h2>
              </div>
              <p className="mt-5 text-base leading-7 text-white/72">{step.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-14 max-w-5xl rounded-[24px] border border-white/12 bg-white/[0.055] p-6 md:p-8">
          <h2 className="text-2xl font-semibold">{copy.tipsTitle}</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-7 text-white/72">
            {copy.tips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </section>
        <div className="mt-12"><SiteFooter /></div>
      </div>
      {showAccess ? <ProductAccessFlow title={startLabel} onClose={() => setShowAccess(false)} /> : null}
    </main>
  );
}
