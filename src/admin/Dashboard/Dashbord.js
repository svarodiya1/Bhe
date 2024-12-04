import React, { useState, useEffect } from "react";

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
        const response = await fetch(
          "http://localhost/ecommere_react_with_php-main/ajax/getDashboardData.php"
        );
        const data = await response.json();

        if (data.success) {
          setTotalSales(data.data.total_sales);
          setTotalIncome(data.data.total_income);
          setNewOrders(data.data.new_orders);
          setPendingOrders(data.data.pending_orders);
          setRecentOrders(data.data.recent_orders);
          setLatestProducts(data.data.latest_products);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(
        "http://localhost/ecommere_react_with_php-main/ajax/updateOrderStatus.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId, status: "completed" }),
        }
      );
      const result = await response.json();

      if (result.success) {
        // Update the order status locally
        setRecentOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === orderId ? { ...order, status: "completed" } : order
          )
        );
        alert("Order marked as completed!");
      } else {
        alert("Failed to update order status.");
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
          { label: "Pending Payment", value: pendingOrders },
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
          <ul className="space-y-4">
            {loading ? (
              <li className="text-gray-700 animate-pulse">Loading...</li>
            ) : error ? (
              <li className="text-red-500">{error}</li>
            ) : (
              recentOrders.map((order) => (
                <li
                  key={order.order_id}
                  className="flex justify-between items-center hover:bg-gray-50 p-3 rounded transition"
                >
                  <span>Order #{order.order_id}</span>
                  <span className="text-sm text-gray-500">{order.order_date}</span>
                  <span className="font-medium text-gray-900">₹{order.total_amount}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
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
              ))
            )}
          </ul>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-3xl font-semibold mb-4">Notifications</h3>
          <h4 className="text-2xl font-semibold mb-4">Latest order</h4>
          {loading ? (
            <p>Loading...</p>
          ) : currentOrder ? (
            <div className="animate-fade-in">
              <p> Order ID:  #{currentOrder.order_id}</p>
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
