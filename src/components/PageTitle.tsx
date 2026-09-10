import { type ReactNode } from 'react';

import './PageTitle.css';

type PageTitleProps = {
    children: ReactNode;
    /** `h1` for the hero, `h2` for a section heading inside a panel. */
    as?: 'h1' | 'h2';
};

export function PageTitle({ children, as: Tag = 'h1' }: PageTitleProps) {
    return <Tag className={`page-title page-title--${Tag}`}>{children}</Tag>;
}
