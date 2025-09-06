const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");

// All products
router.get("/", async (req, res) => {
    try {
        const listings = await Listing.find({});
        res.render("listings/index", { listings });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

// New product form
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// Show single product
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send("Product not found");
        res.render("listings/show", { listing });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
