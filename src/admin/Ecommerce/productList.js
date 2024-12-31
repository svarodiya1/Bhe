import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { RiDeleteBinLine } from "react-icons/ri";
import $ from 'jquery';
import ApiURl from '../../controllers/Api';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await $.getJSON(`${ApiURl}/getProducts.php`);
                if (data.success) {
                    setProductList(data.products || []);
                } else {
                    throw new Error('Failed to fetch products.');
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
                setProductList([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${ApiURl}/deleteProduct.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ product_id: productId }),
                });
                const result = await response.json();
                if (result.success) {
                    setProductList(prevProducts => prevProducts.filter(product => product.product_id !== productId));
                    alert(result.message);
                } else {
                    alert(result.message || "Failed to delete product.");
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product.");
            }
        }
    };

    // Handle availability toggle
    const handleAvailabilityToggle = async (productId, size, available) => {
        try {
            const response = await fetch(`${ApiURl}/updateProduct.php`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    product_id: productId,  // The ID of the product
                    size: size,             // The size of the product
                    available: available    // The availability status (0 or 1)
                }),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setProductList(prevProducts =>
                    prevProducts.map(product =>
                        product.product_id === productId && product.size === size
                            ? { ...product, is_available: result.data?.is_available ?? product.is_available }
                            : product
                    )
                );
                alert(result.message);
            } else {
                alert(result.message || "Failed to update availability.");
            }
        } catch (error) {
            console.error('Error toggling availability:', error);
            alert("An error occurred while updating the product availability.");
        }
    };

    // Table columns definition
    const columns = React.useMemo(
        () => [
            { Header: 'Product Name', accessor: 'name' },
            { Header: 'Size', accessor: 'size' }, // Assuming `size` exists in the product data
            { 
                Header: 'Item Available', 
                accessor: 'is_available', 
                Cell: ({ row }) => (
                    <div>
                        <input 
                            type="checkbox" 
                            checked={row.original.is_available === 1}
                            onChange={() => handleAvailabilityToggle(
                                row.original.product_id, 
                                row.original.size,  // Pass size here
                                row.original.is_available === 1 ? 0 : 1  // Toggle availability
                            )}
                        /> Available
                    </div>
                ),
            },
            { Header: 'Category ID', accessor: 'category_id' },
            { Header: 'Created date', accessor: 'created_at' },
            { 
                Header: 'Action', 
                accessor: 'action', 
                Cell: ({ row }) => (
                    <div>
                        <button 
                            type="button" 
                            className="text-red-700 bg-transparent text-xl rounded-lg px-2" 
                            onClick={() => handleDelete(row.original.product_id)}
                        >
                            <RiDeleteBinLine />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // React Table hook
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: productList
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="overflow-x-auto shadow-md sm:rounded-md bg-gray-100 md:px-7 mt-5 w-80 mx-auto border-y border-gray-400 md:w-full">
                <table {...getTableProps()} className="w-full text-sm whitespace-nowrap text-left text-black">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50">
                        {headerGroups.map((headerGroup, index) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                                {headerGroup.headers.map((column, colIndex) => (
                                    <th {...column.getHeaderProps()} key={`column-${colIndex}`} className="px-5 py-3">
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.length > 0 ? (
                            rows.map((row, rowIndex) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} key={`row-${rowIndex}`} className="bg-white border-b">
                                        {row.cells.map((cell, cellIndex) => (
                                            <td {...cell.getCellProps()} key={`cell-${cellIndex}`} className="px-5 py-4">
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
        </div>
    );
};

export default ProductList;
