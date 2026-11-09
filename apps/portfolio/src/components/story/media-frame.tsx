"use client";

import { useEffect, useState } from "react";
import type { StoryMedia } from "../../lib/stories";

// Cadre d'une capture d'application. Sans `src`, affiche un emplacement
// explicitement en attente : jamais une fausse interface. Un clic ouvre la capture en grand.
export default function MediaFrame({ media, priority = false }: { media: StoryMedia; priority?: boolean }) {
  const portrait = media.orientation === "portrait";
  const [open, setOpen] = useState(false);
  const zoomable = Boolean(media.src) && !media.video;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <figure className={`media-frame ${portrait ? "is-portrait" : "is-landscape"}${media.src ? "" : " is-pending"}${zoomable ? " is-zoomable" : ""}`}>
        <div
          className="media-chrome"
          onClick={zoomable ? () => setOpen(true) : undefined}
          role={zoomable ? "button" : undefined}
          tabIndex={zoomable ? 0 : undefined}
          aria-label={zoomable ? `Agrandir la capture : ${media.label}` : undefined}
          onKeyDown={zoomable ? (e) => (e.key === "Enter" || e.key === " ") && setOpen(true) : undefined}
        >
          {!portrait && (
            <div className="media-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{media.label}</span>
            </div>
          )}
          <div className="media-screen">
            {media.video ? (
              <video src={media.video} poster={media.src} autoPlay loop muted playsInline preload="metadata" aria-label={`${media.label} — vidéo de présentation`} />
            ) : media.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={media.src}
                alt={`${media.label} — ${media.origin ?? "capture de l’application"}`}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <div className="media-pending">
                <span className="media-pending-tag">Capture à venir</span>
                <b>{media.label}</b>
                <p>{media.expected}</p>
                <small>Sera prise directement dans l’application</small>
              </div>
            )}
          </div>
          {zoomable && <span className="media-zoom" aria-hidden="true">Agrandir ⤢</span>}
        </div>
        <figcaption>
          <span>{media.video ? "Vidéo" : media.src ? "Capture réelle" : "En attente"}</span>
          {media.src ? media.origin : media.expected}
        </figcaption>
      </figure>
      {open && media.src && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={media.label} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt={media.label} />
          <button type="button" aria-label="Fermer" onClick={() => setOpen(false)}>
            ✕
          </button>
          <p>{media.origin}</p>
        </div>
      )}
    </>
  );
}
