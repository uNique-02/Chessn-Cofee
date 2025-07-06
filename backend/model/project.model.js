import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String, required: true },
      alt: { type: String },
    },
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Web", "Mobile", "Desktop"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "on-hold", "draft", "completed"],
      default: "draft",
      required: true,
    },
    techStack: {
      type: [String], // e.g., ["React", "Node.js", "MongoDB"]
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
