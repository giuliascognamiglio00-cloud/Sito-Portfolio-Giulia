# Roadmap — Sito portfolio Giulia Scognamiglio

> Stato: **M1 completata**, **M2 completata a metà** (mancano i contenuti di Giulia), **M3 in
> corso** (mastro 1 su tutte le pagine progetto), **M4 quasi chiusa**. Ogni milestone è chiusa e verificabile: alla
> fine di ciascuna il sito è in uno stato funzionante.

## Contesto

Il sito portfolio serve a **trovare nuovi clienti e nuove opportunità di lavoro**. Deve
comunicare l'ampiezza del lavoro di Giulia — art direction, brand identity, campagne
integrate, compositing — e non incasellarla nel solo social media marketing.

Il punto di partenza era una bozza: un unico file HTML da 4,4MB con dentro tutto — CSS,
JavaScript, routing via hash e 21 immagini in base64. Ben fatta e con un'identità visiva
già precisa, ma non manutenibile, non indicizzabile dai motori di ricerca, e con ogni
contenuto sepolto nel codice.

L'obiettivo è ricostruirla come **sito Next.js multi-pagina, bilingue IT/EN, generato
staticamente e pubblicato su Cloudflare Pages**, con i contenuti separati dal codice: per
aggiungere un progetto basta aggiungere un file.

## Decisioni prese

| Tema | Decisione |
|---|---|
| Backend | Nessuno. Static export; i contenuti sono file versionati nella repo |
| Lingue | Bilingue IT/EN da subito, rotte `/it` e `/en` |
| Categorie | **Lavori** e **Progetti accademici**, ordine cronologico. Mai "Omen": è il datore di lavoro attuale e la dicitura invecchierebbe male |
| Docker | Escluso: Cloudflare Pages non lo usa per il deploy |
| Repository | Si riusa questa, con il sito nella sottocartella `site/` |
| Download | Solo il CV, compresso sotto i 2MB. Il sito stesso è il portfolio |
| Automazione | GitHub Actions per i controlli, Cloudflare Pages per il deploy |

## Scelte tecniche e perché

**CSS Modules con variabili CSS globali, non Tailwind.** Il design system della bozza è
già scritto in CSS puro, con token ben strutturati e dark mode funzionante: si porta
quasi per intero. Tailwind significherebbe riscriverlo in un'altra sintassi senza
guadagnarci nulla, e allontanerebbe Giulia dal CSS che sa già leggere e modificare.

**Static export (`output: 'export'`), non SSR.** Un portfolio non ha contenuti dinamici.
L'export statico dà pagine HTML vere — indicizzabili, senza cold start, gratis su
Cloudflare Pages e impossibili da rompere in produzione.

**Immagini pre-ottimizzate a build time con `sharp`, non `next/image` a runtime.**
L'ottimizzazione automatica di Next richiede un server. Con un export statico si
pre-generano le varianti `.avif`/`.webp` in più dimensioni e si servono con `srcset`:
stesso risultato, zero infrastruttura.

---

## Struttura della repository

```
Sito Portfolio Giulia/
├─ roadmap.md                        questo file
├─ .vscode/                          task "Start Site" e "Stop Site"
├─ README.md                         come lavorare sul sito
├─ .github/workflows/ci.yml          (M6) lint + typecheck + build di prova
├─ Sito/                             bozza originale — archivio
├─ Giulia_Scognamiglio_CV_EN.pdf     archivio
├─ Giulia Scognamiglio_portfolio_2023_3BGD.pdf   archivio
└─ site/                             ← root del progetto su Cloudflare Pages
   ├─ next.config.ts                 output:'export', trailingSlash
   ├─ assets/img/                    le 21 immagini sorgente, non pubblicate
   ├─ .node-version, .npmrc          (M4) Node 24.19.0, versioni esatte
   ├─ scripts/optimize-images.mjs    (M2) genera avif/webp in più dimensioni
   ├─ scripts/check-export.mjs       (M4) controlla out/ prima di pubblicare
   ├─ public/
   │  ├─ img/…                       (M2) immagini ottimizzate, generate
   │  ├─ cv/…                        (M2)
   │  ├─ video/…                     (M3)
   │  └─ _headers                    (M4) cache e sicurezza
   └─ src/
      ├─ app/
      │  ├─ (root)/                  la rotta "/", smista alla lingua del browser
      │  └─ [lang]/
      │     ├─ layout.tsx            font, nav, footer, metadata + hreflang
      │     ├─ page.tsx              home
      │     ├─ works/page.tsx        indice (Works + Accademia, cronologico)
      │     ├─ works/[slug]/page.tsx (M2) pagina progetto
      │     ├─ about/page.tsx        chi sono + download CV
      │     └─ contact/page.tsx      contatti — già completa
      ├─ components/                 Nav, Footer, Hero, LangSwitch, ThemeToggle…;
      │                              CaseStudy (mastro 1), Mosaic, PhoneStories,
      │                              Floaters, FloatMotion, ToolIcon
      ├─ content/
      │  ├─ projects/<slug>.ts       (M2) un file per progetto, testi IT ed EN
      │  ├─ profile.ts               (M2) bio, formazione, strumenti
      │  └─ dictionaries/{it,en}.ts  etichette dell'interfaccia
      ├─ lib/                        i18n.ts, routes.ts, site.ts
      └─ styles/                     tokens.css, globals.css, *.module.css
```

**Come si aggiunge un progetto, a lavoro finito:** si crea un file in
`src/content/projects/`, si mettono le immagini in `site/assets/img/`, si lancia lo script
di ottimizzazione, si pusha. Indice, pagina progetto, sitemap e link "prossimo progetto"
si aggiornano da soli.

