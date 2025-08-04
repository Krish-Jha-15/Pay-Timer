import jwt from "jsonwebtoken";
import asyncHandler from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../model/user.model.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        console.error("❌ [JWT Middleware] No token provided. Authorization header or cookie missing.");
        throw new ApiError(401, "Unauthorized user, token not found");
    }

    console.log("✅ [JWT Middleware] Token found, verifying...", token);
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ [JWT Middleware] Decoded token:", decodedToken);
    } catch (error) {
        console.error("❌ [JWT Middleware] JWT verification failed:", error.message);
        throw new ApiError(401, "Invalid or expired token");
    }
    
    if (!decodedToken?._id) {
        console.error("❌ [JWT Middleware] Decoded token is missing a user ID.");
        throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(decodedToken._id).select("-password");
    
    if (!user) {
        console.error(`❌ [JWT Middleware] User not found for ID: ${decodedToken._id}.`);
        throw new ApiError(401, "Unauthorized user, user from token not found");
    }

    console.log(`✅ [JWT Middleware] Authenticated user: ${user.email}`);
    req.user = user;

    next();
});

export { verifyjwt };
