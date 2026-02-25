import React from 'react';
import { Smartphone, Package, ChefHat, CreditCard, Clock, TrendingUp, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { use3DTilt } from '../hooks/use3DTilt';

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
  image: string;
  reverse?: boolean;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, benefits, image, reverse = false, index }) => {
  const Icon = icon;
  const { ref: cardRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: tiltRef, tilt, handleMouseMove, handleMouseEnter, handleMouseLeave, perspective } = use3DTilt({
    maxTilt: 5,
    maxScale: 1.02,
  });

  return (
    <motion.div 
      ref={cardRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {/* Content */}
      <motion.div 
        className={`space-y-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 50 : -50 }}
        transition={{ duration: 1.0, delay: 0.3 }}
      >
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6 text-teal-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </motion.div>
        
        <p className="text-lg text-gray-600 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-3">
          {benefits.map((benefit, idx) => (
            <motion.li 
              key={idx} 
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              whileHover={{ x: 10 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              </motion.div>
              <span className="text-gray-700">{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image with 3D Tilt Effect */}
      <motion.div 
        className={`${reverse ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? -50 : 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          ref={(node) => {
            // @ts-ignore
            tiltRef.current = node;
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: `${perspective}px`,
            transformStyle: 'preserve-3d',
          }}
          className="relative group"
        >
          <motion.div
            style={{
              transform: `
                perspective(${perspective}px)
                rotateX(${tilt.rotateX}deg)
                rotateY(${tilt.rotateY}deg)
                scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})
                translateZ(${tilt.z}px)
              `,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative"
          >
            <img 
              src={image} 
              alt={title} 
              className="w-full max-w-lg h-auto rounded-xl shadow-2xl relative z-10"
            />
            
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 rounded-xl pointer-events-none"
              initial={{ x: '-100%', opacity: 0 }}
              whileHover={{ x: '100%', opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/30 to-blue-500/30 blur-2xl -z-10"
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* 3D border effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-teal-400/20"
              style={{
                transform: 'translateZ(-10px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const KeyFeatures: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const features = [
    {
      icon: Smartphone,
      title: "QR Code Ordering",
      description: "Enable contactless ordering with table QR codes. Customers scan, browse menu, and place orders directly from their smartphones without waiting for staff.",
      benefits: [
        "Reduces waiting times by 40%",
        "Increases order accuracy",
        "Multilingual menu support",
        "No app installation required"
      ],
      image: "/images/customer_scanning_qr_code_mobile_ordering_restaurant_table.jpg"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track real-time stock levels, automate reordering, and minimize waste with intelligent inventory alerts and analytics.",
      benefits: [
        "Automated low-stock alerts",
        "FIFO/LIFO tracking",
        "Ingredient-level management",
        "Supplier management system"
      ],
      image: "/images/modern_stackable_takeaway_food_packaging_carrier.jpg",
      reverse: true
    },
    {
      icon: ChefHat,
      title: "Kitchen Display System",
      description: "Streamline kitchen operations with digital order displays. Orders route automatically to the right stations with timing indicators.",
      benefits: [
        "Order preparation timing",
        "Multi-station routing",
        "Color-coded priority system",
        "Bump bar integration"
      ],
      image: "/images/restaurant_kitchen_staff_pos_tablet_analytics.jpg"
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description: "Accept all payment methods including UPI, cards, wallets, and cash. Split bills, apply discounts, and process refunds seamlessly.",
      benefits: [
        "UPI, Card, Wallet support",
        "Split bill functionality",
        "Discount & coupon codes",
        "GST compliant invoicing"
      ],
      image: "/images/modern_restaurant_pos_tablet_payment.jpg",
      reverse: true
    },
    {
      icon: Clock,
      title: "Table Management",
      description: "Optimize table turnover with visual floor plans, reservation system, and waitlist management for peak hours.",
      benefits: [
        "Visual floor plan editor",
        "Online reservation system",
        "Waitlist management",
        "Table status tracking"
      ],
      image: "/images/diverse_restaurant_team_briefing_tablet.jpg"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Make data-driven decisions with comprehensive reports on sales, inventory, staff performance, and customer preferences.",
      benefits: [
        "Real-time sales tracking",
        "Menu performance analysis",
        "Customer insights",
        "Export to Excel/PDF"
      ],
      image: "/images/restaurant_manager_tablet_analytics_dashboard_sumup.jpg",
      reverse: true
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider bg-teal-50 px-4 py-2 rounded-full">
              Powerful Features
            </span>
          </motion.div>
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Everything You Need to Run Your Restaurant
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            From order taking to analytics, CafePOSPro provides all the tools you need for smooth restaurant operations
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
