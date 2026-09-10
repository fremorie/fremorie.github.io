import { type ReactNode } from 'react';

import './Panels.css';

type Panel = { id: string; content: ReactNode };

type PanelsProps = {
    sections: readonly Panel[];
    active: string;
};

export function Panels({ sections, active }: PanelsProps) {
    const index = Math.max(
        0,
        sections.findIndex((section) => section.id === active),
    );

    return (
        <div className="panels">
            <div
                className="panels__track"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {sections.map((section) => {
                    const selected = section.id === active;

                    return (
                        <section
                            key={section.id}
                            className="panels__panel"
                            id={`panel-${section.id}`}
                            role="tabpanel"
                            aria-labelledby={`tab-${section.id}`}
                            /* off-screen panels stay in the DOM so they're still
                               crawlable, but must not take focus */
                            inert={!selected}
                        >
                            {section.content}
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
