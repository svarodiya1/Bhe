
import React, { useState } from 'react';
import '../App.css';

import TableCover from '../ProductsPage/TableCover';
import ProdcutSidebar from "../component/productSidebar";


function TableCoverView(){
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
      <div className="min-h-screen flex flex-col py-5 md:flex-row max-w-8xl mx-auto">
        {/* Sidebar Button for Small Screens */}
        <button
          className="bg-blue-500 text-white p-3 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Filters" : "Open Filters"}
        </button>
  
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } w-full md:w-72 bg-gray-100 p-5 md:block`}
        >
          <ProdcutSidebar />
        </div>
        {/* Products Section */}
        <div className="flex-1 md:px-5 my-5 md:my-0 mx-auto">
         <TableCover/>
        </div>
      </div>
    );

}


export default TableCoverView;