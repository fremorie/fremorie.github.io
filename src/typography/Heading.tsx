import type { ReactNode } from 'react';

import { cx } from './cx';
import styles from './Heading.module.css';

export type HeadingSize = '2xl' | 'xl' | 'l' | 'm' | 's' | 'xs' | '2xs';
export type HeadingTone = 'default' | 'muted' | 'faint' | 'accent';

const SIZE = {
  '2xl': styles.sizeXxl,
  xl: styles.sizeXl,
  l: styles.sizeL,
  m: styles.sizeM,
  s: styles.sizeS,
  xs: styles.sizeXs,
  '2xs': styles.sizeXxs,
} satisfies Record<HeadingSize, string>;

const TONE = {
  default: '',
  muted: styles.toneMuted,
  faint: styles.toneFaint,
  accent: styles.toneAccent,
} satisfies Record<HeadingTone, string>;

const SIZE_FOR_LEVEL = {
  1: 'xl',
  2: 'l',
  3: 's',
  4: 'xs',
  5: 'xs',
  6: '2xs',
} as const;

type Common = {
  size?: HeadingSize;
  tone?: HeadingTone;

  strong?: boolean;
  children: ReactNode;

  className?: string;
  id?: string;
};

export type HeadingProps =
  | (Common & {
      level: 1 | 2 | 3 | 4 | 5 | 6;
      as?: never;
    })
  | (Common & { as: 'p' | 'span'; size: HeadingSize; level?: never });

export function Heading({
  size,
  tone = 'default',
  strong = false,
  children,
  className,
  id,
  ...rest
}: HeadingProps) {
  const Tag = rest.as ?? (`h${rest.level}` as const);
  const resolved = size ?? SIZE_FOR_LEVEL[rest.level!];

  return (
    <Tag
      id={id}
      className={cx(
        styles.heading,
        SIZE[resolved],
        strong && styles.strong,
        TONE[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
