import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import ApiURl from '../controllers/Api';
import imgLocation from '../controllers/imagePath';
import { Link } from 'react-router-dom';


const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    // Fetch wishlist items on component mount
    const fetchWishlistItems = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getWishlistItems.php?user_id=${user_id}`);
        console.log(response);
        setWishlistItems(response.wishlist);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    if (user_id) {
      fetchWishlistItems();
    }
  }, [user_id]);

  const removeItem = async (productId) => {
    // Here you should ideally call an API to remove the item from the wishlist
    // Assuming you have an API endpoint for this (e.g., removeWishlistItem.php)
    try {
      // Call your API to remove the item from the wishlist
      await $.ajax({
        url: `${ApiURl}/removeWishlistItem.php`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ user_id, product_id: productId }),
      });
      // Update local state
      setWishlistItems(wishlistItems.filter((item) => item.product_id !== productId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-5 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.product_id} className="bg-white shadow-md rounded-lg p-4">
              <Link to={`/ProductOverview/${item.product_id}`}>
              <img
                src={`${imgLocation}/${item.img_path}`} // Ensure this is the correct property name
                alt={item.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              </Link>
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              {/* You might want to include price in the wishlist data from the server */}
              <p className="text-gray-700 mb-4">&#x20b9;{item.price}</p>
              <button
                onClick={() => removeItem(item.product_id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Remove 
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
