const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const jokeRoutes = require("./Routes/jokeRoutes");
const mysqlConnection = require("./db-mysql"); 
const cookieParser = require("cookie-parser");
// Import MySQL connection
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/users", userRoutes);
app.use("/jokes", jokeRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// MySQL Connection
mysqlConnection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
