import * as ReportService from "../services/reportService.js";

const getReportByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const tasks = await ReportService.generateReportByStatus(status);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReportByCompletionTime = async (req, res) => {
  try {
    const { startTime, endTime } = req.query;
    const tasks = await ReportService.generateReportByCompletionTime(
      startTime,
      endTime
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getReportByStatus, getReportByCompletionTime };
