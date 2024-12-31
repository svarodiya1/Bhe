import { Link } from "react-router-dom";
import Layout from "../pages/Layout";
import { useState } from "react";
import { SlUser } from "react-icons/sl";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { PiShoppingCartSimple } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import bhatiaLogo from "../images/bhatia-emporium.jpg";
import LogoutButton from "./LogoutButton";
import { useHistory } from 'react-router-dom';
import SearchBar from "./Searchbar"
function Navbar() {
  const toggleMenu = () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  };

  // const [isMenuVisible, setMenuVisible] = useState(false);
const fetchSearchResults = async (query) => {
    const response = await fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data); // Handle data as needed
  };
  // const toggleMenu = () => {
  //   setMenuVisible(prevState => !prevState);
  // };

  return (
    <>
     <div className="bg-gradient-to-r from-purple-200 via-purple-500 to-purple-300">
  <nav className="bg-transparent border-b border-gray-300 shadow-sm max-w-8xl mx-auto">
    <div className="container mx-auto flex justify-between items-center py-4 px-3 md:px-6">
      {/* <!-- Logo --> */}
      <div className="font-bold text-gray-900 md:w-24 w-16">
        <Link to="/" className="md:text-xl text-lg font-bold">
          <img src="https://bhatiaemporium.com/wp-content/uploads/2024/02/cropped-Bhagtia-Emporium-LOGO-1.png" width="" alt="" />
        </Link>
      </div>
            {/* <!-- Search Bar (Visible on larger screens) --> */}
            <div className="lg:block w-2/4">
              {/* <input type="text" placeholder="Enter your product name..." className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-200" /> */}
              <div className="relative w-full max-w-xl">
                {/* Dynamic SearchBar */}
                <SearchBar onsearch={fetchSearchResults}/>
                <button className="absolute inset-y-0 md:right-2 right-1 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    fill="#717478"
                    y="0px"
                    width="22"
                    height="18"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* <!-- Main Navigation Links (Hidden on mobile) --> */}
            {/* <!-- Icons Section --> */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col justify-center items-center">
                <Link
                  to="/dashboard"
                  className="text-white font-bold hover:text-gray-800 md:block text-lg hidden"
                >
                  <SlUser />
                </Link>
                <span className="text-xs font-semibold md:block hidden">
                  Profile
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Link
                  to="/wishlist"
                   className="text-white font-bold hover:text-gray-800 md:block text-lg hidden"
                >
                  <IoMdHeartEmpty />
                </Link>
                <span className="text-xs font-semibold md:block hidden">
                  Wishlist
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                <Link
                  to={"/cart"}
                    className="text-white font-bold hover:text-gray-800 md:block text-lg hidden"
                >
                  <PiShoppingCartSimple />
                </Link>
                <span className="text-xs font-semibold md:block hidden">
                  Cart
                </span>
              </div>
              <LogoutButton/>
            </div>
            {/* <!-- Mobile Hamburger Icon --> */}
            <button
               className="lg:hidden text-white hover:text-purple-300 bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition duration-200"
               onClick={toggleMenu}
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div> 

          <div className="flex justify-center">
            <ul className="hidden lg:flex w-full justify-center items-center space-x-5 py-2 border-y border-gray-300">
              <li className="relative group">
                <a href="#" className="font-bold text-white ">
                  All Categories 
                </a>

                {/* <!-- Dropdown Menu --> */}
                <div className="hidden z-50 absolute left-0 top-full bg-[#CDC1FF] border-gray-200 mt-2 p-6 w-[800px] group-hover:flex justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 border-b pb-2">
                      Table Cover
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Desktop
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Laptop
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Camera
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Tablet
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Headphone
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                      Kitchen Apron
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Formal
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Casual
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Sports
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Jacket
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Sunglasses
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                      Fridge Cover
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Formal
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Casual
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Perfume
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Cosmetics
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Bags
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                      Bad Sheet
                    </h4>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Smart Watch
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Smart TV
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Keyboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Mouse
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-gray-800"
                        >
                          Microphone
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <span className="text-gray-400">|</span>
              <li>
                <Link
                  to="/table-top"
                  className="font-bold text-white "
                >
                  Table Cover
                </Link>
              </li>
              <span className="text-gray-400">|</span>
              <li>
                <Link
                  to="/washing-machine-cover"
                  className="font-bold text-white "
                >
                  Washing Machine Cover
                </Link>
              </li>
              <span className="text-gray-400">|</span>
              <li>
                <a href="#" className="font-bold text-white ">
                  Mattress Cover
                </a>
              </li>
              <span className="text-gray-400">|</span>

              <li>
                <Link
                  to="/kitchen-apron"
                  className="font-bold text-white "
                >
                  Kitchen Apron
                </Link>
              </li>
              <span className="text-gray-400">|</span>

              <li>
                <Link
                  to="/fridge-top-cover"
                  className="font-bold text-white"
                >
                  Fridge Cover
                </Link>
              </li>
              <span className="text-gray-400">|</span>
              <li>
                <Link to="/" className="font-bold text-white ">
                  TV Cover
                </Link>
              </li>
              <span className="text-gray-400">|</span>
            </ul>
          </div>
          {/* <Layout/> */}

          {/* <!-- Mobile Menu (Hidden by default) --> */}
          <div
            id="mobile-menu"
            className="hidden z-50 lg:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <ul className="flex flex-col items-start p-4 space-y-4">
              <li className="relative group">
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  All Categories
                </a>
                {/* <!-- Dropdown Menu for mobile --> */}
                <div className="hidden z-50 group-hover:block mt-2 bg-white shadow-lg p-6 w-full">
                  <div className="flex gap-x-8 justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Table Cover
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            40 x 40 Cover
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            40 x 60 Cover
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            45 x 70 Cover
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            60 Round Cover
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            48 x 48 Cover
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Kitchen Apron
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            Ladies Apron
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            Baby Apron
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            Apron With Cap
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            Check Apron
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800 underline"
                          >
                            Check and Cap Both
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div className="flex gap-x-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Fridge Cover
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Desktop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Laptop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Camera
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Tablet
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Headphone
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Bed Sheet
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Desktop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Laptop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Camera
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Tablet
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Headphone
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* <div>
                                        <h4 className="font-semibold text-gray-900 mb-3">Electronics</h4>
                                        <ul className="space-y-2">
                                            <li><a href="#" className="text-gray-600 hover:text-gray-800">Desktop</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-800">Laptop</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-800">Camera</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-800">Tablet</a></li>
                                            <li><a href="#" className="text-gray-600 hover:text-gray-800">Headphone</a></li>
                                        </ul>
                                    </div> */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Electronics
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Desktop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Laptop
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Camera
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Tablet
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-gray-600 hover:text-gray-800"
                          >
                            Headphone
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/table-top"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Table Cover
                </Link>
              </li>
              <li>
                <Link
                  to="/washing-machine-cover"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Washing Machine Cover
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  Mattress Cover
                </a>
              </li>

              <li>
                <Link
                  to="/kitchen-apron"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Kitchen Apron
                </Link>
              </li>

              <li>
                <Link
                  to="/fridge-top-cover"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Fridge Cover
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-700 hover:text-gray-900">
                  TV Cover
                </Link>
              </li>
            </ul>
            <hr className="my-4" />
            <div className="flex items-center justify-center space-x-10 pb-2">
              {/* <Link to="/login"
                                className="text-gray-600 hover:text-gray-800 text-2xl"><SlUser /></Link> */}
              <div className="flex flex-col justify-center items-center">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-800 md:block text-2xl"
                >
                  <SlUser />
                </Link>
                <span className="text-xs font-semibold md:block">Profile</span>
              </div>
              {/* <Link to="/wishlist" className="text-gray-600 hover:text-gray-800 text-3xl"><IoMdHeartEmpty /></Link> */}
              <div className="flex flex-col justify-center items-center">
                <Link
                  to="/wishlist"
                  className="text-gray-600 hover:text-gray-800 text-2xl md:block"
                >
                  <IoMdHeartEmpty />
                </Link>
                <span className="text-xs font-semibold md:block">Wishlist</span>
              </div>
              {/* <Link to={"/cart"} className="text-gray-600 hover:text-gray-800 text-2xl" ><i className="fas fa-shopping-cart"></i></Link> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;