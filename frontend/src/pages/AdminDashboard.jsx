import React, { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";
import useProjectStore from "../stores/useProjectStore.js";
import useBlogStore from "../stores/useBlogStore.js";
import BlogCard from "../components/BlogCard.jsx";
import Blog from "../components/Blog.jsx";

const statusStyles = {
  active: "bg-green-200 text-green-700",
  "on hold": "bg-gray-300 text-gray-600",
  completed: "bg-blue-200 text-blue-700",
  draft: "bg-yellow-200 text-yellow-700",
};

const StatCard = ({ label, value, description, icon }) => {
  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-sm bg-white min-w-[12rem]">
      <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{icon}</span>
      </div>
      <div className="font-bold text-xl mb-1">{value}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
};

const ProjectCard = ({
  title,
  status,
  description,
  tags,
  updated,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start gap-2">
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      </svg>
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-5">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md lowercase mb-2 ${
            statusStyles[status] || "bg-gray-300 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [searchTerm, setSearchTerm] = useState("");

  const { projects, fetchProjects, createProject, deleteProject } =
    useProjectStore();
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    fetchProjects();
    fetchBlogs();
  }, []);
  console.log("Projects in Dashboard:", projects);
  console.log("Blogs in Dashboard:", blogs);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      description: "Overall projects in the system",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5"></path>
        </svg>
      ),
    },
    {
      label: "Completed Projects",
      value: projects.filter((p) => p.status === "completed").length,
      description: "Successfully delivered",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 12l2 2 4-4"></path>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      ),
    },
    {
      label: "Total Blog Posts",
      value: 1,
      description: "Across all categories",
      icon: <Megaphone className="w-5 h-5 text-gray-400" />,
    },
  ];

  return (
    <div className="min-h-screen flex text-gray-700 font-sans bg-gray-50">
      {/* <Sidebar /> */}
      <main className="flex-1 flex flex-col p-8 bg-white rounded-tr-xl rounded-br-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold">Dashboard Overview</h2>
        </div>

        <section className="flex justify-between gap-4 mb-8 w-full">
          {stats.map((stat, i) => (
            <div key={i} className="flex-1">
              <StatCard {...stat} />
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-6 mb-8 w-full">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <table className="w-full text-sm text-left border border-gray-200 bg-white">
                <thead className="text-lg bg-white text-black border-b border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Recent Projects
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-200">
                      <td className="px-6 py-4">
                        <ProjectCard
                          {...project}
                          onEdit={() => alert(`Edit ${project.title}`)}
                          onDelete={() => alert(`Delete ${project.title}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="relative">
              <table className="w-full text-sm text-left border border-gray-200 bg-white">
                <thead className="text-lg bg-white text-black border-b border-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Recent Blogs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr
                      key={`blog-${blog.id || blog._id}`}
                      className="border-b border-gray-200"
                    >
                      <td className="px-6 py-4">
                        <BlogCard
                          {...blog}
                          onEdit={() => alert(`Edit ${blog.title}`)}
                          onDelete={() => alert(`Delete ${blog.title}`)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
