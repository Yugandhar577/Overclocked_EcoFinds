const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

// Models
const Listing = require('./models/listings');
const User = require('./models/users');

// Routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const listingsRoutes = require('./routes/listings');
const checkoutRoutes = require('./routes/checkout');

// ---------------- MongoDB Connection ----------------
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/EcoFinds');
}

// ---------------- App Config ----------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: "ecoFindsSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/EcoFinds" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// ---------------- Use Routes ----------------
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/listings", listingsRoutes);
app.use("/checkout", checkoutRoutes);

// ---------------- Home Route ----------------
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// needto set up a middleware for the login process to check if the user is logged in before accessing certain routes

// -------------------- CREATE -------------------- //

// Handle creation (POST /listings)
app.post("/listings", async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log("New listing saved:", newListing);
    res.redirect("/listings"); 
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).send("Internal Server Error");
  }
});


// Handle signup
app.post("/users", async (req, res) => {
    try {
        const saveduser = new User(req.body.user);
        const savedUser = await saveduser.save();
        req.session.userId = savedUser._id;
        res.redirect("/listings");
    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle login
app.post("/login", async (req, res) => {
    const { loginId, password } = req.body; // loginId can be email

    if (!loginId || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        // Find user by email
        const user = await User.findOne({ email: loginId });
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


// ---------------- Server ----------------
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
module.exports = app;