import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../services/taskService.js";

export async function create(req, res) {
  const task = await createTask(req.body);
  res.status(201).json({
    success: true,
    message: "New Task created successfully!",
    task,
  });
}

export async function getAll(req, res) {
  try {
    const tasks = await getAllTasks(req.query);
    res.status(200).json({
      success: true,
      message: "See Tasks below!",
      totalTasks: tasks.length,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getById(req, res) {
  try {
    const task = await getTaskById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function update(req, res) {
  try {
    const task = await updateTaskById(req.params.id, req.body);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function deleteById(req, res) {
  try {
    const task = await deleteTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
