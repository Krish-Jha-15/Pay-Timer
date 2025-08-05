import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstanc from "../api/Axios";

function EditPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPayment = async () => {
    try {
      const res = await axiosInstanc.get("/payments/getpaymentbyid/"+id, {
        withCredentials: true,
      });
      setPayment(res.data.data); 
    } catch (err) {
      setError("Failed to load payment");
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  const handleSave = async () => {
    try {
      const paymentId=id
      await axiosInstanc.patch(
       `/payments/update/${paymentId}`,
        {
          title: payment.title,
          amount: payment.amount,
          description: payment.description,
          deadline:payment.deadline,
          status:payment.status
        },
        { withCredentials: true }
      );
      navigate("/dashboard"); 
    } catch (err) {
      setError("Failed to update payment");
    }
  };

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  if (!payment) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white">
      <h2 className="text-2xl mb-4 text-cyan-400">Edit Payment</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 bg-slate-800 p-6 rounded-lg shadow-lg max-w-md">
        <label className="block">
          Title:
          <input
            className="w-full p-2 mt-1 rounded bg-slate-700 text-white"
            name="title"
            value={payment.title}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Description:
          <input
            className="w-full p-2 mt-1 rounded bg-slate-700 text-white"
            name="description"
            value={payment.description}
            onChange={handleChange}
          />
        </label>

        <label className="block">
          Amount:
          <input
            className="w-full p-2 mt-1 rounded bg-slate-700 text-white"
            name="amount"
            type="number"
            value={payment.amount}
            onChange={handleChange}
          />
        </label>
        <label className="block">
          Due
          <input
            className="w-full p-2 mt-1 rounded bg-slate-700 text-white"
            name="deadline"
            type="date"
            value={payment.deadline}
            onChange={handleChange}
          />
        </label>
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
        <button
          onClick={handleSave}
          className="mt-4 bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditPayment;
