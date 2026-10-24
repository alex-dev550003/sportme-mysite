"use client";

import Image from "next/image";
import { useI18n } from "../app/i18n";

type Props = {
  onClose: () => void;
  onSelect: (product: "manager" | "player") => void;
  mode?: "start" | "signIn";
  title?: string;
};

function CloseIcon() {
  return <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function DeviceArtwork() {
  return (
    <svg aria-hidden="true" viewBox="0 0 164 88" className="h-[68px] w-[127px] sm:h-[88px] sm:w-[164px]" fill="none">
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

export default function ProductChoiceModal({ onClose, onSelect, mode = "start", title }: Props) {
  const { text } = useI18n();
  const choices = [
    { product: "manager" as const, logo: "/logo-512admin.png", title: "SportMe Manager", subtitle: text("For sports venue managers", "Pentru managerii bazelor sportive") },
    { product: "player" as const, logo: "/logo-512.png", title: text("SportMe Player", "SportMe Jucător"), subtitle: text("For players and teams", "Pentru jucători și echipe") },
  ];

  if (mode === "signIn") {
    return (
      <div className="fixed inset-0 isolate z-[999] flex items-center justify-center overflow-y-auto bg-black/45 px-3 py-3 backdrop-blur-[2px] sm:px-4 sm:py-5" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="product-choice-title">
        <div className="relative max-h-[90dvh] w-full max-w-[290px] overflow-y-auto rounded-3xl border border-[#D9D8DC] bg-[#E6E5EA] p-3.5 text-center text-[#1f211f] shadow-2xl sm:max-w-[520px] sm:p-6" onClick={(event) => event.stopPropagation()}>
          <button type="button" onClick={onClose} aria-label={text("Close", "Închide")} className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#d5dbe5] bg-white text-[#1f211f] shadow-sm transition hover:bg-slate-50 sm:right-5 sm:top-5 sm:h-9 sm:w-9"><CloseIcon /></button>
          <div className="mx-auto px-2 sm:px-4 sm:pt-1">
            <h2 id="product-choice-title" className="mt-2 text-[22px] font-medium text-[#1f211f] sm:mt-4 sm:text-[26px]">{title ?? text("Sign in", "Autentificare")}</h2>
            <p className="mx-auto mt-1 text-[13px] leading-5 text-slate-600 sm:text-[15px] sm:leading-6">{text("Are you a sports venue manager or a player?", "Ești managerul unei baze sportive sau jucător?")}</p>
          </div>
          <div className="mx-auto mt-3 grid max-w-[260px] grid-cols-2 gap-2 sm:mt-6 sm:max-w-[360px] sm:gap-8">
            {choices.map((choice) => (
              <button key={choice.product} type="button" onClick={() => onSelect(choice.product)} className="group flex flex-col items-center py-1.5 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b73ff] sm:py-3">
                <Image src={choice.logo} alt="" width={112} height={112} className="h-[76px] w-[76px] rounded-[16px] object-cover transition-transform group-hover:scale-105 sm:h-28 sm:w-28 sm:rounded-[18px]" />
                <span className="mt-1.5 text-[15px] font-medium text-[#1f211f] sm:mt-3 sm:whitespace-nowrap sm:text-[17px]">{choice.product === "manager" ? text("Managers", "Manageri Baze") : text("Players", "Jucători")}</span>
                <span className="mt-0.5 text-[11px] leading-4 text-[#667184] sm:mt-1 sm:whitespace-nowrap sm:text-[13px] sm:leading-5">{choice.product === "manager" ? text("Free or Premium", "Gratuit sau Premium") : text("Free", "Gratuit")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 isolate z-[999] flex items-center justify-center overflow-y-auto bg-[#111827]/70 px-4 py-4 font-sans backdrop-blur-[6px]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="product-choice-title">
      <div className="relative z-[1000] max-h-[calc(100dvh-24px)] w-full max-w-[340px] overflow-y-auto rounded-[28px] border border-white/80 bg-[linear-gradient(155deg,#f3f5f8_0%,#e5e9ef_100%)] px-4 pb-5 pt-4 text-[#182032] shadow-[0_30px_80px_rgba(12,22,39,0.28)] sm:max-w-[480px] sm:px-7 sm:pb-6 sm:pt-5" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label={text("Close", "Închide")} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#d5dce6] bg-white text-[#182032] shadow-[0_2px_8px_rgba(24,32,50,0.08)] transition hover:bg-[#fff3ec] sm:right-5 sm:top-5 sm:h-9 sm:w-9"><CloseIcon /></button>
        <div className="flex justify-center"><DeviceArtwork /></div>
        <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff5000]">SportMe</p>
        <h2 id="product-choice-title" className="mt-1 text-center text-[23px] font-normal leading-tight tracking-[-0.025em] sm:text-[30px]">{text("Start for free", "Începe gratuit")}</h2>
        <p className="mx-auto mt-1.5 max-w-[310px] text-center text-[12px] leading-5 text-[#667184] sm:text-[14px]">{text("Choose the app that suits you.", "Alege aplicația potrivită pentru tine.")}</p>
        <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
          {choices.map((choice) => (
            <button key={choice.product} type="button" onClick={() => onSelect(choice.product)} className="group flex min-h-[72px] w-full items-center gap-2.5 rounded-[20px] border border-[#d5dce5] bg-white px-3 py-2.5 text-left shadow-[0_8px_22px_rgba(44,55,76,0.08)] transition hover:-translate-y-0.5 hover:border-[#ffae8b] hover:shadow-[0_12px_26px_rgba(255,80,0,0.12)] sm:min-h-[82px] sm:gap-3 sm:px-4 sm:py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#edf4fb] p-1.5 sm:h-12 sm:w-12"><Image src={choice.logo} alt="" width={40} height={40} className="h-full w-full rounded-[10px] object-cover" /></span>
              <span className="flex min-w-0 flex-1 flex-col"><span className="text-[16px] font-medium tracking-[-0.015em] sm:text-[19px]">{choice.title}</span><span className="mt-0.5 text-[11px] leading-4 text-[#667184] sm:text-[13px]">{choice.subtitle}</span></span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0e7] text-[#ff5000] transition group-hover:translate-x-0.5 group-hover:bg-[#ff5000] group-hover:text-white sm:h-9 sm:w-9"><ArrowIcon /></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
