import { LANGUAGES, type TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { useActiveSection } from '../hooks/useSectionSpy';
import { useTheme } from '../hooks/useTheme';
import { Link } from '../typography';
import { Shell } from './Shell';
import styles from './Topbar.module.css';

const SECTIONS: { id: string; key: TranslationKey }[] = [
  { id: 'about', key: 'navigation.about' },
  { id: 'projects', key: 'navigation.projects' },
  { id: 'open-source', key: 'navigation.openSource' },
  { id: 'experience', key: 'navigation.experience' },
  { id: 'skills', key: 'navigation.skills' },
  { id: 'education', key: 'navigation.education' },
];

export function Topbar() {
  const i18n = useI18n();
  const activeId = useActiveSection();
  const { toggle } = useTheme();

  return (
    <header className={styles.topbar}>
      <Shell className={styles.inner}>
        <Link variant="quiet" className={styles.mark} href="#top">
          Daria Borisiak
        </Link>
        <nav className={styles.navigation} aria-label={i18n.t('ui.sections')}>
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              variant="navigation"
              href={`#${section.id}`}
              aria-current={activeId === section.id ? 'true' : undefined}
            >
              {i18n.t(section.key)}
            </Link>
          ))}
        </nav>
        <div className={styles.tools}>
          <div
            className={styles.language}
            role="group"
            aria-label={i18n.t('ui.language')}
          >
            {LANGUAGES.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={i18n.language === code}
                onClick={() => i18n.setLanguage(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.theme}
            aria-label={i18n.t('ui.switchTheme')}
            onClick={toggle}
          >
            <svg
              className={styles.moon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <svg
              className={styles.sun}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </button>
        </div>
      </Shell>
    </header>
  );
}
