import Image from "next/image";
import OrbitalCore from "./orbital-core";
import { natureLabel, type Story, type StoryGalleryItem } from "../lib/stories";

function GalleryFigure({
  item,
  priority = false,
}: {
  item: StoryGalleryItem;
  priority?: boolean;
}) {
  return (
    <figure className={`proof-figure proof-${item.nature}`}>
      <div className="proof-frame">
        <Image
          src={item.src}
          alt={item.alt}
          width={1440}
          height={900}
          sizes="(max-width: 760px) 92vw, 44vw"
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
          priority={priority}
        />
        <span className="proof-badge">{natureLabel[item.nature]}</span>
      </div>
      <figcaption>
        <b>{item.caption}</b>
        <small>{item.source}</small>
      </figcaption>
    </figure>
  );
}

function StoryVisual({ story }: { story: Story }) {
  if (story.visual === "starmap-captures" || story.visual === "iapas-captures") {
    return (
      <div className="proof-grid">
        {story.gallery.slice(0, 2).map((item, index) => (
          <GalleryFigure key={item.src} item={item} priority={index === 0} />
        ))}
      </div>
    );
  }

  if (story.visual === "bouchon-captures") {
    return (
      <div className="proof-grid proof-grid-bouchon">
        {story.gallery.slice(0, 2).map((item, index) => (
          <GalleryFigure key={item.src} item={item} priority={index === 0} />
        ))}
      </div>
    );
  }

  if (story.visual === "gumroad-mockup") {
    return (
      <div className="proof-grid proof-grid-mockup">
        {story.gallery.map((item) => (
          <GalleryFigure key={item.src} item={item} priority />
        ))}
      </div>
    );
  }

  return (
    <div className="story-visual-diagram oneshot-diagram">
      <div className="diagram-label">
        ONESHOT / COCKPIT LOCAL <span>PROFIL · OFFRES · SUIVI</span>
      </div>
      <div className="oneshot-board">
        <div className="oneshot-sidebar">
          <b>01</b>
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="oneshot-content">
          <span className="oneshot-kicker">VEILLE DE POSTES</span>
          <b>
            Le bon contexte,
            <br />
            au bon moment.
          </b>
          <div className="match-row">
            <i />
            <span>Collecte des offres</span>
            <strong>Base locale</strong>
          </div>
          <div className="match-row">
            <i />
            <span>Analyse de correspondance</span>
            <strong>Lecture assistée</strong>
          </div>
          <div className="match-row">
            <i />
            <span>Suivi des candidatures</span>
            <strong>État explicite</strong>
          </div>
          <div className="oneshot-local">DONNÉES LOCALES · SCHÉMA ÉDITORIAL</div>
        </div>
      </div>
      <p className="visual-disclaimer">
        Schéma d’interface · illustration, pas une capture · aucune candidature
        ni donnée personnelle
      </p>
    </div>
  );
}

export { GalleryFigure, StoryVisual, OrbitalCore };
