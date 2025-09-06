const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Login page
router.get("/login", async (req, res) => {
    try {
        const users = await User.find({});
        res.render("auth/login", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Signup page
router.get("/signup", (req, res) => {
    res.render("auth/signUp");
});

module.exports = router;
