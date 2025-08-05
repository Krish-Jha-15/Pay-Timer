import { Router } from "express";
import {login, logout, registerUser, RenewrefreshAndAccessToken, UpdateProfile} from "../controller/user.controller.js";
import { sendotp } from "../utiles/otpsender.js";
import {verifyjwt} from "../middleware/auth.middleware.js"
const router = Router();

router.post("/register", registerUser);
router.post("/sendotp", sendotp);
router.post("/login", login);
router.post("/logout", verifyjwt,logout);
router.post("/update-profile", verifyjwt,UpdateProfile);
router.post("/refresh-token", verifyjwt,RenewrefreshAndAccessToken);




export default router;
