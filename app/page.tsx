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
    <main className="min-h-screen bg-[#eef1f5] text-[#1f211f]">
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
        @keyframes appPreviewFloat {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .about-dark-section {
          background:
            radial-gradient(circle at 13% 8%, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0) 30%),
            linear-gradient(180deg, #e9edf3 0%, #dfe5ec 48%, #ebeff4 100%);
          color: #182032;
          font-family: "Geist Variable", var(--font-geist), ui-sans-serif, system-ui, sans-serif;
        }
        .about-dark-section * {
          font-family: inherit;
        }
        .about-glass-card {
          border: 1px solid rgba(215, 220, 228, 0.92);
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 22px 54px rgba(44, 55, 76, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-glass-tile {
          border: 1px solid rgba(215, 220, 228, 0.86);
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 14px 32px rgba(44, 55, 76, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.88);
        }
        .about-glass-tile p {
          color: rgba(24, 32, 50, 0.64) !important;
        }
        .about-glass-tile p.font-semibold {
          color: rgba(24, 32, 50, 0.96) !important;
        }
        .about-no-card {
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .about-no-card p {
          color: rgba(24, 32, 50, 0.64) !important;
        }
        .about-no-card h2,
        .about-no-card h3 {
          color: #182032 !important;
        }
        .about-section-kicker {
          color: rgba(24, 32, 50, 0.52);
          letter-spacing: 0;
          text-transform: uppercase;
          font-weight: 700;
        }
        .about-section-title {
          color: #182032;
          font-weight: 500;
        }
        .about-section-title .accent {
          color: #0d64d8;
        }
        .about-dark-section .bg-white,
        .about-dark-section .bg-\\[\\#f1f2f4\\],
        .about-dark-section .bg-\\[\\#f4f7ff\\] {
          background: rgba(255, 255, 255, 0.74) !important;
          border-color: rgba(215, 220, 228, 0.9) !important;
          box-shadow: 0 18px 44px rgba(44, 55, 76, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(18px);
        }
        .about-dark-section .text-white,
        .about-dark-section .text-white\\/96,
        .about-dark-section .text-white\\/90,
        .about-dark-section .text-white\\/86 {
          color: #182032 !important;
        }
        .about-dark-section .text-white\\/78,
        .about-dark-section .text-white\\/72,
        .about-dark-section .text-white\\/64,
        .about-dark-section .text-white\\/48,
        .about-dark-section .text-white\\/42 {
          color: rgba(24, 32, 50, 0.62) !important;
        }
        .about-dark-section .text-\\[\\#1f211f\\],
        .about-dark-section .text-\\[\\#2a2d33\\] {
          color: #182032 !important;
        }
        .about-dark-section .text-\\[\\#5b564b\\],
        .about-dark-section .text-\\[\\#7a7566\\] {
          color: rgba(24, 32, 50, 0.62) !important;
        }
        .about-dark-section .bg-\\[\\#111c25\\] {
          background: rgba(255, 255, 255, 0.82) !important;
          border-color: rgba(215, 220, 228, 0.94) !important;
          box-shadow: 0 20px 48px rgba(44, 55, 76, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92) !important;
        }
        .about-dark-section .border-white\\/12,
        .about-dark-section .border-white\\/10,
        .about-dark-section .border-white\\/20 {
          border-color: rgba(24, 32, 50, 0.1) !important;
        }
        .about-dark-section .bg-white\\/\\[0\\.08\\],
        .about-dark-section .bg-white\\/\\[0\\.085\\],
        .about-dark-section .hover\\:bg-white\\/\\[0\\.11\\]:hover {
          background: rgba(255, 255, 255, 0.66) !important;
        }
        .about-dark-section .bg-\\[\\#06245a\\]\\/88 {
          background: #182032 !important;
          color: #ffffff !important;
          border-color: rgba(24, 32, 50, 0.2) !important;
          box-shadow: 0 14px 30px rgba(24, 32, 50, 0.18) !important;
        }
        .about-dark-section .text-\\[\\#72b4ff\\] {
          color: #ffffff !important;
        }
        .about-dark-section .manager-access-modal {
          color: #1f211f !important;
        }
        .about-dark-section .manager-access-modal.bg-\\[radial-gradient\\(circle_at_top_right\\,_\\#ffffff_0\\%\\,_\\#f3f4f6_62\\%\\,_\\#eceff3_100\\%\\)\\] {
          background: radial-gradient(circle at top right, #ffffff 0%, #f3f4f6 62%, #eceff3 100%) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .about-dark-section .manager-access-modal .bg-white {
          background: #ffffff !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-color: #d8d1bf !important;
          box-shadow: none !important;
        }
        .about-dark-section .manager-access-modal .text-\\[\\#1f211f\\],
        .about-dark-section .manager-access-modal .text-\\[\\#2a2d33\\] {
          color: #1f211f !important;
        }
        .about-dark-section .manager-access-modal .text-\\[\\#5b564b\\],
        .about-dark-section .manager-access-modal .text-\\[\\#4b5563\\] {
          color: #5b564b !important;
        }
        .about-dark-section .manager-access-modal p,
        .about-dark-section .manager-access-modal button {
          color: #1f211f !important;
        }
        .about-dark-section .manager-access-modal p.text-sm {
          color: #5b564b !important;
        }
        .about-dark-section .manager-access-modal .text-\\[\\#2e7d44\\] {
          color: #2e7d44 !important;
        }
        .about-dark-section .manager-access-modal .text-\\[\\#a63b3b\\] {
          color: #a63b3b !important;
        }
        .about-dark-section footer {
          border-color: rgba(215, 220, 228, 0.92) !important;
          background: rgba(255, 255, 255, 0.74) !important;
          box-shadow: 0 22px 54px rgba(44, 55, 76, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92) !important;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .about-dark-section .border-\\[\\#d8d1bf\\],
        .about-dark-section .border-\\[\\#e6e0d2\\] {
          border-color: rgba(215, 220, 228, 0.92) !important;
        }
        .about-dark-section .shadow-\\[0_25px_50px_-40px_rgba\\(32\\,33\\,31\\,0\\.6\\)\\] {
          box-shadow: 0 22px 54px rgba(44, 55, 76, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.92) !important;
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
