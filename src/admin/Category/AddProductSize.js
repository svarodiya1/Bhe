import { useState, useEffect } from "react";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

function AddProductSize() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [size, setSize] = useState("");
  const [message, setMessage] = useState("");

  // Fetch main categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getMainCategory.php`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on the selected category
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await $.getJSON(`${ApiURl}/getSubCategories.php`);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategoryId(selectedCategoryId);
    setSubCategoryId(""); // Reset subcategory selection
    if (selectedCategoryId) {
      fetchSubCategories(selectedCategoryId);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload

    // Basic input validation
    if (!categoryId || !subCategoryId || size.trim() === "") {
      setMessage("All fields are required.");
      return;
    }

    // Submit size to the database
    $.ajax({
      url: "http://localhost/ecommere_react_with_php-main/src/ajax/createProductSize.php",
      type: "POST",
      data: {
        category_id: categoryId,
        sub_category_id: subCategoryId,
        size: size,
      },
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          alert("Size added successfully");
          setMessage("Size added successfully!");
          setSize(""); // Reset the size input field
        } else {
          setMessage(response.message || "Error adding size.");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        setMessage("An error occurred while adding the size.");
      },
    });
  };

  return (
    <>
      <div className="bg-gray-100">
        <section className="lg:col-span-2 overflow-x-hidden bg-white border border-gray-900 mx-7">
          <div className="py-8 px-4 mx-auto max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Category Dropdown */}
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
                    onChange={handleCategoryChange}
                    value={categoryId}
                  >
                    <option value="">Select category</option>
                    {categories.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Dropdown */}
                <div>
                  <label
                    htmlFor="subcategory"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Subcategory
                  </label>
                  <select
                    id="subcategory"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setSubCategoryId(e.target.value)}
                    value={subCategoryId}
                  >
                    <option value="">Select subcategory</option>
                    {subCategories.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.sub_category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Input */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="size"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Size
                  </label>
                  <input
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    type="text"
                    name="size"
                    id="size"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter size (e.g., Small, Medium, Large)"
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
                Add Size
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddProductSize;
