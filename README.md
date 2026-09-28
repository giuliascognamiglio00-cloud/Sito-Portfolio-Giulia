# Sito portfolio — Giulia Scognamiglio

Sito portfolio bilingue (italiano e inglese), costruito con Next.js e generato come sito
statico, pubblicato su Cloudflare Pages.

La pianificazione completa, con lo stato di avanzamento, sta in [roadmap.md](roadmap.md).

## Cosa c'è in questa cartella

| Percorso | Cosa contiene |
|---|---|
| `site/` | Il sito. È qui che si lavora |
| `Sito/` | La bozza originale in un unico file HTML, tenuta come archivio |
| `font/` | I file dei font scaricati. Da qui nasce il font del corpo del testo (vedi sotto) |
| `Giulia_Scognamiglio_CV_EN.pdf` | Curriculum in inglese |
| `Giulia Scognamiglio_portfolio_2023_3BGD.pdf` | Portfolio 2023, archivio e fonte di riferimento |
| `roadmap.md` | Piano di lavoro diviso in milestone |

## Far partire il sito in locale

**Da VS Code:** `Ctrl+Shift+P` → *Tasks: Run Task* → **Start Site**. Il task chiude il
sito se stava già girando e lo riavvia, quindi si può rilanciare quante volte si vuole.
C'è anche **Stop Site** per chiuderlo.

