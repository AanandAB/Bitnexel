import React from 'react';
import { Clock, TrendingUp, DollarSign, Users } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      number: '5+',
      suffix: 'min',
      label: 'Time Saved Per Table',
      description: 'Average reduction in service time through self-service ordering and streamlined workflows',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      number: '10-50',
      suffix: '%',
      label: 'Revenue Increase',
      description: 'Upselling opportunities captured through digital ordering and intelligent promotions',
      trend: 'up'
    },
    {
      icon: DollarSign,
      number: '10-35',
      suffix: '%',
      label: 'Operational Cost Reduction',
      description: 'Lower labor costs and reduced waste through better inventory and staff management',
      trend: 'down'
    },
    {
      icon: Users,
      number: '3x',
      suffix: '',
      label: 'Faster Order Processing',
      description: 'Kitchen throughput improvements with digital order management and prioritization',
      trend: 'up'
    }
  ];

  return (
    <section className="py-24 bg-background-surface">
      <div className="max-container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-h1 font-bold text-text-primary mb-6">
            Proven Results for Restaurant Operators
          </h2>
          <p className="text-large text-text-secondary max-w-3xl mx-auto">
            Our customers see measurable improvements in efficiency, revenue, and profitability 
            within the first 30 days of implementation.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="text-center p-8 bg-background-page rounded-lg shadow-sm hover:shadow-card transition-all duration-250 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-250">
                  <IconComponent className="w-8 h-8 text-primary-500 group-hover:text-white" />
                </div>

                {/* Large Number */}
                <div className="mb-4">
                  <span className="text-hero font-bold text-primary-500">
                    {benefit.number}
                  </span>
                  <span className="text-h2 font-semibold text-text-primary ml-2">
                    {benefit.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-h3 font-semibold text-text-primary mb-3">
                  {benefit.label}
                </h3>

                {/* Description */}
                <p className="text-small text-text-secondary leading-relaxed">
                  {benefit.description}
                </p>

                {/* Trend Indicator */}
                <div className="mt-4 flex items-center justify-center space-x-1">
                  {benefit.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-semantic-success" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-semantic-success" />
                  )}
                  <span className="text-small font-medium text-semantic-success">
                    {benefit.trend === 'up' ? 'Improvement' : 'Savings'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Context */}
        <div className="bg-gradient-to-r from-primary-50 to-background-page rounded-lg p-8 text-center">
          <h3 className="text-h2 font-semibold text-text-primary mb-4">
            Growing Market Opportunity
          </h3>
          <p className="text-large text-text-secondary mb-6 max-w-4xl mx-auto">
            India's restaurant POS market is expanding rapidly, driven by digitization and modern ordering trends. 
            The restaurant POS terminal industry is growing at a significant rate, reflecting sustained investment 
            in digital ordering and real-time operations.
          </p>
          
          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-h2 font-bold text-primary-500 mb-2">$536M</div>
              <div className="text-body text-text-secondary">Market Size 2024</div>
            </div>
            <div>
              <div className="text-h2 font-bold text-primary-500 mb-2">$1.36B</div>
              <div className="text-body text-text-secondary">Projected 2033</div>
            </div>
            <div>
              <div className="text-h2 font-bold text-primary-500 mb-2">10.4%</div>
              <div className="text-body text-text-secondary">CAGR Growth</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
