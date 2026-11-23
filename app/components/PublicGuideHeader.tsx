"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useI18n } from "../app/i18n";
import { LanguageSelector } from "./LanguageSelector";
import { PublicTopControls } from "./PublicTopControls";

const ProductAccessFlow = dynamic(() => import("./ProductAccessFlow"), { ssr: false });
type HeaderChoice = "signUp";
const pricingHref = "/#preturi";

export function PublicGuideHeader() {
  const { text: translate } = useI18n();
  const [headerChoice, setHeaderChoice] = useState<HeaderChoice | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const headerLabels = {
    signUp: translate("Sign up for free", "Înscrie-te gratuit"),
  };
  const closeMenus = () => {
    setShowMenu(false);
    setShowResources(false);
  };
  const openChoice = (choice: HeaderChoice) => {
    closeMenus();
    setHeaderChoice(choice);
  };

  return (<>
        <nav className="quickstart-nav quickstart-home-nav fixed inset-x-0 top-[env(safe-area-inset-top)] z-50 w-full rounded-none border py-2" aria-label={translate("Main navigation", "Navigare principală")}>
          <div className="relative mx-auto flex w-full max-w-[1040px] items-center gap-1 px-5 sm:gap-2 sm:px-6">
            <a href="/" className="sportme-sidebar-brand flex shrink-0 items-center gap-1.5 rounded-[10px] px-1.5 py-1.5 sm:gap-2 sm:px-3" aria-label="SportMe">
              <img src="/logo-512.png" alt="" className="h-6 w-6 rounded-[6px] sm:h-7 sm:w-7 sm:rounded-[7px]" />
              <span className="sportme-sidebar-wordmark"><span>sport</span><span className="sportme-sidebar-wordmark-me">me</span></span>
            </a>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <a href={pricingHref} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{translate("Manager pricing", "Prețuri Manageri")}</a>
              <div className="relative">
                <button type="button" aria-expanded={showResources} onClick={() => setShowResources((value) => !value)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{translate("Resources", "Resurse")} <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 shrink-0 transition-transform ${showResources ? "rotate-180" : ""}`}><path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                {showResources ? <div className="modern-menu absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-[18px] border p-2 backdrop-blur-xl"><a href="/manager/quick-start" onClick={closeMenus} className="block rounded-xl px-4 py-3 text-sm transition">{translate("For sports venues", "Pentru baze sportive")}</a><a href="/player/quick-start" onClick={closeMenus} className="block rounded-xl px-4 py-3 text-sm transition">{translate("For players", "Pentru jucători")}</a></div> : null}
              </div>
            </div>
            <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:ml-0 lg:flex">
              <button type="button" onClick={() => openChoice("signUp")} className="modern-signup inline-flex h-9 items-center justify-center rounded-full border border-[#b8c0c9] bg-white/20 px-2.5 text-[11px] font-normal leading-5 text-[#182032] transition hover:bg-white/70 sm:h-10 sm:px-4 sm:text-base sm:leading-6">{headerLabels.signUp}</button>
            </div>
            <button type="button" onClick={() => setShowMenu((value) => !value)} aria-label={translate("Open menu", "Deschide meniul")} aria-expanded={showMenu} className="modern-mobile-menu ml-auto flex h-9 w-8 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden">
              <span className="flex w-4 flex-col gap-1"><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /></span>
            </button>
            {showMenu ? (
              <div className="modern-menu absolute right-5 top-[calc(100%+12px)] z-30 w-[min(360px,calc(100vw-40px))] overflow-visible rounded-[22px] border p-2 backdrop-blur-xl sm:right-6 lg:hidden">
                <a href={pricingHref} onClick={closeMenus} className="block rounded-2xl px-4 py-3 text-base font-medium transition">{translate("Manager pricing", "Prețuri Manageri")}</a>
                <div className="my-1 border-t border-[#d9dee7]" />
                <button type="button" aria-expanded={showResources} onClick={() => setShowResources((value) => !value)} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{translate("Resources", "Resurse")} <span aria-hidden="true">{showResources ? "−" : "+"}</span></button>
                {showResources ? <div className="mb-1 ml-3 border-l border-[#d9dee7] pl-2"><a href="/manager/quick-start" onClick={closeMenus} className="block rounded-2xl px-4 py-2.5 text-sm transition">{translate("For sports venues", "Pentru baze sportive")}</a><a href="/player/quick-start" onClick={closeMenus} className="block rounded-2xl px-4 py-2.5 text-sm transition">{translate("For players", "Pentru jucători")}</a></div> : null}
                <button type="button" onClick={() => openChoice("signUp")} className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{headerLabels.signUp}</button>
                <div className="my-1 border-t border-[#d9dee7]" />
                <div className="flex items-center justify-between gap-3 px-4 py-2"><span className="text-sm font-medium text-[#526078]">{translate("Switch language", "Schimbă limba")}</span><LanguageSelector /></div>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="quickstart-language fixed right-5 top-[calc(env(safe-area-inset-top)+18px)] z-[60] hidden lg:block">
          <PublicTopControls hideLanguage={false} />
        </div>

      {headerChoice ? (
        <ProductAccessFlow
          title={headerLabels[headerChoice]}
          onClose={() => setHeaderChoice(null)}
        />
      ) : null}
  </>);
}
