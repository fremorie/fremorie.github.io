import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Heading, Label, Text, cx } from '../typography';
import { Band } from './Band';
import { ExperienceChart } from './ExperienceChart';
import styles from './Experience.module.css';

const ROLES: {
  id: string;
  from: string;
  to?: string;
  toKey?: TranslationKey;
  titleKey: TranslationKey;
  qualifierKey?: TranslationKey;
  organisationKey: TranslationKey;
  descriptionKey: TranslationKey;
  stackKey: TranslationKey;
  brief?: boolean;
}[] = [
  {
    id: 'role-independent',
    from: '03/2026 —',
    toKey: 'role.present',
    titleKey: 'role.independent.title',
    organisationKey: 'role.independent.organisation',
    descriptionKey: 'role.independent.description',
    stackKey: 'role.independent.stack',
  },
  {
    id: 'role-wolt',
    from: '08/2023 —',
    to: '03/2026',
    titleKey: 'role.wolt.title',
    organisationKey: 'role.wolt.organisation',
    descriptionKey: 'role.wolt.description',
    stackKey: 'role.wolt.stack',
  },
  {
    id: 'role-vimcar',
    from: '04/2021 —',
    to: '07/2023',
    titleKey: 'role.vimcar.title',
    organisationKey: 'role.vimcar.organisation',
    descriptionKey: 'role.vimcar.description',
    stackKey: 'role.vimcar.stack',
  },
  {
    id: 'role-coursera',
    from: '05/2020 —',
    to: '04/2021',
    titleKey: 'role.coursera.title',
    qualifierKey: 'role.qualifier.partTime',
    organisationKey: 'role.coursera.organisation',
    descriptionKey: 'role.coursera.description',
    stackKey: 'role.coursera.stack',
    brief: true,
  },
  {
    id: 'role-yandex-market',
    from: '02/2019 —',
    to: '02/2021',
    titleKey: 'role.yandexMarket.title',
    organisationKey: 'role.yandexMarket.organisation',
    descriptionKey: 'role.yandexMarket.description',
    stackKey: 'role.yandexMarket.stack',
    brief: true,
  },
  {
    id: 'role-yandex',
    from: '11/2018 —',
    to: '02/2019',
    titleKey: 'role.yandex.title',
    qualifierKey: 'role.qualifier.intern',
    organisationKey: 'role.yandex.organisation',
    descriptionKey: 'role.yandex.description',
    stackKey: 'role.yandex.stack',
    brief: true,
  },
  {
    id: 'role-earlier',
    from: '2016 —',
    to: '2017',
    titleKey: 'role.earlier.title',
    organisationKey: 'role.earlier.organisation',
    descriptionKey: 'role.earlier.description',
    stackKey: 'role.earlier.stack',
    brief: true,
  },
];

export function Experience() {
  const i18n = useI18n();

  return (
    <Band
      id="experience"
      tint="teal"
      titleKey="section.experience"
      noteKey="note.experience"
    >
      <ExperienceChart />
      {ROLES.map((role) => (
        <article
          className={cx(styles.role, role.brief && styles.brief)}
          id={role.id}
          key={role.titleKey + role.from}
        >
          <Label as="p" size="s" tabular className={styles.when}>
            {role.from}
            <br />
            {role.toKey ? i18n.t(role.toKey) : role.to}
          </Label>
          <div>
            <Heading level={3} size={role.brief ? '2xs' : 'xs'}>
              {i18n.t(role.titleKey)}
              {role.qualifierKey && (
                <>
                  {' '}
                  <span className={styles.qualifier}>
                    {i18n.t(role.qualifierKey)}
                  </span>
                </>
              )}
            </Heading>
            <Label as="p" size="m" tone="link" className={styles.organisation}>
              {i18n.t(role.organisationKey)}
            </Label>
            <Text size="s" tone="muted" className={styles.description}>
              {i18n.t(role.descriptionKey)}
            </Text>
            <Label as="p" size="s" loose className={styles.stack}>
              {i18n.t(role.stackKey)}
            </Label>
          </div>
        </article>
      ))}
    </Band>
  );
}
