import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import AddProjectPanel from "../components/AddProjectPanel.jsx";
import useProjectStore from "../stores/useProjectStore.js";

const projectsData = [
  {
    id: 1,
    title: "AI Chatbot Integration",
    status: "active",
    description:
      "Integrate a custom AI-powered chatbot into the customer support portal to handle routine",
    tags: ["Python", "TensorFlow", "React", "Azure"],
    updated: "2024-07-28",
  },
  {
    id: 2,
    title: "E-commerce Platform Redesign",
    status: "on hold",
    description:
      "Complete overhaul of the existing e-commerce website, focusing on improving user experience,",
    tags: ["Next.js", "Tailwind CSS", "Stripe API"],
    updated: "2024-07-25",
  },
  {
    id: 3,
    title: "Internal Analytics Dashboard",
    status: "completed",
    description:
      "Develop a new dashboard for internal teams to track key performance indicators, visualize data,",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    updated: "2024-07-20",
  },
  {
    id: 4,
    title: "Mobile App Feature Expansion",
    status: "active",
    description:
      "Add new features to the existing mobile application, including push notifications, offline",
    tags: ["React Native", "Firebase", "GraphQL"],
    updated: "2024-07-29",
  },
  {
    id: 5,
    title: "Cloud Migration Strategy",
    status: "draft",
    description:
      "Plan and execute the migration of on-premise infrastructure to a cloud-based solution,",
    tags: ["AWS", "Docker", "Kubernetes"],
    updated: "2024-07-15",
  },
  {
    id: 6,
    title: "CRM System Customization",
    status: "active",
    description:
      "Customize the CRM system to better suit sales workflows, automate lead management, and",
    tags: ["Salesforce Apex", "Lightning Web Components"],
    updated: "2024-07-27",
  },
];

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
  title: title,
  status: status,
  description: description,
  category: category,
  techStack: techStack,
  updatedAt: updatedAt,
  onEdit: onEdit,
  onDelete: onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between min-w-[16rem] max-w-[24rem]">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-5">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-gray-400">
            <button
              onClick={onEdit}
              aria-label="Edit"
              className="hover:text-gray-600 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15.232 5.232l3.536 3.536M6 18.5v-3.75a1.5 1.5 0 011.5-1.5H14"></path>
              </svg>
            </button>
            <button
              onClick={onDelete}
              aria-label="Delete"
              className="hover:text-gray-600 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 7L5 7"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M7 7l1-2h8l1 2"></path>
                <path d="M9 7v-2a2 2 0 012-2h2a2 2 0 012 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
        <span
          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md lowercase mb-2 ${
            statusStyles[status] || "bg-gray-300 text-gray-600"
          }`}
        >
          {status}
        </span>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {techStack.map((tag) => (
            <span
              key={tag._id}
              className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md text-xs font-medium select-none"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center text-xs text-gray-400 select-none gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M10 2h4a6 6 0 016 6v6a6 6 0 01-6 6h-4a6 6 0 01-6-6v-6a6 6 0 016-6z"></path>
          </svg>
          <span>last updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState("projects");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false); // ✅ control modal

//   const filteredProjects = projectsData.filter((p) =>
//     p.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen flex text-gray-700 font-sans bg-gray-50">
//       {/* <Sidebar /> */}
//       <main className="flex-1 flex flex-col p-8 bg-white rounded-tr-xl rounded-br-xl shadow-lg">
//         {/* <Tabs activeTab={activeTab} onTabChange={setActiveTab} /> */}
//         {/* <> */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-extrabold">Project Management</h2>
//           <div className="flex gap-3">
//             <input
//               type="text"
//               placeholder="Search projects..."
//               className="border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button
//               onClick={() => setIsModalOpen(true)} // ✅ open modal
//               className="bg-red-400 text-white py-2 px-5 rounded-md font-semibold shadow hover:bg-red-500 transition select-none"
//             >
//               + Add New Project
//             </button>
//           </div>
//         </div>
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {stats.map((stat, i) => (
//             <StatCard key={i} {...stat} />
//           ))}
//         </section>
//         <h3 className="font-semibold text-lg mb-4">All Projects</h3>
//         <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               {...project}
//               onEdit={() => alert(`Edit ${project.title}`)}
//               onDelete={() => alert(`Delete ${project.title}`)}
//             />
//           ))}
//         </section>
//         {/* </>
//         )}
//         {activeTab === "blogs" && (
//           <p className="text-gray-500 font-medium select-none">
//             No content for Blogs tab in this demo.
//           </p>
//         )} */}

//         {/* ✅ Render Modal */}
//         <AddProjectPanel
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </main>
//     </div>
//   );
// }

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { projects, fetchProjects, createProject, deleteProject } =
    useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, []);
  console.log("Projects in Dashboard:", projects);

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
      label: "Active Projects",
      value: projects.filter((p) => p.status === "active").length,
      description: "Currently in progress",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M2.5 19L10 5l6 14"></path>
          <path d="M14 9l4-4"></path>
        </svg>
      ),
    },
    {
      label: "Projects in Draft",
      value: projects.filter((p) => p.status === "draft").length,
      description: "Subject for review",
      icon: (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v4l3 3"></path>
          <circle cx="12" cy="12" r="10"></circle>
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
  ];

  return (
    <div className="min-h-screen flex text-gray-700 font-sans bg-gray-50 relative overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 bg-white rounded-tr-xl rounded-br-xl shadow-lg z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold">Project Management</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search projects..."
              className="border border-gray-300 rounded-md px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-400 text-white py-2 px-5 rounded-md font-semibold shadow hover:bg-red-500 transition select-none"
            >
              + Add New Project
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </section>

        <h3 className="font-semibold text-lg mb-4">All Projects</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onEdit={() => alert(`Edit ${project.title}`)}
              onDelete={() => alert(`Delete ${project.title}`)}
            />
          ))}
        </section>
      </main>

      {/* Slide-out Panel (Placed outside main so it isn't cut off) */}
      <AddProjectPanel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
