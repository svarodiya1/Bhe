import React from 'react';
import { useNavigate } from 'react-router-dom';
import login from "../images/login.png";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT token and all local storage items
    localStorage.removeItem('token'); // Replace 'token' with your actual JWT key
    localStorage.removeItem('user_id'); // Remove user_id if you are storing it
    localStorage.clear(); // This will remove all items from localStorage

    // Redirect to login page
    navigate('/login');

    // Notify the user
    // alert('You have been logged out successfully.');
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-transparent py-2 px-2 rounded-lg hover:bg-purple-300 transition duration-300 flex flex-col justify-center items-center"
    >
      <img src={login} alt="Logout" className="w-8 h-8 mb-0" /> {/* Logo */}
      <span className="text-sm text-gray-900">Login</span> {/* Text below logo */}
    </button>
  );
};

export default LogoutButton;