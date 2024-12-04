import React from "react";

function CheckoutProductsView({ data }) {
  return (
    <div className="mt-6 min-w-[25vw] w-full space-y-6 sm:mt-8 lg:mt-16 lg:max-w-xs xl:max-w-md">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <dt className="text-base text-center border-b pb-2 font-normal text-gray-500">
          Items
        </dt>

        <div className="-my-3 divide-y divide-gray-200">
          {data.map((item, index) => {
            return (
              <dl key={index} className="flex items-center justify-between gap-4 pb-3">
                {/* <dt className="text-sm font-normal text-gray-500">Image</dt> */}
                <dt className="text-sm font-medium w-10 whitespace-nowrap text-gray-500">{item.name} </dt>
                <dt className="text-sm font-normal text-gray-500">
                  Qty : <span className="font-medium"> {item.quantity}</span>{" "}
                </dt>

                <dd className="text-sm font-medium text-gray-900">
                  &#x20b9;{item.price}
                </dd>
              </dl>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckoutProductsView;
