import { React, useState, useEffect } from "react";
import img1 from "./apron with cap and checks.png";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

function AddProduct() {
  const [catData, setCatData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", parseInt(productPrice));
    formData.append("description", description);
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("currentCategoryId", parseInt(currentCategoryId));
    formData.append("stock_quantity", stockQuantity);
    formData.append("image", imageFile); // Append the image file

    $.ajax({
      url: `${ApiURl}/createProduct.php`,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {

              if((response.success)){
                alert("Product added successfully");
                // window.location.href = "/admin/ecommerce/productList";
              }
        console.log("Success:", response);
      },
      error: function (error) {
        console.error("Error:", error.responseText);
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(
          `${ApiURl}/getCatData.php`
        );
        setCatData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{currentCategoryId}</h1>

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
                    name="name"
                    id="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Type product name"
                    required
                  />
                </div>

                {/* Rest of the input fields */}
                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Product brand"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    id="price"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="₹ 2999"
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
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    onChange={(e) => setCurrentCategoryId(e.target.value)}
                    value={currentCategoryId}
                  >
                    <option value="">Select category</option>
                    {catData.map((row) => (
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
                  <input
                    type="number"
                    name="size"
                    id="size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="12"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock_quantity"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Stock quantity
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    id="stock_quantity"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="12"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="8"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300"
                    placeholder="Your description here"
                  ></textarea>
                </div>
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
