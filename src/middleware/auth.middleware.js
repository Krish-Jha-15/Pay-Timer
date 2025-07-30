import jwt from "jsonwebtoken";
import asyncHandler from "../utiles/AsyncHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { User } from "../model/user.model.js";

const verifyjwt = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized user, token not found");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized user, invalid token");
  }

  req.user = user;
  next();
});

export { verifyjwt };
