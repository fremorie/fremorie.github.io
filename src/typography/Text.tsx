import type { ReactNode } from 'react';

import { cx } from './cx';
import styles from './Text.module.css';

export type TextSize = 'l' | 'm' | 's';
export type TextTone = 'default' | 'muted' | 'faint' | 'accent';

const SIZE = {
  l: styles.sizeL,
  m: styles.sizeM,
  s: styles.sizeS,
} satisfies Record<TextSize, string>;

const TONE = {
  default: '',
  muted: styles.toneMuted,
  faint: styles.toneFaint,
  accent: styles.toneAccent,
} satisfies Record<TextTone, string>;

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'li' | 'dd';
  size?: TextSize;
  tone?: TextTone;

  measured?: boolean;
  children: ReactNode;
  className?: string;
}

export function Text({
  as: Tag = 'p',
  size = 'm',
  tone = 'default',
  measured = Tag === 'p',
  children,
  className,
}: TextProps) {
  return (
    <Tag
      className={cx(
        styles.text,
        SIZE[size],
        TONE[tone],
        measured && styles.measured,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
