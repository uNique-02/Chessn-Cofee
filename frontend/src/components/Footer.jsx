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
          <a
            href="https://github.com/uNique-02"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 hover:text-black transition-colors" />
          </a>
          <a
            href="https://x.com/niqueK_02"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <X className="w-4 h-4 hover:text-black transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/kim-nique/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 hover:text-black transition-colors" />
          </a>
          <a
            href="https://www.instagram.com/odisacmik/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 hover:text-black transition-colors" />
          </a>
          {/* <a
            href="https://dribbble.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dribbble"
          >
            <Dribbble className="w-4 h-4 hover:text-black transition-colors" />
          </a> */}
        </div>
      </div>
    </footer>
  );
}
