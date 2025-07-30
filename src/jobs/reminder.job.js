import cron from "node-cron";
import { ApiError } from "../utiles/ApiError.js";
import { Payment } from "../model/payment.model.js";
import { sendMail } from "../jobs/email.job.js";

cron.schedule("0 8 * * *", async () => {
  console.log(" Running payment reminder cron...");

  try {
    const presentDate = new Date();
    const payments = await Payment.find({ status: "PENDING" }).populate("owner");

    if (payments && payments.length > 0) {

      for (const payment of payments) 
        {
        const deadline = new Date(payment.deadline);
        const timeDiff = deadline - presentDate;
        const timeLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        let subject = "";
        let html = "";

        if (timeLeft === 2) {
          subject = `⏳ Reminder: Your payment "${payment.title}" is due in 2 days!`;
        } else if (timeLeft === 1) {
          subject = `⏳ Reminder: Your payment "${payment.title}" is due tomorrow!`;
        } else if (timeLeft < 0) {

          payment.status="OVERDUE";
          await payment.save()
          console.log("status has Been Updated From PENDING -> OVERDUE")
          subject = `⚠️ Overdue: "${payment.title}" was due on ${deadline.toDateString()}`;
        }

        if (subject !== "") {
          html = `
            <h3>Payment Reminder</h3>
            <p><strong>Name:</strong> ${payment.title}</p>
            <p><strong>Amount:</strong> ₹${payment.amount}</p>
            <p><strong>Deadline:</strong> ${deadline.toDateString()}</p>
            <p><strong>Status:</strong> ${payment.status}</p>
          `;

          await sendMail(payment.owner.email, subject, html);
          console.log(` Email sent to ${payment.owner.email}`);
        }
      }
    } else {
      console.log(" No pending payments found.");
    }
  } catch (error) {
    console.error(" Cron job error:", error);
    throw new ApiError(500,"Cron job is not Working")
  }
});
