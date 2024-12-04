import React from "react";
import { NavLink } from "react-router-dom";

function Error() {
    return (

        <>
            <div className="bg-gray-50">
                <div className="max-w-8xl mx-auto bg-white">
                    <div className="flex flex-col justify-center items-center border h-96">
                        <div>
                            <h1 className="text-3xl font-bold">404 Error Page</h1>
                        </div>
                        <div>
                            <p>Sorry, This page doesn't exist</p>
                        </div>
                        <div className="mt-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            <NavLink to={'/'}>
                                Back To Home
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

        </>



    );
}

export default Error;