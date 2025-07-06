// src/components/Slideshow.jsx
import React, { useState, useEffect } from "react";

export default function Slideshow({ backgrounds, onCtaClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background images (z-0) */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-contain bg-center transition-all duration-1000 ease-in-out z-0
            ${index === currentIndex ? "opacity-100" : "opacity-0"}
          `}
          style={{ backgroundImage: `url(${bg})` }}
        />
      ))}

      {/* Overlay content (z-10) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white text-center px-4 bg-black/40">
        <p className="text-pink-400 font-semibold">Hello, I'm a Developer</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
          Crafting Digital Realms <br /> with Code and{" "}
          <span className="text-gray-200">Creativity</span>
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl">
          Passionate about building interactive experiences that push
          boundaries. Inspired by the vibrant aesthetics of modern media.
        </p>
        <button
          onClick={onCtaClick}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Explore My Work
        </button>
      </div>
    </div>
  );
}
