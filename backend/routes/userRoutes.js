import express from "express";
const router = express.Router();
import User from "../models/user.js";
// Route for Save a new Book
router.post("/createUser", async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user object
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
