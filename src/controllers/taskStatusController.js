import taskModel from "../models/taskModel.js";

// CHANGE TASK STATUS
const taskStatusController = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Valid Task id",
      });
    }
    const { status} = req.body;
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Task Status Updated successfully",
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Task Status API",
      error,
    });
  }
};

export default taskStatusController;
