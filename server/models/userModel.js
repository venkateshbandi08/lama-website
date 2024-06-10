const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const fileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    fileName: { type: String, required: true },
    fileDescription: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    episodes: { type: String, default: 2 },
    date: { type: Date, default: Date.now },
    filesList: [fileSchema],
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    projectslist: [projectSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
