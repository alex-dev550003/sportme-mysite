"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ShowcaseMode } from "./AppShowcaseTabs";

type Slide = { src: string; alt: string };
type Props = { mode: ShowcaseMode; slides: Slide[]; language: "RO" | "EN"; availableImages: string[] };

function ShowcaseImage({ slide, label, priority, available, enlarged = false }: { slide: Slide; label: string; priority: boolean; available: boolean; enlarged?: boolean }) {
  const [failed, setFailed] = useState(!available);
  useEffect(() => setFailed(!available), [available, slide.src]);

  return (
    <div className="app-showcase-image-frame">
      {failed ? (
        <div className="app-showcase-placeholder" role="img" aria-label={slide.alt}>
          <span>{label}</span>
          <small>{slide.src.split("/").pop()}</small>
        </div>
      ) : (
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          sizes={enlarged ? "(max-width: 767px) 85vw, 600px" : "(max-width: 405px) 51vw, (max-width: 767px) 207px, 320px"}
          quality={95}
          priority={priority}
          draggable={false}
          className="object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ShowcaseLightbox({ slide, index, total, title, language, available, onClose, onPrevious, onNext }: {
  slide: Slide; index: number; total: number; title: string; language: "RO" | "EN"; available: boolean;
  onClose: () => void; onPrevious: () => void; onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropStart = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="showcase-lightbox"
      aria-label={language === "EN" ? `${title} — image preview` : `${title} — previzualizare imagine`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onPointerDown={(event) => { backdropStart.current = event.target === event.currentTarget; }}
      onClick={(event) => { if (event.target === event.currentTarget && backdropStart.current) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight") { event.preventDefault(); onNext(); }
        if (event.key === "Tab") {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }
      }}
    >
      <div className="showcase-lightbox-panel">
        <header className="showcase-lightbox-header">
          <span>{title}</span>
          <button type="button" className="showcase-lightbox-control" onClick={onClose} aria-label={language === "EN" ? "Close preview" : "Închide previzualizarea"} autoFocus>×</button>
        </header>
        <div className="showcase-lightbox-image">
          <ShowcaseImage key={slide.src} slide={slide} label={title} priority={false} available={available} enlarged />
        </div>
        <footer className="showcase-lightbox-footer">
          <button type="button" className="showcase-lightbox-control" onClick={onPrevious} disabled={total < 2} aria-label={language === "EN" ? "Previous screenshot" : "Captura anterioară"}>‹</button>
          <span aria-live="polite" aria-atomic="true"><span className="sr-only">{slide.alt}. </span>{index + 1} / {total}</span>
          <button type="button" className="showcase-lightbox-control" onClick={onNext} disabled={total < 2} aria-label={language === "EN" ? "Next screenshot" : "Captura următoare"}>›</button>
        </footer>
      </div>
    </dialog>,
    document.body,
  );
}

export function AppShowcaseCarousel({ mode, slides, language, availableImages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setActiveIndex(0); setPreviewOpen(false); }, [mode]);
  const previous = () => setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  const next = () => setActiveIndex((index) => (index + 1) % slides.length);
  const placeholderLabel = mode === "manager" ? "Screenshot Manager" : language === "EN" ? "Player Screenshot" : "Screenshot Jucător";

  const getPosition = (index: number) => {
    if (index === activeIndex) return "is-active";
    if (index === (activeIndex - 1 + slides.length) % slides.length) return "is-previous";
    if (index === (activeIndex + 1) % slides.length) return "is-next";
    return "is-hidden";
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
    if (event.key === "ArrowRight") { event.preventDefault(); next(); }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".app-showcase-arrow")) return;
    suppressClick.current = false;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current.x;
    const verticalDistance = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    suppressClick.current = Math.abs(distance) > 10 || Math.abs(verticalDistance) > 10;
    if (Math.abs(distance) < 42 || Math.abs(distance) < Math.abs(verticalDistance)) return;
    if (distance > 0) previous();
    else next();
  };

  return (
    <div className="app-showcase-carousel-wrap">
      <div
        ref={carouselRef}
        className="app-showcase-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={language === "EN" ? `${mode} app screenshots` : `Capturi aplicație ${mode === "manager" ? "Manager" : "Jucător"}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
        onPointerLeave={() => { pointerStart.current = null; }}
      >
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.src}
            className={`app-showcase-slide ${getPosition(index)}`}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            aria-haspopup="dialog"
            aria-label={`${language === "EN" ? "Enlarge image" : "Mărește imaginea"}: ${slide.alt}`}
            onClick={(event) => {
              if (event.detail > 0 && suppressClick.current) return;
              setActiveIndex(index);
              setPreviewOpen(true);
            }}
          >
            <ShowcaseImage slide={slide} label={placeholderLabel} priority={mode === "manager" && index === 0} available={availableImages.includes(slide.src)} />
          </button>
        ))}
        <button type="button" className="app-showcase-arrow is-left" onClick={previous} aria-label={language === "EN" ? "Previous screenshot" : "Captura anterioară"}>‹</button>
        <button type="button" className="app-showcase-arrow is-right" onClick={next} aria-label={language === "EN" ? "Next screenshot" : "Captura următoare"}>›</button>
      </div>
      <div className="app-showcase-dots" role="group" aria-label={language === "EN" ? "Choose screenshot" : "Alege captura"}>
        {slides.map((slide, index) => <button key={slide.src} type="button" className={index === activeIndex ? "is-active" : ""} onClick={() => setActiveIndex(index)} aria-label={`${language === "EN" ? "Screenshot" : "Captura"} ${index + 1}`} aria-current={index === activeIndex ? "true" : undefined} />)}
      </div>
      {previewOpen && slides[activeIndex] ? (
        <ShowcaseLightbox
          slide={slides[activeIndex]} index={activeIndex} total={slides.length}
          title={mode === "manager" ? "SportMe Manager" : language === "EN" ? "SportMe Player" : "SportMe Jucător"}
          language={language} available={availableImages.includes(slides[activeIndex].src)}
          onPrevious={previous} onNext={next}
          onClose={() => {
            setPreviewOpen(false);
            requestAnimationFrame(() => carouselRef.current?.querySelector<HTMLButtonElement>(".app-showcase-slide.is-active")?.focus({ preventScroll: true }));
          }}
        />
      ) : null}
    </div>
  );
}
