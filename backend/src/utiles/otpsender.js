import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";
import { sendMail } from "../jobs/email.job.js";
import {otpstore} from "./tempotp.js"
import asyncHandler from "./AsyncHandler.js";

const sendotp= asyncHandler(async(req,res)=>{
    const {email} = req.body
    if(!email)
    {
        throw new ApiError(400,"Email Is Requied")
    }
    const otp=Math.floor(100000 + Math.random()*900000).toString();
    const expiry=Date.now()+1000*60*2
console.log("otpstore contents2:", otpstore);

    otpstore[email] = { otp, expiry };
    
   const subject = "Your OTP Code for Verification";
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h2 style="color: #333;">OTP Verification</h2>
            <p>Your one-time password (OTP) is:</p>
            <p style="font-size: 24px; font-weight: bold; color: #2c3e50;">${otp}</p>
            <p>This OTP is valid for <strong>2 minutes</strong>.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <br/>
            <p style="font-size: 12px; color: #999;">— Pay-Timer Team</p>
        </div>
    `;
    await sendMail(email,subject,html)
    return res.status(200)
               .json(
                new ApiResponse(200,otp,"Otp Send Successfully")
               ) 
})

export {sendotp}