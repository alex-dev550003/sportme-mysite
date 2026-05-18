"use client";

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

export default function HomeLandingPage() {
  return (
    <main className="min-h-screen bg-[#020915] text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col lg:grid lg:grid-cols-[minmax(390px,0.86fr)_minmax(420px,0.64fr)] lg:items-center lg:gap-10 lg:px-10 lg:py-10 xl:gap-16">
        <div className="relative mx-auto aspect-[2/3] min-h-screen w-full max-w-[520px] overflow-hidden bg-[#020915] shadow-[0_30px_90px_rgba(0,0,0,0.55)] lg:min-h-0 lg:rounded-[34px] lg:ring-1 lg:ring-white/12">
          <img
            src="/home/sportme-home-mobile.png"
            alt="SportMe - rezervari rapide pentru terenuri sportive"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <a
            href={googlePlayUrl}
            className="absolute left-[7.2%] top-[59.8%] h-[7.1%] w-[85.6%] rounded-full"
            aria-label="Descarca SportMe din Google Play"
          />
          <a
            href={appStoreFallbackUrl}
            className="absolute left-[7.2%] top-[68%] h-[7.1%] w-[85.6%] rounded-full"
            aria-label="Descarca SportMe din App Store"
          />
          <a
            href={managerUrl}
            className="absolute left-[7.2%] top-[78.1%] h-[14.7%] w-[85.6%] rounded-[28px]"
            aria-label="Acceseaza SportMe Manager"
          />
        </div>

        <div className="hidden lg:block">
          <div className="mb-10 flex items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <img src="/logo-512.png" alt="" className="h-16 w-16 rounded-[16px] shadow-[0_12px_30px_rgba(0,93,255,0.35)]" />
              <span className="text-5xl font-bold tracking-normal">SportMe</span>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#176fff]/55 bg-white/[0.06] px-6 py-3 text-xl font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
              <ShieldIcon />
              <span>Partener oficial</span>
            </div>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-7xl font-bold leading-[0.98] tracking-normal">
              Rezerva rapid prin <span className="text-[#106dff]">SportMe</span>
            </h1>
            <p className="mt-7 max-w-xl text-2xl leading-9 text-white/78">
              Verifica disponibilitatea si rezerva terenuri sportive in cateva secunde.
            </p>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-white/16 text-center">
            {[
              ["Rezervari", "rapide"],
              ["Disponibilitate", "in timp real"],
              ["Fara apeluri,", "fara stres"],
            ].map(([line1, line2]) => (
              <div key={line1} className="px-5">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#176fff] bg-black/20 text-white shadow-[0_0_28px_rgba(0,93,255,0.28)]">
                  <ShieldIcon />
                </div>
                <p className="text-xl font-semibold leading-7">
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-2xl space-y-4">
            <a
              href={googlePlayUrl}
              className="flex h-20 items-center justify-center gap-5 rounded-full bg-[#0564ff] px-8 text-3xl font-semibold shadow-[0_20px_48px_rgba(0,93,255,0.42)] hover:bg-[#1472ff]"
            >
              <AndroidIcon />
              <span>Descarca din Google Play</span>
            </a>
            <a
              href={appStoreFallbackUrl}
              className="flex h-20 items-center justify-center gap-5 rounded-full border border-white/38 bg-black/20 px-8 text-3xl font-semibold hover:border-white/58 hover:bg-white/8"
            >
              <AppleIcon />
              <span>Descarca din App Store</span>
            </a>
          </div>

          <a
            href={managerUrl}
            className="mt-10 flex max-w-2xl items-center gap-7 rounded-[28px] border border-white/10 bg-white/[0.07] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur hover:bg-white/[0.1]"
          >
            <img src="/logo-512admin.png" alt="" className="h-24 w-24 rounded-[12px]" />
            <span className="min-w-0 flex-1">
              <span className="block text-xl text-white/72">Esti administrator de baza sportiva?</span>
              <span className="mt-2 block text-3xl font-bold">
                Acceseaza <span className="text-[#106dff]">SportMe Manager</span>
              </span>
              <span className="mt-2 block text-lg leading-7 text-white/70">
                Platforma completa pentru administrarea rezervarilor, calendarului si activitatilor.
              </span>
            </span>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#0b62df]">
              <ArrowIcon />
            </span>
          </a>

          <div className="mt-9 flex items-center justify-center gap-3 text-xl font-medium text-white/58">
            <ShieldIcon />
            <span>Sigur. Rapid. Creat pentru sport.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
