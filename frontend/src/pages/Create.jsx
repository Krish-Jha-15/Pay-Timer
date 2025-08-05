import React, { useState } from "react";
import axiosInstanc from "../api/Axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
    status: "",
    deadline: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const createNewpayment = async (e) => {
    e.preventDefault();
    try {
      await axiosInstanc.post(
        "/payments/createpayment",
        {
          title: payment.title,
          description: payment.description,
          amount: payment.amount,
          category: payment.category,
          deadline: payment.deadline,
          status: payment.status,
        },
        { withCredentials: true }
      );
      setMessage("Payment successfully created!");
      setError("");

      navigate("/dashboard");
    } catch (err) {
      setError("Error: Payment could not be created.");
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-blue-900 text-white px-4">
      <form
        onSubmit={createNewpayment}
        className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Create Payment</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 text-sm text-slate-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={payment.title}
            onChange={handleChange}
            placeholder="Enter Title"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 text-sm text-slate-200">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={payment.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block mb-1 text-sm text-slate-200">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1 text-sm text-slate-200">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={payment.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          >
            <option value="">Select</option>
            <option value="bills">Bills</option>
            <option value="subscription">Subscription</option>
            <option value="loan">Loan</option>
            <option value="tax">Tax</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-1 text-sm text-slate-200">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={payment.status}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          >
            <option value="">Select</option>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="OVERDUE">OVERDUE</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="deadline" className="block mb-1 text-sm text-slate-200">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={payment.deadline}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 text-white"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-400 text-sm mb-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-400 text-slate-900 font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Create;
