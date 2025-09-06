const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");

// View cart
router.get("/", async (req, res) => {
    try {
        // Initialize cart if not present
        if (!req.session.cart) req.session.cart = [];

        const cartItems = await Listing.find({
            _id: { $in: req.session.cart }
        });

        res.render("listings/cart", { cartItems });
    } catch (err) {
        console.error("Error loading cart:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Add item to cart
router.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Listing.findById(id);
        if (!item) return res.status(404).send("Item not found");

        if (!req.session.cart) req.session.cart = [];

        // Add item ID if not already in cart
        if (!req.session.cart.includes(id)) {
            req.session.cart.push(id);
        }

        res.redirect("/cart");
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).send("Internal Server Error");
    }
});

// Remove item from cart
router.post("/remove/:id", (req, res) => {
    const { id } = req.params;

    if (!req.session.cart) req.session.cart = [];

    // Remove the item by filtering out the id
    req.session.cart = req.session.cart.filter(itemId => itemId !== id);

    res.redirect("/cart");
});

module.exports = router;
