import { useEffect, useRef } from 'react';

/**
 * Tracked on the window rather than on the canvas, because the site content
 * sits on top of the canvas and swallows its pointer events.
 */
export function useIsPointerInWindow() {
    const isPointerInWindow = useRef(false);

    useEffect(() => {
        const handlePointerMove = () => {
            isPointerInWindow.current = true;
        };
        const handlePointerOut = (event: PointerEvent) => {
            // fires for every element boundary; only a null relatedTarget
            // means the cursor actually left the document
            if (event.relatedTarget) return;
            isPointerInWindow.current = false;
        };

        window.addEventListener('pointermove', handlePointerMove, {
            passive: true,
        });
        document.addEventListener('pointerout', handlePointerOut);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerout', handlePointerOut);
        };
    }, []);

    return isPointerInWindow;
}
