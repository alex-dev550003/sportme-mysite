"use client";

import { useI18n } from "../app/i18n";

const googlePlayUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";
const appStoreFallbackUrl = "https://www.sportme.ro/app";
const managerUrl = "https://www.sportme.ro/pricing";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path d="M12 3.1 19 6v5.1c0 4.5-2.9 8.3-7 9.8-4.1-1.5-7-5.3-7-9.8V6l7-2.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m9 12 2 2 4-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
      <path d="M7 3v3M17 3v3M4.5 9.2h15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8 14.1 2.1 2.1 5-5.1" fill="none" stroke="#1476ff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.7v4.7l3.3 2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
      <path d="m4 4 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M8.1 5.3 6.7 6.7c-.8.8-.9 2-.4 3 .9 1.8 2.1 3.5 3.7 5.1 1.5 1.5 3.2 2.8 5.1 3.7 1 .5 2.2.4 3-.4l1.4-1.4c.5-.5.5-1.4 0-1.9l-2.1-2.1c-.5-.5-1.3-.5-1.8-.1l-1.1.9c-.4.3-.9.3-1.3 0a15.3 15.3 0 0 1-2.7-2.7c-.3-.4-.3-.9 0-1.3l.9-1.1c.4-.5.4-1.3-.1-1.8L9.9 5.3c-.5-.5-1.3-.5-1.8 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7">
      <path
        fill="currentColor"
        d="M7.2 8.2h9.6c1.1 0 2 .9 2 2v6.2c0 .7-.5 1.2-1.2 1.2h-.7v2.2c0 .6-.5 1-1 1s-1-.4-1-1v-2.2H9.1v2.2c0 .6-.5 1-1 1s-1-.4-1-1v-2.2h-.7c-.7 0-1.2-.5-1.2-1.2v-6.2c0-1.1.9-2 2-2Zm-.9-3.8a.6.6 0 0 1 .8.2l1.2 2.1A6.9 6.9 0 0 1 12 5.6c1.3 0 2.6.4 3.7 1.1l1.2-2.1a.6.6 0 1 1 1 .6l-1.2 2A6.4 6.4 0 0 1 19 9H5c.5-.8 1.3-1.4 2.2-1.8L6 5.2a.6.6 0 0 1 .3-.8ZM9 7.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Zm6 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6ZM3.6 10.4c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-.6.4-1 1-1Zm16.8 0c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1v-4c0-.6.4-1 1-1Z"
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

const benefits = [
  {
    id: "fast-bookings",
    label: (
      <>
        Rezervari
        <br />
        rapide
      </>
    ),
    icon: <CalendarCheckIcon />,
  },
  {
    id: "availability",
    label: (
      <>
        Disponibilitate
        <br />
        in timp real
      </>
    ),
    icon: <ClockIcon />,
  },
  {
    id: "no-calls",
    label: (
      <>
        Fara apeluri,
        <br />
        fara stres
      </>
    ),
    icon: <PhoneOffIcon />,
  },
];

function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="inline-flex rounded-full border border-white/18 bg-black/24 p-1 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-md">
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
  );
}

