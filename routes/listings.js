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


// -------------------- INDEX + SORT -------------------- //

// All products (with sorting support)
app.get("/", async (req, res) => {
    try {
        let sortOption = {};
        const { sort } = req.query;

        if (sort === "price_low_high") {
            sortOption = { price: 1 }; // ascending
        } else if (sort === "price_high_low") {
            sortOption = { price: -1 }; // descending
        } else {
            sortOption = { createdAt: -1 }; // latest by default (assuming schema has timestamps)
        }

        const listings = await Listing.find({}).sort(sortOption);
        res.render("listings/index", { listings });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- SEARCH -------------------- //

app.get("/search", async (req, res) => {
    const { q } = req.query;
    try {
        const listings = await Listing.find({
            name: { $regex: q, $options: "i" } // case-insensitive search
        });
        res.render("listings/search", { listings, query: q });
    } catch (err) {
        console.error("Error searching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/myListings", async (req, res) => {
    try {
        // Assuming req.user._id holds the logged-in user’s ID (e.g., from Passport.js)
        const userId = req.user ? req.user._id : null;

        if (!userId) {
            return res.redirect("/login"); // redirect to login if not logged in
        }

        const myListings = await Listing.find({ createdBy: userId });
        res.render("listings/myListings", { listings: myListings });
    } catch (err) {
        console.error("Error fetching user listings:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = app;
