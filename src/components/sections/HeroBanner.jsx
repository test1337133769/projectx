import React from 'react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
          Game credits.
          <br />
          <span className="text-blue-600">Reimagined.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          The most advanced gaming marketplace. Built for gamers who demand the best experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-lg">
            Explore Games
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg flex items-center space-x-2 transition-colors">
            <span>Browse Packages</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-gray-900">10+</div>
            <div className="text-gray-600">Payment methods</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-gray-900">24/7</div>
            <div className="text-gray-600">Instant delivery</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-gray-900">500+</div>
            <div className="text-gray-600">Happy gamers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
