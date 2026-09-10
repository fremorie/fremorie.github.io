import { useState } from 'react';

import { SECTIONS } from './sections';
import { NavBar } from './components/NavBar';
import { PageTitle } from './components/PageTitle';
import { PageDescription } from './components/PageDescription';
import { Panels } from './components/Panels';
import './Page.css';

export function Page() {
    const [active, setActive] = useState(SECTIONS[0].id);

    return (
        <div className="page">
            <header className="page__topbar">
                <a className="page__logo" href="/">
                    Daria Borisiak
                </a>

                {/* sits in the stage's second column, so the nav starts in
                    line with the panel content rather than floating mid-page */}
                <NavBar
                    sections={SECTIONS}
                    active={active}
                    onSelect={setActive}
                />
            </header>

            <main className="page__stage">
                <div className="page__intro">
                    <PageTitle>Hi, I&rsquo;m Daria.</PageTitle>

                    <PageDescription>
                        I build things that move in the browser &mdash; mostly
                        with WebGL, shaders and real-time graphics.
                    </PageDescription>
                </div>

                <Panels sections={SECTIONS} active={active} />
            </main>
        </div>
    );
}
