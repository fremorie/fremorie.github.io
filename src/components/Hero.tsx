import { lazy, Suspense, useCallback, useState } from 'react';

import { useI18n } from '../i18n/language';
import { Heading, Label, Text, cx } from '../typography';
import { Shell } from './Shell';
import styles from './Hero.module.css';

const Hero3D = lazy(() =>
  import('../three/Hero3D').then((module) => ({ default: module.Hero3D })),
);

export function Hero() {
  const i18n = useI18n();

  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <section className={styles.hero} id="top">
      <Shell className={styles.shell}>
        <div>
          <Heading level={1} size="2xl" className={styles.name}>
            Daria Borisiak
          </Heading>
          <Heading as="p" size="m" className={styles.role}>
            {i18n.t('hero.role')} <em>{i18n.t('hero.roleAccent')}</em>
          </Heading>
          <Text size="l" tone="muted" measured={false} className={styles.lede}>
            {i18n.t('hero.lede')}
          </Text>
          <Label as="p" size="m" className={styles.meta}>
            <span className={styles.dot}>{i18n.t('ui.available')}</span>
            <span>{i18n.t('hero.location')}</span>
          </Label>
          <Label as="p" size="m" tone="muted" loose className={styles.stack}>
            {i18n.t('hero.stack')}
          </Label>
          <div className={styles.actions}>
            <a
              className={cx(styles.button, styles.solid)}
              href="mailto:daria.borisiak@gmail.com"
            >
              {i18n.t('ui.contact')}
            </a>
            <a className={styles.button} href="https://github.com/fremorie">
              GitHub
            </a>
            <a
              className={styles.button}
              href="https://www.linkedin.com/in/daria-borisyak/"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div
          className={cx(styles.canvas, ready && styles.ready)}
          id="hero-3d"
          aria-hidden="true"
        >
          <Suspense fallback={null}>
            <Hero3D onReady={onReady} />
          </Suspense>
        </div>
      </Shell>
    </section>
  );
}
