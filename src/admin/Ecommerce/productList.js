import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import $ from 'jquery';
import ApiURl from '../../controllers/Api';

const ProductList = () => {
    const [productList, setProductList] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await $.getJSON(`${ApiURl}/getProducts.php`);
                
                if (data.success) {
                    setProductList(data.products);
                } else {
                    throw new Error('Failed to fetch products.');
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false); // Ensure loading state is turned off
            }
        };

        fetchProducts();
    }, []);

    const data = React.useMemo(() => productList, [productList]); // Add dependency on productList

    const columns = React.useMemo(
        () => [
            {
                Header: 'Product name',
                accessor: 'name',
            },
            {
                Header: 'Product Id',
                accessor: 'product_id',
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Quantity',
                accessor: 'stock_quantity',
            },
            {
                Header: 'Catgegory ID',
                accessor: 'category_id',
            },
            {
                Header: 'Category name',
                accessor: 'category_name',
            },
            {
                Header: 'Created date',
                accessor: 'created_at',
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: () => (
                    <div>
                        <button type="button" className="text-blue-700 bg-transparent text-xl rounded-lg px-2 me-2 mb-2">
                            <IoEyeOutline />
                        </button>
                        <button type="button" className="text-green-700 bg-transparent text-xl rounded-lg px-2 me-2 mb-2">
                            <FiEdit />
                        </button>
                        <button type="button" className="text-red-700 bg-transparent text-xl rounded-lg px-2">
                            <RiDeleteBinLine />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-md bg-gray-100 md:px-7 mt-5 w-80 mx-auto border-y border-gray-400 md:w-full">
            <table {...getTableProps()} className="w-full text-sm whitespace-nowrap text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-5 py-3">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="bg-white border-b">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-5 py-4">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-5 py-4 text-center">
                                No products available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
