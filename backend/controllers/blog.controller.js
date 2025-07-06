import Blog from "../model/blog.model.js";

// @desc    Get all blogs
// @route   GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get Blogs Error:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Failed to fetch blog by ID" });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const { title, description, link, date, category } = req.body;

    const blog = new Blog({
      title,
      description,
      link,
      date,
      category,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};

// @desc    Get blogs by category
// @route   GET /api/blogs/category/:category
export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const blogs = await Blog.find({ category }).sort({ date: -1 }).lean();
    if (!blogs || blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "No blogs found in this category" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Get Blogs by Category Error:", error);
    res.status(500).json({ message: "Failed to fetch blogs by category" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description, link, date, category } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.link = link || blog.link;
    blog.date = date || blog.date;
    blog.category = category || blog.category;

    const updated = await blog.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};
