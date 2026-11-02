@AGENTS.md

# Pagine in lavorazione (WIP)

Quando Giulia chiede di "mettere in WIP" una pagina, il suo indirizzo resta pubblicato ma
mostra la pagina "Work in progress" (`src/components/WorkInProgress.tsx`, testi in `wip` nei
dizionari IT ed EN), e **ogni blocco del sito che porta a quella pagina sparisce**, come se
fosse archiviata. Togliere il WIP deve riportare tutto com'era senza altro lavoro.

L'unica fonte è l'elenco `WIP_PATHS` in `src/lib/wip.ts`: percorsi senza lingua e senza barre
agli estremi, come i segmenti di `src/lib/routes.ts` (es. `"works/syntonia"`). Non si
cancellano contenuti, file o immagini e non si mettono condizioni sparse nei componenti: si
interviene sulla fonte dei link, con `isWip(...)`.

## Mettere una pagina in WIP

1. Aggiungere il percorso a `WIP_PATHS`.
2. Controllare che la pagina mostri il WIP: le pagine progetto (`app/[lang]/works/[slug]`) lo
   fanno già. Per un altro tipo di pagina, all'inizio del componente della pagina aggiungere
   `if (isWip(...segmenti)) return <WorkInProgress lang={lang} dict={dict} />;` e in
   `generateMetadata` restituire `robots: { index: false }`, come nella pagina progetto. La
   rotta deve restare in `generateStaticParams`, altrimenti l'indirizzo dà 404.
3. Cercare **tutti** i link verso quella pagina: `grep` su `routes.<nome>(`, sul percorso
   scritto a mano (`"/works/…"`, `href=`) e sulle funzioni che producono elenchi di link
   (`getProjects`, `getNextProject`). Ogni blocco che li contiene (scheda, voce di menu,
   pulsante, "progetto successivo") va tolto filtrando con `isWip` **nel punto da cui il link
   nasce**, non nascondendolo con il CSS.
   - Progetti: è già fatto in `getProjects()` (`src/content/projects/index.ts`), da cui nascono
     schede della home, schede di "I miei lavori", filtri per anno e macroarea e "progetto
     successivo". `getAllProjects()` include anche i WIP e serve solo a pubblicarne l'indirizzo.
   - Pagine fisse (about, contact…): i link sono in `Nav`, `Footer` e nelle pagine stesse;
     filtrare le voci con `isWip` dove vengono costruite.
4. `npm run build && npm run check`, poi controllare in locale che l'indirizzo mostri il WIP e
   che nessun link al sito porti più lì (`grep -r "<percorso>/" out --include=*.html` deve
   trovare solo la pagina stessa).

## Togliere una pagina dal WIP

Togliere il percorso da `WIP_PATHS`, poi `npm run build && npm run check`. Le condizioni con
`isWip` restano: senza percorsi nell'elenco non fanno nulla, e serviranno alla prossima volta.

## Pagine attualmente in WIP

Sono quelle di `WIP_PATHS`; il commit che le aggiunge o le toglie lo dice nel messaggio.
