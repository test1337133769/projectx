// Email service function
export const sendOrderConfirmation = async (orderData) => {
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
