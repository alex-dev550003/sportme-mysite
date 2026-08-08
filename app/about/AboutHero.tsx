"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "../app/i18n";
import { trackEvent } from "../utils/analytics";

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className="h-10 w-10">
      <path d="M10.5 4.7v6.2M25.5 4.7v6.2M6.8 13.2h22.4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="6.8" y="8.1" width="22.4" height="21.1" rx="3.7" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="m12.1 22.1 4 4 8.4-9.2" fill="none" stroke="#1476ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24.7 26.2a6 6 0 1 0-7.1-5.9" fill="none" stroke="#1476ff" strokeWidth="2.6" strokeLinecap="round" />
      <path d="m26.5 25.7-2.9.4.5-2.9" fill="none" stroke="#1476ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className="h-10 w-10">
      <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M18 9.8v8.7l6 3.7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneArrowIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className="h-10 w-10">
      <path
        d="M11.2 7.5 8.9 9.8c-1.2 1.2-1.4 3.1-.6 4.6 1.5 2.9 3.4 5.5 5.8 7.9 2.4 2.4 5 4.3 7.9 5.8 1.5.8 3.4.6 4.6-.6l2.3-2.3c.8-.8.8-2 0-2.8l-3.6-3.6c-.7-.7-2-.8-2.8-.1l-1.7 1.4c-.6.5-1.5.4-2-.2a24 24 0 0 1-4.2-4.2c-.5-.6-.6-1.5-.2-2l1.4-1.7c.7-.8.6-2-.1-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M23.2 5.8h7v7M22.4 13.6l7.8-7.8" fill="none" stroke="#1476ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.4 28.1 6.2 30.3M11.4 30.4l-2.7.6.6-2.7" fill="none" stroke="#1476ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
      <path
        fill="currentColor"
        d="M7.2 8.2h9.6c1.1 0 2 .9 2 2v6.2c0 .7-.5 1.2-1.2 1.2h-.7v2.2c0 .6-.5 1-1 1s-1-.4-1-1v-2.2H9.1v2.2c0 .6-.5 1-1 1s-1-.4-1-1v-2.2h-.7c-.7 0-1.2-.5-1.2-1.2v-6.2c0-1.1.9-2 2-2Zm-.9-3.8a.6.6 0 0 1 .8.2l1.2 2.1A6.9 6.9 0 0 1 12 5.6c1.3 0 2.6.4 3.7 1.1l1.2-2.1a.6.6 0 1 1 1 .6l-1.2 2A6.4 6.4 0 0 1 19 9H5c.5-.8 1.3-1.4 2.2-1.8L6 5.2a.6.6 0 0 1 .3-.8Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8">
      <path
        fill="currentColor"
        d="M17.7 13.1c0-2.4 2-3.5 2.1-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.2-2.5 1.3-2.6 0 0-2.5-1-2.5-3.4ZM15.4 6.1c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.3-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.6-1.2Z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadArrowIcon() {
  return (
    <svg viewBox="0 0 80 36" aria-hidden className="h-9 w-20 text-white/82">
      <path d="M4 18c20-10 43-8 58 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M58 18.5 63.6 27l-10.2.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppHomePreview({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        animation: "appPreviewFloat 5.8s ease-in-out infinite",
      }}
    >
      <div
        className="absolute left-[-8px] top-[24%] z-20 min-w-[82px] rounded-[8px] border border-white/24 bg-[#15263a]/88 px-2.5 py-1.5 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-md sm:left-[-72px] sm:min-w-[96px] lg:left-[-100px] lg:min-w-[112px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 6.2s ease-in-out infinite" }}
      >
        <span className="block text-[7px] font-semibold uppercase tracking-[0.14em] text-white/42 sm:text-[8px] lg:text-[9px]">Feature</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-white sm:text-[11px] lg:text-[13px]">Location Maps</span>
      </div>
      <div
        className="absolute right-[-8px] top-[48%] z-20 min-w-[88px] rounded-[8px] border border-white/24 bg-[#15263a]/88 px-2.5 py-1.5 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-md sm:right-[-80px] sm:min-w-[104px] lg:right-[-106px] lg:min-w-[118px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 5.7s ease-in-out infinite" }}
      >
        <span className="block text-[7px] font-semibold uppercase tracking-[0.14em] text-white/42 sm:text-[8px] lg:text-[9px]">Reminder</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-white sm:text-[11px] lg:text-[13px]">Your next event</span>
      </div>
      <div
        className="absolute left-[-8px] top-[72%] z-20 min-w-[78px] rounded-[8px] border border-white/24 bg-[#15263a]/88 px-2.5 py-1.5 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-md sm:left-[-70px] sm:min-w-[94px] lg:left-[-96px] lg:min-w-[108px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 6.8s ease-in-out infinite" }}
      >
        <span className="block text-[7px] font-semibold uppercase tracking-[0.14em] text-white/42 sm:text-[8px] lg:text-[9px]">Browse</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-medium text-white sm:text-[11px] lg:text-[13px]">All Locations</span>
      </div>
      <div className="relative mx-auto w-[min(215px,48vw)] overflow-hidden rounded-[34px] border border-white/18 bg-white/10 p-1.5 shadow-[0_34px_90px_rgba(0,0,0,0.48),0_0_42px_rgba(16,109,255,0.22)] backdrop-blur-sm sm:w-[238px] lg:w-[min(172px,11.5vw)] xl:w-[184px] 2xl:w-[196px]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#eef2f8]">
          <Image
            src="/home/sportme-app-home-preview.jpeg"
            alt=""
            width={945}
            height={2048}
            quality={100}
            sizes="(min-width: 1536px) 196px, (min-width: 1280px) 184px, (min-width: 1024px) 172px, 56vw"
            className="h-auto w-full"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/18" />
        </div>
      </div>
    </div>
  );
}

