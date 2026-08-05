import type { TranslationKey } from '../i18n/dictionary';
import { useI18n } from '../i18n/language';
import { Heading, Link, Text, embedLink } from '../typography';
import styles from './MoreList.module.css';

export type MoreItem = {
  href: string;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  descriptionHref?: string;
};

export function MoreList({ items }: { items: MoreItem[] }) {
  const i18n = useI18n();

  return (
    <ul className={styles.more}>
      {items.map((item) => (
        <li key={item.href}>
          <Heading as="span" size="xs">
            <Link variant="quiet" href={item.href}>
              {i18n.t(item.nameKey)}
            </Link>
          </Heading>
          <Text as="span" size="s" tone="muted" measured={false}>
            {embedLink(i18n.t(item.descriptionKey), item.descriptionHref)}
          </Text>
        </li>
      ))}
    </ul>
  );
}
