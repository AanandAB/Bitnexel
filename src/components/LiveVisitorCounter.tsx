import React, { useState, useEffect } from 'react';
import { Users, Eye, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VisitorData {
  count: number;
  location: string;
  device: string;
}

const LiveVisitorCounter: React.FC = () => {
  const [currentVisitors, setCurrentVisitors] = useState<VisitorData[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const locations = ['Kochi', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata'];
  const devices = ['iPhone', 'Android', 'Windows', 'MacBook', 'iPad'];
  const actions = ['viewing pricing', 'browsing features', 'checking demo', 'reading about', 'comparing plans'];

  useEffect(() => {
    const generateVisitors = () => {
      const visitorCount = Math.floor(Math.random() * 12) + 5; // 5-16 visitors
      const visitors: VisitorData[] = [];
      
      for (let i = 0; i < visitorCount; i++) {
        visitors.push({
          count: Math.floor(Math.random() * 100) + 50,
          location: locations[Math.floor(Math.random() * locations.length)],
          device: devices[Math.floor(Math.random() * devices.length)]
        });
      }
      return visitors;
    };

    setCurrentVisitors(generateVisitors());

    const interval = setInterval(() => {
      // Simulate visitor changes
      setCurrentVisitors(prev => {
        const newVisitors = [...prev];
        const randomIndex = Math.floor(Math.random() * newVisitors.length);
        newVisitors[randomIndex] = {
          count: Math.floor(Math.random() * 100) + 50,
          location: locations[Math.floor(Math.random() * locations.length)],
          device: devices[Math.floor(Math.random() * devices.length)]
        };
        return newVisitors;
      });
    }, 3000);

    // Hide after 15 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible || currentVisitors.length === 0) return null;

  const randomVisitor = currentVisitors[Math.floor(Math.random() * currentVisitors.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm"
      >
        <motion.div
          className="bg-background-surface rounded-lg p-4 shadow-2xl border border-neutral-200 backdrop-blur-sm"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px -20px rgba(20, 184, 166, 0.3)',
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-semantic-success rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              />
              <span className="text-small font-medium text-text-primary">Live Activity</span>
            </div>
            <motion.button
              onClick={() => setIsVisible(false)}
              className="text-text-secondary hover:text-text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Live Visitor Activity */}
          <div className="space-y-2">
            <motion.div 
              key={`${randomVisitor.count}-${randomAction}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Eye className="w-4 h-4 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-small font-medium text-text-primary truncate">
                  <span className="text-primary-600">{randomVisitor.count}</span> people {randomAction}
                </div>
                <div className="text-caption text-text-secondary flex items-center space-x-1">
                  <span>{randomVisitor.location}</span>
                  <span>•</span>
                  <span>{randomVisitor.device}</span>
                </div>
              </div>
            </motion.div>

            {/* Real-time counter */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="flex items-center justify-between text-caption">
                <span className="text-text-secondary">Active viewers</span>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-primary-500" />
                  <span className="font-bold text-primary-600">{currentVisitors.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="mt-3">
            <div className="w-full bg-neutral-100 rounded-full h-1">
              <motion.div
                className="bg-primary-500 h-1 rounded-full"
                animate={{
                  width: ['20%', '100%', '20%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>

          {/* Small info text */}
          <div className="mt-2 text-center">
            <div className="flex items-center justify-center space-x-1 text-caption text-text-secondary">
              <Clock className="w-3 h-3" />
              <span>Live updates every 3s</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LiveVisitorCounter;