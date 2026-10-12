import type { StoryMedia } from "../../lib/stories";

// Cadre d'une capture d'application. Sans `src`, affiche un emplacement
// explicitement en attente : jamais une fausse interface.
export default function MediaFrame({ media, priority = false }: { media: StoryMedia; priority?: boolean }) {
  const portrait = media.orientation === "portrait";
  return (
    <figure className={`media-frame ${portrait ? "is-portrait" : "is-landscape"}${media.src ? "" : " is-pending"}`}>
      <div className="media-chrome">
        {!portrait && (
          <div className="media-bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{media.label}</span>
          </div>
        )}
        <div className="media-screen">
          {media.src ? (
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
      </div>
      <figcaption>
        <span>{media.src ? "Capture réelle" : "En attente"}</span>
        {media.src ? media.origin : media.expected}
      </figcaption>
    </figure>
  );
}
