import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from "jquery";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

const ProductOverview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartMessage, setCartMessage] = useState(""); // Feedback message
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id")); // Feedback
  const [sizes, setSizes] = useState([]); // Array of sizes
  const [prices, setPrices] = useState([]); // Prices corresponding to sizes
  const [quantityPerSize, setQuantityPerSize] = useState([]); // Dynamic quantity for each size
  const [selectedSizes, setSelectedSizes] = useState([]); // Array of selected sizes

  // Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getProducts.php?product=${id}`);
        setProduct(response.products[0]);

        // Set sizes and prices for the product
        const availableSizes = response.products[0].sizes || [];
        const productPrices = response.products[0].prices || [];

        setSizes(availableSizes);
        setPrices(productPrices);

        // Initialize quantities for each size
        const initialQuantities = new Array(availableSizes.length).fill(1);
        setQuantityPerSize(initialQuantities);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle size selection
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSizes((prevState) =>
      checked ? [...prevState, value] : prevState.filter((size) => size !== value)
    );
  };

  // Handle quantity change for each size
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantityPerSize];
    updatedQuantities[index] = value;
    setQuantityPerSize(updatedQuantities);
  };

  // Handle Add to Cart click
  const handleAddToCart = async () => {
    try {
      // Calculate the total price based on selected sizes and quantities
      const totalPrice = selectedSizes.reduce((acc, size, index) => {
        const sizeIndex = sizes.indexOf(size);
        const sizePrice = prices[sizeIndex]; // Price for selected size
        const quantity = quantityPerSize[index]; // Quantity for the size
        return acc + sizePrice * quantity;
      }, 0);

      // Make the POST request to add product to cart
      const response = await $.post(`${ApiURl}/addToCart.php`, {
        product_id: product.product_id, // Product ID from product details
        cart_id: cartId, // Cart ID from localStorage or session
        selected_sizes: selectedSizes, // Selected sizes array
        total_price: totalPrice // Total price calculated
      });

      if (response.status === "success") {
        setCartMessage("Product added to cart successfully!");
      } else {
        setCartMessage("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("Error adding product to cart.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto md:p-8 p-2 bg-gray-100 shadow-lg rounded-lg">
      <h1>{id}</h1>

      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/3 p-4">
          <img
            className="w-full h-auto object-cover rounded-lg cursor-pointer"
            src={`${imgLocation}/${product.img_path}`}
            alt="Product"
          />
        </div>

        {/* Sizes, Prices, and Quantity */}
        <div className="md:w-2/3 p-4">
          <p className="text-gray-600 mb-1">{product.category_name}</p>
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sizes */}
            <div>
              <h3 className="text-gray-700 font-semibold">Select Sizes:</h3>
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    value={size}
                    onChange={handleSizeChange}
                  />
                  <label htmlFor={`size-${index}`} className="text-gray-600 ml-2">
                    {size}
                  </label>
                </div>
              ))}
            </div>

            {/* Prices */}
            <div>
              <h3 className="text-gray-700 font-semibold">Prices:</h3>
              {prices.map((price, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="text-gray-600">₹{price}</span>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-gray-700 font-semibold">Quantity:</h3>
              {selectedSizes.map((size, index) => (
                <div key={index} className="flex items-center mb-2">
                  <label htmlFor={`quantity-${index}`} className="text-gray-600 ml-2">
                    {size}
                  </label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    min="1"
                    value={quantityPerSize[index] || 1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="w-20 ml-2 border rounded-md focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-5">
            <h3 className="text-gray-700 font-semibold">Product Description:</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              className="px-6 py-3 w-2/4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Feedback Message */}
          {cartMessage && <p className="text-green-500 mt-4">{cartMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
