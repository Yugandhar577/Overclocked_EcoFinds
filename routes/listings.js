const express = require("express");
const app = express();
const Listing = require("../models/listings"); // Schema file

// -------------------- READ -------------------- //

// All listings (GET /listings)
app.get("/listings", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index", { listings }); 
    } catch (err) {
        console.error("Error fetching listings:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Show single listing (GET /listings/:id)
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send("Listing not found");
        res.render("listings/show", { listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- CREATE -------------------- //

// Form (GET /listings/new)
app.get("/listings/new", (req, res) => {
    res.render("listings/new");
});

// Handle creation (POST /listings)
app.post("/listings", async (req, res) => {
    const { title, description, price, images } = req.body;

    if (!title || !description || !price) {
        return res.status(400).send("All fields are required");
    }

    try {
        const newListing = new Listing({
            title,
            description,
            price,
            images: images && Array.isArray(images) ? images : [images]
        });

        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.error("Error creating listing:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- UPDATE -------------------- //

// Edit form
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send("Listing not found");
        res.render("listings/edit", { listing });
    } catch (err) {
        console.error("Error loading edit form:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Handle update
app.post("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, images } = req.body;

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { title, description, price, images: Array.isArray(images) ? images : [images] },
            { new: true }
        );
        if (!updatedListing) return res.status(404).send("Listing not found");
        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error("Error updating listing:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- DELETE -------------------- //

app.post("/listings/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        await Listing.findByIdAndDelete(id);
        res.redirect("/listings");
    } catch (err) {
        console.error("Error deleting listing:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
