# Sito portfolio — Giulia Scognamiglio

Sito portfolio bilingue (italiano e inglese), costruito con Next.js e generato come sito
statico, pubblicato su Cloudflare Pages.

La pianificazione completa, con lo stato di avanzamento, sta in [roadmap.md](roadmap.md).

## Cosa c'è in questa cartella

| Percorso | Cosa contiene |
|---|---|
| `site/` | Il sito. È qui che si lavora |
| `Sito/` | La bozza originale in un unico file HTML, tenuta come archivio |
| `Giulia_Scognamiglio_CV_EN.pdf` | Curriculum in inglese |
| `Giulia Scognamiglio_portfolio_2023_3BGD.pdf` | Portfolio 2023, archivio e fonte di riferimento |
| `roadmap.md` | Piano di lavoro diviso in milestone |

## Far partire il sito in locale

**Da VS Code:** `Ctrl+Shift+P` → *Tasks: Run Task* → **Start Site**. Il task chiude il
sito se stava già girando e lo riavvia, quindi si può rilanciare quante volte si vuole.
C'è anche **Stop Site** per chiuderlo.

**Da terminale**, in alternativa (serve [Node.js](https://nodejs.org) 20 o superiore):

```bash
cd site
npm install
npm run dev
```

In entrambi i casi il sito è su <http://localhost:3000>. La radice smista automaticamente
a `/it/` o a `/en/` a seconda della lingua del browser.

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | Server di sviluppo, con ricarica automatica |
| `npm run build` | Genera il sito statico in `site/out/` |
| `npm run preview` | Serve `site/out/` come lo farebbe Cloudflare |
| `npm run typecheck` | Controlla i tipi TypeScript |
| `npm run lint` | Controlla il codice con ESLint |

## Come è organizzato il sito

```
site/src/
├─ app/
│  ├─ (root)/            la rotta "/", che smista alla lingua giusta
│  └─ [lang]/            tutte le pagine, generate sia in /it/ che in /en/
├─ components/           pezzi riusabili: Nav, Hero, Footer, selettori
├─ content/
│  └─ dictionaries/      tutte le etichette dell'interfaccia, in IT e EN
├─ lib/                  lingue, percorsi, indirizzi
└─ styles/               tokens.css (colori e font) e globals.css
```

**Dove si cambiano le parole dell'interfaccia:** in
`site/src/content/dictionaries/it.ts` e `en.ts`. I due file hanno la stessa forma, e
TypeScript segnala subito se una voce manca in una delle due lingue.

**Dove si cambiano i colori e i font:** in `site/src/styles/tokens.css`. Sono variabili
CSS: cambiando un valore lì cambia in tutto il sito, tema chiaro e tema scuro compresi.

## Lingue

Ogni pagina esiste in due versioni, `/it/…` e `/en/…`. Il selettore in alto a destra
cambia lingua restando sulla stessa pagina. Le pagine si dichiarano a vicenda ai motori
di ricerca con `hreflang`, così non vengono trattate come contenuto duplicato.

## Pubblicazione

Il sito verrà pubblicato su Cloudflare Pages con queste impostazioni:

- Cartella radice del progetto: `site`
- Comando di build: `npm run build`
- Cartella di output: `out`

Ogni push sul ramo `main` farà partire un nuovo deploy.
