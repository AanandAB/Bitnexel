import { useRef, useState, MouseEvent, useCallback } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  z: number;
}

interface TiltOptions {
  maxTilt?: number;
  maxScale?: number;
  maxZ?: number;
  perspective?: number;
}

export const use3DTilt = (options: TiltOptions = {}) => {
  const { maxTilt = 10, maxScale = 1.02, maxZ = 30, perspective = 1000 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1, z: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isHovered) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate distance from center for more precise 3D effect
    const distanceX = (x - centerX) / centerX;
    const distanceY = (y - centerY) / centerY;

    const rotateX = distanceY * -maxTilt;
    const rotateY = distanceX * maxTilt;
    const scale = 1 + (Math.abs(distanceX) + Math.abs(distanceY)) * 0.01;
    const z = maxZ;

    setTilt({ rotateX, rotateY, scale: Math.min(scale, maxScale), z });
  }, [maxTilt, maxScale, maxZ, isHovered]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, z: 0 });
    setIsHovered(false);
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseEnter, handleMouseLeave, isHovered, perspective };
};
