import express from "express";
import * as ReportController from "../controllers/reportController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes for reports
router.get("/getBy/:status", authMiddleware, ReportController.getReportByStatus);
router.get(
  "/getBy/completion-time",
  ReportController.getReportByCompletionTime
);

export default router;
