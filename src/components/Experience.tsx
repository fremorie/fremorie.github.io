import { lazy, Suspense, useCallback, useRef, useState } from 'react';

import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Heading, Label, Text, cx } from '../typography';
import { Band } from './Band';
import styles from './Experience.module.css';

const Phone3D = lazy(() =>
  import('../three/Phone3D').then((module) => ({ default: module.Phone3D })),
);

const BAR = { now: styles.barNow, early: styles.barEarly };

const ROWS: {
  nameKey: TranslationKey;
  bar?: string;
  left: string;
  width: string;
  durationKey: TranslationKey;
  modifier?: 'now' | 'early';
}[] = [
  {
    nameKey: 'chart.independent',
    left: '96.06%',
    width: '3.94%',
    durationKey: 'chart.duration.independent',
    modifier: 'now',
  },
  {
    nameKey: 'chart.wolt',
    bar: 'wolt',
    left: '71.65%',
    width: '24.41%',
    durationKey: 'chart.duration.wolt',
  },
  {
    nameKey: 'chart.vimcar',
    bar: 'vimcar',
    left: '49.61%',
    width: '21.26%',
    durationKey: 'chart.duration.vimcar',
  },
  {
    nameKey: 'chart.coursera',
    bar: 'coursera',
    left: '40.94%',
    width: '8.66%',
    durationKey: 'chart.duration.coursera',
  },
  {
    nameKey: 'chart.yandex',
    bar: 'yandex',
    left: '26.77%',
    width: '21.26%',
    durationKey: 'chart.duration.yandex',
  },
  {
    nameKey: 'chart.bookmate',
    bar: 'bookmate',
    left: '6.30%',
    width: '8.66%',
    durationKey: 'chart.duration.bookmate',
    modifier: 'early',
  },
  {
    nameKey: 'chart.retailRocket',
    bar: 'retailrocket',
    left: '3.15%',
    width: '3.15%',
    durationKey: 'chart.duration.retailRocket',
    modifier: 'early',
  },
];

const TICKS = [
  { left: '9.45%', year: '2017' },
  { left: '28.35%', year: '2019' },
  { left: '47.24%', year: '2021' },
  { left: '66.14%', year: '2023' },
  { left: '85.04%', year: '2025' },
];

const ROLES: {
  id?: string;
  from: string;
  to?: string;
  toKey?: TranslationKey;
  titleKey: TranslationKey;
  qualifierKey?: TranslationKey;
  organisationKey: TranslationKey;
  descriptionKey: TranslationKey;
  stackKey: TranslationKey;
  now?: boolean;
  brief?: boolean;
}[] = [
  {
    from: '03/2026 —',
    toKey: 'role.present',
    titleKey: 'role.independent.title',
    organisationKey: 'role.independent.organisation',
    descriptionKey: 'role.independent.description',
    stackKey: 'role.independent.stack',
    now: true,
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

  const [lit, setLit] = useState<string | null>(null);

  const [phoneReady, setPhoneReady] = useState(false);
  const onPhoneReady = useCallback(() => setPhoneReady(true), []);

  const roles = useRef(new Map<string, HTMLElement>());

  const registerRole = useCallback(
    (id: string) => (element: HTMLElement | null) => {
      if (!element) return;
      roles.current.set(id, element);
      return () => {
        roles.current.delete(id);
      };
    },
    [],
  );

  const scrollToRole = useCallback((id: string) => {
    roles.current
      .get(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <Band
      id="experience"
      tint="teal"
      titleKey="section.experience"
      noteKey="note.experience"
    >
      <div className={styles.top}>
        <div className={styles.chart}>
          <div className={styles.axis} aria-hidden="true">
            <div className={styles.axisLine}>
              {TICKS.map((tick) => (
                <span
                  className={styles.tick}
                  style={{ left: tick.left }}
                  key={tick.year}
                >
                  <Label size="s" tabular className={styles.tickYear}>
                    {tick.year}
                  </Label>
                </span>
              ))}
            </div>
          </div>
          {ROWS.map((row) => (
            <div
              className={cx(
                styles.row,
                row.modifier === 'now' && styles.rowNow,
                row.bar && lit === row.bar && styles.lit,
              )}
              key={row.nameKey}
              onPointerEnter={
                row.bar ? () => setLit(row.bar ?? null) : undefined
              }
              onPointerLeave={row.bar ? () => setLit(null) : undefined}
            >
              <Label size="m" tone="muted" className={styles.name}>
                {i18n.t(row.nameKey)}
              </Label>
              <span className={styles.plot}>
                <span
                  className={cx(styles.bar, row.modifier && BAR[row.modifier])}
                  style={{ left: row.left, width: row.width }}
                ></span>
              </span>
              <Label size="s" tabular className={styles.duration}>
                {i18n.t(row.durationKey)}
              </Label>
            </div>
          ))}

          <div className={styles.spanRow}>
            <div className={styles.span}>
              <span className={styles.spanLine}></span>
              <Label size="m" tone="accent" tabular className={styles.spanText}>
                {i18n.t('chart.span')}
              </Label>
            </div>
          </div>
        </div>
        <aside aria-label={i18n.t('ui.companies')}>
          <div
            className={cx(styles.phone, phoneReady && styles.phoneReady)}
            id="phone-3d"
          >
            <Suspense fallback={null}>
              <Phone3D
                lit={lit}
                onHover={setLit}
                onSelect={scrollToRole}
                onReady={onPhoneReady}
              />
            </Suspense>
          </div>
        </aside>
      </div>
      {ROLES.map((role) => (
        <article
          className={cx(
            styles.role,
            role.now && styles.roleNow,
            role.brief && styles.brief,
          )}
          id={role.id}
          ref={role.id ? registerRole(role.id) : undefined}
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
