import React, { useState } from "react";
import axiosInstanc from "../api/Axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  const [user, setUser] = useState({
    username: "",
    email: "",
    DOB: "",
    phoneNumber: "",
    gender: "",
  });

  const getOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstanc.post("/users/sendotp", { email: user.email }, { withCredentials: true });
      setMessage("OTP sent successfully to email.");
      setStep(2); 
      console.log(res);
    } catch (error) {
      setMessage("Error while sending OTP.");
      console.log("Error=>otp", error);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      setMessage("Enter a valid digit");
      return;
    }

    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstanc.post(
        "/users/register",
        {
          username: user.username,
          email: user.email,
          DOB: user.DOB,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          otp: otpDigits.join(""), 
        },
        { withCredentials: true }
      );
      
console.log("Signup response:", res);

      navigate("/dashboard");
    
    } catch (error) { 
      setMessage("Error while registering user.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-blue-900 text-white px-4">
      <form
        className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl"
        onSubmit={step === 1 ? getOtp : handleSignup} 
      >
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Create Your Account</h2>
        {message && <h3 className="text-yellow-400 mb-4">{message}</h3>}

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-sm text-slate-200">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm text-slate-200">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="DOB" className="block mb-1 text-sm text-slate-200">
            Date of Birth
          </label>
          <input
            name="DOB"
            type="date"
            id="DOB"
            value={user.DOB}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1 text-sm text-slate-200">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="number"
            value={user.phoneNumber}
            onChange={handleChange}
            id="phoneNumber"
            placeholder="Enter your number"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="gender" className="block mb-1 text-sm text-slate-200">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {step === 1 ? (
          
          <button
            type="submit"
            className="w-full py-3 bg-cyan-400 text-slate-900 font-semibold text-base rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
          >
            Get OTP
          </button>
        ) : (
          <>
            <label className="block text-left text-slate-400 text-sm mb-2">OTP</label>
            <div className="flex justify-between gap-2 mb-5">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  type="text"
                  maxLength="1"
                  className="w-10 h-12 text-center text-xl rounded-md bg-slate-700 text-white focus:bg-slate-600 focus:ring-2 focus:ring-cyan-400 outline-none"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-cyan-400 text-slate-900 font-semibold text-base rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
            >
              Sign Up
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Signup;
