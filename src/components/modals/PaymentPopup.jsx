import React, { useState } from 'react';
import { BkashLogo, NogodLogo, RocketLogo } from '../ui/PaymentLogos';

const PaymentPopup = ({ total, orderData, onClose, showSuccess, showError }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [step, setStep] = useState('select'); // 'select' or 'submit'

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
      showError('Please enter the transaction ID');
      return;
    }

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

      showSuccess('Payment submitted successfully!');
      onClose();
    } catch (error) {
      showError(`Payment processing failed: ${error.message}. Please try again or contact support.`);
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
                      {method.logo}
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
                  <div className="w-10 h-10">
                    {selectedMethod.logo}
                  </div>
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

export default PaymentPopup;
