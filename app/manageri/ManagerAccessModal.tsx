"use client";

import { useI18n } from "../app/i18n";
import { openExternal } from "../utils/openExternal";

type Props = {
  onClose: () => void;
  adminUrl: string;
  managerPlayStoreUrl: string;
};

export default function ManagerAccessModal({ onClose, adminUrl, managerPlayStoreUrl }: Props) {
  const { t } = useI18n();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="manager-access-modal w-full max-w-3xl rounded-[28px] border border-[#d8d1bf] bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_#f3f4f6_62%,_#eceff3_100%)] p-5 shadow-[0_30px_80px_-38px_rgba(32,33,31,0.9)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[9px] bg-white shadow-sm">
              <img src="/logo-512admin.png" alt="" className="h-full w-full object-cover" />
            </span>
            <div>
              <p className="text-[19px] font-semibold leading-tight text-[#1f211f]">SportMe Manager</p>
              <p className="text-sm text-[#5b564b]">{t("pricing.signupModal.subtitle")}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#d8d1bf] bg-white px-2.5 py-1 text-xs font-semibold text-[#1f211f] hover:bg-[#f3f1e8]"
          >
            {t("common.close")}
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8d1bf] bg-white px-4 py-3 text-[#2a2d33] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f9fafb]"
              onClick={() => void openExternal(managerPlayStoreUrl)}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0 transition group-hover:scale-110">
                <polygon points="3,2 14,12 3,22" fill="#34a853" />
                <polygon points="3,2 21,12 14,12" fill="#fbbc05" />
                <polygon points="3,22 21,12 14,12" fill="#ea4335" />
                <polygon points="8,6.5 14,12 8,17.5 12,12" fill="#4285f4" />
              </svg>
              <span className="flex min-w-0 flex-col items-start leading-tight">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#4b5563]">Get it on</span>
                <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-[#2a2d33]">Google Play</span>
              </span>
            </button>
            <span className="rounded-full border border-[#b7dfc2] bg-[#e8f8ed] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2e7d44]">
              {t("about.cta.live")}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[#d8d1bf] bg-white px-4 py-3 text-[#2a2d33] opacity-95">
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-[#2f3440]">
                <path d="M18.71 19.5c-.83 1.24-1.74 2.48-3.1 2.5-1.21.02-1.6-.72-3.01-.72-1.41 0-1.84.7-2.95.74-1.3.05-2.3-1.32-3.13-2.55-1.7-2.52-3-7.12-1.25-10.16.88-1.5 2.45-2.45 4.16-2.48 1.16-.02 2.26.79 3.01.79.75 0 2.16-.98 3.64-.84.62.03 2.37.25 3.49 1.89-.09.06-2.08 1.21-2.06 3.6.03 2.86 2.5 3.81 2.53 3.82-.02.07-.39 1.35-1.33 2.41zM14.84 4.36c.69-.84 1.16-2.01 1.03-3.18-.99.04-2.19.66-2.9 1.5-.64.74-1.2 1.94-1.05 3.08 1.11.09 2.23-.56 2.92-1.4z" />
              </svg>
              <span className="flex min-w-0 flex-col items-start leading-tight">
                <span className="text-[9.5px] font-semibold tracking-[0.04em] text-[#4b5563]">Download on the</span>
                <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-[#2a2d33]">App Store</span>
              </span>
            </div>
            <span className="rounded-full border border-[#efb1b1] bg-[#ffe8e8] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#a63b3b]">
              {t("about.cta.soon")}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d8d1bf] bg-white px-4 py-3 text-[#2a2d33] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f9fafb]"
              onClick={() => void openExternal(adminUrl)}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-[#1877F2] transition group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8M3.6 15h16.8M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9" />
              </svg>
              <span className="flex min-w-0 flex-col items-start leading-tight">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#4b5563]">Open in</span>
                <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-[#2a2d33]">Web Browser</span>
              </span>
            </button>
            <span className="rounded-full border border-[#b7dfc2] bg-[#e8f8ed] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#2e7d44]">
              {t("about.cta.live")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
