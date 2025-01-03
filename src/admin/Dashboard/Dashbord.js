import React, { useState, useEffect } from "react";
import ApiURl from "../../controllers/Api";

function Dashboard() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${ApiURl}/getDashboardData.php`);
        const data = await response.json();

        if (data.success) {
          setTotalSales(data.data.total_sales);
          setTotalIncome(data.data.total_income);
          setNewOrders(data.data.new_orders);
          setPendingOrders(data.data.pending_orders);
          setRecentOrders(data.data.recent_orders);
          setLatestProducts(data.data.latest_products);
        } else {
          setError(data.message || "Failed to fetch dashboard data.");
        }
      } catch (error) {
        setError("An error occurred while fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(`${ApiURl}/updateOrderStatus.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: "completed" }),
      });
      const result = await response.json();

      if (result.success) {
        // Update the order status locally
        setRecentOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId
              ? { ...order, status: "completed" }
              : order
          )
        );
        alert("Order marked as completed!");
      } else {
        alert(result.message || "Failed to update order status.");
      }
    } catch (error) {
      alert("An error occurred while updating order status.");
    }
  };

  const currentOrder = recentOrders[currentOrderIndex];

  return (
    <div className="p-6 bg-gray-100">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Sales", value: totalSales },
          { label: "Total Income", value: `₹${totalIncome}` },
          { label: "Completed Orders", value: newOrders },
          { label: "Total Orders", value: pendingOrders },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold">{item.label}</h2>
            {loading ? (
              <p className="mt-4 text-2xl animate-pulse">Loading...</p>
            ) : error ? (
              <p className="mt-4 text-2xl text-red-500">{error}</p>
            ) : (
              <p className="mt-4 text-2xl">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "300px" }} // Scrollable container
          >
            {loading ? (
              <p className="text-gray-700 animate-pulse">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ul>
                {recentOrders
                  .filter((order) => order.status === "pending") // Filter for pending orders
                  .map((order) => (
                    <li
                      key={order.order_id}
                      className="flex justify-between items-center hover:bg-gray-50 p-3 rounded transition"
                    >
                      <span>Order #{order.order_id}</span>
                      <span className="text-sm text-gray-500">
                        {order.order_date}
                      </span>
                      <span className="font-medium text-gray-900">
                        ₹{order.total_amount}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      {order.status === "pending" && (
                        <button
                          className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                          onClick={() => updateOrderStatus(order.order_id)}
                        >
                          Mark as Completed
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-gray-200 p-16 rounded-lg shadow-lg">
          <h3 className="text-4xl font-semibold mb-4">Notifications</h3>
          <h4 className="text-2xl font-semibold mb-4">Latest order</h4>
          {loading ? (
            <p>Loading...</p>
          ) : currentOrder ? (
            <div className="animate-fade-in">
              <p>Order ID: #{currentOrder.order_id}</p>
              <p>Amount: ₹{currentOrder.total_amount}</p>
              <p>
                Status:{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    currentOrder.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {currentOrder.status}
                </span>
              </p>
            </div>
          ) : (
            <p>No orders available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
