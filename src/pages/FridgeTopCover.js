// import React from 'react';
import React, { useState } from 'react';
import '../App.css';

import FridgeTopCover from "../ProductsPage/FridgeTopCover";
import ProdcutSidebar from "../component/productSidebar";

const About = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar Button for Small Screens */}
            <button
                className="bg-blue-500 text-white p-3 md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? "Close Filters" : "Open Filters"}
            </button>

            {/* Sidebar */}
            <div
                className={`${sidebarOpen ? "block" : "hidden"
                    } w-full md:w-72 bg-gray-100 p-5 md:block`}
            >
                <ProdcutSidebar />
            </div>
            {/* Products Section */}
            <div className="flex-1 md:px-5 mx-auto">
                <FridgeTopCover />
            </div>
        </div>
    );

};

export default About;
