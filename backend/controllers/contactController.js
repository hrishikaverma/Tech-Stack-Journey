// controllers/contactController.js
const { createContact } = require("../models/contactModel");

const handleContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const contact = await createContact(name, email, message);
    res.status(201).json({ message: "Contact saved successfully", contact });
  } catch (error) {
    console.error("Contact Form Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleContactForm };
