import logo from './logo.svg';
import Navbar from './component/navbar';
import Slider from './component/Slider';
import Category from './component/category';
import img1 from './CategoryImg/table_cover.png';
import img2 from './CategoryImg/washing_machine.webp';
import img3 from './CategoryImg/mattress_cover.webp';
// import Slider from './component/slider';
import img4 from './CategoryImg/apron_cover.png';
import img5 from './CategoryImg/curtain_cover.webp';
import img6 from './CategoryImg/bet_Sheet.webp';
import img7 from './CategoryImg/ac_cover.webp';
import img8 from './CategoryImg/tv_cover.webp';
import './output.css';
import FridgeTopCover from './ProductsPage/FridgeTopCover';
import FridgeTopCoverView from './ProductViewPage/FridgeTopCoverView';
import KitchenApronView from './ProductViewPage/KitchenApronView';
import Layout from './pages/Layout';
import TableCover from './ProductsPage/TableCover'
import ProductOverview from './component/ProductsOverview'
import cart from './component/cart'
import Checkout from './component/checkout';
import Dashboard from './userDashbord/Dashbord';
import UserNavbar from './userDashbord/UserNavbar'
import UserSidebar from './userDashbord/UserSidebar'
import OrderSection from './userDashbord/OrderSection';
import UserProfile from './userDashbord/UserProfile'
import UserSetting from './userDashbord/UserSetting'
// import Receipt from './component/Receipt';
import DashboardMain from './admin/DashboardMain';
import Home from './component/home';


import Footer from './component/footer';
import Sidebar from './admin/sidebar';
import Login from './component/login';

// import './App.css';

function App() {
  return (
    <>

      <Navbar />
      <Slider />

      <Home />

      {/* <KitchenApron /> */}



      {/* <KitchenApronView /> */}




      {/* <FridgeTopCover/> */}

      {/* <div className='mt-10'>
    <FridgeTopCoverView/>
    </div> */}


      {/* <TableCover /> */}

      <DashboardMain />


      <ProductOverview />

      <Cart />

      <Checkout />


      <Login />


      {/* <Receipt /> */}



      <div className='max-w-8xl mx-auto'>
        <UserSidebar />
      </div>



      <div className='max-w-8xl mx-auto'>
        <Layout />
      </div>




      <Footer />


    </>
  );
}

export default App;
