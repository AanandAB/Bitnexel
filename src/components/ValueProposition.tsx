import React from 'react';
import { QrCode, BarChart3, Users, Calculator } from 'lucide-react';

const ValueProposition: React.FC = () => {
  const features = [
    {
      icon: QrCode,
      title: 'Self-Service Ordering',
      description: 'QR code table ordering and kiosk systems reduce wait times by 5+ minutes per table while increasing revenue by 10-50% through seamless mobile ordering experiences.',
      metrics: '5+ min saved per table'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Tracking',
      description: 'Complete visibility into sales, inventory, and operations with live dashboards. Track performance across multiple locations and make data-driven decisions instantly.',
      metrics: 'Live dashboards'
    },
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Role-based access, time tracking, scheduling, and commission management. Streamline workforce operations with integrated payroll and performance analytics.',
      metrics: 'Full workforce control'
    },
    {
      icon: Calculator,
      title: 'Financial Reporting',
      description: 'Comprehensive financial insights with GST compliance, profit margins by item, and multi-location consolidated reporting. Direct accounting integration available.',
      metrics: 'GST Compliant'
    }
  ];

  return (
    <section id="value-proposition" className="py-24 bg-background-page">
      <div className="max-container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-text-primary mb-6">
            Why Restaurant Managers Choose CafePOSPro
          </h2>
          <p className="text-large text-text-secondary max-w-3xl mx-auto">
            Built specifically for Indian restaurants and cafes, CafePOSPro delivers measurable operational improvements 
            through intelligent automation and comprehensive management tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-background-surface p-10 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:scale-102 transition-all duration-250 group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors duration-250">
                    <IconComponent className="w-6 h-6 text-primary-500 group-hover:text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-h3 font-semibold text-text-primary mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-body text-text-secondary mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Metrics Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-600 text-small font-medium rounded-full">
                  {feature.metrics}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-body text-text-secondary mb-6">
            Join 500+ restaurants already transforming their operations
          </p>
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-500 text-white px-8 py-3 rounded-md font-semibold text-body hover:bg-primary-600 transform hover:-translate-y-0.5 hover:shadow-card transition-all duration-200"
          >
            See All Features
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
