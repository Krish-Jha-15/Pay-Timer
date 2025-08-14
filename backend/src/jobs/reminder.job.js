import { ApiError } from "../utiles/ApiError.js";
import { Payment } from "../model/payment.model.js";
import { sendMail } from "../jobs/email.job.js";

export async function runReminderJob() {
  console.log("🕗 Running payment reminder job...");

  try {
    const link = process.env.MAIN_LINK || "https://pay-timer.netlify.app/dashboard";
    const presentDate = new Date();
    const payments = await Payment.find({ status: "PENDING" }).populate("owner");

    console.log(`🔍 Found ${payments.length} pending payments.`);

    if (payments && payments.length > 0) {
      for (const payment of payments) {
        const deadline = new Date(payment.deadline);
        const timeDiff = deadline - presentDate;
        const timeLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let subject = "";
        if (timeLeft === 2) {
          subject = `⏳ Reminder: Your payment "${payment.title}" is due in 2 days!`;
        } else if (timeLeft === 1) {
          subject = `⏳ Reminder: Your payment "${payment.title}" is due tomorrow!`;
        } else if (timeLeft < 0) {
          payment.status = "OVERDUE";
          await payment.save();
          console.log(`⚠️ Updated status to OVERDUE for: ${payment.title}`);
          subject = `⚠️ Overdue: "${payment.title}" was due on ${deadline.toDateString()}`;
        }

        if (subject !== "") {
          const html = `
            <div style="font-family: Arial, sans-serif; padding: 16px; background: #f9f9f9;">
              <h2 style="color: #2c3e50;">💳 Payment Reminder</h2>
              <p>Hello <strong>${payment.owner.username || "User"}</strong>,</p>
              <p>This is a reminder about your pending payment:</p>
              <table style="border-collapse: collapse; width: 100%; margin-top: 12px;">
                <tr><td><strong>Title:</strong></td><td>${payment.title}</td></tr>
                <tr><td><strong>Description:</strong></td><td>${payment.description || "-"}</td></tr>
                <tr><td><strong>Amount:</strong></td><td>₹${payment.amount}</td></tr>
                <tr><td><strong>Deadline:</strong></td><td>${deadline.toDateString()}</td></tr>
                <tr><td><strong>Status:</strong></td><td>${payment.status}</td></tr>
              </table>
              <div style="margin-top: 20px;">
                <a href=${link} style="padding: 10px 20px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Manage Payments</a>
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #777;">If you have already paid, please ignore this message.</p>
              <p style="font-size: 12px; color: #aaa;">— The PayTimer Team</p>
            </div>
          `;
          await sendMail(payment.owner.email, subject, html);
          console.log(`📧 Email sent to ${payment.owner.email}`);
        }
      }
    } else {
      console.log("✅ No pending payments found.");
    }
  } catch (error) {
    console.error("❌ Cron job error:", error);
    throw new ApiError(500, "Cron job is not working");
  }
}
