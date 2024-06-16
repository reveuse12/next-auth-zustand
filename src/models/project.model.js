import mongoose from "mongoose";

const projectschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "Working", "canceled"],
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectschema, "projects");

export default Project;
