import { useEffect, useRef, useState, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

interface MouseTrackerOptions {
  throttle?: number;
  enableParallax?: boolean;
  enable3D?: boolean;
}

export const useAdvancedMouseTracker = (options: MouseTrackerOptions = {}) => {
  const { throttle = 16, enableParallax = true, enable3D = true } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const lastUpdateRef = useRef(0);
  const throttledUpdateRef = useRef<number>();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    
    if (now - lastUpdateRef.current < throttle) {
      return;
    }
    
    lastUpdateRef.current = now;

    const x = e.clientX;
    const y = e.clientY;
    
    const normalizedX = (x / window.innerWidth) * 2 - 1;
    const normalizedY = (y / window.innerHeight) * 2 - 1;

    setMousePosition({ x, y, normalizedX, normalizedY });
    setIsActive(true);
  }, [throttle]);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
    setMousePosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      normalizedX: 0,
      normalizedY: 0,
    });
  }, []);

  const getParallaxValue = useCallback((strength: number, axis: 'x' | 'y') => {
    if (!enableParallax || !isActive) return 0;
    
    const value = axis === 'x' ? mousePosition.normalizedX : mousePosition.normalizedY;
    return value * strength;
  }, [enableParallax, isActive, mousePosition]);

  const get3DValue = useCallback((strength: number, axis: 'x' | 'y') => {
    if (!enable3D || !isActive) return 0;
    
    const value = axis === 'x' ? mousePosition.normalizedX : mousePosition.normalizedY;
    return value * strength;
  }, [enable3D, isActive, mousePosition]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseMove);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return {
    mousePosition,
    isActive,
    getParallaxValue,
    get3DValue,
    parallax: {
      x: (strength: number) => getParallaxValue(strength, 'x'),
      y: (strength: number) => getParallaxValue(strength, 'y'),
    },
    transform3D: {
      x: (strength: number) => get3DValue(strength, 'x'),
      y: (strength: number) => get3DValue(strength, 'y'),
    },
  };
};