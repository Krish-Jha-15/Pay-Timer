import jwt from "jsonwebtoken";
import asyncHandler from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../model/user.model.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        console.error("❌ No token provided. Authorization header or cookie missing.");
        throw new ApiError(401, "Unauthorized user, token not found");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        console.error("❌ JWT verification failed:", error.message);
        throw new ApiError(401, "Invalid or expired token");
    }
    
    if (!decodedToken?._id) {
        console.error("❌ Decoded token is missing a user ID.");
        throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(decodedToken._id).select("-password"); 
    
    if (!user) {
        console.error(`❌ User not found for ID: ${decodedToken._id}.`);
        throw new ApiError(401, "Unauthorized user, user from token not found");
    }

    // Attach the user object to the request
    req.user = user;

    console.log(`✅ User authenticated: ${user.email}`);

    next();
});

export { verifyjwt };