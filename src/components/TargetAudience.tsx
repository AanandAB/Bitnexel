import React from 'react';
import { Coffee, UtensilsCrossed, Store, Truck } from 'lucide-react';

const TargetAudience: React.FC = () => {
  const segments = [
    {
      icon: Coffee,
      title: 'Quick Service Restaurants',
      description: 'Fast-paced environments where efficiency matters most. Perfect for cafes, food trucks, and quick-bite restaurants.',
      features: ['Express ordering', 'Fast payment processing', 'Queue management', 'Staff scheduling'],
      image: '/images/modern_restaurant_staff_tablet_pos_payment_system.jpg'
    },
    {
      icon: UtensilsCrossed,
      title: 'Fine Dining Restaurants',
      description: 'Elegant establishments requiring sophisticated service. Enhance guest experience with seamless table service.',
      features: ['Table management', 'Wine pairing', 'Multi-course service', 'Guest preferences'],
      image: '/images/diverse-restaurant-team-professional-staff-kitchen.jpg'
    },
    {
      icon: Store,
      title: 'Small & Medium Cafes',
      description: 'Cozy neighborhood spots and growing cafe chains. Scale your business with intelligent automation.',
      features: ['Menu management', 'Inventory tracking', 'Customer loyalty', 'Local delivery'],
      image: '/images/customer_scanning_qr_code_restaurant_mobile_ordering_table.jpg'
    },
    {
      icon: Truck,
      title: 'Cloud Kitchens',
      description: 'Delivery-first restaurants without dine-in service. Optimize for online orders and delivery management.',
      features: ['Delivery integration', 'Order tracking', 'Packaging management', 'Multi-platform sync'],
      image: '/images/modern_stackable_takeaway_food_packaging_carrier.jpg'
    }
  ];

  return (
    <section id="about" className="py-24 bg-background-surface">
      <div className="max-container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-text-primary mb-6">
            Built for Every Restaurant Type
          </h2>
          <p className="text-large text-text-secondary max-w-3xl mx-auto">
            Whether you're running a cozy cafe or managing multiple restaurant locations, 
            CafePOSPro adapts to your specific business model and operational needs.
          </p>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {segments.map((segment, index) => {
            const IconComponent = segment.icon;
            return (
              <div 
                key={index}
                className="bg-background-page rounded-lg overflow-hidden shadow-sm hover:shadow-card transition-all duration-250 group"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={segment.image}
                    alt={segment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-250"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary-500" />
                    </div>
                    <h3 className="text-h3 font-semibold text-text-primary">
                      {segment.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-body text-text-secondary mb-6">
                    {segment.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {segment.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        <span className="text-small text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <div className="bg-gradient-to-r from-primary-50 to-background-page rounded-lg p-12">
          <div className="text-center mb-12">
            <h3 className="text-h2 font-semibold text-text-primary mb-4">
              Trusted by Restaurant Owners Across India
            </h3>
            <p className="text-large text-text-secondary">
              From small cafes to large restaurant chains, see how different businesses 
              benefit from CafePOSPro's comprehensive features.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-h2 font-bold text-primary-500 mb-2">500+</div>
              <div className="text-body text-text-secondary">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-bold text-primary-500 mb-2">50+</div>
              <div className="text-body text-text-secondary">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-bold text-primary-500 mb-2">1M+</div>
              <div className="text-body text-text-secondary">Orders Processed</div>
            </div>
            <div className="text-center">
              <div className="text-h2 font-bold text-primary-500 mb-2">99.9%</div>
              <div className="text-body text-text-secondary">Uptime</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <blockquote className="text-large text-text-primary italic mb-6">
            "CafePOSPro transformed our operations completely. We've reduced wait times by 40% 
            and increased our average order value by 25%. The QR ordering system is a game-changer."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="/images/diverse_professional_restaurant_team_chefs.jpg"
              alt="Restaurant Owner"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="text-body font-semibold text-text-primary">Rajesh Kumar</div>
              <div className="text-small text-text-secondary">Owner, Mumbai Cafe Chain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
