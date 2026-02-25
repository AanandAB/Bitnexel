import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { threshold = 0.3, rootMargin = '-50px 0px -50px 0px', triggerOnce = true, root = null } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateVisibility = useCallback((entry: IntersectionObserverEntry) => {
    const intersectionRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;
    
    setProgress(intersectionRatio);
    
    if (isIntersecting) {
      setIsVisible(true);
      if (triggerOnce) {
        observer.unobserve(entry.target);
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [triggerOnce]);

  let observer: IntersectionObserver;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(updateVisibility);
      },
      { 
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0, 0.05, 0.1, ..., 1
        rootMargin,
        root 
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, root, updateVisibility]);

  return { ref, isVisible, progress };
};
