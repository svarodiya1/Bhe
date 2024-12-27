import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

function Cart() {
  const [cartId, setCartId] = useState(localStorage.getItem("cart_id"));
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [gst, setGST] = useState(0);

  // Add to Wishlist
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

  // Remove Item from Cart
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

  // Fetch Cart Items and Calculate GST
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${ApiURl}/getCartItems.php?cart_id=${cartId}`);
        const data = await response.json();
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
      <div className="mx-auto max-w-8xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Cart Items Section */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cart.map((product) => (
                <div
                  key={product.cart_item_id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <Link to={`/ProductOverview/${product.product_id}`} className="shrink-0 md:order-1">
                      <img
                        className="md:h-24 md:w-24 w-full h-60"
                        src={`${imgLocation}/${product.img_path}`}
                        alt={product.name}
                      />
                    </Link>

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <span className="text-xs bg-gray-50 h-9 flex items-center w-12 justify-center">
                        Qty:
                      </span>
                      <input
                        value={product.quantity}
                        type="text"
                        className="w-14 shrink-0 border-0 bg-gray-50 text-center text-sm font-medium text-gray-900 focus:outline-none"
                        readOnly
                      />
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900">
                          &#x20b9;{product.price * product.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <p className="text-base font-bold text-gray-900">{product.name}</p>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex underline items-center text-xs text-gray-600 hover:underline"
                          onClick={() => addToWishlist(product.product_id)}
                        >
                          Add to Wishlist
                        </button>
                        <button
                          type="button"
                          className="inline-flex underline items-center text-xs text-red-600 hover:underline"
                          onClick={() => removeCartItem(product.cart_item_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Details Section */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-base border-b pb-2 border-gray-200 font-semibold text-gray-900">
                Price Details
              </p>

              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-sm font-normal text-gray-500">Total MRP</dt>
                  <dd className="text-sm font-medium text-gray-900">&#x20b9;{totalAmount}</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-sm font-normal text-gray-500">GST (18%)</dt>
                  <dd className="text-sm font-medium text-gray-900">&#x20b9;{gst.toFixed(2)}</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-sm font-bold text-gray-900">Total Amount</dt>
                  <dd className="text-sm font-bold text-gray-900">
                    &#x20b9;{(totalAmount + gst).toFixed(2)}
                  </dd>
                </dl>
              </div>

              <Link
                to={"/cart/checkout"}
                className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Proceed to Checkout
              </Link>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500">or</span>
                <Link
                  to={"/"}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;