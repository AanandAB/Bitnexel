import React from 'react';
import { Shield, Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAnimatedCounter } from '../hooks/useAnimatedCounter';

const SocialProof: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: marketRef, isVisible: marketVisible } = useScrollAnimation({ threshold: 0.3 });

  const credentials = [
    {
      icon: Shield,
      title: 'GST Compliant',
      description: 'Fully compliant with Indian GST regulations and tax requirements'
    },
    {
      icon: Award,
      title: 'PCI DSS Certified',
      description: 'Bank-grade security for all payment processing and data storage'
    },
    {
      icon: Clock,
      title: '99.9% Uptime',
      description: 'Reliable cloud infrastructure with 24/7 monitoring and support'
    },
    {
      icon: Users,
      title: '24/7 Support',
      description: 'Round-the-clock customer support in English and regional languages'
    }
  ];



  return (
    <section className="py-24 bg-background-page">
      <div className="max-container mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-h1 font-bold text-text-primary mb-6"
          >
            Trusted & Certified for Indian Restaurants
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-large text-text-secondary max-w-3xl mx-auto"
          >
            CafePOSPro meets the highest standards for security, compliance, and reliability, 
            giving you peace of mind while running your restaurant business.
          </motion.p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {credentials.map((credential, index) => {
            const IconComponent = credential.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-background-surface rounded-lg"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconComponent className="w-8 h-8 text-primary-500" />
                </motion.div>
                <h3 className="text-h3 font-semibold text-text-primary mb-3">
                  {credential.title}
                </h3>
                <p className="text-body text-text-secondary">
                  {credential.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Market Growth Section with Animated Counters */}
        <motion.div 
          ref={marketRef}
          initial={{ opacity: 0, y: 50 }}
          animate={marketVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-50 to-background-surface rounded-lg p-12 mb-16"
          style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h3 className="text-h2 font-semibold text-text-primary mb-6">
                Join the Digital Restaurant Revolution
              </h3>
              <p className="text-large text-text-secondary mb-8">
                India's restaurant POS market is experiencing unprecedented growth. 
                Be part of the digital transformation that's reshaping how restaurants operate.
              </p>
              
              {/* Market Stats with Animated Values */}
              <div className="grid grid-cols-1 gap-6">
                <AnimatedStat
                  prefix="$"
                  value={536}
                  suffix="M"
                  label="India POS Market Size"
                  subtitle="2024 valuation"
                  isVisible={marketVisible}
                  delay={0}
                />
                <AnimatedStat
                  prefix="$"
                  value={1.36}
                  suffix="B"
                  label="Projected by 2033"
                  subtitle="10.4% CAGR growth"
                  isVisible={marketVisible}
                  delay={0.2}
                />
                <AnimatedStat
                  value={70}
                  suffix="%"
                  label="Digital Payment Adoption"
                  subtitle="Among restaurant customers"
                  isVisible={marketVisible}
                  delay={0.4}
                />
              </div>
            </div>

            {/* Chart with 3D effect */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/images/restaurant_spending_growth_analytics_chart.jpg"
                alt="Restaurant Market Growth Chart"
                className="w-full h-auto rounded-lg"
                style={{ boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)' }}
              />
              <motion.div 
                className="absolute top-4 left-4 bg-background-surface/90 backdrop-blur-sm px-3 py-2 rounded-md"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-small font-medium text-text-primary">Market Growth</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>



        {/* Industry Recognition */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-background-surface rounded-lg p-8 text-center"
          style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}
        >
          <h3 className="text-h2 font-semibold text-text-primary mb-4">
            Industry Recognition
          </h3>
          <p className="text-large text-text-secondary mb-6">
            "CafePOSPro represents the future of restaurant technology in India, combining 
            local requirements with global best practices."
          </p>
          <div className="text-small text-text-secondary">
            — Restaurant Technology Review, 2024
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Animated Stat Component
interface AnimatedStatProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  subtitle: string;
  isVisible: boolean;
  delay: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ 
  prefix = '', 
  value, 
  suffix = '', 
  label, 
  subtitle, 
  isVisible,
  delay 
}) => {
  const count = useAnimatedCounter(value, 2000, isVisible);
  
  return (
    <motion.div 
      className="flex items-center justify-between"
      initial={{ opacity: 0, x: -30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay }}
    >
      <div>
        <div className="text-h2 font-bold text-primary-500 mb-1">
          {prefix}{count}{suffix}
        </div>
        <div className="text-body font-medium text-text-primary">
          {label}
        </div>
        <div className="text-small text-text-secondary">
          {subtitle}
        </div>
      </div>
    </motion.div>
  );
};

export default SocialProof;
