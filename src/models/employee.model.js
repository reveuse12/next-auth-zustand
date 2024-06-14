import mongoose from "mongoose";

const employeeschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: [male, female, other],
      required: true,
    },
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    jobID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
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
      required: true,
    },
    performanceReview: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeschema);

export default Employee;
