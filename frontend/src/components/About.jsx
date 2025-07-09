import React from "react";
import { FaDownload } from "react-icons/fa";
import ProfilePic from "../assets/profile-pic.png";

const skills = [
  "Java",
  "Kotlin",
  "Python",
  "C",
  "SQL",
  "JavaScript",
  "HTML/CSS",
  "React",
  "Node.js",
  "Express",
  "Ruby on Rails",
  "Bootstrap",
  "Jetpack Compose",
  "Git",
  "Android Studio",
  "VS Code",
  "IntelliJ IDEA",
  "Postman",
  "MongoDB",
  "MySQL",
];

export default function AboutMe() {
  const resumeUrl =
    "https://res.cloudinary.com/dfkrqvmq8/image/upload/v1752039031/RESUME_-_Nique_Kim_p6ovg0.pdf";

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        {/* <div className="flex-shrink-0 w-full md:w-1/2"> */}
        <div className="flex-shrink-0 w-full md:max-w-sm p-10">
          <img
            src={ProfilePic}
            alt="About Me Visual"
            className="rounded-xl shadow-lg object-cover w-full h-auto max-w-md md:max-w-full"
          />
        </div>

        {/* Right: Content */}
        {/* <div className="w-full md:w-1/2"> */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">About Me</h2>
          <p className="text-gray-500 mb-6">
            Bridging the gap between creative vision and robust code.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            My Story & Expertise
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            As a dedicated programmer with a passion for visually engaging
            applications, I thrive on bringing complex ideas to life through
            elegant and efficient code. My journey in software development is
            fueled by curiosity and a commitment to continuous learning, always
            seeking new challenges and technologies to master.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            My approach blends meticulous problem-solving with a creative eye,
            ensuring that every project not only functions flawlessly but also
            delivers an intuitive and delightful user experience. When I'm not
            coding, you can find me exploring anime art, which often inspires
            the aesthetics of my personal projects.
          </p>

          <h4 className="text-lg font-semibold text-gray-500 mb-2 ">
            Skills & Technologies
          </h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-pink-100 text-pink-300 text-sm px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 transition"
            download
          >
            <FaDownload />
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}
