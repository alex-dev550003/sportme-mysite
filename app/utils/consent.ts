"use client";

export const COOKIE_CONSENT_STORAGE_KEY = "sportme_public_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_CHANGE_EVENT = "sportme-cookie-consent-change";
export const COOKIE_SETTINGS_OPEN_EVENT = "sportme-cookie-settings-open";

export type CookieConsentState = {
  version: typeof COOKIE_CONSENT_VERSION;
  analytics: boolean;
  decidedAt: string;
};

type ConsentValue = "granted" | "denied";

type GoogleConsentModeValues = {
  analytics_storage: ConsentValue;
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function getGoogleConsentModeValues(analytics: boolean): GoogleConsentModeValues {
  return {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

export function getStoredCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as Partial<CookieConsentState>;

    if (
      parsed.version !== COOKIE_CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.decidedAt !== "string"
    ) {
      return null;
    }

    return {
      version: COOKIE_CONSENT_VERSION,
      analytics: parsed.analytics,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return getStoredCookieConsent()?.analytics === true;
}

export function applyGoogleConsent(analytics: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", getGoogleConsentModeValues(analytics));
}

export function saveCookieConsent(analytics: boolean) {
  if (typeof window === "undefined") {
    return null;
  }

  const state: CookieConsentState = {
    version: COOKIE_CONSENT_VERSION,
    analytics,
    decidedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
  applyGoogleConsent(analytics);
  window.dispatchEvent(new CustomEvent<CookieConsentState>(COOKIE_CONSENT_CHANGE_EVENT, { detail: state }));

  return state;
}

export function openCookieSettings() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_SETTINGS_OPEN_EVENT));
}
