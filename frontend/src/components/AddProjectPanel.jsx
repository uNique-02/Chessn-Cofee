import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useProjectStore from "../stores/useProjectStore";

const categories = ["Web", "Mobile", "Desktop"];
const statuses = ["active", "on-hold", "draft", "completed"];

const AddProjectPanel = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState([]);

  const { createProject } = useProjectStore();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
    }
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    const tech = techInput.trim();
    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
      setTechInput("");
    }
  };

  const removeTech = (tech) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      title: title,
      description: description,
      url: url,
      category: category,
      status: status,
      thumbnail: thumbnail,
      techStack: techStack,
    };

    await createProject(formData);
    onClose();

    // Optional: reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setStatus("");
    setThumbnail(null);
    setTechStack([]);
    setTechInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="ml-auto h-full w-full max-w-md bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
                className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project Description"
                className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                placeholder="Project URL"
                className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Status</option>
                {statuses.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack / Languages
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="e.g. React, Node.js"
                    className="flex-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleAddTech}
                    className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(tech)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="w-full border rounded px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="Preview"
                    className="mt-2 rounded-lg w-full h-40 object-cover"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProjectPanel;
