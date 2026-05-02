import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productcard";

function Shop() {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category"); // men, women, kids

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:45690/api/products");

      let filtered = data;

      if (category) {
        filtered = data.filter((p) =>
          p.category?.toLowerCase().includes(category.toLowerCase())
        );
      }

      setProducts(filtered);
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold mb-10  tracking-[10px]  uppercase  text-center">
        {category ? `${category} Collection` : "All Products"}
      </h2>

      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="grid grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Shop;    