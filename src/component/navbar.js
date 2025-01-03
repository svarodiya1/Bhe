import { Link, useNavigate } from "react-router-dom";
import { SlUser } from "react-icons/sl";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import LogoutButton from "./LogoutButton";
import SearchBar from "./Searchbar";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch user role from localStorage
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleAdminClick = () => {
    navigate("/admin"); // Navigate to admin page
  };

  const toggleMenu = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  };

  const fetchSearchResults = async (query) => {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data); // Handle data as needed
  };

  return (
    <div className="bg-gradient-to-r from-purple-200 via-purple-500 to-purple-300">
      <nav className="bg-transparent border-b border-gray-300 shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4 px-3 md:px-6">
          {/* Logo */}
          <div className="font-bold text-gray-900">
            <Link to="/">
              <img
                src="https://bhatiaemporium.com/wp-content/uploads/2024/02/cropped-Bhagtia-Emporium-LOGO-1.png"
                alt="Bhatia Emporium Logo"
                className="w-24"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block w-2/4 relative">
            <SearchBar onsearch={fetchSearchResults} />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center text-white text-lg lg:text-base">
              <Link to="/dashboard">
                <SlUser className="w-6 h-6 sm:w-5 sm:h-5" /> {/* Adjust size */}
              </Link>
              <span className="text-xs sm:text-[10px]">Profile</span>
            </div>
            <div className="flex flex-col items-center text-white text-lg lg:text-base">
              <Link to="/wishlist">
                <IoMdHeartEmpty className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
              <span className="text-xs sm:text-[10px]">Wishlist</span>
            </div>
            <div className="flex flex-col items-center text-white text-lg lg:text-base">
              <Link to="/cart">
                <PiShoppingCartSimple className="w-6 h-6 sm:w-5 sm:h-5" />
              </Link>
              <span className="text-xs sm:text-[10px]">Cart</span>
            </div>
            <LogoutButton />
            <button
              className="lg:hidden text-white bg-purple-600 rounded-full p-2"
              onClick={toggleMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Admin Button for Desktop */}
            {userRole === "admin" && (
              <button
                onClick={handleAdminClick}
                className="hidden lg:block text-white bg-purple-600 px-3 py-1 rounded-md"
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-3 pb-4">
          <SearchBar onsearch={fetchSearchResults} />
        </div>

        {/* Menu Items */}
        <div
          id="mobile-menu"
          className="hidden flex-col lg:flex lg:flex-row lg:justify-center items-center"
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-5 lg:py-2 space-y-4 lg:space-y-0 text-white text-sm font-bold">
            <li>
              <Link to="#" className="hover:text-purple-300">
                All Categories
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                Table Cover
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                Washing Machine Cover
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                Mattress Cover
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                Kitchen Apron
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                Fridge Cover
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-purple-300">
                TV Cover
              </Link>
            </li>
            {/* Admin Button for Mobile
            {userRole === "admin" && (
              <li className="lg:hidden">
                <button
                  onClick={handleAdminClick}
                  className="text-purple-100 hover:text-purple-300"
                >
                  Admin
                </button>
              </li>
            )} */}

             {/* Admin Button */}
        {userRole === "admin" && (
          <li>
            <button
              onClick={handleAdminClick}
              className="text-purple-100 hover:text-purple-300"
            >
              Admin
            </button>
          </li>
        )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;