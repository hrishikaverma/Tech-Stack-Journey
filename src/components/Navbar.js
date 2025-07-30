"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaGithub,
  FaLinkedin,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "About", "Projects", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const getLinkPath = (item) => (item === "Home" ? "/" : `/${item.toLowerCase()}`);

  return (
    <nav
      className={`fixed top-0 w-full z-70 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md bg-white/60 dark:bg-gray-900/60" : "bg-white/30 dark:bg-gray-900/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/profile.jpg"
            alt="Hrishika Profile"
            width={42}
            height={42}
            className="rounded-full ring-2 ring-blue-500 shadow-md"
          />
          <span className="text-xl font-bold text-blue-600 dark:text-yellow-400 tracking-wide">
            Hrishika.dev
          </span>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`font-medium transition ${
                pathname === getLinkPath(item)
                  ? "text-blue-600 dark:text-yellow-300"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-yellow-400"
              }`}
            >
              <Link href={getLinkPath(item)}>{item}</Link>
            </motion.div>
          ))}

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-2.5 text-gray-500 text-xs" />
          </div>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            download
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition"
          >
            Resume
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 text-xl text-gray-700 dark:text-gray-300 hover:text-blue-600"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Social Icons */}
          <div className="flex gap-3 ml-3 text-lg text-gray-600 dark:text-gray-300">
            <a href="https://github.com/hrishikaverma/" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/hrishika9131335013/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Right: Mobile Icons */}
        <div className="md:hidden flex gap-3 items-center">
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-blue-600">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg z-40 flex flex-col px-6 py-6 gap-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold text-blue-600 dark:text-yellow-400">
                Hrishika.dev
              </span>
              <FaTimes className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
            </div>

            {navLinks.map((item) => (
              <Link
                key={item}
                href={getLinkPath(item)}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium transition ${
                  pathname === getLinkPath(item)
                    ? "text-blue-600 dark:text-yellow-300"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                }`}
              >
                {item}
              </Link>
            ))}

            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none"
            />

            <a
              href="/resume.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-2 rounded-xl text-center"
            >
              Download Resume
            </a>

            <div className="flex gap-4 mt-4 text-lg text-gray-600 dark:text-gray-300">
              <a href="https://github.com/hrishikaverma/" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/hrishika9131335013/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
