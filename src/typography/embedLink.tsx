import type { ReactNode } from 'react';

import { Link } from './Link';

const BRACKETED = /^(.*)\[(.+)\](.*)$/s;

export function embedLink(text: string, href?: string): ReactNode {
  const match = BRACKETED.exec(text);
  if (!match) return text;

  const [, before, name, after] = match;
  return (
    <>
      {before}
      {href ? <Link href={href}>{name}</Link> : name}
      {after}
    </>
  );
}
