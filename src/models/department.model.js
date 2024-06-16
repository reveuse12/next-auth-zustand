import mongoose from "mongoose";

const departmentschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    managerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentschema);

export default Department;
