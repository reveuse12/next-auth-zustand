import mongoose, { mongo } from "mongoose";

const leaveschema = new mongoose.Schema({
  type: {
    type: String,
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
    required: true,
  },
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const Leaves = mongoose.models.Leaves || mongoose.model("Leaves", leaveschema);

export default Leaves;
