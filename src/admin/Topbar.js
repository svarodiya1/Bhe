// src/components/Topbar.js
import React from 'react';

const Topbar = () => {
    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <button className="text-gray-600">Notifications</button>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
}

export default Topbar;
