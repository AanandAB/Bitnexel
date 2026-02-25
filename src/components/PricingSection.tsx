import React, { useState } from 'react';
import { Check, Star, Calculator, TrendingUp, Zap, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { use3DTilt } from '../hooks/use3DTilt';
import { usePerformanceOptimizer } from '../hooks/usePerformanceOptimizer';
import InteractivePricingCalculator from './InteractivePricingCalculator';
import RealTimeCounter from './RealTimeCounter';
import { submitDemoRequest } from '../utils/form';

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    buttonStyle: string;
    popular: boolean;
  };
  index: number;
  isVisible: boolean;
  onButtonClick?: (planName: string, buttonText: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index, isVisible, onButtonClick }) => {
  const { ref: tiltRef, tilt, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt({ maxTilt: 8 });

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(plan.name, plan.buttonText);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative bg-background-surface rounded-lg p-10 transition-all duration-250 ${
          plan.popular 
            ? 'border-2 border-primary-500' 
            : 'border border-neutral-200'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transition: 'transform 0.2s ease-out, box-shadow 0.3s ease',
          boxShadow: plan.popular 
            ? `0 20px 40px -10px rgba(20, 184, 166, 0.3)` 
            : `0 10px 30px -5px rgba(0, 0, 0, 0.1)`,
          willChange: 'transform',
        }}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <motion.div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-small font-bold uppercase tracking-wide">
              <Star className="w-4 h-4 inline mr-1" />
              Most Popular
            </div>
          </motion.div>
        )}

        {/* Plan Header */}
        <div className="text-center mb-8">
          <motion.h3 
            className="text-h3 font-semibold text-text-primary mb-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            {plan.name}
          </motion.h3>
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
          >
            <span className="text-hero font-bold text-text-primary">
              {plan.price}
            </span>
            <span className="text-small text-text-secondary ml-2">
              {plan.period}
            </span>
          </motion.div>
          <p className="text-body text-text-secondary">
            {plan.description}
          </p>
        </div>

        {/* Features List */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, featureIndex) => (
            <motion.li 
              key={featureIndex} 
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.15 + 0.4 + featureIndex * 0.05 }}
            >
              <motion.div 
                className="w-5 h-5 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-body text-text-secondary">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button 
          className={`w-full py-4 rounded-md font-semibold text-body transition-all duration-200 ${
            plan.buttonStyle === 'primary'
              ? 'bg-primary-500 text-white'
              : plan.buttonText === 'Contact Sales'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'border-2 border-neutral-200 text-text-secondary'
          }`}
          whileHover={{ 
            scale: 1.03, 
            y: -2,
            boxShadow: plan.buttonStyle === 'primary' 
              ? '0 10px 30px rgba(20, 184, 166, 0.4)' 
              : plan.buttonText === 'Contact Sales'
              ? '0 10px 30px rgba(37, 99, 235, 0.4)'
              : '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
          whileTap={{ scale: 0.98 }}
          onClick={handleButtonClick}
        >
          {plan.buttonText}
        </motion.button>

        {/* Glow effect for popular plan */}
        {plan.popular && (
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { shouldReduceAnimations, getOptimizedAnimationDuration } = usePerformanceOptimizer();
  const [showCalculator, setShowCalculator] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSales = async (planName: string) => {
    setSelectedPlan(planName);
    setShowContactModal(true);
    
    // Auto-scroll to contact form section
    setTimeout(() => {
      const contactSection = document.getElementById('demo');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        ...contactForm,
        message: `${contactForm.message}\n\nPlan Interest: ${selectedPlan}\nContact Reason: Enterprise sales inquiry`
      };
      
      const result = await submitDemoRequest(formData);
      
      if (result.success) {
        alert('Thank you for your interest! Our sales team will contact you within 24 hours.');
        setContactForm({ name: '', email: '', phone: '', restaurant: '', message: '' });
        setShowContactModal(false);
        setSelectedPlan('');
      } else {
        alert('Please try again or call us directly at +91 7034026295');
      }
    } catch (error) {
      alert('An error occurred. Please call us directly at +91 7034026295');
    } finally {
      setIsSubmitting(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: '₹599',
      period: '/month',
      description: 'Perfect for single-location restaurants and small cafes',
      features: [
        '1 Terminal License',
        'Basic POS & Billing',
        'QR Code Table Ordering',
        'Payment Integration',
        'Basic Reports',
        'Email Support',
        'GST Compliance',
        'Android Tablet Support'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'secondary',
      popular: false
    },
    {
      name: 'Professional',
      price: '₹1,299',
      period: '/month',
      description: 'Ideal for growing restaurants with multiple staff members',
      features: [
        '2 Terminal Licenses',
        'Everything in Starter',
        'Kitchen Display System',
        'Inventory Management',
        'Staff Management',
        'Advanced Analytics',
        'Menu Engineering',
        'Custom Reports',
        'Priority Support'
      ],
      buttonText: 'Start Free Trial',
      buttonStyle: 'primary',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹1,899',
      period: '/month',
      description: 'Comprehensive solution for growing restaurants',
      features: [
        '5 Terminal Licenses',
        'Everything in Professional',
        'Advanced Staff Roles',
        'Custom Integrations',
        'API Access',
        'Dedicated Account Manager',
        'Training Sessions',
        'Advanced Analytics',
        'Custom Dashboard'
      ],
      buttonText: 'Contact Sales',
      buttonStyle: 'secondary',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-background-page">
      <div className="max-container mx-auto px-4" ref={sectionRef}>
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4"
              animate={!shouldReduceAnimations() ? { rotate: [0, 360] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Calculator className="w-8 h-8 text-primary-500" />
            </motion.div>
            <h2 className="text-h1 font-bold text-text-primary">
              Flexible Pricing Solutions
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-large text-text-secondary max-w-3xl mx-auto mb-8"
          >
            Choose the plan that fits your restaurant size and needs. 
            All plans include GST compliance and 24/7 customer support.
          </motion.p>

          {/* Live Pricing Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <RealTimeCounter
              start={0}
              end={98}
              suffix="%"
              duration={1500}
              icon="trending"
              label="Customer Satisfaction"
              animateOnView={true}
              color="success"
            />
            <RealTimeCounter
              start={0}
              end={15}
              suffix="+"
              duration={2000}
              icon="zap"
              label="Average ROI Increase"
              animateOnView={true}
              color="primary"
            />
            <RealTimeCounter
              start={0}
              end={500}
              suffix="+"
              duration={2500}
              icon="trending"
              label="Restaurants Served"
              animateOnView={true}
              color="warning"
            />
          </motion.div>
          
          {/* Interactive Calculator Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <motion.button
              onClick={() => setShowCalculator(!showCalculator)}
              className="flex items-center space-x-3 px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calculator className="w-5 h-5" />
              <span>Interactive Pricing Calculator</span>
              <motion.div
                animate={{ rotate: showCalculator ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Interactive Pricing Calculator */}
          <AnimatePresence>
            {showCalculator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mb-16"
              >
                <InteractivePricingCalculator />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Traditional Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center bg-neutral-100 rounded-lg p-1"
          >
            <motion.button 
              className="px-6 py-2 bg-primary-500 text-white rounded-md text-body font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button 
              className="px-6 py-2 text-text-secondary text-body font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yearly (Save 15%)
            </motion.button>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index} 
              plan={plan} 
              index={index} 
              isVisible={isVisible}
              onButtonClick={handleContactSales}
            />
          ))}
        </div>

        {/* Additional Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              '14-day money-back guarantee',
              'No setup fees or hidden costs',
              'Cancel anytime'
            ].map((text, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <Check className="w-5 h-5 text-semantic-success" />
                <span className="text-body text-text-secondary">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-background-surface rounded-lg p-8"
          style={{
            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 className="text-h2 font-semibold text-text-primary text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-h3 font-semibold text-text-primary mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-body text-text-secondary">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="text-h3 font-semibold text-text-primary mb-2">
                Is training included?
              </h4>
              <p className="text-body text-text-secondary">
                Yes, all plans include comprehensive training for you and your staff via video calls.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Contact Sales Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-h3 font-semibold text-text-primary mb-2">
                  Contact Sales Team
                </h3>
                <p className="text-body text-text-secondary">
                  Interested in {selectedPlan} plan? Let us get in touch with you!
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-small font-medium text-text-primary mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none text-small"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-text-primary mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none text-small"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-text-primary mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none text-small"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-text-primary mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={contactForm.restaurant}
                    onChange={(e) => setContactForm({...contactForm, restaurant: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none text-small"
                    placeholder="Enter your restaurant name"
                  />
                </div>

                <div>
                  <label className="block text-small font-medium text-text-primary mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none text-small"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="flex-1 px-4 py-2 border border-neutral-200 text-text-secondary rounded-md text-small font-medium hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-small font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Contact Sales'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-small text-text-secondary">
                  Or call us directly: <a href="tel:+917034026295" className="text-blue-600 font-medium">+91 7034026295</a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingSection;
