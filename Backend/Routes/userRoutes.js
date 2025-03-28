const express = require("express");
const router = express.Router();
const User = require("../Models/userModel"); // ✅ Correct Model Import

router.use(express.json());

// 🔹 GET All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching data",
    });
  }
});

// 🔹 SIGNUP (POST Request) ✅ Fixed Route to `/signup`
router.post("/signup", async (req, res) => {
  console.log("🟢 Received Signup Request:");
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body); // ✅ Log the received data

  const { firstName, lastName, email, username, age } = req.body;

  // 🔹 Check if all fields are provided
  if (!firstName || !lastName || !email || !username || !age) {
    console.log("❌ Missing fields");
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    console.log("🔎 Checking if user exists...");
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ success: false, message: "User with this email already exists!" });
    }

    console.log("✅ Creating new user...");
    const newUser = new User({ firstName, lastName, email, username, age });

    await newUser.save(); // ✅ Save to MongoDB

    console.log("🎉 User registered successfully!");
    res.status(201).json({ success: true, message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("❌ Error in saving user:", error.message);
    res.status(500).json({ success: false, message: `Error in saving user: ${error.message}` });
  }
});


// 🔹 UPDATE User by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, username, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, username, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in updating user",
    });
  }
});

// 🔹 DELETE User by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: `User with ID ${id} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in deleting user",
    });
  }
});

module.exports = router;
