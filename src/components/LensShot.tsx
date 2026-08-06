import { useEffect, useRef } from 'react';

import { useLens } from '../hooks/useLens';
import { cx } from '../typography';
import styles from './LensShot.module.css';

export function Shot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.shot}>
      <img loading="lazy" decoding="async" src={src} alt={alt} />
    </div>
  );
}

type Props = {
  src: string;
  alt: string;

  under: string;
};

export function LensShot({ src, alt, under }: Props) {
  const lens = useLens<HTMLDivElement>();
  const alternate = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = alternate.current;
    if (!image) return;

    let cancelled = false;
    const warm = () => {
      if (!cancelled) image.decode().catch(() => {});
    };

    if (image.complete) warm();
    else image.addEventListener('load', warm, { once: true });

    return () => {
      cancelled = true;
      image.removeEventListener('load', warm);
    };
  }, [under]);

  return (
    <div className={cx(styles.shot, styles.lens)} {...lens}>
      <img loading="lazy" decoding="async" src={src} alt={alt} />
      <img
        ref={alternate}
        className={styles.alternate}
        loading="lazy"
        decoding="async"
        src={under}
        alt=""
        aria-hidden="true"
      />
      <span className={styles.ring} aria-hidden="true"></span>
    </div>
  );
}
