    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    const Listing = require('./Models/listings.js');
    const path = require('path');
    const methodOverride = require('method-override');
    const ejsMate = require('ejs-mate');
    const session = require("express-session");
    const MongoStore = require("connect-mongo");
    const User = require("./Models/User"); 

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

    app.use(session({
    secret: "ecoFindsSecretKey", // in production, use process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/FullStackAIRBNB" }), 
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
    }));



    app.get("/", (req, res) => {
        res.send("Hello from Express");
    });









    app.listen(8080, () => {
    console.log("server is listening to port 8080");
    });
