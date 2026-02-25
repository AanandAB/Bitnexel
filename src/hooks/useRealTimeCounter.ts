import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  start?: number;
  end?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const useRealTimeCounter = (options: CounterOptions = {}) => {
  const { start = 0, end = 1000, duration = 2000, prefix = '', suffix = '', decimals = 0 } = options;
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const easeOutExpo = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      const progress = Math.min(deltaTime / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentCount = start + (end - start) * easedProgress;
      setCount(Number(currentCount.toFixed(decimals)));
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    }
    previousTimeRef.current = time;
  };

  const startCounting = () => {
    setIsAnimating(true);
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopCounting = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const formattedCount = `${prefix}${count.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  })}${suffix}`;

  return { 
    count: formattedCount, 
    numericCount: count, 
    startCounting, 
    stopCounting, 
    isAnimating 
  };
};