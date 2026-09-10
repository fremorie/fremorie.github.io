import { type Project } from '../projects';

import './ProjectCard.css';

export function ProjectCard({ project }: { project: Project }) {
    return (
        <a
            className="project-card"
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} — ${project.description}`}
        >
            <img
                className="project-card__shot"
                src={project.image}
                alt={project.alt}
                width={1600}
                height={1000}
                loading="lazy"
            />

            <h3 className="project-card__name">{project.name}</h3>

            <ul className="project-card__tags">
                {project.tags.map((tag) => (
                    <li key={tag} className="project-card__tag">
                        {tag}
                    </li>
                ))}
            </ul>
        </a>
    );
}
