"use client";

import { hasAnalyticsConsent } from "./consent";

export const GA_MEASUREMENT_ID = "G-RLVDZPWDJL";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function trackEvent(eventName: string, parameters?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !hasAnalyticsConsent()) {
    return;
  }

  window.gtag("event", eventName, parameters ?? {});
}

export function trackPageView(path: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function" || !hasAnalyticsConsent()) {
    return;
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

  const pageViewParameters: Record<string, string> = {
    send_to: GA_MEASUREMENT_ID,
    page_path: path,
    page_location: new URL(path, window.location.origin).toString(),
  };

  if (document.title) {
    pageViewParameters.page_title = document.title;
  }

  window.gtag("event", "page_view", pageViewParameters);
}
