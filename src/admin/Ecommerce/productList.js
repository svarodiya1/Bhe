import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { IoEyeOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import $ from 'jquery';
import ApiURl from '../../controllers/Api';

const ProductList = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', category_id: '', stock_quantity: '', price: '' });

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

    const data = React.useMemo(() => productList, [productList]);

    const columns = React.useMemo(
        () => [
            { Header: 'Product name', accessor: 'name' },
            { Header: 'Product Id', accessor: 'product_id' },
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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    });

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

    const handleEdit = (productId) => {
        const product = productList.find(item => item.product_id === productId);
        console.log(product);  // Check if the product is selected correctly
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            category_id: product.category_id,
            stock_quantity: product.stock_quantity,
            price: product.price,
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleView = (productId) => {
        const product = productList.find(item => item.product_id === productId);
        console.log(product);  // Check if the product is selected correctly
        setSelectedProduct(product);
        setIsEditMode(false); // View mode
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);  // Log form data for debugging
        try {
            const response = await fetch(`${ApiURl}/updateProduct.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, product_id: selectedProduct.product_id }),
            });
            const result = await response.json();
            if (result.success) {
                setProductList(prevProducts => prevProducts.map(product =>
                    product.product_id === selectedProduct.product_id ? { ...product, ...formData } : product
                ));
                alert(result.message);
                setIsModalOpen(false);
            } else {
                alert(result.message || "Failed to update product.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product.");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if (loading) {
        return <p>Loading....</p>;
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
