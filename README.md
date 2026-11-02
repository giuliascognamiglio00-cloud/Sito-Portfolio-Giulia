# Sito portfolio — Giulia Scognamiglio

Sito portfolio bilingue (italiano e inglese), costruito con Next.js e generato come sito
statico. È online su <https://giuliascognamiglio.com>, pubblicato come Worker di Cloudflare
da GitHub Actions a ogni push su `main`.

La pianificazione completa, con lo stato di avanzamento, sta in [roadmap.md](roadmap.md).

## In breve: dal computer al sito online

```
modifica in VS Code → commit → push su main → CI (controlli) → Deploy → sito online
```

- Si lavora su **un solo ramo, `main`**. È anche quello di produzione: quello che arriva su
  `main` va online. (`m3-polishing` resta nella storia di git ma non si usa più.)
- Il push fa partire due **GitHub Actions**, visibili nella scheda *Actions* della repo:
  **CI** controlla il sito, **Deploy** lo pubblica. Deploy parte solo se CI è verde: se un
  controllo fallisce, online resta la versione di prima.
- Con le immagini già in cache il giro intero dura **circa due minuti e mezzo**. Quando
  cambia un'immagine in `site/assets/img/` la CI rigenera tutte le immagini e ci mette
  circa un quarto d'ora, una volta sola.

## Cosa c'è in questa cartella

| Percorso | Cosa contiene |
|---|---|
| `site/` | Il sito. È qui che si lavora |
| `.github/workflows/` | Le due GitHub Actions: `ci.yml` (controlli) e `deploy.yml` (pubblicazione) |
| `.vscode/` | I task **Start Site** e **Stop Site** |
| `Sito/` | Archivio: la bozza originale e i materiali sorgente dei progetti (master, PDF, tavole) |
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

## Pubblicare una modifica

1. **Controlla in locale** che la pagina sia come la vuoi (Start Site).
2. **Commit.** Da VS Code: pannello *Source Control* (l'icona dei rami a sinistra, o
   `Ctrl+Shift+G`), scrivi il messaggio, poi *Commit*. Da terminale:
   `git add -A` e `git commit -m "messaggio"`.
3. **Push** su `main`: *Sync Changes* in VS Code, oppure `git push`.
4. **Segui le Actions** su GitHub, scheda *Actions*: prima compare **CI**, quando diventa
   verde parte **Deploy**. Quando anche Deploy è verde il sito è aggiornato.
5. **Guarda il sito online.** Se vedi ancora la versione vecchia, ricarica con `Ctrl+F5`.

