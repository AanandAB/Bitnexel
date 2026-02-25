import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-neutral-900 text-neutral-200">
      <div className="max-container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <img src="/images/bitnexel-logo.png" alt="Bitnexel" className="h-8 w-auto" />
                <div className="text-h3 font-bold text-white">Bitnexel</div>
              </div>
              <p className="text-body leading-relaxed mb-6">
                Empowering restaurants across India with intelligent POS solutions. 
                CafePOSPro combines cutting-edge technology with local requirements 
                to help restaurants streamline operations and grow revenue.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-body">+91 7034026295</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-body">aanandab44@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-body">Kochi, Kerala</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <div className="text-body font-medium text-white mb-3">Follow Us</div>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-body hover:text-primary-400 transition-colors duration-200"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="text-body hover:text-primary-400 transition-colors duration-200"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-body hover:text-primary-400 transition-colors duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-h3 font-semibold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Training Videos
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="text-body hover:text-primary-400 transition-colors duration-200">
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-neutral-800 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-h3 font-semibold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-body">
                Get the latest updates on restaurant technology and industry insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md text-body text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none"
              />
              <button className="bg-primary-500 text-white px-6 py-3 rounded-md font-semibold text-body hover:bg-primary-600 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-caption text-neutral-400">
              © {currentYear} Bitnexel. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <a href="#" className="text-caption text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-caption text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-caption text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="text-caption text-neutral-400 hover:text-primary-400 transition-colors duration-200">
                GDPR Compliance
              </a>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
