import asyncHandler from "../utiles/AsyncHandler.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import { otpstore } from "../utiles/tempotp.js";
import dns from "dns/promises"
import jwt from "jsonwebtoken";

const IsemailValid= (email)=>{
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const IsemailValidDomin=async(email)=>{
  const domin=email.split('@')[1]
  try {
    const record=await dns.resolveMx(domin)
    return record &&  record.length>0
  } catch (error) {
    return error
  }
}

const generateAccessandRefreshToken= async(userId)=>{
  try {
    const user= await User.findById(userId)
    const accessToken= user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()

    user.refreshToken=refreshToken
    await user.save()

    return {accessToken,refreshToken}

  } catch (error) {
    throw new ApiError(500,"Something Went Worny While Generating Access And Refresh Token ")
  }
}

 const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, DOB, gender, otp } = req.body;

  if (!username || !email || !phoneNumber || !DOB || !gender ) {
    throw new ApiError(400, "All fields are required");
  }

  if(!IsemailValid(email) ||  ! await IsemailValidDomin(email))
  {
    throw new ApiError(400,"Enter Valid Email")
  }

  const storedOtp = otpstore[email];

   if (!storedOtp || storedOtp.otp !== otp) {
     throw new ApiError(401, "Invalid OTP");
   }

   if (storedOtp.expiry < Date.now()) {
      delete otpstore[email];
     throw new ApiError(401, "OTP expired");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }, { phoneNumber }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }


  const user = await User.create({
    username,
    email,
    phoneNumber,
    DOB,
    gender,
  });

  const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)

const  option={
    httpOnly:true,
    secure:true
  }


  delete otpstore[email]; 
  
  return res
    .status(201)
    .cookie("accessToken",accessToken,option)
            .cookie("refreshToken",refreshToken,option)
    .json(new ApiResponse(201,  {
                  user,
                  accessToken,
                  refreshToken,
                }, "User registered successfully"));
});

const login=asyncHandler(async(req,res)=>{
  const{email,otp}=req.body
  if (!email || !otp) {
    throw new ApiError(400,"All Feild Are Requied ")
  }
 if(!IsemailValid(email) || ! await IsemailValidDomin(email))
  {
    throw new ApiError(400,"Enter Valid Email")
  }

  const storedOtp = otpstore[email];

  if (!storedOtp || storedOtp.otp !== otp) {
    throw new ApiError(401, "Invalid OTP");
  }

  if (storedOtp.expiry < Date.now()) {
    delete otpstore[email];
    throw new ApiError(401, "OTP expired");
  }

  const user=await User.findOne({email})
  if(!user)
  {
    throw new ApiError(404,"User Not Found")
  }

  const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)

  
  const option={
    httpOnly:true,
    secure:true
  }

 delete otpstore[email]; 
 
 return res.status(200)
            .cookie("accessToken",accessToken,option)
            .cookie("refreshToken",refreshToken,option)

            .json(
              new ApiResponse(200,
                {
                  user,
                  accessToken,
                  refreshToken,
                },
                "User Successfully LoggedIn"
              )
            )

})

const logout=asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset:{
        refreshToken:1,
      }
    },{
      new:true
    }
   )

   const option={
      secure:true,
      httpOnly:true
   }

    return res.status(200)
            .clearCookie("accessToken",option)
            .clearCookie("refreshToken",option)

            .json(
              new ApiResponse(200,
                {},
                "User Successfully Logged Out"
              )
            )

})

const UpdateProfile=asyncHandler(async(req,res)=>{
  const {username,DOB,gender,phoneNumber}=req.body
  if(!(username || DOB || gender || phoneNumber))
  {
    throw new ApiError(402,"No Change In Profile")
  }

  const user= await User.findById(req.user._id)
  
  if(username)  user.username=username
  if(DOB)  user.DOB=DOB
  if(phoneNumber)  user.phoneNumber=phoneNumber
  if(gender)  user.gender=gender

  await user.save()

  res.status(200)
     .json(
      new ApiResponse(200,user,"User Profile Is Been Successfully Updated ")
     ) 


})

const RenewrefreshAndAccessToken=asyncHandler(async(req,res)=>{
  const currentrefresHToken=req.cookies?.refreshToken || req.body.refreshToken
  if(!currentrefresHToken)
  {
    throw new ApiError(401,"Unauthorized User")
  }

  const decoded=  jwt.verify(
    currentrefresHToken,
    process.env.REFRESH_TOKEN_SECRET
  )
  
  const user= await User.findById(decoded._id)
  if (!user) {
    throw new ApiError(401,"Invalid Refresh Token")
  }

if (user.refreshToken !== currentrefresHToken) {
    throw new ApiError(401,"Refresh Token Is Expired")
}

  const{accessToken,refreshToken}= await generateAccessandRefreshToken(user._id)

  const option ={
    httpOnly:true,
    secure:true
  }

  return res.status(200)
            .cookie("accessToken",accessToken,option)
            .cookie("refreshToken",refreshToken,option)
            .json(
              new ApiResponse(200,{
                user,
                refreshToken,
                accessToken
              },"Refresh & Refresh Token Is Refreshed ")
            )

})

export {
  registerUser,
  login,
  logout,
  UpdateProfile,
  RenewrefreshAndAccessToken
}