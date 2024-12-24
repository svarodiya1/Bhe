import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiURl from "../controllers/Api";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchCategories(searchQuery);
      } else {
        setCategories([]);
      }
    }, 300); // Delay of 300ms

    return () => clearTimeout(timeoutId); // Cleanup on every re-render
  }, [searchQuery]);

  const fetchCategories = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${ApiURl}/Search_categories.php`, {
        query,
      });
      if (response.data.status === "success") {
        setCategories(response.data.categories);
      } else {
        setError(response.data.message || "Unknown error occurred.");
        setCategories([]);
      }
    } catch (error) {
      setError("Unable to fetch categories. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Input Field */}
      <input
        type="text"
        aria-label="Search categories"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={categories.length > 0}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search here..."
        className="w-full py-2 pl-4 pr-10 text-gray-700 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <button className="absolute inset-y-0 right-1 flex items-center pr-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#717478"
          width="22"
          height="18"
          viewBox="0 0 30 30"
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </button>

      {/* Results Section */}
      {isLoading ? (
        <ul className="absolute bg-white shadow-md mt-2 rounded-md p-2">
          {[...Array(5)].map((_, index) => (
            <li key={index} className="animate-pulse flex items-center gap-2 p-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </li>
          ))}
        </ul>
      ) : error ? (
        <div className="absolute bg-white shadow-md mt-2 rounded-md p-2">
          <p className="text-red-500">{error}</p>
        </div>
      ) : categories.length > 0 ? (
        <ul
          id="search-results"
          className="absolute bg-white shadow-md mt-2 rounded-md w-full max-h-48 overflow-y-auto"
        >
          {categories.map((category) => (
            <li
              key={category.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                console.log(`Navigating to category ID: ${category.id}`);
                navigate(`/products/${category.id}`);
              }}
            >
              {category.sample_image ? (
                <img
                  src={category.sample_image}
                  alt={category.category_name}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              )}
              <span className="ml-2">{category.category_name}</span>
            </li>
          ))}
        </ul>
      ) : (
        searchQuery.length > 1 && (
          <div className="absolute bg-white shadow-md mt-2 rounded-md p-2">
            <p>No categories found.</p>
          </div>
        )
      )}
    </div>
  );
};

export default SearchBar;