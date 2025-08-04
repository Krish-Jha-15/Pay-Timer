import jwt from "jsonwebtoken";
import asyncHandler from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../model/user.model.js";

const verifyjwt = asyncHandler(async (req, _, next) => {
  
  const bearerToken = req.header("Authorization");

  const token =
    req.cookies?.accessToken || 
    (bearerToken && bearerToken.startsWith("Bearer ")
      ? bearerToken.replace("Bearer ", "") 
      : null);

  if (!token) {
    console.log("❌ No token provided"); 
    throw new ApiError(401, "Unauthorized user, token not found");
  }

  
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log("✅ Decoded token:", decodedToken); 

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    console.log("❌ No user found for _id:", decodedToken?._id); 
    throw new ApiError(401, "Unauthorized user, invalid token");
  }

  console.log("✅ Authenticated user:", user.email); 
  req.user = user;

  next();
});


export { verifyjwt };
