function paymentReminderTemplate(payment) {
  return `
    <h2>🔔 Payment Reminder</h2>
    <p><strong>${payment.paymentName}</strong></p>
    <p>Amount: <b>₹${payment.amount}</b></p>
    <p>Due Date: ${new Date(payment.deadline).toDateString()}</p>
    <p>Status: ${payment.status}</p>
    <p>Click <a href="http://localhost:4600/dashboard">here</a> to manage your payments.</p>
  `;
}
