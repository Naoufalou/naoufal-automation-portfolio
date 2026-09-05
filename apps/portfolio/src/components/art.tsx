export default function Art({
  id,
  large = false,
}: {
  id: string;
  large?: boolean;
}) {
  const kind =
    id === "A01"
      ? "agent"
      : id === "A03"
        ? "hazi"
        : id === "A05"
          ? "chaka"
          : id === "A10"
            ? "vision"
            : id.startsWith("L")
              ? "web"
              : "data";
  return (
    <div
      aria-hidden="true"
      className={`art art-${kind} ${large ? "art-large" : ""}`}
    >
      <div className="art-grid" />
      {kind === "agent" ? (
        <div className="orbital">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <div className="orbit o3" />
          <div className="core">
            N<span>agent os</span>
          </div>
          <b className="sat s1">Mémoire</b>
          <b className="sat s2">Voix</b>
          <b className="sat s3">Outils</b>
        </div>
      ) : kind === "hazi" ? (
        <div className="mock-window">
          <div className="window-top">
            ● ● ● <span>HAZI / WORKSPACE</span>
          </div>
          <div className="mock-sidebar">
            H.
            <br />
            <i />
            <i />
            <i />
          </div>
          <div className="mock-content">
            <small>CAMPAGNES</small>
            <h3>
              Le bon message.
              <br />
              Au bon contact.
            </h3>
            <div className="bubble">Bonjour {"{{prénom}}"} 👋</div>
            <div className="mock-line" />
            <div className="mock-line short" />
          </div>
        </div>
      ) : kind === "chaka" ? (
        <div className="chaka">
          <small>CHAKA / LIVE OS</small>
          <h3>
            Le live,
            <br />
            <em>en perspective.</em>
          </h3>
          <div className="bars">
            {[25, 45, 36, 60, 50, 80, 65, 92, 76, 100].map((h, i) => (
              <i key={i} style={{ height: h + "%" }} />
            ))}
          </div>
        </div>
      ) : kind === "vision" ? (
        <div className="vision">
          <span className="zone z1">ZONE A</span>
          <span className="zone z2">ZONE B</span>
          <div className="person p1" />
          <div className="person p2" />
          <small>SHOPTRACKER / VISION</small>
        </div>
      ) : kind === "web" ? (
        <div className="web-mock">
          <div>
            STUDIO / DIGITAL EXPERIENCE <span>↗</span>
          </div>
          <h3>
            {id === "L03"
              ? "Toujours prêt."
              : id === "L01"
                ? "Simplement propre."
                : "Une présence qui compte."}
          </h3>
          <span className="mock-button">Découvrir →</span>
          <div className="web-circle" />
        </div>
      ) : (
        <div className="data-art">
          <span>INPUT</span>
          <div className="data-flow">
            <i />
            <i />
            <i />
          </div>
          <strong>{id.startsWith("P") ? "workflow" : "data.engine"}</strong>
          <div className="data-flow reverse">
            <i />
            <i />
            <i />
          </div>
          <span>OUTPUT</span>
        </div>
      )}
      <span className="art-caption">Composition illustrative · {id}</span>
    </div>
  );
}
