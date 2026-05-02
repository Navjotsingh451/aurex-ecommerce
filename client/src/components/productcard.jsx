import { useState } from "react";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { userInfo } = useAuth();
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await addToCart(product);
    setTimeout(() => setAddingToCart(false), 600);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* IMAGE */}
      <div className="relative bg-gray-100 p-4">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-contain"
          />
        </Link>
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">

        {/* CATEGORY */}
        <p className="text-xs tracking-widest text-red-600 font-bold uppercase">
          {product.category}
        </p>

        {/* NAME */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold mt-1 hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* PRICE BADGE */}
        <div className="mt-3">
          <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-semibold">
            ₹{product.price}
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-4 justify-center">

          <Link to={`/product/${product._id}`}>
            <button className="px-4 py-2 text-sm border rounded-full hover:bg-gray-100">
              View Details
            </button>
          </Link>

          {!userInfo?.isAdmin && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`px-4 py-2 text-sm rounded-full transition ${
                addingToCart
                  ? "bg-black text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {addingToCart ? "Added" : "Add to Cart"}
            </button>
          )}

          {userInfo?.isAdmin && (
            <button
              onClick={() => (window.location.href = "/admin")}
              className="px-4 py-2 text-sm rounded-full bg-black text-white"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;