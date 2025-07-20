"use client"

import React, { useState, useEffect } from 'react';
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

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    let end = target;
    let increment = end / (duration / 30);
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const circleRadius = 50;
const circleCircumference = 2 * Math.PI * circleRadius;

function CircularSkill({ skill }) {
  const { name, level } = skill;
  const ref = React.useRef(null);
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
      {darkMode ? (
        <FaSun size={24} className="text-yellow-400" />
      ) : (
        <FaMoon size={24} className="text-gray-600" />
      )}
    </nav>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

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
          className="flex flex-col items-center text-center mb-20 px-4"
        >
          <motion.img
            src={PROFILE_PHOTO}
            alt="Hrishika Verma"
            className="rounded-full w-30 h-40 mb-6 shadow-lg border-4 border-blue-500 dark:border-blue-400 object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
          <h1 className="text-5xl font-extrabold text-blue-900 dark:text-blue-400 mb-3">Hrishika Verma</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Full Stack Developer | MERN Stack | MCA Student</p>
          <div className="flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400 text-sm mb-6 select-none">
            <div className="flex items-center gap-2"><FaPhone /> +91 9131335013</div>
            <div className="flex items-center gap-2"><FaEnvelope /> hrishikaverma71@gmail.com</div>
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaGithub /> GitHub
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
          <Button variant="outline" onClick={() => window.open('/resume.pdf')} className="mx-auto select-none">
            Download Resume
          </Button>
        </motion.section>

        {/* Summary */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="max-w-4xl mx-auto mb-16 text-gray-800 dark:text-gray-200 text-center px-4"
        >
          <p className="text-lg leading-relaxed select-text">
            MCA student with strong practical experience in MERN stack, Java, and SQL. Skilled in building and deploying full-stack applications, RESTful APIs, UI/UX principles, and database design. Delivered multiple academic and internship projects focused on clean code, performance optimization, and collaborative development. Passionate about continuous learning and problem-solving.
          </p>
        </motion.section>

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
          {highlights.map(({ title, count }, i) => {
            const animatedCount = useCountUp(count)
            return (
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
                      {animatedCount}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300">{title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
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
  )
}
 