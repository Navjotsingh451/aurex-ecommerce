import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productcard";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import Banner from "../components/banner";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();
  const { userInfo } = useAuth();
  const [selectedType, setSelectedType] = useState("All");
  const pageTitle = "AUREX - Premium Fashion for Everyone";
  const types = ["All", ...new Set(products.map((p) => p.type))];

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:45690/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesType = selectedType === "All" || product.type === selectedType;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesType && matchesSearch;
  });

  const handleAddToCart = async (product) => {
    setAddingToCart(product._id);
    await addToCart(product);
    setTimeout(() => setAddingToCart(null), 600);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <>
      {/* 🔥 PREMIUM HERO SECTION */}
      <Banner />
      <br />

      {/* PROMO STRIP */}
      <section className="bg-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">
              Free shipping on all orders above ₹999
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
            <p className="text-gray-600 text-sm">
              100% secure payment protection
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Dedicated support anytime</p>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
              alt="Men"
              className="w-full h-100 object-cover group-hover:scale-110  ease-in-out  transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Men</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
              alt="Women"
              className="w-full h-100 object-cover group-hover:scale-110 transition-all  ease-in-out duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Women</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
              alt="Kids"
              className="w-full h-100 object-cover group-hover:scale-110 transition-all  ease-in-out duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-2xl font-semibold">Kids</h3>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our <span className="text-red-600">Products</span>
          </h2>

          {/* Search */}
          <div className="max-w-md mx-auto mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {types.map((type, index) => (
              <button
                key={index}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedType === type
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No products available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
