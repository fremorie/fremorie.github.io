import { useRef } from 'react';

import './NavBar.css';

type NavSection = { id: string; label: string };

type NavBarProps = {
    sections: readonly NavSection[];
    active: string;
    onSelect: (id: string) => void;
};

/**
 * Reads as a nav bar, but it switches panels rather than navigating, so it
 * carries the tabs pattern: one stop in the tab order, arrows to move between
 * items.
 */
export function NavBar({ sections, active, onSelect }: NavBarProps) {
    const listRef = useRef<HTMLDivElement>(null);

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        const step =
            event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;

        event.preventDefault();

        const current = sections.findIndex((section) => section.id === active);
        const next =
            sections[(current + step + sections.length) % sections.length];

        onSelect(next.id);
        listRef.current
            ?.querySelector<HTMLButtonElement>(`[data-section="${next.id}"]`)
            ?.focus();
    }

    return (
        <div
            className="nav-bar"
            role="tablist"
            aria-label="Sections"
            ref={listRef}
            onKeyDown={handleKeyDown}
        >
            {sections.map((section) => {
                const selected = section.id === active;

                return (
                    <button
                        key={section.id}
                        type="button"
                        role="tab"
                        id={`tab-${section.id}`}
                        data-section={section.id}
                        aria-controls={`panel-${section.id}`}
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        className={`nav-bar__item${selected ? ' nav-bar__item--active' : ''}`}
                        onClick={() => onSelect(section.id)}
                    >
                        {section.label}
                    </button>
                );
            })}
        </div>
    );
}
