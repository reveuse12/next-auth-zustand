import mongoose from "mongoose";

const employeeschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    departmentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      index: true,
    },
    jobRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    contactInfo: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    leaves: {
      type: Number,
      default: 12,
    },
    performanceReview: {
      type: String,
      default: "No review yet",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "terminated"],
      default: "active",
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeschema);

export default Employee;
