import React from "react";
import { Link } from "react-router-dom";
import imgLocation from "../controllers/imagePath";

const ProductItems = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.product_id}
          className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transform hover:scale-105 transition duration-300"
        >
          <Link to={`/ProductOverview/${product.product_id}`}>
            <img
              src={`${imgLocation}/${product.img_path}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <div className="flex items-center justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductItems;
