export type Project = {
    title: string;
    description: string;
    year: string;
    href: string;
    source: string;
    image: { src: string; alt: string };
};

export const projects: Project[] = [
    {
        title: "Terrarium",
        description: "A low-poly spring scene modeled in Blender and enclosed in a glass bottle; a stencil-buffer lens reveals it in winter.",
        year: "2026",
        href: "https://fremorie.github.io/terrarium/",
        source: "https://github.com/fremorie/terrarium",
        image: {
            src: "/projects/terrarium.webp",
            alt: "A glass bottle holding a small snowy island under a bubble.",
        },
    },
    {
        title: "Shader sketchbook",
        description: "Experiments in GLSL and real-time graphics.",
        year: "2026",
        href: "https://dariaborisiak.com/shaders/",
        source: "https://github.com/fremorie/shaders",
        image: {
            src: "/projects/shaders/spiral.webp",
            alt: "A turquoise and violet spiral shader.",
        },
    },
    {
        title: "Monsters",
        description: "Three little monsters whose eyes follow your cursor and react to light.",
        year: "2026",
        href: "https://dariaborisiak.com/monsters/",
        source: "https://github.com/fremorie/monsters",
        image: {
            src: "/projects/monsters.webp",
            alt: "Three soft black monsters with glossy, realistic eyes on a warm beige floor.",
        },
    },
    {
        title: "Sunday ride",
        description: "A procedural bicycle ride through an endless landscape.",
        year: "2026",
        href: "https://fremorie.github.io/wind/",
        source: "https://github.com/fremorie/wind",
        image: {
            src: "/projects/wind.webp",
            alt: "A bicycle resting in tall grass beside a river, wind turbines on the horizon.",
        },
    },
];
