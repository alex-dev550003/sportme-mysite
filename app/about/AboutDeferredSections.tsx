"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useI18n } from "../app/i18n";
import { SiteFooter } from "../components/SiteFooter";

const PlayerAccessModal = dynamic(() => import("../components/PlayerAccessModal"), { ssr: false });

function AccessArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 !text-white">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutDeferredSections() {
  const { t, text } = useI18n();
  const [showPlayerAccessModal, setShowPlayerAccessModal] = useState(false);
  const playerWebUrl = "https://app.sportme.ro/app";
  const playerPlayStoreUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";
  const periodLabel = text("month", "luna");
  const adminCommonPlanFeatures = [text("Online venue listing", "Listare locatie online"), text("Visible public calendar", "Calendar public vizibil"), text("Manager bookings", "Rezervari manageri")];
  const adminScheduleControlFeature = text("Full schedule and pricing control", "Control complet program si tarife");
  const adminAdvancedPlanFeatures = [text("Instant confirmations", "Confirmari instant"), text("Automatic notifications", "Notificari automate"), text("Booking statistics", "Statistici rezervari"), text("Priority support", "Suport prioritar"), text("Venue employee dashboard", "Dashboard angajati locatie")];
  const adminFreemiumFeatures = [
    ...adminCommonPlanFeatures,
    text("Player bookings - phone only", "Rezervari jucatori - doar telefonic"),
    adminScheduleControlFeature,
    text("Locations / sports zones count - MAX 1", "Nr. locatii sportive - MAXIM 1"),
  ];
  const adminStarterFeatures = [
    ...adminCommonPlanFeatures,
    text("Player bookings - online", "Rezervari jucatori - online"),
    adminScheduleControlFeature,
    text("Locations / sports zones count - MAX 2*", "Nr. locatii sportive - MAXIM 2*"),
    ...adminAdvancedPlanFeatures,
  ];
  const adminProFeatures = [
    ...adminCommonPlanFeatures,
    text("Player bookings - online", "Rezervari jucatori - online"),
    adminScheduleControlFeature,
    text("Locations / sports zones count - UNLIMITED*", "Nr. locatii sportive - NELIMITAT*"),
    ...adminAdvancedPlanFeatures,
  ];
  const pricingPlans = [
    {
      name: "Freemium",
      subtitle: text("For one sports venue", "Pentru o bază sportivă"),
      price: "€0",
      variant: "free",
      features: adminFreemiumFeatures,
      unavailable: adminAdvancedPlanFeatures,
      note: text("Upgrade is available anytime", "Upgrade oricând"),
    },
    {
      name: "Premium - STARTER",
      subtitle: text("For up to two sports venues", "Pentru maximum două baze sportive"),
      price: "€8,90",
      variant: "starter",
      features: adminStarterFeatures,
      unavailable: [],
      note: text("Upgrade/downgrade is available anytime", "Upgrade/downgrade oricând"),
    },
    {
      name: "Premium - PRO",
      subtitle: text("For sports venues without a limit", "Pentru baze sportive nelimitate"),
      price: "€14,90",
      variant: "pro",
      features: adminProFeatures,
      unavailable: [],
      note: text("Downgrade is available anytime", "Downgrade oricând"),
    },
  ];
  const PricingCheck = () => (
    <svg viewBox="0 0 20 20" aria-hidden className="pricing-plan-check mt-0.5 h-4 w-4 shrink-0">
      <path d="M4 10.5l3.2 3.2L16 5.8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const PricingCross = () => (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#ff4b55]">
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
  const openProductChoiceModal = () => {
    window.dispatchEvent(new Event("sportme:open-product-choice"));
  };

  return (
    <div className="about-deferred-layout mx-auto w-full max-w-7xl space-y-0">
      <section id="pentru-jucatori" className="scroll-mt-8">
        <div className="about-section-shell about-player-description-shell about-player-column px-2 py-4 lg:px-4 lg:py-6">
          <div className="space-y-4">
            <p className="sportme-audience-badge about-section-badge px-3 py-1.5 text-xs">{text("Are you a player?", "esti JUCATOR?")}</p>
            <h2 className="sportme-audience-title about-audience-section-heading modern-section-heading text-3xl leading-tight lg:text-[40px]">
              <span className="sportme-title-subline block">{text("Book your sport,", "Rezerva sportul tau,")}</span>
              <span className="modern-accent block">{text("hassle free", "fara batai de cap")}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">{t("about.users.intro")}</p>
          </div>
          <div className="about-player-detail-cards mt-7 hidden gap-5 text-sm leading-6 text-[#5b564b] md:grid md:grid-cols-2">
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{t("about.users.findTitle")}</p>
              <p>{t("about.users.findItem1")}</p>
              <p>{t("about.users.findItem2")}</p>
              <p>{text("- clear venue details", "- detalii clare despre locatie")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{t("about.users.bookTitle")}</p>
              <p>{t("about.users.bookItem1")}</p>
              <p>{t("about.users.bookItem2")}</p>
              <p>{text("- no calls or delayed confirmations", "- fara apeluri sau confirmari intarziate")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Notifications and account", "Notificari si cont")}</p>
              <p>{t("about.users.notifyItem1")}</p>
              <p>{t("about.users.notifyItem2")}</p>
              <p>{text("- active bookings in one account", "- rezervari active intr-un singur cont")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Nearby sport, ready to book", "Sport aproape, gata de rezervat")}</p>
              <p>{text("- optional location access", "- acces optional la locatie")}</p>
              <p>{text("- save time with updated info", "- economisesti timp cu informatii actualizate")}</p>
              <p>{text("- start with a free account", "- pornesti cu un cont gratuit")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPlayerAccessModal(true)}
            className="about-player-cta modern-cta-button mt-5 flex w-full cursor-pointer items-center gap-3 rounded-full border p-2.5 pl-4 text-left transition sm:gap-4 sm:p-4 sm:pl-6 lg:mt-6 lg:max-w-[620px]"
          >
            <img src="/logo-512.png" alt="" className="h-10 w-10 rounded-[9px] sm:h-14 sm:w-14" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold leading-tight text-white sm:text-xl">
                {text("Open player app", "Acceseaza aplicatia jucatorilor")}
              </span>
              <span className="mt-1 block text-xs leading-5 text-white/64 sm:text-sm">
                {text("Book courts from mobile or web.", "Rezerva terenuri din mobil sau web.")}
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b62df] text-white sm:h-11 sm:w-11">
              <AccessArrowIcon />
            </span>
          </button>
        </div>
      </section>

      <section id="pentru-administratori" className="scroll-mt-8">
        <div className="about-section-shell about-manager-description-shell flex flex-col px-2 py-4 lg:px-4 lg:py-6">
          <div className="space-y-4">
            <p className="sportme-audience-badge about-section-badge px-3 py-1.5 text-xs">
              <span className="mobile-manager-badge-label">{text("Are you a manager?", "esti MANAGER?")}</span>
              <span className="desktop-manager-badge-label">{text("Are you a venue or academy manager?", "esti MANAGER DE BAZA SPORTIVA sau ACADEMIE?")}</span>
            </p>
            <h2 className="sportme-audience-title about-audience-section-heading modern-section-heading text-3xl leading-tight lg:text-[40px]">
              <span className="sportme-title-subline block">{text("Manage your sports venue,", "Administreaza baza sportiva,")}</span>
              <span className="modern-accent block">{text("faster and clearer", "mai rapid si mai clar")}</span>
            </h2>
            <p className="max-w-4xl text-base leading-7 text-white/72">
              {text("SportMe Manager centralizes bookings, court availability and team activity in a clear platform for sports venue operators.", "SportMe Manager centralizeaza rezervarile, disponibilitatea terenurilor si activitatea echipei intr-o platforma clara pentru operatorii de baze sportive.")}
            </p>
          </div>
          <div className="about-manager-detail-cards order-3 mt-7 grid gap-5 text-sm leading-6 text-[#5b564b] md:grid-cols-2">
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Bookings calendar", "Calendar rezervari")}</p>
              <p>{text("- online bookings in one place", "- rezervari online intr-un singur loc")}</p>
              <p>{text("- visible availability by court", "- disponibilitate vizibila pe teren")}</p>
              <p>{text("- fewer manual checks", "- mai putine verificari manuale")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Instant confirmations", "Confirmari instant")}</p>
              <p>{text("- automatic booking flow", "- flux automat pentru rezervari")}</p>
              <p>{text("- useful player notifications", "- notificari utile pentru jucatori")}</p>
              <p>{text("- clearer operational updates", "- actualizari operationale mai clare")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Team access", "Acces pentru echipa")}</p>
              <p>{text("- employee dashboard", "- dashboard pentru angajati")}</p>
              <p>{text("- easier daily activity tracking", "- evidenta zilnica mai simpla")}</p>
              <p>{text("- fewer scattered messages", "- mai putine mesaje imprastiate")}</p>
            </div>
            <div className="about-glass-tile space-y-1 rounded-2xl p-4">
              <p className="font-semibold text-[#1f211f]">{text("Schedule control", "Control program si tarife")}</p>
              <p>{text("- manage opening hours", "- gestionezi programul")}</p>
              <p>{text("- configure prices and rules", "- configurezi tarife si reguli")}</p>
              <p>{text("- suitable for multisport venues", "- potrivit pentru baze multisport")}</p>
            </div>
          </div>
          <div id="preturi" className="about-pricing-section order-1 mt-8 scroll-mt-24">
            <div className="about-pricing-intro mb-6 space-y-2">
              <h2 className="about-audience-section-heading modern-section-heading text-3xl leading-tight lg:text-[40px]">
                <span className="modern-accent block">{text("SportMe Manager pricing", "Prețuri SportMe Manager")}</span>
              </h2>
              <p className="text-base leading-7 text-[#5b6678]">{text("Free for players.", "Pentru jucători este gratuit.")}</p>
              <p className="max-w-3xl text-base leading-7 text-[#5b6678]">
                {text("You can test all features free for 30 days and see if the platform fits your sports venue.", "30 de zile gratuite pentru testare dacă platforma se potrivește bazei dvs. sportive.")}<br />
                {text("Afterwards, it can be used free of charge with no time limit for one location.", "Ulterior, poate fi folosită gratuit, fără limită de timp pentru o singură locație.")}
              </p>
            </div>
            <div className="pricing-card-row grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`pricing-plan-card pricing-plan-card--${plan.variant} flex flex-col`}>
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p className="pricing-plan-subtitle">{plan.subtitle}</p>
                  <div className="pricing-plan-price-row">
                    <span className="pricing-plan-price">{plan.price}</span>
                    <span className="pricing-plan-period">/{periodLabel}</span>
                  </div>
                  <button type="button" onClick={openProductChoiceModal} className="pricing-plan-button">
                    {plan.variant === "free" ? text("Start for FREE", "Începe GRATUIT") : text("Try for FREE", "Testează GRATUIT")}
                  </button>
                  <div className="pricing-plan-features">
                    <p className="pricing-plan-includes">{text("Includes:", "Include:")}</p>
                    {plan.features.map((item) => (
                      <p key={item} className="pricing-plan-feature">
                        <PricingCheck />
                        <span>{item}</span>
                      </p>
                    ))}
                    {plan.unavailable.map((item) => (
                      <p key={item} className="pricing-plan-feature pricing-plan-feature--unavailable">
                        <PricingCross />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                  <p className="pricing-plan-note mt-auto">* {plan.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-final-section grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="about-section-shell px-2 py-4 lg:px-4 lg:py-6">
          <div className="space-y-2">
            <h2 className="about-audience-section-heading modern-section-heading text-3xl leading-tight lg:text-[40px]">
              <span className="sportme-title-subline block">{text("Privacy and", "Confidentialitate si")}</span>
              <span className="modern-accent block">{text("security", "securitate")}</span>
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

        <div className="about-section-shell px-2 py-4 lg:px-4 lg:py-6">
          <div className="space-y-3">
            <h2 className="about-audience-section-heading modern-section-heading text-3xl leading-tight lg:text-[40px]">
              <span className="modern-accent block">{t("about.platform.title")}</span>
            </h2>
            <ul className="about-platform-items space-y-2 text-base leading-7 text-white/72">
              {[t("about.platform.item1"), t("about.platform.item2"), t("about.platform.item3")]
                .filter(Boolean)
                .map((item) => (
                  <li key={item}>{item}</li>
                ))}
            </ul>
          </div>
          <div className="mt-6 space-y-2 border-t border-[#e6e0d2] pt-4">
            <h3 className="text-base font-semibold text-white/96">{t("about.platform.publishedTitle")}</h3>
            <p className="about-platform-published-value text-base text-white/72">{t("about.platform.publishedValue")}</p>
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
