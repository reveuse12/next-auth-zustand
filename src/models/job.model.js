import mongoose from "mongoose";

const jobschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobschema, "jobs");

export default Job;
