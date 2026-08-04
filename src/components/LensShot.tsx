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

  return (
    <div className={cx(styles.shot, styles.lens)} {...lens}>
      <img loading="lazy" decoding="async" src={src} alt={alt} />
      <img
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
