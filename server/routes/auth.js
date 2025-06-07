const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body.userData;
    
    const existingEmail = await User.findOne({ email });

    if (existingEmail)
      return res.status(400).json({ msg: "Email already in use" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ msg: "Username already taken" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashed });
    console.log(user);
    await user.save();
    res.status(201).json({ msg: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; 

    // Find user by email or username
    const user = await User.findOne({
        username: username.toLowerCase()
    });

    if (!user) return res.status(400).json({ msg: "Invalid username" });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
