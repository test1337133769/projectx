import React from 'react';

const FeatureSection = () => {
  return (
    <div className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                Your wallet.
                <br />
                <span className="text-blue-600">More powerful</span>
                <br />
                than ever.
              </h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Experience the next generation of digital gaming wallets. Secure, fast, and beautifully simple.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">Instant transactions</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">Bank-level security</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700 font-medium">Multi-platform support</span>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all hover:shadow-lg">
              Learn more
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-50 -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-100 rounded-full opacity-50 translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1618517048485-f125b94309a8"
                  alt="Gaming Wallet"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
