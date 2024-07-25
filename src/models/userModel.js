import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema(
  {
    // startdate: {
    //   type: Date,
    //   require: true,
    // },
    task: {
      date: {
        type: mongoose.Schema.Types.Date,
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
      },
      priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
      category: [
        {
          type: String,
        },
      ],
    },
    username: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide an organizationId"],
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide a boardId"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    usertype: {
      type: String,
      required: [true, "Please provide a userType"],
      default: "admin",
      enum: [
        "admin",
        "ceo",
        "developer",
        "designer",
        "manager",
        "client",
        "user",
      ],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "Please provide an answer"],
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

// export model
const User = mongoose.model("User", userSchema);

export default User;
