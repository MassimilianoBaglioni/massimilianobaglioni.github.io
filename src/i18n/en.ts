const en = {
  personalInfo: {
    located: 'Based in Italy',
  },
  header: {
    nav: {
      about: 'About',
      projects: 'Projects',
      education: 'Education',
      openSource: 'Open Source',
      contact: 'Contact',
    },
  },
  work: {
    title: 'Work Experience',
    downloadCv: 'Download full resume',
    technologies: 'Technologies',
    professionalExperience: 'Professional experience',
    developer: 'Developer',
    fullStackDeveloper: 'Full Stack Developer',
    dsDigitalServicesBullets: [
      'Built dynamic websites and e-commerce platforms using WordPress as a CMS.',
      'Created and customized PHP plugins.',
      'Followed clients throughout both website development and hosting management.',
    ],
    cheapfitBullets: [
      'Built the website and e-commerce platform.',
      "Automated data analysis from the mobile application's MySQL database.",
      'Implemented real-time user rankings via custom REST APIs in Python, with a plain HTML/CSS/JS frontend.',
      'Developed an AI chatbot with RAG using the OpenAI API, with a Python backend and React frontend.',
    ],
    avanciaBullets: [
      'Backend development using Java, Spring Boot, Spring Batch, OracleDB, MySQL, and Hibernate.',
      'Frontend development using Angular and RxJS.',
      'Developed and maintained REST APIs.',
      'Worked with Kubernetes for application deployment and management.',
      'Used general DevOps tools and technologies, including Jenkins and Docker.',
      'Worked using both Waterfall and Agile methodologies.',
    ],
  },
  hero: {
    role: 'Software Engineer\nRust · Systems Programming · Backend',
    tagline:
      "Computer Science graduate who enjoys going beyond abstractions to understand how things actually work.\nI'm particularly interested in Rust, low-level programming, algorithms and data structures, performance, and Linux.",
  },
  about: {
    heading: "Hi, I'm Massimiliano!",
    intro: 'Software Engineer',
    sections: [
      {
        title: 'Profile',
        text: "I'm a Software Engineer with a strong passion for everything related to software and programming languages in general. I'm passionate about algorithms and data structures, as well as systems-level development and software engineering. I enjoy solving non-trivial computational problems, where the design of the solution and its performance are the main focus.",
      },
      {
        title: 'Rust & university',
        text: 'These interests were born and developed during my university studies, where I discovered Rust, currently my favorite programming language, which combines low-level control with safety, correctness, and high performance.',
      },
      {
        title: 'Linux & open source',
        text: "I'm also very interested in operating systems, their development, and how they work, particularly Linux, both for its structure and its open-source philosophy. This is what motivated me to start contributing to open-source projects as soon as I felt I had enough experience to be useful.",
      },
      {
        title: 'Self-hosting',
        text: "Another small passion I'm cultivating is self-hosting. Whenever possible, I try to maintain a local version of the services I find useful. Beyond the well-known advantages of self-hosting, this allows me to work with solutions adopted in real-world contexts and gain a better understanding of how they work, bringing what I learn into both my personal and professional projects.",
      },
    ],
  },
  welcome: {
    greeting: 'Hey, welcome.',
    intro: 'This is my portfolio — built to be explored from the terminal.',
    commandsIntro: 'You can type commands to navigate through it:',
    commands: [
      { name: 'about', description: 'who I am' },
      { name: 'projects', description: "what I've built" },
      { name: 'project', description: 'show a specific project' },
      { name: 'work', description: "where I've worked" },
      { name: 'clear', description: 'clear the terminal' },
    ],
    fallbackTitle: 'Not into terminals?',
    fallbackText:
      "That's fine. Everything you'll find here is also available by simply scrolling down.",
  },
  matrix: {
    title: 'Matrix background settings',
    restoreDefaults: 'Restore default',
    labels: {
      density: 'Density',
      fontSize: 'Font size',
      alpha: 'Alpha',
      effectAlpha: 'Effect alpha',
      cursorRadius: 'Cursor radius',
      minSpeed: 'Min speed',
      maxSpeed: 'Max speed',
      trailLength: 'Trail length',
      mainColor: 'Main color',
      accentColor: 'Accent color',
      characterSets: 'Character sets',
    },
    characterSetOptions: {
      latinUpper: 'Latin uppercase',
      latinLower: 'Latin lowercase',
      numbers: 'Numbers',
      japanese: 'Japanese',
      symbols: 'Symbols',
    },
  },
  instruction: {
    educationExperience: 'Education & Experience',
    diploma: 'Diploma Liceo Scientifico, completed 2019',
    bachelorDegree: 'Bachelor degree in Computer Science - University of Perugia, 108/110',
    bachelorPeriod: 'Oct 2019 - Apr 2023',
    bachelorThesis:
      'Bachelor thesis: \"Visualizzazione dati per coaching report\" implemented a reporting interface for teachers in the online exam support software of LibreEOL university',
    bachelorTechnologies: 'Technologies used: MVC, php, plain HTML + CSS and js for UI.',
    bachelorThesisLink: 'View thesis',
    bachelorThesisPdf: 'Bachelor thesis (PDF)',
    masterDegree:
      'Master degree in Computer Science - University of Pisa, 110L, Oct 2023 - Oct 2025',
    masterCurriculum: 'Curriculum: "Software: Programming, Principles, and Technologies"',
    masterThesis:
      'Master thesis: "Fast Access through Lightweight Block-Based Compression Algorithms", implemented a hybrid solution between row store and column store for fast access on integer vectors, with compression.',
    masterThesisLink: 'View thesis',
    masterThesisPdf: 'Master thesis (PDF)',
  },
  projects: {
    discordBotTitle: 'Discord Bot',
    discordBotSubtitle: 'Rust',
    discordBotDescription:
      "Developed an audio streaming bot for the popular communication platform Discord. The project was born to solve one of the platform's limitations: the lack of a native feature to listen to music within a voice channel. Other bots already existed, but often they didn't implement all necessary features or were withdrawn due to ToS violations or developers' own decisions. This led to the need to develop an independent bot.\n\nThe bot allows streaming content from YouTube and Spotify (when a suitable API key is available), as well as playback of locally stored tracks, in the form of an alternative soundboard to the limited one native to the platform, both in number and functionality.\n\nThe bot is currently used on several Discord servers and is hosted directly by me. It's also possible to run your own instance by downloading the executable from GitHub or compiling the source code and configuring the necessary API keys.",
    videoStreamerTitle: 'Video Streamer',
    videoStreamerSubtitle: 'Rust, Tauri, GStreamer',
    videoStreamerDescription:
      'Peer-to-peer client for streaming video of your screen or a single window of your computer.\n\nThe project was born from the need to have a fast and flexible streaming system that would allow freely configuring parameters like quality, bitrate, and FPS. Available solutions did not fully meet these needs, prompting me to develop a proprietary solution.\n\nThe streamer is implemented mainly in Rust. For audio and video streaming management GStreamer is used, while the desktop GUI is built with the Tauri framework.\n\nThe service supports streaming via direct IP connection (UDP), making it usable both within local networks and through VPNs. Since this solution requires preliminary configuration when clients are not on the same network, a UDP hole punching mode based on Iroh was subsequently introduced. In this case, two clients can establish a connection simply by exchanging an invitation link.\n\nThe project is still under development and currently supported on Windows and Linux (for now only via PipeWire).',
    compilersTitle: 'Compilers and Interpreters',
    compilersSubtitle: 'OCaml',
    compilersDescription:
      "Developed compilers and interpreters for two mini-languages, one functional and one imperative. The implementation was done in OCaml; a simple type system was also implemented for the functional language.\n\nThe compiler for the imperative language generates code for another toy language, MiniRISC. During compilation it's possible to specify the number of registers available on the target machine. There are also checks for variable scope and usage before definition.\n\nFor a more detailed description of the implementation, please see the PDF file in the project repository.",
    fastAccessTitle: 'Fast Access Hybrid Index',
    fastAccessSubtitle: "Master's thesis",
    fastAccessDescription:
      'Master\'s thesis project dedicated to developing a hybrid index. By "hybrid" we mean an index that maintains data both by column and by row, combining the advantages of both representations.\n\nThe goal was to develop a solution already proven in other scenarios, capable of offering the benefits of both representations while maintaining greater flexibility at a lower level.\n\nThe implementation is optimized for faster access to integer vectors. To maximize performance, lightweight compression algorithms were implemented with the objective of reducing cache pressure and making full use of modern processor features.\n\nThe work later merged into the',
  },
};

export default en;
