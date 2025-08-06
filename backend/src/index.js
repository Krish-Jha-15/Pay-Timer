// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import "../src/jobs/reminder.job.js"
import express from "express";
import ConnectedDB from "./db/index.js";
 import { app } from "./app.js"; 
import "./jobs/reminder.job.js"
ConnectedDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error(" Mongoose DB connection failed:", error);
    });