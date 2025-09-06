const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");

// View cart
router.get("/", async (req, res) => {
    try {
        // for now, mock cart items
        const cartItems = await Listing.find({});
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
        // In real case: req.session.cart.push(item)
        res.redirect("/cart");
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
