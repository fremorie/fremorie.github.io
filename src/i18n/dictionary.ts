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
  'ui.companies': 'Companies worked at',

  'hero.role': 'Frontend engineer building',
  'hero.roleAccent': 'interactive experiences',
  'hero.lede':
    "Almost eight years building production web and mobile applications. Since March I've focused full time on WebGL and real-time graphics, and I'm looking for frontend or graphics roles where I can build engaging, interactive products.",
  'hero.location': 'Bremen · Open to Hamburg or remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1':
    'I’ve spent the last eight years building and shipping web and mobile products, creating interfaces and systems used in production.',
  'about.paragraph2':
    'Over time, I became increasingly interested in the technical side of interaction: animation, graphics, and the way things are rendered on the screen. My background in applied mathematics and physics from MIPT gave me a strong foundation for exploring shaders, geometry, and rendering more deeply. In March 2026, I decided to make that exploration my main focus and started working with real-time graphics full time.',
  'about.paragraph3':
    'Since then, I’ve been building with WebGL every day — experimenting with shaders, creating interactive scenes, and contributing fixes upstream to the libraries I use.',
  'about.paragraph4':
    'I’m looking for a role where I can combine both sides: years of production engineering experience and a growing focus on interactive graphics.',

  'project.terrarium.kind': 'Three.js Journey challenge',
  'project.terrarium.name': 'Terrarium',
  'project.terrarium.description':
    'A tiny spring sealed inside a glass bottle — with a lens that reveals the same world in winter. Built for the Stylized Nature challenge, using stencil masking through transmissive glass.',
  'project.terrarium.alt':
    'A low-poly spring scene sealed in a glass bottle; a circular lens reveals the same scene in winter.',

  'project.wind.kind': 'In progress',
  'project.wind.name': 'Wind',
  'project.wind.description':
    'A quiet bicycle ride through an endless procedural landscape. Terrain streams as you move, with instanced vegetation, custom materials and shaders.',
  'project.wind.alt':
    'A bicycle in tall grass beside a turquoise lake, wind turbines on the horizon.',

  'project.shaders.kind': 'Sketchbook',
  'project.shaders.name': 'Shader studies',
  'project.shaders.description':
    'A collection of shader experiments, material studies and procedural textures, with custom Blender models built to showcase them.',
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
  'link.pullRequest': 'The pull request',

  'more.bacteria.name': 'Cells need food',
  'more.bacteria.description':
    'A gamified bioreactor simulation based on a real bacterial growth model, created for the Long Night of Science in Berlin.',
  'more.plowTruck.name': 'Plow Truck',
  'more.plowTruck.description':
    'A playable route-planning puzzle exploring graph algorithms, created for a Coursera discrete mathematics specialization.',
  'more.dateFns.name': 'date-fns · PR #3990',
  'more.dateFns.description':
    "A localized date format that omits the year while keeping each locale's own ordering rules.",
  'more.karatsuba.name': 'karatsuba',
  'more.karatsuba.description':
    'A published package for fast multiplication of big integers using the Karatsuba algorithm.',

  'openSource.drei.kind': 'pmndrs/drei · PR #2748, open',
  'openSource.drei.name': 'MeshTransmissionMaterial',
  'openSource.drei.description':
    "Added stencil buffer support so masks work through transmissive surfaces — previously they were ignored silently. Found while building Terrarium's glass, fixed upstream rather than worked around.",

  'chart.independent': 'Independent',
  'chart.wolt': 'Wolt',
  'chart.vimcar': 'Vimcar',
  'chart.coursera': 'Coursera',
  'chart.yandex': 'Yandex',
  'chart.bookmate': 'Bookmate',
  'chart.retailRocket': 'Retail Rocket',

  'chart.duration.independent': '5 mo',
  'chart.duration.wolt': '2 yr 7 mo',
  'chart.duration.vimcar': '2 yr 4 mo',
  'chart.duration.coursera': '11 mo',
  'chart.duration.yandex': '2 yr 3 mo',
  'chart.duration.bookmate': '11 mo',
  'chart.duration.retailRocket': '4 mo',

  'chart.span': 'frontend — 7 yr 9 mo',

  'role.present': 'present',
  'role.qualifier.partTime': '(part-time)',
  'role.qualifier.intern': '(intern)',

  'role.independent.title': 'Frontend engineer: WebGL & real-time graphics',
  'role.independent.organisation': 'Independent · Bremen',
  'role.independent.description':
    "Focused on real-time graphics for the web, building interactive experiences with WebGL, Three.js and React Three Fiber. Explored procedural terrain, physics simulations and custom shaders, and contributed stencil buffer support upstream to drei's MeshTransmissionMaterial.",
  'role.independent.stack':
    'Three.js · WebGL · GLSL · React Three Fiber · Rapier · Blender · TypeScript · Vite',

  'role.wolt.title': 'Software engineer',
  'role.wolt.organisation': 'Wolt · Berlin',
  'role.wolt.description':
    'Owned complex web and mobile features end to end, from technical design to production release. Collaborated with backend teams on APIs, authored technical RFCs, improved localization workflows in the Courier app, and participated in technical interviews.',
  'role.wolt.stack':
    'React · React Native · TypeScript · TanStack Query · XState · Playwright · Vite',

  'role.vimcar.title': 'Software engineer',
  'role.vimcar.organisation': 'Vimcar · Berlin',
  'role.vimcar.description':
    'Prototyped a micro-frontend architecture using Module Federation and presented the approach to the frontend team, helping kick off the gradual extraction of pages from the monolith. Built features for the Geo module using the Google Maps API and improved performance through list virtualization.',
  'role.vimcar.stack': 'React · MobX · RxJS · Cypress · Webpack · TypeScript',

  'role.coursera.title': 'Frontend developer',
  'role.coursera.organisation': 'Interactive Puzzles · Coursera',
  'role.coursera.description':
    'Built interactive puzzles for Mathematical Thinking in Computer Science.',
  'role.coursera.stack': 'React · MobX · TypeScript · GSAP · Webpack',

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
    'Applied machine learning techniques to book recommendations and grocery cross-sell analysis.',
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
  'ui.companies': 'Arbeitgeber',

  'hero.role': 'Frontend Engineer für',
  'hero.roleAccent': 'interaktive Anwendungen',

  'hero.lede':
    'Fast acht Jahre Erfahrung in der Entwicklung produktiver Web- und Mobile-Anwendungen. Seit März arbeite ich in Vollzeit mit WebGL und Echtzeitgrafik und suche eine Frontend- oder Grafikentwicklungsposition, in der ich interaktive Produkte entwickeln kann.',

  'hero.location': 'Bremen · Offen für Hamburg oder Remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1':
    'Die letzten acht Jahre habe ich Web- und Mobile-Produkte entwickelt und ausgeliefert – Oberflächen und Systeme, die täglich im Produktiveinsatz sind.',

  'about.paragraph2':
    'Mit der Zeit hat mich die technische Seite von Interaktion immer mehr interessiert: Animation, Computergrafik und Rendering. Mein Studium der angewandten Mathematik und Physik am MIPT hat mir eine solide Grundlage gegeben, um Shader, Geometrie und Rendering besser zu verstehen. Im März 2026 habe ich beschlossen, mich vollständig auf Echtzeitgrafik zu konzentrieren.',

  'about.paragraph3':
    'Seitdem arbeite ich täglich mit WebGL – ich experimentiere mit Shadern, entwickle interaktive Szenen und trage Fixes zu den Bibliotheken bei, die ich verwende.',

  'about.paragraph4':
    'Ich suche eine Position, in der ich beides verbinden kann: langjährige Erfahrung in der Softwareentwicklung und meinen Schwerpunkt auf interaktiver Computergrafik.',

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
  'link.pullRequest': 'Pull Request',

  'more.bacteria.name': 'Cells Need Food',

  'more.bacteria.description':
    'Eine spielerische Bioreaktor-Simulation auf Basis eines realen Modells für Bakterienwachstum, entwickelt für die Lange Nacht der Wissenschaften in Berlin.',

  'more.plowTruck.name': 'Plow Truck',

  'more.plowTruck.description':
    'Ein spielbares Routenplanungs-Puzzle zu Graphenalgorithmen, entwickelt im Rahmen einer Coursera-Spezialisierung in diskreter Mathematik.',

  'more.dateFns.name': 'date-fns · PR #3990',

  'more.dateFns.description':
    'Ein lokalisiertes Datumsformat, das das Jahr weglässt und dabei die Datumsreihenfolge der jeweiligen Sprache beibehält.',

  'more.karatsuba.name': 'karatsuba',

  'more.karatsuba.description':
    'Ein veröffentlichtes Paket zur schnellen Multiplikation großer Ganzzahlen mit dem Karatsuba-Algorithmus.',

  'openSource.drei.kind': 'pmndrs/drei · PR #2748, offen',

  'openSource.drei.name': 'MeshTransmissionMaterial',

  'openSource.drei.description':
    'Unterstützung für den Stencil-Buffer ergänzt, damit Masken auch durch transmissive Oberflächen funktionieren. Zuvor wurden sie stillschweigend ignoriert. Beim Bau des Terrariums entdeckt und direkt upstream behoben, statt einen Workaround einzubauen.',

  'chart.independent': 'Selbstständig',
  'chart.wolt': 'Wolt',
  'chart.vimcar': 'Vimcar',
  'chart.coursera': 'Coursera',
  'chart.yandex': 'Yandex',
  'chart.bookmate': 'Bookmate',
  'chart.retailRocket': 'Retail Rocket',

  'chart.duration.independent': '5 Mon.',
  'chart.duration.wolt': '2 J. 7 Mon.',
  'chart.duration.vimcar': '2 J. 4 Mon.',
  'chart.duration.coursera': '11 Mon.',
  'chart.duration.yandex': '2 J. 3 Mon.',
  'chart.duration.bookmate': '11 Mon.',
  'chart.duration.retailRocket': '4 Mon.',

  'chart.span': 'Frontend — 7 J. 9 Mon.',

  'role.present': 'heute',
  'role.qualifier.partTime': '(Teilzeit)',
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

  'role.coursera.title': 'Frontend Developer',

  'role.coursera.organisation': 'Interactive Puzzles · Coursera',

  'role.coursera.description':
    'Interaktive Rätsel für den Coursera-Kurs „Mathematical Thinking in Computer Science“ entwickelt.',

  'role.coursera.stack': 'React · MobX · TypeScript · GSAP · Webpack',

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
