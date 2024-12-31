import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

const ProductOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartMessage, setCartMessage] = useState(""); // Feedback message
  const [cartId, setCartId] = useState(null); // Cart ID
  const [sizes, setSizes] = useState([]); // Array of sizes
  const [prices, setPrices] = useState([]); // Prices corresponding to sizes
  const [quantities, setQuantities] = useState([]); // Quantities per size
  const [availability, setAvailability] = useState([]); // Availability for each size
  const [selectedSizes, setSelectedSizes] = useState([]); // Array of selected sizes

  // fetch(`${ApiURl}get-cart-id.php`, {
  //   method: "POST",
  //   credentials: "same-origin",
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Received data:", data); // Check what data you are receiving
  //     setCartId(data.cart_id);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching cart ID:", error);
  //   });

  // console.log(cartId);

  // Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getProducts.php?product=${id}`
        );

        if (response && response.products && response.products.length > 0) {
          const productData = response.products[0];
          setProduct(productData);

          // Parse sizes, prices, and availability
          const sizes = productData.sizes ? productData.sizes.split(",") : [];
          const prices = productData.prices
            ? productData.prices.split(",").map(Number)
            : [];
          const availability = productData.availability
            ? productData.availability.split(",").map(Number)
            : [];

          setSizes(sizes);
          setPrices(prices);
          setAvailability(availability);

          // Initialize quantities for each size (default 1)
          const initialQuantities = new Array(sizes.length).fill(1);
          setQuantities(initialQuantities);
        } else {
          setCartMessage("No product found.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setCartMessage("Error fetching product data.");
      }
    };

    fetchData();
  }, [id]);

  // Handle size selection
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSizes((prevState) =>
      checked
        ? [...prevState, value]
        : prevState.filter((size) => size !== value)
    );
  };

  // Handle quantity change for each size
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSizes || selectedSizes.length === 0) {
        setCartMessage("Please select at least one size.");
        return;
      }

      // Extract quantities for selected sizes
      const quantitiesToSend = selectedSizes.map((size) => {
        const sizeIndex = sizes.indexOf(size); // Find the index of the selected size
        return quantities[sizeIndex] || 1; // Ensure a quantity is available
      });

      // Calculate total price
      const total_price = selectedSizes.reduce((acc, size, index) => {
        const sizeIndex = sizes.indexOf(size);
        const sizePrice = prices[sizeIndex] || 0;
        const quantity = quantitiesToSend[index];
        return acc + sizePrice * quantity;
      }, 0);

      // Send data to the server
      const response = await $.post(`${ApiURl}/addToCart.php`, {
        user_id: localStorage.getItem("user_id"),
        product_id: product.product_id,
        cart_id: cartId,
        sizes: JSON.stringify(selectedSizes), // Send sizes as an array
        quantities: JSON.stringify(quantitiesToSend), // Send quantities as an array
        total_price,
      });

      console.log(response);
      if (response.status === "success") {
        alert(response.message);
        setCartMessage("Product added to cart successfully!");
        navigate("/cart");
      } else {
        alert(response.message);
        setCartMessage("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("Error adding product to cart.");
    }
  };

  // Calculate the grand total
  const calculateGrandTotal = () => {
    return selectedSizes.reduce((acc, size) => {
      const sizeIndex = sizes.indexOf(size);
      const quantity = quantities[sizeIndex] || 1;
      const price = prices[sizeIndex] || 0;
      return acc + quantity * price;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto md:p-8 p-4 bg-gray-100 shadow-lg rounded-lg">
      <h1>{id}</h1>

      {/* Display Total Amount */}
      <div className="flex justify-between items-center mb-6 bg-blue-600 text-white py-2 px-4 rounded-lg">
        <span className="text-lg font-semibold">
          Total Amount: ₹{calculateGrandTotal()}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Image */}
        <div className="md:w-1/2 p-4">
          <img
            className="w-full h-[400px] object-cover rounded-lg cursor-pointer"
            src={`${imgLocation}/${product.img_path}`}
            alt="Product"
          />
        </div>

        {/* Sizes, Prices, and Quantity */}
        <div className="md:w-1/2 p-4">
          <p className="text-gray-600 mb-1">{product.category_name}</p>
          <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            {/* Sizes */}
            <div>
              <h3 className="text-gray-700 font-semibold">Select Sizes:</h3>
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    value={size}
                    onChange={handleSizeChange}
                    disabled={availability[index] === 0} // Disable if unavailable
                  />
                  <label
                    htmlFor={`size-${index}`}
                    className={`text-gray-600 ml-2 ${
                      availability[index] === 0 ? "text-red-500" : ""
                    }`}
                  >
                    {size}{" "}
                    {availability[index] === 0
                      ? "(Unavailable)"
                      : "(Available)"}
                  </label>
                </div>
              ))}
            </div>

            {/* Prices */}
            <div>
              <h3 className="text-gray-700 font-semibold">Prices:</h3>
              {prices.map((price, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="text-gray-600">₹{price}</span>
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-gray-700 font-semibold">Quantity:</h3>
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    min="1"
                    value={quantities[index] || 1}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    disabled={availability[index] === 0} // Disable if unavailable
                    className="w-12 text-center border rounded-md focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Total */}
            <div>
              <h3 className="text-gray-700 font-semibold">Total:</h3>
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center mb-1">
                  <span className="text-gray-600">
                    ₹{prices[index] * (quantities[index] || 1)}
                  </span>
                </div>
              ))}
              {/* Grand Total */}
              <div className="flex items-center mt-2 border-t pt-2">
                <span className="text-gray-800 font-semibold">
                  Grand Total: ₹{calculateGrandTotal()}
                </span>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">
              Product Description:
            </h3>
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
