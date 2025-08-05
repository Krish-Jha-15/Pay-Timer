import React, { useState } from "react";
import axiosInstanc from "../api/Axios";
import { useNavigate } from "react-router-dom";
function Login() {

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleOtpRequest = async () => {
    try {
      await axiosInstanc.post("/users/sendotp", { email });
      setStep(2);
      setMessage("OTP sent to your email.");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Error sending OTP");
    }
  };

  const handleLogin = async () => {
    try {
      const joinedOtp = otp.join("");
      const res = await axiosInstanc.post("/users/login", { email, otp: joinedOtp });

    
      console.log("Logged in", res.data);
      setMessage("User Login Successfully");
       navigate("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Login failed");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-slate-300 font-[Inter]">
      <div className="w-full max-w-md p-6 bg-slate-800 rounded-xl shadow-xl text-center">
        <h2 className="text-cyan-400 text-2xl font-semibold mb-5">Login</h2>
       <p className="mt-4 text-sm text-slate-300 text-center">
          Already have an account?{" "}
          <a href="/signup" className="text-cyan-400 hover:underline">
            signup
          </a>
        </p>
        <div className="mb-5 text-left">
          <label htmlFor="email" className="block text-slate-400 text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            disabled={step === 2}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {step === 1 ? (
          <button
            onClick={handleOtpRequest}
            className="w-full py-3 bg-cyan-400 text-slate-900 font-semibold text-base rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
          >
            Get OTP
          </button>
        ) : (
          <>
            <label className="block text-left text-slate-400 text-sm mb-2">OTP</label>
            <div className="flex justify-between gap-2 mb-5">
              {otp.map((digit, index) => (
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
              onClick={handleLogin}
              className="w-full py-3 bg-cyan-400 text-slate-900 font-semibold text-base rounded-md hover:bg-cyan-500 hover:text-white transition duration-300"
            >
              Login
            </button>
          </>
        )}

        {message && <p className="mt-4 text-sm text-yellow-300">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
