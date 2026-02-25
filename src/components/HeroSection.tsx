import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[700px] lg:min-h-[800px] bg-gradient-to-br from-gray-50 via-teal-50/20 to-gray-100 flex items-center pt-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-40 right-1/4 w-20 h-20 border-4 border-teal-400/40 rounded-lg"
        animate={{
          rotate: [0, 360],
          x: mousePosition.x * 3,
          y: mousePosition.y * 3,
        }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
      />
      <motion.div
        className="absolute bottom-40 left-1/3 w-16 h-16 bg-gradient-to-br from-teal-400/30 to-blue-400/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          x: mousePosition.x * -2,
          y: mousePosition.y * -2,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y: yParallax, opacity: opacityParallax }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-teal-100"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-700">🚀 India's #1 Restaurant POS System</span>
            </motion.div>

            {/* Gradient Animated Heading */}
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 1.2 }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-teal-700 to-gray-900 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Transform Your Restaurant Operations
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 1.2 }}
            >
              CafePOSPro delivers comprehensive restaurant management with self-service QR ordering, 
              real-time analytics, and intelligent automation - designed specifically for Indian restaurants and cafes.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              <motion.button 
                onClick={() => scrollToSection('demo')}
                className="group relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Request Demo</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.button 
                onClick={() => scrollToSection('features')}
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md"
                whileHover={{ scale: 1.05, borderColor: "#14b8a6" }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="w-5 h-5 group-hover:text-teal-600 transition-colors" />
                <span>Learn More</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center gap-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 1.0 }}
            >
              {[
                { text: "500+ Restaurants Trust Us", delay: 0.7 },
                { text: "Secure & Reliable", delay: 0.8 },
                { text: "24/7 Support", delay: 0.9 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: item.delay, duration: 0.8 }}
                >
                  <motion.div 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image with 3D Effects */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            <div className="relative group perspective-1000">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                }}
              >
                <motion.img 
                  src="/images/restaurant_manager_tablet_analytics_dashboard_sumup.jpg" 
                  alt="Restaurant Analytics Dashboard" 
                  className="w-full max-w-lg h-auto rounded-xl shadow-2xl relative z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1.0, delay: 0.4 }}
                />
                
                {/* Floating Cards with 3D effect */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-100 z-20"
                  initial={{ opacity: 0, y: -20, rotateX: -20 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0 
                  } : { opacity: 0, y: -20, rotateX: -20 }}
                  transition={{ delay: 0.6, duration: 1.0 }}
                  style={{
                    transform: `translateZ(40px) translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
                  }}
                  whileHover={{ scale: 1.1, z: 60 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">Live Analytics</div>
                      <div className="text-xs text-gray-600">Real-time data</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-100 z-20"
                  initial={{ opacity: 0, y: 20, rotateX: 20 }}
                  animate={isVisible ? { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0 
                  } : { opacity: 0, y: 20, rotateX: 20 }}
                  transition={{ delay: 0.7, duration: 1.0 }}
                  style={{
                    transform: `translateZ(40px) translateX(${mousePosition.x * -0.5}px) translateY(${mousePosition.y * -0.5}px)`,
                  }}
                  whileHover={{ scale: 1.1, z: 60 }}
                >
                  <div>
                    <motion.div 
                      className="text-xl font-bold text-teal-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ₹45,230
                    </motion.div>
                    <div className="text-sm text-gray-600">Today's Revenue</div>
                    <div className="flex items-center space-x-1 mt-1">
                      <motion.svg 
                        className="w-3 h-3 text-green-500" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        animate={{ y: [-2, 0, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </motion.svg>
                      <span className="text-xs text-green-500">+12% from yesterday</span>
                    </div>
                  </div>
                </motion.div>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 blur-2xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Add gradient animation to global styles */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
