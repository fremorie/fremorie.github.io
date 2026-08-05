export const LANGUAGES = ['en', 'de'] as const;

export type Language = (typeof LANGUAGES)[number];

export function isLanguage(value: string | null): value is Language {
  return value !== null && (LANGUAGES as readonly string[]).includes(value);
}

const ENGLISH = {
  'navigation.about': 'About',
  'navigation.projects': 'Projects',
  'navigation.openSource': 'Open source',
  'navigation.experience': 'Experience',
  'navigation.skills': 'Skills',
  'navigation.education': 'Education',

  'section.about': 'About',
  'section.projects': 'Projects',
  'section.openSource': 'Open source',
  'section.experience': 'Experience',
  'section.skills': 'Skills',
  'section.education': 'Education',

  'note.about': 'Why the switch',
  'note.projects': 'Real-time graphics · 2026',
  'note.openSource': 'Contributions upstream',
  'note.experience': '2016 – 2026, to scale',
  'note.skills': 'What I reach for',
  'note.education': 'Degrees & certificates',

  'ui.contact': 'Get in touch',
  'ui.available': 'Available now',
  'ui.sections': 'Sections',
  'ui.language': 'Language',
  'ui.switchTheme': 'Switch theme',

  'hero.role': 'Frontend engineer building',
  'hero.roleAccent': 'interactive experiences',
  'hero.lede':
    "Frontend engineer with eight years of production experience. Since March 2026, I've been focused on WebGL and real-time graphics, building interactive experiences with Three.js and custom shaders.",
  'hero.location': 'Bremen · Open to Hamburg or remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1':
    "For most of my career, I've built production web and mobile applications, working across product features, architecture, and developer tooling.",
  'about.paragraph2':
    'Over time, I found myself increasingly drawn to the technology behind interactive experiences: animation, rendering, shaders, and real-time graphics. My background in Applied Mathematics and Physics at the Moscow Institute of Physics and Technology gave me a solid foundation for diving deeper into geometry, rendering, and shader programming.',
  'about.paragraph3':
    "In March 2026, I shifted my full-time focus to WebGL and real-time graphics. Since then, I've been building with Three.js every day, developing custom shaders, exploring rendering techniques, creating interactive scenes, and contributing improvements upstream to the libraries I rely on.",
  'about.paragraph4':
    "What I enjoy most is building software that's both technically challenging and immediately tangible—where mathematics, graphics programming, and user interaction come together.",
  'about.paragraph5':
    "I'm now looking for a role where I can combine eight years of production engineering experience with a growing specialization in interactive graphics.",

  'project.terrarium.kind': 'Three.js Journey challenge',
  'project.terrarium.name': 'Terrarium',
  'project.terrarium.description':
    'A tiny spring sealed inside a glass bottle — with a lens that reveals the same world in winter. Created for the Three.js Journey Stylized Nature challenge, using stencil masking through transmissive glass.',
  'project.terrarium.alt':
    'A low-poly spring scene sealed in a glass bottle; a circular lens reveals the same scene in winter.',

  'project.wind.kind': 'In progress',
  'project.wind.name': 'Wind',
  'project.wind.description':
    'A quiet bicycle ride through an endless procedural landscape. Procedural terrain streams endlessly as you move, with instanced vegetation, custom materials and shaders.',
  'project.wind.alt':
    'A bicycle in tall grass beside a turquoise lake, wind turbines on the horizon.',

  'project.shaders.kind': 'Sketchbook',
  'project.shaders.name': 'Shader studies',
  'project.shaders.description':
    'A collection of shader sketches, procedural textures and material studies, with custom Blender models built to showcase them.',
  'project.shaders.alt': 'A shader study from the sketchbook.',

  'project.gravity.kind': 'Physics sandbox',
  'project.gravity.name': 'Gravity',
  'project.gravity.description':
    'A physics playground where you can spawn objects and experiment with friction, restitution and gravity. Built with cannon-es.',
  'project.gravity.alt':
    'Coral, cream and periwinkle rigid bodies tumbling on a tilted plane.',

  'link.live': 'Live',
  'link.source': 'Source',
  'link.challenge': 'The challenge',
  'more.bacteria.name': 'Cells need food',
  'more.bacteria.description':
    'A gamified bioreactor simulation based on a real bacterial growth model, created for the [Long Night of Science] in Berlin.',
  'more.plowTruck.name': 'Plow Truck',
  'more.plowTruck.description':
    'A playable route-planning puzzle exploring graph algorithms, created for [Mathematical Thinking in Computer Science], a course available on Coursera.',
  'more.drei.name': 'pmndrs/drei · PR #2748',
  'more.drei.description':
    "Added stencil buffer support so masks work through transmissive surfaces — previously they were ignored silently. Discovered while building Terrarium's glass, fixed upstream rather than worked around.",
  'more.dateFns.name': 'date-fns · PR #3990',
  'more.dateFns.description':
    "A localized date format that omits the year while keeping each locale's own ordering rules.",
  'more.karatsuba.name': 'karatsuba',
  'more.karatsuba.description':
    'A published package for fast multiplication of big integers using the Karatsuba algorithm.',

  'chart.independent': 'Independent',
  'chart.wolt': 'Wolt',
  'chart.vimcar': 'Vimcar',
  'chart.yandex': 'Yandex',
  'chart.bookmate': 'Bookmate',
  'chart.retailRocket': 'Retail Rocket',

  'chart.span': 'Frontend — 7 yr 9 mo',

  'role.present': 'present',
  'role.qualifier.intern': '(intern)',

  'role.independent.title': 'Frontend engineer: WebGL & real-time graphics',
  'role.independent.organisation': 'Independent · Bremen',
  'role.independent.description':
    "Building interactive graphics for the web with WebGL, Three.js and React Three Fiber. Current work includes procedural terrain generation, physics simulations, custom GLSL shaders and graphics tooling. Contributed stencil buffer support upstream to drei's MeshTransmissionMaterial.",
  'role.independent.stack':
    'Three.js · WebGL · GLSL · React Three Fiber · Rapier · Blender · TypeScript · Vite',

  'role.wolt.title': 'Software engineer',
  'role.wolt.organisation': 'Wolt · Berlin',
  'role.wolt.description':
    'Delivered complex web and mobile features from technical design through production release. Collaborated with backend teams on APIs, authored technical RFCs, improved localization workflows in the Courier app, and helped interview frontend candidates.',
  'role.wolt.stack':
    'React · React Native · TypeScript · TanStack Query · XState · Playwright · Vite',

  'role.vimcar.title': 'Software engineer',
  'role.vimcar.organisation': 'Vimcar · Berlin',
  'role.vimcar.description':
    'Prototyped a micro-frontend architecture using Module Federation and presented the approach to the frontend team, kick-starting the gradual extraction of pages from the monolith. Built features for the Geo module using the Google Maps API and improved performance through list virtualization.',
  'role.vimcar.stack': 'React · MobX · RxJS · Cypress · Webpack · TypeScript',

  'role.yandexMarket.title': 'Frontend developer',
  'role.yandexMarket.organisation': 'Yandex.Market · Moscow',
  'role.yandexMarket.description':
    'Built Partner Interface pages and migrated legacy frontend code to React and Redux.',
  'role.yandexMarket.stack':
    'React · Redux · RxJS · Flow · TypeScript · Webpack · Selenium',

  'role.yandex.title': 'Frontend developer',
  'role.yandex.organisation': 'Yandex · Moscow',
  'role.yandex.description':
    'Worked on wallpaper resizing in search results and the mobile image viewer.',
  'role.yandex.stack': 'JavaScript · BEM · Selenium',

  'role.earlier.title': 'Earlier: data analysis',
  'role.earlier.organisation': 'Bookmate · Retail Rocket · Moscow',
  'role.earlier.description':
    'Worked on book recommendation systems and grocery cross-sell prediction using machine learning.',
  'role.earlier.stack':
    'Python · scikit-learn · word2vec · Scala · Spark MLlib',

  'skills.graphics.name': 'Graphics',
  'skills.graphics.items':
    'Three.js · WebGL · GLSL · React Three Fiber · Rapier · Blender · Canvas 2D · GSAP',
  'skills.core.name': 'Core',
  'skills.core.items': 'TypeScript · JavaScript · Python · Bash',
  'skills.interface.name': 'Interface',
  'skills.interface.items': 'React · React Native · Vue · Styled Components',
  'skills.stateData.name': 'State & data',
  'skills.stateData.items': 'Redux · MobX · XState · RxJS · TanStack Query',
  'skills.testing.name': 'Testing',
  'skills.testing.items':
    'Jest · Playwright · Cypress · Selenium · Detox · Maestro',
  'skills.buildOperations.name': 'Build & operations',
  'skills.buildOperations.items':
    'Vite · Webpack · Module Federation · AWS · Jenkins · DataDog · Sentry',

  'education.school': 'Moscow Institute of Physics and Technology',
  'education.msc': 'M.Sc. System Analysis and Control',
  'education.bsc': 'B.Sc. Applied Mathematics and Physics',
  'education.certificates': 'Certificates',
  'education.verify': 'verify',
  'education.pdf': 'PDF',

  'certificate.threejsJourney.name': 'Three.js Journey',
  'certificate.threejsJourney.where': 'Bruno Simon',
  'certificate.canvasWebgl.name': 'Creative Coding with Canvas & WebGL',
  'certificate.canvasWebgl.where': 'Master.dev (Frontend Masters)',
  'certificate.reduxMobx.name': 'State Management with Redux & MobX',
  'certificate.reduxMobx.where': 'Master.dev (Frontend Masters)',
  'certificate.fullstack.name': 'Full Stack for Front-End Engineers, v3',
  'certificate.fullstack.where': 'Master.dev (Frontend Masters)',
  'certificate.algorithms.name': 'Algorithms Specialization',
  'certificate.algorithms.where':
    'Coursera · divide and conquer, sorting and searching, randomized algorithms',

  'footer.signOff':
    'Looking for frontend roles involving interactive graphics.',
  'footer.location': 'Bremen · 2026',
} as const;

