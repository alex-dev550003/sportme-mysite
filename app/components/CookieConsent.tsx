"use client";

import { useEffect, useState } from "react";
import { useI18n } from "../app/i18n";
import {
  COOKIE_SETTINGS_OPEN_EVENT,
  applyGoogleConsent,
  getStoredCookieConsent,
  saveCookieConsent,
} from "../utils/consent";

export function CookieConsent() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedConsent = getStoredCookieConsent();

    if (storedConsent) {
      setAnalyticsEnabled(storedConsent.analytics);
      applyGoogleConsent(storedConsent.analytics);
    } else {
      setIsVisible(true);
    }

    const handleSettingsOpen = () => {
      const latestConsent = getStoredCookieConsent();
      setAnalyticsEnabled(latestConsent?.analytics ?? false);
      setShowPreferences(true);
      setIsVisible(true);
    };

    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleSettingsOpen);

    return () => {
      window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleSettingsOpen);
    };
  }, []);

  const closeAfterSave = (analytics: boolean) => {
    saveCookieConsent(analytics);
    setAnalyticsEnabled(analytics);
    setShowPreferences(false);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#d8d1bf] bg-white p-4 text-[#2f2f2b] shadow-[0_24px_70px_-32px_rgba(2,9,21,0.8)] sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d5f63]">SportMe</p>
            <h2 className="mt-1 text-lg font-semibold text-[#1f2c2d]">{t("cookieConsent.title")}</h2>
            <p className="mt-2 text-sm leading-6 text-[#5b564b]">{t("cookieConsent.body")}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
            <button
              type="button"
              className="rounded-xl bg-[#1d5f63] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#174d51]"
              onClick={() => closeAfterSave(true)}
            >
              {t("cookieConsent.acceptAll")}
            </button>
            <button
              type="button"
              className="rounded-xl border border-[#1d5f63] bg-white px-4 py-2 text-sm font-semibold text-[#1d5f63] transition hover:bg-[#eef7f6]"
              onClick={() => closeAfterSave(false)}
            >
              {t("cookieConsent.rejectAll")}
            </button>
            <button
              type="button"
              className="rounded-xl border border-[#d8d1bf] bg-[#f8f5ed] px-4 py-2 text-sm font-semibold text-[#5b564b] transition hover:bg-[#f2ecdf]"
              onClick={() => setShowPreferences((current) => !current)}
            >
              {t("cookieConsent.preferences")}
            </button>
          </div>
        </div>

        {showPreferences ? (
          <div className="mt-5 border-t border-[#e7e1d4] pt-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-[#d8d1bf] bg-[#fbfaf6] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1f2c2d]">{t("cookieConsent.necessaryTitle")}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5b564b]">{t("cookieConsent.necessaryBody")}</p>
                  </div>
                  <span className="rounded-full bg-[#dbe9e7] px-3 py-1 text-xs font-semibold text-[#1d5f63]">
                    {t("cookieConsent.statusRequired")}
                  </span>
                </div>
              </div>

              <label className="cursor-pointer rounded-xl border border-[#d8d1bf] bg-[#fbfaf6] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1f2c2d]">{t("cookieConsent.analyticsTitle")}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#5b564b]">{t("cookieConsent.analyticsBody")}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-[#1d5f63]"
                    checked={analyticsEnabled}
                    onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                  />
                </div>
              </label>
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                className="rounded-xl border border-[#d8d1bf] bg-white px-4 py-2 text-sm font-semibold text-[#5b564b] transition hover:bg-[#f8f5ed]"
                onClick={() => setShowPreferences(false)}
              >
                {t("common.close")}
              </button>
              <button
                type="button"
                className="rounded-xl bg-[#1d5f63] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#174d51]"
                onClick={() => closeAfterSave(analyticsEnabled)}
              >
                {t("cookieConsent.save")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
