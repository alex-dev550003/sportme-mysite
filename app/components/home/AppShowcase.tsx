"use client";

import { useState } from "react";
import { AppShowcaseCarousel } from "./AppShowcaseCarousel";
import { AppShowcaseFeatures } from "./AppShowcaseFeatures";
import { AppShowcaseTabs, type ShowcaseMode } from "./AppShowcaseTabs";
import { translateText } from "../../app/public-locales";
import type { LanguageKey } from "../../app/languages";

type Language = "RO" | "EN";
type Props = { language: LanguageKey; availableImages: string[]; onOpenStart: () => void };

const showcase = {
  manager: {
    eyebrow: { RO: "APLICAȚIA PENTRU BAZE SPORTIVE", EN: "THE APP FOR SPORTS VENUES" },
    title: { RO: ["Administrează mai simplu.", "Crește mai mult."], EN: ["Manage more simply.", "Grow with clarity."] },
    slides: [
      { src: "/app-showcase/manager/01-dashboarddesktop.png", width: 1595, height: 925, internationalSrc: "/app-showcase/manager/01-dashboarddesktop-en.png", internationalWidth: 1609, internationalHeight: 925, alt: "Dashboard SportMe Manager pe desktop", label: "Desktop dashboard", format: "desktop" },
      { src: "/app-showcase/manager/01-dashboard.jpg", width: 1080, height: 2186, internationalSrc: "/app-showcase/manager/01-dashboard-en.png", internationalWidth: 1080, internationalHeight: 2340, alt: "Dashboard SportMe Manager", label: "Dashboard" },
    ],
  },
  player: {
    eyebrow: { RO: "APLICAȚIA PENTRU JUCĂTORI", EN: "THE APP FOR PLAYERS" },
    title: { RO: ["Găsește și rezervă.", "Joacă mai mult."], EN: ["Find and book fast.", "Play more."] },
    subtitle: { RO: "Descoperă locații, verifică disponibilitatea și rezervă terenul potrivit direct din aplicație.", EN: "Discover venues, check availability and book the right court straight from the app." },
    slides: [
      { src: "/app-showcase/player/01-home.jpg", alt: "Pagina principală SportMe Jucător", label: "Home" },
      { src: "/app-showcase/player/02-locatii.jpg", alt: "Locații în SportMe Jucător", label: "Venues" },
      { src: "/app-showcase/player/03-rezervari.jpg", alt: "Rezervări în SportMe Jucător", label: "Bookings" },
      { src: "/app-showcase/player/04-notificari.jpg", alt: "Notificări în SportMe Jucător", label: "Notifications" },
      { src: "/app-showcase/player/05-harta.jpg", alt: "Harta locațiilor în SportMe Jucător", label: "Venue map" },
      { src: "/app-showcase/player/06-profile.jpg", alt: "Profil în SportMe Jucător", label: "Profile" },
    ],
  },
} satisfies Record<ShowcaseMode, { eyebrow: Record<Language, string>; title: Record<Language, string[]>; subtitle?: Record<Language, string>; slides: { src: string; width?: number; height?: number; internationalSrc?: string; internationalWidth?: number; internationalHeight?: number; alt: string; label: string; format?: "desktop" }[] }>;

export function AppShowcase({ language, availableImages, onOpenStart }: Props) {
  const [mode, setMode] = useState<ShowcaseMode>("manager");
  const content = showcase[mode];
  const text = (english: string, romanian?: string) => translateText(language, english, romanian);
  const selectedSlides = mode === "manager"
    ? showcase.manager.slides.map((slide) => ({
        ...slide,
        src: language === "RO" ? slide.src : slide.internationalSrc,
        width: language === "RO" ? slide.width : slide.internationalWidth,
        height: language === "RO" ? slide.height : slide.internationalHeight,
      }))
    : showcase.player.slides;

  return (
    <div className="app-showcase-shell" id="app-showcase-panel" role="tabpanel">
      <header className="app-showcase-intro" key={`${mode}-${language}`}>
        <p className="app-showcase-eyebrow">{text(content.eyebrow.EN, content.eyebrow.RO)}</p>
        <h1 className="app-showcase-title">
          <span>{text(content.title.EN[0], content.title.RO[0])}</span>
          <span className="is-muted">{text(content.title.EN[1], content.title.RO[1])}</span>
        </h1>
        {mode === "player" ? <p className="app-showcase-subtitle">{text(showcase.player.subtitle.EN, showcase.player.subtitle.RO)}</p> : null}
      </header>

      <AppShowcaseTabs activeMode={mode} language={language} onChange={setMode} />
      <AppShowcaseCarousel mode={mode} slides={selectedSlides.map((slide) => ({
        ...slide,
        alt: language === "RO" ? slide.alt : `${text(slide.label)} — ${mode === "manager" ? "SportMe Manager" : text("SportMe Player", "SportMe Jucător")}`,
      }))} language={language} availableImages={availableImages} />
      <AppShowcaseFeatures mode={mode} language={language} />
      <button type="button" className="app-showcase-cta" onClick={onOpenStart}>
        <span>{text("Start now", "Începe acum")}</span><span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
