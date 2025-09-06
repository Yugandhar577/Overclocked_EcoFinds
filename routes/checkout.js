const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");

// GET checkout page
router.get("/", async (req, res) => {
    try {
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.redirect("/cart");
        }

        const cartItems = await Listing.find({
            _id: { $in: req.session.cart }
        });

        // Calculate subtotal
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

        // GST (18%)
        const gst = +(subtotal * 0.18).toFixed(2);

        // Total including GST
        const total = +(subtotal + gst).toFixed(2);

        res.render("checkout/index", { cartItems, subtotal, gst, total });
    } catch (err) {
        console.error("Error loading checkout:", err);
        res.status(500).send("Internal Server Error");
    }
});

// POST checkout (process purchase)
router.post("/", (req, res) => {
    try {
        if (!req.session.cart || req.session.cart.length === 0) {
            return res.redirect("/cart");
        }

        // Clear cart after checkout
        req.session.cart = [];

        // Render success page
        res.render("checkout/success");
    } catch (err) {
        console.error("Error processing checkout:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
