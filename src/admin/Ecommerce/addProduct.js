import { React, useState, useEffect } from "react";
import img1 from "./apron with cap and checks.png";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

function AddProduct() {
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [sizeOptions, setSizeOptions] = useState([]); // State for sizes
  const [brand, setBrand] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [currentSubCategoryId, setCurrentSubCategoryId] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(null);

  // State to track selected sizes and their prices
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizePrices, setSizePrices] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getMainCategory.php`);
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    const fetchSizes = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getSizes.php`);
        if (response.success) {
          setSizeOptions(response.data); // Populate size options
        } else {
          console.error("Error fetching sizes:", response.message);
        }
      } catch (error) {
        console.error("Error fetching size data:", error);
      }
    };

    fetchCategories();
    fetchSizes();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCurrentCategoryId(selectedCategoryId);
    setCurrentSubCategoryId(0);
    fetchSubCategories(selectedCategoryId);
  };

  const fetchSubCategories = async (categoryId) => {
    if (!categoryId) {
      setSubCatData([]);
      return;
    }
    try {
      const response = await $.getJSON(
        `${ApiURl}/getsubCategory.php?category_id=${categoryId}`
      );

      console.log(response);
      setSubCatData(response.data);
    } catch (error) {
      console.error("Error fetching sub-category data:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddSize = () => {
    if (size && !selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]); // Add size to the list
      setSize(""); // Clear the size input after adding
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setSelectedSizes(selectedSizes.filter((size) => size !== sizeToRemove));
    const newSizePrices = { ...sizePrices };
    delete newSizePrices[sizeToRemove];
    setSizePrices(newSizePrices); // Remove price when size is removed
  };

  const handlePriceChange = (e, size) => {
    const newPrice = e.target.value;
    setProductPrice((prevPrices) => ({
      ...prevPrices,
      [size]: newPrice, // Update price for the specific size
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", parseInt(productPrice)); // This should be for the default price, if needed
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("currentCategoryId", parseInt(currentCategoryId));
    formData.append("currentSubCategoryId", parseInt(currentSubCategoryId));
    formData.append("stock_quantity", stockQuantity);
    formData.append("image", imageFile);
  
    // Append sizes and their respective prices to form data
    selectedSizes.forEach((size) => {
      formData.append("sizes[]", size);
      formData.append(`price_${size}`, productPrice[size] || 0); // Use productPrice for the size prices
    });
  
    // Send the data using AJAX to the backend
    $.ajax({
      url: `${ApiURl}/createProduct.php`,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        if (response.success) {
          alert("Product added successfully");
        }
        console.log("Success:", response);
      },
      error: function (error) {
        console.error("Error:", error.responseText);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 bg-gray-100 md:grid-cols-2 lg:grid-cols-3 gap-6 px-7">
          <section className="lg:col-span-2 bg-white">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Type product name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    onChange={handleCategoryChange}
                    value={currentCategoryId}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="" hidden>
                      Select category
                    </option>
                    {catData.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sub_category"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sub-Category
                  </label>
                  <select
                    id="sub_category"
                    onChange={(e) => setCurrentSubCategoryId(e.target.value)}
                    value={currentSubCategoryId}
                    disabled={!currentCategoryId}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="" hidden>
                      Select sub-category
                    </option>
                    {subCatData.map((row) => (
                      <option key={row.category_id} value={row.category_id}>
                        {row.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="size"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Size
                  </label>
                  <select
                    id="size"
                    value={size}
                    onChange={handleSizeChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="" hidden>
                      Select size
                    </option>
                    {sizeOptions.map((option) => (
                      <option key={option.id} value={option.size}>
                        {option.size}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg"
                  >
                    Add Size
                  </button>
                </div>

               {/* Display added sizes */}
<div>
  <label className="block mb-2 text-sm font-medium text-gray-900">
    Added Sizes
  </label>
  <ul className="space-y-4">
    {selectedSizes.map((addedSize, index) => (
      <li
        key={index}
        className="flex flex-col sm:flex-row justify-between items-center sm:space-x-4 space-y-2 sm:space-y-0"
      >
        <span className="w-full sm:w-auto text-gray-900">{addedSize}</span>
        
        {/* Price input for each size */}
        <input
          type="number"
          placeholder="Price"
          value={productPrice[addedSize] || ""}
          onChange={(e) => handlePriceChange(e, addedSize)}
          className="ml-4 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full sm:w-32"
        />
        
        <button
          type="button"
          onClick={() => handleRemoveSize(addedSize)}
          className="text-red-500 w-full sm:w-auto text-center mt-2 sm:mt-0"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</div>


                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-gray-
300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Product brand"
                    required
                  />
                </div>

                {/* <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="₹ 2999"
                    required
                  />
                </div> */}
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
              >
                Add product
              </button>
            </div>
          </section>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