---

## Le milestone

### M1 — Structuring della repository ✅

*Obiettivo: lo scheletro esiste, gira in locale, non contiene ancora contenuti veri.*

- [x] Recuperare i 21 asset dalla bozza estraendoli dal base64
- [x] Sistemare i nomi dei file nell'archivio `Sito/` (vedi nota in fondo)
- [x] Installare Node.js LTS (24.19.0)
- [x] Inizializzare Next.js in `site/`, configurato per l'export statico
- [x] Portare il design system della bozza in `tokens.css` e `globals.css`: palette, dark
      mode automatica con override manuale, tipografia, `prefers-reduced-motion`. I font
      sono caricati con `next/font`, quindi serviti dal nostro dominio invece che dalla
      CDN di Google
- [x] Creare l'albero delle rotte con pagine segnaposto, l'impalcatura i18n
      (`generateStaticParams` su `[lang]`, dizionari IT/EN) e i componenti Nav e Footer
- [x] Scrivere `.gitignore` e il README
- [x] Task VS Code "Start Site" (chiude e riavvia) e "Stop Site"

**Verificato:** `npm run lint`, `npm run typecheck` e `npm run build` passano senza errori;
il build genera 8 pagine statiche (4 rotte × 2 lingue) più la radice che smista alla
lingua del browser; ogni pagina ha titolo, `canonical` e `hreflang` corretti; il server di
sviluppo risponde su tutte le rotte in entrambe le lingue.

**Versioni effettive:** Next.js 16.3.5, React 19.2.8, Node 24.19.0. Il piano ipotizzava
Next 15, ma `create-next-app` installa la versione corrente.

### M2 — Caricamento dei contenuti 🟡

*Obiettivo: tutti i testi e le immagini veri sono dentro, in due lingue.*

- [x] Definire il tipo `Project`: slug, categoria, data, colore accento, copertina, e per
      ogni lingua titolo, tipo di lavoro, cosa hai realizzato, strumenti, introduzione,
      insight, concept, immagini con didascalia e testo alternativo
- [x] Trasferire i 4 progetti accademici dalla bozza, riusando i testi italiani già
      scritti — sono buoni, non vanno riscritti
- [~] Tradurre in inglese progetti, bio ed etichette — **bozza scritta, in attesa della rilettura di Giulia**. **La bozza di traduzione va riletta
      da Giulia**: il tono di voce è suo
- [x] Script `sharp`: genera `.avif` e `.webp` a 640/1024/1600px più fallback `.jpg`, con
      un componente `<Picture>` che serve il `srcset` giusto
- [x] Comprimere il CV inglese sotto i 2MB — era già a 1,4MB, copiato in `site/public/cv/`

**Serve da Giulia:** i progetti professionali che sostituiscono i tre segnaposto
(immagini, titolo, cliente o contesto, cosa hai fatto, strumenti, due righe su idea e
risultato), e la rilettura delle traduzioni. Se i progetti professionali non sono pronti,
il sito parte lo stesso con la sola sezione Accademia e si aggiungono dopo, uno alla volta.

**Fatto quando:** ogni progetto ha la sua pagina in IT e in EN, l'indice li elenca in
ordine cronologico raggruppati per categoria, nessuna immagine è rotta.

**Verificato:** lint, typecheck e build passano; il build genera le pagine dei 4 progetti in
IT ed EN; tutti i 992 riferimenti a immagini nell'HTML esportato puntano a file esistenti.

