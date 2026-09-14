"use client";

import { useI18n } from "../app/i18n";

type Props = {
  onClose: () => void;
  onSelect: (product: "manager" | "player") => void;
};

function CloseIcon() {
  return <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function ProductIcon({ product }: { product: "manager" | "player" }) {
  return product === "manager" ? (
    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="13" rx="2" /><path d="M9 21h6M12 18v3" /></svg>
  ) : (
    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M10 18h4" /></svg>
  );
}

export default function ProductChoiceModal({ onClose, onSelect }: Props) {
  const { language } = useI18n();
  const isEnglish = language === "EN";
  const choices = [
    { product: "manager" as const, title: isEnglish ? "SportMe Manager" : "SportMe Manager", subtitle: isEnglish ? "For sports venue managers" : "Pentru managerii bazelor sportive" },
    { product: "player" as const, title: isEnglish ? "SportMe Player" : "SportMe Jucător", subtitle: isEnglish ? "For players and teams" : "Pentru jucatori si echipe" },
  ];

  return (
    <div className="fixed inset-0 isolate z-[999] flex items-center justify-center bg-[#111827]/78 px-4 py-4 font-sans backdrop-blur-[4px]" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative z-[1000] w-full max-w-[452px] rounded-[20px] border border-[#e1e3e7] bg-[#e5e7eb] px-5 py-6 text-[#182032] shadow-[0_22px_60px_rgba(0,0,0,0.28)] sm:px-7" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-[#d2dce9] bg-white text-[#182032] shadow-[0_2px_6px_rgba(24,32,50,0.08)] transition hover:bg-[#f8fbff]"><CloseIcon /></button>
        <h2 className="text-center text-[25px] font-medium leading-tight tracking-[-0.02em]">{isEnglish ? "Start for free" : "Începe gratuit"}</h2>
        <p className="mt-2 text-center text-[15px] leading-5 text-[#68758a]">{isEnglish ? "Are you a manager or a player?" : "Ești Manager sau Jucător?"}</p>
        <div className="mt-5 space-y-3">
          {choices.map((choice) => (
            <button key={choice.product} type="button" onClick={() => onSelect(choice.product)} className="group flex w-full items-center gap-3 rounded-[18px] border border-[#c9d8e9] bg-white/80 px-4 py-3 text-left shadow-[0_5px_14px_rgba(44,55,76,0.06)] transition hover:-translate-y-0.5 hover:border-[#8fb5e7]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#edf5ff]"><ProductIcon product={choice.product} /></span>
              <span className="flex min-w-0 flex-1 flex-col"><span className="text-[17px] font-medium tracking-[-0.01em]">{choice.title}</span><span className="mt-0.5 text-[12px] text-[#667184]">{choice.subtitle}</span></span>
              <span className="text-[25px] leading-none text-[#1877f2] transition group-hover:translate-x-0.5">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
