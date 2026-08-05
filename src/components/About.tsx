import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Text } from '../typography';
import { Band } from './Band';
import styles from './About.module.css';

const PARAGRAPHS: TranslationKey[] = [
  'about.paragraph1',
  'about.paragraph2',
  'about.paragraph3',
  'about.paragraph4',
  'about.paragraph5',
];

export function About() {
  const i18n = useI18n();

  return (
    <Band
      id="about"
      tint="periwinkle"
      titleKey="section.about"
      noteKey="note.about"
    >
      <div className={styles.prose}>
        {PARAGRAPHS.map((key) => (
          <Text key={key} measured={false}>
            {i18n.t(key)}
          </Text>
        ))}
      </div>
    </Band>
  );
}
