import Task from "../models/taskModel.js";

const generateReportByStatus = async (status) => {
  const tasks = await Task.find({ status });
  return tasks;
};

const generateReportByCompletionTime = async (startTime, endTime) => {
  const tasks = await Task.find({
    status: "completed",
    completionTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
  });
  return tasks;
};

export { generateReportByStatus, generateReportByCompletionTime };
