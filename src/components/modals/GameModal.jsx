import React, { useState } from 'react';

const GameModal = ({ game, closeGameModal, addToCart, showSuccess, showError }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedBattlePass, setSelectedBattlePass] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gameId, setGameId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState('packages');

  const hasPackages = game.packages && game.packages.length > 0;

  const calculateTotalPrice = () => {
    if (!hasPackages) return game.price;
    
    const packagePrice = selectedPackage ? parseFloat(selectedPackage.price) : 0;
    const battlePassPrice = selectedBattlePass ? parseFloat(game.battlePass.price) : 0;
    return (packagePrice + battlePassPrice).toFixed(2);
  };

  const handleAddToCart = () => {
    if (hasPackages) {
      if (!selectedPackage && !selectedBattlePass) {
        showError('Please select at least one package or Battle Pass');
        return;
      }
      if (!loginMethod || !email || !password || !gameId) {
        showError('Please fill in all login details');
        return;
      }
    }

    const cartItem = {
      ...game,
      selectedPackage,
      selectedBattlePass: selectedBattlePass ? game.battlePass : null,
      loginDetails: hasPackages ? { loginMethod, email, gameId } : null,
      password: password,
      price: calculateTotalPrice(),
    };

    addToCart(cartItem, 1);
    showSuccess('Item added to cart successfully!');
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
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
        <div className="bg-white rounded-2xl md:rounded-3xl max-w-lg w-full mx-4">
          {showSuccessModal ? (
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0L17 13" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
              <p className="text-gray-600">{game.title} has been added to your cart.</p>
              <p className="text-gray-600">Please checkout with additional details.</p>
            </div>
          ) : (
            <>
              <div className="relative">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-40 md:h-48 object-cover rounded-t-2xl md:rounded-t-3xl"
                />
                <button
                  onClick={closeGameModal}
                  className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{game.title}</h2>
                <div className="text-center mb-6">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">৳{game.price}</span>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
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
      <div className="bg-white rounded-2xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
        {showSuccessModal ? (
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Item added to cart!</h3>
            <p className="text-gray-600">Please checkout with additional details.</p>
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
                            <span>৳{calculateTotalPrice()}</span>
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

export default GameModal;
