import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import $ from "jquery";
import ApiURl from "../../controllers/Api";

const CategoryList = () => {
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await $.getJSON(`${ApiURl}/getCatData.php`);
        if (response && response.data) {
          const dataWithMainCategoryNames = response.data.map((category) => ({
            ...category,
            main_category_name: category.parent_id
              ? category.main_category_name || "N/A"
              : "Root",
          }));
          setCatData(dataWithMainCategoryNames);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeactivate = (categoryId) => {
    if (window.confirm("Are you sure you want to make this category inactive?")) {
      $.ajax({
        url: `${ApiURl}/deleteCategory.php`,
        type: "POST",
        data: { category_id: categoryId },
        success: function (response) {
          try {
            const result = response;
            if (result.status === "success") {
              alert(result.message);
              setCatData((prevData) =>
                prevData.map((cat) =>
                  cat.category_id === categoryId
                    ? { ...cat, is_active: 0 }
                    : cat
                )
              );
            } else {
              alert(result.message);
            }
          } catch (e) {
            console.error("Failed to parse response:", response);
            alert("An unexpected error occurred.");
          }
        },
        error: function (error) {
          console.error("AJAX request failed:", error);
          alert("Failed to update the category. Please try again.");
        },
      });
    }
  };

  // Sort categories to place inactive ones at the bottom
  const sortedData = React.useMemo(() => {
    return [...catData].sort((a, b) => b.is_active - a.is_active);
  }, [catData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "S.NO",
        accessor: "category_id",
      },
      {
        Header: "Category Name",
        accessor: "category_name",
      },
      {
        Header: "Main Category Name",
        accessor: "main_category_name",
      },
      {
        Header: "Status",
        accessor: "is_active",
        Cell: ({ value }) => (value == 0 ? "Inactive" : "Active"),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          // Only show the button if the category is active
          return row.original.is_active == 0 ? (
            ''
          ) : <button
          type="button"
          onClick={() => handleDeactivate(row.original.category_id)}
          className="focus:outline-none text-sm px-2 me-2 mb-2 bg-red-600 text-white"
        >
          Make Inactive
        </button>; // Return nothing for inactive categories
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: sortedData });

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-md bg-gray-100 md:px-7 mt-5 w-80 mx-auto border-y border-gray-400 md:w-full">
      <table
        {...getTableProps()}
        className="w-full text-sm whitespace-nowrap text-left rtl:text-right text-gray-500"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`bg-white border-b hover:bg-gray-50 ${
                  row.original.is_active ? "" : "bg-gray-200 text-gray-500"
                }`}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-6 py-4">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
