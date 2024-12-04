import React, { useEffect, useState } from "react";
import img1 from "../Apron/Jeana-Apron.png";
import img2 from "../Apron/apron with cap and checks.png";
import img3 from "../Fridge Top Cover/Bristly Fridge Top.png";
import img4 from "../Fridge Top Cover/Flock.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import ApiURl from "../controllers/Api";
import imgLocation from "../controllers/imagePath";

function Cart() {
  const [cartId, setCartid] = useState(localStorage.getItem("cart_id"));

  const [cart, setCart] = useState([]);

  const[totalamount,setTotalAmount] = useState();


  

  const addToWishlist = async (productId) => {
    const userId = localStorage.getItem("user_id");
  
    try {
        const response = await fetch(`${ApiURl}/addWishlistItem.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, product_id: productId }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } 
        
        
        
        else {
            console.error("Failed to add item to wishlist:", data.message);
            alert(data.message);
        }
    } catch (error) {
        console.error("Error adding item to wishlist:", error);
        alert('Error adding item to wishlist');
    }
};




  const removeCartItem = async (cartItemId) => {
    try {

        console.log(cartItemId);

      const response = await fetch(`${ApiURl}/removeCartItem.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart_item_id: cartItemId }),
      });
  
      if (response.ok) {
        // Successfully removed the item, now update the state
        setCart(cart.filter((item) => item.cart_item_id !== cartItemId));
        alert('Item removed successfully');
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };











  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getCartItems.php?cart_id=${cartId}`
        );
        setCart(response.data);
        console.log(cart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    let total = 0;
    cart.forEach(product => {
      total += product.price * product.quantity;
    });
    setTotalAmount(total);
  }, [cart]);







  return (
    <>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-8xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart.map((prodcuct, index) => {




                  return (
                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <Link  to={`/ProductOverview/${prodcuct.product_id}`} className="shrink-0 md:order-1">
                          <img
                            className="md:h-24 md:w-24 w-full h-60"
                            src={`${imgLocation}/${prodcuct.img_path}`}
                            alt="imac image"
                          />
                        </Link>

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            {/* <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                    </svg>
                                                </button> */}
                            <span className="text-xs bg-gray-50 h-9 flex items-center w-12 justify-center">
                              Qty :{" "}
                            </span>
                            <input

                                value={prodcuct.quantity}
                              type="text"
                              id="counter-input"
                              data-input-counter
                              className="w-14 shrink-0 border-0 bg-gray-50 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                              placeholder="0"
                              required
                            />
                            {/* <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100">
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button> */}
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900">
                              &#x20b9;{(prodcuct.price)*(prodcuct.quantity)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-xs font-bold text-gray-700 hover:underline"
                          >
                            #{prodcuct.cart_item_id}
                          </a>
                        </div>
                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-bold text-gray-900"
                          >
                            {prodcuct.name}
                          </a>

                          <div>
                            <span
                              href="#"
                              className="block text-xs text-gray-700"
                            >
                              Size : 40 x 40
                            </span>
                            {/* <span href="#" className="text-xs text-gray-700">Color : Blue</span> */}
                          </div>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex underline items-center text-xs text-gray-600 hover:underline"
                              onClick={() => addToWishlist(prodcuct.product_id)}
                            >
                              Add to Wishlist
                            </button>
                            <button
                              type="button"
                              className="inline-flex underline items-center text-xs text-red-600 hover:underline"
                              onClick={() => removeCartItem(prodcuct.cart_item_id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <p className="text-base border-b pb-2 border-gray-200 font-semibold text-gray-900">
                  Price Details
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-sm  font-normal text-gray-500">
                        Total MRP
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        &#x20b9;{totalamount}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-sm font-normal text-gray-500">
                        Discount on MRP
                      </dt>
                      <dd className="text-sm font-medium text-green-600">
                        -&#x20b9;00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-sm font-normal text-gray-500">
                        Shipping Fee
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        &#x20b9;00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-sm font-normal text-gray-500">GST</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        &#x20b9;00
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                    <dt className="text-sm font-bold text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-sm font-bold text-gray-900">
                      &#x20b9;{totalamount}
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
                  <span className="text-sm font-normal text-gray-500">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to={"/"}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label for="voucher" className="mb-2 block text-sm font-medium text-gray-900"> Do you have a voucher or gift card? </label>
                                        <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="" required />
                                    </div>
                                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">Apply Code</button>
                                </form>
                            </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
