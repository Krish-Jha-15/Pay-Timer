import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
console.log("hello",process.env.CORS_ORIGIN);
app.use(cors({
    origin:"https://pay-timer.netlify.app",
    credentials: true,
}))

app.use(express.json(
    {
        limit:"16kb"
    }
))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser());
app.use(express.static("public"));

import userRouter from "./router/user.router.js"
import PaymentRouter from "./router/payment.router.js"
import Reminder from "./router/reminder.route.js"
app.use("/api/v1/users",userRouter)
app.use("/api/v1/payments",PaymentRouter)
app.use("/api/v1/reminders",Reminder)


export { app };
