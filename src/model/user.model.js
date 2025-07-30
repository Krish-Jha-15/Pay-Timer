import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  payment: [ 
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    }
  ],
  refreshToken: { 
      type: String
    },
}, { timestamps: true });

userSchema.methods.generateAccessToken= function (){
  return jwt.sign({
    _id:this.id,
    email:this.email,
    username:this.username
  },
  process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    },
  )
}
userSchema.methods.generateRefreshToken= function (){
  return jwt.sign({
    _id:this.id,
  },
  process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    },
  )
}
export const User = mongoose.model("User", userSchema);
