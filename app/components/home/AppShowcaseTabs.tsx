type ShowcaseMode = "manager" | "player";

type Props = {
  activeMode: ShowcaseMode;
  language: "RO" | "EN";
  onChange: (mode: ShowcaseMode) => void;
};

function ManagerIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.5 28V7.5h12V28M18.5 13h7v15M3.5 28h25M10.5 12h4M10.5 17h4M10.5 22h4M22 18h1.5M22 23h1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PlayerIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="10" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M5.5 27.5c.7-6 4.4-9.5 10.5-9.5s9.8 3.5 10.5 9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export function AppShowcaseTabs({ activeMode, language, onChange }: Props) {
  const labels = language === "EN"
    ? { manager: ["Manager", "Run your sports venue"], player: ["Player", "Book courts online"] }
    : { manager: ["Manager", "Administrează baza sportivă"], player: ["Jucător", "Rezervă terenuri online"] };

  return (
    <div className="app-showcase-tabs" role="tablist" aria-label={language === "EN" ? "Choose SportMe experience" : "Alege experiența SportMe"}>
      {(["manager", "player"] as const).map((mode) => {
        const active = activeMode === mode;
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls="app-showcase-panel"
            tabIndex={active ? 0 : -1}
            className={`app-showcase-tab ${active ? "is-active" : ""}`}
            onClick={() => onChange(mode)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              onChange(mode === "manager" ? "player" : "manager");
            }}
          >
            <span className="app-showcase-tab-icon">{mode === "manager" ? <ManagerIcon /> : <PlayerIcon />}</span>
            <span className="app-showcase-tab-copy"><strong>{labels[mode][0]}</strong><small>{labels[mode][1]}</small></span>
          </button>
        );
      })}
    </div>
  );
}

export type { ShowcaseMode };
