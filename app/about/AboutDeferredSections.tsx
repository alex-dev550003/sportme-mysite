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
  const periodLabel = isEnglish ? "month + VAT" : "luna + TVA";
  const adminCommonPlanFeatures = isEnglish
    ? ["Online venue listing", "Visible public calendar", "Manager bookings"]
    : ["Listare locatie online", "Calendar public vizibil", "Rezervari manageri"];
  const adminScheduleControlFeature = isEnglish ? "Full schedule and pricing control" : "Control complet program si tarife";
  const adminAdvancedPlanFeatures = isEnglish
    ? ["Instant confirmations", "Automatic notifications", "Booking statistics", "Priority support", "Venue employee dashboard"]
    : ["Confirmari instant", "Notificari automate", "Statistici rezervari", "Suport prioritar", "Dashboard angajati locatie"];
  const adminFreemiumFeatures = [
    ...adminCommonPlanFeatures,
    isEnglish ? "Player bookings - phone only" : "Rezervari jucatori - doar telefonic",
    adminScheduleControlFeature,
    isEnglish ? "Locations count - MAX 1" : "Numar locatii - MAXIM 1",
  ];
  const adminStarterFeatures = [
    ...adminCommonPlanFeatures,
    isEnglish ? "Player bookings - online" : "Rezervari jucatori - online",
    adminScheduleControlFeature,
    isEnglish ? "Locations count - MAX 2*" : "Numar locatii - MAXIM 2*",
    ...adminAdvancedPlanFeatures,
  ];
  const adminProFeatures = [
    ...adminCommonPlanFeatures,
    isEnglish ? "Player bookings - online" : "Rezervari jucatori - online",
    adminScheduleControlFeature,
    isEnglish ? "Locations count - UNLIMITED*" : "Numar locatii - NELIMITAT*",
    ...adminAdvancedPlanFeatures,
  ];
  const isLocationLimitFeature = (item: string) => item.includes("Locations count") || item.includes("Numar locatii");
  const PricingCheck = () => (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#0564ff]">
      <path d="M4 10.5l3.2 3.2L16 5.8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const PricingCross = () => (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4b55]">
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
  const openManagerAccessModal = () => {
    window.dispatchEvent(new Event("sportme:open-manager-access"));
  };

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

      <section id="pentru-jucatori" className="scroll-mt-8">
        <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
          <div className="space-y-4">
            <p className="about-section-kicker text-sm font-extrabold !text-[#2b8cff]">{t("about.users.label")}</p>
            <h2 className="about-section-title text-2xl lg:text-3xl">
              {isEnglish ? "Book your sport, " : "Rezerva sportul tau, "}
              <span className="accent">{isEnglish ? "hassle free" : "fara batai de cap"}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">{t("about.users.intro")}</p>
          </div>
          <div className="mt-7 grid gap-5 text-sm leading-6 text-[#5b564b] md:grid-cols-2 xl:grid-cols-4">
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{t("about.users.findTitle")}</p>
              <p>{t("about.users.findItem1")}</p>
              <p>{t("about.users.findItem2")}</p>
              <p>{isEnglish ? "- clear venue details" : "- detalii clare despre locatie"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{t("about.users.bookTitle")}</p>
              <p>{t("about.users.bookItem1")}</p>
              <p>{t("about.users.bookItem2")}</p>
              <p>{isEnglish ? "- no calls or delayed confirmations" : "- fara apeluri sau confirmari intarziate"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Notifications and account" : "Notificari si cont"}</p>
              <p>{t("about.users.notifyItem1")}</p>
              <p>{t("about.users.notifyItem2")}</p>
              <p>{isEnglish ? "- active bookings in one account" : "- rezervari active intr-un singur cont"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Nearby sport, ready to book" : "Sport aproape, gata de rezervat"}</p>
              <p>{isEnglish ? "- optional location access" : "- acces optional la locatie"}</p>
              <p>{isEnglish ? "- save time with updated info" : "- economisesti timp cu informatii actualizate"}</p>
              <p>{isEnglish ? "- start with a free account" : "- pornesti cu un cont gratuit"}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="about-glass-tile rounded-2xl p-6">
              <p className="about-section-kicker text-xs">{isEnglish ? "Availability" : "Disponibilitate"}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {isEnglish ? "See the right intervals before calling the sports venue" : "Vezi intervalele potrivite inainte sa suni la baza sportiva"}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/72">
                {isEnglish
                  ? "SportMe reduces uncertainty in the booking process. When a venue manages its schedule in the platform, you can quickly see what slots are free and make an informed decision."
                  : "SportMe reduce incertitudinea din procesul de rezervare. Cand o locatie isi gestioneaza programul in platforma, vezi mai usor ce intervale sunt libere si poti lua o decizie informata."}
              </p>
            </div>
            <div className="about-glass-tile rounded-2xl p-6">
              <p className="about-section-kicker text-xs">{isEnglish ? "Benefits" : "Beneficii"}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {isEnglish ? "Fewer messages, more play" : "Mai putine mesaje, mai multa miscare"}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/72">
                {isEnglish
                  ? "The app keeps bookings in one place, sends useful notifications and helps player groups organize more clearly for the next match."
                  : "Aplicatia pastreaza rezervarile intr-un singur loc, trimite notificari utile si ajuta grupurile de jucatori sa se organizeze mai clar pentru urmatorul meci."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pentru-administratori" className="scroll-mt-8">
        <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
          <div className="space-y-4">
            <p className="about-section-kicker text-sm font-extrabold !text-[#2b8cff]">
              {isEnglish ? "For administrators" : "Pentru administratori"}
            </p>
            <h2 className="about-section-title text-2xl lg:text-3xl">
              {isEnglish ? "Manage your sports venue, " : "Administreaza baza sportiva, "}
              <span className="accent">{isEnglish ? "faster and clearer" : "mai rapid si mai clar"}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">
              {isEnglish
                ? "SportMe Manager centralizes bookings, court availability and team activity in a clear platform for sports venue operators."
                : "SportMe Manager centralizeaza rezervarile, disponibilitatea terenurilor si activitatea echipei intr-o platforma clara pentru operatorii de baze sportive."}
            </p>
          </div>
          <div className="mt-7 grid gap-5 text-sm leading-6 text-[#5b564b] md:grid-cols-2 xl:grid-cols-4">
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Bookings calendar" : "Calendar rezervari"}</p>
              <p>{isEnglish ? "- online bookings in one place" : "- rezervari online intr-un singur loc"}</p>
              <p>{isEnglish ? "- visible availability by court" : "- disponibilitate vizibila pe teren"}</p>
              <p>{isEnglish ? "- fewer manual checks" : "- mai putine verificari manuale"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Instant confirmations" : "Confirmari instant"}</p>
              <p>{isEnglish ? "- automatic booking flow" : "- flux automat pentru rezervari"}</p>
              <p>{isEnglish ? "- useful player notifications" : "- notificari utile pentru jucatori"}</p>
              <p>{isEnglish ? "- clearer operational updates" : "- actualizari operationale mai clare"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Team access" : "Acces pentru echipa"}</p>
              <p>{isEnglish ? "- employee dashboard" : "- dashboard pentru angajati"}</p>
              <p>{isEnglish ? "- easier daily activity tracking" : "- evidenta zilnica mai simpla"}</p>
              <p>{isEnglish ? "- fewer scattered messages" : "- mai putine mesaje imprastiate"}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{isEnglish ? "Schedule control" : "Control program si tarife"}</p>
              <p>{isEnglish ? "- manage opening hours" : "- gestionezi programul"}</p>
              <p>{isEnglish ? "- configure prices and rules" : "- configurezi tarife si reguli"}</p>
              <p>{isEnglish ? "- suitable for multisport venues" : "- potrivit pentru baze multisport"}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="about-glass-tile rounded-2xl p-6">
              <p className="about-section-kicker text-xs">{isEnglish ? "Operations" : "Operare"}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {isEnglish ? "Clearer operations for every court" : "Operare mai clara pentru fiecare teren"}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/72">
                {isEnglish
                  ? "The platform helps teams follow schedules, bookings and changes in one place, with fewer manual checks and less back-and-forth communication."
                  : "Platforma ajuta echipele sa urmareasca programul, rezervarile si modificarile intr-un singur loc, cu mai putine verificari manuale si mai putine discutii repetitive."}
              </p>
            </div>
            <div className="about-glass-tile rounded-2xl p-6">
              <p className="about-section-kicker text-xs">{isEnglish ? "Growth" : "Vizibilitate"}</p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {isEnglish ? "List your venue and start receiving bookings online" : "Inscrie locatia si incepe sa primesti rezervari online"}
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/72">
                {isEnglish
                  ? "In a few minutes you can add your sports venue, organize available slots and offer players a simpler way to book."
                  : "In cateva minute iti inscrii locatia, organizezi intervalele disponibile si oferi jucatorilor o metoda mai simpla de rezervare."}
              </p>
            </div>
          </div>
          <div id="preturi" className="mt-8 scroll-mt-8">
            <div className="text-center">
              <h3 className="text-xl font-bold leading-tight text-white">
                {isEnglish ? "Simple pricing. No commissions. No risks." : "Pret simplu. Fara comisioane. Fara riscuri."}
              </h3>
            </div>

            <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-scroll pb-4 [scrollbar-color:#2b8cff_rgba(255,255,255,0.14)] [scrollbar-width:thin] lg:grid lg:snap-none lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0">
              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border border-white/12 bg-[#111c25] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <h4 className="text-xl font-bold text-white">Freemium</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€0</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={openManagerAccessModal}
                  className="mt-8 hidden w-full cursor-pointer flex-col items-center justify-center rounded-full border border-white/18 bg-transparent px-5 py-3 text-center text-sm font-semibold leading-tight text-white transition hover:border-white/34 hover:bg-white/8 lg:inline-flex"
                >
                  <span>Deschide dashboard Manager</span>
                  <span className="mt-0.5 font-normal text-white/72">(gratuit)</span>
                </button>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminFreemiumFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isLocationLimitFeature(item) ? "-ml-1 rounded-lg border border-white/18 px-1 py-1" : ""
                      }`}
                    >
                      <PricingCheck />
                      <span>{item}</span>
                    </p>
                  ))}
                  {adminAdvancedPlanFeatures.map((item) => (
                    <p key={item} className="flex gap-2 leading-4 lg:leading-5">
                      <PricingCross />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Upgrade is available anytime" : "Se poate face upgrade oricand"}</p>
                </div>
              </div>

              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border-[1.5px] border-[#0564ff] bg-[#111c25] p-5 shadow-[0_28px_80px_rgba(5,100,255,0.16)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <div className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-[#0564ff] px-6 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_30px_rgba(5,100,255,0.3)]">
                  MOST POPULAR
                </div>
                <h4 className="text-xl font-bold text-white">Premium - STARTER</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€8,90</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={openManagerAccessModal}
                  className="mt-8 hidden w-full cursor-pointer flex-col items-center justify-center rounded-full border border-[#0564ff] bg-[#0564ff] px-5 py-3 text-center text-sm font-semibold leading-tight text-white shadow-[0_12px_28px_rgba(5,100,255,0.28)] transition hover:bg-[#1472ff] lg:inline-flex"
                >
                  <span>Deschide dashboard Manager</span>
                  <span className="mt-0.5 font-normal text-white/78">(primele 120 zile gratuit)</span>
                </button>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminStarterFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isLocationLimitFeature(item) ? "-ml-1 rounded-lg border border-white/18 px-1 py-1" : ""
                      }`}
                    >
                      <PricingCheck />
                      <span className={isLocationLimitFeature(item) ? "font-semibold text-white/82" : undefined}>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Upgrade/downgrade is available anytime" : "Se poate face upgrade/downgrade oricand"}</p>
                </div>
              </div>

              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border border-white/12 bg-[#111c25] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <h4 className="text-xl font-bold text-white">Premium - PRO</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€14,90</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <button
                  type="button"
                  onClick={openManagerAccessModal}
                  className="mt-8 hidden w-full cursor-pointer flex-col items-center justify-center rounded-full border border-white/18 bg-transparent px-5 py-3 text-center text-sm font-semibold leading-tight text-white transition hover:border-white/34 hover:bg-white/8 lg:inline-flex"
                >
                  <span>Deschide dashboard Manager</span>
                  <span className="mt-0.5 font-normal text-white/72">(primele 120 zile gratuit)</span>
                </button>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminProFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isLocationLimitFeature(item) ? "-ml-1 rounded-lg border border-white/18 px-1 py-1" : ""
                      }`}
                    >
                      <PricingCheck />
                      <span className={isLocationLimitFeature(item) ? "font-semibold text-white/82" : undefined}>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Downgrade is available anytime" : "Se poate face downgrade oricand"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border-2 border-[#2b8cff] bg-[linear-gradient(135deg,rgba(2,26,64,0.92),rgba(5,100,255,0.76))] px-5 py-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
              <span className="block text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(5,100,255,0.45)] sm:text-[24px]">
                {isEnglish ? "Get 120 days of Premium STARTER or PRO for FREE." : "Beneficiaza GRATUIT 120 de zile de planul Premium STARTER sau PRO."}
              </span>
              <span className="mt-1 block text-[16px] font-bold leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)] sm:text-[18px]">
                {isEnglish ? "No costs, no card, no obligations." : "Fara costuri, fara card, fara obligatii."}
              </span>
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
              {[t("about.platform.item1"), t("about.platform.item2"), t("about.platform.item3")]
                .filter(Boolean)
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
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
  );
}
