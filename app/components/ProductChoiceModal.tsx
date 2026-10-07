"use client";

import Image from "next/image";
import { useI18n } from "../app/i18n";

type Props = {
  onClose: () => void;
  onSelect: (product: "manager" | "player") => void;
};

function CloseIcon() {
  return <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function DeviceArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 164 88" className="h-[78px] w-[146px] sm:h-[88px] sm:w-[164px]" fill="none">
      <circle cx="75" cy="42" r="39" fill="#FFF1E9" />
      <rect x="19" y="16" width="100" height="59" rx="9" fill="white" stroke="#BBC5D2" strokeWidth="2" />
      <rect x="25" y="22" width="88" height="45" rx="5" fill="#F1F4F8" />
      <rect x="31" y="29" width="30" height="5" rx="2.5" fill="#CAD5E3" />
      <rect x="31" y="40" width="45" height="19" rx="5" fill="white" />
      <path d="M38 53l8-7 6 4 8-8" stroke="#FF5000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="82" y="40" width="24" height="19" rx="5" fill="white" />
      <path d="M89 53v-5m5 5v-9m5 9v-7" stroke="#1775D2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 78h119" stroke="#9DAABC" strokeWidth="2" strokeLinecap="round" />
      <rect x="106" y="9" width="36" height="68" rx="9" fill="white" stroke="#182032" strokeWidth="2.5" />
      <rect x="111" y="18" width="26" height="48" rx="4" fill="#F1F4F8" />
      <rect x="115" y="25" width="18" height="18" rx="5" fill="#FF5000" />
      <path d="M121 34h6m-3-3v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="115" y="48" width="18" height="4" rx="2" fill="#CAD5E3" />
      <rect x="115" y="55" width="13" height="4" rx="2" fill="#CAD5E3" />
      <circle cx="124" cy="71" r="2" fill="#AEB8C7" />
    </svg>
  );
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

export default function ProductChoiceModal({ onClose, onSelect }: Props) {
  const { text } = useI18n();
  const choices = [
    { product: "manager" as const, logo: "/logo-512admin.png", title: "SportMe Manager", subtitle: text("For sports venue managers", "Pentru managerii bazelor sportive") },
    { product: "player" as const, logo: "/logo-512.png", title: text("SportMe Player", "SportMe Jucător"), subtitle: text("For players and teams", "Pentru jucători și echipe") },
  ];

  return (
    <div className="fixed inset-0 isolate z-[999] flex items-center justify-center overflow-y-auto bg-[#111827]/70 px-4 py-4 font-sans backdrop-blur-[6px]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="product-choice-title">
      <div className="relative z-[1000] max-h-[calc(100dvh-24px)] w-full max-w-[480px] overflow-y-auto rounded-[28px] border border-white/80 bg-[linear-gradient(155deg,#f3f5f8_0%,#e5e9ef_100%)] px-5 pb-6 pt-5 text-[#182032] shadow-[0_30px_80px_rgba(12,22,39,0.28)] sm:px-7" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label={text("Close", "Închide")} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#d5dce6] bg-white text-[#182032] shadow-[0_2px_8px_rgba(24,32,50,0.08)] transition hover:bg-[#fff3ec] sm:right-5 sm:top-5"><CloseIcon /></button>
        <div className="flex justify-center"><DeviceArtwork /></div>
        <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff5000]">SportMe</p>
        <h2 id="product-choice-title" className="mt-1 text-center text-[27px] font-normal leading-tight tracking-[-0.025em] sm:text-[30px]">{text("Start for free", "Începe gratuit")}</h2>
        <p className="mx-auto mt-1.5 max-w-[310px] text-center text-[14px] leading-5 text-[#667184]">{text("Choose the app that suits you.", "Alege aplicația potrivită pentru tine.")}</p>
        <div className="mt-5 space-y-3">
          {choices.map((choice) => (
            <button key={choice.product} type="button" onClick={() => onSelect(choice.product)} className="group flex min-h-[82px] w-full items-center gap-3 rounded-[20px] border border-[#d5dce5] bg-white px-3.5 py-3 text-left shadow-[0_8px_22px_rgba(44,55,76,0.08)] transition hover:-translate-y-0.5 hover:border-[#ffae8b] hover:shadow-[0_12px_26px_rgba(255,80,0,0.12)] sm:px-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#edf4fb] p-1.5"><Image src={choice.logo} alt="" width={40} height={40} className="h-full w-full rounded-[10px] object-cover" /></span>
              <span className="flex min-w-0 flex-1 flex-col"><span className="text-[17px] font-medium tracking-[-0.015em] sm:text-[19px]">{choice.title}</span><span className="mt-0.5 text-[12px] leading-4 text-[#667184] sm:text-[13px]">{choice.subtitle}</span></span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0e7] text-[#ff5000] transition group-hover:translate-x-0.5 group-hover:bg-[#ff5000] group-hover:text-white"><ArrowIcon /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
