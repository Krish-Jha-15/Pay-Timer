import React, { useEffect, useState } from "react";
import axiosInstanc from "../api/Axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate()
  const getallrequest = async () => {
    try {
      const res = await axiosInstanc("/payments/getmypayment",{withCredentials: true});
      console.log("Payments response:", res);
      setPayments(res.data.data)
    } catch (error) {
      setError("Failed Fetching Payments")
    }
  }

  const handldedit=async(id)=>{
      navigate(`/edit/${id}`)
  }

 const deletepayment = async (id) => {
  try {
    await axiosInstanc.get("/payments/delete/" + id, { withCredentials: true });

    setPayments((prev) => prev.filter((payment) => payment._id !== id));
  } catch (error) {
    setError("Could not delete payment.");
  }
};


  useEffect(() => {
    getallrequest()
  }, [])


  const create = async() => {
    navigate('/create')
  }
  
  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
<div className="flex justify-center mb-6 mt-16">
  <button
    onClick={create}
    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
  >
    Create
  </button>
</div>

      <h2 className="text-3xl font-semibold mb-4 text-cyan-400">Your Payments</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {payments.length === 0 ? (
          <p>No payments found</p>
        ) : (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-slate-800 p-4 rounded-xl shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold text-cyan-300">{payment.title}</h3>
                <p>{payment.description}</p>
                <p className="text-sm text-slate-400">Due: {new Date(payment.deadline).toLocaleDateString()}</p>
                <p className="text-sm text-yellow-300">Status: {payment.status}</p>
              </div>
              <div className="flex justify-evenly p-2">
                <div className="p-2 hover:cursor-pointer hover:bg-slate-700 rounded-lg">
                  <button onClick={() => handldedit(payment._id)}>✏️</button>
                </div>
                <div className="p-2 hover:cursor-pointer hover:bg-slate-700 rounded-lg">
                  <button onClick={() => deletepayment(payment._id)}>⛔</button>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">₹{payment.amount}</p>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard;
