import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import ApiURl from "../controllers/Api";

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      setError("User not logged in or user_id not found in localStorage");
      setLoading(false);
      return;
    }
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      let isMounted = true;
      try {
        setLoading(true);
        const response = await fetch(
         `${ApiURl}/getOrder.php?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          if (isMounted) setOrders(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }

      return () => {
        isMounted = false; // Cleanup function to avoid setting state on unmounted components
      };
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-5 mx-3 md:mx-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
        <Filter />
      </div>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.order_id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 items-center">
                <div>
                  <h4 className="font-semibold text-gray-700">Order #{order.order_id}</h4>
                  <p className="text-gray-600">Date: {order.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Status</h4>
                  <p className="text-gray-600">{order.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Products</h4>
                  <ul className="text-gray-600">
                    {order.products?.map((product) => (
                      <li key={product.product_id}>
                        {product.product_name} (x{product.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center md:text-left">
                  <button
                    onClick={() => navigate(`/order/${order.order_id}`)}
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => navigate("/cart/checkout/receipt")}
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600 ml-2"
                  >
                    View Receipt
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderSection;