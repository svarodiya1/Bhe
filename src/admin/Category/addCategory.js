import { useState } from "react";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  

  // Handle image file selection and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); // Read the file and convert it to a base64 string
    } else {
      setImagePreview(null); // Reset preview if no file is selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload

    // Basic input validation
    if (categoryName.trim() === "") {
      setMessage("Category name cannot be empty.");
      return;
    }

    if (!imageFile) {
      setMessage("Please upload an image.");
      return;
    }

    // Create a FormData object to handle text and file data
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("image", imageFile); // Append the image file to formData

    $.ajax({
      url: `${ApiURl}/makeCategory.php`,
      type: "POST",
      data: formData,
      contentType: false, // Don't set contentType, jQuery will set it as multipart/form-data
      processData: false, // Don't process the data, let it send as is (multipart)
      dataType: "json",
      success: function (response) {
        console.log(response);
        if (response.status === "success") {
          alert("Category created successfully");
          setMessage("Category added successfully!");
          setCategoryName(""); // Reset the input field
          setImageFile(null); // Reset the file input
          setImagePreview(null); // Clear image preview
        } else {
          setMessage(response.message || "Error adding category.");
        }
      },
      error: function (xhr, status, error) {
        console.log("error", error, status);
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
                <section className="bg-white">
                  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Upload Category Image
                    </label>

                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF (Max size: 2MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg, image/gif"
                      />
                    </label>

                    {/* Image Preview */}
                  </div>
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Image Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Selected category"
                        className="w-64 h-auto mt-2 border rounded-lg"
                      />
                    </div>
                  )}
                </section>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category Name
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
                Add Category
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default AddCategory;
