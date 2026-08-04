import { useI18n } from '../i18n/language';
import { Heading, Label, Link } from '../typography';
import { Shell } from './Shell';
import styles from './Footer.module.css';

export function Footer() {
  const i18n = useI18n();

  return (
    <footer className={styles.footer}>
      <Shell className={styles.shell}>
        <Heading as="p" size="xl">
          {i18n.t('footer.signOff')}
          <br />
          <Link
            variant="none"
            className={styles.email}
            href="mailto:daria.borisiak@gmail.com"
          >
            daria.borisiak@gmail.com
          </Link>
        </Heading>
        <Label as="div" size="m" tone="default" className={styles.row}>
          <span className={styles.links}>
            <Link variant="footer" href="https://github.com/fremorie">
              GitHub
            </Link>
            <Link
              variant="footer"
              href="https://www.linkedin.com/in/daria-borisyak/"
            >
              LinkedIn
            </Link>
          </span>
          <span>{i18n.t('footer.location')}</span>
        </Label>
      </Shell>
    </footer>
  );
}
