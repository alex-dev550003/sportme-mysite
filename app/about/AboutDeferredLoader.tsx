"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AboutDeferredSections = dynamic(() => import("./AboutDeferredSections"), {
  ssr: false,
  loading: () => <div className="mx-auto h-[360px] w-full max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.035]" aria-hidden="true" />,
});

export function AboutDeferredLoader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "0px" }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const loadDeferredSections = () => setShouldLoad(true);

    if (window.location.hash === "#pentru-jucatori" || window.location.hash === "#pentru-administratori") {
      loadDeferredSections();
    }

    window.addEventListener("sportme:load-deferred-sections", loadDeferredSections);
    window.addEventListener("hashchange", loadDeferredSections);
    return () => {
      window.removeEventListener("sportme:load-deferred-sections", loadDeferredSections);
      window.removeEventListener("hashchange", loadDeferredSections);
    };
  }, []);

  return (
    <div ref={rootRef} className="about-dark-section w-full px-5 py-12 lg:py-16">
      {shouldLoad ? <AboutDeferredSections /> : <div className="mx-auto h-[360px] w-full max-w-7xl rounded-[28px] border border-white/10 bg-white/[0.035]" aria-hidden="true" />}
    </div>
  );
}
