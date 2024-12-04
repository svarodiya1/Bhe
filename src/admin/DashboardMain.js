// src/components/DashboardMain.js or src/components/MainSection.js (wherever Sidebar is used)
import React, { useState } from 'react';
import Sidebar from './sidebar';
import Topbar from './Topbar'; // If you are still using it
import Dashboard from './Dashboard/Dashbord'; // or other components
import AddProduct from './Ecommerce/addProduct'; // or other components
import ProductList from './Ecommerce/productList';
import AddCategory from './Category/addCategory';
import CategoryList from './Category/categoryList';
import UserList from './User/userList';
import AddSubCategory from './Category/AddSubCategory';
import MainCategoryList from './Category/ManageMainCategory';

function DashboardMain() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('dashboard'); // state for active section

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'add-product':
                return <AddProduct />;
            case 'product-list':
                return <ProductList />;
            case 'add-category':
                return <AddCategory />;
            case 'category-list':
                return <CategoryList />;
            case 'main-category-list':
                return <MainCategoryList />;
            case 'user-list':
                return <UserList />;
            case 'sub-cat':
                return <AddSubCategory />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex max-w-8xl mx-auto">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveSection={setActiveSection} />

            {/* Main Section */}
            <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
                {/* Topbar */}
                <Topbar toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <div className="section-content">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}

export default DashboardMain;
