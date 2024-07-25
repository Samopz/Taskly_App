import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

BoardSchema.plugin(uniqueValidator);

const Board = mongoose.model("Board", BoardSchema);

export default Board;
