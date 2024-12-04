import React from 'react';
import './index.css';
import './output.css';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Home from './component/home';
import FridgeTopCover from './ProductViewPage/FridgeTopCoverView';
import TableCover from './ProductViewPage/TableCover';
import Login from './component/login';
import KitchenApron from './ProductViewPage/KitchenApronView';
import ProductOverview from './component/ProductsOverview';
import Wishlist from './component/Wishlist';
import WashingMachineView from './ProductViewPage/WashingMachineCoverView';
import Cart from './component/cart';
import Checkout from './component/checkout';
import Receipt from './component/Receipt';
import UserSidebar from './userDashbord/UserSidebar';
import DashboardMain from './admin/DashboardMain';
import Error from './component/Error';

import ForgotPassword from './component/ForgetPassword';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import Products from './ProductViewPage/Products';


ReactDom.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/table-top" element={<TableCover />} />
          <Route path="/kitchen-apron" element={<KitchenApron />} />
          <Route path="/fridge-top-cover" element={<FridgeTopCover />} />
          <Route path="/ProductOverview/:id" element={<ProductOverview />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/washing-machine-cover" element={<WashingMachineView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/products/:id" element={<Products />} />

          {/* Protected Routes */}
          <Route path="/cart/checkout" element={<ProtectedRoute element={Checkout} />} />
          <Route path="/cart/checkout/receipt" element={<ProtectedRoute element={Receipt} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={UserSidebar} />} />
          <Route path="/admin" element={<ProtectedRoute element={DashboardMain} />} />
          <Route path="/cart" element={<ProtectedRoute element={Cart} />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
