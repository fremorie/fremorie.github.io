import { About } from './components/About';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { OpenSource } from './components/OpenSource';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Topbar } from './components/Topbar';
import { SectionSpyProvider } from './hooks/useSectionSpy';
import { LanguageProvider } from './i18n/language';

export function App() {
  return (
    <LanguageProvider>
      <SectionSpyProvider>
        <Topbar />
        <Hero />
        <About />
        <Projects />
        <OpenSource />
        <Experience />
        <Skills />
        <Education />
        <Footer />
      </SectionSpyProvider>
    </LanguageProvider>
  );
}
