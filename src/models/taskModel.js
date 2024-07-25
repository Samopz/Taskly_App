import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    category: [{ type: String }], // ["Frontend", "Backend"

    startDate: Date,
    dueDate: Date,
    comments: [
      {
        text: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        url: String,
        type: {
          type: String,
          enum: ["Image", "Video"],
          default: "Image",
        },
      },
    ],
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { timestamps: true }
);

TaskSchema.plugin(uniqueValidator);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
