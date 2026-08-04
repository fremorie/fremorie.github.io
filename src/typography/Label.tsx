import type { ReactNode } from 'react';

import { cx } from './cx';
import styles from './Label.module.css';

export type LabelSize = 'l' | 'm' | 's' | 'xs' | '2xs';
export type LabelTone = 'default' | 'muted' | 'faint' | 'accent' | 'link';

const SIZE = {
  l: styles.sizeL,
  m: styles.sizeM,
  s: styles.sizeS,
  xs: styles.sizeXs,
  '2xs': styles.sizeXxs,
} satisfies Record<LabelSize, string>;

const TONE = {
  default: '',
  muted: styles.toneMuted,
  faint: styles.toneFaint,
  accent: styles.toneAccent,
  link: styles.toneLink,
} satisfies Record<LabelTone, string>;

export interface LabelProps {
  as?: 'span' | 'p' | 'div' | 'dt' | 'time';
  size?: LabelSize;
  tone?: LabelTone;

  uppercase?: boolean;

  tabular?: boolean;

  loose?: boolean;
  children: ReactNode;
  className?: string;
  dateTime?: string;
}

export function Label({
  as: Tag = 'span',
  size = 's',
  tone = 'faint',
  uppercase = false,
  tabular = false,
  loose = false,
  children,
  className,
  dateTime,
}: LabelProps) {
  return (
    <Tag
      dateTime={Tag === 'time' ? dateTime : undefined}
      className={cx(
        styles.label,
        SIZE[size],
        TONE[tone],
        uppercase && styles.uppercase,
        tabular && styles.tabular,
        loose && styles.loose,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
