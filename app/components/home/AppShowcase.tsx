"use client";

import { useState } from "react";
import { AppShowcaseCarousel } from "./AppShowcaseCarousel";
import { AppShowcaseFeatures } from "./AppShowcaseFeatures";
import { AppShowcaseTabs, type ShowcaseMode } from "./AppShowcaseTabs";
import { translateText } from "../../app/public-locales";
import type { LanguageKey } from "../../app/languages";

type Language = "RO" | "EN";
type Props = { language: LanguageKey; availableImages: string[]; onOpenManager: () => void; onOpenPlayer: () => void };

const showcase = {
  manager: {
    eyebrow: { RO: "APLICAȚIA PENTRU BAZE SPORTIVE", EN: "THE APP FOR SPORTS VENUES" },
    title: { RO: ["Administrează mai simplu.", "Crește mai mult."], EN: ["Manage more simply.", "Grow with clarity."] },
    subtitle: { RO: "Tot ce ai nevoie pentru rezervări, clienți și terenuri, într-o singură aplicație.", EN: "Everything you need for bookings, customers and courts, in one app." },
    cta: { RO: "Vezi SportMe Manager", EN: "Explore SportMe Manager" },
    slides: [
      { src: "/app-showcase/manager/01-dashboard.jpg", alt: "Dashboard SportMe Manager", label: "Dashboard" },
      { src: "/app-showcase/manager/02-rezervari.jpg", alt: "Calendarul de rezervări SportMe Manager", label: "Booking calendar" },
      { src: "/app-showcase/manager/03-terenuri.jpg", alt: "Terenuri în SportMe Manager", label: "Sports courts" },
      { src: "/app-showcase/manager/04-rezervarenoua.jpg", alt: "Crearea unei rezervări în SportMe Manager", label: "New booking" },
      { src: "/app-showcase/manager/05-rezervareasteptare.jpg", alt: "Rezervări în așteptare în SportMe Manager", label: "Pending bookings" },
      { src: "/app-showcase/manager/06-angajati.jpg", alt: "Administrarea angajaților în SportMe Manager", label: "Staff management" },
      { src: "/app-showcase/manager/06-notificari.jpg", alt: "Notificări în SportMe Manager", label: "Notifications" },
    ],
  },
  player: {
    eyebrow: { RO: "APLICAȚIA PENTRU JUCĂTORI", EN: "THE APP FOR PLAYERS" },
    title: { RO: ["Găsește și rezervă.", "Joacă mai mult."], EN: ["Find and book fast.", "Play more."] },
    subtitle: { RO: "Descoperă locații, verifică disponibilitatea și rezervă terenul potrivit direct din aplicație.", EN: "Discover venues, check availability and book the right court straight from the app." },
    cta: { RO: "Vezi SportMe Jucător", EN: "Explore SportMe Player" },
    slides: [
      { src: "/app-showcase/player/01-home.jpg", alt: "Pagina principală SportMe Jucător", label: "Home" },
      { src: "/app-showcase/player/02-locatii.jpg", alt: "Locații în SportMe Jucător", label: "Venues" },
      { src: "/app-showcase/player/03-rezervari.jpg", alt: "Rezervări în SportMe Jucător", label: "Bookings" },
      { src: "/app-showcase/player/04-notificari.jpg", alt: "Notificări în SportMe Jucător", label: "Notifications" },
      { src: "/app-showcase/player/05-harta.jpg", alt: "Harta locațiilor în SportMe Jucător", label: "Venue map" },
      { src: "/app-showcase/player/06-profile.jpg", alt: "Profil în SportMe Jucător", label: "Profile" },
    ],
  },
} satisfies Record<ShowcaseMode, { eyebrow: Record<Language, string>; title: Record<Language, string[]>; subtitle: Record<Language, string>; cta: Record<Language, string>; slides: { src: string; alt: string; label: string }[] }>;

export function AppShowcase({ language, availableImages, onOpenManager, onOpenPlayer }: Props) {
  const [mode, setMode] = useState<ShowcaseMode>("manager");
  const content = showcase[mode];
  const text = (english: string, romanian?: string) => translateText(language, english, romanian);

  return (
    <div className="app-showcase-shell" id="app-showcase-panel" role="tabpanel">
      <header className="app-showcase-intro" key={`${mode}-${language}`}>
        <p className="app-showcase-eyebrow">{text(content.eyebrow.EN, content.eyebrow.RO)}</p>
        <h1 className="app-showcase-title">
          <span>{text(content.title.EN[0], content.title.RO[0])}</span>
          <span className="is-muted">{text(content.title.EN[1], content.title.RO[1])}</span>
        </h1>
        <p className="app-showcase-subtitle">{text(content.subtitle.EN, content.subtitle.RO)}</p>
      </header>

      <AppShowcaseTabs activeMode={mode} language={language} onChange={setMode} />
      <AppShowcaseCarousel mode={mode} slides={content.slides.map((slide) => ({ ...slide, alt: language === "RO" ? slide.alt : `${text(slide.label)} — ${mode === "manager" ? "SportMe Manager" : text("SportMe Player", "SportMe Jucător")}` }))} language={language} availableImages={availableImages} />
      <AppShowcaseFeatures mode={mode} language={language} />
      <button type="button" className="app-showcase-cta" onClick={mode === "manager" ? onOpenManager : onOpenPlayer}>
        <span>{text(content.cta.EN, content.cta.RO)}</span><span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
