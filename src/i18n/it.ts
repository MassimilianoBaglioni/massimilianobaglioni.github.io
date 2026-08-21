import type en from './en';

const it: Partial<typeof en> & {
  instruction: {
    educationExperience: string;
    diploma: string;
    bachelorDegree: string;
    bachelorPeriod: string;
    bachelorThesis: string;
    bachelorTechnologies: string;
    masterDegree: string;
    masterCurriculum: string;
    masterThesis: string;
  };
  projects: {
    discordBotTitle: string;
    discordBotSubtitle: string;
    discordBotDescription: string;
    videoStreamerTitle: string;
    videoStreamerSubtitle: string;
    videoStreamerDescription: string;
    compilersTitle: string;
    compilersSubtitle: string;
    compilersDescription: string;
    fastAccessTitle: string;
    fastAccessSubtitle: string;
    fastAccessDescription: string;
  };
} = {
  personalInfo: {
    located: 'Basato in Italia',
  },
  header: {
    nav: {
      about: 'Chi sono',
      projects: 'Progetti',
      education: 'Educazione',
      openSource: 'Open Source',
      contact: 'Contatti',
    },
  },
  work: {
    title: 'Esperienze lavorative',
    downloadCv: 'Curriculum completo',
    technologies: 'Tecnologie',
    professionalExperience: 'Esperienza professionale',
    developer: 'Sviluppatore',
    fullStackDeveloper: 'Sviluppatore Full Stack',
    dsDigitalServicesBullets: [
      'Sviluppato siti web dinamici e piattaforme e-commerce usando WordPress + WooCommerce come CMS.',
      'Sviluppato plugin wordpress personalizzati in PHP.',
      'Seguito i clienti durante sia lo sviluppo del sito web sia la gestione dell hosting.',
    ],
    cheapfitBullets: [
      'Sviluppato il sito web e la piattaforma e-commerce.',
      'Automatizzato l’analisi dei dati dal database MySQL dell’applicazione mobile.',
      'Implementato classifiche utenti in tempo reale tramite REST API personalizzate in Python. Con frontend plain HTML/CSS/Js.',
      'Sviluppato un chatbot con AI con RAG mediante API di OpenAI con backend python e frontend React.',
    ],
    avanciaBullets: [
      'Sviluppo backend con Java, Spring Boot, Spring Batch, OracleDB, MySQL e Hibernate.',
      'Sviluppo frontend con Angular e RxJS.',
      'Sviluppato e mantenuto REST API.',
      'Lavorato con Kubernetes per il deployment e la gestione delle applicazioni.',
      'Usato strumenti DevOps generali, inclusi Jenkins e Docker.',
      'Lavorato sia con metodologia Waterfall sia Agile.',
    ],
  },
  hero: {
    role: 'Software Engineer\nRust · Sistemi · Backend',
    tagline:
      'Laureato in Informatica, mi piace andare oltre le astrazioni per capire davvero come funzionano le cose a basso livello.\nInteressi principali: Rust, programmazione a basso livello, algoritmica e strutture dati, performance e Linux.',
  },
  about: {
    heading: 'Ciao, sono Massimiliano!',
    intro: 'Software Engineer',
    sections: [
      {
        title: 'Profilo',
        text: "Sono un Software Engineer con una forte passione per tutto ciò che riguarda il software e i linguaggi di programmazione in generale. Mi appassionano l'algoritmica e le strutture dati, così come lo sviluppo a livello di sistema e l'ingegneria del software. Mi piace risolvere problemi non computazionalmente banali, dove la forma della soluzione e le performance sono il target principale.",
      },
      {
        title: 'Rust e università',
        text: 'Questi interessi sono nati ed approfonditi durante il mio percorso universitario, dove ho conosciuto Rust, per il momento il mio linguaggio di programmazione preferito, che combina il controllo a basso livello con sicurezza, correttezza ad alte prestazioni.',
      },
      {
        title: 'Linux e open source',
        text: 'Sono molto interessato anche ai sistemi operativi, al loro sviluppo e al loro funzionamento in particolare Linux non solo per la sua struttura, ma anche per la sua filosofia open source in generale. È proprio questo che mi ha spinto a iniziare a contribuire a progetti open source non appena ho sentito di avere abbastanza esperienza per rendermi utile.',
      },
      {
        title: 'Self-hosting',
        text: "Un'altra piccola passione che sto coltivando è il self hosting. Quando possibile cerco sempre di mantenere una versione locale dei servizi che ritengo utili. Oltre ai vantaggi noti del self-hosting, questo mi permette di confrontarmi con soluzioni adottate in contesti reali e di comprenderne meglio il funzionamento, portando poi ciò che imparo nei miei progetti, sia personali che professionali.",
      },
    ],
  },
  welcome: {
    greeting: 'Ciao, benvenuto.',
    intro: 'Questo portfolio può essere esplorato direttamente da questo terminale!',
    commandsIntro: 'Puoi scrivere uno dei segunti comandi per avere più informazioni su di me:',
    commands: [
      { name: 'about', description: 'chi sono' },
      { name: 'projects', description: 'i miei progetti' },
      { name: 'project', description: 'mostra un progetto specifico' },
      { name: 'work', description: 'dove ho lavorato' },
      { name: 'clear', description: 'svuota il terminale' },
    ],
    fallbackTitle: 'Non vuoi usare il terminale?',
    fallbackText:
      'Nessun problema. Tutte le informazioni dei comandi listati sopra sono anche qui sotto, basta scrollare.',
  },
  matrix: {
    title: 'Impostazioni sfondo Matrix',
    restoreDefaults: 'Ripristina predefiniti',
    labels: {
      density: 'Densità',
      fontSize: 'Dimensione font',
      alpha: 'Alpha',
      effectAlpha: 'Alpha effetto',
      cursorRadius: 'Raggio cursore',
      minSpeed: 'Velocità minima',
      maxSpeed: 'Velocità massima',
      trailLength: 'Lunghezza scia',
      mainColor: 'Colore principale',
      accentColor: 'Colore accent',
      characterSets: 'Set di caratteri',
    },
    characterSetOptions: {
      latinUpper: 'Maiuscole latine',
      latinLower: 'Minuscole latine',
      numbers: 'Numeri',
      japanese: 'Giapponese',
      symbols: 'Simboli',
    },
  },
  instruction: {
    educationExperience: 'Formazione & Esperienza',
    diploma: 'Diploma Liceo Scientifico, concluso 2019',
    bachelorDegree: 'Laurea triennale in Informatica - Università degli studi di Perugia, 108/110',
    bachelorPeriod: 'Oct 2019 - Apr 2023',
    bachelorThesis:
      'Tesi di laurea: "Visualizzazione dati per coaching report", è stata implementata una un\'interfaccia di reportistica per i professori nel software per sostenere esami online dell\'Università LibreEOL',
    bachelorTechnologies: 'Tecnoogie usate: MVC, php, plain HTML + CSS e js per la UI.',
    bachelorThesisLink: 'Visualizza tesi',
    bachelorThesisPdf: 'Tesi triennale (PDF)',
    masterDegree:
      'Laurea magistrale in informatica - Università di Pisa, 110L, Oct 2023 - Oct 2025',
    masterCurriculum: 'Curriculum: "Software: Programming, Principles, and Technologies"',
    masterThesis:
      'Tesi di laurea: "Fast Access through Lightweight Block-Based Compression Algorithms", implementata una soluzione ibrida fra row store e colum store per accesso rapido su vettori di interi, con compressione.',
    masterThesisLink: 'Visualizza tesi',
    masterThesisPdf: 'Tesi magistrale (PDF)',
  },
  projects: {
    discordBotTitle: 'Discord Bot',
    discordBotSubtitle: 'Rust',
    discordBotDescription:
      "Sviluppato un bot per lo streaming audio sulla famosa piattaforma di comunicazione Discord. Il progetto nasce per risolvere una delle limitazioni della piattaforma: l'assenza di una funzionalità nativa per ascoltare musica all'interno di un canale vocale. Altri bot già esistevano, ma spesso non implementavano tutte le funzionalità necessarie o spesso venivano ritirati a fronte di violazioni di tos o per volontà degli sviluppatori stessi. Da qui nacque la necessità di sviluppare un bot in autonomia.\n\nIl bot permette lo streaming di contenuti provenienti da YouTube e Spotify (quando è disponibile una API key), oltre alla riproduzione di tracce archiviate localmente, sotto forma di una soundboard alternativa a quella nativa e limitata, in numero, presente nella piattaforma.\n\nIl bot è attualmente utilizzato su diversi server Discord ed è hostato direttamente da me. È inoltre possibile eseguire la propria istanza, scaricando l'eseguibile da GitHub oppure compilando il sorgente e configurando le API key necessarie.",
    videoStreamerTitle: 'Video Streamer',
    videoStreamerSubtitle: 'Rust, Tauri, GStreamer',
    videoStreamerDescription:
      "Client peer-to-peer per lo streaming video dello schermo o di una singola finestra del proprio computer.\n\nIl progetto nasce dall'esigenza di avere un sistema di streaming veloce e flessibile, che permettesse di configurare liberamente parametri come qualità, bitrate e FPS. Le soluzioni disponibili non soddisfacevano pienamente queste esigenze, portandomi a sviluppare una soluzione proprietaria.\n\nLo streamer è implementato principalmente in Rust. Per la gestione dello streaming audio e video viene utilizzato GStreamer, mentre l'interfaccia grafica desktop è realizzata con il framework Tauri.\n\nIl servizio supporta lo streaming tramite connessione diretta IP (UDP), rendendolo utilizzabile sia all'interno di reti locali sia attraverso VPN. Poiché questa soluzione richiede una configurazione preliminare quando i client non si trovano nella stessa rete, è stata successivamente introdotta una modalità basata su UDP hole punching tramite Iroh. In questo caso, i due client possono stabilire una connessione semplicemente scambiandosi un link di invito.\n\nIl progetto è tuttora in sviluppo ed è attualmente supportato su Windows e Linux (per il momento solo tramite PipeWire).",
    compilersTitle: 'Compilatori e Interpreti',
    compilersSubtitle: 'OCaml',
    compilersDescription:
      "Sviluppati compilatori e interpreti per due minilinguaggi, uno funzionale e uno imperativo. L'implementazione è stata realizzata in OCaml; per il linguaggio funzionale è stato inoltre implementato un semplice sistema di tipi.\n\nIl compilatore per il linguaggio imperativo genera codice per un ulteriore toy language, MiniRISC. Durante la compilazione è possibile specificare il numero di registri disponibili sulla macchina target. Sono inoltre presenti controlli sullo scope delle variabili e sull'utilizzo di variabili prima della loro definizione.\n\nPer una descrizione più dettagliata dell'implementazione è disponibile un file PDF all'interno della repository del progetto.",
    fastAccessTitle: 'Fast Access Hybrid Index',
    fastAccessSubtitle: 'Laurea magistrale',
    fastAccessDescription:
      "Progetto di laurea magistrale, dedicato allo sviluppo di un indice ibrido. Con \"ibrido\" si intende un indice che mantiene i dati sia per colonna sia per riga, combinando i vantaggi delle due rappresentazioni.\n\nL'obiettivo era sviluppare una soluzione, già comprovata in altri scenari, in grado di offrire i vantaggi di entrambe le rappresentazioni mantenendo una maggiore flessibilità a basso livello.\n\nL'implementazione è ottimizzata per accelerare l'accesso a vettori di interi. Per massimizzare le prestazioni sono stati implementati algoritmi di compressione leggera, con l'obiettivo di ridurre la pressione sulla cache e sfruttare al meglio le caratteristiche dei processori moderni.\n\nIl lavoro è successivamente confluito nel progetto",
  },
};

export default it;
