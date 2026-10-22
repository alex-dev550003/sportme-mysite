"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type MouseEvent } from "react";
import { useI18n } from "../app/i18n";
import { AppShowcase } from "../components/home/AppShowcase";
import { trackEvent } from "../utils/analytics";
import { LanguageSelector } from "../components/LanguageSelector";

const ManagerAccessModal = dynamic(() => import("../components/ManagerAccessModal"), { ssr: false });
const PlayerAccessModal = dynamic(() => import("../components/PlayerAccessModal"), { ssr: false });
const ProductChoiceModal = dynamic(() => import("../components/ProductChoiceModal"), { ssr: false });
const PlatformDownloadModal = dynamic(() => import("../components/PlatformDownloadModal"), { ssr: false });

export function AboutHero({ availableShowcaseImages }: { availableShowcaseImages: string[] }) {
  const { t, language, text } = useI18n();
  const [headerScrollProgress, setHeaderScrollProgress] = useState(0);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const [openNavPanel, setOpenNavPanel] = useState<"resources" | "sign-in" | null>(null);
  const [showManagerAccessModal, setShowManagerAccessModal] = useState(false);
  const [showPlayerAccessModal, setShowPlayerAccessModal] = useState(false);
  const [showProductChoiceModal, setShowProductChoiceModal] = useState(false);
  const [showPlatformDownloadModal, setShowPlatformDownloadModal] = useState(false);
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
    window.addEventListener("sportme:open-manager-access", openManagerAccess);
    return () => window.removeEventListener("sportme:open-manager-access", openManagerAccess);
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

  const openPlatformDownload = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeNavPanels();
    setShowPlatformDownloadModal(true);
  };

  const renderMenu = () => (
    <div className="modern-menu absolute right-0 top-[calc(100%+12px)] z-30 w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-[22px] border p-2 backdrop-blur-xl">
      <a href="#download" onClick={openPlatformDownload} className="block rounded-2xl px-4 py-3 text-base font-medium transition">Descarcă</a>
      <a href="#preturi" onClick={(event) => { scrollToAudienceSection(event, "preturi"); closeNavPanels(); }} className="block rounded-2xl px-4 py-3 text-base font-medium transition">Prețuri</a>
      <div className="my-1 border-t border-[#d9dee7]" />
      <button type="button" aria-expanded={openNavPanel === "resources"} onClick={() => setOpenNavPanel(openNavPanel === "resources" ? null : "resources")} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">Resurse <span aria-hidden="true">{openNavPanel === "resources" ? "−" : "+"}</span></button>
      {openNavPanel === "resources" ? (
        <div className="mb-1 ml-3 border-l border-[#d9dee7] pl-2">
          <a href="#pentru-administratori" onClick={(event) => { scrollToAudienceSection(event, "pentru-administratori"); closeNavPanels(); }} className="block rounded-2xl px-4 py-2.5 text-sm transition">Pentru baze sportive</a>
          <a href="#pentru-jucatori" onClick={(event) => { scrollToAudienceSection(event, "pentru-jucatori"); closeNavPanels(); }} className="block rounded-2xl px-4 py-2.5 text-sm transition">Pentru jucători</a>
        </div>
      ) : null}
      <button type="button" aria-expanded={openNavPanel === "sign-in"} onClick={() => setOpenNavPanel(openNavPanel === "sign-in" ? null : "sign-in")} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">Autentificare <span aria-hidden="true">{openNavPanel === "sign-in" ? "−" : "+"}</span></button>
      {openNavPanel === "sign-in" ? (
        <div className="mb-1 ml-3 border-l border-[#d9dee7] pl-2">
          <a href={adminUrl} className="block rounded-2xl px-4 py-2.5 text-sm transition">SportMe Manager</a>
          <a href={playerWebUrl} className="block rounded-2xl px-4 py-2.5 text-sm transition">SportMe Player</a>
        </div>
      ) : null}
      <button type="button" onClick={() => { closeNavPanels(); setShowProductChoiceModal(true); }} className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">Testează platforma gratuit</button>
    </div>
  );

  return (
    <section className="sportme-modern-home app-showcase-hero relative overflow-hidden">
      <div className="sportme-language-control absolute right-5 top-[calc(env(safe-area-inset-top)+90px)] z-20 flex flex-col items-end gap-3 sm:right-8 lg:right-12 lg:top-[calc(env(safe-area-inset-top)+18px)]">
        <LanguageSelector />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 pt-[calc(env(safe-area-inset-top)+18px)] sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative flex w-full min-w-0 items-center justify-between gap-3">
          <nav className={`quickstart-nav modern-desktop-nav ${headerScrollProgress > 0 ? "is-scrolled" : ""} fixed left-1/2 top-[calc(env(safe-area-inset-top)+20px)] z-50 flex w-[min(1240px,calc(100vw-24px))] -translate-x-1/2 items-center gap-1 rounded-[18px] border px-2 py-2 sm:w-[min(1240px,calc(100vw-32px))] sm:gap-2 sm:px-5`} aria-label="Main navigation">
            <a href="/" className="sportme-sidebar-brand flex shrink-0 items-center gap-1.5 rounded-[10px] px-1.5 py-1.5 sm:gap-2 sm:px-3" aria-label="SportMe">
              <img src="/logo-512.png" alt="" className="h-6 w-6 rounded-[6px] sm:h-7 sm:w-7 sm:rounded-[7px]" />
              <span className="sportme-sidebar-wordmark"><span>sport</span><span className="sportme-sidebar-wordmark-me">me</span></span>
            </a>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <a href="#download" onClick={openPlatformDownload} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">Descarcă</a>
              <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">Prețuri</a>
              <div className="relative">
                <button type="button" aria-expanded={openNavPanel === "resources"} onClick={() => setOpenNavPanel(openNavPanel === "resources" ? null : "resources")} className="flex items-center gap-1 rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">Resurse <span aria-hidden="true" className="text-xs">⌄</span></button>
                {openNavPanel === "resources" ? <div className="modern-menu absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-[18px] border p-2 backdrop-blur-xl"><a href="#pentru-administratori" onClick={(event) => { scrollToAudienceSection(event, "pentru-administratori"); closeNavPanels(); }} className="block rounded-xl px-4 py-3 text-sm transition">Pentru baze sportive</a><a href="#pentru-jucatori" onClick={(event) => { scrollToAudienceSection(event, "pentru-jucatori"); closeNavPanels(); }} className="block rounded-xl px-4 py-3 text-sm transition">Pentru jucători</a></div> : null}
              </div>
              <div className="relative">
                <button type="button" aria-expanded={openNavPanel === "sign-in"} onClick={() => setOpenNavPanel(openNavPanel === "sign-in" ? null : "sign-in")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">Autentificare</button>
                {openNavPanel === "sign-in" ? <div className="modern-menu absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-[18px] border p-2 backdrop-blur-xl"><a href={adminUrl} className="block rounded-xl px-4 py-3 text-sm transition">SportMe Manager</a><a href={playerWebUrl} className="block rounded-xl px-4 py-3 text-sm transition">SportMe Player</a></div> : null}
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0">
              <button type="button" onClick={() => setShowProductChoiceModal(true)} className="modern-signup inline-flex h-9 items-center justify-center rounded-full border border-[#b8c0c9] bg-white/20 px-2.5 text-[11px] font-normal leading-5 text-[#182032] transition hover:bg-white/70 sm:h-10 sm:px-4 sm:text-base sm:leading-6">Testează platforma gratuit</button>
            </div>
            <button type="button" onClick={toggleHeroMenu} aria-label={t("about.nav.openMenu")} aria-expanded={showHeroMenu} className="modern-mobile-menu ml-0 flex h-9 w-8 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden">
              <span className="flex w-4 flex-col gap-1"><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /></span>
            </button>
            {showHeroMenu ? renderMenu() : null}
          </nav>
        </div>

        <AppShowcase
          language={language}
          availableImages={availableShowcaseImages}
          onOpenManager={() => {
            trackEvent("click_sportme_manager_access");
            setShowManagerAccessModal(true);
          }}
          onOpenPlayer={() => setShowPlayerAccessModal(true)}
        />
      </div>

      {showProductChoiceModal ? (
        <ProductChoiceModal
          onClose={() => setShowProductChoiceModal(false)}
          onSelect={(product) => {
            setShowProductChoiceModal(false);
            if (product === "manager") setShowManagerAccessModal(true);
            else setShowPlayerAccessModal(true);
          }}
        />
      ) : null}
      {showManagerAccessModal ? <ManagerAccessModal onClose={() => setShowManagerAccessModal(false)} adminUrl={adminUrl} managerPlayStoreUrl={managerPlayStoreUrl} /> : null}
      {showPlayerAccessModal ? <PlayerAccessModal onClose={() => setShowPlayerAccessModal(false)} playerWebUrl={playerWebUrl} playerPlayStoreUrl={playerPlayStoreUrl} /> : null}
      {showPlatformDownloadModal ? <PlatformDownloadModal onClose={() => setShowPlatformDownloadModal(false)} adminUrl={adminUrl} managerPlayStoreUrl={managerPlayStoreUrl} playerWebUrl={playerWebUrl} playerPlayStoreUrl={playerPlayStoreUrl} /> : null}
    </section>
  );
}
