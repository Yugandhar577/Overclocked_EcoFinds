const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("../models/users");

// -------------------- GET ROUTES -------------------- //

// Render login page
app.get("/login", (req, res) => {
    res.render("auth/login"); 
});

// Render signup page
app.get("/signup", (req, res) => {
    res.render("auth/signUp");
});

// -------------------- POST ROUTES -------------------- //

// Handle signup
app.post("/signup", async (req, res) => {
    const { name, userId, email, password } = req.body;

    if (!name || !userId || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        // Check if userId or email already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
        if (existingUser) {
            return res.status(400).send("UserId or email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            userId,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Start session
        req.session.userId = user._id;

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle login
app.post("/login", async (req, res) => {
    const { loginId, password } = req.body; // loginId can be email or userId

    if (!loginId || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        // Find user by email or userId
        const user = await User.findOne({ $or: [{ email: loginId }, { userId: loginId }] });
        if (!user) {
            return res.status(400).send("User not found. Please sign up first.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid credentials");
        }

        // Start session
        req.session.userId = user._id;

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle logout
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error logging out:", err);
            return res.status(500).send("Could not log out");
        }
        res.redirect("/auth/login");
    });
});

module.exports = app;