**Ancora aperto:**
- Le **date dei progetti** in `src/content/projects/index.ts` sono provvisorie (ricavate
  dall'ordine della bozza): Giulia deve dare quelle vere.
- La riga sull'esperienza in `profile.ts` è «OMEN srl, ruolo attuale»: mancano ruolo e anni.
- Rilettura delle traduzioni inglesi (progetti, bio, etichette).
- **Syntonia** è il primo progetto professionale in linea: la sezione Lavori non è più vuota.
  Le immagini sono quelle vere e Giulia ha confermato che **il rebranding è lavoro suo e si
  può pubblicare**, quindi il progetto ha anche la macroarea Branding. Restano da rileggere
  **i testi, che sono una bozza ricavata dalle immagini**, e soprattutto da correggere
  `date`: 2025-09 è un segnaposto e decide l'ordine dei progetti e il filtro per anno. Anche
  `kind` e `tools` sono ipotesi.
- Mancano gli altri progetti professionali.

### M3 — Polishing del sito 🟡

*Obiettivo: quello che si vede è finito.*

Il perimetro è stato definito con Giulia all'inizio della milestone. La bozza è un punto di
partenza, non un obiettivo da replicare fedelmente.

Fatto (da verificare a occhio nel browser):

- [x] Nome in Big Shoulders (400–500) e ruolo in Roboto Condensed 400 maiuscolo
- [x] Home a due colonne: testo a sinistra, foto a destra **senza riquadro** (il ritaglio
      sta direttamente sullo sfondo). La foto è `Giulia foto CV.png`, un ritaglio con sfondo
      trasparente: la pipeline immagini ora accetta anche PNG
- [x] Foto nuova anche in "Chi sono", nel riquadro arrotondato di prima
- [x] Etichette di macroarea nelle pagine progetto (campo `areas`, da confermare con Giulia)
- [x] Carosello con scroll-snap in ogni pagina progetto, provvisorio: convive con la galleria
- [x] Contatti: sezione "Meet me" (senza video, con segnaposto) ed epigrafe di chiusura.
      Testi IT/EN sono bozze da rileggere
- [x] Pagina 404 in tema, bilingue (`global-not-found`)
- [x] Hero corretta: il nome si dimensiona sulla sua colonna e la foto è tagliata a filo dello
      sfondo colorato della sezione (non più dell'ultima riga di testo)
- [x] Footer a filo pagina, sfondo uguale al resto del sito, con una linea sottile a
      separarlo e il download del CV accanto ai contatti
- [x] Contatti: pulsante di chiusura rinominato ("Mettiamoci in contatto" / "Get in touch").
      La foto segnaposto nel riquadro di chiusura è stata provata e poi tolta su richiesta
      di Giulia: il riquadro resta solo testo e pulsante
- [x] Pagine progetto: le etichette di macroarea sono state spostate sotto la linea che
      divide il titolo dalla griglia Tipo/Cosa ho realizzato/Strumenti (campo `areas`,
      nuovo `metaBlock` in `works/[slug]/page.module.css`)
- [x] Pagine progetto: `introImage` è ora lo sfondo fotografico a piena pagina dell'intestazione
      (titolo, macroaree e griglia Tipo/Cosa ho realizzato/Strumenti sopra la foto, con uno
      scrim scuro che garantisce la leggibilità del testo chiaro anche su un'immagine chiara).
      Il testo di presentazione (`intro`) e l'eventuale Insight/Concept sono tornati sotto,
      su sfondo normale. Per ora un'immagine già esistente per progetto, scelta a occhio per
      la leggibilità (rikka_1, tlou_2, oculus_1, goliosi_2): da sostituire quando Giulia avrà
      immagini pensate apposta per questo spazio
- [x] Corpo del testo passato a Google Sans Flex, ottico fissato a 9pt come nel file
      `GoogleSansFlex_9pt-Regular` che Giulia aveva scelto. Ora è servito da un file nostro
      ricavato dal variabile in `font/`: 4MB e sei assi diventano 51KB con il solo asse del
      peso, ridotti ai caratteri latini (comando nel README). Serviva perché Google Sans Flex
      è troppo recente per la tabella di metriche di Next: a ogni build Turbopack avvisava
      «Failed to find font override values» e non generava il font di ripiego calibrato, con
      un sobbalzo del testo al primo caricamento. Da un file locale Next le metriche le
      ricava da solo — avviso risolto, `size-adjust` presente nel CSS prodotto
- [x] Pagine progetto: nuovo blocco facoltativo di confronto **prima/dopo**
      (`components/Compare.tsx`), due immagini sovrapposte con una barra verticale da
      trascinare. È un `<input type="range">` trasparente steso sul riquadro, così
      trascinamento, tocco, frecce e semantica per i lettori di schermo li dà il browser; il
      taglio è un `clip-path`, che non fa "zoomare" l'immagine sopra mentre scorre. Si attiva
      aggiungendo `compare` al file di un progetto, come tutto il resto dei contenuti
- [x] Oculus: la tavola del making-of è uscita dalle immagini del progetto ed è diventata il
      lato "prima" del confronto, messo in cima — il processo si racconta prima dei lavori
      finiti. Il lato "dopo" è `oculus_thumb`; se a schermo intero risulta morbida (è una
      miniatura 960×540) basta cambiarla in `oculus_1`, che è la stessa foto a 1600px
- [x] Nuovo modo di mostrare le immagini di un progetto: **sfalsate**, una sotto l'altra, a
      lati alterni, con titolo e didascalia di fianco invece che sotto. Si attiva per singolo
      progetto con `gallery: "stagger"`, e prende il posto sia del carosello sia della griglia.
      Per ora lo usa **solo Oculus**: gli altri progetti restano con carosello e griglia. Le
      immagini qui tengono la loro proporzione vera, e la linea nel colore d'accento divide il
      titolo dalla descrizione
- [x] Sezioni raccontate prima del carosello (campo `sections`): ognuna ha un titolo e le sue
      immagini, impaginate **sfalsate** (`Stagger.tsx`, descrizione di fianco) o a **griglia**
      (`ImageGrid.tsx`, didascalia sotto). Un riquadro può contenere più immagini: allora
      diventa un piccolo carosello da sfogliare (`Slides.tsx`), una per volta, col dito, col
      mouse, con le frecce o con i pallini. Syntonia ne usa due: **il rebranding**
      (costruzione del marchio, marchio e palette, i tre simboli come carosello) e **i poster
      per la sede** (il mockup in ufficio più i tre formati)
- [x] Mockup cliccabili: dove un'immagine è un mockup, il clic apre l'artwork piatto a schermo
      intero (`components/Artwork.tsx`, che usa `<dialog>`, quindi Esc, fuoco e fondo oscurato
      li gestisce il browser). La sezione dei poster di Syntonia si apre con la panoramica
      dell'open space a piena larghezza e sotto ha tre mockup: i manifesti piatti non stanno
      in pagina, si vedono solo cliccando il mockup che li contiene
- [x] Foto di sfondo dell'intestazione di Syntonia: una veduta aerea di un ponte, scura e
      uniforme, quindi regge bene il testo chiaro. Stessa cosa per The Last of Us, che ora usa
      l'infetto nel buio invece di un'immagine già presente in galleria
- [x] **Doggo** prende il posto di Goliosi: recuperato dalle tavole del portfolio 2023
      estratte dal PDF, con il testo di presentazione che Giulia aveva già scritto. Goliosi
      resta nell'archivio `Sito/` e nella storia di git, se servisse rimetterlo
- [x] Gerarchia della pagina Syntonia: il video sale subito dopo il rebranding e prima delle
      affissioni, con molto vuoto sopra e sotto perché arrivandoci scorrendo non abbia
      distrazioni attorno. Immagini del rebranding e griglia dei poster rimpicciolite
- [x] Più aria tra il titolo del progetto e la linea sotto, in tutte le pagine progetto
- [x] Pagina Lavori: la linea del tempo passa all'altezza dei pallini invece che sotto, e la
      riga "I progetti, dal più recente" è scesa sotto al titolo, allineata a sinistra,
      invece di stare a destra sulla stessa riga
- [x] Ordine della pagina progetto configurabile: con `carousel: "end"` il carosello va in
      fondo. Syntonia ora è intro → rebranding → video → carosello
- [x] Il video riparte da capo se ci si clicca sopra: è un bottone vero steso sul riquadro,
      quindi si raggiunge anche con la tastiera
- [x] Video di presentazione nelle pagine progetto (`components/ProjectVideo.tsx`, campo
      `video`): prende il posto della griglia di immagini sotto al carosello. Parte da solo,
      muto e in loop quando entra nello schermo e si ferma quando esce, così non scarica nulla
      a chi non ci arriva; un pulsante accende l'audio, e con "riduci animazioni" non parte da
      solo ma mostra i controlli. Lo usa Syntonia, al posto delle immagini ripetute
- [x] Pubblicare il video ha richiesto di risolvere due cose: **Cloudflare Pages rifiuta i
      file oltre i 25 MB** e il master era 66 MB, esportato a 8,6 Mbps; ed era un 16:9 dentro
      una tela verticale 4:5, con due fasce nere. Tagliate le fasce e ricompresso, è sceso a
      11 MB. Il master resta in `Sito/`, la versione web è versionata in `site/public/video/`
      perché Cloudflare la pubblica com'è. Comandi nel README
- [x] Carosello e griglia si adattano alla forma delle immagini del progetto invece di
      ritagliare tutto a 16:9: la proporzione vera del primo file diventa la variabile CSS
      `--shot`, e con le immagini verticali le slide del carosello si stringono (`--slide`).
      Serviva per Syntonia, che lavora in 4:5 mentre tutto il resto del sito è 16:9; sugli
      altri progetti non cambia nulla, erano già tutti 16:9
- [x] Bottone "Scarica il CV" animato (`components/DownloadCv.tsx`), ispirato allo shot
      "Send Button Interaction": al clic la freccia scivola via, il bottone si stringe sui tre
      puntini e si riapre con la spunta disegnata e "Scaricato", poi torna com'era. Resta un
      link normale con `download`, quindi il file si scarica anche senza JavaScript, e
      l'animazione si spegne con `prefers-reduced-motion`
- [x] Pagina Lavori: sotto il titolo una timeline (`components/Timeline.tsx`) filtra i
      progetti per anno. Mostra solo gli anni che esistono davvero tra le date dei
      progetti, quindi cresce da sola man mano che le date si aggiungono o cambiano;
      compare solo quando c'è più di un anno tra cui scegliere. Il filtro è lato client
      (`components/WorksList.tsx`), le liste restano ordinate dal più recente
- [x] **Mastro 1 delle pagine progetto**, dal wireframe di Giulia, applicato a **Doggo,
      Rikka e The Last of Us** (`layout: "case"`, `components/CaseStudy.tsx`). Intestazione centrata
      sulla foto di sfondo (resta lo scrim): titolo, sottotitolo, macroaree. Sotto, Brief /
      Concept / Strumenti come tre epigrafi a sé stanti, senza cornice, ognuna con una linea
      sottile sopra al titolo; poi **Moodboard** a piena larghezza, **Output** come mosaico di
      riquadri etichettati (tre colonne, ogni riquadro occupa 1 o 2 colonne e righe) e
      un'immagine di chiusura. Tipo e Cosa ho realizzato non compaiono in questo layout. Dove
      manca un'immagine c'è un segnaposto con le diagonali, come nel wireframe. Tolti, su
      richiesta di Giulia, il numero "Progetto 0N", lo sfondo a quadretti degli output e, per
      ora, la barra progetto precedente · firma · progetto successivo. Nella colonna
      Strumenti ogni software ha la sua icona (`components/ToolIcon.tsx`: Figma col suo logo,
      le app Adobe come quadrato e sigla nei loro colori, una sigla neutra per gli altri);
      dove c'è un insight, sta sotto al concept. Le righe del mosaico sono alte 9/16 di una
      colonna, così le tavole 16:9 nei riquadri 1×1 e 2×2 si vedono intere
- [x] **I font non si caricavano su nessuna pagina**: tutto il sito usciva in Times. Le
      classi di `next/font` erano sul `<body>`, ma `tokens.css` compone `--text` e `--display`
      su `:root`, un livello sopra, dove quelle variabili non esistevano ancora. Spostate su
      `<html>`. Era la causa delle schermate di prova "con i font di sistema"
- [x] Corpo del testo passato da Google Sans Flex a **Google Sans**, servito da un file
      nostro ricavato dal variabile in `font/Google_Sans/` (44 KB, comando nel README). Parte
      dal peso 400: il corpo, che era a 300, ora è a 400
- [x] **Doggo rifatto dal materiale d'esame** (`Sito/doggo2/`): brief, concept e insight dalla
      presentazione PDF, riscritti brevi; i dati della ricerca (sondaggi, personas, card
      sorting, architettura) restano fuori dalla pagina su richiesta di Giulia e compaiono
      solo come insight («per il 60% dei padroni…»). Il mosaico mostra solo il lavoro
      finito: la landing (mockup tablet+telefono, MacBook, iPad, pagina Esplora) e l'app
      (onboarding, Esplora, mappa, ricerca, profilo). Le schermate dell'app sono pagine del
      PDF ritagliate sul contenuto, i mockup sono ritagliati sul dispositivo e messi in 16:9.
      Foto di apertura: i cani al parco della copertina del PDF. Il PDF (587 MB) è escluso
      da git: GitHub rifiuta i file oltre i 100 MB
- [x] Mastro 1: sezione **Wireframe** facoltativa, separata e prima degli Output (campo
      `wireframes`, stesso mosaico). Doggo ne mostra tre, scelti da Giulia: Esplora, Ristoranti
      e Profilo, pagine del PDF ritagliate sul grigio senza le linee dei flussi. Nel
      mosaico degli Output i mockup in prospettiva difficili da leggere sono stati sostituiti
      da tavole con i dispositivi di fronte (tablet e pagina Esplora)
- [x] Mastro 1: sezione **Identità visiva** facoltativa, dopo la moodboard (campo
      `identity`). Doggo mostra il marchio sul giallo, il logo in positivo e la palette,
      ricavati da `Sito/doggo2/identity/`. Il riquadro del profilo apre gli Output
- [x] Mosaici **navigabili** (`components/Mosaic.tsx`): il clic su un riquadro apre
      l'immagine intera in un `<dialog>`, con etichetta e "2 di 3"; si scorre alle altre
      dello stesso mosaico con i pulsanti, le frecce della tastiera o il dito, Esc chiude
- [x] **Navigazione a pillola fluttuante**, sticky, in vetro smerigliato (token `--glass-*`
      in `tokens.css`, con la versione scura). Non occupa spazio: le aperture con uno sfondo
      (home, foto dei progetti) partono dal bordo superiore e le passano dietro, grazie alla
      classe `under-nav`; il resto delle pagine ha lo spazio in alto da `#main`
- [x] Pagina Lavori: la **timeline è sticky**, agganciata sotto la pillola, in vetro come lei
- [x] **The Last of Us completato** dal materiale in `Sito/TLOU/`: il brief racconta la
      campagna intera (Twitter, visual con l'AI per Instagram, affissioni, content creator
      campaign con Quei due sul server e Human Safari), dalla presentazione. Il mosaico ha le tre affissioni (metro, pensilina,
      verticale), Twitter sul MacBook, il post e il profilo Instagram, i visual AI e le due
      tavole dei creator. Midjourney tra gli strumenti è dedotto dai nomi dei file: da
      confermare. Keynote e PSD (oltre 80 MB l'uno) esclusi da git
- [x] Mastro 1: **output divisi in gruppi** (campo `outputGroups`), nell'ordine del
      racconto: ogni gruppo ha titolo, testo a epigrafe e un mosaico suo, su 2, 3 o 4
      colonne. In The Last of Us i gruppi sono i tre canali — social, affissione classica,
      content creator campaign — con i testi della presentazione, da cui vengono ora anche
      insight e concept; il brief è ridotto al contesto. Le tre affissioni stanno su una riga
      sola (quattro colonne: la metro 16:9 e i due manifesti verticali alla stessa altezza).
      Tolti i visual fatti con l'AI. Moodboard: quella di Giulia, `Sito/TLOU/TLOU moodboard.jpg`
- [x] Pagina Lavori: «Accademia» diventa **«Progetti accademici»** («Academic projects»).
      I titoli dei gruppi restano fermi (provati sticky e tolti su richiesta di Giulia). La
      timeline scorre solo in orizzontale: niente più barra di scorrimento a destra
- [x] The Last of Us, social: al posto delle schermate nude il **mockup Instagram** di Giulia
      (`Sito/TLOU/Mockup_Instagram_The_Last_of_Us_trasparente.png`), ritagliato sui telefoni,
      nel riquadro alto accanto a Twitter, che ora è stretto sul MacBook
- [x] **Rikka aggiornato** con i materiali in `Sito/RIKKA/` (dallo zip «Smash»): brief dal
      testo di Giulia e dal PDF del docente (chi è il cliente, la sfida del peperoncino mai
      protagonista). Nuova sezione facoltativa del
      mastro, **stories nel telefono** (`phones`, `components/PhoneStories.tsx`): lo stop
      motion è una GIF in `public/anim/` (fotogrammi allineati, 261 KB) con il primo
      fotogramma fermo per chi riduce le animazioni, accanto alle due stories «Kikke in
      cucina». E le **illustrazioni fluttuanti** (`floaters`, `components/Floaters.tsx`):
      stelle, mani rock e peperoncini nei margini, dietro ai contenuti, che galleggiano piano
      e restano fermi con «riduci animazioni». Il testo delle stories è una bozza
- [x] Rikka, rifiniture: la **moodboard** di Giulia (`Sito/RIKKA/Moodboard Rikka – busta di
      plastica@2x.png`); lo stop motion **più lento** (1,7 s per fotogramma, 2,6 s l'ultimo)
      per leggerlo; gli **sticker escono dal mosaico** e diventano adesivi attaccati agli
      angoli delle sezioni (campo `stickers`, con `at`): alla fine ne resta uno, accanto
      alle stories; le **icone** sono più piccole,
      stanno dentro lo schermo nei margini, fanno un wiggle sul posto e, col cursore vicino,
      girano e lo seguono (fino a 48 px, entro 300 px dal cursore) (`components/FloatMotion.tsx`, spento con
      «riduci animazioni» e sui dispositivi touch)
- [x] Rikka: output **divisi per canale** come in The Last of Us — Affissione e stampa,
      Social (profilo e storie), Merchandising — con testi brevi ricavati dalle didascalie
      (bozza). Tolto il content creator. Foto di apertura: i peperoncini, titolo bianco
- [x] Rikka: **concept esteso** attorno all'idea «Rikka porta così tanta fortuna da
      ribaltare anche i piatti usciti male», in IT ed EN (bozza da rileggere)
- [x] Nuove **cover nella pagina Lavori** per Rikka, The Last of Us e Doggo, dai file
      `Cover_*.jpg` di Giulia in `Sito/` (logo del progetto a sinistra, foto a destra, 16:9)
- [x] **Syntonia sul mastro 1**: il rebranding diventa l'Identità visiva (costruzione del
      marchio, palette, i tre simboli), il video ha un blocco suo subito dopo, con tanto vuoto
      attorno, e gli output sono due gruppi, Affissione e poster per la sede e Social. Il
      mastro ora sa mostrare un **video** (campo `video`, come prima) e dei **mockup** nel
      mosaico: con `artwork` il clic apre il manifesto piatto invece del mockup. Sottotitolo,
      concept esteso e testi dei gruppi sono bozze da rileggere. Tolti carosello e sezioni
      raccontate
- [x] **Oculus sul mastro 1**, con il **confronto prima/dopo** tenuto e portato nel mastro
      (blocco «Il processo» dopo la moodboard, campo `compare` come prima). Il prima è
      `Sito/OCULUS/prima_ouculus.jpg` riallineato sull'annuncio finito con OpenCV (stessa
      scala e inquadratura, a 1600×896): trascinando la stanza resta ferma. Output: tempesta in
      grande, deserto e scogliera accanto; la tavola del making-of in chiusura. Cover e foto
      di apertura: `Portfolio_Oculus 1.jpg`. Sottotitolo, concept e insight sono bozze
- [x] Home: i titoli di sezione («Cosa faccio», «Lavori scelti») passano da Anton a Big
      Shoulders 500, più sottili (classe `display-slim` in `globals.css`)
- [x] Pagina Lavori: la timeline **non è più sticky**; sotto, le **pillole delle macroaree**
      (solo quelle usate dai progetti) filtrano insieme all'anno
- [x] Pagina Lavori al telefono: più spazio tra un progetto e l'altro; la timeline è un
      pulsante «Esplora» che si allunga con un rimbalzo, e i pallini si separano come gocce
      (filtro SVG "goo") fino a mettersi alla stessa distanza; accanto, l'icona dei filtri apre
      le pillole. Con «riduci animazioni» si apre senza movimento
- [x] Pagina Lavori: le pillole delle macroaree si aprono **solo dall'icona dei filtri**, anche
      su desktop, dove l'icona sta accanto alla timeline
- [x] Home: il nome usa **Anton 400 come nel footer** (prima Big Shoulders), con interlinea
      0.96 perché le due righe non si tocchino
- [x] Oculus: la **moodboard** di Giulia; una galleria **Backstage** a scorrimento
      orizzontale (campo `backstage` del mastro, col carosello esistente) con i 7 scatti di
      `Sito/OCULUS/BackStage`, i RAW convertiti, e in fondo la tavola del making-of che prima
      stava in chiusura; le didascalie sono bozze. E due **tentacoli** scontornati dagli
      AdobeStock (campo `tentacles`, `components/Tentacles.tsx`): uno sale dal bordo sinistro
      accanto al titolo verso il brief, l'altro entra da destra tra strumenti e moodboard.
      Ondeggiano dalla base con un ritmo irregolare e un filtro SVG li fa ondulare; fermi con
      «riduci animazioni»
- [x] Carosello: la didascalia della prima slide non è più tagliata dall'angolo arrotondato
- [x] Chi sono: nell'esperienza resta solo **OMEN srl** (tolti freelance e Idesiervo). Ruolo
      e anni sono da precisare
- [x] Moodboard tutte nella **stessa forma** (16:11, quella delle buste), segnaposto compreso
- [x] Oculus: backstage con foto **quadrate e più piccole** e un testo sotto il titolo; le tre
      edizioni **una alla volta** (`outputLayout: "switch"`, `components/OutputSwitch.tsx`):
      la tempesta in grande e le altre due come miniature a sinistra, una sopra l'altra, da
      cliccare; al telefono stanno sotto. Il **prima/dopo** viene subito dopo gli output, più
      stretto. Il testo del backstage è una bozza
- [x] Oculus: brief riscritto (ricostruzione fedele di una campagna stampa da zero, dalla
      ricerca dei materiali allo scatto) e testo del backstage (scatto in università, tre
      soggetti tra cui Giulia, scontornati e inseriti in contesti diversi). Ordine della
      pagina: moodboard → backstage → **il processo, a tutta larghezza** → output
- [x] Moodboard più piccole: larghe quanto basta per vederle **intere nello schermo** senza
      scorrere, tutte uguali
- [x] Syntonia: mosaici degli output più stretti (`outputWidth: "narrow"`, 58rem), perché a
      tutta larghezza le immagini si vedevano sgranate
- [x] Doggo: output divisi in **tre sezioni**, Primi passi, Trovare un posto (le tavole
      dell'app a tutta larghezza, così le schermate si leggono) e La landing page, a due
      colonne. La tavola di presentazione che chiudeva la pagina apre la prima sezione. I testi
      delle sezioni sono bozze
- [x] Rikka: la moodboard aggiornata da Giulia; nell'output Affissione e stampa la pensilina
      è ritagliata in verticale senza la sfumatura nera (`rikka_affissione`, da `rikka_1`) e
      sta accanto ai manifesti, alla stessa altezza
- [x] Doggo: tolta la sezione Identità visiva. Marchio, logo e palette restano in
      `site/assets/img/` se servissero di nuovo
- [x] Oculus: la tavola del making-of è la **seconda moodboard** (campo `moodboardMore`,
      `components/BoardSlides.tsx`): si vede prima la moodboard, poi un pulsante col nome
      della tavola successiva fa scorrere al making-of (anche col dito o con le frecce). Esce
      dalla galleria del backstage
- [x] Chi sono: i dati del **CV** riscritti in modo discorsivo (OMEN da aprile 2025 e cosa fa,
      AANT con il diploma nel 2025, il corso Learnn del 2026, cosa sa fare, Intercultura) e
      tolto **Cinema 4D** dagli strumenti; aggiunti quelli del CV (Firefly, Canva, Notion,
      ChatGPT). Testi in bozza
- [x] Chi sono: nuova sezione **Fuori dal lavoro** con gli interessi e la **fotocamera 3D**
      (`components/PhotoCamera.tsx`, three.js 0.186.1 installato con versione fissata e
      scaricato solo quando la sezione si avvicina allo schermo). Si gira col mouse, col dito o
      con le frecce, cambia colore, e sul display posteriore mostra la galleria delle foto di
      Giulia: cambiando foto si volta da sola. Si ferma quando esce dallo schermo; con «riduci
      animazioni» niente rotazione a riposo
- [x] Chi sono: sopra al titolo una **fascia di oggetti 3D che fluttuano**
      (`components/FloatingObjects.tsx`), trasparente sullo sfondo della pagina. Per ora c'è
      la fotocamera in miniatura, che vaga piano da un capo all'altro su un percorso morbido,
      si inclina dove va e gira su sé stessa; ferma con «riduci animazioni», nascosta ai
      lettori di schermo. Il modello della fotocamera ora sta in `components/cameraModel.ts`,
      condiviso con la galleria; per aggiungere un oggetto basta una voce in `OBJECTS`
- [ ] **Serve da Giulia:** gli altri oggetti 3D per la fascia di "Chi sono"
- [ ] **Serve da Giulia:** le foto per la fotocamera (vanno in `site/assets/img/` e i nomi in
      `photos` di `profile.ts`, con i testi alternativi). Finché mancano, il display dice
      «Foto in arrivo»

Ancora da fare:

- [ ] **Serve da Giulia:** la moodboard di Doggo (ora a segnaposto)
- [ ] Rileggere i testi di Doggo (sottotitolo, brief, concept, insight), i sottotitoli di
      Rikka e The Last of Us, i testi dei gruppi di output di Rikka e quello delle stories,
      soprattutto in inglese
- [ ] Confermare Midjourney tra gli strumenti di The Last of Us
- [ ] **Serve da Giulia:** la moodboard di Syntonia (ora a segnaposto)
- [ ] Il vecchio layout delle pagine progetto (carosello, sezioni, galleria sfalsata) non lo
      usa più nessun progetto: da togliere nella M7

- [ ] Resta un avviso di build su **Big Shoulders**, lo stesso che c'era su Google Sans Flex:
      si risolve allo stesso modo, ma il file sorgente non è in `font/` e andrebbe scaricato.
      Riguarda solo il nome nell'apertura della home, quindi può aspettare
- [ ] Rifiniture di interazione (transizioni, stati, tema chiaro/scuro)
- [ ] Accessibilità: contrasti, focus, ordine dei titoli
- [ ] Il video di Syntonia ha del parlato ma nessun sottotitolo, e parte muto: chi non sente
      l'audio perde quella parte. Da aggiungere una traccia di sottotitoli (`.vtt`) o una
      trascrizione sotto al video
- [ ] SEO e condivisione dei link (immagini Open Graph, sitemap, robots)
- [ ] Verifica su dispositivi reali

**Da definire insieme:** il criterio con cui dire che la milestone è chiusa.

### M4 — Preparazione al caricamento online 🟡

- [x] **Lingua sulla radice:** il vecchio `_redirects` mandava tutti su `/it/`, anche i
      visitatori stranieri, perché le regole di Cloudflare non sanno leggere la lingua del
      browser. È stato tolto, e ora decide la pagina `/`, che già conteneva lo script di
      smistamento: browser in inglese → `/en/`, tutti gli altri → `/it/`
- [x] `public/_headers`: HTML sempre riverificato, `_next/static/` un anno (i nomi hanno
      l'impronta del contenuto), immagini e video una settimana (i nomi no), CV un giorno;
      intestazioni di sicurezza di base. Niente CSP completa sugli script: con gli script
      inline di Next servirebbe `'unsafe-inline'` e non proteggerebbe nulla
- [x] Nulla richiede un server: nessuna rotta API, middleware, `cookies()` o `headers()`.
      `scripts/check-export.mjs` (`npm run check`) lo ricontrolla a ogni build insieme ai
      limiti di Cloudflare (25 MB per file, 20.000 file), alla presenza di tutte le pagine
      e a ogni link interno, `srcset` compresi. Riusabile così com'è nella M6
- [x] `optimize-images.mjs` ora cancella le immagini non più usate: in `public/img/` erano
      rimasti 57 file (Goliosi e altri rinominati) che sarebbero finiti online
- [x] Versioni esatte in `package.json` (senza `^`, nessun aggiornamento), `.npmrc` con
      `save-exact`, `.node-version` con 24.19.0 per Cloudflare, `npm ci` documentato
- [x] `npm run preview` usa Wrangler (versione fissata, scaricato solo quando serve) invece
      di `serve`, che ignorava `_headers`
- [x] README: comandi, «Provare il sito prima di pubblicarlo», cosa fa `_headers`.
      `site/README.md` di `create-next-app` sostituito da un rimando
- [ ] **Da Giulia, nel browser** su `npm run preview`: navigare tutte le pagine nelle due
      lingue, provare `/` con il browser in inglese, video, confronto, mockup, CV, tema

**Verificato:** lint, typecheck, build e `npm run check` passano (507 file, 20 pagine,
1825 link interni controllati); un link rotto messo apposta viene segnalato. Su Wrangler:
intestazioni giuste per ogni tipo di file, `/it/works` → `/it/works/` (308), un indirizzo
inesistente risponde 404 con la pagina del sito, tutti i file `.txt` della navigazione
rispondono.

**Fatto quando:** servendo `out/` in locale il sito funziona identico allo sviluppo.

### M5 — Caricamento del sito online

- [ ] Creare la repo su GitHub e pushare
- [ ] Cloudflare Pages: collegare la repo, cartella radice `site`, comando `npm run build`,
      output `out`
- [ ] Primo deploy e verifica su `*.pages.dev`
- [ ] Controllo su dispositivi reali e Cloudflare Web Analytics (senza cookie, niente banner)

**Serve da Giulia:** un account GitHub e uno Cloudflare, entrambi gratuiti.

**Fatto quando:** il sito è pubblico e un push su `main` fa partire un deploy da solo.

### M6 — Aggiornamento automatico con GitHub Actions

- [ ] Workflow `ci.yml`: su ogni push e pull request gira ESLint, controllo dei tipi e
      build di prova
- [ ] Controllo automatico che ogni progetto abbia i campi obbligatori in entrambe le
      lingue e un testo alternativo su ogni immagine — l'errore più facile da fare
      aggiungendo un progetto di fretta
- [ ] Protezione del ramo `main`: si unisce solo se i controlli passano

Il deploy resta a Cloudflare Pages, che lo fa già da sé: nessun token da custodire.

**Fatto quando:** una pull request con un errore voluto viene bloccata dai controlli.

### M7 — Pulizia della repository

- [ ] Rimuovere gli script una tantum e i file inutilizzati
- [ ] README definitivo: come far partire il sito, come aggiungere un progetto, come si pubblica
- [ ] Riordinare l'archivio in una cartella `archivio/` con una riga che spieghi cosa contiene
- [ ] Rilettura finale del codice per nomi coerenti

**Fatto quando:** partendo da `git clone` e `npm install` il sito gira seguendo solo il README.

### M8 — Dominio custom *(quando il dominio sarà acquistato)*

- [ ] Registrare il dominio — consigliato su Cloudflare, che lo vende al prezzo di costo
      e non ha rinnovi a sorpresa
- [ ] Collegarlo al progetto Pages, verificare HTTPS e il reindirizzamento da `www`
- [ ] Aggiornare l'URL di base nei metadata, nella sitemap e negli `hreflang`
- [ ] Aggiornare il link su LinkedIn, Behance e nel CV

**Fatto quando:** il dominio risponde in HTTPS e i link social mostrano l'anteprima corretta.

---

## Verifica end-to-end

Da eseguire alla fine della M4 e ripetere dopo ogni milestone successiva:

```bash
cd site
npm ci
npm run lint          # nessun errore
npm run typecheck     # nessun errore
npm run build         # genera out/
npm run check         # pagine, link, limiti di Cloudflare
npm run preview       # out/ servito come da Cloudflare, su localhost:8788
```

Poi, a mano:

- Aprire `/it` e `/en` e navigare ogni pagina, controllando che il cambio lingua resti
  sulla stessa pagina
- Aprire ogni pagina progetto: immagini, didascalie, link al progetto successivo
- Provare tema chiaro e scuro, e navigare un'intera pagina col solo tasto Tab
- Lighthouse su home e su una pagina progetto, in modalità mobile
- Restringere la finestra a 320px: nessuno scorrimento orizzontale
- Scaricare il CV dalla pagina "Chi sono" e verificare che si apra

---

## Note e rischi

**I nomi dei file della bozza erano tutti mescolati.** Non due file invertiti, ma tutti e
21: `Sito/index.html` era in realtà un JPEG, `Sito/LEGGIMI.txt` era il sito, e ogni
immagine portava il nome di un'altra. I nomi autentici sono stati recuperati dalle chiavi
del base64 dentro l'HTML e verificati per checksum e per contenuto — `portrait.jpg` è
risultato esattamente 550×675, la dimensione dichiarata nel codice. L'archivio `Sito/` è
stato rimesso a posto e le stesse immagini, bit-identiche, sono in `site/assets/img/`.

**Il lavoro vero non è tecnico, sono i contenuti.** Lo scheletro si costruisce in fretta;
i progetti professionali e le traduzioni inglesi sono la parte che richiede tempo. La
roadmap è pensata perché il sito possa andare online anche con la sola sezione Accademia,
e crescere dopo.

**Il portfolio PDF da 35MB resta nella cronologia git.** Toglierlo significherebbe
riscrivere la storia, e si è deciso di non farlo. Non è un problema di funzionamento, solo
un clone più lento. Quel PDF non finirà mai nel sito pubblicato.

**Le immagini disponibili sono a 1600×900.** Vanno bene per il web, ma se servisse più
qualità le sorgenti a risoluzione piena andrebbero recuperate dai file originali di
progetto.
