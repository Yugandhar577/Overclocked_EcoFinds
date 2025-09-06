const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Models
const Listing = require('./models/listings');
const User = require('./models/users');

// Routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const listingsRoutes = require('./routes/listings');

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
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

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

// ---------------- Server ----------------
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
module.exports = app;