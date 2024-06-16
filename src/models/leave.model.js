import mongoose from "mongoose";

const leaveschema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["sick", "casual", "annual", "maternity", "paternity", "other"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
    },
    employeeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.models.Leave || mongoose.model("Leave", leaveschema);

export default Leave;
