import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import PageHeader from "../components/pageheader";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { userInfo } = useAuth();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:45690/api/products/${id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <>
      <PageHeader title={product.name} />

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-120 object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT INFO */}
        <div>
          <p className="text-xs tracking-widest font-bold text-red-800 uppercase mb-2">
          {product.category}
        </p>

          <h2 className="text-3xl font-bold mb-5">
            {product.name}
          </h2>

          <p className="text-2xl text-black mb-6 font-semibold">
            Rs. {product.price}
          </p>

          <p className="text-grey-100 leading-relaxed mb-8">
            {product.description || "Premium quality fashion piece designed for modern style and comfort."}
          </p>

          {/* Quantity */}
          <div className="flex items-center justify-between gap-4 pl-10 mb-8">
            <span className="text-md uppercase opacity-80 font-bold tracking-[.22rem] ">Quantity</span>

            <input
              type="number"
              value={qty}
              min="1"
              onChange={(e) => setQty(Number(e.target.value))}
              className="border rounded-full w-20 p-2 text-center"
            />
          </div>
          {/* {/sizes} */}
          <div className="flex items-center justify-between gap-4 mb-8 pl-10">
            <span className="text-md uppercase opacity-80 font-bold tracking-[.22rem] ">size</span>
            <select className="border rounded-full w-20  p-2 text-center">
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* Buttons */}
          {!userInfo?.isAdmin && (
            <button
              onClick={() => addToCart(product, qty)}
              className="w-full md:w-auto px-10 py-3 bg-black text-white hover:opacity-80 transition"
            >
              Add to Cart
            </button>
          )}

          {userInfo?.isAdmin && (
            <button
              onClick={() => (window.location.href = "/admindashboard")}
              className="px-10 py-3 rounded-4xl bg-black text-white"
            >
              Edit Product
            </button>
          )}
        </div>

      </section>
    </>
  );
}

export default ProductDetails;