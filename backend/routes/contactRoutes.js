// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const { handleContactForm } = require("../controllers/contactController");

// Bas root '/' pe POST route define karo
router.post("/", handleContactForm);

module.exports = router;
