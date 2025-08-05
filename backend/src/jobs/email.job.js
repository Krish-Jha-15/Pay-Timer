import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
    console.log(process.env.USERMAIL)
    console.log(process.env.EMAILPASS)

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,            
  secure: true,
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.EMAILPASS
  }
   
});

async function sendMail(to, subject, htmlMessage) {
  try {
    const info = await transporter.sendMail({
      from: `"Pay-Timer" <${process.env.USERMAIL}>`,
      to: to,
      subject: subject,
      html: htmlMessage,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
}


export {sendMail}