export default function HomeLandingPage() {
  const { language } = useI18n();
  const isEnglish = language === "EN";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#020814] text-white">
      <section className="relative min-h-[940px] overflow-hidden md:min-h-screen">
        <picture>
          <source media="(min-width: 768px)" srcSet="/home/sportme-home-desktop-wide.png" />
          <img
            src="/home/sportme-home-mobile-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[60%_center] md:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,20,0.96)_0%,rgba(2,8,20,0.82)_39%,rgba(2,8,20,0.28)_70%,rgba(2,8,20,0.18)_100%)] md:bg-[linear-gradient(90deg,rgba(2,8,20,0.96)_0%,rgba(2,8,20,0.82)_36%,rgba(2,8,20,0.22)_68%,rgba(2,8,20,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,8,20,0.96)_0%,rgba(2,8,20,0.42)_30%,rgba(2,8,20,0.12)_62%,rgba(2,8,20,0.34)_100%)]" />

        <div className="absolute right-5 top-[calc(env(safe-area-inset-top)+18px)] z-20 sm:right-8 lg:right-12">
          <LanguageToggle />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[940px] w-full max-w-[1540px] flex-col px-5 pb-9 pt-[calc(env(safe-area-inset-top)+28px)] sm:px-8 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
          <div className="flex w-full min-w-0 items-center justify-between gap-3 pr-[104px] sm:pr-[120px]">
            <div className="flex items-center gap-4">
              <img src="/logo-512.png" alt="" className="h-12 w-12 rounded-[12px] shadow-[0_12px_30px_rgba(0,93,255,0.35)] sm:h-14 sm:w-14" />
              <span className="text-3xl font-bold tracking-normal sm:text-4xl">SportMe</span>
            </div>
            <div className="hidden shrink-0 items-center gap-3 rounded-full border border-[#176fff]/55 bg-white/[0.06] px-6 py-3 text-lg font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur md:inline-flex">
              <ShieldIcon />
              <span>{isEnglish ? "Official partner" : "Partener oficial"}</span>
            </div>
          </div>

          <div className="flex flex-1 items-end pb-0 pt-12 md:items-center md:pb-0 md:pt-0">
            <div className="home-hero-copy min-w-0">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#176fff]/50 bg-white/[0.06] px-4 py-2 text-sm font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur md:hidden">
                <ShieldIcon />
                <span>{isEnglish ? "Official partner" : "Partener oficial"}</span>
              </div>

              <h1 className="max-w-full text-[44px] font-bold leading-[1.02] tracking-normal sm:text-6xl sm:leading-[0.98] lg:text-[82px]">
                {isEnglish ? "Book fast" : "Rezerva rapid"}
                <br />
                {isEnglish ? "with " : "prin "}
                <span className="text-[#106dff]">SportMe</span>
              </h1>
              <p className="mt-5 max-w-full text-lg leading-7 text-white/84 sm:max-w-[640px] sm:text-2xl sm:leading-9">
                {isEnglish
                  ? "Check availability and book sports courts in a few seconds."
                  : "Verifica disponibilitatea si rezerva terenuri sportive in cateva secunde."}
              </p>

              <div className="mt-9 grid w-full max-w-[670px] grid-cols-3 divide-x divide-white/20 text-center sm:mt-12">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="min-w-0 px-1.5 sm:px-5">
                    <div className="mx-auto mb-3 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[#176fff] bg-black/20 text-white shadow-[0_0_24px_rgba(0,93,255,0.28)] sm:mb-4 sm:h-[78px] sm:w-[78px]">
                      {benefit.icon}
                    </div>
                    <p className="text-[13px] font-semibold leading-5 sm:text-xl sm:leading-7">
                      {benefit.id === "fast-bookings" ? (
                        isEnglish ? (
                          <>
                            Fast
                            <br />
                            bookings
                          </>
                        ) : (
                          benefit.label
                        )
                      ) : benefit.id === "availability" ? (
                        isEnglish ? (
                          <>
                            Real-time
                            <br />
                            availability
                          </>
                        ) : (
                          benefit.label
                        )
                      ) : isEnglish ? (
                        <>
                          No calls,
                          <br />
                          no stress
                        </>
                      ) : (
                        benefit.label
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 hidden max-w-[670px] items-center justify-end gap-2 pr-8 text-base font-medium text-white/82 sm:flex">
                <span>{isEnglish ? "Download the app" : "Descarca aplicatia"}</span>
                <DownloadArrowIcon />
              </div>

              <div className="mt-6 w-full max-w-[670px] space-y-3 sm:mt-0 sm:space-y-4">
                <a
                  href={googlePlayUrl}
                  className="flex h-16 items-center justify-center gap-3 rounded-full bg-[#0564ff] px-4 text-lg font-semibold shadow-[0_20px_48px_rgba(0,93,255,0.42)] hover:bg-[#1472ff] sm:h-[78px] sm:gap-4 sm:text-2xl"
                >
                  <AndroidIcon />
                  <span>{isEnglish ? "Get it on Google Play" : "Descarca din Google Play"}</span>
                </a>
                <a
                  href={appStoreFallbackUrl}
                  className="flex h-16 items-center justify-center gap-3 rounded-full border border-white/38 bg-black/20 px-4 text-lg font-semibold hover:border-white/58 hover:bg-white/8 sm:h-[78px] sm:gap-4 sm:text-2xl"
                >
                  <AppleIcon />
                  <span>{isEnglish ? "Download on the App Store" : "Descarca din App Store"}</span>
                </a>
              </div>

              <a
                href={managerUrl}
                className="mt-6 flex w-full max-w-[670px] items-center gap-4 rounded-[24px] border border-white/12 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur hover:bg-white/[0.11] sm:mt-8 sm:gap-5 sm:p-5"
              >
                <img src="/logo-512admin.png" alt="" className="h-16 w-16 rounded-[10px] sm:h-20 sm:w-20" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-white/72 sm:text-lg">
                    {isEnglish ? "Do you manage a sports venue?" : "Esti administrator de baza sportiva?"}
                  </span>
                  <span className="mt-1 block text-xl font-bold sm:text-2xl">
                    {isEnglish ? "Open " : "Acceseaza "}
                    <span className="text-[#106dff]">SportMe Manager</span>
                  </span>
                  <span className="mt-2 hidden text-base leading-6 text-white/72 sm:block">
                    {isEnglish
                      ? "The complete platform for bookings, calendar and activities."
                      : "Platforma completa pentru administrarea rezervarilor, calendarului si activitatilor."}
                  </span>
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0b62df] sm:h-14 sm:w-14">
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </div>
        </div>
        <style jsx>{`
          .home-hero-copy {
            width: min(390px, calc(100vw - 40px));
          }

          @media (min-width: 640px) {
            .home-hero-copy {
              width: min(780px, calc(100vw - 64px));
            }
          }

          @media (min-width: 1024px) {
            .home-hero-copy {
              width: 780px;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
