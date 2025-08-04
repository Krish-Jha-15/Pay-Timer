
import { verifyjwt } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { deleterequest, getMyPayments, getpaymentbyid, NewPaymentRequest, updaterequest } from "../controller/payment.controller.js";

const router=Router()

router.post("/createpayment",verifyjwt,NewPaymentRequest)
router.patch("/update/:paymentId",verifyjwt,updaterequest)
router.get("/delete/:paymentId",verifyjwt,deleterequest)
router.get("/getmypayment", verifyjwt, (req, res, next) => {
    console.log("=========================================");
    console.log("🔬 In route after verifyjwt, req.user:", req.user);
    console.log("=========================================");
    next();
}, getMyPayments)
router.get("/getpaymentbyid/:id",verifyjwt,getpaymentbyid)




export default router