export type Project = {
    name: string;
    /** Not shown on the card; it gives the link an accessible name. */
    description: string;
    image: string;
    alt: string;
    tags: string[];
    href: string;
};

export const PROJECTS: Project[] = [
    {
        name: 'Terrarium',
        description: 'A tiny spring inside a glass bottle.',
        image: '/projects/terrarium.webp',
        alt: 'A glass bottle holding a small snowy island under a bubble.',
        tags: ['Three.js', 'GLSL', 'Environment'],
        href: 'https://fremorie.github.io/terrarium/',
    },
    {
        name: 'Wind',
        description: 'A bicycle ride through an endless landscape.',
        image: '/projects/wind.webp',
        alt: 'A bicycle resting in tall grass beside a river, wind turbines on the horizon.',
        tags: ['Procedural', 'Three.js', 'Shaders'],
        href: 'https://fremorie.github.io/wind/',
    },
    {
        name: 'Monsters',
        description: 'Three monsters whose eyes follow you around.',
        image: '/projects/monsters.webp',
        alt: 'Three soft black monsters with big eyes on a warm beige floor.',
        tags: ['Three.js', 'GLSL', 'Interaction'],
        href: 'https://dariaborisiak.com/monsters/',
    },
    {
        name: 'Shader Studies',
        description: 'Things I made while learning shaders.',
        image: '/projects/shader.webp',
        alt: 'A grid of shader experiments in teal, violet and pink.',
        tags: ['GLSL', 'Experiments', 'Creative Coding'],
        href: 'https://dariaborisiak.com/shaders/',
    },
];
