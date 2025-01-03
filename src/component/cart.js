import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

function Cart() {
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id"));
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [gst, setGST] = useState(0); 
   const navigate = useNavigate();
  

  

   const handleclickback = () => {
    navigate("/"); 
  };

  const addToWishlist = async (productId) => {
    const userId = localStorage.getItem("user_id");
    try {
      const response = await fetch(`${ApiURl}/addWishlistItem.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
      alert("Error adding item to wishlist");
    }
  };
   

  const handleQuantityChange = (cartItemId, delta) => {  
    setCart(prevCart =>
      prevCart.map(item =>
        item.cart_item_id === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } // Prevent negative quantity
          : item
      )     
    );

  
    const newTotalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalAmount(newTotalAmount);
    setGST(newTotalAmount * 0.18); // Assuming 18% GST
  };
  


  const removeCartItem = async (cartItemId) => {
    try {
      const response = await fetch(`${ApiURl}/removeCartItem.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_item_id: cartItemId }),
      });
      if (response.ok) {
        setCart(cart.filter((item) => item.cart_item_id !== cartItemId));
        alert("Item removed successfully");
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${ApiURl}/getCartItems.php?cart_id=${cartId}`);
        const data = await response.json();

        console.log(response)
        console.log(data)
        if (data?.data) {
          setCart(data.data);
          const total = data.data.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotalAmount(total);
          setGST(total * 0.18); // Assuming 18% GST
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [cartId]);

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl mb-4">Shopping Cart</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
          {/* Table Section */}
          <div className="col-span-2">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">Product</th> 
                  <th className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">Price</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">Size</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">Quantity</th>
                  <th className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.cart_item_id}>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <Link to={`/ProductOverview/${product.product_id}`} className="flex items-center gap-4">
                        <img
                          className="h-16 w-16 rounded object-cover"
                          src={`${imgLocation}/${product.img_path}`}
                          alt={product.name}
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <div className="flex gap-2 text-xs text-gray-500">
                            <button
                              onClick={() => addToWishlist(product.product_id)}
                              className="text-blue-500 hover:underline"
                            >
                              Add to Wishlist
                            </button>
                            <span>|</span>
                            <button
                              onClick={() => removeCartItem(product.cart_item_id)}
                              className="text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{product.price || "N/A"}</td> 
                    <td className="border border-gray-200 px-4 py-2 text-sm">{product.size || "N/A"}</td>
                    {/* <td className="border border-gray-200 px-4 py-2 text-sm">{product.quantity}</td> */}  




                    {/* <td className="border border-gray-200 px-4 py-2 text-sm">
  <div className="flex items-center gap-2">
    <button
      onClick={() => handleQuantityChange(product.cart_item_id, -1)}
      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
    > 
      -
    </button>
    <span>{product.quantity}</span>
    <button
      onClick={() => handleQuantityChange(product.cart_item_id, 1)}
      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-300"
    >
      +
    </button>
  </div>
</td> */}
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <input type="number"  
                          min="1"
                        value={product.quantity}
                          onChange={(e) => handleQuantityChange(product.cart_item_id, parseInt(e.target.value) - product.quantity)}
                         className="w-20 border border-gray-300 rounded px-2 py-1 text-center" />
                                </div>
                                </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      
                      &#x20b9;{(product.price * product.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> 

            <div className="mt-6 flex justify-left">
  <button
    onClick={handleclickback}
    className="bg-blue-600 text-white font-medium py-1 px-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
  >
    <svg width="30px" height="34px" viewBox="-2.88 -2.88 21.76 21.76" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 10L8 14L6 14L-2.62268e-07 8L6 2L8 2L8 6L16 6L16 10L8 10Z" fill="#ffffff"></path> </g></svg>
    <span>Back to Shop</span>
  </button>
</div>

          </div>

          {/* Price Details */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <p className="text-base font-semibold border-b pb-2 border-gray-200 text-gray-900">Price Details</p>
              <div className="mt-4 space-y-4">
                <dl className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">Total MRP</dt>
                  <dd className="text-sm text-gray-900">&#x20b9;{totalAmount}</dd>
                </dl>
                <dl className="flex items-center justify-between">
                  <dt className="text-sm text-gray-500">GST (18%)</dt>
                  <dd className="text-sm text-gray-900">&#x20b9;{gst.toFixed(2)}</dd>
                </dl>
                <dl className="flex items-center justify-between">
                  <dt className="text-sm font-bold text-gray-900">Total Amount</dt>
                  <dd className="text-sm font-bold text-gray-900">
                    &#x20b9;{(totalAmount + gst).toFixed(2)}
                  </dd>
                </dl>
              </div>
              <Link
                to="/cart/checkout"
                className="mt-6 block w-full text-center bg-blue-600 text-white font-medium py-2.5 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
