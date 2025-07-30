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
    
    const subject="Your Otp Code"
    const http=`<h2>OTP Verification</h2>
                <p>Your OTP is: <strong>${otp}</strong></p>
                <p>It expires in 2 minutes.</p>`;
                console.log("OTP:", otp);
    await sendMail(email,subject,http)
    return res.status(200)
               .json(
                new ApiResponse(200,otp,"Otp Send Successfully")
               ) 
})

export {sendotp}