'use client'
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from "papaparse"; // For CSV parsing
import * as XLSX from 'xlsx';
import { Eye, Filter, View } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';

export default function ExpenseList() {
    const [showModal, setShowModal] = useState(false);
    const [product, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    price: ''
  });
  const [sortOrder, setSortOrder] = useState(''); // State for sorting by price
  const [dateSortOrder, setDateSortOrder] = useState(''); // State for sorting by date
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [productsPerPage] = useState(10); // Products per page

  const products = [
    { reference: 'PROD-001', category: 'Laptop', date: '2023-08-15', status: 'Active', amount: 1200, description: 'High-performance laptop for work and gaming.' },
    { reference: 'PROD-002', category: 'Electronics', date: '2023-08-12', status: 'Inactive', amount: 400, description: 'Compact and powerful electronics gadget.' },
    { reference: 'PROD-003', category: 'Shoe', date: '2023-09-01', status: 'Active', amount: 100, description: 'Comfortable running shoes with great durability.' },
    { reference: 'PROD-004', category: 'Electronics', date: '2023-08-21', status: 'Inactive', amount: 550, description: 'Smart home device with voice control.' },
    { reference: 'PROD-005', category: 'Speaker', date: '2023-08-10', status: 'Active', amount: 200, description: 'Portable Bluetooth speaker with powerful bass.' },
    { reference: 'PROD-006', category: 'Furniture', date: '2023-08-08', status: 'Inactive', amount: 750, description: 'Modern office chair with ergonomic design.' },
    { reference: 'PROD-007', category: 'Bags', date: '2023-08-14', status: 'Active', amount: 80, description: 'Stylish and durable leather backpack.' },
    { reference: 'PROD-008', category: 'Phone', date: '2023-09-12', status: 'Inactive', amount: 900, description: 'Latest smartphone with high-end camera.' },
    { reference: 'PROD-009', category: 'Chairs', date: '2023-07-29', status: 'Active', amount: 300, description: 'Comfortable dining chairs set of 4.' },
    { reference: 'PROD-010', category: 'Bags', date: '2023-08-01', status: 'Inactive', amount: 60, description: 'Compact crossbody bag perfect for travel.' },
    { reference: 'PROD-011', category: 'Laptop', date: '2023-09-15', status: 'Active', amount: 1500, description: 'Ultra-thin laptop for business use.' },
    { reference: 'PROD-012', category: 'Phone', date: '2023-09-10', status: 'Inactive', amount: 800, description: 'Affordable smartphone with long battery life.' },
    { reference: 'PROD-013', category: 'Phone', date: '2023-09-20', status: 'Active', amount: 950, description: 'Flagship smartphone with top-tier performance.' },
    { reference: 'PROD-014', category: 'Phone', date: '2023-09-18', status: 'Inactive', amount: 850, description: 'Mid-range smartphone with great value.' },
    { reference: 'PROD-015', category: 'Laptop', date: '2023-08-22', status: 'Active', amount: 1350, description: 'Gaming laptop with high-end graphics card.' },
    { reference: 'PROD-016', category: 'Headphones', date: '2023-09-03', status: 'Inactive', amount: 250, description: 'Noise-cancelling wireless headphones.' },
    { reference: 'PROD-017', category: 'Headphones', date: '2023-08-31', status: 'Active', amount: 300, description: 'Over-ear studio headphones with rich sound.' },
    { reference: 'PROD-018', category: 'Laptop', date: '2023-09-06', status: 'Inactive', amount: 1400, description: 'Convertible 2-in-1 laptop with touchscreen.' },
    { reference: 'PROD-019', category: 'Laptop', date: '2023-09-09', status: 'Active', amount: 1250, description: 'Laptop designed for creative professionals.' },
    { reference: 'PROD-020', category: 'Laptop', date: '2023-09-14', status: 'Inactive', amount: 1100, description: 'Budget-friendly laptop for students.' }
  ];
  const [showModal2, setShowModal2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("test");
      setModalVisible(true);
      setTimeout(() => {
          setShowModal2(true);
      }, 0); // Small delay to trigger transition
  };

  const handleCloseModal = () => {
      setShowModal2(false);
      setTimeout(() => {
          setModalVisible(false);
      }, 300); // Delay based on transition duration
  };






  // Function to handle select all products
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allProductIds = products?.map((product) => product.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  // Function to handle individual product selection
  const handleSelectProduct = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  // Toggle Filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Function to export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Product List', 20, 10);
    products.forEach((product, index) => {
      doc.text(`${index + 1}. ${product.product}, SKU: ${product.sku}, Price: $${product.price}`, 20, 20 + index * 10);
    });
    doc.save('products.pdf');
  };

  // Function to export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(products);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };

  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Expenses List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, '')} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Handle price sort change
  const handlePriceSort = (e) => {
    setSortOrder(e.target.value); // Set the sort order
  };

  // Handle date sort change
  const handleDateSort = (e) => {
    setDateSortOrder(e.target.value); // Set the date sort order
  };

  // Pagination logic: get current products based on the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle changing pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter and sort the products based on the selected filters and sorting
