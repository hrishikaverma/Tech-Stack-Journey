'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Optional, if you want thumbnails

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'Interior-Vaastu',
      description: 'A MERN-stack website for booking interior design services, showcasing projects.',
      techStack: 'React.js, Tailwind CSS, MongoDB, Node.js',
      github: 'https://github.com/hrishikaverma/interior-vaastu',
      live: 'https://interior-vaastu.netlify.app/'
    },
    {
      id: 2,
      title: 'Gluco-Predict(Diabetes-Prediction)',
      description: 'A Flask and MongoDB-based machine learning web app to predict diabetes probability from user input.',
      techStack: 'AI AND ML, Express, MongoDB',
      github: 'https://github.com/hrishikaverma/diabetes-prediction',
      live: 'https://glucopredic1.streamlit.app/'
    },
    {
      id: 3,
      title: 'Contact Management-APP',
      description: 'Full-stack web app to manage contacts using React, Node.js, and MongoDB.',
      techStack: 'React.js, Node.js, MongoDB',
      github: 'https://github.com/hrishikaverma/contact-management-app',
      live: 'https://scintillating-pudding-ffed6d.netlify.app/'
    },
    {
      id: 4,
      title: 'Iris-Classification',
      description: 'Streamlit app to classify Iris flower species using multiple ML models.',
      techStack: 'Random Forest, Logistic Regression, SVM, Decision Tree',
      github: 'https://github.com/hrishikaverma/iris-classification-app',
      live: 'https://iris-classification-app-0301.streamlit.app/'
    },
    {
      id: 5,
      title: 'Fog Wave Grid',
      description: 'A creative gaming-style grid UI using React animations.',
      techStack: 'React.js, Node.js, MongoDB',
      github: 'https://github.com/hrishikaverma/FOG-WAVE--GRID'
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">My Projects</h1>

        {/* Search Filter */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/2 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border rounded-xl p-6 shadow-lg dark:bg-gray-900 bg-white"
            >
              {/* Optional Image (replace src with actual image path if available) */}
              {/* <img src={`/projects/${project.id}.jpg`} alt={project.title} className="rounded mb-4 w-full h-40 object-cover" /> */}

              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {project.description}
              </p>

              {/* Tech Stack as Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.split(',').map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 text-xs px-2 py-1 rounded-full"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    GitHub
                  </a>
                )}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline dark:text-green-400"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="mt-10 text-center text-red-500">No projects found.</p>
        )}
      </main>
    </>
  );
}
