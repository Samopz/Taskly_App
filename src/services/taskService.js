import Task from "../models/taskModel.js";
import { logger } from "../utils/logger.js";

export async function createTask({
  title,
  description,
  category,
  priority,
  status,
  startDate,
  dueDate,
  comments,
  attachments,
  assignedTo,
  boardId,
}) {
  const task = new Task({
    title,
    description,
    category,
    priority,
    status,
    startDate,
    dueDate,
    comments,
    attachments,
    assignedTo,
    boardId,
  });
  await task.save();
  logger.info("Task created successfully");
  return (task);
}

export async function getAllTasks({ page = 1, limit = 10, state, search }) {
  const skip = (page - 1) * limit;
  let query = {};

  if (state) {
    query.state = state;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { body: { $regex: search, $options: "i" } },
    ];
  }

  const tasks = await Task.find(query).skip(skip).limit(limit); // if 24 items => 3pages => 10 10 4
  logger.info("All Tasks fetched successfully");
  return tasks;
}

export async function getTaskById(id) {
  const task = await Task.findById(id).populate("assignedTo", "name email");
  if (!task) {
    logger.error("Task not found");
    throw new Error("Task not found");
  }

  task.read_count += 1;
  await task.save();

  logger.info("Task found");
  return task;
}

export async function updateTaskById(
  id,
  {
    title,
    description,
    status,
    startDate,
    dueDate,
    assignedTo,
    boardId,
  }
) {
  const task = await Task.findByIdAndUpdate(id);
  if (!task) {
    logger.error("Task not found");
    throw new Error("Task not found");
  }

  task.title = title;
  task.description = description;
  task.status = status;
  task.startDate = startDate;
  task.dueDate = dueDate;
  task.assignedTo = assignedTo;
  task.boardId = boardId;
  await task.save();

  logger.info("Task updated successfully");
  return task;
}

export async function deleteTaskById(id) {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    logger.error("Task not found");
    throw new Error("Task not found");
  }

  // await task.delete();
  logger.info("Task deleted successfully");
  return { message: "Task deleted successfully" };
}
