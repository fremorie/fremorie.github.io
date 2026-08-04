import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Label } from '../typography';
import { Band } from './Band';
import styles from './Skills.module.css';

const GROUPS: {
  nameKey: TranslationKey;
  itemsKey: TranslationKey;
}[] = [
  {
    nameKey: 'skills.graphics.name',
    itemsKey: 'skills.graphics.items',
  },
  { nameKey: 'skills.core.name', itemsKey: 'skills.core.items' },
  { nameKey: 'skills.interface.name', itemsKey: 'skills.interface.items' },
  { nameKey: 'skills.stateData.name', itemsKey: 'skills.stateData.items' },
  { nameKey: 'skills.testing.name', itemsKey: 'skills.testing.items' },
  {
    nameKey: 'skills.buildOperations.name',
    itemsKey: 'skills.buildOperations.items',
  },
];

export function Skills() {
  const i18n = useI18n();

  return (
    <Band
      id="skills"
      tint="chartreuse"
      titleKey="section.skills"
      noteKey="note.skills"
    >
      <div className={styles.skills}>
        {GROUPS.map((group) => (
          <div key={group.nameKey} className={styles.group}>
            <Label
              as="p"
              size="xs"
              tone="default"
              uppercase
              className={styles.name}
            >
              {i18n.t(group.nameKey)}
            </Label>
            <Label as="p" size="l" tone="default" loose>
              {i18n.t(group.itemsKey)}
            </Label>
          </div>
        ))}
      </div>
    </Band>
  );
}
