import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Heading, Label, Link, Text } from '../typography';
import { Band } from './Band';
import styles from './Education.module.css';

const DEGREES: { when: string; nameKey: TranslationKey }[] = [
  { when: '07/2017', nameKey: 'education.msc' },
  { when: '07/2015', nameKey: 'education.bsc' },
];

const CERTIFICATES: {
  href: string;
  when: string;
  nameKey: TranslationKey;
  whereKey: TranslationKey;
}[] = [
  {
    href: 'https://threejs-journey.com/certificate/view/52336',
    when: '05/2026',
    nameKey: 'certificate.threejsJourney.name',
    whereKey: 'certificate.threejsJourney.where',
  },
  {
    href: 'https://static.frontendmasters.com/ud/c/7747b5c4fe/DKXPcZaQOr/canvas-webgl.pdf',
    when: '01/2026',
    nameKey: 'certificate.canvasWebgl.name',
    whereKey: 'certificate.canvasWebgl.where',
  },
  {
    href: 'https://static.frontendmasters.com/ud/c/7747b5c4fe/nAZdQNLdlu/redux-mobx.pdf',
    when: '12/2025',
    nameKey: 'certificate.reduxMobx.name',
    whereKey: 'certificate.reduxMobx.where',
  },
  {
    href: 'https://static.frontendmasters.com/ud/c/7747b5c4fe/pApqiQbIWA/fullstack-v3.pdf',
    when: '05/2025',
    nameKey: 'certificate.fullstack.name',
    whereKey: 'certificate.fullstack.where',
  },
  {
    href: 'https://www.coursera.org/account/accomplishments/verify/2LGH6GKDX6S6',
    when: '02/2023',
    nameKey: 'certificate.algorithms.name',
    whereKey: 'certificate.algorithms.where',
  },
];

export function Education() {
  const i18n = useI18n();

  return (
    <Band id="education" titleKey="section.education" noteKey="note.education">
      <div className={styles.school}>
        <picture>
          <source
            srcSet="/logos/mipt-white.webp"
            media="(prefers-color-scheme: dark)"
          />
          <img
            className={styles.logo}
            src="/logos/mipt-blue.webp"
            alt=""
            aria-hidden="true"
            width="320"
            height="116"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <Heading as="p" size="xs" strong>
          {i18n.t('education.school')}
        </Heading>
      </div>
      {DEGREES.map((degree) => (
        <article className={styles.entry} key={degree.nameKey}>
          <Label as="p" tabular>
            {degree.when}
          </Label>
          <div>
            <Heading level={3} size="xs" className={styles.name}>
              {i18n.t(degree.nameKey)}
            </Heading>
          </div>
        </article>
      ))}

      <Label as="p" size="xs" uppercase className={styles.subheading}>
        {i18n.t('education.certificates')}
      </Label>
      {CERTIFICATES.map((certificate) => (
        <article className={styles.entry} key={certificate.href}>
          <Label as="p" tabular>
            {certificate.when}
          </Label>
          <div>
            <Heading level={3} size="xs" className={styles.name}>
              <Link variant="quiet" href={certificate.href}>
                {i18n.t(certificate.nameKey)}
              </Link>
            </Heading>
            <Text size="s" tone="muted" measured={false}>
              {i18n.t(certificate.whereKey)}
            </Text>
          </div>
          <Label>
            <Link variant="quiet" href={certificate.href}>
              {i18n.t('education.verify')}
              <span className="sr-only"> {i18n.t(certificate.nameKey)}</span>
            </Link>
          </Label>
        </article>
      ))}
    </Band>
  );
}
