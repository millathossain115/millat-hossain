import { RefObject, useEffect, useState } from 'react';

export default function useNearViewport(
  ref: RefObject<HTMLElement | null>,
  rootMargin: string = '700px 0px'
): boolean {
  const [isNearViewport, setIsNearViewport] = useState<boolean>(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isNearViewport;
}
