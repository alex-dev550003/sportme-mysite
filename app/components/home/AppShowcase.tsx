"use client";

import { useState } from "react";
import { AppShowcaseCarousel } from "./AppShowcaseCarousel";
import { AppShowcaseFeatures } from "./AppShowcaseFeatures";
import { AppShowcaseTabs, type ShowcaseMode } from "./AppShowcaseTabs";

type Language = "RO" | "EN";
type Props = { language: Language; availableImages: string[]; onOpenManager: () => void; onOpenPlayer: () => void };

const showcase = {
  manager: {
    eyebrow: { RO: "APLICAȚIA PENTRU BAZE SPORTIVE", EN: "THE APP FOR SPORTS VENUES" },
    title: { RO: ["Administrează mai simplu.", "Crește mai mult."], EN: ["Manage more simply.", "Grow with clarity."] },
    subtitle: { RO: "Tot ce ai nevoie pentru rezervări, clienți și terenuri, într-o singură aplicație.", EN: "Everything you need for bookings, customers and courts, in one app." },
    cta: { RO: "Vezi SportMe Manager", EN: "Explore SportMe Manager" },
    slides: [
      { src: "/app-showcase/manager/01-dashboard.jpg", alt: "Dashboard SportMe Manager" },
      { src: "/app-showcase/manager/02-rezervari.jpg", alt: "Calendarul de rezervări SportMe Manager" },
      { src: "/app-showcase/manager/03-terenuri.jpg", alt: "Terenuri în SportMe Manager" },
      { src: "/app-showcase/manager/04-rezervarenoua.jpg", alt: "Crearea unei rezervări în SportMe Manager" },
      { src: "/app-showcase/manager/05-rezervareasteptare.jpg", alt: "Rezervări în așteptare în SportMe Manager" },
      { src: "/app-showcase/manager/06-angajati.jpg", alt: "Administrarea angajaților în SportMe Manager" },
      { src: "/app-showcase/manager/06-notificari.jpg", alt: "Notificări în SportMe Manager" },
    ],
  },
  player: {
    eyebrow: { RO: "APLICAȚIA PENTRU JUCĂTORI", EN: "THE APP FOR PLAYERS" },
    title: { RO: ["Găsește și rezervă.", "Joacă mai mult."], EN: ["Find and book fast.", "Play more."] },
    subtitle: { RO: "Descoperă locații, verifică disponibilitatea și rezervă terenul potrivit direct din aplicație.", EN: "Discover venues, check availability and book the right court straight from the app." },
    cta: { RO: "Vezi SportMe Jucător", EN: "Explore SportMe Player" },
    slides: [
      { src: "/app-showcase/player/01-home.jpg", alt: "Pagina principală SportMe Jucător" },
      { src: "/app-showcase/player/02-locatii.jpg", alt: "Locații în SportMe Jucător" },
      { src: "/app-showcase/player/03-rezervari.jpg", alt: "Rezervări în SportMe Jucător" },
      { src: "/app-showcase/player/04-notificari.jpg", alt: "Notificări în SportMe Jucător" },
      { src: "/app-showcase/player/05-harta.jpg", alt: "Harta locațiilor în SportMe Jucător" },
      { src: "/app-showcase/player/06-profile.jpg", alt: "Profil în SportMe Jucător" },
    ],
  },
} satisfies Record<ShowcaseMode, { eyebrow: Record<Language, string>; title: Record<Language, string[]>; subtitle: Record<Language, string>; cta: Record<Language, string>; slides: { src: string; alt: string }[] }>;

export function AppShowcase({ language, availableImages, onOpenManager, onOpenPlayer }: Props) {
  const [mode, setMode] = useState<ShowcaseMode>("manager");
  const content = showcase[mode];

  return (
    <div className="app-showcase-shell" id="app-showcase-panel" role="tabpanel">
      <header className="app-showcase-intro" key={`${mode}-${language}`}>
        <p className="app-showcase-eyebrow">{content.eyebrow[language]}</p>
        <h1 className="app-showcase-title">
          <span>{content.title[language][0]}</span>
          <span className="is-muted">{content.title[language][1]}</span>
        </h1>
        <p className="app-showcase-subtitle">{content.subtitle[language]}</p>
      </header>

      <AppShowcaseTabs activeMode={mode} language={language} onChange={setMode} />
      <AppShowcaseCarousel mode={mode} slides={content.slides} language={language} availableImages={availableImages} />
      <AppShowcaseFeatures mode={mode} language={language} />
      <button type="button" className="app-showcase-cta" onClick={mode === "manager" ? onOpenManager : onOpenPlayer}>
        <span>{content.cta[language]}</span><span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
