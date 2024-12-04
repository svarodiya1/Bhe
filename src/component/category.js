import React from 'react';

function Category({productsName, img}) {


    return (


        <>
            <div
                className="group my-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="./table_cover.html">
                    <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={img}
                        alt="product image" />
                    <img className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                        src={img} alt="product image" />
                </a>
                <div className="mt-4 px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl tracking-tight text-slate-900 font-semibold text-center">{productsName}</h5>
                    </a>
                    <a href="./table_cover.html"
                        className="flex items-center justify-center mt-5 rounded-md px-5 py-2.5 text-center bg-blue-500 text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300">
                        View Products</a>
                </div>
            </div>


        </>


    )


}



export default Category;

