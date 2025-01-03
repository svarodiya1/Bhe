import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutProductsView from "./checkoutProductsview";
import ApiURl from "../controllers/Api";
import $ from 'jquery';
function Checkout() {
  const [address, setAddress] = useState({});


  const [cart, setCart] = useState([]);
  const [cartId, setCartid] = useState(localStorage.getItem("cart_id") || "");


  const [totalamount, setTotalAmount] = useState();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getCartItems.php?cart_id=${cartId}`
        );
        setCart(response.data);

        // Calculate the total amount
        const total = response.data.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
        setTotalAmount(total);

        console.log("Cart Items:", response.data);
        console.log("Total Amount:", total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        console.error("Error: User ID not found in local storage.");
        alert("Please log in to continue.");
        return;
      }

      try {
        const response = await $.ajax({
          url: `${ApiURl}/getCartItems.php`,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ user_id: userId, cart_id: cartId }),
          dataType: "json",
        });

        if (response.success) {
          setCart(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching data:", response.message);
          alert(response.message || "Failed to fetch cart items.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cartId]); // Added dependency array for cartId

  // const data = [1, 32, 4]

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      user_id: localStorage.getItem("user_id"), // Assuming you have user_id stored
      address: { ...address },
      items: cart.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),
    };


    // console.log(address)


    address["user_id"] = localStorage.getItem("user_id");


    try {
      const response = await $.ajax({
        url: `${ApiURl}/createOrder.php`, // Adjust to your endpoint
        type: "POST",
        dataType: "json",
        data: JSON.stringify(address),
      });

      console.log(address)


      // console.log(JSON.stringify(orderData));
      console.log(response);
      if (response.order_id) {
        alert(`Order confirmed! Your order ID is ${response.order_id}`);
        console.log(response);
        // Optionally clear cart
        localStorage.removeItem("cart_id");
        // Redirect or perform other actions
      } else {
        alert("Failed to confirm order. Please try again.");
        console.log('error');
      }
    } catch (error) {
      console.error("Error submitting order:", error.responseText);
      alert("An error occurred while processing your order.");
    }
  };

  const handleData = (e) => {
    // Assuming `totalamount` is calculated or set elsewhere
    setAddress({ ...address, [e.target.name]: e.target.value, total: totalamount });
  };


  // console.log(address);
  return (
    <>
      <section className="bg-white py-8 antialiased md:py-5 border">
        <h1 className="text-center font-semibold text-3xl border-b border-gray-300 pb-4">
          Checkout
        </h1>
        <form
          action="#"
          onSubmit={handleSubmit}
          className="mx-auto max-w-6xl px-4 2xl:px-0"
        >
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 flex-1 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:outline-0"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:outline-none"
                      placeholder="1234567890" // Accept only digits
                      required
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="xyz@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Address Line 1"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Address Line 2"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter Landmark"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      Locality / Town
                    </label>
                    <input
                      type="text"
                      name="locality"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter Town"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter City"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block md:text-sm text-xs font-medium text-gray-900">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      onChange={handleData}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 md:text-sm text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter State"
                      required
                    />
                  </div>
                  <input
                type="hidden"
                name="total_amount"
                value={totalamount}
                onChange={handleData}
              />
                </div>
              </div>
              

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-4 items-center">
                        <input
                          id="credit-card"
                          aria-describedby="credit-card-text"
                          type="radio"
                          name="payment-method"
                          value="cod"
                          className="h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-600"
                          checked
                        />
                      </div>
                      <div className="ms-2 md:text-sm text-xs">
                        <label
                          htmlFor="credit-card"
                          className="font-medium leading-none text-gray-900"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CheckoutProductsView data={cart} />
              <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-16 lg:max-w-xs xl:max-w-md">
                <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                  <dt className="text-base text-center border-b pb-2 font-normal text-gray-500">
                    Order Receipt
                  </dt>

                  <div className="-my-3 divide-y divide-gray-200">
                    <dl className="flex items-center justify-between gap-4 pb-3">
                      <dt className="text-sm font-normal text-gray-500">
                        Total MRP
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        &#x20b9;{totalamount}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm font-normal text-gray-500">
                        Payment method
                      </dt>
                      <dd className="text-sm font-medium text-green-500">
                        CASH
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-sm font-normal text-gray-500">
                        Total Payable Amount
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        &#x20b9;{totalamount}
                      </dd>
                    </dl>
                  </div>


                  <div>
                    <button
                      type="submit"
                      className="w-full rounded-lg border border-gray-300 bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Checkout;