export type TranslationKey = keyof typeof ENGLISH;

const GERMAN: Partial<Record<TranslationKey, string>> = {
  'navigation.about': 'Über mich',
  'navigation.projects': 'Projekte',
  'navigation.openSource': 'Open Source',
  'navigation.experience': 'Berufserfahrung',
  'navigation.skills': 'Skills',
  'navigation.education': 'Studium',

  'section.about': 'Über mich',
  'section.projects': 'Projekte',
  'section.openSource': 'Open Source',
  'section.experience': 'Berufserfahrung',
  'section.skills': 'Skills',
  'section.education': 'Studium',

  'note.about': 'Warum der Wechsel',
  'note.projects': 'Echtzeitgrafik · 2026',
  'note.openSource': 'Beiträge zu Open-Source-Projekten',
  'note.experience': '2016 – 2026',
  'note.skills': 'Tech Stack',
  'note.education': 'Abschlüsse & Zertifikate',

  'ui.contact': 'Kontakt',
  'ui.available': 'Verfügbar',
  'ui.sections': 'Abschnitte',
  'ui.language': 'Sprache',
  'ui.switchTheme': 'Theme wechseln',

  'hero.role': 'Frontend Engineer für',
  'hero.roleAccent': 'interaktive Anwendungen',

  'hero.lede':
    'Seit acht Jahren entwickle ich produktive Web- und Mobile-Anwendungen. Seit März 2026 liegt mein voller Fokus auf WebGL und Echtzeitgrafik. Ich suche eine Frontend- oder Grafikrolle, in der ich interaktive, visuell überzeugende Produkte entwickeln kann.',

  'hero.location': 'Bremen · Offen für Hamburg oder Remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1':
    'Den größten Teil meiner bisherigen Laufbahn habe ich Web- und Mobile-Anwendungen für den produktiven Einsatz entwickelt – von neuen Produktfunktionen über Architekturentscheidungen bis hin zu Developer-Tooling.',

  'about.paragraph2':
    'Mit der Zeit hat mich immer stärker die Technik hinter interaktiven Benutzeroberflächen fasziniert: Animationen, Rendering, Shader und Echtzeitgrafik. Mein Studium der Angewandten Mathematik und Physik am Moskauer Institut für Physik und Technologie (MIPT) hat mir dabei eine solide Grundlage gegeben, um mich intensiver mit Geometrie, Rendering und Shader-Programmierung auseinanderzusetzen.',

  'about.paragraph3':
    'Seit März 2026 konzentriere ich mich vollständig auf WebGL und Echtzeitgrafik. Seitdem arbeite ich täglich mit Three.js, entwickle eigene Shader, beschäftige mich mit Rendering-Techniken, baue interaktive Szenen und trage Verbesserungen zu den Open-Source-Bibliotheken bei, die ich selbst verwende.',

  'about.paragraph4':
    'Besonders reizt mich Software, bei der anspruchsvolle Technik unmittelbar sichtbar wird – dort, wo Mathematik, Computergrafik und Interaktion zusammenkommen.',
  'about.paragraph5':
    'Heute suche ich eine Position, in der ich meine langjährige Erfahrung in der Entwicklung von Produktionssoftware mit meinem Schwerpunkt auf interaktiver Grafik verbinden kann.',

  'project.terrarium.kind': 'Three.js Journey Challenge',
  'project.terrarium.name': 'Terrarium',

  'project.terrarium.description':
    'Ein kleiner Frühling, eingeschlossen in einer Glasflasche – mit einer Linse, die dieselbe Welt im Winter zeigt. Entstanden für die Challenge „Stylized Nature“ und umgesetzt mit Stencil-Masking durch transmissives Glas.',

  'project.terrarium.alt':
    'Eine Low-Poly-Frühlingsszene in einer Glasflasche; eine kreisrunde Linse zeigt dieselbe Szene im Winter.',

  'project.wind.kind': 'In Arbeit',
  'project.wind.name': 'Wind',

  'project.wind.description':
    'Eine ruhige Fahrradtour durch eine endlose prozedurale Landschaft. Das Gelände wird während der Fahrt nachgeladen, mit instanzierter Vegetation, eigenen Materialien und Shadern.',

  'project.wind.alt':
    'Ein Fahrrad im hohen Gras an einem türkisfarbenen See, Windräder am Horizont.',

  'project.shaders.kind': 'Sketchbook',
  'project.shaders.name': 'Shader Sketchbook',

  'project.shaders.description':
    'Eine Sammlung von Shader-Experimenten, Materialstudien und prozeduralen Texturen, ergänzt durch eigens erstellte Blender-Modelle, um sie zu präsentieren.',

  'project.shaders.alt': 'Eine Shader-Studie aus dem Sketchbook.',

  'project.gravity.kind': 'Physik-Sandbox',
  'project.gravity.name': 'Gravity',

  'project.gravity.description':
    'Eine Physik-Sandbox, in der sich Objekte erzeugen und mit Reibung, Restitution und Schwerkraft experimentieren lassen. Entwickelt mit cannon-es.',

  'project.gravity.alt':
    'Korallenrote, cremefarbene und periwinkelblaue Starrkörper auf einer geneigten Ebene.',

  'link.live': 'Live',
  'link.source': 'Quellcode',
  'link.challenge': 'Challenge',
  'more.bacteria.name': 'Cells Need Food',

  'more.bacteria.description':
    'Eine spielerische Bioreaktor-Simulation auf Basis eines realen Modells für Bakterienwachstum, entwickelt für die [Lange Nacht der Wissenschaften] in Berlin.',

  'more.plowTruck.name': 'Plow Truck',

  'more.plowTruck.description':
    'Ein spielbares Routenplanungs-Puzzle zu Graphenalgorithmen, entwickelt für „[Mathematical Thinking in Computer Science]“, einen Kurs auf Coursera.',

  'more.drei.name': 'pmndrs/drei · PR #2748',

  'more.drei.description':
    'Unterstützung für den Stencil-Buffer ergänzt, damit Masken auch durch transmissive Oberflächen funktionieren. Zuvor wurden sie stillschweigend ignoriert. Beim Bau des Terrariums entdeckt und direkt upstream behoben, statt einen Workaround einzubauen.',

  'more.dateFns.name': 'date-fns · PR #3990',

  'more.dateFns.description':
    'Ein lokalisiertes Datumsformat, das das Jahr weglässt und dabei die Datumsreihenfolge der jeweiligen Sprache beibehält.',

  'more.karatsuba.name': 'karatsuba',

  'more.karatsuba.description':
    'Ein veröffentlichtes Paket zur schnellen Multiplikation großer Ganzzahlen mit dem Karatsuba-Algorithmus.',

  'chart.independent': 'Selbstständig',
  'chart.wolt': 'Wolt',
  'chart.vimcar': 'Vimcar',
  'chart.yandex': 'Yandex',
  'chart.bookmate': 'Bookmate',
  'chart.retailRocket': 'Retail Rocket',

  'chart.span': 'Frontend — 7 J. 9 Mon.',

  'role.present': 'heute',
  'role.qualifier.intern': '(Praktikum)',

  'role.independent.title': 'Frontend Engineer: WebGL & Echtzeitgrafik',

  'role.independent.organisation': 'Selbstständig · Bremen',

  'role.independent.description':
    'Schwerpunkt auf Echtzeitgrafik im Web: Entwicklung interaktiver Anwendungen mit WebGL, Three.js und React Three Fiber. Prozedurales Gelände, Physiksimulationen und eigene Shader umgesetzt sowie Unterstützung für den Stencil-Buffer zu drei MeshTransmissionMaterial beigetragen.',

  'role.independent.stack':
    'Three.js · WebGL · GLSL · React Three Fiber · Rapier · Blender · TypeScript · Vite',

  'role.wolt.title': 'Software Engineer',

  'role.wolt.organisation': 'Wolt · Berlin',

  'role.wolt.description':
    'Komplexe Web- und Mobile-Features eigenverantwortlich entwickelt – von der technischen Konzeption bis zum Release. Mit Backend-Teams an APIs gearbeitet, technische RFCs verfasst, die Lokalisierungs-Workflows der Courier-App verbessert und an technischen Interviews mitgewirkt.',

  'role.wolt.stack':
    'React · React Native · TypeScript · TanStack Query · XState · Playwright · Vite',

  'role.vimcar.title': 'Software Engineer',

  'role.vimcar.organisation': 'Vimcar · Berlin',

  'role.vimcar.description':
    'Eine Micro-Frontend-Architektur mit Module Federation prototypisiert und dem Frontend-Team vorgestellt. Dadurch wurde die schrittweise Herauslösung einzelner Seiten aus dem Monolithen angestoßen. Features für das Geo-Modul mit der Google Maps API entwickelt und die Performance durch Listenvirtualisierung verbessert.',

  'role.vimcar.stack': 'React · MobX · RxJS · Cypress · Webpack · TypeScript',

  'role.yandexMarket.title': 'Frontend Developer',

  'role.yandexMarket.organisation': 'Yandex.Market · Moskau',

  'role.yandexMarket.description':
    'Seiten für das Partner Interface entwickelt und Legacy-Frontend-Code auf React und Redux migriert.',

  'role.yandexMarket.stack':
    'React · Redux · RxJS · Flow · TypeScript · Webpack · Selenium',

  'role.yandex.title': 'Frontend Developer',

  'role.yandex.organisation': 'Yandex · Moskau',

  'role.yandex.description':
    'An der Größenanpassung von Hintergrundbildern in den Suchergebnissen sowie am mobilen Bildbetrachter gearbeitet.',

  'role.yandex.stack': 'JavaScript · BEM · Selenium',

  'role.earlier.title': 'Davor: Datenanalyse',

  'role.earlier.organisation': 'Bookmate · Retail Rocket · Moskau',

  'role.earlier.description':
    'Machine-Learning-Verfahren für Buchempfehlungen und Cross-Selling-Analysen im Lebensmittelhandel angewendet.',

  'role.earlier.stack':
    'Python · scikit-learn · word2vec · Scala · Spark MLlib',

  'skills.graphics.name': 'Computergrafik',

  'skills.graphics.items':
    'Three.js · WebGL · GLSL · React Three Fiber · Rapier · Blender · Canvas 2D · GSAP',

  'skills.core.name': 'Programmiersprachen',

  'skills.core.items': 'TypeScript · JavaScript · Python · Bash',

  'skills.interface.name': 'Frontend',

  'skills.interface.items': 'React · React Native · Vue · Styled Components',

  'skills.stateData.name': 'State Management',

  'skills.stateData.items': 'Redux · MobX · XState · RxJS · TanStack Query',

  'skills.testing.name': 'Testing',

  'skills.testing.items':
    'Jest · Playwright · Cypress · Selenium · Detox · Maestro',

  'skills.buildOperations.name': 'Tooling',

  'skills.buildOperations.items':
    'Vite · Webpack · Module Federation · AWS · Jenkins · DataDog · Sentry',

  'education.school': 'Moskauer Institut für Physik und Technologie',

  'education.msc': 'M.Sc. Systemanalyse und Steuerung',

  'education.bsc': 'B.Sc. Angewandte Mathematik und Physik',

  'education.certificates': 'Zertifikate',

  'education.verify': 'Verifizieren',

  'education.pdf': 'PDF',

  'certificate.threejsJourney.name': 'Three.js Journey',

  'certificate.threejsJourney.where': 'Bruno Simon',

  'certificate.canvasWebgl.name': 'Creative Coding with Canvas & WebGL',

  'certificate.canvasWebgl.where': 'Master.dev (Frontend Masters)',

  'certificate.reduxMobx.name': 'State Management with Redux & MobX',

  'certificate.reduxMobx.where': 'Master.dev (Frontend Masters)',

  'certificate.fullstack.name': 'Full Stack for Front-End Engineers, v3',

  'certificate.fullstack.where': 'Master.dev (Frontend Masters)',

  'certificate.algorithms.name': 'Algorithms Specialization',

  'certificate.algorithms.where':
    'Coursera · Divide and Conquer, Sorting and Searching, Randomized Algorithms',

  'footer.signOff':
    'Auf der Suche nach Frontend-Positionen im Bereich interaktive Computergrafik.',

  'footer.location': 'Bremen · 2026',
};

export const DICTIONARY = {
  en: ENGLISH,
  de: GERMAN,
} satisfies Record<Language, Partial<Record<TranslationKey, string>>>;
