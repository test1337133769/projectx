import React, { useState } from 'react';
import { useCart } from './App';

// Header Component - Apple Style
export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { getTotalItems, setIsCartOpen } = useCart();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-semibold text-gray-900 tracking-tight">
              Arcade
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Popular Games</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Gift Cards</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Subscriptions</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Support</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 bg-gray-100 border-0 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0L17 13" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Game Card Component - Apple Style
export const GameCard = ({ game, featured = false }) => {
  const { openGameModal } = useCart();
  
  return (
    <div className={`bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}
      onClick={() => openGameModal(game)}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-square'}`}
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {game.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-xl ${
            game.badge === 'SALE' ? 'bg-red-500/90 text-white' : 
            game.badge === 'OUT OF STOCK' ? 'bg-gray-500/90 text-white' : 
            'bg-blue-500/90 text-white'
          }`}
          >
            {game.badge}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
          {game.title}
        </h3>
        {featured && game.price && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {game.originalPrice && (
                <span className="text-gray-400 line-through text-sm">৳{game.originalPrice}</span>
              )}
              <span className="text-2xl font-semibold text-gray-900">৳{game.price}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openGameModal(game);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Hero Banner Component - Apple Style
export const HeroBanner = () => {
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

// Section Component - Apple Style
export const Section = ({ title, description, children, className = "", featured = false }) => {
  return (
    <div className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{title}</h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">{description}</p>
          )}
        </div>
        <div className={`grid gap-8 ${featured ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Feature Section Component - Apple Style
export const FeatureSection = () => {
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

// Stats Component - Apple Style
export const Stats = () => {
  return (
    <div className="bg-white py-16 px-6">
    </div>
  );
};

// Load More Button Component - Apple Style
export const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center py-12">
      <button
        onClick={onClick}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
      >
        View more
      </button>
    </div>
  );
};

// Game Modal Component - Enhanced with package selection and login form
export const GameModal = ({ game }) => {
  const { closeGameModal, addToCart } = useCart();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedBattlePass, setSelectedBattlePass] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gameId, setGameId] = useState('');
  const [showBilling, setShowBilling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState('packages');

  const hasPackages = game.packages && game.packages.length > 0;

  const handleBuyNow = () => {
    if (hasPackages) {
      if (!selectedPackage && !selectedBattlePass) {
        alert('Please select at least one package or Battle Pass');
        return;
      }
      if (!loginMethod || !email || !password || !gameId) {
        alert('Please fill in all login details');
        return;
      }
    }
    setShowBilling(true);
  };

  const handleAddToCart = () => {
    if (hasPackages) {
      if (!selectedPackage && !selectedBattlePass) {
        alert('Please select at least one package or Battle Pass');
        return;
      }
      if (!loginMethod || !email || !password || !gameId) {
        alert('Please fill in all login details');
        return;
      }
    }

    const cartItem = {
      ...game,
      selectedPackage,
      selectedBattlePass: selectedBattlePass ? game.battlePass : null,
      loginDetails: hasPackages ? { loginMethod, email, gameId } : null,
      password: password,
      price: hasPackages
        ? ((selectedPackage ? parseFloat(selectedPackage.price) : 0) +
          (selectedBattlePass ? parseFloat(game.battlePass.price) : 0))
        : parseFloat(game.price),
    };

    addToCart(cartItem, 1);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      closeGameModal();
    }, 1500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeGameModal();
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    if (selectedPackage) total += parseFloat(selectedPackage.price);
    if (selectedBattlePass && game.battlePass) total += parseFloat(game.battlePass.price);
    return total;
  };

  if (!hasPackages) {
    // Simple modal for featured games, gift cards, etc.
    return (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-3xl max-w-lg w-full">
          {showSuccess ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
              <p className="text-gray-600">{game.title} has been added to your cart.</p>
            </div>
          ) : (
            <>
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover rounded-t-3xl"
                />
                <button
                  onClick={closeGameModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{game.title}</h2>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">৳{game.price}</span>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Add to Cart - ৳{game.price}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Enhanced modal for games with packages
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
            <p className="text-gray-600">Your {game.title} purchase has been added to cart.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <button
                onClick={closeGameModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">{game.title}</h2>
                <p className="text-white/80 drop-shadow">{game.currency} Packages</p>
              </div>
            </div>
            
            <div className="p-8">
              {/* Step Navigation */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${
                    currentStep === 'packages' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === 'packages' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}>
                      1
                    </div>
                    <span className="font-medium">Select Packages</span>
                  </div>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <div className={`flex items-center space-x-2 ${
                    currentStep === 'login' ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                    }`}>
                      2
                    </div>
                    <span className="font-medium">Login Details</span>
                  </div>
                </div>
              </div>

              {currentStep === 'packages' ? (
                <>
                  {/* Currency Packages */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{game.currency} Packages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {game.packages.map((pkg, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all ${
                            selectedPackage?.amount === pkg.amount
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {pkg.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                POPULAR
                              </span>
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 mb-1">{pkg.amount}</div>
                            <div className="text-2xl font-bold text-blue-600">৳{pkg.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Battle Pass */}
                  {game.battlePass && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Battle Pass</h3>
                      <div 
                        onClick={() => setSelectedBattlePass(!selectedBattlePass)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedBattlePass
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-gray-900">{game.battlePass.name}</div>
                            <div className="text-sm text-gray-600">Premium rewards and exclusive content</div>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">৳{game.battlePass.price}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Button */}
                  <div className="flex justify-between">
                    <div></div>
                    <button
                      onClick={() => setCurrentStep('login')}
                      disabled={!selectedPackage && !selectedBattlePass}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-12 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Login Form */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Account Information</h3>
                    
                    {/* Login Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Login Method</label>
                      <select
                        value={loginMethod}
                        onChange={(e) => setLoginMethod(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select login method</option>
                        {game.loginMethods.map(method => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email/Username</label>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email or username"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                      />
                    </div>

                    {/* Game ID */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">In-Game Name</label>
                      <input
                        type="text"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your in-game Name"
                      />
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        {selectedPackage && (
                          <div className="flex justify-between">
                            <span>{selectedPackage.amount}</span>
                            <span>৳{selectedPackage.price}</span>
                          </div>
                        )}
                        {selectedBattlePass && (
                          <div className="flex justify-between">
                            <span>{game.battlePass.name}</span>
                            <span>৳{game.battlePass.price}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>৳{getTotalPrice()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  
                  <div className="flex justify-between items-center mt-8">
                    <button
                      onClick={() => setCurrentStep('packages')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleAddToCart}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Payment Method Logo Components
const BkashLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#E70063"/>
    <path d="M16 20h8c4 0 8 2 8 6s-2 4-4 4h4c3 0 6 2 6 5s-3 5-6 5H16V20z" fill="white"/>
    <path d="M24 28h-4v4h4c2 0 3-1 3-2s-1-2-3-2z" fill="#E70063"/>
    <path d="M28 36h-8v4h8c2 0 3-1 3-2s-1-2-3-2z" fill="#E70063"/>
    <text x="32" y="48" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">bKash</text>
  </svg>
);

const NogodLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#FF0000"/>
    <circle cx="32" cy="24" r="6" fill="white"/>
    <rect x="24" y="32" width="16" height="4" rx="2" fill="white"/>
    <rect x="20" y="38" width="24" height="4" rx="2" fill="white"/>
    <text x="32" y="52" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">nagad</text>
  </svg>
);

const RocketLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#800880"/>
    <path d="M32 16l8 16-8 4-8-4 8-16z" fill="white"/>
    <circle cx="32" cy="26" r="3" fill="#800880"/>
    <path d="M24 36l4 8 4-2 4 2 4-8-8-4-8 4z" fill="white"/>
    <text x="32" y="52" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">Rocket</text>
  </svg>
);

// Payment Popup Component
const PaymentPopup = ({ total, orderData, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [step, setStep] = useState('select'); // 'select' or 'submit'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payment methods with logos and instructions
  const paymentMethods = [
    {
      name: 'Bkash',
      logo: <BkashLogo />,
      color: '#E70063',
      instructions: '1. Dial *247# on your mobile\n2. Choose "Send Money"\n3. Enter recipient number: 01993221231\n4. Enter amount: ৳' + total + '\n5. Enter your PIN\n6. Copy the transaction ID below'
    },
    {
      name: 'Nogod',
      logo: <NogodLogo />,
      color: '#FF0000',
      instructions: '1. Open Nogod app or dial *167#\n2. Choose "Send Money"\n3. Enter recipient number: 01993221231\n4. Enter amount: ৳' + total + '\n5. Enter your PIN\n6. Copy the transaction ID below'
    },
    {
      name: 'Rocket',
      logo: <RocketLogo />,
      color: '#800880',
      instructions: '1. Dial *322# on your mobile\n2. Choose "Send Money"\n3. Enter recipient number: 01993221231\n4. Enter amount: ৳' + total + '\n5. Enter your PIN\n6. Copy the transaction ID below'
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setStep('submit');
  };

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      alert('Please enter the transaction ID');
      return;
    }

    setIsSubmitting(true);
    try {
      const BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
      const CHAT_ID = process.env.REACT_APP_TELEGRAM_CHAT_ID;

      if (!BOT_TOKEN || !CHAT_ID) {
        throw new Error('Telegram bot token or chat ID not configured');
      }

      // Only send selectedMethod and transactionId to Telegram
      const message = `
*NEW PAYMENT RECEIVED*
━━━━━━━━━━━━━━━━━━━━━━━━
💳 *Transaction Details:*
   └ ID: \`${transactionId.trim()}\`
   └ Method: *${selectedMethod.name}*
━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

      const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      if (!telegramResponse.ok) {
        const errorData = await telegramResponse.json();
        throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
      }

      alert('Payment submitted successfully!');
      onClose();
    } catch (error) {
      alert(`Payment processing failed: ${error.message}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {step === 'select' ? (
          <>
            {/* Payment Method Selection */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Select Payment Method</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-blue-800 font-semibold text-lg">Amount to Pay: ৳{total}</p>
                <p className="text-blue-600 text-sm mt-1">Select your preferred payment method below</p>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    onClick={() => handleMethodSelect(method)}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer transition-all hover:shadow-md group"
                  >
                    <div className="w-16 h-16 mr-4 flex-shrink-0">
                      <img 
                        src={method.logo} 
                        alt={`${method.name} logo`} 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {method.name}
                      </h3>
                      <p className="text-sm text-gray-600">Send money via {method.name}</p>
                    </div>
                    <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Transaction ID Submission */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setStep('select')}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedMethod.logo} 
                    alt={`${selectedMethod.name} logo`} 
                    className="w-10 h-10 object-contain rounded-lg"
                  />
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMethod.name} Payment</h2>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-center">
                <p className="text-blue-800 font-semibold text-lg">Send ৳{total} to: 01993221231</p>
                <p className="text-blue-600 text-sm mt-1">Recipient Number</p>
              </div>

              {/* Payment Instructions */}
              <div 
                className="border-2 rounded-xl p-4 mb-6"
                style={{ borderColor: selectedMethod.color + '40', backgroundColor: selectedMethod.color + '10' }}
              >
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" style={{ color: selectedMethod.color }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Payment Instructions:
                </h3>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedMethod.instructions}
                </div>
              </div>

              {/* Transaction ID Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {selectedMethod.name} Transaction ID *
                  </label>
                  <input 
                    type="text" 
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder={`Enter your ${selectedMethod.name} transaction ID`}
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You'll find this in your {selectedMethod.name} transaction confirmation message
                  </p>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={!transactionId.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                >
                  Submit Payment Details
                </button>
              </div>

              {/* Help Note */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      If you're having trouble finding your transaction ID, please contact our support team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Enhanced Billing Info Component
export const BillingInfo = ({ cartItems, onBack, onComplete }) => {
  const [additionalText, setAdditionalText] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Generate unique order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random.toString().padStart(3, '0')}`;
  };

  const handlePlaceOrder = async () => {
    if (!whatsappNumber || !billingEmail) {
      alert('Please fill in all billing information');
      return;
    }

    setIsProcessing(true);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    // Show payment popup immediately after order is created
    setIsProcessing(false);
    setShowPayment(true);

    // Send order confirmation email in background
    try {
      await sendOrderConfirmation({
        orderId: newOrderId,
        cartItems,
        whatsappNumber,
        billingEmail,
        additionalText,
        total: getTotalPrice()
      });
    } catch (error) {
      console.error('Order confirmation email failed:', error);
      // Don't show error to user as payment popup is already open
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };

  if (orderComplete) {
    return (
      <div className="p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 font-semibold">Order ID: {orderId}</p>
        </div>
        <p className="text-gray-600 mb-4">
          Order confirmation has been sent to <strong>{billingEmail}</strong>
        </p>
        <p className="text-gray-600 mb-8">
          We'll contact you on WhatsApp: <strong>{whatsappNumber}</strong>
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/01993221231?text=Hi, I need support for Order ID: ${orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Support</span>
          </a>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Go Home</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[100vh] overflow-y-auto">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  {item.selectedPackage && (
                    <p className="text-sm text-blue-600">{item.selectedPackage.amount}</p>
                  )}
                  {item.selectedBattlePass && (
                    <p className="text-sm text-purple-600">{item.selectedBattlePass.name}</p>
                  )}
                  {item.loginDetails && (
                    <div className="text-xs text-gray-500 mt-1">
                      <p>Login: {item.loginDetails.loginMethod}</p>
                      <p>Email: {item.loginDetails.email}</p>
                      <p>Password: {item.password}</p>
                      <p>Game ID: {item.loginDetails.gameId}</p>
                    </div>
                  )}
                </div>
                <span className="font-semibold text-gray-900">৳{item.price}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-gray-900">৳{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number *
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="01XXXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="youremail@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Order confirmation will be sent to this email
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Text (Optional)
            </label>
            <textarea
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any additional instructions or information"
              rows="3"
            />
          </div>
        </div>

        {/* Payment Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-yellow-800">Payment Instructions</h4>
              <p className="text-sm text-yellow-700 mt-1">
                After placing your order, our team will contact you on WhatsApp with payment instructions and account delivery details.
              </p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing || !whatsappNumber || !billingEmail}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <span>Place Order - ৳{getTotalPrice()}</span>
          )}
        </button>

        {/* Payment Popup */}
        {showPayment && (
          <PaymentPopup 
            total={getTotalPrice()} 
            onClose={() => setOrderComplete(true)} 
          />
        )}
      </div>
    </div>
  );
};

// Email service function
const sendOrderConfirmation = async (orderData) => {
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; text-align: center; margin-bottom: 30px;">Order Confirmation</h2>
        
        <div style="background-color: #dbeafe; border: 1px solid #93c5fd; border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;">
          <h3 style="color: #1e40af; margin: 0;">Order ID: ${orderData.orderId}</h3>
        </div>
        
        <h3 style="color: #374151; margin-bottom: 15px;">Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Game</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Package</th>
              <th style="padding: 10px; text-align: left; border: 1px solid #d1d5db;">Login Details</th>
              <th style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.cartItems.map(item => `
              <tr>
                <td style="padding: 10px; border: 1px solid #d1d5db;">${item.title}</td>
                <td style="padding: 10px; border: 1px solid #d1d5db;">
                  ${item.selectedPackage ? item.selectedPackage.amount : 'N/A'}
                  ${item.selectedBattlePass ? '<br>' + item.selectedBattlePass.name : ''}
                </td>
                <td style="padding: 10px; border: 1px solid #d1d5db; font-size: 12px;">
                  ${item.loginDetails ? `
                    <strong>Method:</strong> ${item.loginDetails.loginMethod}<br>
                    <strong>Email:</strong> ${item.loginDetails.email}<br>
                    <strong>Password:</strong> ${item.password}<br>
                    <strong>Game ID:</strong> ${item.loginDetails.gameId}
                  ` : 'N/A'}
                </td>
                <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">৳${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <td colspan="2" style="padding: 10px; border: 1px solid #d1d5db;">Total:</td>
              <td style="padding: 10px; text-align: right; border: 1px solid #d1d5db;">৳${orderData.total}</td>
            </tr>
          </tfoot>
        </table>
        
        <h3 style="color: #374151; margin-bottom: 15px;">Contact Information:</h3>
        <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${orderData.whatsappNumber}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${orderData.billingEmail}</p>
        
        <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 20px;">
          <h4 style="color: #92400e; margin: 0 0 10px 0;">Next Steps:</h4>
          <p style="color: #92400e; margin: 0;">Our team will contact you on WhatsApp within 24 hours with payment instructions and account delivery details.</p>
        </div>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="text-align: center; color: #6b7280; font-size: 14px;">Thank you for choosing Arcade Gaming Store!</p>
      </div>
    </div>
  `;

  // Send email via backend
  const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: orderData.billingEmail,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: emailContent,
      orderData: orderData
    })
  });

  if (!response.ok) {
    throw new Error('Failed to send email');
  }

  return response.json();
};

// Cart Component - Updated with billing flow
export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, setIsCartOpen } = useCart();
  const [showBilling, setShowBilling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsCartOpen(false);
    }
  };

  const handleCheckout = () => {
    setShowBilling(true);
  };

  const handleBillingBack = () => {
    setShowBilling(false);
  };

  const handleOrderComplete = () => {
    clearCart();
    setShowBilling(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-3x2">
        {showSuccess ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h3>
              <p className="text-gray-600">Thank you for your purchase.</p>
            </div>
          </div>
        ) : showBilling ? (
          <BillingInfo 
            cartItems={cartItems}
            onBack={handleBillingBack}
            onComplete={handleOrderComplete}
          />
        ) : (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0L17 13" />
                    </svg>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add some games to get started</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-blue-600 font-semibold">৳{item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">৳{getTotalPrice()}</span>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Footer Component - Apple Style
export const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Gaming</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Mobile Games</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">PC Games</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Console Games</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Gaming Accessories</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Services</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Gift Cards</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Subscriptions</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Digital Wallet</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Trade Program</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">Contact Us</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Help Center</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">System Status</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Developer Resources</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Company</h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-gray-900 transition-colors">About Arcade</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Careers</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Press</a>
              <a href="#" className="block hover:text-gray-900 transition-colors">Investors</a>
            </div>
          </div>
        </div>
        
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
        </div>
      </div>
    </footer>
  );
};
