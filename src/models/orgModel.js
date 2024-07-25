import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const OrganizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an ownerId"],
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

OrganizationSchema.plugin(uniqueValidator); //

const Organization = mongoose.model("Organization", OrganizationSchema);

export default Organization;
