import { useI18n } from '../i18n/language';
import { Band } from './Band';
import { MoreList, type MoreItem } from './MoreList';
import { Piece, Work } from './Piece';

const MORE: MoreItem[] = [
  {
    href: 'https://github.com/date-fns/date-fns/pull/3990',
    nameKey: 'more.dateFns.name',
    descriptionKey: 'more.dateFns.description',
  },
  {
    href: 'https://www.npmjs.com/package/@fremorie/karatsuba-multiplication',
    nameKey: 'more.karatsuba.name',
    descriptionKey: 'more.karatsuba.description',
  },
];

export function OpenSource() {
  const i18n = useI18n();

  return (
    <Band
      id="open-source"
      tint="periwinkle"
      titleKey="section.openSource"
      noteKey="note.openSource"
    >
      <Work>
        <Piece
          kind={i18n.t('openSource.drei.kind')}
          tint="teal"
          name={i18n.t('openSource.drei.name')}
          href="https://github.com/pmndrs/drei/pull/2748"
          description={i18n.t('openSource.drei.description')}
          links={[
            {
              href: 'https://github.com/pmndrs/drei/pull/2748',
              label: i18n.t('link.pullRequest'),
            },
          ]}
        />
      </Work>
      <MoreList items={MORE} />
    </Band>
  );
}
