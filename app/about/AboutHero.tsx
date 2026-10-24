"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { useI18n } from "../app/i18n";
import { AppShowcase } from "../components/home/AppShowcase";
import { trackEvent } from "../utils/analytics";
import { LanguageSelector } from "../components/LanguageSelector";

const ManagerAccessModal = dynamic(() => import("../components/ManagerAccessModal"), { ssr: false });
const ProductChoiceModal = dynamic(() => import("../components/ProductChoiceModal"), { ssr: false });
type ProductChoiceEntry = "download" | "signIn" | "signUp" | "startNow";

export function AboutHero({ availableShowcaseImages }: { availableShowcaseImages: string[] }) {
  const { t, language, text } = useI18n();
  const [headerScrollProgress, setHeaderScrollProgress] = useState(0);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const [openNavPanel, setOpenNavPanel] = useState<"resources" | null>(null);
  const [showManagerAccessModal, setShowManagerAccessModal] = useState(false);
  const [productChoiceEntry, setProductChoiceEntry] = useState<ProductChoiceEntry | null>(null);
  const choiceLabels = {
    download: text("Download", "Descarcă"),
    signIn: text("Sign in", "Autentificare"),
    signUp: text("Sign up for free", "Înscrie-te gratuit"),
    startNow: text("Start now", "Începe acum"),
  };
  const adminUrl = "https://admin.sportme.ro/auth";
  const managerPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.sportme.dashboard";
  const playerWebUrl = "https://app.sportme.ro/app";
  const playerPlayStoreUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";

  const toggleHeroMenu = () => {
    setShowHeroMenu((value) => {
      if (!value) trackEvent("open_menu");
      return !value;
    });
  };

  const scrollToAudienceSection = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    window.dispatchEvent(new Event("sportme:load-deferred-sections"));
    window.history.pushState(null, "", `#${targetId}`);
    setShowHeroMenu(false);

    let attempts = 0;
    const scrollWhenReady = () => {
      const target = targetId === "pentru-administratori"
        ? document.querySelector<HTMLElement>(".about-manager-description-shell")
        : document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      attempts += 1;
      if (attempts < 60) window.setTimeout(scrollWhenReady, 100);
    };
    scrollWhenReady();
  };

  useEffect(() => {
    const updateCompactHeader = () => setHeaderScrollProgress(Math.min(window.scrollY / 96, 1));
    updateCompactHeader();
    window.addEventListener("scroll", updateCompactHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateCompactHeader);
  }, []);

  useEffect(() => {
    const openManagerAccess = () => setShowManagerAccessModal(true);
    const openProductChoice = () => setProductChoiceEntry("signIn");
    window.addEventListener("sportme:open-manager-access", openManagerAccess);
    window.addEventListener("sportme:open-product-choice", openProductChoice);
    return () => {
      window.removeEventListener("sportme:open-manager-access", openManagerAccess);
      window.removeEventListener("sportme:open-product-choice", openProductChoice);
    };
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("openManagerAccess") !== "1") return;

    setShowManagerAccessModal(true);
    url.searchParams.delete("openManagerAccess");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const closeNavPanels = () => {
    setShowHeroMenu(false);
    setOpenNavPanel(null);
  };

  const openChoiceModal = (entry: ProductChoiceEntry) => {
    closeNavPanels();
    setProductChoiceEntry(entry);
  };

  const signInAs = (product: "manager" | "player") => {
    setProductChoiceEntry(null);
    const webUrl = product === "manager" ? adminUrl : playerWebUrl;
    if (/Android/i.test(navigator.userAgent)) {
      const appHostAndPath = product === "manager" ? "login/auth" : "app";
      const appScheme = product === "manager" ? "com.sportme.dashboard" : "ro.sportme.app";
      const playStoreUrl = product === "manager" ? managerPlayStoreUrl : playerPlayStoreUrl;
      window.location.assign(`intent://${appHostAndPath}#Intent;scheme=${appScheme};package=${appScheme};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`);
      return;
    }
    window.location.assign(webUrl);
  };

  const renderMenu = () => (
    <div className="modern-menu absolute right-5 top-[calc(100%+12px)] z-30 w-[min(360px,calc(100vw-40px))] overflow-visible rounded-[22px] border p-2 backdrop-blur-xl sm:right-6">
      <button type="button" onClick={() => openChoiceModal("download")} className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition">{choiceLabels.download}</button>
      <a href="#preturi" onClick={(event) => { scrollToAudienceSection(event, "preturi"); closeNavPanels(); }} className="block rounded-2xl px-4 py-3 text-base font-medium transition">{text("Pricing", "Prețuri")}</a>
      <div className="my-1 border-t border-[#d9dee7]" />
      <button type="button" aria-expanded={openNavPanel === "resources"} onClick={() => setOpenNavPanel(openNavPanel === "resources" ? null : "resources")} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{text("Resources", "Resurse")} <span aria-hidden="true">{openNavPanel === "resources" ? "−" : "+"}</span></button>
      {openNavPanel === "resources" ? (
        <div className="mb-1 ml-3 border-l border-[#d9dee7] pl-2">
          <a href="https://www.sportme.ro/manager/quick-start" onClick={closeNavPanels} className="block rounded-2xl px-4 py-2.5 text-sm transition">{text("For sports venues", "Pentru baze sportive")}</a>
          <a href="#pentru-jucatori" onClick={(event) => { scrollToAudienceSection(event, "pentru-jucatori"); closeNavPanels(); }} className="block rounded-2xl px-4 py-2.5 text-sm transition">{text("For players", "Pentru jucători")}</a>
        </div>
      ) : null}
      <button type="button" onClick={() => openChoiceModal("signIn")} className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{choiceLabels.signIn}</button>
      <button type="button" onClick={() => openChoiceModal("signUp")} className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{choiceLabels.signUp}</button>
      <div className="my-1 border-t border-[#d9dee7]" />
      <div className="flex items-center justify-between gap-3 px-4 py-2">
        <span className="text-sm font-medium text-[#526078]">{t("about.languageToggleLabel")}</span>
        <LanguageSelector />
      </div>
    </div>
  );

  return (
    <section className="sportme-modern-home app-showcase-hero relative overflow-hidden">
      <div className="sportme-language-control absolute right-5 top-[calc(env(safe-area-inset-top)+90px)] z-20 hidden flex-col items-end gap-3 sm:right-8 lg:right-12 lg:top-[calc(env(safe-area-inset-top)+18px)] lg:flex">
        <LanguageSelector />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 pt-[calc(env(safe-area-inset-top)+18px)] sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative flex w-full min-w-0 items-center justify-between gap-3">
          <nav className={`quickstart-nav modern-desktop-nav ${headerScrollProgress > 0 ? "is-scrolled" : ""} fixed inset-x-0 top-[env(safe-area-inset-top)] z-50 w-full rounded-none border py-2`} aria-label={text("Main navigation", "Navigare principală")}>
            <div className="relative mx-auto flex w-full max-w-[1040px] items-center gap-1 px-5 sm:gap-2 sm:px-6">
            <Link href="/" className="sportme-sidebar-brand flex shrink-0 items-center gap-1.5 rounded-[10px] px-1.5 py-1.5 sm:gap-2 sm:px-3" aria-label="SportMe">
              <img src="/logo-512.png" alt="" className="h-6 w-6 rounded-[6px] sm:h-7 sm:w-7 sm:rounded-[7px]" />
              <span className="sportme-sidebar-wordmark"><span>sport</span><span className="sportme-sidebar-wordmark-me">me</span></span>
            </Link>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <button type="button" onClick={() => openChoiceModal("download")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{choiceLabels.download}</button>
              <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{text("Pricing", "Prețuri")}</a>
              <div className="relative">
                <button type="button" aria-expanded={openNavPanel === "resources"} onClick={() => setOpenNavPanel(openNavPanel === "resources" ? null : "resources")} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{text("Resources", "Resurse")} <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 shrink-0 transition-transform ${openNavPanel === "resources" ? "rotate-180" : ""}`}><path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                {openNavPanel === "resources" ? <div className="modern-menu absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-[18px] border p-2 backdrop-blur-xl"><a href="https://www.sportme.ro/manager/quick-start" onClick={closeNavPanels} className="block rounded-xl px-4 py-3 text-sm transition">{text("For sports venues", "Pentru baze sportive")}</a><a href="#pentru-jucatori" onClick={(event) => { scrollToAudienceSection(event, "pentru-jucatori"); closeNavPanels(); }} className="block rounded-xl px-4 py-3 text-sm transition">{text("For players", "Pentru jucători")}</a></div> : null}
              </div>
              <div className="relative">
                <button type="button" onClick={() => openChoiceModal("signIn")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{choiceLabels.signIn}</button>
              </div>
            </div>
            <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:ml-0 lg:flex">
              <button type="button" onClick={() => openChoiceModal("signUp")} className="modern-signup inline-flex h-9 items-center justify-center rounded-full border border-[#b8c0c9] bg-white/20 px-2.5 text-[11px] font-normal leading-5 text-[#182032] transition hover:bg-white/70 sm:h-10 sm:px-4 sm:text-base sm:leading-6">{choiceLabels.signUp}</button>
            </div>
            <button type="button" onClick={toggleHeroMenu} aria-label={t("about.nav.openMenu")} aria-expanded={showHeroMenu} className="modern-mobile-menu ml-auto flex h-9 w-8 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden">
              <span className="flex w-4 flex-col gap-1"><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /></span>
            </button>
            {showHeroMenu ? renderMenu() : null}
            </div>
          </nav>
        </div>

        <AppShowcase
          language={language}
          availableImages={availableShowcaseImages}
          onOpenStart={() => openChoiceModal("startNow")}
        />
      </div>

      {productChoiceEntry ? (
        <ProductChoiceModal
          mode="signIn"
          title={choiceLabels[productChoiceEntry]}
          onClose={() => setProductChoiceEntry(null)}
          onSelect={signInAs}
        />
      ) : null}
      {showManagerAccessModal ? <ManagerAccessModal onClose={() => setShowManagerAccessModal(false)} adminUrl={adminUrl} managerPlayStoreUrl={managerPlayStoreUrl} /> : null}
    </section>
  );
}
