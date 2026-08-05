import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Label, Link, cx } from '../typography';
import styles from './ExperienceChart.module.css';

const ROWS: {
  nameKey: TranslationKey;
  role: string;
  left: string;
  width: string;
  early?: boolean;
}[] = [
  {
    nameKey: 'chart.independent',
    role: 'role-independent',
    left: '96.06%',
    width: '3.94%',
  },
  {
    nameKey: 'chart.wolt',
    role: 'role-wolt',
    left: '71.65%',
    width: '24.41%',
  },
  {
    nameKey: 'chart.vimcar',
    role: 'role-vimcar',
    left: '49.61%',
    width: '21.26%',
  },
  {
    nameKey: 'chart.coursera',
    role: 'role-coursera',
    left: '40.94%',
    width: '8.66%',
  },
  {
    nameKey: 'chart.yandex',
    role: 'role-yandex-market',
    left: '26.77%',
    width: '21.26%',
  },
  {
    nameKey: 'chart.bookmate',
    role: 'role-earlier',
    left: '6.30%',
    width: '8.66%',
    early: true,
  },
  {
    nameKey: 'chart.retailRocket',
    role: 'role-earlier',
    left: '3.15%',
    width: '3.15%',
    early: true,
  },
];

const TICKS = [
  { left: '9.45%', year: '2017' },
  { left: '28.35%', year: '2019' },
  { left: '47.24%', year: '2021' },
  { left: '66.14%', year: '2023' },
  { left: '85.04%', year: '2025' },
];

export function ExperienceChart() {
  const i18n = useI18n();

  return (
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
        <div className={styles.row} key={row.nameKey}>
          <Label size="m" tone="muted" className={styles.name}>
            {i18n.t(row.nameKey)}
          </Label>
          <span className={styles.plot}>
            <Link
              variant="none"
              href={`#${row.role}`}
              className={cx(styles.bar, row.early && styles.barEarly)}
              style={{ left: row.left, width: row.width }}
            >
              <span className="sr-only">{i18n.t(row.nameKey)}</span>
            </Link>
          </span>
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
  );
}
