import React, { useRef, useEffect, useState } from "react";
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

  const homeRef = useRef(null);
  const blogRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const [activeTab, setActiveTab] = useState("home");

  const scrollToSection = (ref, tabName) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(tabName);
  };

  // Intersection Observer to auto-set active tab
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const sections = [
      { ref: homeRef, id: "home" },
      { ref: aboutRef, id: "about" },
      { ref: projectsRef, id: "projects" },
      { ref: blogRef, id: "blog" },
      { ref: contactRef, id: "contact" },
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.ref.current === entry.target);
          if (section) setActiveTab(section.id);
        }
      });
    }, options);

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow p-2 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-end ml-2 p-0">
          <h1 className="text-lg font-bold">Chess n' Coffee</h1>
          <img
            src="/chessncoffee_icon.svg"
            alt="Chess n' Coffee Logo"
            className="w-8 h-8 ml-2 m-0"
          />
        </div>

        <nav className="space-x-4 text-sm">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveTab("home");
            }}
            className={`${
              activeTab === "home"
                ? "text-pink-600 font-bold"
                : "hover:text-pink-400"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection(aboutRef, "about")}
            className={`${
              activeTab === "about"
                ? "text-pink-600 font-bold"
                : "hover:text-pink-400"
            }`}
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(projectsRef, "projects")}
            className={`${
              activeTab === "projects"
                ? "text-pink-600 font-bold"
                : "hover:text-pink-400"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection(blogRef, "blog")}
            className={`${
              activeTab === "blog"
                ? "text-pink-600 font-bold"
                : "hover:text-pink-400"
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => scrollToSection(contactRef, "contact")}
            className={`${
              activeTab === "contact"
                ? "text-pink-600 font-bold"
                : "hover:text-pink-400"
            }`}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* ✅ Slideshow */}
      <div ref={homeRef}>
        <Slideshow
          backgrounds={backgrounds}
          onCtaClick={() => scrollToSection(projectsRef, "projects")}
        />
      </div>

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
