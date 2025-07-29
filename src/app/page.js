"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { FaArrowRight, FaPhone, FaEnvelope, FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PROFILE_PHOTO = '/profile.jpg';

const skills = [
  { name: 'Java', level: 85 },
  { name: 'JavaScript', level: 90 },
  { name: 'PHP', level: 70 },
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 75 },
  { name: 'MySQL', level: 80 },
  { name: 'CSS', level: 80 },
  { name: 'Bootstrap', level: 85 },
];

const highlights = [
  { title: 'Apps Built', count: 2 },
  { title: 'Certifications', count: 5 },
  { title: 'Internship Top Performer', count: 1 },
];

const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;

function CircularSkill({ skill }) {
  const { name, level } = skill;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ strokeDashoffset: circleCircumference * (1 - level / 100) });
    }
  }, [inView, controls, level]);

  return (
    <motion.div ref={ref} className="relative flex flex-col items-center justify-center m-4 w-32 h-32">
      <svg width="120" height="120" className="transform -rotate-90">
        <circle cx="60" cy="60" r={circleRadius} stroke="#e5e7eb" strokeWidth="12" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={circleRadius}
          stroke="#2563eb"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={circleCircumference}
          animate={controls}
          initial={{ strokeDashoffset: circleCircumference }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-blue-700 dark:text-blue-400 select-none">
        {level}%
      </div>
      <p className="mt-4 text-center font-medium text-gray-700 dark:text-gray-300 select-none">{name}</p>
    </motion.div>
  );
}

function DarkModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <nav
      className="fixed top-4 right-4 z-50 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md backdrop-blur-sm cursor-pointer"
      onClick={toggleDarkMode}
      title="Toggle Dark Mode"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FaSun size={24} className="text-yellow-400" /> : <FaMoon size={24} className="text-gray-600" />}
    </nav>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState(highlights.map(() => 0));

  useEffect(() => {
    const durations = 1500;
    const steps = durations / 30;

    const intervals = highlights.map(({ count }, index) => {
      let current = 0;
      const increment = count / steps;

      return setInterval(() => {
        current += increment;
        if (current >= count) {
          current = count;
          clearInterval(intervals[index]);
        }
        setAnimatedCounts(prev => {
          const updated = [...prev];
          updated[index] = Math.floor(current);
          return updated;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <>
      <Navbar />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="min-h-screen pt-36 px-6 pb-20 max-w-7xl mx-auto bg-gradient-to-br from-[#f0f4ff] via-white to-[#f5faff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
        {/* Hero */}
        <motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="flex flex-col items-center justify-center mb-24 px-6 relative z-10"
>
  <Image
    src={PROFILE_PHOTO}
    alt="Hrishika Verma"
    width={140}
    height={160}
    className="rounded-full mb-5 shadow-lg border-4 border-blue-500 dark:border-blue-400 object-cover"
  />

  {/* Name with Gradient */}
  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-600 dark:from-blue-400 dark:to-purple-300 mb-2 tracking-tight animate-fade-in">
    Hrishika Verma
  </h1>

  {/* Typewriter-style Role Text */}
  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-5 animate-typing border-r-2 pr-2 whitespace-nowrap overflow-hidden">
    Full Stack Developer | MERN Stack | MCA Student
  </p>

  {/* Contact & Social Section */}
<div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
  {/* Phone */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-blue-300 dark:hover:shadow-blue-800 transition duration-300 group cursor-pointer"
    title="Call me"
  >
    <FaPhone className="text-blue-600 group-hover:animate-pulse" />
    <span className="text-gray-800 dark:text-gray-300 font-medium">+91 9131335013</span>
  </motion.div>

  {/* Email */}
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-purple-300 dark:hover:shadow-purple-800 transition duration-300 group cursor-pointer"
    title="Email me"
    onClick={() => window.open("mailto:hrishikaverma71@gmail.com")}
  >
    <FaEnvelope className="text-purple-600 group-hover:animate-pulse" />
    <span className="text-gray-800 dark:text-gray-300 font-medium">hrishikaverma71@gmail.com</span>
  </motion.div>

  {/* GitHub */}
  <motion.a
    whileHover={{ scale: 1.05 }}
    href="https://github.com/yourgithub"
    target="_blank"
    rel="noopener noreferrer"
    title="GitHub Profile"
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-gray-300 dark:hover:shadow-gray-800 transition duration-300 group"
  >
    <FaGithub className="text-gray-700 dark:text-gray-300 group-hover:text-black" />
    <span className="text-gray-800 dark:text-gray-300 font-medium">GitHub</span>
  </motion.a>

  {/* LinkedIn */}
  <motion.a
    whileHover={{ scale: 1.05 }}
    href="https://linkedin.com/in/yourlinkedin"
    target="_blank"
    rel="noopener noreferrer"
    title="Connect on LinkedIn"
    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-blue-400 dark:hover:shadow-blue-700 transition duration-300 group"
  >
    <FaLinkedin className="text-blue-700 dark:text-blue-400 group-hover:text-blue-900" />
    <span className="text-gray-800 dark:text-gray-300 font-medium">LinkedIn</span>
  </motion.a>
</div>

  {/* Custom Button */}
  <button
    onClick={() => window.open('/resume.pdf')}
    className="mt-4 px-6 py-2 text-white font-medium rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg border border-transparent hover:from-purple-500 hover:to-blue-600 transition-all duration-300 animate-fade-in"
  >
    🚀 Download Resume
  </button>
</motion.section>

        <motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  }}
  className="max-w-4xl mx-auto mb-20 p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg text-center"
>
  <motion.p
    className="text-xl md:text-2xl font-medium leading-relaxed tracking-wide text-gray-800 dark:text-gray-200"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <span
      role="img"
      aria-label="waving hand"

      className="mr-2 inline-block animate-wave"
    >
      👋
    </span>{" "}
    Hello! I&apos;m an enthusiastic
      {" "}
    <span className="text-blue-600 dark:text-blue-400 font-semibold underline decoration-blue-300 decoration-2">
      MCA student
    </span>{" "}
    passionate about technology and innovation. I've honed my skills working
    extensively with the{" "}
    <span className="text-purple-600 dark:text-purple-400 font-semibold">
      MERN stack
    </span>
    ,{" "}
    <span className="text-green-600 dark:text-green-300 font-semibold italic">
      Java
    </span>
    , and{" "}
    <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
      SQL
    </span>
    , crafting scalable applications and clean, efficient APIs. 🚀
    <br />
    <br />
    I thrive on solving real-world challenges through code, designing
    intuitive user interfaces, and delivering seamless user experiences.
    Whether tackling personal projects or collaborating in dynamic teams, I
    prioritize writing clean, maintainable, and high-performance code.✨
  </motion.p>
  <motion.span
    className="block mt-6 text-lg md:text-xl font-semibold text-indigo-600 dark:text-indigo-400"
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }}
  >
    Curious by nature. Creator by choice. Always evolving. 💻
  </motion.span>

  <style jsx>{`
    @keyframes wave {
      0%,
      60%,
      100% {
        transform: rotate(0deg) scale(1);
        filter: drop-shadow(0 0 0 transparent);
        filter: brightness(100%);
      }
      30% {
        transform: rotate(10deg) scale(1.1);
        filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.7));
        filter: brightness(120%);
      }
    }

    .animate-wave {
      display: inline-block;
      transform-origin: 70% 70%;
      animation: wave 2.5s ease-in-out infinite;
    }
  `}</style>
</motion.section>;



        {/* Skills */}
        <section className="mb-20 w-full max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 mb-8 text-center">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {skills.map(skill => (
              <CircularSkill key={skill.name} skill={skill} />
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4 mb-20">
          {highlights.map(({ title }, i) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(59, 130, 246, 0.4)" }}
              transition={{ type: 'spring', stiffness: 280 }}
            >
              <Card className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 cursor-pointer shadow-lg hover:shadow-2xl">
                <CardContent className="text-center select-none">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.3, duration: 1 }}
                    className="text-5xl font-extrabold text-blue-700 dark:text-blue-400 mb-2"
                  >
                    {animatedCounts[i]}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300">{title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>
            {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="max-w-4xl mx-auto w-full mb-20 px-4"
        >
          <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 mb-10 text-center">Projects</h2>
          <div className="flex flex-col space-y-8">
            {/* Project 1 */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(59,130,246,0.3)" }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => window.open('https://github.com/yourgithub/glucopredict', '_blank')}
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-1">Glucopredict – Diabetes Prediction App</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                A Flask & MongoDB-based ML web app predicting diabetes risk from user input.
              </p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://github.com/yourgithub/glucopredict', '_blank') }}>
                View Source <FaArrowRight className="ml-2" />
              </Button>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(59,130,246,0.3)" }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => window.open('https://ivaastu.example.com', '_blank')}
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-1">iVaastu – Interior Designer Platform</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                MERN stack platform for booking interior design services with admin management.
              </p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://github.com/yourgithub/ivaastu', '_blank') }}>
                View Source <FaArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 1 }}
          className="max-w-4xl mx-auto w-full mb-20 px-4"
        >
          <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 mb-8 text-center">Certifications</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 px-4">
            <li>Generative AI: Prompt Engineering Basics – IBM (Coursera)</li>
            <li>Gen AI for Code Generation – Edureka (Coursera)</li>
            <li>AI For Everyone – DeepLearning.AI (Coursera)</li>
            <li>Foundations: Data, Data, Everywhere – Google (Coursera)</li>
            <li>Frontend Development – Internshala Trainings</li>
          </ul>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
