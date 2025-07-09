import { Github, X, Linkedin, Instagram, Dribbble } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 shadow pt-6 pb-5 text-sm text-gray-400">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-0">
        <button className="border border-gray-300 px-3 py-1 rounded text-xs">
          English
        </button>
        <p className="text-center">© Chess n' Coffee</p>
        <div className="flex items-center space-x-3 text-gray-500 text-base">
          <Github className="w-4 h-4" />
          <X className="w-4 h-4" />
          <Linkedin className="w-4 h-4" />
          <Instagram className="w-4 h-4" />
          <Dribbble className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}
