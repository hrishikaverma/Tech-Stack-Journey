"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";
import Image from "next/image";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedProject, setSelectedProject] = useState(null);

  const techIcons = {
    "React.js": <FaReact />,
    "Node.js": <FaNodeJs />,
    "MongoDB": <SiMongodb />,
    "Tailwind CSS": <SiTailwindcss />,
    "AI": <FaPython />,
  };

  const projects = [
    {
      id: 1,
      title: "Interior-Vaastu",
      description: "A MERN-stack website for booking interior design services, showcasing projects.",
      techStack: "React.js, Tailwind CSS, MongoDB, Node.js",
      difficulty: "Intermediate",
      github: "https://github.com/hrishikaverma/interior-vaastu",
      live: "https://interior-vaastu.netlify.app/",
      status: "Completed",
      year: 2025,
      image: "/projects/interior-vaastu.png",
      details: "This website allows users to explore interior designs, book services, and view past projects.",
    },
    {
      id: 2,
      title: "Gluco-Predict(Diabetes-Prediction)",
      description: "ML app to predict diabetes probability from user input.",
      techStack: "AI, Express, MongoDB",
      difficulty: "Intermediate",
      github: "https://github.com/hrishikaverma/diabetes-prediction",
      live: "https://glucopredic1.streamlit.app/",
      status: "Completed",
      year: 2024,
      image: "/projects/gluco-predict.png",
      details: "Uses ML models to estimate diabetes likelihood. Built using Streamlit, Flask & MongoDB.",
    },
    {
      id: 3,
      title: "Contact Management-APP",
      description: "Full-stack app to manage contacts with CRUD operations.",
      techStack: "React.js, Node.js, MongoDB",
      difficulty: "Beginner",
      github: "https://github.com/hrishikaverma/contact-management-app",
      live: "https://scintillating-pudding-ffed6d.netlify.app/",
      status: "In Progress",
      year: 2024,
      image: "/projects/contact-app.png",
      details: "Create, update, delete, and search contacts with a friendly UI.",
    },
    {
      id: 4,
      title: "Iris-Classification",
      description: "Streamlit app to classify Iris species using ML models.",
      techStack: "Random Forest, Logistic Regression, SVM, Decision Tree",
      difficulty: "Beginner",
      github: "https://github.com/hrishikaverma/iris-classification-app",
      live: "https://iris-classification-app-0301.streamlit.app/",
      status: "Completed",
      year: 2023,
      image: "/projects/iris.png",
      details: "A comparative ML dashboard to identify Iris flower species.",
    },
    {
      id: 5,
      title: "Fog Wave Grid",
      description: "A creative grid UI with React wave animations.",
      techStack: "React.js, Node.js, MongoDB",
      difficulty: "Advanced",
      github: "https://github.com/hrishikaverma/FOG-WAVE--GRID",
      live: "",
      status: "Coming Soon",
      year: 2025,
      image: "/projects/fog-grid.png",
      details: "Gaming-style bouncing grid animation UI in React. Dynamic and responsive.",
    },
  ];

  const filteredProjects = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTech === "" || project.techStack.toLowerCase().includes(selectedTech.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "latest") return b.year - a.year;
      if (sortOption === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <>
      <Navbar />
      <main className="p-8 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>

        {/* Controls */}
        <div className="mb-8 text-center space-y-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/2 dark:bg-gray-800 dark:border-gray-700"
          />

          <div className="flex justify-center gap-4 flex-wrap">
            {["React", "MongoDB", "Node.js", "AI", "Tailwind", ""].map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1 text-sm rounded-full border dark:border-gray-600 ${
                  selectedTech === tech
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
              >
                {tech || "All"}
              </button>
            ))}

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="latest">Latest</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className="border rounded-xl p-6 shadow-lg dark:bg-gray-900 bg-white cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-1">{project.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.description}</p>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.techStack.split(",").map((tech, index) => (
                  <span key={index} className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full">
                    {techIcons[tech.trim()] || null} {tech.trim()}
                  </span>
                ))}
              </div>

              {/* Difficulty & Status */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 text-xs rounded-full">{project.difficulty}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    project.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : project.status === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="mt-10 text-center text-red-500">No projects found.</p>
        )}

        {/* Modal Popup */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-4 text-lg"
              >
                ❌
              </button>

              <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{selectedProject.details}</p>

              {selectedProject.image && (
  <div className="w-full max-h-[300px] overflow-hidden rounded mb-4">
    <Image
      src={selectedProject.image}
      alt={selectedProject.title}
      layout="responsive"
      width={600}
      height={300}
      className="object-contain"
    />
  </div>
)}


              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.techStack.split(",").map((tech, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    GitHub
                  </a>
                )}
                {selectedProject.live ? (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    className="text-green-600 underline"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="text-yellow-600">Coming Soon</span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
