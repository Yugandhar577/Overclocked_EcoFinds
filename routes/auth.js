const express = require("express");
const app = express();
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
