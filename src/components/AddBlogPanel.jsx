import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useBlogStore from "../stores/useBlogStore";

const categories = ["Web", "AI", "DevTools", "UX", "Other"];

const AddBlogPanel = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");

  const { createBlog } = useBlogStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !link || !date || !category) {
      alert("Please fill in all required fields.");
      return;
    }

    const newBlog = {
      title,
      description,
      link,
      date: new Date(date),
      category,
    };

    await createBlog(newBlog);
    onClose();

    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setDate("");
    setCategory("Other");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
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
            <h2 className="text-xl font-semibold mb-4">Add New Blog</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-1 font-medium">
                  Blog Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block mb-1 font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Link */}
              <div>
                <label htmlFor="link" className="block mb-1 font-medium">
                  Blog URL
                </label>
                <input
                  id="link"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block mb-1 font-medium">
                  Publish Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block mb-1 font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
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
                  Save Blog
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddBlogPanel;