function ManagerTabletPreview({ className = "" }: { className?: string }) {
  const slides = [
    "/home/sportme-manager-tablet-preview.png",
    "/home/sportme-manager-bookings-preview.png",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const showPrevious = () => setCurrentSlide((value) => (value === 0 ? slides.length - 1 : value - 1));
  const showNext = () => setCurrentSlide((value) => (value + 1) % slides.length);

  return (
    <div
      className={`select-none ${className}`}
      style={{ animation: "appPreviewFloat 6.4s ease-in-out infinite" }}
    >
      <div
        className="pointer-events-none absolute left-[-86px] top-[24%] z-20 min-w-[122px] rounded-[8px] border border-white/24 bg-[#15263a]/88 px-3 py-2 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-md"
        style={{ animation: "appPreviewFloat 6s ease-in-out infinite" }}
      >
        <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/42">Dashboard</span>
        <span className="mt-0.5 block whitespace-nowrap text-[13px] font-medium text-white">Bookings</span>
      </div>
      <div
        className="pointer-events-none absolute left-[-86px] top-[66%] z-20 min-w-[122px] rounded-[8px] border border-white/24 bg-[#15263a]/88 px-3 py-2 text-left shadow-[0_18px_42px_rgba(0,0,0,0.32)] backdrop-blur-md"
        style={{ animation: "appPreviewFloat 6.7s ease-in-out infinite" }}
      >
        <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-white/42">Bookings</span>
        <span className="mt-0.5 block whitespace-nowrap text-[13px] font-medium text-white">Statistics</span>
      </div>
      <div className="relative w-full overflow-hidden rounded-[28px] border border-white/16 bg-[#07111f] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.5),0_0_44px_rgba(16,109,255,0.18)]">
        <div className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-full bg-white/16" />
        <div className="overflow-hidden rounded-[20px] bg-[#e8eef6]">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <Image
                key={slide}
                src={slide}
                alt=""
                width={1618}
                height={996}
                quality={100}
                sizes="(min-width: 1536px) 500px, (min-width: 1280px) 450px, 410px"
                className="h-auto w-full shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-2 rounded-[20px] ring-1 ring-inset ring-white/12" />
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous manager screenshot"
          className="absolute left-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/22 bg-[#0b1728]/78 text-white shadow-[0_12px_28px_rgba(0,0,0,0.34)] backdrop-blur-md transition hover:bg-[#132843]"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
            <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next manager screenshot"
          className="absolute right-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/22 bg-[#0b1728]/78 text-white shadow-[0_12px_28px_rgba(0,0,0,0.34)] backdrop-blur-md transition hover:bg-[#132843]"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
            <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

const menuItems = [
  { href: "/", ro: "Acasă", en: "Home" },
  { href: "/terenuri-sportive", ro: "Terenuri sportive", en: "Sports courts" },
  { href: "/manageri", ro: "SportMe Manager", en: "SportMe Manager" },
  { href: "/software-management-baze-sportive", ro: "Software baze sportive", en: "Sports venue software" },
  { href: "/intrebari-frecvente", ro: "Întrebări frecvente", en: "FAQ" },
  { href: "/privacy-policy", ro: "Politica de confidențialitate", en: "Privacy policy" },
  { href: "/terms", ro: "Termeni și condiții", en: "Terms" },
  { href: "/cookies", ro: "Politica de cookies", en: "Cookies" },
];

export function AboutHero() {
  const { t, language, setLanguage } = useI18n();
  const isEnglish = language === "EN";
  const [isDesktopHero, setIsDesktopHero] = useState(false);
  const [showHeroMenu, setShowHeroMenu] = useState(false);

  const switchLanguage = (nextLanguage: "RO" | "EN") => {
    setLanguage(nextLanguage);
    trackEvent(nextLanguage === "RO" ? "language_switch_ro" : "language_switch_en");
  };

  const toggleHeroMenu = () => {
    setShowHeroMenu((value) => {
      if (!value) {
        trackEvent("open_menu");
      }

      return !value;
    });
  };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const update = () => setIsDesktopHero(query.matches && !mobileUserAgent);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const renderMenu = () => (
    <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-64 overflow-hidden rounded-[22px] border border-white/14 bg-[#111b2b]/88 p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      {menuItems.map((item) => (
        <a key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/10 hover:text-white">
          {isEnglish ? item.en : item.ro}
        </a>
      ))}
    </div>
  );

  return (
    <section className="relative min-h-[850px] overflow-hidden text-white md:min-h-screen">
      {isDesktopHero ? (
        <Image src="/home/sportme-home-desktop-wide.avif" alt="" aria-hidden="true" fill quality={76} sizes="100vw" className="absolute inset-0 h-full w-full object-cover object-center" />
      ) : (
        <Image
          src="/home/sportme-home-mobile-lcp.avif"
          alt=""
          aria-hidden="true"
          fill
          priority
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,20,0.96)_0%,rgba(2,8,20,0.83)_40%,rgba(2,8,20,0.28)_72%,rgba(2,8,20,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,20,0.98)_0%,rgba(2,8,20,0.48)_31%,rgba(2,8,20,0.1)_62%,rgba(2,8,20,0.36)_100%)]" />

      <div className="absolute right-5 top-[calc(env(safe-area-inset-top)+18px)] z-20 flex flex-col items-end gap-3 sm:right-8 lg:right-12">
        <div className="inline-flex rounded-full border border-white/18 bg-black/24 p-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md" aria-label={t("about.languageToggleLabel")}>
          <button type="button" onClick={() => switchLanguage("RO")} aria-pressed={language === "RO"} className={`rounded-full px-3 py-1.5 transition ${language === "RO" ? "bg-white text-[#061224]" : "text-white/76 hover:bg-white/10"}`}>
            RO
          </button>
          <button type="button" onClick={() => switchLanguage("EN")} aria-pressed={language === "EN"} className={`rounded-full px-3 py-1.5 transition ${language === "EN" ? "bg-white text-[#061224]" : "text-white/76 hover:bg-white/10"}`}>
            EN
          </button>
        </div>
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={toggleHeroMenu}
            aria-expanded={showHeroMenu}
            className="inline-flex items-center gap-2 rounded-full border border-[#176fff]/50 bg-white/[0.06] px-4 py-2 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur"
          >
            <span className="flex h-5 w-5 flex-col justify-center gap-1">
              <span className="block h-0.5 w-5 rounded-full bg-white" />
              <span className="block h-0.5 w-3.5 rounded-full bg-white" />
              <span className="block h-0.5 w-5 rounded-full bg-white" />
            </span>
            <span>{isEnglish ? "Menu" : "Meniu"}</span>
          </button>
          {showHeroMenu ? renderMenu() : null}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[850px] w-full max-w-[1540px] flex-col px-5 pb-9 pt-[calc(env(safe-area-inset-top)+22px)] sm:px-8 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
        <div className="flex w-full min-w-0 items-center justify-between gap-3 pr-[104px] sm:pr-[120px]">
          <div className="flex items-end gap-4">
            <img src="/logo-512.png" alt="" className="h-12 w-12 rounded-[12px] shadow-[0_12px_30px_rgba(0,93,255,0.35)] sm:h-14 sm:w-14" />
            <img src="/home/sportme-wordmark.png" alt="SportMe" className="h-[33px] w-auto object-contain sm:h-[47px]" />
          </div>
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={toggleHeroMenu}
              aria-expanded={showHeroMenu}
              className="inline-flex items-center gap-3 rounded-full border border-[#176fff]/55 bg-white/[0.06] px-5 py-3 text-lg font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur transition hover:bg-white/[0.1]"
            >
              <span className="flex h-6 w-6 flex-col justify-center gap-1.5">
                <span className="block h-0.5 w-6 rounded-full bg-white" />
                <span className="block h-0.5 w-4 rounded-full bg-white" />
                <span className="block h-0.5 w-6 rounded-full bg-white" />
              </span>
              <span>{isEnglish ? "Menu" : "Meniu"}</span>
            </button>
            {showHeroMenu ? renderMenu() : null}
          </div>
        </div>

        <div className="flex flex-1 items-start pb-0 pt-16 md:items-center md:pb-0 md:pt-0">
          <div className="w-[min(390px,calc(100vw-40px))] min-w-0 sm:w-[min(780px,calc(100vw-64px))] lg:w-[780px]">
            <div
              className="pointer-events-none absolute left-1/2 top-[150px] hidden h-[650px] w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.42)_0_3px,transparent_3px_10px)] lg:block"
              aria-hidden="true"
            />
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-white/60 sm:text-base lg:text-sm">
              {isEnglish ? "Are you a player?" : "Esti jucator?"}
            </p>
            <h1 className="max-w-full text-[36px] font-bold leading-[1.04] tracking-normal sm:text-[54px] sm:leading-[0.98] lg:max-w-[470px] lg:text-[58px]">
              {isEnglish ? "Book fast" : "Rezerva rapid"}
              <br />
              {isEnglish ? "with " : "prin "}
              <span className="text-[#106dff]">SportMe</span>
            </h1>
            <p className="mt-4 max-w-full text-[15px] leading-6 text-white/84 sm:mt-5 sm:max-w-[640px] sm:text-xl sm:leading-8 lg:max-w-[455px] lg:text-[18px] lg:leading-7">
              {isEnglish ? "Check availability and book sports courts in a few seconds." : "Verifica disponibilitatea si rezerva terenuri sportive in cateva secunde."}
            </p>

            <AppHomePreview className="mt-7 flex justify-center lg:absolute lg:left-[545px] lg:top-[184px] lg:z-10 lg:mt-0 xl:left-[545px] xl:top-[176px] 2xl:left-[545px]" />

            <div className="hidden lg:absolute lg:left-[calc(50%+58px)] lg:top-[158px] lg:block lg:h-[430px] lg:w-[min(680px,43vw)] xl:top-[150px]">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-white/60">
                {isEnglish ? "Are you an admin?" : "Esti administrator?"}
              </p>
              <h2 className="max-w-[520px] text-[43px] font-bold leading-[1.04] tracking-normal xl:max-w-[580px] xl:text-[48px] 2xl:text-[52px]">
                {isEnglish ? "Manage bookings" : "Gestioneaza rezervarile"}
                <br />
                {isEnglish ? "with " : "prin "}
                <span className="text-[#106dff]">SportMe</span>
              </h2>
              <ManagerTabletPreview className="absolute right-0 top-[178px] w-[400px] xl:top-[184px] xl:w-[440px] 2xl:w-[490px]" />
            </div>

            <div className="mt-8 grid w-full max-w-[670px] grid-cols-3 divide-x divide-white/20 text-center sm:mt-10 lg:mt-7 lg:max-w-[390px]">
              {[
                { id: "fast", icon: <CalendarCheckIcon />, ro: ["Rezervari", "rapide"], en: ["Fast", "bookings"] },
                { id: "live", icon: <ClockIcon />, ro: ["Disponibilitate", "in timp real"], en: ["Real-time", "availability"] },
                { id: "calls", icon: <PhoneArrowIcon />, ro: ["Fara apeluri,", "fara stres"], en: ["No calls,", "no stress"] },
              ].map((benefit) => (
                <div key={benefit.id} className="min-w-0 px-1.5 sm:px-5">
                  <div className="mx-auto mb-2.5 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[#0d67ff] bg-black/24 text-white shadow-[0_0_22px_rgba(0,93,255,0.34),inset_0_0_20px_rgba(255,255,255,0.04)] sm:mb-3 sm:h-[74px] sm:w-[74px] lg:h-[58px] lg:w-[58px] lg:[&_svg]:h-8 lg:[&_svg]:w-8">
                    {benefit.icon}
                  </div>
                  <p className="text-[13px] font-normal leading-5 sm:text-xl sm:leading-6 lg:text-[16px] lg:leading-5">
                    {(isEnglish ? benefit.en : benefit.ro).map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 hidden max-w-[670px] items-center justify-center gap-2 pr-24 text-xl font-medium text-white/90 sm:flex lg:max-w-[470px] lg:pr-0">
              <span>{isEnglish ? "Download the app" : "Descarca aplicatia"}</span>
              <DownloadArrowIcon />
            </div>

            <div className="mt-6 grid w-full gap-4 lg:w-[1420px] lg:grid-cols-[670px_700px] lg:items-start lg:gap-8">
              <div className="w-full max-w-[670px] space-y-3 sm:space-y-4">
                <a
                  href="https://play.google.com/store/apps/details?id=ro.sportme.app"
                  onClick={() => trackEvent("click_google_play")}
                  className="flex h-16 items-center justify-center gap-3 rounded-full bg-[#0564ff] px-4 text-lg font-normal shadow-[0_20px_48px_rgba(0,93,255,0.42)] hover:bg-[#1472ff] sm:h-[78px] sm:gap-4 sm:text-2xl"
                >
                  <img src="/home/google-play-icon.png" alt="" className="h-7 w-7 object-contain" />
                  <span>{isEnglish ? "Get it on Google Play Store" : "Descarca din Google Play Store"}</span>
                </a>
                <a
                  href="https://www.sportme.ro/app"
                  onClick={() => trackEvent("click_app_store")}
                  className="flex h-16 items-center justify-center gap-3 rounded-full border border-white/38 bg-black/20 px-4 text-lg font-normal hover:border-white/58 hover:bg-white/8 sm:h-[78px] sm:gap-4 sm:text-2xl"
                >
                  <AppleIcon />
                  <span>{isEnglish ? "Download on the App Store (soon)" : "Descarca din App Store (curand)"}</span>
                </a>
              </div>

              <div className="my-8 h-px w-full bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.42)_0_3px,transparent_3px_10px)] lg:hidden" aria-hidden="true" />

              <div className="lg:hidden">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-white/60">
                  {isEnglish ? "Are you an admin?" : "Esti administrator?"}
                </p>
                <h2 className="text-[34px] font-bold leading-[1.04] tracking-normal sm:text-[44px]">
                  {isEnglish ? "Manage bookings" : "Gestioneaza rezervarile"}
                  <br />
                  {isEnglish ? "with " : "prin "}
                  <span className="text-[#106dff]">SportMe</span>
                </h2>
                <ManagerTabletPreview className="relative mt-7 ml-auto mr-0 w-[min(520px,calc(100vw-26px))]" />
              </div>

              <a
                href="https://www.sportme.ro/manageri"
                onClick={() => trackEvent("click_sportme_manager")}
                className="flex w-full max-w-[670px] items-center gap-4 rounded-full border border-white/12 bg-white/[0.08] p-4 pl-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur hover:bg-white/[0.11] sm:gap-5 sm:p-5 sm:pl-8 lg:h-[118px] lg:max-w-none lg:translate-x-10 lg:translate-y-[54px] lg:gap-5 lg:px-6 lg:py-3 lg:pl-10"
              >
                <img src="/logo-512admin.png" alt="" className="h-14 w-14 rounded-[10px] sm:h-16 sm:w-16 lg:h-16 lg:w-16" />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-tight sm:text-2xl lg:whitespace-nowrap lg:text-[22px] lg:leading-7">
                    {isEnglish ? "Open " : "Acceseaza "}
                    <span className="block text-[#106dff] text-[0.95em] sm:inline sm:pl-1">SportMe Manager</span>
                  </span>
                  <span className="mt-2 hidden max-w-[430px] text-base leading-6 text-white/72 sm:block lg:text-base lg:leading-6">
                    {isEnglish ? (
                      <>
                        The complete platform for bookings,
                        <br />
                        calendar and activities.
                      </>
                    ) : (
                      <>
                        Platforma completa pentru administrarea rezervarilor,
                        <br />
                        calendarului si activitatilor.
                      </>
                    )}
                  </span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0b62df] sm:h-14 sm:w-14 lg:h-12 lg:w-12">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
