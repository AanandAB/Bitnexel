import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRealTimeCounter } from '../hooks/useRealTimeCounter';
import { TrendingUp, DollarSign, Users, Activity, Zap } from 'lucide-react';

interface RealTimeCounterProps {
  start?: number;
  end?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  icon?: 'dollar' | 'trending' | 'users' | 'activity' | 'zap';
  label?: string;
  animateOnView?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const iconMap = {
  dollar: DollarSign,
  trending: TrendingUp,
  users: Users,
  activity: Activity,
  zap: Zap,
};

const colorMap = {
  primary: 'text-primary-500',
  success: 'text-semantic-success',
  warning: 'text-semantic-warning',
  error: 'text-semantic-error',
};

const RealTimeCounter: React.FC<RealTimeCounterProps> = ({
  start = 0,
  end = 1000,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  icon = 'trending',
  label = '',
  animateOnView = true,
  color = 'primary',
}) => {
  const { count, numericCount, startCounting, isAnimating } = useRealTimeCounter({
    start,
    end,
    duration,
    prefix,
    suffix,
    decimals,
  });
  
  const [hasStarted, setHasStarted] = useState(false);
  const [previousCount, setPreviousCount] = useState<number | null>(null);

  useEffect(() => {
    if (animateOnView && !hasStarted) {
      const timer = setTimeout(() => {
        startCounting();
        setHasStarted(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!animateOnView && !hasStarted) {
      startCounting();
      setHasStarted(true);
    }
  }, [animateOnView, hasStarted, startCounting]);

  useEffect(() => {
    if (numericCount !== previousCount && previousCount !== null) {
      setPreviousCount(numericCount);
    } else if (previousCount === null) {
      setPreviousCount(numericCount);
    }
  }, [numericCount, previousCount]);

  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className={`flex flex-col items-center space-y-2 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      {label && (
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IconComponent className={`w-5 h-5 ${colorMap[color]}`} />
          <span className="text-small font-medium text-text-secondary">
            {label}
          </span>
        </motion.div>
      )}

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            className="counter-display text-4xl font-bold"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ 
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 20 
            }}
          >
            {count}
          </motion.div>
        </AnimatePresence>

        {/* Pulsing ring effect when counting */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${colorMap[color]} border-opacity-30`}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Floating sparkles */}
      <AnimatePresence>
        {isAnimating && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${colorMap[color].replace('text-', 'bg-')} rounded-full`}
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RealTimeCounter;