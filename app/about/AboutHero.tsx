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

export function AboutHero({ availableShowcaseImages }: { availableShowcaseImages: string[] }) {
  const { t, language, text } = useI18n();
  const [headerScrollProgress, setHeaderScrollProgress] = useState(0);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const [showManagerAccessModal, setShowManagerAccessModal] = useState(false);
  const [showPlayerAccessModal, setShowPlayerAccessModal] = useState(false);
  const [showProductChoiceModal, setShowProductChoiceModal] = useState(false);
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

  const renderMenu = () => (
    <div className="modern-menu absolute right-0 top-[calc(100%+12px)] z-30 w-64 overflow-hidden rounded-[22px] border p-2 backdrop-blur-xl">
      <a href="#sectiunea-2" onClick={(event) => scrollToAudienceSection(event, "sectiunea-2")} className="block rounded-2xl px-4 py-3 text-sm font-semibold transition">
        {text("Venue software / Players", "Software baze sportive / Jucători")}
      </a>
      <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="block rounded-2xl px-4 py-3 text-sm font-semibold transition">
        {text("Pricing", "Prețuri")}
      </a>
    </div>
  );

  return (
    <section className="sportme-modern-home app-showcase-hero relative overflow-hidden">
      <div className="sportme-language-control absolute right-5 top-[calc(env(safe-area-inset-top)+90px)] z-20 flex flex-col items-end gap-3 sm:right-8 lg:right-12 lg:top-[calc(env(safe-area-inset-top)+18px)]">
        <LanguageSelector />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 pt-[calc(env(safe-area-inset-top)+18px)] sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative flex w-full min-w-0 items-center justify-between gap-3">
          <nav className={`quickstart-nav modern-desktop-nav ${headerScrollProgress > 0 ? "is-scrolled" : ""} fixed left-1/2 top-[calc(env(safe-area-inset-top)+20px)] z-50 flex w-[min(1180px,calc(100vw-24px))] -translate-x-1/2 items-center gap-2 rounded-[18px] border px-4 py-2 sm:w-[min(1180px,calc(100vw-32px))] sm:px-5`} aria-label={text("Main navigation", "Navigare principală")}>
            <a href="/" className="sportme-sidebar-brand flex shrink-0 items-center gap-1.5 rounded-[10px] px-2 py-1.5 sm:px-3" aria-label="SportMe">
              <img src="/logo-512.png" alt="" className="h-[22px] w-[22px] rounded-[6px]" />
              <span className="sportme-sidebar-wordmark"><span>sport</span><span className="sportme-sidebar-wordmark-me">me</span></span>
            </a>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <a href="#sectiunea-2" onClick={(event) => scrollToAudienceSection(event, "sectiunea-2")} className="rounded-full px-2.5 py-1.5 text-[13px] text-[#182032] transition hover:bg-[#e8ecf3]">{text("Venue software / Players", "Software baze sportive / Jucători")}</a>
              <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="rounded-full px-2.5 py-1.5 text-[13px] text-[#182032] transition hover:bg-[#e8ecf3]">{text("Pricing", "Prețuri")}</a>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0">
              <button type="button" onClick={() => setShowProductChoiceModal(true)} className="modern-primary inline-flex h-8 items-center rounded-full px-3.5 py-0 text-[13px] font-normal leading-[19.5px] text-white shadow-[0_10px_22px_rgba(13,100,216,0.22)] transition hover:brightness-105">{text("Start for free", "Creaza cont gratuit")}</button>
            </div>
            <button type="button" onClick={toggleHeroMenu} aria-label={t("about.nav.openMenu")} aria-expanded={showHeroMenu} className="modern-mobile-menu ml-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden">
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
    </section>
  );
}
