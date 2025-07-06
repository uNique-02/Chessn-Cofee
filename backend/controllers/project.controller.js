import Project from "../model/project.model.js";
import cloudinary from "../lib/cloudinary.js";

// GET all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// GET project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Get Project Error:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// GET projects by category
export const getProjectByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const projects = await Project.find({ category }).lean();

    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No project found in this category" });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// CREATE a new project
export const createProject = async (req, res) => {
  try {
    console.log(req.body);
    const {
      title: title,
      description: description,
      thumbnail: thumbnail,
      url: url,
      category: category,
      status: status,
      techStack: techStack,
    } = req.body;

    console.log("Incoming thumbnail:", thumbnail?.slice(0, 30)); // for preview

    let cloudinaryResponse = null;
    if (thumbnail) {
      try {
        cloudinaryResponse = await cloudinary.uploader.upload(thumbnail, {
          folder: "projects",
        });
        console.log("✅ Uploaded to Cloudinary:", cloudinaryResponse);
      } catch (uploadErr) {
        console.error("❌ Cloudinary upload failed:", uploadErr);
        return res
          .status(500)
          .json({ error: "Image upload to Cloudinary failed" });
      }
    }

    console.log("Cloudinary Response:", cloudinaryResponse);

    const newProject = new Project({
      title,
      description,
      url,
      category,
      status,
      techStack,
      image: cloudinaryResponse
        ? {
            url: cloudinaryResponse.secure_url,
            alt: cloudinaryResponse.original_filename || title,
          }
        : null,
    });

    const createdProject = await newProject.save();
    console.log("Created Project successfully:", createdProject);
    res.status(201).json(createdProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// UPDATE an existing project
export const updateProject = async (req, res) => {
  try {
    const { title, description, category, status, url, techStack, image } =
      req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    let imageObj = project.image;
    if (image && image !== project.image?.url) {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "projects",
      });
      imageObj = {
        url: upload.secure_url,
        alt: upload.original_filename || title,
      };
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.category = category || project.category;
    project.status = status || project.status;
    project.url = url || project.url;
    project.techStack = techStack || project.techStack;
    project.image = imageObj;

    const updated = await project.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};

// DELETE a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.image?.url) {
      const publicId = project.image.url.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`projects/${publicId}`);
      } catch (err) {
        console.error("Cloudinary delete error:", err);
      }
    }

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Failed to delete project" });
  }
};
