import { createContext, useContext, useEffect, useState} from "react";
import { useAuth } from "./authcontext";
import axios from "axios";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo?._id) return;

      const { data } = await axios.get(
        `http://localhost:45690/api/cart/${userInfo._id}`
      );

      setCartItems(data.items || []);
    };

    fetchCart();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      setCartItems([]);
      localStorage.removeItem("cartItems");
    }
  }, [userInfo]);
  const addToCart = async (product) => {
    const { data } = await axios.post(
      "http://localhost:45690/api/cart/add",
      {
        userId: userInfo._id,
        product,
      }
    );

    setCartItems(data.items);
  };


  const removeFromCart = async (productId) => {
    const { data } = await axios.delete(
      `http://localhost:45690/api/cart/${userInfo._id}/${productId}`
    );

    setCartItems(data.items || []);
  };

  const updateQty = async (productId, newQty) => {
    const { data } = await axios.put(
      `http://localhost:45690/api/cart/${userInfo._id}/${productId}`,
      { qty: newQty }
    );
    setCartItems(data.items || []);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
