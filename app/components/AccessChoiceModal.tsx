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

function WebIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0 text-[#1877f2]`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 shrink-0 transition group-hover:scale-105">
      <polygon points="3,2 14,12 3,22" fill="#34a853" />
      <polygon points="3,2 21,12 14,12" fill="#fbbc05" />
      <polygon points="3,22 21,12 14,12" fill="#ea4335" />
      <polygon points="8,6.5 14,12 8,17.5 12,12" fill="#4285f4" />
    </svg>
  );
}

function AppleStoreIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-8 w-8 shrink-0 fill-[#171b26] transition group-hover:scale-105">
      <path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" />
    </svg>
  );
}

function DeviceIcon({ type }: { type: Section["icon"] }) {
  if (type === "desktop") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="4" y="5" width="16" height="11" rx="1.7" />
        <path d="M9 20h6M12 16v4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-[#1877f2]" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#1877f2]" fill="currentColor">
      <path d="M12 2.4 5 5.1v5.5c0 4.7 2.9 8.9 7 10.6 4.1-1.7 7-5.9 7-10.6V5.1l-7-2.7Zm3.4 7.6-4.1 4.1-1.9-1.9 1.1-1.1.8.8 3-3 1.1 1.1Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0 text-[#1877f2]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] ${toneClass} before:h-1.5 before:w-1.5 before:rounded-full`}>
      {status.label}
    </span>
  );
}

function ActionRow({ action }: { action: Action }) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <ActionIcon icon={action.icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left leading-tight">
        <span className="text-[11px] font-medium tracking-[0.08em] text-[#6d7280]">{action.eyebrow}</span>
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-[19px] font-extrabold tracking-normal text-[#171b26] sm:text-[21px]">{action.title}</span>
          {action.status ? <StatusPill status={action.status} /> : null}
        </span>
      </span>
      <ArrowIcon />
    </>
  );

  const className =
    "group flex min-h-[72px] w-full items-center gap-4 rounded-[18px] border border-[#dde2ea] bg-white/88 px-4 py-3.5 text-[#171b26] shadow-[0_14px_34px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-[#b9d6ff] hover:bg-white hover:shadow-[0_18px_44px_rgba(24,119,242,0.11)]";

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
    <div className="fixed inset-0 isolate z-[999] flex items-start justify-center overflow-y-auto bg-black/82 px-4 py-5 backdrop-blur-[5px] sm:items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="manager-access-modal relative z-[1000] w-full max-w-[520px] rounded-[24px] border border-white/80 bg-[radial-gradient(circle_at_20%_0%,_#ffffff_0%,_#f7f9fc_50%,_#edf3fb_100%)] px-4 py-5 text-[#171b26] shadow-[0_28px_80px_rgba(0,0,0,0.38)] sm:rounded-[26px] sm:px-8 sm:py-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#d9dee7] bg-white/45 text-[#171b26] shadow-sm transition hover:bg-white sm:right-6 sm:top-6"
        >
          <CloseIcon />
        </button>

        <div className="flex items-start gap-4 pr-11 sm:gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-white shadow-[0_12px_28px_rgba(24,119,242,0.18)] sm:h-16 sm:w-16">
            <img src={logoSrc} alt="" className="h-full w-full object-cover" />
          </span>
          <div>
            <p className="text-[24px] font-extrabold leading-none tracking-normal text-[#171b26] sm:text-[30px]">{title}</p>
            <p className="mt-2 max-w-[330px] text-[14px] font-medium leading-[1.35] text-[#6a7080] sm:text-[16px]">{subtitle}</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {sections.map((section, index) => (
            <section key={section.label} className={index > 0 ? "border-t border-[#dce1e9] pt-5" : ""}>
              <div className="mb-3 flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e6f2ff]">
                  <DeviceIcon type={section.icon} />
                </span>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-[#242936]">{section.label}</p>
              </div>
              <div className="space-y-3">
                {section.actions.map((action) => (
                  <ActionRow key={`${section.label}-${action.title}`} action={action} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-[15px] bg-[#e8f3ff] px-4 py-3.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
          <ShieldIcon />
          <p className="text-[12px] font-medium leading-snug text-[#374151] sm:text-[13px]">
            <span className="block font-extrabold text-[#2d3340]">{safetyTitle}</span>
            {safetyBody}
          </p>
        </div>

        <button type="button" onClick={() => void openExternal(loginUrl)} className="mx-auto mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#6c7280] sm:text-[14px]">
          <span>{loginLabel}</span>
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
