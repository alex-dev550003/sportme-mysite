"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useState } from "react";
import { GA_MEASUREMENT_ID, trackPageView } from "../utils/analytics";
import { COOKIE_CONSENT_CHANGE_EVENT, applyGoogleConsent, hasAnalyticsConsent } from "../utils/consent";

function GoogleAnalyticsPageViews({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const queryString = searchParams.toString();
    trackPageView(queryString ? `${pathname}?${queryString}` : pathname);
  }, [enabled, pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      const allowed = hasAnalyticsConsent();
      applyGoogleConsent(allowed);
      setAnalyticsEnabled(allowed);
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
    };
  }, []);

  if (!analyticsEnabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="sportme-ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageViews enabled={analyticsEnabled} />
      </Suspense>
    </>
  );
}
