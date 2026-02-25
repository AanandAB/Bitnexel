import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, CreditCard, Smartphone, Users, TrendingUp } from 'lucide-react';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: number;
  data?: any;
}

const demoSteps: DemoStep[] = [
  {
    id: 'order',
    title: 'Customer Scans QR Code',
    description: 'Customer places order directly from their phone',
    icon: Smartphone,
    duration: 3000,
    data: { orders: 12, avgTime: '2:30' }
  },
  {
    id: 'kitchen',
    title: 'Kitchen Receives Order',
    description: 'Order appears instantly on kitchen display',
    icon: Clock,
    duration: 2500,
    data: { priority: 'High', prepTime: '8 min' }
  },
  {
    id: 'payment',
    title: 'Payment Processing',
    description: 'Multiple payment methods supported',
    icon: CreditCard,
    duration: 2000,
    data: { method: 'UPI', success: true }
  },
  {
    id: 'analytics',
    title: 'Analytics Update',
    description: 'Real-time data sync across all systems',
    icon: TrendingUp,
    duration: 3000,
    data: { revenue: '₹1,247', orders: 156 }
  }
];

interface InteractiveFeatureDemoProps {
  autoPlay?: boolean;
  className?: string;
}

const InteractiveFeatureDemo: React.FC<InteractiveFeatureDemoProps> = ({
  autoPlay = true,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const step = demoSteps[currentStep];
    const interval = 50;
    const totalIntervals = step.duration / interval;
    let currentInterval = 0;

    const timer = setInterval(() => {
      currentInterval++;
      setProgress(currentInterval / totalIntervals);

      if (currentInterval >= totalIntervals) {
        clearInterval(timer);
        setProgress(0);
        
        setTimeout(() => {
          setCurrentStep((prev) => (prev + 1) % demoSteps.length);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const step = demoSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className={`bg-background-surface rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-semibold text-text-primary">
          Live Demo: Order Processing
        </h3>
        <motion.button
          onClick={togglePlay}
          className="px-4 py-2 bg-primary-500 text-white rounded-md text-small font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-6">
        <motion.div
          className="bg-primary-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center space-x-2 mb-6">
        {demoSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentStep ? 'bg-primary-500' : 'bg-neutral-300'
            }`}
            animate={{
              scale: index === currentStep ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Icon */}
            <motion.div
              className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <IconComponent className="w-8 h-8 text-primary-500" />
            </motion.div>

            {/* Title */}
            <h4 className="text-h3 font-semibold text-text-primary">
              {step.title}
            </h4>

            {/* Description */}
            <p className="text-body text-text-secondary">
              {step.description}
            </p>

            {/* Demo Data */}
            {step.data && (
              <motion.div
                className="grid grid-cols-2 gap-4 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Object.entries(step.data).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    className="bg-neutral-50 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-small text-text-secondary capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-body font-semibold text-text-primary">
                      {String(value)}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className="flex justify-center mt-4"
            >
              <motion.div
                className="w-8 h-8 bg-semantic-success rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center space-x-2 mt-6">
        {demoSteps.map((demoStep, index) => (
          <motion.button
            key={demoStep.id}
            onClick={() => {
              setCurrentStep(index);
              setProgress(0);
            }}
            className={`px-3 py-1 rounded-md text-small font-medium transition-colors ${
              index === currentStep
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-200 text-text-secondary hover:bg-neutral-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default InteractiveFeatureDemo;