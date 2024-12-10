import React, { useState, useEffect } from "react";
import ApiURl from "../controllers/Api";

const DashboardSection = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalSpend: 0,
    pendingOrders: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Retrieve the logged-in user's ID from local storage or authentication context
        const userId = localStorage.getItem("user_id"); // Adjust as per your auth setup

        if (!userId) {
          setError("User not logged in.");
          return;
        }

        const response = await fetch(`${ApiURl}/getUserDataDashboard.php?user_id=${userId}`);
        const result = await response.json();

        if (result.success) {
          setData({
            totalOrders: result.data.totalOrders || 0,
            totalSpend: result.data.totalSpend || 0,
            pendingOrders: result.data.pendingOrders || 0,
            recentOrders: result.data.recentOrders || [],
          });
        } else {
          setError(result.message || "Failed to fetch data.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-50 md:mx-6 mx-3 mt-5">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Orders", value: data.totalOrders },
          { label: "Total Spend", value: `₹${data.totalSpend}` },
          { label: "Pending Orders", value: data.pendingOrders },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              {stat.label}
            </h3>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Orders
        </h3>
        <ul className="space-y-4">
          {data.recentOrders.length > 0 ? (
            data.recentOrders.map((order) => (
              <li
                key={order.order_id}
                className="flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Order #{order.order_id}
                  </h4>
                  <p className="text-gray-600">Order Date: {order.date}</p>
                </div>
                <p className="text-gray-700">&#x20b9;{order.amount}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No recent orders available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSection;
