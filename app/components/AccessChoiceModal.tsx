"use client";

import { openExternal } from "../utils/openExternal";

type Action = {
  title: string;
  eyebrow: string;
  icon: "web" | "googlePlay" | "appStore";
  href?: string;
  status?: {
    label: string;
    tone: "live" | "soon";
  };
  disabled?: boolean;
};

type Section = {
  label: string;
  icon: "desktop" | "mobile";
  actions: Action[];
};

type Props = {
  onClose: () => void;
  logoSrc: string;
  title: string;
  subtitle: string;
  safetyTitle: string;
  safetyBody: string;
  loginLabel: string;
  loginUrl: string;
  sections: Section[];
};

function WebIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0 text-[#1877f2]`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-10 w-10 shrink-0 transition group-hover:scale-105">
      <polygon points="3,2 14,12 3,22" fill="#34a853" />
      <polygon points="3,2 21,12 14,12" fill="#fbbc05" />
      <polygon points="3,22 21,12 14,12" fill="#ea4335" />
      <polygon points="8,6.5 14,12 8,17.5 12,12" fill="#4285f4" />
    </svg>
  );
}

function AppleStoreIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-10 w-10 shrink-0 fill-[#171b26] transition group-hover:scale-105">
      <path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" />
    </svg>
  );
}

function DeviceIcon({ type }: { type: Section["icon"] }) {
  if (type === "desktop") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="4" y="5" width="16" height="11" rx="1.7" />
        <path d="M9 20h6M12 16v4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 shrink-0 text-[#1877f2]" fill="currentColor">
      <path d="M12 2.4 5 5.1v5.5c0 4.7 2.9 8.9 7 10.6 4.1-1.7 7-5.9 7-10.6V5.1l-7-2.7Zm3.4 7.6-4.1 4.1-1.9-1.9 1.1-1.1.8.8 3-3 1.1 1.1Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0 text-[#1877f2]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ActionIcon({ icon }: { icon: Action["icon"] }) {
  if (icon === "web") return <WebIcon />;
  if (icon === "googlePlay") return <GooglePlayIcon />;
  return <AppleStoreIcon />;
}

function StatusPill({ status }: { status: NonNullable<Action["status"]> }) {
  const toneClass =
    status.tone === "live"
      ? "bg-[#e9f3fb] text-[#179c59] before:bg-[#22c55e]"
      : "bg-[#fff1e9] text-[#b75b22] before:bg-[#f97316]";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${toneClass} before:h-1.5 before:w-1.5 before:rounded-full`}>
      {status.label}
    </span>
  );
}

function ActionRow({ action }: { action: Action }) {
  const content = (
    <>
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <ActionIcon icon={action.icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left leading-tight">
        <span className="text-[14px] font-medium tracking-[0.08em] text-[#6d7280]">{action.eyebrow}</span>
        <span className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="text-[24px] font-extrabold tracking-normal text-[#171b26] sm:text-[28px]">{action.title}</span>
          {action.status ? <StatusPill status={action.status} /> : null}
        </span>
      </span>
      <ArrowIcon />
    </>
  );

  const className =
    "group flex min-h-[104px] w-full items-center gap-5 rounded-[24px] border border-[#dde2ea] bg-white/88 px-6 py-5 text-[#171b26] shadow-[0_16px_44px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-[#b9d6ff] hover:bg-white hover:shadow-[0_22px_56px_rgba(24,119,242,0.12)]";

  if (action.disabled || !action.href) {
    return <div className={`${className} cursor-not-allowed opacity-70`}>{content}</div>;
  }

  return (
    <button type="button" className={className} onClick={() => void openExternal(action.href!)}>
      {content}
    </button>
  );
}

export default function AccessChoiceModal({ onClose, logoSrc, title, subtitle, safetyTitle, safetyBody, loginLabel, loginUrl, sections }: Props) {
  return (
    <div className="fixed inset-0 isolate z-[999] flex items-start justify-center overflow-y-auto bg-black/82 px-4 py-6 backdrop-blur-[5px] sm:items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="manager-access-modal relative z-[1000] w-full max-w-[760px] rounded-[30px] border border-white/80 bg-[radial-gradient(circle_at_20%_0%,_#ffffff_0%,_#f7f9fc_50%,_#edf3fb_100%)] px-5 py-6 text-[#171b26] shadow-[0_34px_100px_rgba(0,0,0,0.42)] sm:rounded-[34px] sm:px-12 sm:py-11"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d9dee7] bg-white/45 text-[#171b26] shadow-sm transition hover:bg-white sm:right-8 sm:top-8"
        >
          <CloseIcon />
        </button>

        <div className="flex items-start gap-5 pr-14 sm:gap-6">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-white shadow-[0_14px_34px_rgba(24,119,242,0.2)] sm:h-24 sm:w-24">
            <img src={logoSrc} alt="" className="h-full w-full object-cover" />
          </span>
          <div className="pt-1">
            <p className="text-[30px] font-extrabold leading-none tracking-normal text-[#171b26] sm:text-[42px]">{title}</p>
            <p className="mt-3 max-w-[430px] text-[18px] font-medium leading-[1.35] text-[#6a7080] sm:text-[22px]">{subtitle}</p>
          </div>
        </div>

        <div className="mt-9 space-y-8">
          {sections.map((section, index) => (
            <section key={section.label} className={index > 0 ? "border-t border-[#dce1e9] pt-7" : ""}>
              <div className="mb-4 flex items-center gap-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e6f2ff]">
                  <DeviceIcon type={section.icon} />
                </span>
                <p className="text-[15px] font-extrabold uppercase tracking-[0.34em] text-[#242936]">{section.label}</p>
              </div>
              <div className="space-y-4">
                {section.actions.map((action) => (
                  <ActionRow key={`${section.label}-${action.title}`} action={action} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-[18px] bg-[#e8f3ff] px-6 py-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
          <ShieldIcon />
          <p className="text-[15px] font-medium leading-snug text-[#374151]">
            <span className="block font-extrabold text-[#2d3340]">{safetyTitle}</span>
            {safetyBody}
          </p>
        </div>

        <button type="button" onClick={() => void openExternal(loginUrl)} className="mx-auto mt-7 flex items-center justify-center gap-3 text-[16px] font-semibold text-[#6c7280]">
          <span>{loginLabel}</span>
          <ArrowIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
