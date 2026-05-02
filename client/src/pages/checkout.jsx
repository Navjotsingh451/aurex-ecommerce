import { useState } from "react";
import PageHeader from "../components/pageheader";
import { useCart } from "../context/cartcontext";
import axios from "axios";
import API_URL from "../api";

function Checkout() {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.address
    ) {
      alert("Please fill all required fields");
      return;
    }

    const orderData = {
      customer: formData,
      items: cartItems,
      total: totalPrice
    };

    try {
      // 👉 If backend exists
// await axios.post(`${API_URL}/api/orders`, orderData);

      console.log("Order Placed:", orderData);
      alert("Order placed successfully ✅");

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  // EMPTY CART CHECK
  if (cartItems.length === 0) {
    return (
      <p className="text-center py-20 text-xl">
        Your cart is empty 🛒
      </p>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" />

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12">

        {/* LEFT - FORM */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">
            Billing Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              name="firstName"
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              className="border p-3 rounded-md w-full"
            />

            <input
              name="lastName"
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              className="border p-3 rounded-md w-full"
            />

            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="border p-3 rounded-md w-full md:col-span-2"
            />

            <input
              name="phone"
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              className="border p-3 rounded-md w-full md:col-span-2"
            />

            <input
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Address"
              className="border p-3 rounded-md w-full md:col-span-2"
            />

            <input
              name="city"
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="border p-3 rounded-md w-full"
            />

            <input
              name="postalCode"
              onChange={handleChange}
              type="text"
              placeholder="Postal Code"
              className="border p-3 rounded-md w-full"
            />

          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-gray-100 p-8 rounded-lg h-fit">
          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>
                    {item.name} × {item.qty}
                  </span>
                </div>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-black text-white py-3 rounded-md hover:opacity-80 transition"
          >
            Place Order
          </button>
        </div>

      </section>
    </>
  );
}

export default Checkout;