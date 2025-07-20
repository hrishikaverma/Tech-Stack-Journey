"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaLaptopCode, FaLightbulb, FaCodeBranch } from "react-icons/fa";

export default function About() {
  return (
    <>
      <Navbar />
      <main className="pt-35 px-4 md:px-8 max-w-6xl mx-auto text-gray-800 dark:text-gray-200">
        {/* Animated Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
            Meet Hrishika Verma
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Crafting clean, efficient, and modern full stack solutions with creativity and purpose ✨
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mb-4 mx-auto shadow-inner transition-transform group-hover:rotate-12">
              <FaLaptopCode className="text-2xl text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Tech Stack</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Expert in React, Next.js, Node.js, PostgreSQL & building scalable RESTful apps.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-700 flex items-center justify-center mb-4 mx-auto shadow-inner transition-transform group-hover:rotate-12">
              <FaLightbulb className="text-2xl text-yellow-600 dark:text-yellow-300" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Problem Solver</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              I thrive on solving real-world challenges through smart logic and clean UI/UX.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="group relative bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4 mx-auto shadow-inner transition-transform group-hover:rotate-12">
              <FaCodeBranch className="text-2xl text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Always Growing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              From DevOps to animations, I keep learning and improving my dev journey.
            </p>
          </motion.div>
        </div>

        {/* My Work in Action Section */}
        <section className="mt-20 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">🛠️ My Work in Action</h2>
          <p className="text-center mb-10 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A snapshot into my coding world — from building robust UIs to wiring backend logics.
          </p>

          {/* Floating Blob Background */}
          <div className="absolute -z-10 top-20 left-1/2 transform -translate-x-1/2 blur-3xl opacity-30 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                src: "/image1.jpg",
                caption: "Designing a responsive dashboard layout",
              },
              {
                src: "/image2.jpg",
                caption: "Working on backend APIs and integrations",
              },
              {
                src: "/image3.jpg",
                caption: "Refining UI/UX with real-time interactions",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="relative overflow-hidden rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-xl group hover:shadow-2xl transition duration-300"
              >
                <img
                  src={item.src}
                  alt={`Work Image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 text-center">
                    {item.caption}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition duration-300">
                  Click to Explore More
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Outro */}
        <motion.div
          className="mt-16 px-6 py-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
            “I don’t just write code, I design experiences that users love and clients trust.”
          </p>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
