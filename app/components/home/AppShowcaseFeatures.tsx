import type { ReactNode } from "react";
import type { ShowcaseMode } from "./AppShowcaseTabs";
import type { LanguageKey } from "../../app/languages";
import { translateText } from "../../app/public-locales";

function CalendarIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="7" width="22" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M10 4v6M22 4v6M5 13h22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function ClockIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 9v7l5 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function ChartIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 26V15h5v11M14 26V7h5v19M22 26V11h5v15M4 26h25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function SearchIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="8" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }
function BoltIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m18 3-10 15h8l-2 11 10-16h-8l2-10Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>; }
function BellIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 22h16l-2.2-3.2V14a5.8 5.8 0 0 0-11.6 0v4.8L8 22Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M13 25a3.2 3.2 0 0 0 6 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>; }

type Feature = { icon: ReactNode; ro: [string, string]; en: [string, string] };

const features: Record<ShowcaseMode, Feature[]> = {
  manager: [
    { icon: <CalendarIcon />, ro: ["Rezervări", "centralizate"], en: ["Centralized", "bookings"] },
    { icon: <ClockIcon />, ro: ["Disponibilitate", "în timp real"], en: ["Real-time", "availability"] },
    { icon: <ChartIcon />, ro: ["Rapoarte", "și statistici"], en: ["Reports", "and insights"] },
  ],
  player: [
    { icon: <SearchIcon />, ro: ["Locații", "ușor de găsit"], en: ["Easy venue", "discovery"] },
    { icon: <BoltIcon />, ro: ["Rezervare", "în câteva secunde"], en: ["Book in", "seconds"] },
    { icon: <BellIcon />, ro: ["Confirmări", "și remindere"], en: ["Confirmations", "and reminders"] },
  ],
};

export function AppShowcaseFeatures({ mode, language }: { mode: ShowcaseMode; language: LanguageKey }) {
  return (
    <div className="app-showcase-features">
      {features[mode].map((feature) => (
        <div className="app-showcase-feature" key={feature.ro.join("-")}>
          <span className="app-showcase-feature-icon">{feature.icon}</span>
          <span>{feature.en.map((line, index) => <span key={line}>{translateText(language, line, feature.ro[index])}</span>)}</span>
        </div>
      ))}
    </div>
  );
}
