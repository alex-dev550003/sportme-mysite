import type { Metadata } from "next";
import { AboutDeferredLoader } from "./about/AboutDeferredLoader";
import { AboutHero } from "./about/AboutHero";

const title = "SportMe - Rezervă terenuri sportive rapid";
const description =
  "SportMe te ajută să găsești, să verifici disponibilitatea și să rezervi rapid terenuri sportive pentru fotbal, tenis, padel, squash și alte sporturi.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "SportMe",
    "rezervare terenuri sportive",
    "rezervari terenuri fotbal",
    "rezervari tenis",
    "rezervari padel",
    "rezervari squash",
    "terenuri sportive",
    "aplicatie sport",
  ],
  alternates: {
    canonical: "https://www.sportme.ro/",
  },
  openGraph: {
    title,
    description,
    url: "https://www.sportme.ro/",
    siteName: "SportMe",
    type: "website",
    locale: "ro_RO",
    images: [
      {
        url: "https://www.sportme.ro/og-image.png",
        width: 1200,
        height: 630,
        alt: "SportMe - rezervari terenuri sportive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.sportme.ro/og-image.png"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SportMe",
    url: "https://www.sportme.ro/",
    logo: "https://www.sportme.ro/logo-512.png",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SportMe",
    url: "https://www.sportme.ro/",
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "SportMe",
    url: "https://www.sportme.ro/",
    applicationCategory: "SportsApplication",
    operatingSystem: "Android, iOS",
  },
];

export default function RootPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7] text-[#1f211f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floaty {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes drift {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(12px);
          }
          100% {
            transform: translateX(0px);
          }
        }
        .about-dark-section {
          background:
            linear-gradient(180deg, #020814 0%, #030b18 46%, #06101f 100%);
        }
        .about-glass-card {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.075);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-glass-tile {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.055);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
        .about-glass-tile p {
          color: rgba(255, 255, 255, 0.78) !important;
        }
        .about-glass-tile p.font-semibold {
          color: rgba(255, 255, 255, 0.94) !important;
        }
        .about-section-kicker {
          color: rgba(255, 255, 255, 0.58);
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .about-section-title {
          color: rgba(255, 255, 255, 0.96);
          font-weight: 700;
        }
        .about-section-title .accent {
          color: #106dff;
        }
        .about-dark-section .bg-white,
        .about-dark-section .bg-\\[\\#f1f2f4\\],
        .about-dark-section .bg-\\[\\#f4f7ff\\] {
          background: rgba(255, 255, 255, 0.075) !important;
          border-color: rgba(255, 255, 255, 0.14) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.22) !important;
          backdrop-filter: blur(18px);
        }
        .about-dark-section .text-\\[\\#1f211f\\],
        .about-dark-section .text-\\[\\#2a2d33\\] {
          color: rgba(255, 255, 255, 0.96) !important;
        }
        .about-dark-section .text-\\[\\#5b564b\\],
        .about-dark-section .text-\\[\\#7a7566\\] {
          color: rgba(255, 255, 255, 0.68) !important;
        }
        .about-dark-section footer {
          border-color: rgba(255, 255, 255, 0.14) !important;
          background: rgba(255, 255, 255, 0.075) !important;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-dark-section .border-\\[\\#d8d1bf\\],
        .about-dark-section .border-\\[\\#e6e0d2\\] {
          border-color: rgba(255, 255, 255, 0.14) !important;
        }
        .about-dark-section .shadow-\\[0_25px_50px_-40px_rgba\\(32\\,33\\,31\\,0\\.6\\)\\] {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 24px 60px rgba(0, 0, 0, 0.24) !important;
        }
      `,
        }}
      />
      <div className="relative overflow-hidden">
        <AboutHero />
        <AboutDeferredLoader />
      </div>
    </main>
  );
}
