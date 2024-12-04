import React, { useState, useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost/ecommere_react_with_php-main/ajax/getUsers.php"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle delete action
  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      try {
        const response = await fetch(
          "http://localhost/ecommere_react_with_php-main/ajax/deleteUser.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.user_id }), // Pass user ID to the backend
          }
        );
        const result = await response.json();

        if (result.success) {
          alert(result.message); // Notify the user of success
          setUsers(users.filter((u) => u.user_id !== user.user_id)); // Remove user from state
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user");
      }
    }
  };

  // Handle user pagination (10 users by default or all users)
  const displayedUsers = showAllUsers ? users : users.slice(0, 10);

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-md">
      <h2 className="text-3xl font-semibold text-center mb-4">User List</h2>
      {loading ? (
        <div className="text-center text-gray-500 transition-opacity duration-500">
          Loading...
        </div>
      ) : users.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              {showAllUsers ? "Show Less" : "Show All"}
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">User ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Phone Number</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedUsers.map((user) => (
                <tr key={user.user_id} className="transition-all hover:bg-gray-100">
                  <td className="px-6 py-4">{user.user_id}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-around">
                      <button
                        onClick={() => alert(`Viewing user: ${JSON.stringify(user)}`)}
                        className="text-blue-500 hover:text-blue-700 transition"
                      >
                        <IoEyeOutline />
                      </button>
                      <button
                        onClick={() => alert(`Editing user: ${JSON.stringify(user)}`)}
                        className="text-green-500 hover:text-green-700 transition"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="text-center text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default UserList;
