import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Send, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { submitDemoRequest, submitComplaint } from '../utils/form';

const CTASection: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitDemoRequest(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your interest! Your request has been recorded. We will contact you within 24 hours. Alternatively, call us directly at +91 7034026295.'
        });
        setFormData({ name: '', email: '', phone: '', restaurant: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Please call us directly at +91 7034026295 or email aanandab44@gmail.com.'
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitComplaint(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Your complaint has been registered. Our support team will contact you shortly. You can also call us at +91 7034026295.'
        });
        setFormData({ name: '', email: '', phone: '', restaurant: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Please call us directly at +91 7034026295 or email aanandab44@gmail.com.'
        });
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    'Free 14-day trial with full features',
    'Personalized demo with your use case',
    'No setup fees or hidden costs',
    '24/7 support included'
  ];

  const contactInfo = [
    { icon: Phone, text: '+91 7034026295', href: 'tel:+917034026295' },
    { icon: Mail, text: 'aanandab44@gmail.com', href: 'mailto:aanandab44@gmail.com' },
    { icon: MapPin, text: 'Kochi, Kerala', href: null }
  ];

  return (
    <section id="demo" className="py-24 bg-primary-50">
      <div className="max-container mx-auto px-4" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - CTA Content */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              className="text-h1 font-bold text-text-primary mb-6"
            >
              Ready to Transform Your Restaurant?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-large text-text-secondary mb-8"
            >
              Join 500+ restaurants already using CafePOSPro to increase efficiency, 
              reduce costs, and boost revenue. Get a personalized demo and see how 
              we can help your restaurant thrive.
            </motion.p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-semantic-success rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <span className="text-body text-text-secondary">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const content = (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-3"
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-5 h-5 text-primary-500" />
                    </motion.div>
                    <span className={`text-body ${info.href ? 'text-primary-600 hover:text-primary-700 cursor-pointer' : 'text-text-secondary'}`}>
                      {info.text}
                    </span>
                  </motion.div>
                );

                return info.href ? (
                  <a key={index} href={info.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Demo Request Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-background-surface rounded-lg p-8"
            style={{ boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)' }}
          >
            <h3 className="text-h2 font-semibold text-text-primary mb-6 text-center">
              Request Your Free Demo
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-md flex items-start space-x-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-semantic-success/10 border border-semantic-success/20'
                      : 'bg-semantic-error/10 border border-semantic-error/20'
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      submitStatus.type === 'success' ? 'text-semantic-success' : 'text-semantic-error'
                    }`}
                  />
                  <p
                    className={`text-small ${
                      submitStatus.type === 'success' ? 'text-semantic-success' : 'text-semantic-error'
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                </motion.div>
              )}
              {/* Name Field */}
              <motion.div
                animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="name" className="block text-small font-medium text-text-primary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-body"
                  placeholder="Enter your full name"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="email" className="block text-small font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-body"
                  placeholder="Enter your email address"
                />
              </motion.div>

              {/* Phone Field */}
              <motion.div
                animate={{ scale: focusedField === 'phone' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="phone" className="block text-small font-medium text-text-primary mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-body"
                  placeholder="Enter your phone number"
                />
              </motion.div>

              {/* Restaurant Field */}
              <motion.div
                animate={{ scale: focusedField === 'restaurant' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="restaurant" className="block text-small font-medium text-text-primary mb-2">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  id="restaurant"
                  name="restaurant"
                  value={formData.restaurant}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('restaurant')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-body"
                  placeholder="Enter your restaurant name"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="message" className="block text-small font-medium text-text-primary mb-2">
                  Tell us about your needs
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-md border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 focus:outline-none transition-all duration-200 text-body resize-none"
                  placeholder="Tell us about your restaurant type, current challenges, or specific features you're interested in..."
                />
              </motion.div>

              {/* Submit Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={handleDemoRequest}
                  disabled={isSubmitting}
                  className="bg-primary-500 text-white px-6 py-3 rounded-md font-semibold text-body flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: '0 20px 40px rgba(20, 184, 166, 0.4)'
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Request Demo'}</span>
                  <Send className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleComplaint}
                  disabled={isSubmitting}
                  className="bg-semantic-error text-white px-6 py-3 rounded-md font-semibold text-body flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.4)'
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'File Complaint'}</span>
                  <AlertCircle className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Privacy Notice */}
              <p className="text-small text-text-secondary text-center">
                By submitting this form, you agree to our privacy policy. 
                We'll never share your information with third parties.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center bg-background-surface rounded-lg p-8"
          style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}
        >
          <h3 className="text-h2 font-semibold text-text-primary mb-4">
            Prefer to Call Us Directly?
          </h3>
          <p className="text-large text-text-secondary mb-6">
            Speak with our restaurant technology experts and get answers to all your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="tel:+917034026295"
              className="bg-primary-500 text-white px-6 py-2 rounded-md font-semibold text-small inline-block text-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Call: +91 7034026295
            </motion.a>
            <motion.button 
              className="border-2 border-neutral-200 text-text-secondary px-6 py-2 rounded-md font-semibold text-small"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const subject = encodeURIComponent('Call Back Request');
                const body = encodeURIComponent('Please call me back at your earliest convenience.');
                window.location.href = `mailto:aanandab44@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              Schedule Call Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
