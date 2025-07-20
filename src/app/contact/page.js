'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

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
      <main className="p-8 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

        {submitted && <p className="mb-4 text-green-600">Thank you for your message! I will get back to you soon.</p>}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              rows="5"
              placeholder="Your message here..."
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </main>
    </>
  )
}
