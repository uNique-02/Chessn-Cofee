import React, { useEffect, useState } from "react";
import AddBlogPanel from "../components/AddBlogPanel.jsx";
import useBlogStore from "../stores/useBlogStore.js";
import { BookText, Folder, Calendar, Pencil, Trash2 } from "lucide-react";
import BlogCard from "../components/BlogCard.jsx";

const StatCard = ({ label, value, description, icon: Icon }) => (
  <div className="flex flex-col border rounded-lg p-4 shadow-sm bg-white min-w-[12rem]">
    <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
      <span>{label}</span>
      <Icon className="w-4 h-4" />
    </div>
    <div className="font-bold text-xl mb-1">{value}</div>
    <div className="text-xs text-gray-500">{description}</div>
  </div>
);

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  // const filteredBlogs = blogs.filter((b) =>
  //   b.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  console.log("Blogs:", blogs);
  // console.log("Filtered Blogs:", filteredBlogs);

  const stats = [
    {
      label: "Total Blogs",
      value: blogs.length,
      description: "All saved blog entries",
      icon: BookText,
    },
    {
      label: "Categories Used",
      value: new Set(blogs.map((b) => b.category)).size,
      description: "Unique blog categories",
      icon: Folder,
    },
  ];

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex text-gray-700 font-sans bg-gray-50 relative overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 bg-white rounded-tr-xl rounded-br-xl shadow-lg z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold">Blogs Management</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search blogs..."
              className="border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-400 text-white py-2 px-5 rounded-md font-semibold shadow hover:bg-red-500 transition select-none"
            >
              + Add New Blogs
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </section>

        <h3 className="font-semibold text-lg mb-4">All Blogs</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              onEdit={() => alert(`Edit ${blog.title}`)}
              onDelete={() => alert(`Delete ${blog.title}`)}
            />
          ))}
        </section>
      </main>

      {/* Slide-out Panel (Placed outside main so it isn't cut off) */}
      <AddBlogPanel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default Dashboard;
