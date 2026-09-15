"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties, type MouseEvent, type PointerEvent } from "react";
import { useI18n } from "../app/i18n";
import { trackEvent } from "../utils/analytics";

const ManagerAccessModal = dynamic(() => import("../components/ManagerAccessModal"), { ssr: false });
const PlayerAccessModal = dynamic(() => import("../components/PlayerAccessModal"), { ssr: false });
const ProductChoiceModal = dynamic(() => import("../components/ProductChoiceModal"), { ssr: false });

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden className="h-10 w-10">
      <path d="M10.5 4.7v6.2M25.5 4.7v6.2M6.8 13.2h22.4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="6.8" y="8.1" width="22.4" height="21.1" rx="3.7" fill="none" stroke="currentColor" strokeWidth="2.4" />
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
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadArrowIcon() {
  return (
    <svg viewBox="0 0 80 36" aria-hidden className="h-9 w-20 text-[#182032]/70">
      <path d="M4 18c20-10 43-8 58 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M58 18.5 63.6 27l-10.2.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppHomePreview({ className = "" }: { className?: string }) {
  const slides = [
    "/about/user-1.jpg",
    "/about/user-2.jpg",
    "/about/user-3.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const showPrevious = () => setCurrentSlide((value) => (value === 0 ? slides.length - 1 : value - 1));
  const showNext = () => setCurrentSlide((value) => (value + 1) % slides.length);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        animation: "appPreviewFloat 5.8s ease-in-out infinite",
      }}
    >
      <div
        className="modern-soft-card pointer-events-none absolute left-[24px] top-[24%] z-20 min-w-[82px] rounded-[8px] border px-2.5 py-1.5 text-left sm:left-[-72px] sm:min-w-[96px] lg:left-[-100px] lg:min-w-[112px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 6.2s ease-in-out infinite" }}
      >
        <span className="modern-muted block text-[7px] font-semibold uppercase tracking-normal sm:text-[8px] lg:text-[9px]">Feature</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold text-[#182032] sm:text-[11px] lg:text-[13px]">Location Maps</span>
      </div>
      <div
        className="modern-soft-card pointer-events-none absolute right-[8px] top-[48%] z-20 min-w-[88px] rounded-[8px] border px-2.5 py-1.5 text-left sm:right-[-80px] sm:min-w-[104px] lg:right-[-106px] lg:min-w-[118px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 5.7s ease-in-out infinite" }}
      >
        <span className="modern-muted block text-[7px] font-semibold uppercase tracking-normal sm:text-[8px] lg:text-[9px]">Reminder</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold text-[#182032] sm:text-[11px] lg:text-[13px]">Your next event</span>
      </div>
      <div
        className="modern-soft-card pointer-events-none absolute left-[24px] top-[72%] z-20 min-w-[78px] rounded-[8px] border px-2.5 py-1.5 text-left sm:left-[-70px] sm:min-w-[94px] lg:left-[-96px] lg:min-w-[108px] lg:px-3 lg:py-2"
        style={{ animation: "appPreviewFloat 6.8s ease-in-out infinite" }}
      >
        <span className="modern-muted block text-[7px] font-semibold uppercase tracking-normal sm:text-[8px] lg:text-[9px]">Browse</span>
        <span className="mt-0.5 block whitespace-nowrap text-[10px] font-semibold text-[#182032] sm:text-[11px] lg:text-[13px]">All Locations</span>
      </div>
      <div className="modern-device-frame relative mx-auto w-[min(215px,48vw)] overflow-hidden rounded-[34px] border p-1.5 sm:w-[238px] lg:w-[min(120px,8vw)] xl:w-[130px] 2xl:w-[140px]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#eef2f8]">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <Image
                key={slide}
                src={slide}
                alt=""
                width={945}
                height={2048}
                quality={100}
                unoptimized
                sizes="(min-width: 1536px) 196px, (min-width: 1280px) 184px, (min-width: 1024px) 172px, 56vw"
                className="h-auto w-full shrink-0"
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/18" />
        </div>
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Previous player screenshot"
          className="sportme-preview-arrow modern-outline-icon absolute left-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border transition sm:h-9 sm:w-9"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 sm:h-5 sm:w-5">
            <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next player screenshot"
          className="sportme-preview-arrow modern-outline-icon absolute right-3 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border transition sm:h-9 sm:w-9"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 sm:h-5 sm:w-5">
            <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
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
        className="modern-soft-card pointer-events-none absolute right-[-40px] top-[28%] z-20 min-w-[122px] rounded-[8px] border px-3 py-2 text-left sm:right-auto sm:left-[-86px]"
        style={{ animation: "appPreviewFloat 6s ease-in-out infinite" }}
      >
        <span className="modern-muted block text-[9px] font-semibold uppercase tracking-normal">Dashboard</span>
        <span className="mt-0.5 block whitespace-nowrap text-[13px] font-semibold text-[#182032]">Bookings</span>
      </div>
      <div
        className="modern-soft-card pointer-events-none absolute right-[-40px] top-[60%] z-20 min-w-[122px] rounded-[8px] border px-3 py-2 text-left sm:right-auto sm:left-[-86px]"
        style={{ animation: "appPreviewFloat 6.7s ease-in-out infinite" }}
      >
        <span className="modern-muted block text-[9px] font-semibold uppercase tracking-normal">Bookings</span>
        <span className="mt-0.5 block whitespace-nowrap text-[13px] font-semibold text-[#182032]">Statistics</span>
      </div>
      <div className="modern-device-frame relative w-full overflow-hidden rounded-[28px] border p-2">
        <div className="absolute left-1/2 top-1 h-1 w-12 -translate-x-1/2 rounded-full bg-white/16" />
        <div className="overflow-hidden rounded-[20px] bg-[#e8eef6]">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide) => (
              <Image
                key={slide}
                src={slide}
                alt=""
                width={1920}
                height={1032}
                quality={100}
                unoptimized
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
          className="sportme-preview-arrow modern-outline-icon absolute left-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border transition"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
            <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Next manager screenshot"
          className="sportme-preview-arrow modern-outline-icon absolute right-4 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border transition"
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
  const [headerScrollProgress, setHeaderScrollProgress] = useState(0);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const [showManagerAccessModal, setShowManagerAccessModal] = useState(false);
  const [showPlayerAccessModal, setShowPlayerAccessModal] = useState(false);
  const [showProductChoiceModal, setShowProductChoiceModal] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [blurredSide, setBlurredSide] = useState<"manager" | "player" | null>(null);
  const adminUrl = "https://admin.sportme.ro/auth";
  const managerPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.sportme.dashboard";
  const playerWebUrl = "https://app.sportme.ro/app";
  const playerPlayStoreUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";

  const updateSplitPosition = (clientX: number, element: HTMLElement) => {
    const bounds = element.getBoundingClientRect();
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setBlurredSide(nextPosition > 50 ? "player" : nextPosition < 50 ? "manager" : null);
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const minPosition = isMobile ? 10 : 22;
    const maxPosition = isMobile ? 90 : 78;
    setSplitPosition(Math.min(maxPosition, Math.max(minPosition, nextPosition)));
  };

  const handleSplitPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSplitPosition(event.clientX, event.currentTarget.parentElement as HTMLElement);
  };

  const handleSplitPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      updateSplitPosition(event.clientX, event.currentTarget.parentElement as HTMLElement);
    }
  };

  const handleSplitPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setBlurredSide(null);
  };

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
      if (attempts < 60) {
        window.setTimeout(scrollWhenReady, 100);
      }
    };

    scrollWhenReady();
  };

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const update = () => setIsDesktopHero(query.matches && !mobileUserAgent);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const updateCompactHeader = () => {
      setHeaderScrollProgress(Math.min(window.scrollY / 96, 1));
    };
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
        {isEnglish ? "Venue software / Players" : "Software baze sportive / Jucători"}
      </a>
      <a href="/manager/quick-start" className="block rounded-2xl px-4 py-3 text-sm font-semibold transition">
        Quickstart
      </a>
      <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="block rounded-2xl px-4 py-3 text-sm font-semibold transition">
        {isEnglish ? "Pricing" : "Prețuri"}
      </a>
    </div>
  );

  return (
    <section className="sportme-modern-home relative min-h-[760px] overflow-hidden md:min-h-screen">
      {isDesktopHero ? (
        <Image src="/home/sportme-home-desktop-wide.avif" alt="" aria-hidden="true" fill quality={76} sizes="100vw" className="modern-hero-media absolute inset-0 h-full w-full object-cover object-center" />
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
          className="modern-hero-media absolute inset-0 h-full w-full object-cover object-[60%_center]"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,241,245,0.98)_0%,rgba(232,236,242,0.9)_48%,rgba(226,231,239,0.64)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_77%_18%,rgba(255,255,255,0.48)_0%,rgba(255,255,255,0)_32%),linear-gradient(0deg,rgba(238,241,245,0.92)_0%,rgba(238,241,245,0.18)_58%,rgba(238,241,245,0.58)_100%)]" />
      <div className="sportme-language-control absolute right-5 top-[calc(env(safe-area-inset-top)+90px)] z-20 flex flex-col items-end gap-3 sm:right-8 lg:right-12 lg:top-[calc(env(safe-area-inset-top)+18px)]">
        <div className="sportme-language-toggle modern-chip inline-flex rounded-full border p-1 text-xs font-semibold backdrop-blur-md" aria-label={t("about.languageToggleLabel")}>
          <button type="button" onClick={() => switchLanguage("RO")} aria-pressed={language === "RO"} className={`rounded-full px-3 py-1.5 transition ${language === "RO" ? "bg-[#182032] text-white" : "text-[#182032]/68 hover:bg-[#e8ecf3]"}`}>
            RO
          </button>
          <button type="button" onClick={() => switchLanguage("EN")} aria-pressed={language === "EN"} className={`rounded-full px-3 py-1.5 transition ${language === "EN" ? "bg-[#182032] text-white" : "text-[#182032]/68 hover:bg-[#e8ecf3]"}`}>
            EN
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[760px] w-full max-w-[1540px] flex-col px-5 pb-8 pt-[calc(env(safe-area-inset-top)+18px)] sm:px-8 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
        <div className="relative flex w-full min-w-0 items-center justify-between gap-3">
          <div className="relative hidden items-center gap-3">
            <img src="/logo-512.png" alt="" className="h-12 w-12 rounded-[12px] shadow-[0_12px_30px_rgba(0,93,255,0.35)] sm:h-14 sm:w-14" />
            <button
              type="button"
              onClick={toggleHeroMenu}
              aria-expanded={showHeroMenu}
              className="modern-chip inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition sm:gap-3 sm:px-5 sm:py-3 sm:text-lg"
            >
              <span className="flex h-5 w-5 flex-col justify-center gap-1 sm:h-6 sm:w-6 sm:gap-1.5">
                <span className="block h-0.5 w-5 rounded-full bg-[#182032] sm:w-6" />
                <span className="block h-0.5 w-3.5 rounded-full bg-[#182032] sm:w-4" />
                <span className="block h-0.5 w-5 rounded-full bg-[#182032] sm:w-6" />
              </span>
              <span>{isEnglish ? "Menu" : "Meniu"}</span>
            </button>
            {showHeroMenu ? renderMenu() : null}
          </div>
          <nav className={`quickstart-nav modern-desktop-nav ${headerScrollProgress > 0 ? "is-scrolled" : ""} fixed left-1/2 top-[calc(env(safe-area-inset-top)+20px)] z-50 flex w-[min(1180px,calc(100vw-24px))] -translate-x-1/2 items-center gap-2 rounded-[18px] border px-4 py-2 sm:w-[min(1180px,calc(100vw-32px))] sm:px-5`} aria-label="Navigare principală">
            <a href="/" className="flex shrink-0 items-center gap-2 rounded-[10px] px-2 py-1.5 text-[17px] font-medium tracking-normal text-[#182032] sm:px-3 sm:text-[18px]">
              <img src="/logo-512.png" alt="" className="h-7 w-7 rounded-[8px] sm:h-8 sm:w-8" />
              <span>SportMe app</span>
            </a>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <a href="#sectiunea-2" onClick={(event) => scrollToAudienceSection(event, "sectiunea-2")} className="rounded-full px-2.5 py-1.5 text-[13px] text-[#182032] transition hover:bg-[#e8ecf3]">{isEnglish ? "Venue software / Players" : "Software baze sportive / Jucători"}</a>
              <a href="/manager/quick-start" className="rounded-full px-2.5 py-1.5 text-[13px] text-[#182032] transition hover:bg-[#e8ecf3]">{isEnglish ? "Quickstart" : "Quickstart"}</a>
              <a href="#preturi" onClick={(event) => scrollToAudienceSection(event, "preturi")} className="rounded-full px-2.5 py-1.5 text-[13px] text-[#182032] transition hover:bg-[#e8ecf3]">{isEnglish ? "Pricing" : "Prețuri"}</a>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-0">
              <button type="button" onClick={() => setShowProductChoiceModal(true)} className="modern-primary inline-flex h-7 items-center rounded-[8px] px-2.5 py-0 text-[13px] font-normal leading-[19.5px] text-white shadow-[0_10px_22px_rgba(13,100,216,0.22)] transition hover:brightness-105">{isEnglish ? "Start for free" : "Începe gratuit"}</button>
            </div>
            <button
              type="button"
              onClick={toggleHeroMenu}
              aria-label={t("about.nav.openMenu")}
              aria-expanded={showHeroMenu}
              className="modern-mobile-menu ml-0 flex h-9 w-9 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden"
            >
              <span className="flex w-4 flex-col gap-1">
                <span className="block h-0.5 w-4 rounded-full" />
                <span className="block h-0.5 w-4 rounded-full" />
                <span className="block h-0.5 w-4 rounded-full" />
              </span>
            </button>
            {showHeroMenu ? renderMenu() : null}
          </nav>
        </div>

        <div className="flex flex-1 items-start pb-0 pt-20 md:items-center md:pb-0 md:pt-0">
          <div
            className="sportme-split-stage relative grid w-full min-w-0 gap-7 lg:grid-cols-1 lg:gap-0"
            style={{
              "--split-position": `${splitPosition}%`,
              "--mobile-manager-reveal": `${Math.min(100, splitPosition * 2)}%`,
              "--mobile-player-offset": `${Math.max(0, (splitPosition - 50) * 2)}%`,
              "--mobile-grid-columns": `${splitPosition}% ${100 - splitPosition}%`,
            } as CSSProperties}
          >
            <div
              className="sportme-split-divider pointer-events-auto absolute -bottom-10 -top-10 z-40 hidden w-11 -translate-x-1/2 cursor-col-resize items-center justify-center lg:flex"
              style={{ left: `${splitPosition}%` }}
              onPointerDown={handleSplitPointerDown}
              onPointerMove={handleSplitPointerMove}
              onPointerUp={handleSplitPointerUp}
              onPointerCancel={handleSplitPointerUp}
              role="separator"
              aria-label="Redimensionează zonele Manager și Jucători"
              aria-valuemin={isDesktopHero ? 22 : 10}
              aria-valuemax={isDesktopHero ? 78 : 90}
              aria-valuenow={Math.round(splitPosition)}
            >
              <span className="sportme-split-line absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
              <span className="sportme-split-controls relative z-10 flex flex-col items-center rounded-full border p-1 shadow-lg" aria-hidden="true">
                <span className="flex items-center">
                  <span className="sportme-split-arrow">
                    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5"><path d="m14 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="sportme-split-arrow">
                    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5"><path d="m10 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </span>
                <span className="sportme-split-hint hidden text-center text-[11px] font-medium leading-[1.05] text-[#182032]/68">Slide</span>
              </span>
            </div>
            <div
              className="pointer-events-none absolute left-1/2 top-[150px] hidden h-[650px] w-px bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.42)_0_3px,transparent_3px_10px)] lg:block"
              aria-hidden="true"
            />

            <div className={`sportme-split-panel sportme-split-manager min-w-0 ${blurredSide === "manager" ? "is-split-blurred" : ""}`}>
              <p className="sportme-hero-kicker modern-kicker mb-4 inline-flex max-w-full whitespace-nowrap rounded-full border px-3 py-2 text-[clamp(8px,2.45vw,13px)] font-medium sm:px-4 sm:text-base lg:text-[15px]">
                {isEnglish ? "Are you a venue or academy admin?" : "esti ADMINISTRATOR DE BAZA SPORTIVA sau ACADEMIE?"}
              </p>
              <h1 className="sportme-audience-title sportme-manager-title max-w-full text-[clamp(30px,8.7vw,36px)] font-medium leading-[1.04] tracking-normal text-[#182032] sm:text-[54px] sm:leading-[0.98] lg:max-w-[680px] lg:text-[48px] xl:text-[48px] 2xl:text-[48px]">
                <span className="sportme-title-subline block whitespace-nowrap">{isEnglish ? "Manage bookings with" : "Gestioneaza rezervarile prin"}</span>
                <span className="block whitespace-nowrap"><span className="modern-accent">SportMe Manager</span></span>
              </h1>
              <p className="sportme-manager-description modern-muted mt-4 max-w-full text-[15px] leading-6 sm:mt-5 sm:max-w-[640px] sm:text-xl sm:leading-8 lg:max-w-[560px] lg:text-[18px] lg:leading-7">
                {isEnglish
                  ? "Help players and teams track schedules, bookings and changes in one place."
                : "Aplicatie administrare baze/locatii sportive"}
              </p>
              <ul className="sportme-manager-benefits modern-muted" aria-label={isEnglish ? "Manager benefits" : "Beneficii pentru manageri"}>
                {(isEnglish
                  ? ["Automated booking flow", "Useful notifications for players", "Clearer operational updates", "Staff dashboard", "Simpler daily overview", "Configure separate prices and rules"]
                  : ["Flux automat pentru rezervari", "Notificari utile pentru jucatori", "Actualizari operationale mai clare", "Dashboard pentru angajati", "Evidenta zilnica mai simpla", "Configurezi tarife si reguli separate"]
                ).map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>

              <ManagerTabletPreview className="sportme-manager-preview relative mt-5 w-full max-w-[560px] lg:mt-6 lg:max-w-[510px] xl:max-w-[560px]" />

              <button
                type="button"
                onClick={() => {
                  trackEvent("click_sportme_manager_access");
                  setShowManagerAccessModal(true);
                }}
                className="sportme-hero-cta modern-cta-button mt-4 flex w-full max-w-[670px] cursor-pointer items-center gap-3 rounded-full border p-3 pl-4 text-left backdrop-blur sm:gap-5 sm:p-5 sm:pl-8 lg:mt-5 lg:gap-5 lg:px-6 lg:py-3 lg:pl-10"
              >
                <img src="/logo-512admin.png" alt="" className="h-12 w-12 rounded-[10px] sm:h-16 sm:w-16" />
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-medium leading-tight sm:text-xl lg:whitespace-nowrap lg:text-[22px] lg:leading-7">
                    {isEnglish ? "Open " : "Acceseaza "}
                    <span className="modern-accent block text-[0.95em] sm:inline sm:pl-1">SportMe Manager</span>
                  </span>
                  <span className="modern-muted mt-2 hidden max-w-[430px] text-base leading-6 sm:block lg:text-sm lg:leading-5">
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
                <span className="modern-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12">
                  <ArrowIcon />
                </span>
              </button>
            </div>

            <div className={`sportme-split-panel sportme-split-player min-w-0 lg:pl-4 ${blurredSide === "player" ? "is-split-blurred" : ""}`}>
              <p className="sportme-hero-kicker modern-kicker mb-4 inline-flex max-w-full whitespace-nowrap rounded-full border px-3 py-2 text-[clamp(9px,2.8vw,13px)] font-medium sm:px-4 sm:text-base lg:text-[15px]">
                {isEnglish ? "Are you a player looking for a venue?" : "esti JUCATOR si cauti o locatie?"}
              </p>
              <h2 className="sportme-audience-title sportme-player-title max-w-full text-[clamp(30px,8.8vw,36px)] font-medium leading-[1.04] tracking-normal text-[#182032] sm:text-[54px] sm:leading-[0.98] lg:max-w-[420px] lg:text-[48px] xl:text-[48px]">
                <span className="sportme-title-subline block whitespace-nowrap">{isEnglish ? "Find and book fast with" : "Gaseste si Rezerva rapid prin"}</span>
                <span className="block whitespace-nowrap"><span className="modern-accent">{isEnglish ? "SportMe Player" : "SportMe Jucator"}</span></span>
              </h2>
              <p className="sportme-player-description modern-muted mt-4 max-w-full text-[15px] leading-6 sm:mt-5 sm:max-w-[640px] sm:text-xl sm:leading-8 lg:max-w-[430px] lg:text-[18px] lg:leading-7">
                {isEnglish ? "Check availability and book sports courts in a few seconds." : "Aplicatie jucatori rezervare online a locatiilor sportive"}
              </p>
              <ul className="sportme-player-benefits modern-muted" aria-label={isEnglish ? "Player benefits" : "Beneficii pentru jucatori"}>
                {(isEnglish
                  ? ["See available times instantly", "Book in a few seconds", "No calls or delayed confirmations", "Instant booking confirmation", "Reminders before the game", "Active bookings in one account"]
                  : ["Vezi instant orele disponibile", "Rezervi in cateva secunde", "Fara apeluri sau confirmari intarziate", "Confirmare imediata a rezervarii", "Remindere inainte de joc", "Rezervari active intr-un singur cont"]
                ).map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>

              <AppHomePreview className="sportme-player-preview mt-5 flex justify-center lg:absolute lg:right-[25%] lg:top-[152px] lg:z-10 lg:mt-0" />

              <div className="sportme-player-features modern-feature-grid mt-6 grid w-full max-w-[670px] grid-cols-3 divide-x text-center sm:mt-8 lg:mt-20 lg:max-w-[390px]">
                {[
                  { id: "fast", icon: <CalendarCheckIcon />, ro: ["Rezervari", "rapide"], en: ["Fast", "bookings"] },
                  { id: "live", icon: <ClockIcon />, ro: ["Disponibilitate", "in timp real"], en: ["Real-time", "availability"] },
                  { id: "calls", icon: <PhoneArrowIcon />, ro: ["Fara apeluri,", "fara stres"], en: ["No calls,", "no stress"] },
                ].map((benefit) => (
                  <div key={benefit.id} className="min-w-0 px-1.5 sm:px-5">
                    <div className="modern-outline-icon mx-auto mb-2.5 flex h-[62px] w-[62px] items-center justify-center rounded-full border sm:mb-3 sm:h-[74px] sm:w-[74px] lg:h-[58px] lg:w-[58px] lg:[&_svg]:h-8 lg:[&_svg]:w-8">
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

              <div className="sportme-download-prompt mt-5 hidden max-w-[670px] items-center justify-center gap-2 pr-24 text-xl font-medium text-[#182032]/82 sm:flex lg:max-w-[470px] lg:pr-0">
                <span>{isEnglish ? "Download the app" : "Descarca aplicatia"}</span>
                <DownloadArrowIcon />
              </div>

              <div className="mt-4 w-full max-w-[670px] space-y-3 sm:space-y-4 lg:mt-16">
                <a
                  href="https://play.google.com/store/apps/details?id=ro.sportme.app"
                  onClick={() => trackEvent("click_google_play")}
                  className="sportme-hero-cta modern-cta-button flex h-14 items-center justify-center gap-3 rounded-full border px-4 text-base font-semibold sm:h-[72px] sm:gap-4 sm:text-xl"
                >
                  <img src="/home/google-play-icon.png" alt="" className="h-7 w-7 object-contain" />
                  <span>{isEnglish ? "Get it on Google Play Store" : "Descarca din Google Play Store"}</span>
                </a>
                <a
                  href="https://www.sportme.ro/app"
                  onClick={() => trackEvent("click_app_store")}
                  className="sportme-hero-cta modern-cta-button flex h-14 items-center justify-center gap-3 rounded-full border px-4 text-base font-semibold sm:h-[72px] sm:gap-4 sm:text-xl"
                >
                  <AppleIcon />
                  <span className="inline-flex items-baseline gap-1.5">
                    <span>{isEnglish ? "Download on the App Store" : "Descarca din App Store"}</span>
                    <span className="text-[0.72em] font-normal text-[#182032]/58">{isEnglish ? "(soon, site only)" : "(curand, site only)"}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
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
      {showManagerAccessModal ? (
        <ManagerAccessModal
          onClose={() => setShowManagerAccessModal(false)}
          adminUrl={adminUrl}
          managerPlayStoreUrl={managerPlayStoreUrl}
        />
      ) : null}
      {showPlayerAccessModal ? (
        <PlayerAccessModal
          onClose={() => setShowPlayerAccessModal(false)}
          playerWebUrl={playerWebUrl}
          playerPlayStoreUrl={playerPlayStoreUrl}
        />
      ) : null}
    </section>
  );
}
