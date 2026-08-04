import type { ReactNode } from 'react';

import { useRegisterSection } from '../hooks/useSectionSpy';
import { useI18n } from '../i18n/language';
import type { TranslationKey } from '../i18n/dictionary';
import { Heading, Label, cx } from '../typography';
import { Shell } from './Shell';
import styles from './Band.module.css';

type Props = {
  id: string;
  tint?: 'periwinkle' | 'teal' | 'chartreuse';
  titleKey: TranslationKey;
  noteKey: TranslationKey;
  children: ReactNode;
};

const TINT = {
  periwinkle: styles.periwinkle,
  teal: styles.teal,
  chartreuse: styles.chartreuse,
} satisfies Record<NonNullable<Props['tint']>, string>;

export function Band({ id, tint, titleKey, noteKey, children }: Props) {
  const register = useRegisterSection(id);
  const i18n = useI18n();

  return (
    <section
      className={cx(styles.band, tint && TINT[tint])}
      id={id}
      ref={register}
    >
      <Shell className={styles.shell}>
        <Heading level={2} size="l" className={styles.title}>
          {i18n.t(titleKey)}
        </Heading>
        <Label as="p" uppercase className={styles.note}>
          {i18n.t(noteKey)}
        </Label>
        {children}
      </Shell>
    </section>
  );
}
