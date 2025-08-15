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

      <main className="min-h-screen pt-36 px-4 sm:px-6 pb-20 max-w-7xl mx-auto bg-gradient-to-br from-[#f0f4ff] via-white to-[#f5faff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
        {/* Hero Section */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="flex flex-col items-center justify-center mb-24 px-6 relative z-10"
>
  {/* Profile Image */}
  <Image
    src={PROFILE_PHOTO}
    alt="Hrishika Verma"
    width={140}
    height={160}
    className="rounded-full mb-5 shadow-lg border-4 border-blue-500 dark:border-blue-400 object-cover"
  />

  {/* Name */}
  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center">
    Hrishika&nbsp;Verma
  </h1>

  {/* Cinematic Typewriter Animation */}
  <div className="text-center leading-snug font-semibold text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl mt-2">
    <p className="typing-line1 border-r-2 pr-2 overflow-hidden">
      Full Stack Developer
    </p>
    <p className="typing-line2 border-r-2 pr-2 overflow-hidden mt-1">
      MERN Stack | MCA Student
    </p>
  </div>

  {/* Contact & Social Links */}
  <div className="flex flex-wrap justify-center gap-6 text-sm mb-8 mt-6">
    {/* Email */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-purple-300 dark:hover:shadow-purple-800 transition duration-300 group cursor-pointer"
      title="Email me"
      onClick={() => window.open("mailto:hrishika.verma.mca2025@gmail.com")}
    >
      <FaEnvelope className="text-purple-600 group-hover:animate-pulse" />
      <span className="text-gray-800 dark:text-gray-300 font-medium">
        hrishika.verma.mca2025@gmail.com
      </span>
    </motion.div>

    {/* GitHub */}
    <motion.a
      whileHover={{ scale: 1.05 }}
      href="https://github.com/hrishikaverma/"
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
      href="https://www.linkedin.com/in/hrishika9131335013/"
      target="_blank"
      rel="noopener noreferrer"
      title="Connect on LinkedIn"
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-md hover:shadow-blue-400 dark:hover:shadow-blue-700 transition duration-300 group"
    >
      <FaLinkedin className="text-blue-700 dark:text-blue-400 group-hover:text-blue-900" />
      <span className="text-gray-800 dark:text-gray-300 font-medium">LinkedIn</span>
    </motion.a>
  </div>

  {/* Download Resume */}
  <button
    onClick={() => window.open('/resume.pdf')}
    className="mt-4 px-6 py-2 text-white font-medium rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg border border-transparent hover:from-purple-500 hover:to-blue-600 transition-all duration-300 animate-fade-in"
  >
    🚀 Download Resume
  </button>

  {/* Cinematic Typewriter CSS */}
  <style jsx>{`
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    @keyframes blink {
      0%, 50%, 100% { border-color: transparent }
      25%, 75% { border-color: currentColor }
    }

    /* First line animation */
    .typing-line1 {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      animation:
        typing 2.5s steps(25) 0.5s forwards,
        blink 0.75s step-end infinite 3s; /* blink starts after typing ends */
    }

    /* Second line starts after first finishes + blink delay */
    .typing-line2 {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      opacity: 0;
      animation:
        fadeIn 0.1s linear 4s forwards, /* appear after delay */
        typing 2.2s steps(28) 4s forwards,
        blink 0.75s step-end infinite 6.3s;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }

    /* Mobile adjustments */
    @media (max-width: 640px) {
      .typing-line1 {
        animation:
          typing 2s steps(20) 0.5s forwards,
          blink 0.75s step-end infinite 2.5s;
      }
      .typing-line2 {
        animation:
          fadeIn 0.1s linear 3s forwards,
          typing 1.8s steps(22) 3s forwards,
          blink 0.75s step-end infinite 4.8s;
      }
    }
  `}</style>
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
    passionate about technology and innovation. I&apos;ve honed my skills working
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
              onClick={() => window.open('https://glucopredic1.streamlit.app/', '_blank')}
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-1">Glucopredict – Diabetes Prediction App</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                A Flask & MongoDB-based ML web app predicting diabetes risk from user input.
              </p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://github.com/hrishikaverma/diabetes-prediction', '_blank') }}>
                View Source <FaArrowRight className="ml-2" />
              </Button>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(59,130,246,0.3)" }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => window.open('https://interior-vaastu.netlify.app/', '_blank')}
            >
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-1">iVaastu – Interior Designer Platform</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                MERN stack platform for booking interior design services with admin management.
              </p>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); window.open('https://github.com/hrishikaverma/interior-vaastu', '_blank') }}>
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
  transition={{ delay: 0.4, duration: 1 }}
  className="max-w-5xl mx-auto w-full mb-20 px-4"
>
  <h2 className="text-3xl font-semibold text-blue-800 dark:text-blue-400 mb-10 text-center">
    Certifications
  </h2>

  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {[
      {
        title: "Generative AI: Prompt Engineering Basics – IBM (Coursera)",
        logo: "/cert-logos/ibm.jpeg", // Place your logo in public/cert-logos/
        link: "https://coursera.org/verify/your-certificate-id1",
      },
      {
        title: "Gen AI for Code Generation – Edureka (Coursera)",
        logo: "/cert-logos/edureka.png",
        link: "https://coursera.org/verify/your-certificate-id2",
      },
      {
        title: "AI For Everyone – DeepLearning.AI (Coursera)",
        logo: "/cert-logos/deeplearningai.jpeg",
        link: "https://coursera.org/verify/your-certificate-id3",
      },
      {
        title: "Foundations: Data, Data, Everywhere – Google (Coursera)",
        logo: "/cert-logos/google.jpeg",
        link: "https://coursera.org/verify/your-certificate-id4",
      },
      {
        title: "Frontend Development – Internshala Trainings",
        logo: "/cert-logos/internshala.jpeg",
        link: "https://internshala.com/verify/your-certificate-id5",
      },
    ].map((cert, index) => (
      <motion.a
        key={index}
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, rotate: 0.5 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-start gap-4"
      >
        <img
          src={cert.logo}
          alt="logo"
          className="w-10 h-10 object-contain mt-1"
        />
        <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-relaxed">
          {cert.title}
        </p>
      </motion.a>
    ))}
  </div>
</motion.section>

      </main>

      <Footer />
    </>
  );
}