const filteredProducts = products
.filter((product) =>
  product.category.toLowerCase().includes(searchTerm.toLowerCase()) || product.reference.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (filters.category === '' || product.category === filters.category) &&
  (filters.status === '' || product.status === filters.status)
)
.sort((a, b) => {
  if (sortOrder === 'Low to High') {
    return a.amount - b.amount; // Ascending order by amount
  } else if (sortOrder === 'High to Low') {
    return b.amount - a.amount; // Descending order by amount
  } else if (dateSortOrder === 'Oldest First') {
    return new Date(a.date) - new Date(b.date); // Ascending date
  } else if (dateSortOrder === 'Newest First') {
    return new Date(b.date) - new Date(a.date); // Descending date
  } else {
    return 0; // No sorting if not selected
  }
});

// Get unique values for filters
const uniqueCategories = [...new Set(products?.map((product) => product.category))];
const uniqueStatuses = [...new Set(products?.map((product) => product.status))];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const fileType = file.name.split('.').pop();

    if (fileType === 'csv') {
      // Handle CSV file
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("CSV data: ", results.data);
          setProducts(results.data); // Process CSV data
        },
        error: (err) => {
          console.error("Error parsing CSV file:", err);
        }
      });
    } else if (fileType === 'xlsx') {
      // Handle Excel file
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);
        console.log("Excel data: ", excelData);
        setProducts(excelData); // Process Excel data
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.error("Unsupported file type");
    }
  };

  // Optional: Submit data to your server for processing
  const submitProducts = async () => {
    try {
      const response = await fetch("/api/import-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
//   const handleDelete = (id) => {
//     setSelectedProducts(products.filter((product) => product.id !== id));
//     setShowModal2(false);
//   };

  return (
    <div className=' font-nunito text-sm'>
        <div className="container mx-auto px-4 py-6 md:mt-[5%] mt-[20%]">
      {/* Action Buttons */}
      <div className="md:flex mflex-col md:flex-row justify-between items-center mb-4">
        <h2 className=" dark:text-white text-lg  mb-2 md:mb-0">Expenses</h2>
        <div className="md:flex space-x-2 space-y-2 md:space-y-0">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
          <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowModal(true)}
            >
                Import Product
            </button>
             {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white  p-6 w-1/2">
                        <h2 className=" dark:text-white text-lg  mb-4">Import Products</h2>
                        <input
                        type="file"
                        accept=".csv, .xlsx"
                        onChange={handleFileUpload}
                        className="mb-4 bg-white"
                        />
                        <div className="flex justify-end space-x-4">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            onClick={submitProducts}
                        >
                            Submit
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                        </div>
                    </div>
                    </div>
                )}
          <button onClick={exportPDF} className="px-4 py-2 bg-red-500 text-white rounded">PDF</button>
          <button onClick={exportExcel} className="px-4 py-2 bg-yellow-500 text-white rounded">Excel</button>
          <button onClick={handlePrint} className="px-4 py-2 bg-gray-500 text-white rounded">Print</button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex md:justify-end md:items-end mb-4">
       
        <div className="flex space-x-2">
          <button onClick={toggleFilters} className="bg-red-500 text-white px-4 py-2 rounded">
            {showFilters ? '✕' : <Filter size={20} strokeWidth={2} /> }
          </button>
          {/* <select className="border border-gray-300 px-4 py-2 rounded" onChange={handlePriceSort}>
            <option value="">Sort by Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select> */}
          <select className="border border-gray-300 px-4 py-2 rounded" onChange={handleDateSort}>
            <option value="">Sort by Date</option>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filters - Toggle Visibility */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">

          <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-white border-gray-300 px-4 py-2 rounded focus:outline-none mb-2 md:mb-0"
        />
          <select
            name="category"
            className="border bg-white border-gray-300 px-4 py-2 rounded"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Choose Category</option>
            {uniqueCategories?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
                name="status"  // Ensure this matches the filter state key
                className="border bg-white border-gray-300 px-4 py-2 rounded"
                value={filters.status}
                onChange={handleFilterChange}
                >
                <option value="">All Status</option>
                {uniqueStatuses?.map((status) => (
                    <option key={status} value={status}>
                    {status}
                    </option>
                ))}
            </select>
          <select className="border bg-white border-gray-300 px-4 py-2 rounded" onChange={handlePriceSort}>
            <option value="">Sort by Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table id='table-to-print' className="min-w-full table-auto text-white bg-white dark:bg-[#1c1c3c] dark:text-white shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-4 py-2 ">
                <input className='bg-white' type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="px-4 py-2 ">Category Name</th>
              <th className="px-4 py-2 ">Reference</th>
              <th className="px-4 py-2 ">Date</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">Amount</th>
              <th className="px-4 py-2 ">Description</th>
              <th className="px-4 py-2 ">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)?.map((product) => (
                
              <tr key={product.id} className="border-t border-gray-200 ">
                <td className="px-4 py-2 ">
                  <input className='bg-white'
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleSelectProduct(e, product.id)}
                  />
                </td>
                
                <td className="px-4 py-2 ">{product.category}</td>
                <td className="px-4 py-2">{product.reference}</td>
                <td className="px-4 py-2">{product.date}</td>
                <td className="px-4 py-2">
                <span className={`px-2 py-1 text-xs  rounded-full ${
                                                product.status === "Active"
                                                  ? "bg-green-100 text-green-700"
                                                  : product.status === "Inactive"
                                                  ? "bg-red-100 text-red-700"
                                                  : "bg-yellow-100 text-yellow-700"
                                              }`}>{product.status}</span>
                </td>
                <td className="px-4 py-2">${product.amount.toFixed(2)}</td>
                
                <td className="px-4 py-2">  {product.description.split('. ').slice(0, 2).join('. ') + (product.description.split('. ').length > 2 ? '.' : '')}</td>
                
                <td className="px-4 py-2 flex space-x-2">
                  <button className="border  p-2 transform hover:scale-110 hover:bg-[#092C4C] hover:text-white"><Eye size={16} strokeWidth={1.5} /></button>
                  <button className="p-2  border transform text-blue-600 hover:bg-[#288EC7] hover:text-white hover:scale-110">
                  <TbEdit size={16}/>
                </button>
                <button onClick={handleOpenModal} className="p-2  transform text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 border">
                  <RiDeleteBin5Line size={16}/>
                </button>
                    {/* Modal */}
                    {modalVisible && (
                        <div
                                        className={`fixed inset-0 flex items-center border justify-center bg-opacity-50 transition-all duration-700 ease-in-out ${showModal2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} `}
                                    >
                                        <div className="bg-white w-[20%] border text-center  p-10 transition-all duration-300 ease-in-out">
                                            <h2 className=" dark:text-white text-lg  mb-4">Are you sure?</h2>
                                            <p className=" dark:text-white mb-6">You wont be able to revert this!</p>

                                            {/* Show details */}
                                            <div className="mb-6">
                                                <p><strong>Item ID:</strong> {product.product}</p>
                                                <p><strong>Item Name:</strong> {product.qty}</p>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white  py-2 px-4 rounded mr-2"
                                                >
                                                    Yes, delete it!
                                                </button>
                                                <button
                                                    onClick={handleCloseModal}
                                                    className="bg-red-500 hover:bg-red-600 text-white  py-2 px-4 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                        </div>
                    )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="lg:flex justify-center items-center gap-5 mt-4">
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()]?.map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-2 mx-1 border rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {number + 1}
          </button>
        ))}
         <div >Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} entries</div>
      </div>
     
        </div>
    </div>
  );
}
