import { useState } from 'react';

import { SECTIONS } from './sections';
import { NavBar } from './components/NavBar';
import { PageTitle } from './components/PageTitle';
import { PageDescription } from './components/PageDescription';
import { Panels } from './components/Panels';
import { StatusPill } from './components/StatusPill';
import './Page.css';

export function Page() {
    const [active, setActive] = useState(SECTIONS[0].id);

    return (
        <div className="page">
            <header className="page__topbar">
                <a className="page__logo" href="/">
                    Daria Borisiak
                </a>

                {/* shares the stage's second column, so the nav starts in line
                    with the panel content rather than floating mid-page */}
                <div className="page__topbar-end">
                    <NavBar
                        sections={SECTIONS}
                        active={active}
                        onSelect={setActive}
                    />

                    <StatusPill
                        place="Based in Germany"
                        note="Open to opportunities"
                    />
                </div>
            </header>

            <main className="page__stage">
                <div className="page__intro">
                    <PageTitle>Hi, I&rsquo;m Daria.</PageTitle>

                    <p className="page__role">
                        Frontend Engineer · 3D &amp; Interactive Experiences
                    </p>

                    <PageDescription>
                        Almost eight years building production web and mobile
                        applications. These days I&rsquo;m focused on WebGL,
                        real-time graphics and creative coding.
                    </PageDescription>

                    <button
                        className="page__cta"
                        type="button"
                        onClick={() => setActive('projects')}
                    >
                        See my projects <span aria-hidden="true">→</span>
                    </button>
                </div>

                <Panels sections={SECTIONS} active={active} />
            </main>
        </div>
    );
}
