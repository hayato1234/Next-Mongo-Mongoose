import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  clientId: String,
});

const ProjectSchema = mongoose.model("Project", projectSchema);

module.exports = ProjectSchema;
