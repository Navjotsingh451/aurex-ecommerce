import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import AdminAddProduct from "../components/AdminAddProduct";
import EditProductModal from "../components/EditProductModal";

function AdminDashboard() {
  const { userInfo } = useAuth();
  const [section, setSection] = useState("overview");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [slides, setSlides] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  const [editingSlide, setEditingSlide] = useState(null);

  const [filterCategory, setFilterCategory] = useState("All");

  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    isActive: true,
  });

  const filteredProducts = products.filter(
    (p) => filterCategory === "All" || p.category === filterCategory,
  );

  // FETCH PRODUCTS
  useEffect(() => {
    if (section === "manage") {
      axios
        .get("http://localhost:45690/api/products")
        .then((res) => setProducts(res.data));
    }
  }, [section]);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:45690/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  // FETCH ORDERS
  useEffect(() => {
    if (section === "orders") {
      axios
        .get("http://localhost:45690/api/orders", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => setOrders(res.data));
    }
  }, [section, userInfo]);

  // FETCH HERO
  useEffect(() => {
    if (section === "hero") {
      axios
        .get("http://localhost:45690/api/hero")
        .then((res) => setSlides(res.data));
    }
  }, [section]);

  // ADD HERO
  const addSlide = async () => {
    const formData = new FormData();
    formData.append("title", newSlide.title);
    formData.append("subtitle", newSlide.subtitle);
    formData.append("isActive", newSlide.isActive);
    formData.append("image", newSlide.image);

    const { data } = await axios.post(
      "http://localhost:45690/api/hero",
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setSlides([...slides, data]);
    setNewSlide({ title: "", subtitle: "", isActive: true });
  };

  // DELETE HERO
  const deleteSlide = async (id) => {
    await axios.delete(`http://localhost:45690/api/hero/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    setSlides(slides.filter((s) => s._id !== id));
  };

  // TOGGLE ACTIVE
  const toggleActive = async (slide) => {
    const { data } = await axios.put(
      `http://localhost:45690/api/hero/${slide._id}`,
      { isActive: !slide.isActive },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );

    setSlides(slides.map((s) => (s._id === slide._id ? data : s)));
  };

  // EDIT HERO
  const saveEditedSlide = async () => {
    const formData = new FormData();
    formData.append("title", editingSlide.title);
    formData.append("subtitle", editingSlide.subtitle);
    formData.append("isActive", editingSlide.isActive);

    if (editingSlide.image instanceof File) {
      formData.append("image", editingSlide.image);
    }

    const { data } = await axios.put(
      `http://localhost:45690/api/hero/${editingSlide._id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    setSlides(slides.map((s) => (s._id === data._id ? data : s)));
    setEditingSlide(null);
  };

  // REORDER
  const moveSlide = async (index, direction) => {
    const newSlides = [...slides];
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;

    [newSlides[index], newSlides[target]] = [
      newSlides[target],
      newSlides[index],
    ];

    setSlides(newSlides);

    await axios.put(
      "http://localhost:45690/api/hero/reorder",
      { slides: newSlides.map((s, i) => ({ id: s._id, order: i })) },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100 mt-2 mb-2">
      <aside className="w-64 bg-black text-white p-6 rounded-2xl hidden md:block">
        <h2 className="text-2xl font-bold text-red-500 mb-8">Admin Panel</h2>

        {["overview", "add", "manage", "orders", "hero"].map((item) => (
          <button
            key={item}
            onClick={() => setSection(item)}
            className={`block w-full text-left px-3 py-2 rounded-md transition ${
              section === item ? "bg-red-600" : "hover:bg-gray-800"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6  bg-white/80 border border-gray-200 rounded-2xl shadow hover:shadow-xl  transition">
        {section === "overview" && (
          <div>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setSection("add")}
                className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">Add Product</h2>
                <p className="text-gray-500 mt-2">Create new store product</p>
              </div>

              <div
                onClick={() => setSection("manage")}
                className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <p className="text-gray-500 mt-2">
                  {products.length} products in store
                </p>
              </div>

              <div
                onClick={() => setSection("orders")}
                className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">Orders</h2>
                <p className="text-gray-500 mt-2">
                  {orders.length} orders received
                </p>
              </div>

              <div
                onClick={() => setSection("hero")}
                className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">Hero Slider</h2>
                <p className="text-gray-500 mt-2">
                  {slides.length} slides active
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ADD PRODUCT */}
        {section === "add" && (
          <AdminAddProduct products={products} setProducts={setProducts} />
        )}

        {/* MANAGE PRODUCTS */}
        {section === "manage" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold">Filter:</label>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="All">All</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Jackets">Jackets</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <table className="w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-3">
                      <img
                        src={`http://localhost:45690/uploads/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="p-3 font-semibold">{product.name}</td>
                    <td className="p-3">{product.category}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3">{product.countInStock}</td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ORDERS */}
        {section === "orders" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Orders</h1>

            {orders.map((order) => (
              <div key={order._id} className="bg-white p-4 rounded shadow mb-3">
                <p>Order ID: {order._id}</p>
                <p>Total: ${order.totalPrice}</p>
              </div>
            ))}
          </div>
        )}

        {section === "hero" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Manage Hero Slider</h1>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <input
                type="text"
                placeholder="Title"
                value={newSlide.title}
                onChange={(e) =>
                  setNewSlide({ ...newSlide, title: e.target.value })
                }
                className="border p-2 w-full mb-3 rounded-xl"
              />

              <input
                type="text"
                placeholder="Subtitle"
                value={newSlide.subtitle}
                onChange={(e) =>
                  setNewSlide({ ...newSlide, subtitle: e.target.value })
                }
                className="border p-2 w-full mb-3 rounded-xl"
              />

              <input
                type="file"
                onChange={(e) =>
                  setNewSlide({
                    ...newSlide,
                    image: e.target.files[0],
                  })
                }
                className="border p-2 w-full mb-3 rounded-xl"
              />

              <button
                onClick={addSlide}
                className="bg-red-600 text-white px-4 py-2 rounded-full"
              >
                Add Slide
              </button>
            </div>

            {slides.map((slide, index) => (
              <div
                key={slide._id}
                className="bg-white p-4 rounded-lg shadow mb-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{slide.title}</p>
                  <p className="text-sm text-gray-500">{slide.subtitle}</p>
                  <p className="text-xs">
                    {slide.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="space-x-2">
                  <button onClick={() => moveSlide(index, -1)}>⬆</button>
                  <button onClick={() => moveSlide(index, 1)}>⬇</button>

                  <button
                    onClick={() => toggleActive(slide)}
                    className="bg-green-600 text-white px-2 py-1 rounded "
                  >
                    {slide.isActive ? "Active" : "Inactive"}
                  </button>

                  <button
                    onClick={() => setEditingSlide(slide)}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteSlide(slide._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {editingSlide && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96">
                  <input
                    type="text"
                    value={editingSlide.title}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        title: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3 rounded"
                  />

                  <input
                    type="text"
                    value={editingSlide.subtitle}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        subtitle: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-3 rounded"
                  />

                  <input
                    type="file"
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        image: e.target.files[0],
                      })
                    }
                    className="border p-2 w-full mb-3 rounded"
                  />

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingSlide(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={saveEditedSlide}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
