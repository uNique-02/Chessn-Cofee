import React, { useRef } from "react";
import Mail from "../components/Mail.jsx";
import AboutMe from "../components/About.jsx";
import Projects from "../components/Projects.jsx";
import Blog from "../components/Blog.jsx";
import Footer from "../components/Footer.jsx";
import Slideshow from "../components/Slideshow.jsx";

import background1 from "../assets/services-1.jpg";
import background2 from "../assets/services-2.png";
import background3 from "../assets/services-3.png";

export default function LandingPage() {
  const backgrounds = [background1, background2, background3];

  const blogRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-bold">Chess n' Coffee</h1>
        <nav className="space-x-4 text-sm">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-pink-400"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="hover:text-pink-400"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(projectsRef)}
            className="hover:text-pink-400"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection(blogRef)}
            className="hover:text-pink-400"
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="hover:text-pink-400"
          >
            Contact
          </button>
        </nav>
      </header>

      {/* ✅ Slideshow */}
      <Slideshow
        backgrounds={backgrounds}
        onCtaClick={() => scrollToSection(projectsRef)}
      />

      {/* ✅ Sections */}
      <div ref={aboutRef}>
        <AboutMe />
      </div>

      <div ref={projectsRef}>
        <Projects />
      </div>

      <div ref={blogRef}>
        <Blog />
      </div>

      <div ref={contactRef}>
        <Mail />
      </div>

      <Footer />
    </div>
  );
}
