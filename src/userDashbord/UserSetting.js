import React from 'react';

const SettingsSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-5 mx-3 md:mx-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      {/* Account Settings */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Username */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">First Name</h4>
            <p className="text-gray-600 mt-1">Karan</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Change</button>
          </div>

          {/* Email */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Last Name</h4>
            <p className="text-gray-600 mt-1">Singh</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          {/* Phone */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Phone</h4>
            <p className="text-gray-600 mt-1">+91 - 9876543210</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Email</h4>
            <p className="text-gray-600 mt-1">karan@gmail.com</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Address</h4>
            <p className="text-gray-600 mt-1">house no- 123, Main streat</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Landmark</h4>
            <p className="text-gray-600 mt-1">ram mandir</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Zipcode</h4>
            <p className="text-gray-600 mt-1">110022</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">City</h4>
            <p className="text-gray-600 mt-1">New Delhi</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">State</h4>
            <p className="text-gray-600 mt-1">Delhi</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
          </div>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-700 font-semibold">Receive Email Notifications</h4>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 mt-1">Get notified about new orders and updates.</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-700 font-semibold">Receive SMS Notifications</h4>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 mt-1">Receive order updates via SMS.</p>
        </div>
      </div>

      {/* Security Settings */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Security</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Change Password */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Change Password</h4>
            <p className="text-gray-600 mt-1">Ensure your account is secure.</p>
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Change Password</button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-gray-700 font-semibold">Two-Factor Authentication</h4>
            <p className="text-gray-600 mt-1">Add extra security to your account.</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Enable 2FA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
