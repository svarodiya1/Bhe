import React from "react";
import { Link } from "react-router-dom";

function Products(props) {

    return (

        <>

            <div
                className="mb-5 lg:w-64 w-44 m-auto transform overflow-hidden rounded-md bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">



                
               <Link 

                    to={`/ProductOverview/${props.product_id}`}

               > <img className="h-48 w-full object-cover object-center"
                    src={props.productImages} alt="Product Image" />
                    </Link>
                <div className="p-4">
                        <p className="text-xs font-semibold text-gray-500 mb-1">{props.categoryName}</p>
                    <h2 className="mb-2 md:text-base text-sm  text-gray-900">{props.productName}</h2>
                    {/* <p className="mb-2 text-xs text-gray-700">{props.productDescription}</p> */}
                    <div className="flex items-center">
                        <p className="mr-2 text-md font-semibold text-gray-900">{props.discountPrice}</p>
                        <p className="text-md  font-medium text-gray-500 line-through">{props.actualPrice}
                        </p>
                        <div className="mt-1 text-center">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
                {/* <div>
                    <a href="#"
                        className="flex items-center justify-center px-5 py-2.5 text-center bg-yellow-800 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</a>
                </div> */}

            </div>



        </>


    );
}

export default Products;