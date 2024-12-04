import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const LogoutButton = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogout = () => {
    // Remove JWT token and all local storage items
    localStorage.removeItem('token'); // Replace 'token' with your actual JWT key
    localStorage.removeItem('user_id'); // Remove user_id if you are storing it
    // Clear other localStorage items if needed
    localStorage.clear(); // This will remove all items from localStorage

    // Optionally redirect to login page or home page
    navigate('/login'); // Adjust the route based on your application's structure

    // Optionally, you may want to notify the user
    alert('You have been logged out successfully.');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
