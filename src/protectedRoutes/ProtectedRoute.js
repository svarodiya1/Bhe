import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import $ from 'jquery';
import ApiURl from '../controllers/Api';


const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` for loading state
  const token = localStorage.getItem('token');



  const send_token= `Bearer ${token}`; 

  console.log("hello word")

  

  useEffect(() => {
    if (token) {
      // Check if the token is valid by making an API call
      $.ajax({
        url: `${ApiURl}/auth.php`,
        method: "GET",
        data:{
          token:send_token

        },
        headers: {
          Authorization: `Bearer ${token}` // Send token in Authorization header
        },
      })
      .done((response) => {
        console.log(response);
        setIsAuthenticated(response.success); // Assume your API returns success as a boolean
      })
      .fail((error) => {
        console.log(error);
        console.log(error.responseText);
        console.error(error.responseJSON);
        setIsAuthenticated(false); // Handle error in API call
      });
    } else {
      setIsAuthenticated(false); // No token means not authenticated
    }
  }, [token]); // Run the effect when the token changes

  // Handle loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  // Redirect based on authentication status
  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
