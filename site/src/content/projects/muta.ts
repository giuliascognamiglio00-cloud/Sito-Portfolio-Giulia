import type { Project } from "../types";

// La tesi di diploma di Giulia (DAPL06, Graphic Design), dal testo della presentazione che ha
// scritto lei e dai file in Sito/muta progetto/. Le schermate sono le catture del sito in
// Figma: `wireframebase/` i wireframe, `sito web/` la UI finita, con gli stessi nomi.
// Restano fuori, per scelta, l'analisi dei competitor e il modello economico.
// DA CONFERMARE: `date` (la registrazione del prototipo è del 22/02/2025), `tools`, `areas`.
// MANCANO: la moodboard (segnaposto) e una foto di apertura pensata apposta: ora è
// l'intestazione della pagina Esplora, a 1440 px.
export const muta: Project = {
  slug: "muta",
  category: "academy",
  areas: ["ui-ux", "branding"],
  date: "2025-02",
  // Il rosso del marchio
  accent: "#D81B59",
  cover: "muta_cover",
  introImage: "muta_hero",
  // Dal wireframe al sito: la prima schermata di ogni pagina, nell'ordine del percorso di chi
  // adotta. Tolta «Stile di vita e abitudini»: nella UI c'è il popup «Ci sei quasi…» e le due
  // schermate non si confrontano
  compare: {
    before: "muta_cmp_about_wf",
    after: "muta_cmp_about_ui",
    more: [
      { before: "muta_cmp_esplora_wf", after: "muta_cmp_esplora_ui" },
      { before: "muta_cmp_adotta_wf", after: "muta_cmp_adotta_ui" },
      { before: "muta_cmp_form_wf", after: "muta_cmp_form_ui" },
      { before: "muta_cmp_guida_wf", after: "muta_cmp_guida_ui" },
      { before: "muta_cmp_match_wf", after: "muta_cmp_match_ui" },
      { before: "muta_cmp_tuoimatch_wf", after: "muta_cmp_tuoimatch_ui" },
      { before: "muta_cmp_cane_wf", after: "muta_cmp_cane_ui" },
      { before: "muta_cmp_assistenza_wf", after: "muta_cmp_assistenza_ui" },
    ],
  },
  layout: "case",
  case: {
    // La palette: il rosso è misurato sul marchio, il verde bottiglia sulle pagine del sito.
    // DA CONFERMARE i codici esatti con Giulia
    identity: [
      { key: "muta_marchio", cols: 2, rows: 2 },
      { key: "muta_palette", rows: 2 },
    ],
    output: [],
    outputGroups: [
      // Le due pagine più lunghe del sito, intere, da scorrere dentro i MacBook
      { tiles: [], laptops: ["muta_page_about", "muta_page_esplora"] },
    ],
    prototype:
      "https://www.figma.com/proto/2hhuEIszUTnA8iPVBnCpk4/Tesi_Scognamiglio-(Muta)?page-id=206:1033&node-id=452-2803&viewport=1967,1786,0.19&t=pIeaRjgocSnolBVk-1&scaling=contain&content-scaling=fixed",
  },
  images: [],
  content: {
    it: {
      title: "Muta",
      subtitle: "Un sistema d’adozione canina consapevole.",
      kind: "Tesi di diploma · Sito web",
      made: "Ricerca, brand identity, architettura dell’informazione, wireframe, UI del sito, prototipo navigabile",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Muta è un portale pensato per accompagnare adottanti, canili e professionisti in ogni fase della relazione tra cane e proprietario. Più di una piattaforma di adozione: un punto di riferimento per scegliere un cane in modo consapevole, gestirlo ogni giorno e trovare risorse formative e supporto.\nÈ la mia tesi di diploma accademico in Graphic Design. Relatrice Diana Ciullo, correlatori Dario Moriconi e Roberto Savino.",
      compare: {
        title: "Dal wireframe al sito",
        caption:
          "Il percorso di chi adotta, una pagina alla volta: dalla presentazione di Muta al form d’adozione, dal matching al profilo del cane, fino all’assistenza.",
        beforeLabel: "Wireframe",
        afterLabel: "Sito",
        label: "About us",
        beforeAlt: "Wireframe in grigi della pagina About us: «Muta è un sistema innovativo per strutture e adottanti in cerca di aiuto» e quattro riquadri",
        afterAlt: "Pagina About us: «Muta è un sistema innovativo per strutture e adottanti in cerca di supporto», con le illustrazioni di Informazione, Assistenza e Contatti",
        more: [
          {
            label: "Esplora",
            beforeAlt: "Wireframe in grigi della pagina Esplora: «Come possiamo aiutarti?», la ricerca e le etichette degli argomenti",
            afterAlt: "Pagina Esplora: «Come possiamo aiutarti?» in bianco su una foto di persone che passeggiano con i cani, e la barra di ricerca",
          },
          {
            label: "Adotta con noi",
            beforeAlt: "Wireframe in grigi di «Adotta con noi», con un arco grigio e il pulsante Informazione",
            afterAlt: "Pagina «Adotta con noi»: l’illustrazione di una persona con dei punti interrogativi sopra la testa e la voce Informazione",
          },
          {
            label: "Form d’adozione",
            beforeAlt: "Wireframe in grigi del form d’adozione con le sei sezioni in elenco",
            afterAlt: "Il form d’adozione con le sezioni in riquadri rosa: dati personali, ambiente, stile di vita, esperienza, motivazioni",
          },
          {
            label: "Guida all’adozione",
            beforeAlt: "Wireframe in grigi della guida all’adozione, con il testo e le etichette degli argomenti",
            afterAlt: "Pagina «Guida all’adozione»: il testo con le parole chiave in evidenza e le etichette rosse degli argomenti",
          },
          {
            label: "Match",
            beforeAlt: "Wireframe in grigi del matching in corso, con un cerchio al 20%",
            afterAlt: "Pagina Match: «In base al tuo form ti verranno presentati da 1 a 5 cani» e il cerchio rosso al 20%",
          },
          {
            label: "I tuoi match",
            beforeAlt: "Wireframe in grigi di «I tuoi Match» con tre schede vuote: Arya, Rossella, Google",
            afterAlt: "Pagina «I tuoi Match» con le foto di tre cani",
          },
          {
            label: "Profilo del cane",
            beforeAlt: "Wireframe in grigi del profilo di un cane, con la galleria di foto in riquadri grigi",
            afterAlt: "Il profilo di Dusty, con la galleria di foto e l’associazione che lo ospita",
          },
          {
            label: "Assistenza",
            beforeAlt: "Wireframe in grigi di «Muta ti aiuta»: «Che tipo di assistenza stai cercando?»",
            afterAlt: "Pagina «Muta ti aiuta» con le illustrazioni di FAQ, Community e Assistenza",
          },
        ],
      },
      case: {
        story: [
          {
            at: "intro",
            title: "Il contesto",
            blocks: [
              "In Italia i cani sono sempre di più, ma l’abbandono e i rientri in canile restano un problema che non accenna a diminuire.",
              "C’entra anche l’immaginario. Prima della Legge Quadro 281 del 1991 i canili avevano soprattutto una funzione sanitaria e di controllo. Ancora oggi molti li vedono come luoghi di emergenza, legati a sofferenza e isolamento, e questo allontana chi potrebbe adottare.",
            ],
            cards: [
              { title: "85.000", meta: "2023", text: "Cani abbandonati in Italia, l’8,6% in più rispetto al 2022 (XIII Rapporto Legambiente)." },
              { title: "+25%", meta: "dal 2019", text: "La crescita della popolazione canina (Rapporto Assalco-Zoomark 2024)." },
            ],
          },
          {
            at: "intro",
            title: "I problemi",
            blocks: [],
            cards: [
              { title: "Adozioni impulsive", text: "Spesso nascono dall’estetica o dall’emozione del momento; media e social spingono le razze «alla moda»." },
              { title: "Poche informazioni", text: "Chi adotta conosce poco le esigenze del cane, e il supporto dopo l’adozione manca o non si sa che esiste." },
              { title: "Procedure", text: "Non ci sono linee guida nazionali: a volte troppo burocratiche, a volte poco rigorose." },
              { title: "Adozioni online", text: "Aumentano il rischio di scelte fatte d’impulso." },
            ],
          },
          {
            at: "intro",
            title: "La ricerca",
            blocks: [
              "Ho fatto due sondaggi. Il primo, con 420 risposte, indaga i motivi dietro l’adozione e l’abbandono: dove si prende un cane, a che età, quali difficoltà si incontrano. Il 35% si è rivolto a un addestratore. Il secondo è rivolto a canili e associazioni, e più della metà di chi ha risposto (il 54,8%) lavora nel settore da oltre sei anni.",
              "Poi ho intervistato Luca Spennacchio, educatore cinofilo, scrittore e formatore. Secondo lui le cause più comuni di un rientro in canile sono gli abbinamenti superficiali tra cane e famiglia, le aspettative irrealistiche e la fretta.",
              { quote: "Le persone non si rendono disponibili a fare un periodo di affiancamento alla struttura nel quale conoscere il cane che vorrebbero adottare: lo vogliono adesso, subito e senza riserve." },
              { quote: "I rientri dipendono per lo più da fattori che sarebbero modificabili con una diversa percezione del cane in sé, del suo valore, delle sue necessità." },
            ],
          },
          {
            at: "intro",
            title: "Come nasce Muta",
            blocks: [
              "Dalla ricerca sono venute quattro risposte, che sono diventate le funzioni del portale.",
            ],
            cards: [
              { title: "Contro la superficialità", text: "Un’alternativa sicura alle piattaforme online non regolamentate, con un matching personalizzato tra adottanti e cani." },
              { title: "Contro l’impulso", text: "Un processo di adozione più accurato e strumenti per gestire il rapporto con il cane." },
              { title: "Informazioni e supporto", text: "Guide, FAQ e assistenza, prima e dopo l’adozione." },
              { title: "Una rete", text: "Associazioni e canili collegati, per scambiarsi esperienze e buone pratiche." },
            ],
          },
          {
            at: "output",
            title: "L’identità",
            blocks: [
              "Il concept è il cambiamento: adottare un cane trasforma sia il cane sia chi lo accoglie, e Muta rende quel cambiamento più semplice, sicuro e informato.",
              "Linee morbide e forme geometriche semplici con gli angoli smussati. La palette si regge su un rosso e un verde bottiglia, scelti perché il contrasto restasse accessibile. Quattro valori guidano il tono: inclusività, empatia, affidabilità e innovazione.",
            ],
            cards: [
              { title: "Indivisible", meta: "titoli e testi", text: "Una famiglia ampia, dall’XLight al Black, con i corsivi." },
              { title: "Owners", meta: "titoli e testi", text: "Si alterna a Indivisible, con la stessa gamma di pesi." },
            ],
          },
          {
            at: "end",
            title: "Sviluppi futuri",
            blocks: [
              "Muta è pensato per ridurre i rientri in canile, con un’attenzione particolare all’educazione e al supporto dopo l’adozione. I prossimi passi: studiare l’impatto del servizio sui rientri, estenderlo alle strutture e costruire collaborazioni con veterinari ed educatori cinofili.",
              { quote: "Un modo consapevole di adottare." },
            ],
          },
        ],
        identity: [
          { label: "Il marchio", alt: "Il marchio di Muta: la testa stilizzata di un cane accanto alla scritta Muta, in rosso su fondo chiaro" },
          { label: "Palette", alt: "La palette di Muta: il rosso #D81B59 e il verde bottiglia #266C74" },
        ],
        output: [],
        outputGroups: [
          {
            title: "Il sito",
            text: "Le pagine About us ed Esplora per intero, come sono nel prototipo. Si scorrono dentro lo schermo.",
            tiles: [],
            laptops: [
              {
                label: "About us",
                alt: "La pagina About us di Muta per intero: la presentazione, come nasce Muta, i numeri su canili e rientri, i valori, le donazioni, le recensioni, i partner e la newsletter",
              },
              {
                label: "Esplora",
                alt: "La pagina Esplora di Muta per intero: «Come possiamo aiutarti?» con la ricerca, le etichette degli argomenti e le schede degli articoli",
              },
            ],
          },
        ],
      },
      coverAlt: "Il marchio di Muta accanto a un MacBook con la pagina Esplora del sito",
      images: [],
    },
    // Traduzione inglese: BOZZA da rileggere da Giulia.
    en: {
      title: "Muta",
      subtitle: "A system for mindful dog adoption.",
      kind: "Diploma thesis · Website",
      made: "Research, brand identity, information architecture, wireframes, website UI, clickable prototype",
      tools: "Figma, Illustrator, Photoshop",
      intro:
        "Muta is a portal that supports adopters, shelters and professionals through every stage of the relationship between a dog and its owner. More than an adoption platform: a point of reference for choosing a dog mindfully, caring for it day to day, and finding training resources and support.\nIt is my thesis for the academic diploma in Graphic Design. Supervisor Diana Ciullo, co-supervisors Dario Moriconi and Roberto Savino.",
      compare: {
        title: "From wireframe to website",
        caption:
          "The adopter’s journey, one page at a time: from the introduction to Muta to the adoption form, from matching to the dog’s profile, all the way to support.",
        beforeLabel: "Wireframe",
        afterLabel: "Website",
        label: "About us",
        beforeAlt: "Greyscale wireframe of the About us page: “Muta is an innovative system for shelters and adopters looking for help” and four boxes",
        afterAlt: "About us page: “Muta is an innovative system for shelters and adopters looking for support”, with the Information, Support and Contact illustrations",
        more: [
          {
            label: "Explore",
            beforeAlt: "Greyscale wireframe of the Explore page: “How can we help you?”, the search bar and the topic tags",
            afterAlt: "Explore page: “How can we help you?” in white over a photo of people walking dogs, and the search bar",
          },
          {
            label: "Adopt with us",
            beforeAlt: "Greyscale wireframe of “Adopt with us”, with a grey arch and the Information button",
            afterAlt: "“Adopt with us” page: an illustration of a person with question marks above their head and the Information item",
          },
          {
            label: "Adoption form",
            beforeAlt: "Greyscale wireframe of the adoption form with its six sections listed",
            afterAlt: "The adoption form with its sections in pink boxes: personal details, home, lifestyle, experience, motivation",
          },
          {
            label: "Adoption guide",
            beforeAlt: "Greyscale wireframe of the adoption guide, with the text and the topic tags",
            afterAlt: "“Adoption guide” page: the text with the key words highlighted and the red topic tags",
          },
          {
            label: "Match",
            beforeAlt: "Greyscale wireframe of matching in progress, with a circle at 20%",
            afterAlt: "Match page: “Based on your form you will be shown 1 to 5 dogs” and the red circle at 20%",
          },
          {
            label: "Your matches",
            beforeAlt: "Greyscale wireframe of “Your matches” with three empty cards: Arya, Rossella, Google",
            afterAlt: "“Your matches” page with photos of three dogs",
          },
          {
            label: "Dog profile",
            beforeAlt: "Greyscale wireframe of a dog profile, with the photo gallery as grey boxes",
            afterAlt: "Dusty’s profile, with the photo gallery and the association that looks after him",
          },
          {
            label: "Support",
            beforeAlt: "Greyscale wireframe of “Muta helps you”: “What kind of support are you looking for?”",
            afterAlt: "“Muta helps you” page with the FAQ, Community and Support illustrations",
          },
        ],
      },
      case: {
        story: [
          {
            at: "intro",
            title: "The context",
            blocks: [
              "There are more and more dogs in Italy, yet abandonment and dogs being returned to shelters remain a problem that shows no sign of easing.",
              "Perception plays a part too. Before the 1991 Framework Law 281, shelters mainly served a health and control function. Many people still see them as emergency places, tied to suffering and isolation, and that keeps potential adopters away.",
            ],
            cards: [
              { title: "85,000", meta: "2023", text: "Dogs abandoned in Italy, 8.6% more than in 2022 (13th Legambiente Report)." },
              { title: "+25%", meta: "since 2019", text: "Growth of the dog population (Assalco-Zoomark Report 2024)." },
            ],
          },
          {
            at: "intro",
            title: "The problems",
            blocks: [],
            cards: [
              { title: "Impulsive adoptions", text: "Often driven by looks or a passing emotion; media and social networks push “fashionable” breeds." },
              { title: "Little information", text: "Adopters know little about a dog’s needs, and post-adoption support is missing or unknown." },
              { title: "Procedures", text: "There are no national guidelines: sometimes too bureaucratic, sometimes not rigorous enough." },
              { title: "Online adoptions", text: "They raise the risk of impulsive choices." },
            ],
          },
          {
            at: "intro",
            title: "The research",
            blocks: [
              "I ran two surveys. The first, with 420 responses, looks at the reasons behind adoption and abandonment: where people get a dog, at what age, which difficulties they face. 35% turned to a trainer. The second was for shelters and associations, and more than half of respondents (54.8%) have worked in the field for over six years.",
              "Then I interviewed Luca Spennacchio, dog educator, writer and trainer. In his view the most common reasons a dog is returned are superficial dog–family matches, unrealistic expectations and haste.",
              { quote: "People aren’t willing to spend a period alongside the shelter getting to know the dog they’d like to adopt: they want it now, straight away and without reservations." },
              { quote: "Returns mostly depend on factors that could change with a different perception of the dog itself, of its value, of its needs." },
            ],
          },
          {
            at: "intro",
            title: "How Muta was born",
            blocks: [
              "The research led to four answers, which became the portal’s features.",
            ],
            cards: [
              { title: "Against superficiality", text: "A safe alternative to unregulated online platforms, with personalised matching between adopters and dogs." },
              { title: "Against impulse", text: "A more careful adoption process and tools to manage the relationship with the dog." },
              { title: "Information and support", text: "Guides, FAQs and assistance, before and after adoption." },
              { title: "A network", text: "Associations and shelters connected to share experience and good practice." },
            ],
          },
          {
            at: "output",
            title: "The identity",
            blocks: [
              "The concept is change: adopting a dog transforms both the dog and the person who takes it in, and Muta makes that change simpler, safer and better informed.",
              "Soft lines and simple geometric shapes with rounded corners. The palette rests on a red and a bottle green, chosen so the contrast stays accessible. Four values set the tone: inclusiveness, empathy, reliability and innovation.",
            ],
            cards: [
              { title: "Indivisible", meta: "headings and text", text: "A wide family, from XLight to Black, with italics." },
              { title: "Owners", meta: "headings and text", text: "Alternates with Indivisible, with the same range of weights." },
            ],
          },
          {
            at: "end",
            title: "What’s next",
            blocks: [
              "Muta is meant to reduce shelter returns, with a particular focus on education and post-adoption support. Next steps: measuring the service’s impact on returns, extending it to shelters and building partnerships with vets and dog educators.",
              { quote: "A mindful way to adopt." },
            ],
          },
        ],
        identity: [
          { label: "The logo", alt: "The Muta logo: a stylised dog’s head next to the word Muta, in red on a light background" },
          { label: "Palette", alt: "Muta’s palette: red #D81B59 and bottle green #266C74" },
        ],
        output: [],
        outputGroups: [
          {
            title: "The website",
            text: "The About us and Explore pages in full, as they are in the prototype. Scroll them inside the screen.",
            tiles: [],
            laptops: [
              {
                label: "About us",
                alt: "Muta’s About us page in full: the introduction, how Muta was born, figures on shelters and returns, the values, donations, reviews, partners and the newsletter",
              },
              {
                label: "Explore",
                alt: "Muta’s Explore page in full: “How can we help you?” with the search bar, the topic tags and the article cards",
              },
            ],
          },
        ],
      },
      coverAlt: "The Muta logo next to a MacBook showing the website’s Explore page",
      images: [],
    },
  },
};
