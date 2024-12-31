import React, { useEffect, useState } from 'react';
import '../App.css';
import ProductItems from './ProductItems';
import { useParams } from 'react-router-dom';
import ApiURl from '../controllers/Api';

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get category ID from URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${ApiURl}/getProducts.php?mainCatId=${id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.message || "No products found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col py-5 md:flex-row max-w-7xl mx-auto px-4">
      {/* Sidebar Button for Small Screens */}
      {/* <button
        className="bg-blue-500 text-white p-3 md:hidden mb-4 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Filters" : "Open Filters"}
      </button> */}

      {/* Products Section */}
      <div className="flex-1">
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : products.length > 0 ? (
          <ProductItems products={products} />
        ) : (
          <div className="text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
}

export default Products;

