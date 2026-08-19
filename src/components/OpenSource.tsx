import { Band } from './Band';
import { MoreList, type MoreItem } from './MoreList';

const MORE: MoreItem[] = [
  {
    href: 'https://github.com/pmndrs/drei/pull/2748',
    nameKey: 'more.drei.name',
    descriptionKey: 'more.drei.description',
  },
  {
    href: 'https://github.com/date-fns/date-fns/pull/3990',
    nameKey: 'more.dateFns.name',
    descriptionKey: 'more.dateFns.description',
  },
];

export function OpenSource() {
  return (
    <Band
      id="open-source"
      tint="periwinkle"
      titleKey="section.openSource"
      noteKey="note.openSource"
    >
      <MoreList items={MORE} />
    </Band>
  );
}
