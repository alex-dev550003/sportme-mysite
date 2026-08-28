"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LightboxImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function LightboxImage({ src, alt, priority = false }: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`Mărește captura: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1032}
          priority={priority}
          sizes="(min-width: 1280px) 860px, (min-width: 768px) 92vw, 100vw"
          className="h-auto w-full"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/78 px-3 py-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-h-[92vh] w-full max-w-7xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-lg leading-none text-white shadow-lg backdrop-blur transition hover:bg-black/75"
              aria-label="Închide captura"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-[18px] border border-white/18 bg-[#07101d] shadow-2xl">
              <Image
                src={src}
                alt={alt}
                width={1920}
                height={1032}
                sizes="100vw"
                className="max-h-[92vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
