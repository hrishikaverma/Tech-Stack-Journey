'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSubmitted(false)
    setLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-lg border transition-all
     ${
       error && !formData[field] 
         ? 'border-red-500 focus:ring-red-500'
         : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
     }
     bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2`

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-20 sm:px-6 overflow-hidden pt-28 sm:pt-32">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-2xl z-10 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 sm:p-12 border border-blue-100 dark:border-gray-700"
          aria-live="polite"
          role="form"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight">
              Contact Me
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              I&apos;d love to hear from you. Fill out the form below to get started.
            </p>
          </motion.div>

          {submitted && (
            <motion.p
              className="mb-6 text-green-700 font-semibold text-center bg-green-100 dark:bg-green-900 rounded-lg py-3 px-5 shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
            >
              ✅ Thank you for your message! I’ll get back to you soon.
            </motion.p>
          )}

          {error && (
            <motion.p
              className="mb-6 text-red-700 font-semibold text-center bg-red-100 dark:bg-red-900 rounded-lg py-3 px-5 shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
            >
              ❌ {error}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="relative">
              <label htmlFor="name" className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                aria-required="true"
                aria-invalid={error && !formData.name ? 'true' : 'false'}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={inputClass('name')}
                autoComplete="name"
                disabled={loading}
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                aria-required="true"
                aria-invalid={error && !formData.email ? 'true' : 'false'}
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass('email')}
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                aria-required="true"
                aria-invalid={error && !formData.message ? 'true' : 'false'}
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                className={inputClass('message')}
                disabled={loading}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-lg shadow-lg
                ${
                  loading
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:from-blue-700 hover:to-indigo-700'
                } transition-all select-none`}
            >
              {loading ? (
                <FaSpinner className="animate-spin text-white" />
              ) : (
                <FaPaperPlane className="text-white" />
              )}
              {loading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
