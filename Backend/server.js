const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");

const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());
app.use(cors()); // ✅ Enable CORS to allow frontend requests

// ✅ Use Routes
app.use("/users", userRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/customerSupportDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