Prima di un push importante si possono lanciare in locale gli stessi controlli della CI
(vedi [Provare il sito prima di pubblicarlo](#provare-il-sito-prima-di-pubblicarlo)): un
errore trovato sul computer si corregge prima che arrivi su GitHub.

### Se un'Action diventa rossa

Apri l'Action rossa, poi il job, poi il passaggio con la ✗: le ultime righe dicono cosa non
va. Il sito online non è stato toccato.

| Dove fallisce | Cosa significa di solito |
|---|---|
| CI → `npm run lint` | Un errore di scrittura nel codice. Si vede anche in locale con `npm run lint` |
| CI → `npm run typecheck` | Manca un campo in un file progetto, o una voce in una delle due lingue |
| CI → `npm run build` | Il sito non si costruisce: spesso un'immagine citata che non esiste in `assets/img/` |
| CI → `npm run check` | Una pagina mancante, un link rotto o un file oltre i 25 MB |
| Deploy → `wrangler deploy` | Un problema con Cloudflare: di solito il token è scaduto o è stato cambiato (vedi sotto) |

Si corregge, si fa un nuovo commit e un nuovo push: le Actions ripartono da sole.

## Comandi

Tutti da lanciare dentro `site/`.

| Comando | Cosa fa |
|---|---|
| `npm ci` | Installa le dipendenze esattamente alle versioni di `package-lock.json` |
| `npm run dev` | Server di sviluppo, con ricarica automatica |
| `npm run images` | Genera le immagini ottimizzate (parte da solo prima di dev, build, lint e typecheck) |
| `npm run lint` | Controlla il codice con ESLint |
| `npm run typecheck` | Controlla i tipi TypeScript |
| `npm run build` | Genera il sito statico in `site/out/` |
| `npm run check` | Controlla `out/`: pagine presenti, link interni, limiti di Cloudflare |
| `npm run preview` | Serve `out/` con Wrangler, lo strumento di Cloudflare, su <http://localhost:8788> |

`lint`, `typecheck`, `build` e `check` sono esattamente i controlli che fa la CI su GitHub.

Le versioni delle dipendenze sono scritte esatte, senza `^`, e `site/.npmrc` fa sì che
restino così anche installando qualcosa di nuovo: un aggiornamento avviene solo quando lo
si decide. Per aggiungere una dipendenza si usa `npm install nome`, per installare quelle
esistenti sempre `npm ci`.

## Provare il sito prima di pubblicarlo

```bash
cd site
npm run lint
npm run typecheck
npm run build
npm run check
npm run preview
```

`check` si ferma con un elenco di problemi se manca una pagina, se un link o un'immagine
punta a un file che non esiste, o se un file supera i 25 MB che Cloudflare accetta.

`preview` usa Wrangler: la prima volta lo scarica (la versione è fissata nello script), poi
serve `out/` applicando anche `public/_headers`, cosa che un server qualsiasi non farebbe.
Da controllare nel browser: che `/` porti alla lingua giusta, che si navighi tra le pagine
senza errori nella scheda *Rete* degli strumenti per sviluppatori, che un indirizzo
inesistente mostri la pagina 404 del sito.

## Come è organizzato il sito

```
site/
├─ assets/img/              le immagini sorgente (JPG e PNG), una per nome
├─ public/
│  ├─ img/                  le immagini ottimizzate, generate: non si toccano e non sono su git
│  ├─ video/                i video pronti per il web (sotto i 25 MB)
│  ├─ cv/                   il CV scaricabile
│  └─ _headers              cache e sicurezza, letto da Cloudflare
├─ scripts/
│  ├─ optimize-images.mjs   da assets/img/ genera avif, webp e jpg/png in più larghezze
│  └─ check-export.mjs      il controllo di npm run check
├─ src/
│  ├─ app/
│  │  ├─ (root)/            la rotta "/", che smista alla lingua giusta
│  │  └─ [lang]/            tutte le pagine, generate sia in /it/ che in /en/
│  ├─ components/           i pezzi del sito: Nav, Footer, CaseStudy (la pagina progetto),
│  │                        Mosaic, Carousel, Compare, PhotoCamera…
│  ├─ content/
│  │  ├─ projects/          un file per progetto, con i testi in IT e EN
│  │  ├─ profile.ts         bio, esperienza, strumenti di "Chi sono"
│  │  └─ dictionaries/      tutte le etichette dell'interfaccia, in IT e EN
│  ├─ lib/                  lingue, percorsi, indirizzi
│  └─ styles/               tokens.css (colori e font) e globals.css
└─ wrangler.jsonc           dice al Worker di Cloudflare di servire out/
```

**Dove si cambiano i testi di un progetto:** nel suo file in `site/src/content/projects/`
(per esempio `syntonia.ts`). Ogni testo c'è due volte, sotto `it` e sotto `en`.

**Come si aggiunge un progetto:** si mettono le immagini in `site/assets/img/`, si crea il
file del progetto in `site/src/content/projects/` partendo da uno esistente, e lo si
aggiunge all'elenco in `projects/index.ts`. Pagina Lavori, pagina progetto e link al
«prossimo progetto» si aggiornano da soli; l'ordine lo decide il campo `date`.

**Dove si cambiano le parole dell'interfaccia:** in
`site/src/content/dictionaries/it.ts` e `en.ts`. I due file hanno la stessa forma, e
TypeScript segnala subito se una voce manca in una delle due lingue.

**Dove si cambiano i colori e i font:** in `site/src/styles/tokens.css`. Sono variabili
CSS: cambiando un valore lì cambia in tutto il sito, tema chiaro e tema scuro compresi.

## Lingue

Ogni pagina esiste in due versioni, `/it/…` e `/en/…`. Il selettore in alto a destra
cambia lingua restando sulla stessa pagina. Le pagine si dichiarano a vicenda ai motori
di ricerca con `hreflang`, così non vengono trattate come contenuto duplicato.

## Pubblicazione: come funziona dietro le quinte

### Dove sta il sito

- **Cloudflare**, *Workers & Pages* → `sito-portfolio-giulia`: è il Worker che serve il
  sito. Non ha codice suo: `site/wrangler.jsonc` gli dice di servire i file di `out/`, di
  aggiungere la barra finale agli indirizzi (`/it/works` → `/it/works/`) e di rispondere con
  la pagina 404 del sito agli indirizzi che non esistono.
- **Indirizzi:** `giuliascognamiglio.com` e `www.giuliascognamiglio.com` (custom domain del
  Worker, HTTPS attivo), più quello tecnico
  `sito-portfolio-giulia.giuliascognamiglio00.workers.dev`.
- **Dominio:** registrato su register.it, dove restano rinnovo e posta (i record MX, SPF,
  `pop` e `autoconfig` non vanno toccati). I DNS li gestisce Cloudflare.
- **Codice:** su GitHub, `giuliascognamiglio00-cloud/Sito-Portfolio-Giulia`.

### Le due Actions

1. **CI** (`.github/workflows/ci.yml`) gira a ogni push, su qualsiasi ramo, e a ogni pull
   request verso `main`: `npm ci`, lint, controllo dei tipi, build e `npm run check`. Su un
   push a `main` conserva per 7 giorni la cartella `out/` che ha costruito.
2. **Deploy** (`.github/workflows/deploy.yml`) parte da solo quando CI finisce su `main`,
   **solo se è passata**. Non ricostruisce il sito: scarica la `out/` appena controllata e
   la pubblica con `npx --yes wrangler@4.143.0 deploy`. Online va quindi esattamente ciò che
   ha superato i controlli.

Le Actions usano la versione di Node di `site/.node-version`, la stessa usata in locale.
Se due push arrivano ravvicinati, la CI del primo si ferma e va online solo il secondo.

**Ripubblicare senza modifiche:** nella scheda *Actions*, aprire l'ultima CI di `main` →
*Re-run all jobs*. Quando ritorna verde, Deploy riparte.

### La cache delle immagini

Le immagini ottimizzate di `public/img/` (circa 1500 file) non sono su git: si generano da
`assets/img/`, e generarle da zero richiede un quarto d'ora. La CI le tiene in una cache
legata al contenuto di `assets/img/` e di `optimize-images.mjs`: finché questi non cambiano
la ritrova pronta e la CI dura poco più di un minuto. Se cambia anche una sola immagine, le
rigenera tutte una volta e da lì torna veloce.

Era il motivo per cui le build di Cloudflare, usate fino al 2 novembre 2026, duravano 19
minuti: rigeneravano tutto a ogni push.

### I segreti e il token di Cloudflare

Deploy si presenta a Cloudflare con due segreti, salvati su GitHub in *Settings → Secrets
and variables → Actions*:

| Segreto | Cos'è |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Un token creato su Cloudflare (*Profile → API Tokens*) con il modello *Edit Cloudflare Workers* |
| `CLOUDFLARE_ACCOUNT_ID` | L'ID dell'account Cloudflare, nella home della dashboard |

Una volta salvati, i segreti non si possono più leggere, solo sostituire. Se Deploy fallisce
con un errore di autenticazione: su Cloudflare si crea un token nuovo con lo stesso modello,
su GitHub si apre `CLOUDFLARE_API_TOKEN` → *Update secret* e lo si incolla, poi si rilancia
l'ultima CI.

### Le build automatiche di Cloudflare sono spente

Nel Worker, *Settings → Build*, la repo **non è collegata** (*Workers Builds* spento).
Va lasciato così: se si ricollegasse, ogni push verrebbe pubblicato due volte, e la copia di
Cloudflare andrebbe online senza aspettare i controlli.

### I file che parlano con Cloudflare

- **`site/public/_headers`** decide per quanto i browser tengono in memoria ogni tipo di
  file (l'HTML mai, così un aggiornamento si vede subito; immagini e video una settimana;
  JavaScript e font un anno, perché il loro nome cambia a ogni modifica) e aggiunge le
  intestazioni di sicurezza di base. Ogni regola è spiegata nel file.
- Non c'è un `_redirects`: la radice `/` è una pagina che sceglie `/it/` o `/en/` in base
  alla lingua del browser, cosa che le regole di Cloudflare non sanno fare.

## Il font del corpo del testo

Il testo del sito è in Google Sans, servito da un file nostro in
`site/src/fonts/GoogleSans-latin.woff2` (44 KB). Non va modificato a mano: si rigenera dal
file variabile in `font/Google_Sans/`. Il comando fissa l'ottico a 17 (la versione "da
testo") e il grado a 0, lascia variabile solo il peso (400–700), riduce ai caratteri latini e
comprime. Serve [fonttools](https://fonttools.readthedocs.io):

```powershell
py -m pip install --user fonttools brotli

py -m fontTools.varLib.instancer "font/Google_Sans/GoogleSans-VariableFont_GRAD,opsz,wght.ttf" opsz=17 GRAD=0 -o "$env:TEMP\GS-17pt-var.ttf"

py -m fontTools.subset "$env:TEMP\GS-17pt-var.ttf" --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+FEFF,U+FFFD" --layout-features="*" --flavor=woff2 --output-file="site/src/fonts/GoogleSans-latin.woff2"
```

Prima era Google Sans Flex (`GoogleSansFlex-9pt-latin.woff2`, tolto): il file variabile resta
in `font/Google_Sans_Flex/` se servisse tornare indietro.

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
