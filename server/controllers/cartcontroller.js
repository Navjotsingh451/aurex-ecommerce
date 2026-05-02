const Cart = require("../models/cart");

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { product } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId: product._id, name: product.name, price: product.price, image: product.image, qty: 1 }],
      });
    } else {
      const exist = cart.items.find(
        (item) => item.productId.toString() === product._id.toString()
      );

      if (exist) {
        exist.qty += 1;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== req.params.productId
      );
      await cart.save();
    }

    res.json({ items: cart ? cart.items : [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Cart Item Quantity
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const item = cart.items.find(
        (item) => item.productId.toString() === req.params.productId
      );
      if (item) {
        item.qty = qty;
        if (qty <= 0) {
          cart.items = cart.items.filter(
            (i) => i.productId.toString() !== req.params.productId
          );
        }
        await cart.save();
      }
    }

    res.json({ items: cart ? cart.items : [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItem, clearCart };