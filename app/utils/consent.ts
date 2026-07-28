"use client";

export const COOKIE_CONSENT_STORAGE_KEY = "sportme_public_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_CHANGE_EVENT = "sportme-cookie-consent-change";
export const COOKIE_SETTINGS_OPEN_EVENT = "sportme-cookie-settings-open";

const GOOGLE_ANALYTICS_COOKIE_NAMES = ["_ga", "_ga_RLVDZPWDJL"];

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
    if (!analytics) {
      deleteGoogleAnalyticsCookies();
    }

    return;
  }

  window.gtag("consent", "update", getGoogleConsentModeValues(analytics));

  if (!analytics) {
    deleteGoogleAnalyticsCookies();
  }
}

function getCookieDeletionDomains() {
  const hostname = window.location.hostname;
  const domains = new Set<string | null>([null, hostname, `.${hostname}`]);

  if (hostname === "sportme.ro" || hostname.endsWith(".sportme.ro")) {
    domains.add("sportme.ro");
    domains.add(".sportme.ro");
  }

  return Array.from(domains);
}

function deleteGoogleAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const maxAge = "Max-Age=0";
  const cookieNames = new Set([
    ...GOOGLE_ANALYTICS_COOKIE_NAMES,
    ...document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => name.startsWith("_ga")),
  ]);

  for (const name of cookieNames) {
    for (const domain of getCookieDeletionDomains()) {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; ${expires}; ${maxAge}; path=/${domainPart}`;
    }
  }
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
