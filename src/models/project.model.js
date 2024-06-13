import mongoose from "mongoose";

const projectschema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  clientId: String,
  userId: String,
  ticketIds: [String],
});

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectschema, "projects");

export default Project;
