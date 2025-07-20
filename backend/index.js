// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db"); // DB connection test
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Test Route
app.get("/", (req, res) => {
  res.send("🚀 Portfolio backend is running");
});

// API Routes
app.use("/api/contact", contactRoutes);//contact


// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is listening on port ${PORT}`);
});
