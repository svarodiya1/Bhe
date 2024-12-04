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
  const { id } = useParams(); // Get category ID from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${ApiURl}/getProducts.php?mainCatId=${id}`
        );
        const data = await response.json();
        setProducts(data.products); // Update products state
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        {/* Render ProductItems, pass products as props */}
        <ProductItems products={products} />
      </div>
    </div>
  );
}

export default Products;
