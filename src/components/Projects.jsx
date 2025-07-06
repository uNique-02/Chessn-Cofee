import React, { useState } from "react";

import aura from "../assets/thumbnail/project-aura.jpg";
import cognito from "../assets/thumbnail/project-cognito.jpg";
import codeforge from "../assets/thumbnail/project-codeforge.jpg";
import useProjectStore from "../stores/useProjectStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = ["Mobile", "Desktop", "Web"];

const useInViewArray = (length) => {
  return Array.from({ length }, () =>
    useInView({ triggerOnce: true, threshold: 0.1 })
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Web");

  const projects = useProjectStore((state) => state.projects);
  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  useEffect(() => {
    console.log("Fetching projects...");
    fetchProjects();
  }, []);

  console.log("Projects in Dashboard:", projects);

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory
  );

  const inViewArray = useInViewArray(filteredProjects.length);

  return (
    <section className="px-6 py-16 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h2>
        <p className="text-gray-500 mb-8">
          A showcase of passion-driven development and impactful solutions.
        </p>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md border text-sm font-medium ${
                  activeCategory === cat
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <p className="text-gray-500">
            No projects available in this category.
          </p>
        )}

        {/* Project Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const [ref, inView] = inViewArray[idx];

            return (
              <motion.div
                key={project._id || idx}
                ref={ref}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden text-left"
              >
                <img
                  src={project.image.url}
                  alt={project.image.alt || project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 mb-4">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 font-semibold text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Try demo <span>→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
