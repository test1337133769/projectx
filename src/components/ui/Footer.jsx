import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Gaming</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Mobile Games</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Services</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Gift Cards</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Subscriptions</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
{/*         
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-2xl font-semibold text-gray-900">
              Arcade
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm">
            <p>Copyright © 2025 Arcade Inc. All rights reserved.</p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
