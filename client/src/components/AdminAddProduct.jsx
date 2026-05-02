import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";

function AdminAddProduct() {
  const { userInfo } = useAuth();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:45690/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product added successfully!");

      // Reset
      setName("");
      setPrice("");
      setDescription("");
      setCategory("Men");
      setStock("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Add <span className="text-red-600">New Product</span>
      </h2>

      <form onSubmit={submitHandler} className="space-y-6">

        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="w-full border rounded-lg px-4 py-2"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-40 rounded-lg object-cover border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-black"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;