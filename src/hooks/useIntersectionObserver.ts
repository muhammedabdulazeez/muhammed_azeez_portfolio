import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  delayMs?: number;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -40px 0px',
  freezeOnceVisible = true,
  delayMs = 0,
}: UseIntersectionObserverOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (delayMs > 0) {
          const timer = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delayMs);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
          return () => clearTimeout(timer);
        } else {
          setIsVisible(true);
          setHasAnimated(true);
          if (freezeOnceVisible) {
            observer.unobserve(node);
          }
        }
      } else if (!freezeOnceVisible) {
        setIsVisible(false);
      }
    }, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, delayMs]);

  return {
    ref: elementRef,
    isVisible: freezeOnceVisible ? (isVisible || hasAnimated) : isVisible,
  };
}
