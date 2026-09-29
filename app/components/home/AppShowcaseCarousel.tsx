"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { ShowcaseMode } from "./AppShowcaseTabs";

type Slide = { src: string; alt: string };
type Props = { mode: ShowcaseMode; slides: Slide[]; language: "RO" | "EN"; availableImages: string[] };

function ShowcaseImage({ slide, label, priority, available }: { slide: Slide; label: string; priority: boolean; available: boolean }) {
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
          sizes="(max-width: 405px) 51vw, (max-width: 767px) 207px, 320px"
          quality={95}
          priority={priority}
          className="object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function AppShowcaseCarousel({ mode, slides, language, availableImages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => setActiveIndex(0), [mode]);
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
    if (event.key === "ArrowLeft") previous();
    if (event.key === "ArrowRight") next();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".app-showcase-arrow")) return;
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 42) return;
    if (distance > 0) previous();
    else next();
  };

  return (
    <div className="app-showcase-carousel-wrap">
      <div
        className="app-showcase-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={language === "EN" ? `${mode} app screenshots` : `Capturi aplicație ${mode === "manager" ? "Manager" : "Jucător"}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.src}
            className={`app-showcase-slide ${getPosition(index)}`}
            aria-hidden={index !== activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => index === activeIndex ? undefined : setActiveIndex(index)}
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
    </div>
  );
}
