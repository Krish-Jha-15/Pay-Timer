import express from "express";
import{runReminderJob} from"../jobs/reminder.job.js";
import {ApiResponse, } from"../utiles/ApiResponse.js"
const router = express.Router();

router.get("/reminders", async (req, res) => {
  try {
    await runReminderJob(); 
    res.status(200).json(new ApiResponse(200, null, "Reminders cron job started successfully"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
