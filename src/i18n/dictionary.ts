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

  'note.about': 'A little about my work',
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
    'I build web and mobile applications with React and TypeScript. I\u00A0also work with Three.js, WebGL, shaders, and 3D graphics, with a particular interest in interactive interfaces and visual experiences.',
  'hero.location': 'Bremen · Open to Hamburg or remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1': 'Hi, I’m Daria.',
  'about.paragraph2':
    'I’m a frontend engineer who likes making things that move, react, and generally do more than just sit on a page. I’ve spent most of my career building web and mobile applications, mostly with React and TypeScript. I still really enjoy the frontend side of things: taking an idea and turning it into something people can actually use and interact with.',
  'about.paragraph3':
    'Lately, I’ve been getting deeper into Three.js, WebGL, shaders, and 3D graphics. I got into graphics mostly out of curiosity. I wanted to understand what happens beyond the usual layers of UI and application code, and how things like geometry, lighting, materials, and animation actually end up on the screen.',
  'about.paragraph4':
    'Most of the things on this site are experiments: trying an idea, figuring out how something works, or just seeing if I can make something look nice in a browser. Sometimes they turn into proper little projects, and sometimes they’re just a few hours spent messing around with an idea. I like starting with something vague and gradually turning it into something I can actually see and play with.',
  'about.paragraph5':
    'I’m particularly interested in the overlap between programming, math, and visual design. That might mean writing a shader, figuring out how to make a 3D scene run smoothly in a browser, or building a small interaction around an otherwise simple idea. I like when the technical side of a project is visible in the final result — when you can poke at something on the screen and get a sense of what’s going on underneath.',

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
    'Built features for the Geo module using the Google Maps API and improved performance through list virtualization.',
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
  'education.verify': 'Verify',

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

  'note.about': 'Ein wenig über meine Arbeit',
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
    'Ich entwickle Web- und Mobile-Anwendungen mit React und TypeScript. Außerdem arbeite ich mit Three.js, WebGL, Shadern und 3D-Grafik und interessiere mich besonders für interaktive Interfaces und visuelle Erlebnisse.',

  'hero.location': 'Bremen · Offen für Hamburg oder Remote',
  'hero.stack': 'Three.js · WebGL · GLSL · React · React Native · TypeScript',

  'about.paragraph1': 'Hi, ich bin Daria.',
  'about.paragraph2':
    'Ich bin Frontend-Entwicklerin und mag es, Dinge zu bauen, die sich bewegen, auf Eingaben reagieren und generell mehr können, als einfach nur auf einer Seite herumzustehen. Die meiste Zeit meiner Karriere habe ich Web- und Mobile-Anwendungen gebaut, hauptsächlich mit React und TypeScript. Die Frontend-Seite macht mir nach wie vor viel Spaß: eine Idee zu nehmen und daraus etwas zu machen, das Menschen tatsächlich benutzen und mit dem sie interagieren können.',
  'about.paragraph3':
    'In letzter Zeit beschäftige ich mich zunehmend mit Three.js, WebGL, Shadern und 3D-Grafik. Zu Grafik bin ich vor allem aus Neugier gekommen. Ich wollte verstehen, was hinter den üblichen Schichten von UI und Anwendungscode passiert und wie Dinge wie Geometrie, Beleuchtung, Materialien und Animationen letztendlich auf dem Bildschirm landen.',
  'about.paragraph4':
    'Die meisten Dinge auf dieser Website sind Experimente: eine Idee ausprobieren, herausfinden, wie etwas funktioniert, oder einfach schauen, ob ich etwas Schönes im Browser bauen kann. Manchmal werden daraus richtige kleine Projekte, manchmal sind es einfach ein paar Stunden, in denen ich mit einer Idee herumspiele. Ich mag es, mit etwas Vagem anzufangen und es nach und nach in etwas zu verwandeln, das ich tatsächlich sehen und ausprobieren kann.',
  'about.paragraph5':
    'Besonders interessant finde ich die Schnittstelle zwischen Programmierung, Mathematik und visueller Gestaltung. Das kann bedeuten, einen Shader zu schreiben, herauszufinden, wie eine 3D-Szene im Browser flüssig läuft, oder eine kleine Interaktion um eine eigentlich einfache Idee herum zu bauen. Ich mag es, wenn die technische Seite eines Projekts im Ergebnis sichtbar bleibt – wenn man etwas auf dem Bildschirm ausprobieren kann und dabei ein Gefühl dafür bekommt, was darunter passiert.',

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
    'Features für das Geo-Modul mit der Google Maps API entwickelt und die Performance durch Listenvirtualisierung verbessert.',

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
