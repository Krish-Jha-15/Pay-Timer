import dotenv from 'dotenv';
dotenv.config();

import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
async function sendOTP(toPhoneNumber) {
  const otp = generateOTP();

  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: toPhoneNumber,
    });

    console.log(`OTP sent: ${otp} (SID: ${message.sid})`);
  } catch (error) {
    console.error('Error sending OTP:', error.message);
  }
}


sendOTP('+919016109413'); 
