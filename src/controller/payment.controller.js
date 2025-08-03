import { Payment } from "../model/payment.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utiles/ApiError.js";
import { ApiResponse } from "../utiles/ApiResponse.js";
import asyncHandler from "../utiles/AsyncHandler.js";

const NewPaymentRequest = asyncHandler(async (req, res) => {
  const { title, description, amount, category, deadline, status } = req.body;

  if (!title || !description || !amount || !category || !deadline || !status) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }

  
  const payment = await Payment.create({
    owner: req.user._id,
    title,
    description,
    amount,
    category,
    deadline,
    status,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, payment, "Payment request created successfully"));
});

const updaterequest = asyncHandler(async (req, res) => {
  const { title, description, amount, category, deadline, status } = req.body;
  const { paymentId } = req.params;

  if (!(title || description || amount || category || deadline || status)) {
    throw new ApiError(400, "At least one field must be provided to update");
  }

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new ApiError(404, "No payment request found");
  }

  if (payment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to modify this payment");
  }

  if (title) payment.title = title;
  if (deadline) payment.deadline = deadline;
  if (description) payment.description = description;
  if (amount) payment.amount = amount;
  if (category) payment.category = category;
  if (status) payment.status = status;

  await payment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, payment, "Payment request updated successfully"));
});

const deleterequest = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  if (!paymentId) {
    throw new ApiError(400, "Payment ID is required");
  }

  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new ApiError(404, "Payment not found");
  }

  if (payment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this payment");
  }

  await payment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Payment deleted successfully"));
});

const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ owner: req.user._id });
  if (!payments || payments.length === 0) {
    throw new ApiError(404, "No payment requests found");
  }
  res.status(200).json(new ApiResponse(200, payments, "Your payment requests"));
});

const getpaymentbyid = asyncHandler(async (req, res) => {
  const {id}=req.params
  const payments = await Payment.findById(id);
  if (!payments) {
  
    throw new ApiError(404, "Payment not found");
  }
  res.status(200).json(new ApiResponse(200, payments, "Your payment requests"));
});

export { NewPaymentRequest, deleterequest, updaterequest ,getMyPayments,getpaymentbyid};
