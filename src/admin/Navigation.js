import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    // Toggle the dropdown open/close
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    return (
        <nav className="bg-gray-800 text-white w-64">
            <ul className="p-4 space-y-4">
                {/* Dashboard Link */}
                <li className="hover:bg-gray-700 p-2 rounded">
                    <Link to="/">Dashboard</Link>
                </li>

                {/* Products Dropdown */}
                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('products')}
                        className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded focus:outline-none"
                    >
                        <span>Ecommerce</span>
                        <span>{openDropdown === 'products' ? '▲' : '▼'}</span>
                    </button>
                    {openDropdown === 'products' && (
                        <ul className="bg-gray-700 mt-2 rounded-md shadow-lg space-y-2 p-2">
                            <li className="hover:bg-gray-600 p-2 rounded">
                                <Link to="/add-product">Add Product</Link>
                            </li>
                            <li className="hover:bg-gray-600 p-2 rounded">
                                <Link to="/product-list">Product List</Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Categories Dropdown */}
                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('categories')}
                        className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded focus:outline-none"
                    >
                        <span>Categories</span>
                        <span>{openDropdown === 'categories' ? '▲' : '▼'}</span>
                    </button>
                    {openDropdown === 'categories' && (
                        <ul className="bg-gray-700 mt-2 rounded-md shadow-lg space-y-2 p-2">
                            <li className="hover:bg-gray-600 p-2 rounded">
                                <Link to="/add-category">Add Category</Link>
                            </li>
                            <li className="hover:bg-gray-600 p-2 rounded">
                                <Link to="/category-list">Category List</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li className="relative">
                    <button
                        onClick={() => toggleDropdown('user')}
                        className="flex items-center justify-between w-full hover:bg-gray-700 p-2 rounded focus:outline-none"
                    >
                        <span>Users</span>
                        <span>{openDropdown === 'user' ? '▲' : '▼'}</span>
                    </button>
                    {openDropdown === 'user' && (
                        <ul className="bg-gray-700 mt-2 rounded-md shadow-lg space-y-2 p-2">
                            <li className="hover:bg-gray-700 p-2 rounded">
                                <Link to="/user-list">User List</Link>
                            </li>
                            <li className="hover:bg-gray-600 p-2 rounded">
                                <Link to="/category-list">Setting</Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
