import type { ReactNode } from 'react';

import { cx } from '../typography';
import styles from './Shell.module.css';

export function Shell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cx(styles.shell, className)}>{children}</div>;
}
