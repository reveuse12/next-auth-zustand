import mongoose from "mongoose";

const jobschema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobschema, "jobs");

export default Job;
