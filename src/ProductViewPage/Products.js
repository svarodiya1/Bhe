import React, { useEffect, useState } from 'react';
import '../App.css';
import TableCover from '../ProductsPage/TableCover';
import ProdcutSidebar from "../component/productSidebar";
import ProductItems from './ProductItems';
import { useParams } from 'react-router-dom';
import ApiURl from '../controllers/Api';

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const { id } = useParams(); // Get category ID from URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(
          `${ApiURl}/getProducts.php?mainCatId=${id}`
        );

        // Check if the response is okay
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
        setError(error.message); // Set error state
        setProducts([]); // Ensure products list is empty in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Add `id` as dependency so it re-runs when `id` changes

  return (
    <div className="min-h-screen flex flex-col py-5 md:flex-row max-w-8xl mx-auto">
      {/* Sidebar Button for Small Screens */}
      <button
        className="bg-blue-500 text-white p-3 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close Filters" : "Open Filters"}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } w-full md:w-72 bg-gray-100 p-5 md:block`}
      >
        <ProdcutSidebar />
      </div>

      {/* Products Section */}
      <div className="flex-1 md:px-5 my-5 md:my-0 mx-auto">
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
