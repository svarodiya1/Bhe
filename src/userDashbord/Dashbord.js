import React from 'react';



const DashboardSection = () => {
  return (


  


<div className="bg-gray-50 md:mx-6 mx-3 mt-5">




      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>


      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Spend</h3>
          <p className="mt-2 text-3xl font-bold">&#x20b9;4,230</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Pending Orders</h3>
          <p className="mt-2 text-3xl font-bold">3</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700">Loyalty Points</h3>
          <p className="mt-2 text-3xl font-bold">90</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Order #6543</h4>
                <p className="text-gray-600">Shipped on 26th Sep 2023</p>
              </div>
              <p className="text-gray-700">&#x20b9;770.00</p>
            </li>
            <li className="flex justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Order #12346</h4>
                <p className="text-gray-600">Processing</p>
              </div>
              <p className="text-gray-700">&#x20b9;85.50</p>
            </li>
            <li className="flex justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">Order #12347</h4>
                <p className="text-gray-600">Delivered on 20th Sep 2023</p>
              </div>
              <p className="text-gray-700">&#x20b9;199.99</p>
            </li>
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h3>
          <ul className="space-y-4">
            <li className="text-gray-700">New order received - #12348</li>
            <li className="text-gray-700">Stock low for product: Widget Pro</li>
            <li className="text-gray-700">Customer inquiry from Jane Doe</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
