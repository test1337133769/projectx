import React, { useState } from 'react';
import BillingInfo from '../modals/BillingInfo';

const Cart = ({ 
  cartItems, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  getTotalPrice, 
  setIsCartOpen,
  showSuccess,
  showError
}) => {
  const [showBilling, setShowBilling] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    showSuccess('Order completed successfully!');
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
      onClick={handleBackdropClick}
    >
      <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-3xl">
        {showSuccessModal ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Order Complete!</h3>
              <p className="text-gray-600">Thank you for your purchase.</p>
            </div>
          </div>
        ) : showBilling ? (
          <BillingInfo 
            cartItems={cartItems}
            totalPrice={getTotalPrice}
            onBack={handleBillingBack}
            onComplete={handleOrderComplete}
            showSuccess={showSuccess}
            showError={showError}
          />
        ) : (
          <>
            <div className="p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Shopping Cart</h2>
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
                <div className="flex items-center justify-center h-64 px-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0L17 13" />
                    </svg>
                    <p className="text-gray-500 text-base md:text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-1">Add some games to get started</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 md:space-x-4 bg-gray-50 rounded-xl p-3 md:p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">{item.title}</h3>
                        <p className="text-blue-600 font-semibold text-sm md:text-base">৳{item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="w-6 md:w-8 text-center font-medium text-sm md:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base md:text-lg font-semibold text-gray-700">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">৳{getTotalPrice}</span>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 md:py-3 rounded-xl font-semibold text-sm md:text-base transition-colors"
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

export default Cart;
