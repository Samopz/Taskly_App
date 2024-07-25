import express from "express";
import * as ReportController from "../controllers/reportController.js";

const router = express.Router();

// Define routes for reports
router.get("/getBy/:status", ReportController.getReportByStatus);
router.get(
  "/getBy/completion-time",
  ReportController.getReportByCompletionTime
);

export default router;
