import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Band } from './Band';
import { LensShot, Shot } from './LensShot';
import { MoreList, type MoreItem } from './MoreList';
import { Piece, Work, type PieceTint } from './Piece';

type Project = {
  kindKey: TranslationKey;
  tint?: PieceTint;
  nameKey: TranslationKey;
  href: string;
  descriptionKey: TranslationKey;
  links: { href: string; labelKey: TranslationKey }[];
  shot: { src: string; altKey: TranslationKey; under?: string };
};

const PROJECTS: Project[] = [
  {
    kindKey: 'project.terrarium.kind',
    tint: 'coral',
    nameKey: 'project.terrarium.name',
    href: 'https://fremorie.github.io/terrarium/',
    descriptionKey: 'project.terrarium.description',
    links: [
      { href: 'https://fremorie.github.io/terrarium/', labelKey: 'link.live' },
      {
        href: 'https://github.com/fremorie/terrarium',
        labelKey: 'link.source',
      },
      {
        href: 'https://threejs-journey.com/challenges/024-stylized-nature',
        labelKey: 'link.challenge',
      },
    ],
    shot: {
      src: '/projects/terrarium.webp',
      altKey: 'project.terrarium.alt',
      under: '/projects/terrarium-wire.webp',
    },
  },
  {
    kindKey: 'project.wind.kind',
    tint: 'chartreuse',
    nameKey: 'project.wind.name',
    href: 'https://fremorie.github.io/wind/',
    descriptionKey: 'project.wind.description',
    links: [
      { href: 'https://fremorie.github.io/wind/', labelKey: 'link.live' },
      { href: 'https://github.com/fremorie/wind', labelKey: 'link.source' },
    ],
    shot: {
      src: '/projects/wind.webp',
      altKey: 'project.wind.alt',
      under: '/projects/wind-wire.webp',
    },
  },
  {
    kindKey: 'project.shaders.kind',
    tint: 'teal',
    nameKey: 'project.shaders.name',
    href: 'https://dariaborisiak.com/shaders/wavy-spiral',
    descriptionKey: 'project.shaders.description',
    links: [
      {
        href: 'https://dariaborisiak.com/shaders/wavy-spiral',
        labelKey: 'link.live',
      },
      { href: 'https://github.com/fremorie/shaders', labelKey: 'link.source' },
    ],
    shot: { src: '/projects/shader-02.webp', altKey: 'project.shaders.alt' },
  },
  {
    kindKey: 'project.gravity.kind',
    nameKey: 'project.gravity.name',
    href: 'https://fremorie.github.io/gravity/',
    descriptionKey: 'project.gravity.description',
    links: [
      { href: 'https://fremorie.github.io/gravity/', labelKey: 'link.live' },
      { href: 'https://github.com/fremorie/gravity', labelKey: 'link.source' },
    ],
    shot: {
      src: '/projects/gravity.webp',
      altKey: 'project.gravity.alt',
      under: '/projects/gravity-wire.webp',
    },
  },
];

const MORE: MoreItem[] = [
  {
    href: 'https://github.com/fremorie/bacteria',
    nameKey: 'more.bacteria.name',
    descriptionKey: 'more.bacteria.description',
  },
  {
    href: 'https://discrete-math-puzzles.github.io/puzzles/plow-truck/index.html',
    nameKey: 'more.plowTruck.name',
    descriptionKey: 'more.plowTruck.description',
  },
];

export function Projects() {
  const i18n = useI18n();

  return (
    <Band id="projects" titleKey="section.projects" noteKey="note.projects">
      <Work>
        {PROJECTS.map((project) => (
          <Piece
            key={project.nameKey}
            kind={i18n.t(project.kindKey)}
            tint={project.tint}
            name={i18n.t(project.nameKey)}
            href={project.href}
            description={i18n.t(project.descriptionKey)}
            links={project.links.map((link) => ({
              href: link.href,
              label: i18n.t(link.labelKey),
            }))}
            shot={
              project.shot.under ? (
                <LensShot
                  src={project.shot.src}
                  alt={i18n.t(project.shot.altKey)}
                  under={project.shot.under}
                />
              ) : (
                <Shot
                  src={project.shot.src}
                  alt={i18n.t(project.shot.altKey)}
                />
              )
            }
          />
        ))}
      </Work>
      <MoreList items={MORE} />
    </Band>
  );
}
