import { Calendar, Pencil, Trash2 } from "lucide-react";

const BlogCard = ({ title, description, date, category, onEdit, onDelete }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col justify-between">
    <div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-lg leading-5">
          {title}
        </h3>
        <div className="flex items-center gap-4 text-gray-400">
          <button
            onClick={onEdit}
            aria-label={`Edit ${title}`}
            className="hover:text-gray-600 transition"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${title}`}
            className="hover:text-gray-600 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
        <Calendar className="w-4 h-4" />
        {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-xs text-white bg-indigo-400 inline-block px-2 py-0.5 rounded-md">
        {category}
      </div>
    </div>
  </div>
);

export default BlogCard;
