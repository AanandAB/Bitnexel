import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Check, Users, MapPin, Smartphone } from 'lucide-react';
import { useRealTimeCounter } from '../hooks/useRealTimeCounter';

interface PricingOptions {
  restaurants: number;
  locations: number;
  terminals: number;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
}

interface Feature {
  id: string;
  name: string;
  price: number;
  description: string;
}

const availableFeatures: Feature[] = [
  { id: 'kitchen', name: 'Kitchen Display System', price: 299, description: 'Digital kitchen screens' },
  { id: 'inventory', name: 'Inventory Management', price: 199, description: 'Real-time stock tracking' },
  { id: 'analytics', name: 'Advanced Analytics', price: 399, description: 'Comprehensive reports' },
  { id: 'loyalty', name: 'Loyalty Program', price: 149, description: 'Customer retention tools' },
  { id: 'delivery', name: 'Delivery Integration', price: 249, description: 'Multi-platform orders' },
  { id: 'api', name: 'API Access', price: 99, description: 'Custom integrations' },
];

const InteractivePricingCalculator: React.FC = () => {
  const [options, setOptions] = useState<PricingOptions>({
    restaurants: 1,
    locations: 1,
    terminals: 2,
    features: [],
    billingCycle: 'monthly',
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const basePrice = 749;
  const locationDiscount = options.locations > 1 ? 0.1 : 0;
  const yearlyDiscount = options.billingCycle === 'yearly' ? 0.15 : 0;

  const calculatePrice = () => {
    let total = basePrice;
    
    // Additional terminals
    const extraTerminals = Math.max(0, options.terminals - 2);
    total += extraTerminals * 299;
    
    // Features
    const featuresTotal = options.features.reduce((sum, featureId) => {
      const feature = availableFeatures.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    total += featuresTotal;
    
    // Apply discounts
    total *= (1 - locationDiscount);
    total *= (1 - yearlyDiscount);
    
    return Math.round(total);
  };

  const { count: calculatedPrice, startCounting } = useRealTimeCounter({
    start: 0,
    end: calculatePrice(),
    duration: 1500,
  });

  useEffect(() => {
    startCounting();
  }, [options, startCounting]);

  const toggleFeature = (featureId: string) => {
    setOptions(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const totalSavings = Math.round(
    (calculatePrice() / (1 - yearlyDiscount)) - calculatePrice()
  );

  return (
    <div className="bg-background-surface rounded-lg p-8">
      <div className="text-center mb-8">
        <motion.div
          className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Calculator className="w-8 h-8 text-primary-500" />
        </motion.div>
        <h2 className="text-h2 font-bold text-text-primary mb-2">
          Interactive Pricing Calculator
        </h2>
        <p className="text-large text-text-secondary">
          Customize your restaurant management solution and see real-time pricing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Restaurants */}
          <div>
            <label className="block text-body font-semibold text-text-primary mb-3">
              Number of Restaurants
            </label>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, restaurants: Math.max(1, prev.restaurants - 1) }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <motion.span 
                className="text-h3 font-bold text-text-primary min-w-[3rem] text-center"
                key={options.restaurants}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {options.restaurants}
              </motion.span>
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, restaurants: prev.restaurants + 1 }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Locations */}
          <div>
            <label className="block text-body font-semibold text-text-primary mb-3">
              Number of Locations
            </label>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, locations: Math.max(1, prev.locations - 1) }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <motion.span 
                className="text-h3 font-bold text-text-primary min-w-[3rem] text-center"
                key={options.locations}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {options.locations}
              </motion.span>
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, locations: prev.locations + 1 }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
            {options.locations > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-small text-semantic-success font-medium"
              >
                10% multi-location discount applied!
              </motion.div>
            )}
          </div>

          {/* Terminals */}
          <div>
            <label className="block text-body font-semibold text-text-primary mb-3">
              Number of Terminals
            </label>
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, terminals: Math.max(1, prev.terminals - 1) }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <motion.span 
                className="text-h3 font-bold text-text-primary min-w-[3rem] text-center"
                key={options.terminals}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {options.terminals}
              </motion.span>
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, terminals: prev.terminals + 1 }))}
                className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
            {options.terminals > 2 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-small text-text-secondary"
              >
                Extra terminals: ₹299 each
              </motion.div>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="block text-body font-semibold text-text-primary mb-3">
              Additional Features
            </label>
            <div className="grid grid-cols-1 gap-2">
              {availableFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    options.features.includes(feature.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  onClick={() => toggleFeature(feature.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          options.features.includes(feature.id)
                            ? 'border-primary-500 bg-primary-500'
                            : 'border-neutral-300'
                        }`}
                        animate={options.features.includes(feature.id) ? { scale: [1, 1.2, 1] } : {}}
                      >
                        {options.features.includes(feature.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </motion.div>
                      <div>
                        <div className="text-body font-medium text-text-primary">
                          {feature.name}
                        </div>
                        <div className="text-small text-text-secondary">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-body font-semibold text-primary-500">
                      +₹{feature.price}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Billing Cycle */}
          <div>
            <label className="block text-body font-semibold text-text-primary mb-3">
              Billing Cycle
            </label>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, billingCycle: 'monthly' }))}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  options.billingCycle === 'monthly'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-body font-medium text-text-primary">Monthly</div>
                <div className="text-large font-bold text-text-primary">₹{calculatePrice()}</div>
              </motion.button>
              <motion.button
                onClick={() => setOptions(prev => ({ ...prev, billingCycle: 'yearly' }))}
                className={`p-4 rounded-lg border-2 text-center transition-all relative ${
                  options.billingCycle === 'yearly'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-body font-medium text-text-primary">Yearly</div>
                <div className="text-large font-bold text-text-primary">₹{Math.round(calculatePrice() / (1 - yearlyDiscount))}</div>
                <div className="text-small text-semantic-success font-medium">
                  Save ₹{totalSavings}
                </div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="lg:sticky lg:top-8">
          <motion.div
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6"
            layout
          >
            <div className="text-center mb-6">
              <h3 className="text-h3 font-semibold text-text-primary mb-2">
                Your Custom Plan
              </h3>
              <motion.div
                className="text-hero font-bold text-primary-600"
                key={calculatedPrice}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {calculatedPrice}
              </motion.div>
              <div className="text-body text-text-secondary">
                {options.billingCycle} billing
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-body text-text-secondary">
                <span>Base Plan</span>
                <span>₹749</span>
              </div>
              {options.terminals > 2 && (
                <div className="flex justify-between text-body text-text-secondary">
                  <span>Extra Terminals ({options.terminals - 2})</span>
                  <span>₹{(options.terminals - 2) * 299}</span>
                </div>
              )}
              {options.features.map((featureId) => {
                const feature = availableFeatures.find(f => f.id === featureId);
                return (
                  <div key={featureId} className="flex justify-between text-body text-text-secondary">
                    <span>{feature?.name}</span>
                    <span>₹{feature?.price}</span>
                  </div>
                );
              })}
              {yearlyDiscount > 0 && (
                <div className="flex justify-between text-body text-semantic-success">
                  <span>Yearly Discount (15%)</span>
                  <span>-₹{totalSavings}</span>
                </div>
              )}
            </div>

            <motion.button
              className="w-full bg-primary-500 text-white py-4 rounded-md text-body font-semibold"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
            </motion.button>

            <div className="text-center mt-4">
              <div className="text-small text-text-secondary">
                14-day money-back guarantee
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InteractivePricingCalculator;