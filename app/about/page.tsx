"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../app/i18n";
import { PublicTopControls } from "../components/PublicTopControls";
import { SiteFooter } from "../components/SiteFooter";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function AboutPage() {
  const { t } = useI18n();
  const screenshotsTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [showApplePrompt, setShowApplePrompt] = useState(false);
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
    <main className="public-site min-h-screen bg-[#f6f1e7] text-[#1f211f]">
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
      `}</style>
      <div className="relative overflow-hidden">
        

        <div className="mx-auto w-full max-w-6xl space-y-10 px-5 py-6 lg:py-10">
          <div className="flex justify-end">
            <PublicTopControls />
          </div>
          <header className="space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-[#7a7566]">SportMe</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{t("about.hero.title")}</h1>
              <p className="max-w-3xl text-base text-[#5b564b]">{t("about.hero.subtitle")}</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-7 lg:gap-y-4">
              <div className="flex flex-col rounded-[28px] border border-[#d8d1bf] bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_#f3f4f6_62%,_#eceff3_100%)] p-4 shadow-[0_30px_80px_-48px_rgba(32,33,31,0.85)] backdrop-blur">
                <div className="order-3 mt-3 flex w-full justify-center">
                  <img src="/patterns/6247dd6f-1.png" alt="SportMe" className="h-7 w-auto object-contain" />
                </div>
                <div className="order-1 inline-flex w-full items-center justify-center gap-3 px-2 py-1 text-sm font-semibold text-[#1f211f]">
                  <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] bg-white">
                    <img src="/logo-512.png" alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-[19px] leading-tight">{t("about.cta.download")}</span>
                    <span className="text-sm font-normal text-[#5b564b]">{t("about.cta.downloadAppleNote")}</span>
                  </span>
                </div>
                <div className="order-2 mt-3 grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <a
                      className="group inline-flex w-[92%] items-center justify-center gap-2 rounded-full border border-[#d8d1bf] bg-white px-2.5 py-2.5 text-[#2a2d33] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f9fafb] sm:gap-3 sm:px-4"
                      href="https://play.google.com/store/apps/details?id=ro.sportme.app"
                    >
                      <svg aria-hidden viewBox="0 0 24 24" className="h-5.5 w-5.5 shrink-0 transition group-hover:scale-110 sm:h-6.5 sm:w-6.5">
                        <polygon points="3,2 14,12 3,22" fill="#34a853" />
                        <polygon points="3,2 21,12 14,12" fill="#fbbc05" />
                        <polygon points="3,22 21,12 14,12" fill="#ea4335" />
                        <polygon points="8,6.5 14,12 8,17.5 12,12" fill="#4285f4" />
                      </svg>
                      <span className="flex min-w-0 flex-col items-start leading-tight sm:min-w-[120px]">
                        <span className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-[#4b5563] sm:text-[9.5px] sm:tracking-[0.14em]">Get it on</span>
                        <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-[#2a2d33] sm:text-[17px]">Google Play</span>
                      </span>
                    </a>
                    <span className="rounded-full border border-[#b7dfc2] bg-[#e8f8ed] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2e7d44]">
                      {t("about.cta.live")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="inline-flex w-[92%] cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#d8d1bf] bg-white px-2.5 py-2.5 text-[#2a2d33] opacity-95 sm:gap-3 sm:px-4">
                      <svg aria-hidden viewBox="0 0 24 24" className="h-5.5 w-5.5 shrink-0 fill-[#2f3440] sm:h-6.5 sm:w-6.5">
                        <path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" />
                      </svg>
                      <span className="flex min-w-0 flex-col items-start leading-tight sm:min-w-[120px]">
                        <span className="text-[8.5px] font-semibold tracking-[0.03em] text-[#4b5563] sm:text-[9.5px] sm:tracking-[0.04em]">Download on the</span>
                        <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-[#2a2d33] sm:text-[17px]">App Store</span>
                      </span>
                    </div>
                    <span className="rounded-full border border-[#efb1b1] bg-[#ffe8e8] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#a63b3b]">
                      {t("about.cta.soon")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-[28px] border border-[#d8d1bf] bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_#f3f4f6_62%,_#eceff3_100%)] p-4 shadow-[0_30px_80px_-48px_rgba(32,33,31,0.85)] backdrop-blur">
                <div className="inline-flex w-full items-center justify-center gap-3 px-2 py-1 text-sm font-semibold text-[#1f211f]">
                  <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] bg-white">
                    <img src="/logo-512admin.png" alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className="flex flex-col items-center">
                    <span className="text-[19px] leading-tight">{t("about.cta.managerTitle")}</span>
                    <span className="text-sm font-normal text-[#5b564b]">{t("about.cta.managerSubtitle")}</span>
                  </span>
                </div>

                <div className="mt-3 flex flex-col items-center gap-1.5">
                  <a
                    className="group inline-flex w-[92%] items-center justify-center gap-3 rounded-full border border-[#d8d1bf] bg-white px-4 py-2.5 text-[#2a2d33] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f9fafb]"
                    href="https://www.sportme.ro/pricing"
                  >
                    <span className="flex min-w-0 flex-1 flex-col items-center text-center leading-tight">
                      <span className="text-[15px] font-semibold tracking-tight text-[#2a2d33] sm:text-[16px]">{t("about.cta.managerButtonLine1")}</span>
                      <span className="text-[13px] font-normal text-[#5b564b] sm:text-sm">{t("about.cta.managerButtonLine2")}</span>
                    </span>
                  </a>
                  <span className="rounded-full border border-[#b7dfc2] bg-[#e8f8ed] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2e7d44]">
                    {t("about.cta.live")}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-center">
                  <div className="inline-flex">
                    <img src="/patterns/6247dd6f-1.png" alt="SportMe" className="h-7 w-auto object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold">{t("about.screenshots.title")}</h2>
              <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">{t("about.screenshots.subtitle")}</p>
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

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-[#d8d1bf] bg-[#f1f2f4] p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">{t("about.users.label")}</p>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#d8d1bf] bg-white/80 px-3 py-2 text-xs font-semibold text-[#1f211f]">
                  <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#d8d1bf] bg-white">
                    <img src="/logo-512.png" alt="SportMe app logo" className="h-full w-full object-cover" />
                  </span>
                  <span>
                    {t("about.users.badge")} <span className="font-normal">{t("about.users.badgeNote")}</span>
                  </span>
                </div>
                <h2 className="text-2xl font-semibold">{t("about.users.title")}</h2>
                <p className="text-sm text-[#5b564b]">{t("about.users.intro")}</p>
              </div>
              <div className="mt-5 space-y-5 text-sm text-[#5b564b]">
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.sectionTitle")}</p>
                  <p className="font-semibold text-[#1f211f]">{t("about.users.findTitle")}</p>
                  <p>{t("about.users.findItem1")}</p>
                  <p>{t("about.users.findItem2")}</p>
                  <p>{t("about.users.findItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.bookTitle")}</p>
                  <p>{t("about.users.bookItem1")}</p>
                  <p>{t("about.users.bookItem2")}</p>
                  <p>{t("about.users.bookItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.notifyTitle")}</p>
                  <p>{t("about.users.notifyItem1")}</p>
                  <p>{t("about.users.notifyItem2")}</p>
                  <p>{t("about.users.notifyItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.accountTitle")}</p>
                  <p>{t("about.users.accountItem1")}</p>
                  <p>{t("about.users.accountItem2")}</p>
                  <p>{t("about.users.accountItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.nearTitle")}</p>
                  <p>{t("about.users.nearBody")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.whyTitle")}</p>
                  <p>{t("about.users.whyItem1")}</p>
                  <p>{t("about.users.whyItem2")}</p>
                  <p>{t("about.users.whyItem3")}</p>
                  <p>{t("about.users.whyItem4")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.forTitle")}</p>
                  <p>{t("about.users.forItem1")}</p>
                  <p>{t("about.users.forItem2")}</p>
                  <p>{t("about.users.forItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.users.startTitle")}</p>
                  <p>{t("about.users.startBody")}</p>
                  <p>{t("about.users.startTagline")}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">{t("about.managers.label")}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-3 rounded-full border border-[#d8d1bf] bg-[#f1f2f4] px-3 py-2 text-xs font-semibold text-[#1f211f]">
                    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#d8d1bf] bg-white">
                      <img src="/logo-512admin.png" alt="Admin SportMe logo" className="h-full w-full object-cover" />
                    </span>
                    <span>{t("about.managers.badge")}</span>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 rounded-full border border-[#1d5f63]/30 bg-[#ecf7f6] px-4 py-2 text-sm font-semibold text-[#1d5f63] shadow-[0_12px_25px_-20px_rgba(29,95,99,0.9)] transition hover:-translate-y-0.5 hover:border-[#1d5f63]/50 hover:bg-[#e0f2f1]"
                    href="/pricing"
                  >
                    <span>{t("about.managers.pricing")}</span>
                    <span aria-hidden>→</span>
                  </a>
                </div>
                <h2 className="text-2xl font-semibold">{t("about.managers.title")}</h2>
              </div>
              <div className="mt-5 space-y-5 text-sm text-[#5b564b]">
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.bookingsTitle")}</p>
                  <p>{t("about.managers.bookingsItem1")}</p>
                  <p>{t("about.managers.bookingsItem2")}</p>
                  <p>{t("about.managers.bookingsItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.occupancyTitle")}</p>
                  <p>{t("about.managers.occupancyItem1")}</p>
                  <p>{t("about.managers.occupancyItem2")}</p>
                  <p>{t("about.managers.occupancyItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.managementTitle")}</p>
                  <p>{t("about.managers.managementItem1")}</p>
                  <p>{t("about.managers.managementItem2")}</p>
                  <p>{t("about.managers.managementItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.communicationTitle")}</p>
                  <p>{t("about.managers.communicationItem1")}</p>
                  <p>{t("about.managers.communicationItem2")}</p>
                  <p>{t("about.managers.communicationItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.whyTitle")}</p>
                  <p>{t("about.managers.whyItem1")}</p>
                  <p>{t("about.managers.whyItem2")}</p>
                  <p>{t("about.managers.whyItem3")}</p>
                  <p>{t("about.managers.whyItem4")}</p>
                  <p>{t("about.managers.whyItem5")}</p>
                  <p>{t("about.managers.whyItem6")}</p>
                  <p>{t("about.managers.whyItem7")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.securityTitle")}</p>
                  <p>{t("about.managers.securityItem1")}</p>
                  <p>{t("about.managers.securityItem2")}</p>
                  <p>{t("about.managers.securityItem3")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.startTitle")}</p>
                  <p>{t("about.managers.startItem1")}</p>
                  <p>{t("about.managers.startItem2")}</p>
                  <p>{t("about.managers.startItem3")}</p>
                  <p>{t("about.managers.startItem4")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.forTitle")}</p>
                  <p>{t("about.managers.forItem1")}</p>
                  <p>{t("about.managers.forItem2")}</p>
                  <p>{t("about.managers.forItem3")}</p>
                  <p>{t("about.managers.forItem4")}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#1f211f]">{t("about.managers.ctaTitle")}</p>
                  <p>{t("about.managers.ctaBody")}</p>
                  <p>{t("about.managers.ctaAction")}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] border border-[#d8d1bf] bg-[#f4f7ff] p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{t("about.privacy.title")}</h2>
                <p className="text-sm text-[#5b564b]">{t("about.privacy.body1")}</p>
                <p className="text-sm text-[#5b564b]">
                  {t("about.privacy.policyLabel")}{" "}
                  <a className="text-[#1d5f63] underline" href="https://sportme.ro/privacy-policy">
                    https://sportme.ro/privacy-policy
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold">{t("about.platform.title")}</h2>
                <ul className="space-y-2 text-sm text-[#5b564b]">
                  <li>{t("about.platform.item1")}</li>
                  <li>{t("about.platform.item2")}</li>
                  <li>{t("about.platform.item3")}</li>
                </ul>
              </div>
              <div className="mt-6 space-y-2 border-t border-[#e6e0d2] pt-4">
                <h3 className="text-base font-semibold text-[#1f211f]">{t("about.platform.publishedTitle")}</h3>
                <p className="text-sm text-[#5b564b]">{t("about.platform.publishedValue")}</p>
              </div>
            </div>
          </section>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
