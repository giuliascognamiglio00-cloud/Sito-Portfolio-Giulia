# Roadmap — Sito portfolio Giulia Scognamiglio

> Stato: **M1 completata**, **M2 completata a metà** (mancano i contenuti di Giulia), poi la M3. Ogni milestone è chiusa e verificabile: alla
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
| Categorie | **Works** e **Accademia**, ordine cronologico. Mai "Omen": è il datore di lavoro attuale e la dicitura invecchierebbe male |
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
   ├─ scripts/optimize-images.mjs    (M2) genera avif/webp in più dimensioni
   ├─ public/
   │  ├─ img/<slug>/…                (M2) immagini ottimizzate
   │  ├─ cv/…                        (M2)
   │  ├─ _redirects                  / → /it/
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
      ├─ components/                 Nav, Footer, Hero, Placeholder, LangSwitch,
      │                              ThemeToggle, ThemeScript
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
- La riga sull'esperienza attuale in `profile.ts` è generica ("Ruolo attuale in azienda"): da
  riscrivere insieme, senza nominare il datore di lavoro.
- Rilettura delle traduzioni inglesi (progetti, bio, etichette).
- I progetti professionali: la sezione Works mostra un messaggio "arriveranno presto".

### M3 — Polishing del sito

*Obiettivo: quello che si vede è finito.*

Cosa significhi "polishing" per questo sito **non è ancora deciso**, e non coincide per
forza con la bozza: la bozza è un punto di partenza, non un obiettivo da replicare
fedelmente. Il perimetro si definisce insieme a Giulia, all'inizio della milestone, quando
si scrive il piano di implementazione.

Aree da considerare, senza impegno sul contenuto:

- [ ] Aspetto e identità visiva: quanto tenere della bozza e cosa cambiare
- [ ] Rifiniture di interazione e dettaglio (transizioni, stati, tema chiaro/scuro)
- [ ] Accessibilità
- [ ] SEO e condivisione dei link
- [ ] Pagina 404 in tema
- [ ] Verifica su dispositivi reali

**Da definire insieme:** l'elenco preciso delle attività e il criterio con cui dire che la
milestone è chiusa.

### M4 — Preparazione al caricamento online

- [ ] `_redirects` per mandare `/` alla lingua giusta; `_headers` con cache lunga sugli
      asset, `no-cache` sull'HTML e intestazioni di sicurezza di base
- [ ] Verificare che l'export non contenga nulla che richieda un server
- [ ] Prova in locale del pacchetto finale, controllo di tutti i link
- [ ] Bloccare le versioni delle dipendenze e documentare i comandi nel README

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
npm install
npm run lint          # nessun errore
npm run typecheck     # nessun errore
npm run build         # genera out/
npx serve out         # sito statico servito in locale
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
