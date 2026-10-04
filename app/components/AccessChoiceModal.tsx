"use client";

import Image from "next/image";
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
  description: string;
  icon: "desktop" | "mobile";
  actions: Action[];
};

type Props = {
  onClose: () => void;
  logoSrc: string;
  title: string;
  subtitle: string;
  closeLabel: string;
  sections: Section[];
};

function WebIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0 text-[#ff5000]`} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 shrink-0 transition group-hover:scale-105">
      <polygon points="3,2 14,12 3,22" fill="#34a853" />
      <polygon points="3,2 21,12 14,12" fill="#fbbc05" />
      <polygon points="3,22 21,12 14,12" fill="#ea4335" />
      <polygon points="8,6.5 14,12 8,17.5 12,12" fill="#4285f4" />
    </svg>
  );
}

function AppleStoreIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 shrink-0 fill-[#171b26] transition group-hover:scale-105">
      <path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" />
    </svg>
  );
}

function DeviceIcon({ type }: { type: Section["icon"] }) {
  if (type === "desktop") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-[#ff5000]" fill="none" stroke="currentColor" strokeWidth="1.9">
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

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      ? "bg-[#dbeee9] text-[#087f49] before:bg-[#16a34a]"
      : "bg-[#eef2f6] text-[#7b8493] before:bg-[#9aa6b5]";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] ${toneClass} before:h-1.5 before:w-1.5 before:rounded-full`}>
      {status.label}
    </span>
  );
}

function ActionRow({ action }: { action: Action }) {
  const content = (
    <>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${action.icon === "web" ? "bg-[#fff0e7]" : "bg-[#eef4fb]"}`}>
        <ActionIcon icon={action.icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5 text-left leading-tight">
        <span className="text-[11px] font-normal text-[#7a8392]">{action.eyebrow}</span>
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-[16px] font-medium tracking-normal text-[#182032] sm:text-[18px]">{action.title}</span>
          {action.status ? <StatusPill status={action.status} /> : null}
        </span>
      </span>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${action.disabled ? "bg-[#eef1f5] text-[#9aa4b2]" : "bg-[#fff0e7] text-[#ff5000] group-hover:bg-[#ff5000] group-hover:text-white"}`}>
        <ArrowIcon />
      </span>
    </>
  );

  const className =
    "manager-access-action group flex min-h-[68px] w-full items-center gap-3 rounded-[17px] border border-[#dce2e9] bg-white px-3 py-2.5 text-[#182032] shadow-[0_5px_14px_rgba(39,51,71,0.07)] transition hover:-translate-y-0.5 hover:border-[#ffb99a] hover:shadow-[0_9px_20px_rgba(255,80,0,0.1)]";

  if (action.disabled || !action.href) {
    return <div className={`${className} cursor-not-allowed opacity-70`}>{content}</div>;
  }

  return (
    <button type="button" className={className} onClick={() => void openExternal(action.href!)}>
      {content}
    </button>
  );
}

export default function AccessChoiceModal({ onClose, logoSrc, title, subtitle, closeLabel, sections }: Props) {
  return (
    <div className="fixed inset-0 isolate z-[999] flex items-center justify-center overflow-y-auto bg-[#111827]/70 px-4 py-4 font-sans backdrop-blur-[6px]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="access-choice-title">
      <div
        className="manager-access-modal sportme-access-modal relative z-[1000] max-h-[calc(100dvh-24px)] w-full max-w-[480px] overflow-y-auto rounded-[28px] p-5 text-[#182032] shadow-[0_30px_80px_rgba(12,22,39,0.28)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="manager-access-close absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#d5dce6] bg-white text-[#182032] shadow-sm transition hover:bg-[#fff3ec] sm:right-5 sm:top-5"
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col items-center text-center">
          <span className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-white p-1 shadow-[0_10px_24px_rgba(44,55,76,0.16)] sm:h-14 sm:w-14">
            <Image src={logoSrc} alt="" width={48} height={48} className="h-full w-full rounded-[11px] object-cover" />
          </span>
          <div className="mt-2.5">
            <p className="sportme-access-eyebrow text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff5000]">SportMe</p>
            <h2 id="access-choice-title" className="mt-1 text-[25px] font-normal leading-tight tracking-[-0.025em] text-[#182032] sm:text-[28px]">{title}</h2>
            <p className="sportme-access-muted mx-auto mt-1.5 max-w-[330px] text-[13px] font-normal leading-[1.35] text-[#667184] sm:text-[14px]">{subtitle}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {sections.map((section, index) => (
            <section key={section.label} className={`rounded-[21px] border p-3.5 sm:p-4 ${section.icon === "desktop" ? "border-[#ffd4bf] bg-[#fff5ee]" : "border-[#d9e1eb] bg-[#f1f4f8]"}`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-white shadow-[0_2px_7px_rgba(24,32,50,0.06)]">
                  <DeviceIcon type={section.icon} />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#242936]">{section.label}</h3>
                  <p className="sportme-access-muted mt-0.5 text-[11px] leading-[1.2] text-[#68758a] sm:text-[12px]">{section.description}</p>
                </div>
                <span className="text-[11px] font-medium text-[#a4adba]">0{index + 1}</span>
              </div>
              <div className="mt-3 space-y-2">
                {section.actions.map((action) => (
                  <ActionRow key={`${section.label}-${action.title}`} action={action} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
