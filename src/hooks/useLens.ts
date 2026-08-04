import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export function useLens<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef<number | null>(null);

  const target = useRef({ x: 0, y: 0, radius: 0 });
  const current = useRef({ x: 0, y: 0, radius: 0 });
  const easing = useRef(0.18);
  const enabled = useRef(true);

  useEffect(() => {
    enabled.current = window.matchMedia('(hover: hover)').matches;
    easing.current = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 1
      : 0.18;

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, []);

  const start = useCallback(() => {
    if (frame.current !== null) return;

    function step() {
      const element = ref.current;
      if (!element) {
        frame.current = null;
        return;
      }

      const destination = target.current;
      const position = current.current;
      const ease = easing.current;

      position.x += (destination.x - position.x) * ease;
      position.y += (destination.y - position.y) * ease;
      position.radius += (destination.radius - position.radius) * ease;

      element.style.setProperty('--lens-x', `${position.x}px`);
      element.style.setProperty('--lens-y', `${position.y}px`);
      element.style.setProperty('--lens-radius', `${position.radius}px`);
      element.style.setProperty(
        '--lens-opacity',
        String(Math.min(1, position.radius / 40)),
      );

      const settled =
        Math.abs(destination.x - position.x) < 0.3 &&
        Math.abs(destination.y - position.y) < 0.3 &&
        Math.abs(destination.radius - position.radius) < 0.3;

      frame.current =
        settled && destination.radius === 0
          ? null
          : requestAnimationFrame(step);
    }

    frame.current = requestAnimationFrame(step);
  }, []);

  const lensRadius = useCallback(() => {
    const element = ref.current;
    return element
      ? Math.min(element.clientWidth, element.clientHeight) * 0.34
      : 0;
  }, []);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<T>) => {
      const element = ref.current;
      if (!element || !enabled.current) return;

      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      current.current.x = x;
      current.current.y = y;
      target.current = { x, y, radius: lensRadius() };

      start();
    },
    [lensRadius, start],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      const element = ref.current;
      if (!element || !enabled.current) return;

      const rect = element.getBoundingClientRect();
      target.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: lensRadius(),
      };
      start();
    },
    [lensRadius, start],
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element || !enabled.current) return;

    target.current.radius = 0;
    start();
  }, [start]);

  return { ref, onPointerEnter, onPointerMove, onPointerLeave };
}
