"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../app/i18n";
import { SiteFooter } from "../components/SiteFooter";

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

function getScreenshots() {
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
}

export default function AboutDeferredSections() {
  const { t, language } = useI18n();
  const isEnglish = language === "EN";
  const screenshotsTrackRef = useRef<HTMLDivElement | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const screenshots = useMemo(getScreenshots, []);
  const loopedScreenshots = useMemo(() => [...screenshots, ...screenshots], [screenshots]);

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
                  <img src={src} alt="SportMe screenshot" className="h-72 w-48 object-contain" loading="lazy" decoding="async" fetchPriority="low" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeScreenshot ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setActiveScreenshot(null)} role="dialog" aria-modal="true">
          <div className="relative max-h-[90vh] w-full max-w-4xl rounded-2xl border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setActiveScreenshot(null)} className="absolute right-3 top-3 rounded-full border border-[#d8d1bf] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f211f] hover:bg-[#f3f1e8]">
              Close
            </button>
            <img src={activeScreenshot} alt="SportMe screenshot" className="mx-auto max-h-[80vh] w-full object-contain" />
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

      <section className="about-glass-card rounded-[28px] p-6 lg:p-8">
        <div className="space-y-3">
          <p className="about-section-kicker text-xs">{isEnglish ? "Useful links" : "Linkuri utile"}</p>
          <h2 className="about-section-title text-2xl lg:text-3xl">
            {isEnglish ? "Explore " : "Descopera "}
            <span className="accent">SportMe</span>
          </h2>
          <p className="max-w-3xl text-base leading-7 text-white/72">
            {isEnglish
              ? "Find more details about online sports court booking, SportMe Manager and the most common questions about the platform."
              : "Află mai multe despre rezervarea terenurilor sportive online, SportMe Manager și răspunsurile la cele mai frecvente întrebări despre platformă."}
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/terenuri-sportive",
              title: isEnglish ? "Sports courts" : "Terenuri sportive",
              body: isEnglish ? "Book football, tennis, padel, squash and other sports online." : "Rezervă online terenuri de fotbal, tenis, padel, squash și alte sporturi.",
            },
            {
              href: "/software-management-baze-sportive",
              title: isEnglish ? "Management software" : "Software management baze sportive",
              body: isEnglish ? "Tools for bookings, calendars, employees and sports venue activity." : "Instrumente pentru rezervări, calendare, angajați și activitatea bazei sportive.",
            },
            {
              href: "/intrebari-frecvente",
              title: isEnglish ? "Questions and answers" : "Întrebări frecvente",
              body: isEnglish ? "Clear answers for players and sports venue administrators." : "Răspunsuri clare pentru jucători și administratori de baze sportive.",
            },
          ].map((item) => (
            <a key={item.href} href={item.href} className="about-glass-tile block rounded-2xl p-4 transition hover:-translate-y-0.5">
              <p className="font-semibold text-[#1f211f]">{item.title}</p>
              <p className="mt-2 text-sm leading-6">{item.body}</p>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
