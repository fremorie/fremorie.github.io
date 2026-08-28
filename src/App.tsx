type Link = { href: string; label: string };

type Project = {
  name: string;
  year: string;
  description: string;
  links: Link[];
  media: React.ReactNode;
  flip?: boolean;
  tinted?: boolean;
};

const SHADERS = [
  {
    src: '/projects/shaders/sakura.webp',
    alt: 'A low-poly cherry tree in blossom.',
  },
  {
    src: '/projects/shaders/spiral.webp',
    alt: 'A turquoise and violet spiral shader.',
  },
  {
    src: '/projects/shaders/stencil.webp',
    alt: 'A knot inside a cube, masked with the stencil buffer.',
  },
  {
    src: '/projects/shaders/bottle.webp',
    alt: 'A glass bottle holding a tiny tree.',
  },
  {
    src: '/projects/shaders/warped-spiral.webp',
    alt: 'A warped square spiral in pink and cyan.',
  },
  {
    src: '/projects/shaders/pulsating-spiral.webp',
    alt: 'A pulsating spiral in teal and violet.',
  },
];

const PROJECTS: Project[] = [
  {
    name: 'Wind',
    year: '2026',
    description: 'A bicycle ride through an endless landscape.',
    links: [
      { href: 'https://fremorie.github.io/wind/', label: 'Explore project' },
      { href: 'https://github.com/fremorie/wind', label: 'Source' },
    ],
    media: (
      <img
        className="shot"
        src="/projects/wind.webp"
        alt="A bicycle in tall grass on a green hillside, wind turbines on the horizon."
        width={1600}
        height={1000}
      />
    ),
  },
  {
    name: 'Terrarium',
    year: '2026',
    description: 'A tiny spring inside a glass bottle.',
    flip: true,
    links: [
      {
        href: 'https://fremorie.github.io/terrarium/',
        label: 'Explore project',
      },
      { href: 'https://github.com/fremorie/terrarium', label: 'Source' },
    ],
    media: (
      <img
        className="shot"
        src="/projects/terrarium.webp"
        alt="A glass bottle holding a small snowy island under a bubble."
        width={1600}
        height={1000}
        loading="lazy"
      />
    ),
  },
  {
    name: 'Shader studies',
    year: '2026',
    description: 'Things I made while learning shaders.',
    flip: true,
    tinted: true,
    links: [
      { href: 'https://dariaborisiak.com/shaders/', label: 'Explore gallery' },
      { href: 'https://github.com/fremorie/shaders', label: 'Source' },
    ],
    media: (
      <div className="gallery">
        {SHADERS.map((shader) => (
          <img
            key={shader.src}
            src={shader.src}
            alt={shader.alt}
            width={800}
            height={800}
            loading="lazy"
          />
        ))}
      </div>
    ),
  },
  {
    name: 'Gravity',
    year: '2026',
    description: 'A little physics playground.',
    links: [
      { href: 'https://fremorie.github.io/gravity/', label: 'Explore project' },
      { href: 'https://github.com/fremorie/gravity', label: 'Source' },
    ],
    media: (
      <img
        className="shot zoom"
        src="/projects/gravity.webp"
        alt="Orange and cream shapes scattered across a dark plane."
        width={1600}
        height={1000}
        loading="lazy"
      />
    ),
  },
];

function Piece({
  name,
  year,
  description,
  links,
  media,
  flip,
  tinted,
}: Project) {
  const text = (
    <div className="about-project">
      <span className="year">{year}</span>
      <h2>{name}</h2>
      <p>{description}</p>
      <p className="links">
        {links.map((link, index) => (
          <a
            key={link.href}
            href={link.href}
            className={index === 0 ? undefined : 'quiet'}
          >
            {link.label}
            {index === 0 && <span className="arrow">→</span>}
          </a>
        ))}
      </p>
    </div>
  );

  const shot = <div className="media">{media}</div>;

  return (
    <article
      className={`project${flip ? ' flip' : ''}${tinted ? ' tinted' : ''}`}
    >
      {flip ? text : shot}
      {flip ? shot : text}
    </article>
  );
}

export function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a className="logo" href="/">
          Daria Borisiak
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="/cv">CV</a>
          <a className="out" href="https://github.com/fremorie">
            GitHub
          </a>
        </nav>
      </header>

      <main>
        <div className="hero">
          <div>
            <h1>Things I’ve made for the internet.</h1>
            <p className="hand-note">♡ thanks for stopping by</p>
          </div>
          <img
            className="doodle"
            src="/bicycle-doodle2.png"
            alt="A hand-drawn countryside: a bicycle in the grass beside a river, with wind turbines along the hills."
            width={1983}
            height={793}
          />
        </div>

        <div className="projects">
          {PROJECTS.map((project) => (
            <Piece key={project.name} {...project} />
          ))}
        </div>

        <section className="about" id="about">
          <h2>About</h2>
          <p>
            I’m Daria, a frontend engineer in Bremen. Lately most of my evenings
            have gone into Three.js, WebGL and shaders — mostly out of curiosity
            about what happens between a bit of maths and a picture on the
            screen.
          </p>
          <p>
            Almost everything here started as an experiment. Some of them turned
            into small projects, some are just a few hours of poking at an idea.
          </p>
          <p>
            If you were looking for the work version of me, that lives on my{' '}
            <a href="/cv">CV</a>.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p className="hand-note">Made with curiosity and some late nights ☾</p>
        <nav>
          <a href="mailto:daria.borisiak@gmail.com">Email</a>
          <a href="https://github.com/fremorie">GitHub</a>
          <a href="https://www.linkedin.com/in/daria-borisyak/">LinkedIn</a>
        </nav>
      </footer>
    </div>
  );
}
