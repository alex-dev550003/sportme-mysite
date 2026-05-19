"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../app/i18n";
import { SiteFooter } from "../components/SiteFooter";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

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

export default function AboutPage() {
  const { t, language, setLanguage } = useI18n();
  const isEnglish = language === "EN";
  const screenshotsTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [showApplePrompt, setShowApplePrompt] = useState(false);
  const [showHeroMenu, setShowHeroMenu] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const screenshots = useMemo(() => {
    const cdnBase = "https://app.sportme.ro";
    const appShots = [
      "/about/user-1-20260225.png",
      "/about/user-2-20260225.png",
      "/about/user-3-20260225.png",
      "/about/manager-1.png",
      "/about/manager-2.png",
      "/about/manager-3.png",
    ];
    const banners = [
      `${cdnBase}/01banner_football-1.png`,
      `${cdnBase}/02banner_tennis-1.png`,
      `${cdnBase}/03banner_basketball-1.png`,
      `${cdnBase}/04banner_pingpong-1.png`,
      `${cdnBase}/05banner_badminton-1.png`,
      `${cdnBase}/06banner_billiard-1.png`,
      `${cdnBase}/07banner_darts-1.png`,
      `${cdnBase}/08banner_handball-1.png`,
      `${cdnBase}/09banner_padel-1.png`,
      `${cdnBase}/10banner_pickleball-1.png`,
      `${cdnBase}/11banner_squash-1.png`,
      `${cdnBase}/12banner_volleyball-1.png`,
    ];
    const interleaved: string[] = [];
    const maxItems = Math.max(banners.length, appShots.length);
    for (let index = 0; index < maxItems; index += 1) {
      const bannerIndex = index * 2;
      if (banners[bannerIndex]) {
        interleaved.push(banners[bannerIndex]);
      }
      if (banners[bannerIndex + 1]) {
        interleaved.push(banners[bannerIndex + 1]);
      }
      if (appShots[index]) {
        interleaved.push(appShots[index]);
      }
    }
    return interleaved;
  }, []);

  const loopedScreenshots = useMemo(() => [...screenshots, ...screenshots], [screenshots]);

  const isAppleDevice = () => {
    if (typeof window === "undefined") return false;
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePlayerInstall = async () => {
    if (isAppleDevice()) {
      setShowApplePrompt(true);
      return;
    }
    if (installPromptEvent) {
      await installPromptEvent.prompt();
      await installPromptEvent.userChoice;
      setInstallPromptEvent(null);
      return;
    }
    window.location.href = "https://www.sportme.ro/app";
  };

  useEffect(() => {
    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  useEffect(() => {
    const track = screenshotsTrackRef.current;
    if (!track) {
      return undefined;
    }

    const measureStep = () => {
      const innerTrack = track.firstElementChild as HTMLElement | null;
      const firstCard = innerTrack?.firstElementChild as HTMLElement | null;
      const gapValue = Number.parseFloat(window.getComputedStyle(innerTrack ?? track).columnGap || "0");
      const gap = Number.isNaN(gapValue) ? 0 : gapValue;
      return (firstCard?.offsetWidth || 0) + gap;
    };

    let stepSize = measureStep();

    const intervalId = window.setInterval(() => {
      stepSize = stepSize || measureStep();
      if (!stepSize) {
        return;
      }

      const maxScroll = track.scrollWidth / 2;
      if (track.scrollLeft >= maxScroll - stepSize) {
        track.scrollTo({ left: 0, behavior: "auto" });
      }
      track.scrollBy({ left: stepSize, behavior: "smooth" });
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f1e7] text-[#1f211f]">
      <style jsx global>{`
        @keyframes floaty {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes drift {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(12px);
          }
          100% {
            transform: translateX(0px);
          }
        }
        .about-dark-section {
          background:
            linear-gradient(180deg, #020814 0%, #030b18 46%, #06101f 100%);
        }
        .about-glass-card {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.075);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-glass-tile {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .about-glass-tile p {
          color: rgba(255, 255, 255, 0.78) !important;
        }
        .about-glass-tile p.font-semibold {
          color: rgba(255, 255, 255, 0.94) !important;
        }
        .about-section-kicker {
          color: rgba(255, 255, 255, 0.58);
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .about-section-title {
          color: rgba(255, 255, 255, 0.96);
          font-weight: 700;
        }
        .about-section-title .accent {
          color: #106dff;
        }
        .about-dark-section .bg-white,
        .about-dark-section .bg-\\[\\#f1f2f4\\],
        .about-dark-section .bg-\\[\\#f4f7ff\\] {
          background: rgba(255, 255, 255, 0.075) !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.22) !important;
          backdrop-filter: blur(18px);
        }
        .about-dark-section .text-\\[\\#1f211f\\],
        .about-dark-section .text-\\[\\#2a2d33\\] {
          color: rgba(255, 255, 255, 0.96) !important;
        }
        .about-dark-section .text-\\[\\#5b564b\\],
        .about-dark-section .text-\\[\\#7a7566\\] {
          color: rgba(255, 255, 255, 0.68) !important;
        }
        .about-dark-section footer {
          border-color: rgba(255, 255, 255, 0.14) !important;
          background: rgba(255, 255, 255, 0.075) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-dark-section .border-\\[\\#d8d1bf\\],
        .about-dark-section .border-\\[\\#e6e0d2\\] {
          border-color: rgba(255, 255, 255, 0.14) !important;
        }
        .about-dark-section .shadow-\\[0_25px_50px_-40px_rgba\\(32\\,33\\,31\\,0\\.6\\)\\] {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24) !important;
        }
      `}</style>
      <div className="relative overflow-hidden">
        <section className="relative min-h-[850px] overflow-hidden text-white md:min-h-screen">
          <picture>
            <source media="(min-width: 768px)" srcSet="/home/sportme-home-desktop-wide.png" />
            <img src="/home/sportme-home-mobile-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center" />
          </picture>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,20,0.96)_0%,rgba(2,8,20,0.83)_40%,rgba(2,8,20,0.28)_72%,rgba(2,8,20,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,20,0.98)_0%,rgba(2,8,20,0.48)_31%,rgba(2,8,20,0.1)_62%,rgba(2,8,20,0.36)_100%)]" />

          <div className="absolute right-5 top-[calc(env(safe-area-inset-top)+18px)] z-20 flex flex-col items-end gap-3 sm:right-8 lg:right-12">
            <div
              className="inline-flex rounded-full border border-white/18 bg-black/24 p-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md"
              aria-label={t("about.languageToggleLabel")}
            >
              <button
                type="button"
                onClick={() => setLanguage("RO")}
                aria-pressed={language === "RO"}
                className={`rounded-full px-3 py-1.5 transition ${language === "RO" ? "bg-white text-[#061224]" : "text-white/76 hover:bg-white/10"}`}
              >
                RO
              </button>
              <button
                type="button"
                onClick={() => setLanguage("EN")}
                aria-pressed={language === "EN"}
                className={`rounded-full px-3 py-1.5 transition ${language === "EN" ? "bg-white text-[#061224]" : "text-white/76 hover:bg-white/10"}`}
              >
                EN
              </button>
            </div>
            <div className="relative md:hidden">
              <button
                type="button"
                onClick={() => setShowHeroMenu((value) => !value)}
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
              {showHeroMenu ? (
                <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-64 overflow-hidden rounded-[22px] border border-white/14 bg-[#111b2b]/90 p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                  {[
                    { href: "/about", label: isEnglish ? "Home" : "Acasa" },
                    { href: "/pricing", label: "SportMe Manager" },
                    { href: "/privacy-policy", label: isEnglish ? "Privacy policy" : "Politica de confidentialitate" },
                    { href: "/terms", label: isEnglish ? "Terms" : "Termeni si conditii" },
                    { href: "/cookies", label: isEnglish ? "Cookies" : "Politica de cookies" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[850px] w-full max-w-[1540px] flex-col px-5 pb-9 pt-[calc(env(safe-area-inset-top)+22px)] sm:px-8 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
            <div className="flex w-full min-w-0 items-center justify-between gap-3 pr-[104px] sm:pr-[120px]">
              <div className="flex items-center gap-4">
                <img src="/logo-512.png" alt="" className="h-12 w-12 rounded-[12px] shadow-[0_12px_30px_rgba(0,93,255,0.35)] sm:h-14 sm:w-14" />
                <span className="text-3xl font-bold tracking-normal sm:text-4xl">SportMe</span>
              </div>
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setShowHeroMenu((value) => !value)}
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
                {showHeroMenu ? (
                  <div className="absolute right-0 top-[calc(100%+12px)] z-30 w-64 overflow-hidden rounded-[22px] border border-white/14 bg-[#111b2b]/88 p-2 text-white shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                    {[
                      { href: "/about", label: isEnglish ? "Home" : "Acasa" },
                      { href: "/pricing", label: "SportMe Manager" },
                      { href: "/privacy-policy", label: isEnglish ? "Privacy policy" : "Politica de confidentialitate" },
                      { href: "/terms", label: isEnglish ? "Terms" : "Termeni si conditii" },
                      { href: "/cookies", label: isEnglish ? "Cookies" : "Politica de cookies" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/82 transition hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-1 items-start pb-0 pt-16 md:items-center md:pb-0 md:pt-0">
              <div className="w-[min(390px,calc(100vw-40px))] min-w-0 sm:w-[min(780px,calc(100vw-64px))] lg:w-[780px]">
                <h1 className="max-w-full text-[38px] font-bold leading-[1.04] tracking-normal sm:text-6xl sm:leading-[0.98] lg:text-[82px]">
                  {isEnglish ? "Book fast" : "Rezerva rapid"}
                  <br />
                  {isEnglish ? "with " : "prin "}
                  <span className="text-[#106dff]">SportMe</span>
                </h1>
                <p className="mt-4 max-w-full text-[16px] leading-6 text-white/84 sm:mt-5 sm:max-w-[640px] sm:text-2xl sm:leading-9">
                  {isEnglish
                    ? "Check availability and book sports courts in a few seconds."
                    : "Verifica disponibilitatea si rezerva terenuri sportive in cateva secunde."}
                </p>

                <div className="mt-8 grid w-full max-w-[670px] grid-cols-3 divide-x divide-white/20 text-center sm:mt-10">
                  {[
                    { id: "fast", icon: <CalendarCheckIcon />, ro: ["Rezervari", "rapide"], en: ["Fast", "bookings"] },
                    { id: "live", icon: <ClockIcon />, ro: ["Disponibilitate", "in timp real"], en: ["Real-time", "availability"] },
                    { id: "calls", icon: <PhoneArrowIcon />, ro: ["Fara apeluri,", "fara stres"], en: ["No calls,", "no stress"] },
                  ].map((benefit) => (
                    <div key={benefit.id} className="min-w-0 px-1.5 sm:px-5">
                      <div className="mx-auto mb-2.5 flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#0d67ff] bg-black/24 text-white shadow-[0_0_22px_rgba(0,93,255,0.34),inset_0_0_20px_rgba(255,255,255,0.04)] sm:mb-3 sm:h-[82px] sm:w-[82px]">
                        {benefit.icon}
                      </div>
                      <p className="text-[13px] font-semibold leading-5 sm:text-xl sm:leading-6">
                        {(isEnglish ? benefit.en : benefit.ro).map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 hidden max-w-[670px] items-center justify-center gap-2 pl-28 text-xl font-medium text-white/90 sm:flex">
                  <span>{isEnglish ? "Download the app" : "Descarca aplicatia"}</span>
                  <DownloadArrowIcon />
                </div>

                <div className="mt-6 grid w-full gap-4 lg:w-[1420px] lg:grid-cols-[670px_700px] lg:items-start lg:gap-8">
                  <div className="w-full max-w-[670px] space-y-3 sm:space-y-4">
                    <a
                      href="https://play.google.com/store/apps/details?id=ro.sportme.app"
                      className="flex h-16 items-center justify-center gap-3 rounded-full bg-[#0564ff] px-4 text-lg font-semibold shadow-[0_20px_48px_rgba(0,93,255,0.42)] hover:bg-[#1472ff] sm:h-[78px] sm:gap-4 sm:text-2xl"
                    >
                      <AndroidIcon />
                      <span>{isEnglish ? "Get it on Google Play" : "Descarca din Google Play"}</span>
                    </a>
                    <a
                      href="https://www.sportme.ro/app"
                      className="flex h-16 items-center justify-center gap-3 rounded-full border border-white/38 bg-black/20 px-4 text-lg font-semibold hover:border-white/58 hover:bg-white/8 sm:h-[78px] sm:gap-4 sm:text-2xl"
                    >
                      <AppleIcon />
                      <span>{isEnglish ? "Download on the App Store" : "Descarca din App Store"}</span>
                    </a>
                  </div>

                  <a
                    href="https://www.sportme.ro/pricing"
                    className="flex w-full max-w-[670px] items-center gap-4 rounded-[24px] border border-white/12 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur hover:bg-white/[0.11] sm:gap-5 sm:p-5 lg:h-[172px] lg:max-w-none lg:translate-x-10 lg:translate-y-0 lg:gap-5 lg:rounded-[22px] lg:px-6 lg:py-5"
                  >
                    <img src="/logo-512admin.png" alt="" className="h-16 w-16 rounded-[10px] sm:h-20 sm:w-20 lg:h-20 lg:w-20" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-white/72 sm:text-lg lg:text-sm">
                        {isEnglish ? "Do you manage a sports venue?" : "Esti administrator de baza sportiva?"}
                      </span>
                      <span className="mt-0.5 block text-xl font-bold sm:text-2xl lg:whitespace-nowrap lg:text-[22px] lg:leading-7">
                        {isEnglish ? "Open " : "Acceseaza "}
                        <span className="text-[#106dff]">SportMe Manager</span>
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

        <div className="about-dark-section w-full px-5 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl space-y-10">

          <section className="about-glass-card rounded-[28px] p-6 lg:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="about-section-title text-2xl lg:text-3xl">
                {isEnglish ? "Product " : "Capturi "}
                <span className="accent">{isEnglish ? "screenshots" : "de ecran"}</span>
              </h2>
              <p className="about-section-kicker text-xs">{t("about.screenshots.subtitle")}</p>
            </div>
            <div ref={screenshotsTrackRef} className="mt-5 overflow-hidden pb-2" aria-label="Product screenshots">
              <div className="flex w-max gap-2.5 sm:gap-3">
                {loopedScreenshots.map((src, index) => (
                  <div key={`${src}-${index}`} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveScreenshot(src)}
                      className="block overflow-hidden transition hover:-translate-y-0.5"
                      style={{
                        animation: "floaty 6s ease-in-out infinite",
                        animationDelay: `${index * 0.5}s`,
                      }}
                    >
                      <img src={src} alt="SportMe screenshot" className="h-72 w-48 object-contain" loading="lazy" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {activeScreenshot ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
              onClick={() => setActiveScreenshot(null)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative max-h-[90vh] w-full max-w-4xl rounded-2xl border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveScreenshot(null)}
                  className="absolute right-3 top-3 rounded-full border border-[#d8d1bf] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f211f] hover:bg-[#f3f1e8]"
                >
                  Close
                </button>
                <img src={activeScreenshot} alt="SportMe screenshot" className="mx-auto max-h-[80vh] w-full object-contain" />
              </div>
            </div>
          ) : null}
          {showApplePrompt ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
              onClick={() => setShowApplePrompt(false)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="w-full max-w-sm rounded-2xl border border-[#d8d1bf] bg-white p-5 text-[#1f211f] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{t("about.cta.applePromptTitle")}</p>
                    <p className="mt-2 text-sm text-[#5b564b]">{t("about.cta.applePromptBody")}</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-[#d8d1bf] px-2 text-sm text-slate-600"
                    onClick={() => setShowApplePrompt(false)}
                  >
                    x
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-full border border-[#1f211f] bg-white px-4 py-2 text-sm font-semibold text-[#1f211f] hover:bg-[#f3f1e8]"
                  onClick={() => {
                    window.location.href = "https://www.sportme.ro/app";
                  }}
                >
                  {t("about.cta.applePromptAction")}
                </button>
              </div>
            </div>
          ) : null}

          <section>
            <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
              <div className="space-y-4">
                <p className="about-section-kicker text-xs">{t("about.users.label")}</p>
                <h2 className="about-section-title text-2xl lg:text-3xl">
                  {isEnglish ? "Book your sport, " : "Rezerva sportul tau, "}
                  <span className="accent">{isEnglish ? "hassle free" : "fara batai de cap"}</span>
                </h2>
                <p className="max-w-4xl text-base leading-7 text-white/72">{t("about.users.intro")}</p>
              </div>
              <div className="mt-7 grid gap-5 text-sm leading-6 text-[#5b564b] md:grid-cols-2 xl:grid-cols-4">
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.sectionTitle")}</p>
                  <p className="font-semibold text-[#1f211f]">{t("about.users.findTitle")}</p>
                  <p>{t("about.users.findItem1")}</p>
                  <p>{t("about.users.findItem2")}</p>
                  <p>{t("about.users.findItem3")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.bookTitle")}</p>
                  <p>{t("about.users.bookItem1")}</p>
                  <p>{t("about.users.bookItem2")}</p>
                  <p>{t("about.users.bookItem3")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.notifyTitle")}</p>
                  <p>{t("about.users.notifyItem1")}</p>
                  <p>{t("about.users.notifyItem2")}</p>
                  <p>{t("about.users.notifyItem3")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.accountTitle")}</p>
                  <p>{t("about.users.accountItem1")}</p>
                  <p>{t("about.users.accountItem2")}</p>
                  <p>{t("about.users.accountItem3")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.nearTitle")}</p>
                  <p>{t("about.users.nearBody")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.whyTitle")}</p>
                  <p>{t("about.users.whyItem1")}</p>
                  <p>{t("about.users.whyItem2")}</p>
                  <p>{t("about.users.whyItem3")}</p>
                  <p>{t("about.users.whyItem4")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.forTitle")}</p>
                  <p>{t("about.users.forItem1")}</p>
                  <p>{t("about.users.forItem2")}</p>
                  <p>{t("about.users.forItem3")}</p>
                </div>
                <div className="about-glass-tile space-y-1 rounded-2xl p-4">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.startTitle")}</p>
                  <p>{t("about.users.startBody")}</p>
                  <p>{t("about.users.startTagline")}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
              <div className="space-y-2">
                <h2 className="about-section-title text-2xl lg:text-3xl">
                  {isEnglish ? "Privacy and " : "Confidentialitate si "}
                  <span className="accent">{isEnglish ? "security" : "securitate"}</span>
                </h2>
                <p className="text-base leading-7 text-white/72">{t("about.privacy.body1")}</p>
                <p className="text-base leading-7 text-white/72">
                  {t("about.privacy.policyLabel")}{" "}
                  <a className="text-[#1d5f63] underline" href="https://sportme.ro/privacy-policy">
                    https://sportme.ro/privacy-policy
                  </a>
                </p>
              </div>
            </div>

            <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
              <div className="space-y-3">
                <h2 className="about-section-title text-2xl lg:text-3xl">
                  <span className="accent">{t("about.platform.title")}</span>
                </h2>
                <ul className="space-y-2 text-base leading-7 text-white/72">
                  <li>{t("about.platform.item1")}</li>
                  <li>{t("about.platform.item2")}</li>
                  <li>{t("about.platform.item3")}</li>
                </ul>
              </div>
              <div className="mt-6 space-y-2 border-t border-[#e6e0d2] pt-4">
                <h3 className="text-base font-semibold text-white/96">{t("about.platform.publishedTitle")}</h3>
                <p className="text-base text-white/72">{t("about.platform.publishedValue")}</p>
              </div>
            </div>
          </section>

          <SiteFooter />
        </div>
        </div>
      </div>
    </main>
  );
}
