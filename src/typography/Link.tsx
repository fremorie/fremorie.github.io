import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cx } from './cx';
import styles from './Link.module.css';

export type LinkVariant = 'inline' | 'quiet' | 'navigation' | 'footer' | 'none';

const VARIANT = {
  inline: styles.inline,
  quiet: styles.quiet,
  navigation: styles.navigation,
  footer: styles.footer,

  none: '',
} satisfies Record<LinkVariant, string>;

const LEAVES_THE_SITE = /^[a-z][a-z0-9+.-]*:\/\//i;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  children: ReactNode;
}

export function Link({
  variant = 'inline',
  className,
  children,
  ...rest
}: LinkProps) {
  const newTab = LEAVES_THE_SITE.test(rest.href ?? '');

  return (
    <a
      className={cx(styles.link, VARIANT[variant], className)}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
