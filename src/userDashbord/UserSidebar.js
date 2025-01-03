import React, { useState } from 'react';
// import UserNavbar from './UserNavbar';
import DashboardSection from './Dashbord';
import OrderSection from './OrderSection';
import UserProfile from './UserProfile';
// import UserSetting from './UserSetting';

const UserSidebar = () => {
  // State to manage active section
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'orders':
        return <OrderSection />;
      case 'profile':
        return <UserProfile />;
      // case 'settings':
      //   return <UserSetting />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className='bg-gray-50'>


      <div className="md:flex bg-gray-50  jusctify-between max-w-8xl mx-auto pb-5">


        {/* <div className="flex-1">
        <UserNavbar />
        {renderSection()}
      </div> */}



        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-x-3 bg-blue-600 px-4 py-2 text-white w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-6 h-6"
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
          <h1 className="text-xl font-bold">User DashBoard</h1>
        </div>

        {/* Sidebar */}
        <div className={`inset-y-0 left-0 md:w-56 w-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
          {/* <div className="bg-blue-600 h-16 flex items-center justify-center text-white font-bold text-xl">
          Bhatia Emporium
        </div> */}

          <nav className="mt-1">
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 ${activeSection === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection('orders')}
              className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 ${activeSection === 'orders' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 ${activeSection === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`block w-full text-left py-2.5 px-4 rounded transition duration-200 ${activeSection === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white'}`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* <UserNavbar /> */}
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
