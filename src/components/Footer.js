"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-950 text-white py-10 px-6 mt-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-left">
        
        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect with me</h3>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="https://github.com/hrishikaverma/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-2xl hover:text-blue-400 transition duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/hrishika9131335013/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-blue-400 transition duration-300" />
            </a>
            <a href="hrishikaverma71@gmail.com">
              <FaEnvelope className="text-2xl hover:text-blue-400 transition duration-300" />
            </a>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-md text-white font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Copyright + Toggles */}
        <div className="space-y-3 text-sm opacity-80">
          <p>© {new Date().getFullYear()} Hrishika Verma. All rights reserved.</p>
          <div className="flex justify-center md:justify-end gap-6 mt-2">
            <button className="hover:text-blue-400 transition">🌙 Theme</button>
            <button className="hover:text-blue-400 transition">🌐 Language</button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
