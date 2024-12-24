import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import $ from "jquery";
import ApiURl from '../../controllers/Api';


const CategoryList = () => {
    const [catData, setCatData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await $.getJSON(`${ApiURl}/getCatData.php`);
                setCatData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        

        fetchData();
    }, []);

    const data = React.useMemo(() => catData, [catData]);

console.log(data)

    const columns = React.useMemo(
        () => [
            {
                Header: 'S.NO',
                accessor: 'category_id',
            },
            
            {
                Header: 'category_name',
                accessor: 'category_name',
            },
            {
                Header: 'Main category name',
                accessor: 'main_category_name',
            },
            {
                Header: 'Main category ID',
                accessor: 'main_cat_id',
            },
            // {
            //     Header: 'Start Date',
            //     accessor: 'stockDate',
            // },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: () => (
                    <div>
                        <button
                            type="button"
                            className="text-blue-700 bg-transparent focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-2 me-2 mb-2 focus:outline-none"
                            aria-label="View Category"
                        >
                            <IoEyeOutline />
                        </button>
                        <button
                            type="button"
                            className="focus:outline-none text-green-700 bg-transparent rounded-lg text-sm px-2 me-2 mb-2"
                            aria-label="Edit Category"
                        >
                            <FiEdit />
                        </button>
                        <button
                            type="button"
                            className="focus:outline-none text-red-700 bg-transparent rounded-lg text-sm px-2"
                            aria-label="Delete Category"
                        >
                            <RiDeleteBinLine />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-md bg-gray-100 md:px-7 mt-5 w-80 mx-auto border-y border-gray-400 md:w-full">
            <table {...getTableProps()} className="w-full text-sm whitespace-nowrap text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-6 py-3">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="bg-white border-b hover:bg-gray-50">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-6 py-4">
                                        {cell.render('Cell')}
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
