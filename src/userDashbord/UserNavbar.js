import React, { useState } from 'react';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">BrandLogo</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-800 hover:text-blue-600 font-semibold">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-semibold">
              Shop
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-semibold">
              About
            </a>
            <a href="#" className="text-gray-800 hover:text-blue-600 font-semibold">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block text-gray-800 hover:text-blue-600 font-semibold">
              Home
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600 font-semibold">
              Shop
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600 font-semibold">
              About
            </a>
            <a href="#" className="block text-gray-800 hover:text-blue-600 font-semibold">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
