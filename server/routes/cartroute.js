const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = require("../controllers/cartcontroller");

const router = express.Router();

// GET user cart (authenticated)
router.get("/", protect, getCart);

// ADD to cart
router.post("/add", protect, addToCart);

// REMOVE item
router.delete("/:productId", protect, removeFromCart);

// UPDATE item qty
router.put("/:productId", protect, updateCartItem);

// CLEAR cart
router.delete("/", protect, clearCart);

module.exports = router;