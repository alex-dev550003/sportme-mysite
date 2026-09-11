"use client";

import dynamic from "next/dynamic";
import { useState, type CSSProperties } from "react";
import { useI18n } from "../app/i18n";
import { SiteFooter } from "../components/SiteFooter";

const PlayerAccessModal = dynamic(() => import("../components/PlayerAccessModal"), { ssr: false });

function AccessArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PricingStepArrow({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`pointer-events-none flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2b8cff]/70 bg-[#06245a]/88 text-[#72b4ff] shadow-[0_0_0_5px_rgba(43,140,255,0.24),0_0_18px_rgba(43,140,255,0.3)] ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M5 12h12M13 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AboutDeferredSections() {
  const { t, language } = useI18n();
  const isEnglish = language === "EN";
  const [showPlayerAccessModal, setShowPlayerAccessModal] = useState(false);
  const playerWebUrl = "https://app.sportme.ro/app";
  const playerPlayStoreUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";
  const periodLabel = isEnglish ? "month" : "luna";
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
    isEnglish ? "Locations / sports zones count - MAX 1" : "Numar locatii/zone sportive - MAXIM 1",
  ];
  const adminStarterFeatures = [
    ...adminCommonPlanFeatures,
    isEnglish ? "Player bookings - online" : "Rezervari jucatori - online",
    adminScheduleControlFeature,
    isEnglish ? "Locations / sports zones count - MAX 2*" : "Numar locatii/zone sportive - MAXIM 2*",
    ...adminAdvancedPlanFeatures,
  ];
  const adminProFeatures = [
    ...adminCommonPlanFeatures,
    isEnglish ? "Player bookings - online" : "Rezervari jucatori - online",
    adminScheduleControlFeature,
    isEnglish ? "Locations / sports zones count - UNLIMITED*" : "Numar locatii/zone sportive - NELIMITAT*",
    ...adminAdvancedPlanFeatures,
  ];
  const isLocationLimitFeature = (item: string) => item.includes("Locations / sports zones count") || item.includes("Numar locatii/zone sportive");
  const isHighlightedPricingFeature = (item: string) => isLocationLimitFeature(item);
  const highlightedPricingFeatureClass = "-ml-1 rounded-lg border border-[#2b8cff]/34 bg-white/[0.085] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]";
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

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section id="pentru-jucatori" className="scroll-mt-8">
        <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
          <div className="space-y-4">
            <p className="sportme-audience-badge px-4 py-2 text-xs sm:text-sm">{isEnglish ? "Are you a player?" : "esti JUCATOR?"}</p>
            <h2 className="modern-section-heading text-3xl leading-tight lg:text-[40px]">
              {isEnglish ? "Book your sport, " : "Rezerva sportul tau, "}
              <span className="accent">{isEnglish ? "hassle free" : "fara batai de cap"}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">{t("about.users.intro")}</p>
          </div>
          <div className="mt-7 hidden gap-5 text-sm leading-6 text-[#5b564b] md:grid md:grid-cols-2 xl:grid-cols-4">
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
          <button
            type="button"
            onClick={() => setShowPlayerAccessModal(true)}
            className="modern-cta-button mt-6 flex w-full cursor-pointer items-center gap-3 rounded-full border p-3 pl-5 text-left transition sm:gap-4 sm:p-4 sm:pl-6 lg:max-w-[620px]"
          >
            <img src="/logo-512.png" alt="" className="h-12 w-12 rounded-[9px] sm:h-14 sm:w-14" />
            <span className="min-w-0 flex-1">
              <span className="block text-base font-bold leading-tight text-white sm:text-xl">
                {isEnglish ? "Open player app" : "Acceseaza aplicatia jucatorilor"}
              </span>
              <span className="mt-1 block text-xs leading-5 text-white/64 sm:text-sm">
                {isEnglish ? "Book courts from mobile or web." : "Rezerva terenuri din mobil sau web."}
              </span>
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b62df] text-white sm:h-12 sm:w-12 [&_svg]:h-6 [&_svg]:w-6">
              <AccessArrowIcon />
            </span>
          </button>
        </div>
      </section>

      <section id="pentru-administratori" className="scroll-mt-8">
        <div className="about-glass-card flex flex-col rounded-[28px] p-6 lg:p-8">
          <div className="space-y-4">
            <p className="sportme-audience-badge px-4 py-2 text-xs sm:text-sm">
              {isEnglish ? "Are you a venue or academy admin?" : "esti ADMINISTRATOR DE BAZA SPORTIVA sau ACADEMIE?"}
            </p>
            <h2 className="modern-section-heading text-3xl leading-tight lg:text-[40px]">
              {isEnglish ? "Manage your sports venue, " : "Administreaza baza sportiva, "}
              <span className="accent">{isEnglish ? "faster and clearer" : "mai rapid si mai clar"}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">
              {isEnglish
                ? "SportMe Manager centralizes bookings, court availability and team activity in a clear platform for sports venue operators."
                : "SportMe Manager centralizeaza rezervarile, disponibilitatea terenurilor si activitatea echipei intr-o platforma clara pentru operatorii de baze sportive."}
            </p>
          </div>
          <div className="order-3 mt-7 grid gap-5 text-sm leading-6 text-[#5b564b] md:grid-cols-2 xl:grid-cols-4">
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
          <div id="preturi" className="order-1 mt-8 scroll-mt-8">
            <div className="text-center">
              <h3 className="modern-section-heading text-xl leading-tight">
                {isEnglish ? "Simple pricing. No commissions. No risks." : "Pret simplu. Fara comisioane. Fara riscuri."}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/64">
                {isEnglish
                  ? "Up to 2 courts or sports zones: STARTER €8.90/month. More than 2: PRO €14.90/month."
                  : "Pana la 2 terenuri sau zone sportive: STARTER 8,90 EUR/luna. Peste 2: PRO 14,90 EUR/luna."}
              </p>
            </div>

            <div className="relative mt-10 flex snap-x snap-mandatory items-stretch gap-2 overflow-x-scroll pb-4 [scrollbar-color:#2b8cff_rgba(255,255,255,0.14)] [scrollbar-width:thin] lg:grid lg:snap-none lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0">
              <PricingStepArrow className="absolute top-1/2 z-30 hidden -translate-y-1/2 lg:flex" style={{ left: "calc((100% - 40px) / 3 - 12px)" }} />
              <PricingStepArrow className="absolute top-1/2 z-30 hidden -translate-y-1/2 lg:flex" style={{ left: "calc(((100% - 40px) / 3) * 2 + 8px)" }} />
              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border-[1.5px] border-[#0564ff] bg-[#111c25] p-5 shadow-[0_28px_80px_rgba(5,100,255,0.16)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <div className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-[#0564ff] px-6 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-[0_12px_30px_rgba(5,100,255,0.3)]">
                  MOST POPULAR
                </div>
                <h4 className="text-xl font-bold text-white">Freemium</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€0</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminFreemiumFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isHighlightedPricingFeature(item) ? highlightedPricingFeatureClass : ""
                      }`}
                    >
                      <PricingCheck />
                      <span className={isHighlightedPricingFeature(item) ? "font-semibold text-white/86" : undefined}>{item}</span>
                    </p>
                  ))}
                  {adminAdvancedPlanFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isHighlightedPricingFeature(item) ? highlightedPricingFeatureClass : ""
                      }`}
                    >
                      <PricingCross />
                      <span className={isHighlightedPricingFeature(item) ? "font-semibold text-white/86" : undefined}>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Upgrade is available anytime" : "Se poate face upgrade oricand"}</p>
                </div>
              </div>

              <PricingStepArrow className="relative z-30 -mx-3 self-center lg:hidden" />

              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border border-white/12 bg-[#111c25] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <h4 className="text-xl font-bold text-white">Premium - STARTER</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€8,90</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminStarterFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isHighlightedPricingFeature(item) ? highlightedPricingFeatureClass : ""
                      }`}
                    >
                      <PricingCheck />
                      <span className={isHighlightedPricingFeature(item) ? "font-semibold text-white/86" : undefined}>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Upgrade/downgrade is available anytime" : "Se poate face upgrade/downgrade oricand"}</p>
                </div>
              </div>

              <PricingStepArrow className="relative z-30 -mx-3 self-center lg:hidden" />

              <div className="relative flex min-w-[270px] snap-start flex-col rounded-[18px] border border-white/12 bg-[#111c25] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.24)] sm:min-w-[310px] lg:min-h-[520px] lg:min-w-0 lg:p-6">
                <h4 className="text-xl font-bold text-white">Premium - PRO</h4>
                <div className="mt-8 flex items-end gap-1">
                  <span className="text-4xl font-bold leading-none text-white">€14,90</span>
                  <span className="translate-y-0.5 text-base leading-none text-white/42">/{periodLabel}</span>
                </div>
                <div className="mt-5 space-y-1 border-t border-white/10 pt-4 text-[13px] text-white/72 lg:space-y-2 lg:text-sm">
                  {adminProFeatures.map((item) => (
                    <p
                      key={item}
                      className={`flex gap-2 leading-4 lg:leading-5 ${
                        isHighlightedPricingFeature(item) ? highlightedPricingFeatureClass : ""
                      }`}
                    >
                      <PricingCheck />
                      <span className={isHighlightedPricingFeature(item) ? "font-semibold text-white/86" : undefined}>{item}</span>
                    </p>
                  ))}
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-xs text-white/48">* {isEnglish ? "Downgrade is available anytime" : "Se poate face downgrade oricand"}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={openManagerAccessModal}
              className="modern-cta-button mx-auto mt-7 flex w-full max-w-[760px] cursor-pointer flex-col items-center justify-center rounded-full border px-6 py-4 text-center text-base font-bold leading-tight transition sm:py-5 sm:text-lg lg:mt-8 lg:max-w-[620px] lg:text-lg"
            >
              <span>Deschide dashboard Manager</span>
              <span className="mt-0.5 font-normal text-white/78">(primele 90 zile gratuit)</span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="about-glass-card rounded-[28px] p-6 lg:p-8">
          <div className="space-y-2">
            <h2 className="modern-section-heading text-3xl leading-tight lg:text-[40px]">
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
            <h2 className="modern-section-heading text-3xl leading-tight lg:text-[40px]">
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

      {showPlayerAccessModal ? (
        <PlayerAccessModal
          onClose={() => setShowPlayerAccessModal(false)}
          playerWebUrl={playerWebUrl}
          playerPlayStoreUrl={playerPlayStoreUrl}
        />
      ) : null}

      <SiteFooter />
    </div>
  );
}
