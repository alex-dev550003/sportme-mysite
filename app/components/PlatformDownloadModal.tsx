"use client";

import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  adminUrl: string;
  managerPlayStoreUrl: string;
  playerWebUrl: string;
  playerPlayStoreUrl: string;
};

function PlatformIcon({ platform }: { platform: "apple" | "android" | "browser" }) {
  if (platform === "apple") {
    return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-11 w-11 fill-current"><path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" /></svg>;
  }

  if (platform === "android") {
    return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12"><path fill="#34A853" d="M8.2 5.1a3.2 3.2 0 0 0-.7 2v33.8c0 .8.3 1.5.7 2L27 24 8.2 5.1Z" /><path fill="#4285F4" d="M8.2 42.9c.8.8 2.1 1 3.2.4L34 30.6 27 24 8.2 42.9Z" /><path fill="#FBBC04" d="m34 17.4-22.6-13c-1.1-.6-2.4-.4-3.2.4L27 24l7-6.6Z" /><path fill="#EA4335" d="m34 17.4 6.9 4c1.9 1.1 1.9 4.1 0 5.2l-6.9 4L27 24l7-6.6Z" /></svg>;
  }

  return <span aria-hidden="true" className="grid h-[66px] w-[66px] grid-cols-2 grid-rows-2 place-items-center gap-1 [&>svg]:h-7 [&>svg]:w-7">
    <svg viewBox="0 0 32 32" className="h-6 w-6"><circle cx="16" cy="16" r="14" fill="#fbbc04"/><path fill="#ea4335" d="M2.7 10.2A14 14 0 0 1 27.8 8H16a8 8 0 0 0-6.9 4L2.7 10.2Z"/><path fill="#34a853" d="M27.8 8a14 14 0 0 1-12 22l5.8-10.1a8 8 0 0 0-1-9.4L27.8 8Z"/><circle cx="16" cy="16" r="6.2" fill="#4285f4" stroke="white" strokeWidth="1.5"/></svg>
    <svg viewBox="0 0 32 32" className="h-6 w-6"><path fill="#0aa0f6" d="M16 3a13 13 0 0 0-13 13c0 3.2 1.1 6 3.1 8.2 1.2-4.5 5.3-7.8 10.2-7.8h3.5c2.1 0 3.8-1.7 3.8-3.8A9.6 9.6 0 0 0 16 3Z"/><path fill="#35c59a" d="M29 16c0-2.1-.5-4.1-1.4-5.8-.4 3.4-3.3 6-6.8 6h-4.5c-4.1 0-7.5 3.3-7.5 7.5 0 2.1 1.2 4 3 5A13 13 0 0 0 29 16Z"/><path fill="#0877d1" d="M3 16c0 3.2 1.1 6 3.1 8.2 1.2-4.5 5.3-7.8 10.2-7.8h3.5c1.2 0 2.2-.5 2.9-1.4-4 .7-7.1-2.2-7.1-5.7 0-2.1 1.1-4 2.8-5.1A13 13 0 0 0 3 16Z"/></svg>
    <svg viewBox="0 0 32 32" className="h-6 w-6"><circle cx="16" cy="16" r="14" fill="#673ab7"/><path fill="#ff7139" d="M10 26c-5-2-6-8-3-12 1-2 3-3 3-6 4 2 5 5 4 8 2-2 3-4 3-7 6 4 8 11 4 16-3 4-8 4-11 1Z"/><path fill="#f74288" d="M12 25c-2-2-1-5 1-7l2 3 4-5c2 4 1 8-2 10-2 1-4 1-5-1Z"/></svg>
    <svg viewBox="0 0 32 32" className="h-6 w-6"><circle cx="16" cy="16" r="14" fill="#0b9df1" stroke="#d4e4f1" strokeWidth="1"/><circle cx="16" cy="16" r="11.4" fill="none" stroke="#eaf8ff" strokeWidth="1.4" strokeDasharray="0.6 2.4"/><path d="M24 8 14.6 14.6l2.8 2.8L24 8Z" fill="#ed2939"/><path d="m8 24 6.6-9.4 2.8 2.8L8 24Z" fill="#ffffff"/><circle cx="16" cy="16" r="1" fill="#537693"/></svg>
  </span>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function DownloadIcon({ className = "h-9 w-9" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 5v21m-8-8 8 8 8-8M6 29v4a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-4" /></svg>;
}

export default function PlatformDownloadModal({ onClose, adminUrl, managerPlayStoreUrl, playerWebUrl, playerPlayStoreUrl }: Props) {
  const [audience, setAudience] = useState<"manager" | "player">("manager");
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const cards = [
    { id: "apple" as const, title: "Apple", available: false },
    { id: "android" as const, title: "Android", available: true },
    { id: "browser" as const, title: "Browser", available: true },
  ];

  return (
    <div className="fixed inset-0 isolate z-[999] flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-5 backdrop-blur-[2px]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="platform-download-title">
      <div className="relative max-h-[90dvh] w-full max-w-[520px] overflow-y-auto rounded-3xl border border-[#D9D8DC] bg-[#E6E5EA] p-6 text-center text-[#1f211f] shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Închide" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#d5dbe5] bg-white text-[#1f211f] shadow-sm transition hover:bg-slate-50 sm:right-5 sm:top-5"><CloseIcon /></button>
        <div className="mx-auto max-w-[680px] px-4 pt-1">
          <h2 id="platform-download-title" className="mt-4 text-[26px] font-medium text-[#1f211f]">Sportme pe toate platformele</h2>
          <p className="mx-auto mt-1 max-w-[580px] text-[15px] leading-6 text-slate-600">Alege cum vrei să folosești SportMe, pe telefon sau pe calculator.</p>
        </div>

        <div role="tablist" aria-label="Alege experiența SportMe" className="relative mt-6 inline-flex rounded-full bg-white p-1 shadow-sm">
          <span aria-hidden="true" className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#111111] transition-transform duration-300 ease-in-out motion-reduce:transition-none ${audience === "player" ? "translate-x-full" : "translate-x-0"}`} />
          <button type="button" role="tab" id="platform-manager-tab" aria-selected={audience === "manager"} aria-controls="platform-options" onClick={() => setAudience("manager")} className={`relative z-10 w-28 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${audience === "manager" ? "text-white" : "text-[#1f211f] hover:bg-[#f4f4f5]"}`}>Manager</button>
          <button type="button" role="tab" id="platform-player-tab" aria-selected={audience === "player"} aria-controls="platform-options" onClick={() => setAudience("player")} className={`relative z-10 w-28 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${audience === "player" ? "text-white" : "text-[#1f211f] hover:bg-[#f4f4f5]"}`}>Jucător</button>
        </div>

        <div id="platform-options" role="tabpanel" aria-labelledby={audience === "manager" ? "platform-manager-tab" : "platform-player-tab"} className="mx-auto mt-5 grid max-w-[430px] grid-cols-3 gap-2 sm:gap-3">
          {cards.map((card) => {
            const href = card.id === "android" ? audience === "manager" ? managerPlayStoreUrl : playerPlayStoreUrl : audience === "manager" ? adminUrl : playerWebUrl;
            const actionLabel = card.id === "android" ? `Deschide Google Play pentru SportMe ${audience === "manager" ? "Manager" : "Jucător"}` : `Deschide SportMe ${audience === "manager" ? "Manager" : "Jucător"} în browser`;
            return <section key={card.id} className="flex flex-col items-center py-3 text-center sm:py-4">
              {card.available ? <a href={href} target="_blank" rel="noreferrer" aria-label={actionLabel} className="group relative flex h-20 w-20 items-center justify-center rounded-[22px] bg-white shadow-sm transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b73ff] sm:h-24 sm:w-24">
                <span className="transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0"><PlatformIcon platform={card.id} /></span>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[22px] bg-white text-[#4b73ff] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><DownloadIcon /></span>
                <span className="pointer-events-none absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#4b73ff] shadow-sm sm:hidden"><DownloadIcon className="h-4 w-4" /></span>
              </a> : <span className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-white text-[#252a34] shadow-sm sm:h-24 sm:w-24"><PlatformIcon platform={card.id} /></span>}
              <h3 className="mt-3 text-base font-semibold text-[#1f211f]">{card.title}</h3>
              {card.available ? <span className="mt-2 rounded-full bg-[#dff4e9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#16814d]">LIVE</span> : <span className="mt-2 rounded-full bg-[#eef2f6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#68758a]">În curând</span>}
            </section>;
          })}
        </div>
      </div>
    </div>
  );
}
