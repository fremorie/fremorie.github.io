import type { ReactNode } from 'react';

import { Heading, Label, Link, Text, cx } from '../typography';
import styles from './Piece.module.css';

export function Work({ children }: { children: ReactNode }) {
  return <div className={styles.work}>{children}</div>;
}

export type PieceTint = 'periwinkle' | 'teal' | 'chartreuse' | 'coral';

const TINT = {
  periwinkle: '',
  teal: styles.teal,
  chartreuse: styles.chartreuse,
  coral: styles.coral,
} satisfies Record<PieceTint, string>;

export type PieceProps = {
  kind: string;
  tint?: PieceTint;
  name: string;
  href: string;
  description: string;
  links: { href: string; label: string }[];

  shot?: ReactNode;
};

export function Piece({
  kind,
  tint = 'periwinkle',
  name,
  href,
  description,
  links,
  shot,
}: PieceProps) {
  return (
    <article className={cx(styles.piece, !shot && styles.textOnly)}>
      {shot}
      <div>
        <Label
          uppercase
          size="xs"
          tone="default"
          className={cx(styles.kind, TINT[tint])}
        >
          {kind}
        </Label>
        <Heading level={3} className={styles.name}>
          <Link variant="quiet" href={href}>
            {name}
          </Link>
        </Heading>
        <Text tone="muted" className={styles.description}>
          {description}
        </Text>
        <Label as="p" size="m" className={styles.links}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </Label>
      </div>
    </article>
  );
}
