import { type ReactNode } from 'react';

import { PROJECTS } from './projects';
import { PageTitle } from './components/PageTitle';
import { ProjectCard } from './components/ProjectCard';
import './sections.css';

/** Straight from the master CV, grouped the way it groups them. */
const STACK = [
    {
        name: 'Graphics',
        items: 'Three.js · WebGL · GLSL · React Three Fiber · Rapier · cannon-es · Blender · Canvas 2D · GSAP',
    },
    { name: 'Languages', items: 'TypeScript · JavaScript · Python · Bash' },
    {
        name: 'Interface',
        items: 'React · React Native · Vue · Styled Components',
    },
    {
        name: 'State & data',
        items: 'Redux · MobX · XState · RxJS · TanStack Query',
    },
    {
        name: 'Testing',
        items: 'Jest · Playwright · Cypress · Selenium · Detox · Maestro',
    },
    {
        name: 'Build & ops',
        items: 'Vite · Webpack · Module Federation · AWS · Jenkins · DataDog · Sentry',
    },
];

const CONTACT = [
    {
        label: 'daria.borisiak@gmail.com',
        href: 'mailto:daria.borisiak@gmail.com',
    },
    { label: 'github.com/fremorie', href: 'https://github.com/fremorie' },
    {
        label: 'linkedin.com/in/daria-borisyak',
        href: 'https://www.linkedin.com/in/daria-borisyak/',
    },
];

export type Section = {
    id: string;
    label: string;
    content: ReactNode;
};

export const SECTIONS: Section[] = [
    {
        id: 'projects',
        label: 'Projects',
        content: (
            <ul className="project-grid">
                {PROJECTS.map((project) => (
                    <li key={project.name}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>
        ),
    },
    {
        id: 'about',
        label: 'About',
        content: (
            <div className="section section--prose">
                <PageTitle as="h2">About</PageTitle>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>
            </div>
        ),
    },
    {
        id: 'stack',
        label: 'Stack',
        content: (
            <div className="section">
                <PageTitle as="h2">Stack</PageTitle>
                <dl className="stack">
                    {STACK.map((group) => (
                        <div key={group.name} className="stack__group">
                            <dt className="stack__name">{group.name}</dt>
                            <dd className="stack__items">{group.items}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        ),
    },
    {
        id: 'contact',
        label: 'Contact',
        content: (
            <div className="section">
                <PageTitle as="h2">Contact</PageTitle>
                <ul className="contact">
                    {CONTACT.map((link) => (
                        <li key={link.href}>
                            <a className="contact__link" href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <p className="contact__place">
                    Bremen · open to Hamburg or remote
                </p>
            </div>
        ),
    },
];
