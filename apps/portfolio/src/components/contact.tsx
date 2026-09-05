"use client";
import { useEffect, useState } from "react";
export default function Contact() {
  const [ready, setReady] = useState(false);
  const [need, setNeed] = useState("");
  useEffect(() => {
    const project = new URLSearchParams(window.location.search).get("projet");
    if (project)
      setNeed(
        "Je souhaite discuter d’un projet similaire à " +
          project +
          ".\n\nMon besoin : ",
      );
  }, []);
  return (
    <form
      className="brief"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const body = `Bonjour Naoufal,\n\nJe suis ${d.get("name")} (${d.get("company") || "projet personnel"}).\n\nMon besoin :\n${d.get("need")}\n\nMon email : ${d.get("email")}`;
        window.location.href =
          "mailto:naoufal.ou7@gmail.com?subject=" +
          encodeURIComponent("Projet — " + d.get("name")) +
          "&body=" +
          encodeURIComponent(body);
        setReady(true);
      }}
    >
      <label>
        Votre nom
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Prénom et nom"
        />
      </label>
      <label>
        Votre email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vous@entreprise.fr"
        />
      </label>
      <label>
        Entreprise <span>(facultatif)</span>
        <input
          name="company"
          autoComplete="organization"
          placeholder="Votre entreprise"
        />
      </label>
      <label>
        Qu’aimeriez-vous construire ?
        <textarea
          name="need"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
          required
          rows={5}
          placeholder="Le contexte, le problème et le résultat attendu…"
        />
      </label>
      <button className="button primary" type="submit">
        Préparer mon email ↗
      </button>
      <p className="muted">
        Ce formulaire ouvre votre messagerie avec le brief prérempli. Aucune
        donnée n’est enregistrée sur ce site.
      </p>
      {ready && (
        <p role="status">
          Votre email est préparé. Envoyez-le depuis votre messagerie ; si elle
          ne s’ouvre pas, écrivez directement à naoufal.ou7@gmail.com.
        </p>
      )}
    </form>
  );
}
