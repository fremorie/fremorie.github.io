import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type SectionSpyValue = {
  register: (
    id: string,
    element: HTMLElement | null,
  ) => (() => void) | undefined;
  activeId: string | null;
};

const SectionSpyContext = createContext<SectionSpyValue | null>(null);

const OPTIONS: IntersectionObserverInit = {
  threshold: [0, 0.15, 0.4, 0.75],
  rootMargin: '-15% 0px -55% 0px',
};

export function SectionSpyProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  const ratios = useRef(new Map<Element, number>());
  const ids = useRef(new Map<Element, string>());

  const getObserver = useCallback(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        for (const entry of entries)
          ratios.current.set(entry.target, entry.intersectionRatio);

        let best: Element | null = null;
        let ratio = 0;
        for (const [element, value] of ratios.current) {
          if (value > ratio) {
            ratio = value;
            best = element;
          }
        }

        setActiveId(best ? (ids.current.get(best) ?? null) : null);
      }, OPTIONS);
    }
    return observer.current;
  }, []);

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
      observer.current = null;
    };
  }, []);

  const register = useCallback<SectionSpyValue['register']>(
    (id, element) => {
      if (!element) return;

      const instance = getObserver();
      ids.current.set(element, id);
      instance.observe(element);

      return () => {
        instance.unobserve(element);
        ids.current.delete(element);
        ratios.current.delete(element);
      };
    },
    [getObserver],
  );

  const value = useMemo(() => ({ register, activeId }), [register, activeId]);

  return <SectionSpyContext value={value}>{children}</SectionSpyContext>;
}

export function useRegisterSection(id: string) {
  const context = use(SectionSpyContext);
  const register = context?.register;

  return useCallback(
    (element: HTMLElement | null) => register?.(id, element),
    [register, id],
  );
}

export function useActiveSection(): string | null {
  return use(SectionSpyContext)?.activeId ?? null;
}
