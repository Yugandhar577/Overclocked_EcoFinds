const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");

// -------------------- READ -------------------- //

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

// -------------------- CREATE -------------------- //

// Form to create new product
router.get("/new", (req, res) => {
    res.render("listings/new");
});

// Handle creation
router.post("/new", async (req, res) => {
    const { name, description, price, image } = req.body;

    if (!name || !description || !price) {
        return res.status(400).send("All fields are required");
    }

    try {
        const newListing = new Listing({ name, description, price, image });
        await newListing.save();
        res.redirect("/products");
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- UPDATE -------------------- //

// Form to edit product
router.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).send("Product not found");
        res.render("listings/edit", { listing });
    } catch (err) {
        console.error("Error loading edit form:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Handle update
router.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            id,
            { name, description, price, image },
            { new: true }
        );
        if (!updatedListing) return res.status(404).send("Product not found");
        res.redirect(`/products/${id}`);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Internal Server Error");
    }
});

// -------------------- DELETE -------------------- //

router.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    try {
        await Listing.findByIdAndDelete(id);
        res.redirect("/products");
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
