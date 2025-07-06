import { NavLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const linkClass =
    "mb-2 flex items-center text-sm py-2 px-4 rounded-md transition font-semibold";
  const baseIconClass = "w-4 h-4 mr-2";
  const activeStyle = "bg-red-400 text-white hover:text-white hover:bg-red-500";
  const inactiveStyle = "text-gray-400 hover:text-gray-900 hover:bg-gray-100";

  return (
    <div className="flex flex-col justify-between h-full border-r border-gray-200 py-6 px-4 min-w-[16rem] bg-white">
      <div>
        <nav className="mb-8">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <svg
                  className={baseIconClass}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8h18M3 12h8m-8 4h14"></path>
                </svg>
                Dashboard Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/projects"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <svg
                  className={baseIconClass}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 4h3v3H4zM9 4h3v3H9zM14 4h3v3h-3zM4 9h3v3H4zM9 9h3v3H9zM14 9h3v3h-3zM4 14h3v3H4zM9 14h3v3H9zM14 14h3v3h-3z"></path>
                </svg>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/blogs"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <svg
                  className={baseIconClass}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
                Blogs
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <div className="mb-6 text-center select-none">
          <div className="mx-auto mb-2 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-300 via-purple-300 to-indigo-300 shadow-inner flex items-center justify-center text-indigo-700 text-4xl font-semibold font-mono">
            O
          </div>
          <p className="text-sm text-gray-600 font-semibold truncate">
            Admin Dashboard
          </p>
        </div>
        <button className="w-full flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 py-2 px-4 border border-gray-300 rounded-md transition select-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
            <path d="M7 16V8"></path>
          </svg>
          Sign Out
        </button>
      </div>
    </div>
  );
}
