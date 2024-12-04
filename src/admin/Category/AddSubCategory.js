import { useState,useEffect } from "react";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

function AddSubCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [catData, setCatData] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);

  // Handle image file selection and preview
 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getMainCategory.php`
        );
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload

    // Basic input validation
    if (categoryName.trim() === "") {
      setMessage("Category name cannot be empty.");
      return;
    }
   


    



    $.ajax({
      url: "http://localhost/ecommere_react_with_php-main/src/ajax/createSubCategory.php",
      type: "POST",
      data: {
        category_name:categoryName,
        main_category_id:currentCategoryId
      },

      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.status === "success") {
          alert("Category created successfully");
          setMessage("Category added successfully!");
          setCategoryName(""); // Reset the input field
 // Clear image preview
        } else {
          setMessage(response.message || "Error adding category.");
        }
      },
      error: function (xhr, status, error) {
        console.log("error", error, status);
        console.log(error.responseText)
        setMessage("An error occurred while adding the category.");
      },
    });
  };

  return (
    <>
      <div className="bg-gray-100">
        <section className="lg:col-span-2 overflow-x-hidden bg-white border boder-gray-900 mx-7">
          <div className="py-8 px-4 mx-auto max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            


              <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setCurrentCategoryId(e.target.value)}
                    value={currentCategoryId}
                  >
                    <option value="">Select category</option>
                    {catData.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.category_name}
                      </option>
                    ))}
                  </select>
                </div>




                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sub Category  Name
                  </label>

                  <input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    type="text"
                    name="new_cat_name"
                    id="name"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter category name"
                    required
                  />
                </div>
              </div>

              {message && (
                <p className="mt-2 text-sm text-red-600">{message}</p>
              )}
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
              >
                Add Sub Category
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddSubCategory;