**Da terminale**, in alternativa (serve [Node.js](https://nodejs.org) 24, la versione
fissata in `site/.node-version`):

```bash
cd site
npm ci
npm run dev
```

In entrambi i casi il sito è su <http://localhost:3000>. La radice smista automaticamente
a `/it/` o a `/en/` a seconda della lingua del browser.

## Comandi

Tutti da lanciare dentro `site/`.

| Comando | Cosa fa |
|---|---|
| `npm ci` | Installa le dipendenze esattamente alle versioni di `package-lock.json` |
| `npm run dev` | Server di sviluppo, con ricarica automatica |
| `npm run build` | Genera il sito statico in `site/out/` |
| `npm run check` | Controlla `out/`: pagine presenti, link interni, limiti di Cloudflare |
| `npm run preview` | Serve `out/` esattamente come Cloudflare Pages, su <http://localhost:8788> |
| `npm run typecheck` | Controlla i tipi TypeScript |
| `npm run lint` | Controlla il codice con ESLint |

Le versioni delle dipendenze sono scritte esatte, senza `^`, e `site/.npmrc` fa sì che
restino così anche installando qualcosa di nuovo: un aggiornamento avviene solo quando lo
si decide. Per aggiungere una dipendenza si usa `npm install nome`, per installare quelle
esistenti sempre `npm ci`.

## Provare il sito prima di pubblicarlo

```bash
cd site
npm run build
npm run check
npm run preview
```

`check` si ferma con un elenco di problemi se manca una pagina, se un link o un'immagine
punta a un file che non esiste, o se un file supera i 25 MB che Cloudflare accetta.

`preview` usa Wrangler, lo strumento di Cloudflare: la prima volta lo scarica (la versione
è fissata nello script), poi serve `out/` applicando anche `public/_headers`, cosa che un
server qualsiasi non farebbe. Da controllare nel browser: che `/` porti alla lingua giusta,
che si navighi tra le pagine senza errori nella scheda *Rete* degli strumenti per
sviluppatori, che un indirizzo inesistente mostri la pagina 404 del sito.

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

## Il font del corpo del testo

Il testo del sito è in Google Sans Flex, servito da un file nostro in
`site/src/fonts/GoogleSansFlex-9pt-latin.woff2` (51 KB). Non va modificato a mano: si
rigenera dal file variabile in `font/`, che pesa 4 MB e contiene sei assi. Il comando fissa
l'ottico a 9 (la versione "da testo"), toglie gli assi che non usiamo, riduce ai caratteri
latini e comprime. Serve [fonttools](https://fonttools.readthedocs.io):

```powershell
py -m pip install --user fonttools brotli

py -m fontTools.varLib.instancer "font/Google_Sans_Flex/GoogleSansFlex-VariableFont_GRAD,ROND,opsz,slnt,wdth,wght.ttf" opsz=9 GRAD=0 ROND=0 slnt=0 wdth=100 -o "$env:TEMP\GSF-9pt-var.ttf"

py -m fontTools.subset "$env:TEMP\GSF-9pt-var.ttf" --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD" --layout-features="*" --flavor=woff2 --output-file="site/src/fonts/GoogleSansFlex-9pt-latin.woff2"
```

## I video dei progetti

I file pronti per il web stanno in `site/public/video/` e sono versionati, perché Cloudflare
li pubblica così come sono: **nessun file può superare i 25 MB**. I master restano
nell'archivio `Sito/`.

Il video di Syntonia era 66 MB, esportato a 8,6 Mbps e con due fasce nere sopra e sotto
(un 16:9 dentro una tela verticale). Tagliate le fasce e ricompresso, è sceso a 11 MB. Serve
[ffmpeg](https://ffmpeg.org):

```powershell
# 1. Trova le fasce nere da tagliare, se ci sono
ffmpeg -ss 3 -t 25 -i "Sito/NOME.mp4" -vf cropdetect=24:2:0 -f null -

# 2. Taglia e comprimi (crop=LARGHEZZA:ALTEZZA:X:Y, dal passaggio sopra)
ffmpeg -i "Sito/NOME.mp4" -vf "crop=1080:628:0:376" -c:v libx264 -crf 22 -preset slow -profile:v high -pix_fmt yuv420p -maxrate 2600k -bufsize 5200k -c:a aac -b:a 128k -movflags +faststart "site/public/video/NOME.mp4"

# 3. Estrai il fotogramma di copertina (va in assets/img, come le altre immagini)
ffmpeg -ss 2 -i "site/public/video/NOME.mp4" -frames:v 1 -q:v 3 "site/assets/img/NOME_video.jpg"
```

`-movflags +faststart` serve perché il video cominci a vedersi prima di essere scaricato
tutto. Poi si aggiunge `video: { src: "NOME", poster: "NOME_video" }` al file del progetto.

## Se un font non si installa

Windows si rifiuta di installare un font **bloccato**, cioè scaricato da internet, e spesso
non dice perché: il doppio clic apre l'anteprima ma "Installa" non fa nulla. Si sblocca così,
poi l'installazione funziona normalmente:

```powershell
Get-ChildItem font -Recurse -Include *.ttf | Unblock-File
```

## Lingue

Ogni pagina esiste in due versioni, `/it/…` e `/en/…`. Il selettore in alto a destra
cambia lingua restando sulla stessa pagina. Le pagine si dichiarano a vicenda ai motori
di ricerca con `hreflang`, così non vengono trattate come contenuto duplicato.

## Pubblicazione

Il sito verrà pubblicato su Cloudflare Pages con queste impostazioni:

- Cartella radice del progetto: `site`
- Comando di build: `npm run build`
- Cartella di output: `out`

Ogni push sul ramo `main` farà partire un nuovo deploy. Cloudflare legge la versione di
Node da `site/.node-version`, quindi costruisce il sito con la stessa usata in locale.

Due file in `site/public/` parlano direttamente con Cloudflare:

- **`_headers`** decide per quanto i browser tengono in memoria ogni tipo di file (l'HTML
  mai, così un aggiornamento si vede subito; immagini e video una settimana; JavaScript e
  font un anno, perché il loro nome cambia a ogni modifica) e aggiunge le intestazioni di
  sicurezza di base. Ogni regola è spiegata nel file.
- Non c'è un `_redirects`: la radice `/` è una pagina che sceglie `/it/` o `/en/` in base
  alla lingua del browser, cosa che le regole di Cloudflare non sanno fare.
