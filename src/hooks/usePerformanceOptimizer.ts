import { useEffect, useState, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  isLowPerformance: boolean;
}

interface LazyLoadOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export const usePerformanceOptimizer = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: undefined,
    isLowPerformance: false,
  });
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  // Monitor performance metrics
  useEffect(() => {
    let fpsCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      fpsCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = fpsCount;
        setMetrics(prev => ({
          ...prev,
          fps: currentFPS,
          isLowPerformance: currentFPS < 30,
        }));
        
        fpsCount = 0;
        lastTime = currentTime;
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsLowPowerMode(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsLowPowerMode(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check memory usage if available
  useEffect(() => {
    if ('memory' in performance) {
      const interval = setInterval(() => {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // Convert to MB
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const shouldReduceAnimations = useCallback(() => {
    return isLowPowerMode || metrics.isLowPerformance;
  }, [isLowPowerMode, metrics.isLowPerformance]);

  const getOptimizedAnimationDuration = useCallback((duration: number) => {
    return shouldReduceAnimations() ? duration * 0.5 : duration;
  }, [shouldReduceAnimations]);

  const getOptimizedAnimationDelay = useCallback((delay: number) => {
    return shouldReduceAnimations() ? 0 : delay;
  }, [shouldReduceAnimations]);

  return {
    metrics,
    isLowPowerMode,
    shouldReduceAnimations,
    getOptimizedAnimationDuration,
    getOptimizedAnimationDelay,
  };
};

export const useLazyLoad = (options: LazyLoadOptions = {}) => {
  const { root = null, rootMargin = '50px', threshold = 0.1 } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          // Unobserve after loading to prevent unnecessary observations
          observer.unobserve(element);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [root, rootMargin, threshold, isLoaded]);

  return { ref: elementRef, isLoaded, isIntersecting };
};