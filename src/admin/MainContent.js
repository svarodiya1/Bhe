// src/components/MainSection.js
import React, { useState } from 'react';
import AddProduct from './Ecommerce/addProduct';
import ProductList from './Ecommerce/productList';
import AddCategory from './Category/addCategory';
import CategoryList from './Category/categoryList';
import UserList from './User/userList';
import Dashboard from './Dashboard/Dashbord';
import AddSubCategory from './Category/AddSubCategory';
import MainCategoryList from './Category/ManageMainCategory';

const MainSection = () => {
    const [activeSection, setActiveSection] = useState('dashboard');

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
        <div className="main-section">
            {/* Top Navbar (commented out) */}
            {/* <div className="section-buttons bg-gray-100 flex justify-center gap-x-10 flex-wrap">
                <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
                <button onClick={() => setActiveSection('add-product')}>Add Product</button>
                <button onClick={() => setActiveSection('product-list')}>Product List</button>
                <button onClick={() => setActiveSection('add-category')}>Add Main Category</button>
                <button onClick={() => setActiveSection('category-list')}>Manage Sub Categories</button>
                <button onClick={() => setActiveSection('main-category-list')}>Manage Main Categories</button>
                <button onClick={() => setActiveSection('user-list')}>User List</button>
                <button onClick={() => setActiveSection('sub-cat')}>Add Sub category </button>
            </div> */}

            <div className="section-content">
                {renderSection()}
            </div>
        </div>
    );
};

export default MainSection;
