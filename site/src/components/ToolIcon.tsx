/**
 * L'icona di un software, accanto al suo nome nella colonna Strumenti. È decorativa: il nome
 * scritto c'è sempre, quindi per i lettori di schermo l'icona è nascosta.
 *
 * Le app Adobe sono disegnate qui come le loro icone: quadrato scuro e sigla nel colore
 * dell'app. Per aggiungerne una basta una riga in `ADOBE`. Un software che non è nell'elenco
 * prende una sigla neutra con le prime due lettere, così la colonna resta allineata.
 */

const ADOBE: Record<string, { short: string; bg: string; fg: string }> = {
  photoshop: { short: "Ps", bg: "#001E36", fg: "#31A8FF" },
  illustrator: { short: "Ai", bg: "#330000", fg: "#FF9A00" },
  indesign: { short: "Id", bg: "#49021F", fg: "#FF3366" },
};

function Monogram({ short, bg, fg }: { short: string; bg: string; fg: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill={bg} />
      <text
        x="12"
        y="12.5"
        fill={fg}
        fontSize="11"
        fontWeight="600"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--text)"
      >
        {short}
      </text>
    </svg>
  );
}

/** Il logo di Figma, i cinque elementi nei loro colori, su un quadrato scuro come la sua app */
function Figma() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="5" fill="#1E1E1E" />
      <g transform="translate(7.25 4.875) scale(0.25)">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
      </g>
    </svg>
  );
}

export default function ToolIcon({ name, className }: { name: string; className?: string }) {
  const key = name.toLowerCase().replace(/^adobe\s+/, "").replace(/\s+/g, "");
  const adobe = ADOBE[key];
  return (
    <span className={className}>
      {key === "figma" ? (
        <Figma />
      ) : adobe ? (
        <Monogram {...adobe} />
      ) : (
        <Monogram short={name.slice(0, 2)} bg="var(--wash)" fg="var(--ink)" />
      )}
    </span>
  );
}
