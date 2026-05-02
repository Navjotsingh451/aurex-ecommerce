import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productcard";

function Category() {
  const { name } = useParams(); // "men,women,kids"
  const [products, setProducts] = useState([]);

 useEffect(() => {
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:45690/api/products");

    const selectedCategories = name
      .split(",")
      .map((c) => c.toLowerCase());

    const filtered = data.filter((p) =>
      selectedCategories.some((cat) =>
        p.category?.toLowerCase().includes(cat)
      )
    );

    setProducts(filtered);
  };

  fetchProducts();
}, [name]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* 🔥 TITLE */}
      <h2 className="text-3xl font-bold mb-10 capitalize">
        {name.replaceAll(",", " & ")} Collection
      </h2>

      {/* PRODUCTS */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;