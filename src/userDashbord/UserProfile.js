import React, { useState } from 'react';
import $ from 'jquery';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ApiURl from "../controllers/Api";
const ProfileSection = () => {

      const [userData,setUserData]     = useState({})  
  const token = localStorage.getItem('token');

  useEffect(() => {
    
      // Check if the token is valid by making an API call

        let token = localStorage.getItem('token');
      
      $.ajax({
        url:`${ApiURl}/getUser.php`,
        method: "GET",
        
        data: {

          token: token
          
        }
      })
      .done((response) => {
        console.log(response);


        if (response.success) {




        setUserData(response.ver_user);


        }




        
      })
      .fail((error) => {
        console.log(error) // Handle error in API call
      });
  
  }, [])




  console.log(userData);


  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-5 mx-3 md:mx-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>

        {/* User Information */}
        <div className="flex-1 mt-4 md:mt-0">
          <h3 className="text-xl font-semibold text-gray-800">{userData.firstname +" "+ userData.lastname}</h3>
          <p className="text-gray-600">{userData.email}</p>

          {/* Edit Profile Button */}
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>

      Additional Profile Information
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
       
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">First  Name </h4>
          <p className="text-gray-600 mt-1">{userData.firstname}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Last Name</h4>
          <p className="text-gray-600 mt-1">{userData.lastname}</p>
        </div>

        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Phone Number</h4>
          <p className="text-gray-600 mt-1">+91 - {userData.phone}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Email</h4>
          <p className="text-gray-600 mt-1">{userData.email}</p>
        </div>

        
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Address</h4>
          <p className="text-gray-600 mt-1">house no -123 Main Street</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Landmark</h4>
          <p className="text-gray-600 mt-1">ram mandir</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Zipcode</h4>
          <p className="text-gray-600 mt-1">110022</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">City</h4>
          <p className="text-gray-600 mt-1">New Delhi</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">State</h4>
          <p className="text-gray-600 mt-1">Delhi</p>
        </div>

       
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-gray-700 font-semibold">Member Since</h4>
          <p className="text-gray-600 mt-1">January 2022</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
