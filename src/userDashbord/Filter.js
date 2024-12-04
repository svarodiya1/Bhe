// import { FunnelIcon } from '@heroicons/react/24/outline';
import { MdFilterAlt } from "react-icons/md";
import React, {useState} from "react";


const FilterButton = () => {


    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Example filter options
    const filterOptions = ["Order Id", "Product Name", "Status"];




    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                <MdFilterAlt className="h-6 w-6" />
                <span>Filter</span>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
                    <ul className="py-1">
                        {filterOptions.map((option, index) => (
                            <li
                                key={index}
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
                                onClick={() => {
                                    setIsOpen(false);
                                    alert(`You selected ${option}`);
                                    // Add filter logic here
                                }}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FilterButton;
