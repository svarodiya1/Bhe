import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import $ from 'jquery'; 
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

const ProductOverview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);  // Default quantity is 1
  const [cartMessage, setCartMessage] = useState("");  // Feedback message
    const [cartId, setCartId] = useState(localStorage.getItem("cart_id")); // Feedback
    const [price, setprice] = useState(0);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getProducts.php?product=${id}`
        );
        setProduct(response.products[0]);
        setprice(product.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Handle Add to Cart click
  const handleAddToCart = async () => {
    try {
      const response = await $.post(`${ApiURl}/addToCart.php`, {
        product_id: product.product_id,  // Assuming product has product_id
        quantity: quantity,              // Quantity from input
        cart_id: cartId,     
        price:price,
        total:price*quantity                 // Replace with actual cart_id (user/session-based)
      });

      // Handle success response
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

      <div className="md:flex">
        {/* Product Image */}
        <div className="md:w-1/2 p-4">
          <img
            className="w-full h-auto object-cover rounded-lg cursor-pointer"
            src={`${imgLocation}/${product.img_path}`}
            alt="Product"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-4">
          <p className="text-gray-600 mb-1">{product.category_name}</p>
          <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>

          {/* Quantity Input */}
          <div>
            <label className="text-gray-700 font-semibold mr-2">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 h-7 border rounded-md focus:outline-none"
            />
          </div>

          {/* Product Description */}
          <div className="mb-4 mt-5">
            <h3 className="text-gray-700 font-semibold">Product Description:</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
          <div className="mb-4 flex mt-5">
            <h5 className="text-gray-700 font-semibold">Size:</h5>
            <p className="text-gray-600 mt-2">{product.size}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              className="px-6 py-3 w-2/4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 w-2/4 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 focus:outline-none">
              Wishlist
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
