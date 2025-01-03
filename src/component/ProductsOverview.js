import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

const ProductOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cartMessage, setCartMessage] = useState("");
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id"));
  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [cartTotal, setCartTotal] = useState(0); // State for cart total

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getProducts.php?product=${id}`);

        if (response && response.products && response.products.length > 0) {
          const productData = response.products[0];
          setProduct(productData);

          const sizes = productData.sizes ? productData.sizes.split(",") : [];
          const prices = productData.prices ? productData.prices.split(",").map(Number) : [];
          const availability = productData.availability
            ? productData.availability.split(",").map(Number)
            : [];

          setSizes(sizes);
          setPrices(prices);
          setAvailability(availability);

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

    const fetchCartTotal = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getcartitems.php?cart_id=${cartId}`);
        
        if (response && response.data && response.data.length > 0) {
          const totalAmount = response.data.reduce((acc, item) => {
            const price = parseFloat(item.price); // Ensure price is a number
            const quantity = parseInt(item.quantity, 10); // Ensure quantity is a number
    
            // Validate that both price and quantity are valid numbers
            if (!isNaN(price) && !isNaN(quantity)) {
              return acc + price * quantity;
            }
            return acc;
          }, 0);
          setCartTotal(totalAmount);
        } else {
          setCartTotal(0);
        }
      } catch (error) {
        console.error("Error fetching cart total:", error);
      }
    };

    fetchData();
    fetchCartTotal();
  }, [id, cartId]);

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSizes((prevState) =>
      checked ? [...prevState, value] : prevState.filter((size) => size !== value)
    );
  };

  const handleQuantityChange = (index, value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 1_000_000) {
      alert("Please enter a valid quantity (1 to 1,000,000)");
      return;
    }
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = parsedValue;
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = async () => {
    try {
      if (!selectedSizes || selectedSizes.length === 0) {
        setCartMessage("Please select at least one size.");
        return;
      }
  
      const quantitiesToSend = selectedSizes.map((size) => {
        const sizeIndex = sizes.indexOf(size);  // Get the index of the selected size
        return quantities[sizeIndex] || 1;  // Ensure quantities match the selected size
      });
  
      // Calculate the total price for the selected sizes and quantities
      const total_price = selectedSizes.reduce((acc, size, index) => {
        const sizeIndex = sizes.indexOf(size);  // Ensure correct index is used
        const sizePrice = prices[sizeIndex] || 0;  // Ensure correct price is used for each size
        const quantity = quantitiesToSend[index];  // Get the correct quantity for each size
        return acc + sizePrice * quantity;  // Calculate total price
      }, 0);
  
      const response = await $.post(`${ApiURl}/addToCart.php`, {
        product_id: product.product_id,
        cart_id: cartId,
        sizes: JSON.stringify(selectedSizes),
        quantities: JSON.stringify(quantitiesToSend),
        total_price,
      });
  
      if (response.status === "success") {
        setCartMessage("Product added to cart successfully!");
        navigate("/cart");
      } else {
        setCartMessage("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("Error adding product to cart.");
    }
  };
  

  const calculateGrandTotal = () => {
    return selectedSizes.reduce((acc, size) => {
      const sizeIndex = sizes.indexOf(size);
      const quantity = quantities[sizeIndex] || 1;
      const price = prices[sizeIndex] || 0;
      return acc + quantity * price;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto md:p-8 p-4 bg-gray-100 shadow-lg rounded-lg transition-all duration-500 ease-in-out">
      {/* Utilized Amount Section */}
      <div className="p-4 bg-blue-500 text-white font-bold text-center mb-4 rounded-lg">
        Current amount in Cart : ₹{cartTotal}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 p-2">
          <img
            className="w-[400px] h-[300px] object-cover rounded-lg cursor-pointer"
            src={`${imgLocation}/${product.img_path}`}
            alt="Product"
          />
        </div>

        <div className="md:w-1/2 p-2">
          <p className="text-gray-600 mb-1">{product.category_name}</p>
          <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>

          <div>
            <div className="grid grid-cols-4 font-bold text-gray-700 mb-2">
              <span>Size</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {sizes.map((size, index) => (
              <div key={index} className="grid grid-cols-4 items-center p-2 border-b">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`size-${index}`}
                    value={size}
                    onChange={handleSizeChange}
                    disabled={availability[index] === 0}
                  />
                  <label
                    htmlFor={`size-${index}`}
                    className={`ml-2 ${availability[index] === 0 ? "text-red-500" : ""}`}
                  >
                    {size} {availability[index] === 0 ? "(Unavailable)" : ""}
                  </label>
                </div>
                <span>₹{prices[index]}</span>
                <input
                  type="number"
                  value={quantities[index] || 1}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  disabled={availability[index] === 0}
                  className="w-16 text-center border rounded-md"
                />
                <span>₹{(quantities[index] || 1) * (prices[index] || 0)}</span>
              </div>
            ))}

            <div className="text-right font-semibold mt-4">
              Grand Total: ₹{calculateGrandTotal()}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">Product Description:</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              className="px-6 py-3 w-2/4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {cartMessage && <p className="text-green-500 mt-4">{cartMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
