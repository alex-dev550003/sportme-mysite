"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useI18n } from "../app/i18n";
import { languages, type LanguageKey } from "../app/languages";
import { trackEvent } from "../utils/analytics";

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const current = languages.find(({ code }) => code === language) ?? languages[0];

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const menu = menuRef.current;
      if (!menu) return;
      menu.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus({ preventScroll: true });
    });
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [open]);

  const close = () => { setOpen(false); triggerRef.current?.focus({ preventScroll: true }); };
  const choose = (code: LanguageKey) => {
    setLanguage(code);
    trackEvent(`language_switch_${code.toLowerCase()}`);
    close();
  };
  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return; }
    const buttons = Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    let next = index;
    if (event.key === "ArrowDown") next = (index + 1) % buttons.length;
    else if (event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buttons.length - 1;
    else return;
    event.preventDefault();
    buttons[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={rootRef} className="language-selector" data-open={open} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={triggerRef} type="button" className="language-selector-trigger" aria-haspopup="menu" aria-controls={menuId} aria-expanded={open} aria-label={`${t("about.languageToggleLabel")}: ${current.name}`} onClick={() => setOpen((value) => !value)} onKeyDown={(event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); }
        if (event.key === "Escape") close();
      }}>
        <Image src={`/flags/${current.code === "ES" ? "es" : current.flags[0]}.svg`} alt="" width={24} height={18} className="language-selector-flag" />
        <span lang={current.code.toLowerCase()}>{current.name}</span>
        <svg className="language-selector-chevron" width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div ref={menuRef} id={menuId} className="language-selector-menu" role="menu" aria-label={t("about.languageToggleLabel")} aria-hidden={!open} inert={!open} onKeyDown={navigate}>
        {languages.map((option, index) => (
          <button key={option.code} type="button" className="language-selector-option" role="menuitemradio" aria-checked={language === option.code} tabIndex={-1} onClick={() => choose(option.code)} style={{ "--language-index": index } as CSSProperties}>
            <span className="language-selector-flags" aria-hidden="true">{option.flags.map((flag) => <Image key={flag} src={`/flags/${flag}.svg`} alt="" width={24} height={18} className="language-selector-flag" />)}</span>
            <span lang={option.code.toLowerCase()}>{option.name}</span>
            <svg className="language-selector-check" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
