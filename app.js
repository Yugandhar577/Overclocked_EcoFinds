    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    const Listing = require('./Models/listings.js');
    const path = require('path');
    const methodOverride = require('method-override');
    const ejsMate = require('ejs-mate');

    main().then(() =>{
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.error("Error connecting to MongoDB", err);
    });

    async function main(){
        await mongoose.connect('mongodb://localhost:27017/FullStackAIRBNB');
    }

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.urlencoded({ extended: true }));
    app.use(methodOverride("_method"));
    app.engine("ejs", ejsMate);
    app.use(express.static(path.join(__dirname, 'public')));

    // login 
    app.get("/", async (req, res) => {
        try {
            const users = await User.find({});
            res.render("login", { users });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).send("Internal Server Error");
        }
    });









    app.listen(8080, () => {
    console.log("server is listening to port 8080");
    });