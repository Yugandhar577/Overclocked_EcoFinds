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


    app.get("/", (req, res) => {
        res.redirect("/listings");
    });









    app.listen(7070, () => {
    console.log("server is listening to port 7070");
    });