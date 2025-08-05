import React from 'react';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight leading-tight">
          Game credits.
          <br />
          <span className="text-blue-600">Reimagined.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
          The most advanced gaming marketplace. Built for gamers who demand the best experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 mb-12 md:mb-16 px-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all hover:shadow-lg w-full sm:w-auto">
            Explore Games
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-base md:text-lg flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto">
            <span>Browse Packages</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center px-4">
          <div className="space-y-2">
            <div className="text-2xl md:text-4xl font-bold text-gray-900">10+</div>
            <div className="text-sm md:text-base text-gray-600">Payment methods</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-4xl font-bold text-gray-900">24/7</div>
            <div className="text-sm md:text-base text-gray-600">Instant delivery</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl md:text-4xl font-bold text-gray-900">500+</div>
            <div className="text-sm md:text-base text-gray-600">Happy gamers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
