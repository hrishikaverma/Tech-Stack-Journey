'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer";
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSubmitted(false)

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.')
      console.error(err)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 border border-blue-100 dark:border-gray-700"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8"
          >
            Contact Me
          </motion.h1>

          {submitted && (
            <motion.p
              className="mb-6 text-green-600 font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Thank you for your message! I will get back to you soon.
            </motion.p>
          )}

          {error && (
            <motion.p
              className="mb-6 text-red-600 font-medium text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium text-gray-700 dark:text-gray-200 mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your message here..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
