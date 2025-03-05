const express = require("express");
const app = express();
const router = express.Router();
const users = require("../Models/userModel");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const user = await users.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching data",
    });
  }
});

router.post("/", async (req, res) => {
  const { firstName, lastName, email, userName, age } = req.body;
  if (!firstName || !lastName || !email || !userName || !age) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  try {
    const newUser = new users({ firstName, lastName, email, userName, age });
    await newUser.save();
    res.json({
      message: "New user saved",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in posting data",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, userName, age } = req.body;

  try {
    const updatedUser = await users.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        userName,
        age,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        message: 'Erorr in updating data'
    })
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await users.findByIdAndDelete(id)
    if(!deletedUser){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    res.json({
      success: true,
      message: `User with ${id} deleted`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in deleting data",
    });
  }
});

module.exports = router;