import { verifyjwt } from "../middleware/auth.middleware.js";
import { Router } from "express";
import { 
    deleterequest, 
    getMyPayments, 
    getpaymentbyid, 
    NewPaymentRequest, 
    updaterequest 
} from "../controller/payment.controller.js";

const router = Router();

// This is the intermediate middleware we added to check req.user


router.post("/createpayment", verifyjwt, NewPaymentRequest);
router.patch("/update/:paymentId", verifyjwt, updaterequest);
router.get("/delete/:paymentId", verifyjwt, deleterequest);

// Note the `logUser` middleware inserted here
router.get("/getmypayment", verifyjwt, getMyPayments);

router.get("/getpaymentbyid/:id", verifyjwt, getpaymentbyid);

export default router;
