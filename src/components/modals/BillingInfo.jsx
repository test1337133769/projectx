import React, { useState } from 'react';
import PaymentPopup from '../modals/PaymentPopup';
import { sendOrderConfirmation } from '../../services/emailService';

const BillingInfo = ({ cartItems, onBack, onComplete }) => {
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

export default BillingInfo;
