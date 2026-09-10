import { type ReactNode } from 'react';

import './PageDescription.css';

export function PageDescription({ children }: { children: ReactNode }) {
    return <p className="page-description">{children}</p>;
}
