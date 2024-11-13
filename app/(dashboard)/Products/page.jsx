'use client'
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from "papaparse"; // For CSV parsing
import * as XLSX from 'xlsx';
import { Eye, Filter, View } from 'lucide-react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/app/Loaders/page';

export default function ProductList() {
    const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    product: '',
    category: '',
    brand: '',
    price: ''
  });
  const [sortOrder, setSortOrder] = useState(''); // State for sorting by price
  const [dateSortOrder, setDateSortOrder] = useState(''); // State for sorting by date
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [productsPerPage] = useState(10); // Products per page
  const [showExpireDate, setShowExpireDate] = useState(false);
  // const products = [
  //   { id: 1, product: 'Lenovo 3rd Generation', sku: 'PT001', category: 'Laptop', brand: 'Lenovo', price: 12500.00, createdDate: '2023-08-15', unit: 'Pc', qty: 100, createdBy: 'Arron' },
  //   { id: 2, product: 'Bold V3.2', sku: 'PT002', category: 'Electronics', brand: 'Bolt', price: 1600.00, createdDate: '2023-08-12', unit: 'Pc', qty: 140, createdBy: 'Kenneth' },
  //   { id: 3, product: 'Nike Jordan', sku: 'PT003', category: 'Shoe', brand: 'Nike', price: 6000.00, createdDate: '2023-09-01', unit: 'Pc', qty: 780, createdBy: 'Gooch' },
  //   { id: 4, product: 'Apple Series 5 Watch', sku: 'PT004', category: 'Electronics', brand: 'Apple', price: 25000.00, createdDate: '2023-08-21', unit: 'Pc', qty: 450, createdBy: 'Nathan' },
  //   { id: 5, product: 'Amazon Echo Dot', sku: 'PT005', category: 'Speaker', brand: 'Amazon', price: 1600.00, createdDate: '2023-08-10', unit: 'Pc', qty: 477, createdBy: 'Alice' },
  //   { i, product: 'Lobar Handy', sku: 'PT006', category: 'Furniture', brand: 'Woodmart', price: 4521.00, createdDate: '2023-08-08', unit: 'Kg', qty: 145, createdBy: 'Robb' },
  //   { id: 7, product: 'Red Premium Handy', sku: 'PT007', category: 'Bags', brand: 'Versace', price: 2024.00, createdDate: '2023-08-14', unit: 'Kg', qty: 747, createdBy: 'Steven' },
  //   { id: 8, product: 'Iphone 14 Pro', sku: 'PT008', category: 'Phone', brand: 'Iphone', price: 1698.00, createdDate: '2023-09-12', unit: 'Pc', qty: 897, createdBy: 'Gravely' },
  //   { id: 9, product: 'Black Slim 200', sku: 'PT009', category: 'Chairs', brand: 'Bently', price: 6794.00, createdDate: '2023-07-29', unit: 'Pc', qty: 741, createdBy: 'Kevin' },
  //   { id: 10, product: 'Woodcraft Sandal', sku: 'PT010', category: 'Bags', brand: 'Woodcraft', price: 4547.00, createdDate: '2023-08-01', unit: 'Kg', qty: 148, createdBy: 'Grillo' },
  //   { id: 11, product: 'MacBook Air M1', sku: 'PT011', category: 'Laptop', brand: 'Apple', price: 999.99, createdDate: '2023-09-15', unit: 'Pc', qty: 320, createdBy: 'Riley' },
  //   { id: 12, product: 'Samsung Galaxy S22', sku: 'PT012', category: 'Phone', brand: 'Samsung', price: 850.00, createdDate: '2023-09-10', unit: 'Pc', qty: 230, createdBy: 'Jordan' },
  //   { id: 13, product: 'Google Pix', sku: 'PT013', category: 'Phone', brand: 'Google', price: 699.00, createdDate: '2023-09-20', unit: 'Pc', qty: 180, createdBy: 'Alexa' },
  //   { id: 14, product: 'OnePlus 9 Pro', sku: 'PT014', category: 'Phone', brand: 'OnePlus', price: 750.00, createdDate: '2023-09-18', unit: 'Pc', qty: 400, createdBy: 'Chris' },
  //   { id: 15, product: 'Dell XPS 13', sku: 'PT015', category: 'Laptop', brand: 'Dell', price: 1200.00, createdDate: '2023-08-22', unit: 'Pc', qty: 90, createdBy: 'Sam' },
  //   { id: 16, product: 'Sony WH-1000XM4', sku: 'PT016', category: 'Headphones', brand: 'Sony', price: 349.99, createdDate: '2023-09-03', unit: 'Pc', qty: 210, createdBy: 'Tina' },
  //   { id: 17, product: 'Bose QuietComfort 35', sku: 'PT017', category: 'Headphones', brand: 'Bose', price: 299.99, createdDate: '2023-08-31', unit: 'Pc', qty: 120, createdBy: 'Lucas' },
  //   { id: 18, product: 'Asus ROG Zephyrus', sku: 'PT018', category: 'Laptop', brand: 'Asus', price: 1400.00, createdDate: '2023-09-06', unit: 'Pc', qty: 110, createdBy: 'Nina' },
  //   { id: 19, product: 'HP Spectre x360', sku: 'PT019', category: 'Laptop', brand: 'HP', price: 1350.00, createdDate: '2023-09-09', unit: 'Pc', qty: 85, createdBy: 'Ethan' },
  //   { id: 20, product: 'Acer Predator Helios', sku: 'PT020', category: 'Laptop', brand: 'Acer', price: 1499.99, createdDate: '2023-09-14', unit: 'Pc', qty: 95, createdBy: 'Zoe' },
  // ];
  const [showModal2, setShowModal2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState(null);


  const handleOpenModal = (action,product) => {
   
      setModalVisible(true);
      setSelectedProduct(product);
      setTimeout(() => {
        setModalAction(action);
      }, 0); // Small delay to trigger transition
  };

  const handleCloseModal = () => {
    setModalAction(null);
      setTimeout(() => {
        setModalVisible(false);
        setSelectedProduct(null);
      }, 300); // Delay based on transition duration
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[categories,setCategories] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (loading) return <p> <Loader/></p>;
  if (error) return <p>Error: {error}</p>;




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
          <title>Products List</title>
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

  // Filter and sort the products based on the selected filters, search term, and sorting
const filteredProducts = products
.filter((product) =>
  // Filtering by search term (on product name) and selected filters (product, category, and brand)
  product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (filters.product === '' || product.product_name === filters.product) &&
  (filters.category === '' || product.category === filters.category) &&
  (filters.brand === '' || product.brand === filters.brand)
)
.sort((a, b) => {
  // Sorting based on selected sort options
  if (sortOrder === 'Low to High') {
    return a.sale_price - b.sale_price; // Sort by price in ascending order
  } else if (sortOrder === 'High to Low') {
    return b.sale_price - a.sale_price; // Sort by price in descending order
  } else if (dateSortOrder === 'Oldest First') {
    return new Date(a.created_at) - new Date(b.created_at); // Sort by date in ascending order
  } else if (dateSortOrder === 'Newest First') {
    return new Date(b.created_at) - new Date(a.created_at); // Sort by date in descending order
  } else {
    return 0; // No sorting if no sort option is selected
  }
});

const downloadCSVTemplate = () => {
  const headers = [
    'productName',
    'productCode',
    'selectedCategory',
    'selectedBrand',
    'selectedMainUnit',
    'subUnit',
    'openingStock',
    'salePrice',
    'purchaseCost',
    'productDetails',
    'imageLink',         // Use 'imageLink' for a URL-based image, if applicable
    'createdDate',
    'discount',
    'expireDate',
    'userName',
  ];

  // Multiple rows of sample data with all fields
  const rows = [
    [
      'Sample Product 1', 'PROD001', 'Electronics', 'Samsung', 'Unit', 'Sub-Unit',
      '10', '500', '300', 'Sample details 1', 'https://example.com/image1.jpg',
      '2024-01-01', '5%', '2025-01-01', 'John Doe'
    ],
    [
      'Sample Product 2', 'PROD002', 'Home Appliances', 'LG', 'Unit', 'Sub-Unit',
      '15', '700', '450', 'Sample details 2', 'https://example.com/image2.jpg',
      '2024-02-01', null, '2025-02-01', 'Jane Doe'
    ],
    // Add more rows as needed
  ];

  const csvContent = [headers, ...rows]?.map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'products_template.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


const downloadExcelTemplate = () => {
  const headers = [
    'productName',
    'productCode',
    'selectedCategory',
    'selectedBrand',
    'selectedMainUnit',
    'subUnit',
    'openingStock',
    'salePrice',
    'purchaseCost',
    'productDetails',
    'imageLink',         // Use 'imageLink' for URL-based image
    'createdDate',
    'discount',
    'expireDate',
    'userName',
  ];

  // Multiple rows of sample data with all fields
  const rows = [
    [
      'Sample Product 1', 'PROD001', 'Electronics', 'Samsung', 'Unit', 'Sub-Unit',
      10, 500, 300, 'Sample details 1', 'https://example.com/image1.jpg',
      '2024-01-01', '5%', '2025-01-01', 'John Doe'
    ],
    [
      'Sample Product 2', 'PROD002', 'Home Appliances', 'LG', 'Unit', 'Sub-Unit',
      15, 700, 450, 'Sample details 2', 'https://example.com/image2.jpg',
      '2024-02-01', null, '2025-02-01', 'Jane Doe'
    ],
    // Add more rows as needed
  ];

  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Template');

  XLSX.writeFile(workbook, 'products_template.xlsx');
};













  // Get unique values for filters
  const uniqueProducts = [...new Set(products?.map((product) => product.product))];
  const uniqueCategories = [...new Set(products?.map((product) => product.category))];
  const uniqueBrands = [...new Set(products?.map((product) => product.brand))];
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
      // console.log("Server response:", result);
    } catch (error) {
      // console.error("Error submitting data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/Products/product/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete product');
        return;
      }
  
      alert('Product deleted successfully');
      handleCloseModal();
      // Optional: Update the UI to remove the deleted product from the list
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product');
    }
  };

  return (
    <div className='font-nunito text-sm'>
        <div className="container mx-auto px-4  md:mt-[7%] mt-[20%] font-nunito text-sm">
      {/* Action Buttons */}
      <div className="md:flex mflex-col md:flex-row justify-between items-center mb-4">
        <h2 className=" dark:text-white text-lg  mb-2 md:mb-0">Product List</h2>
        <div className="md:flex space-x-2 space-y-2 md:space-y-0">
          <Link href="/Products/Create">
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add New Product</button>
          </Link>
          <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setShowModal(true)}
            >
                Import Product
            </button>
             {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex  items-center justify-center z-50 bg-black bg-opacity-50 rounded">
                    <div className="bg-white w-full  md:w-1/2 p-6 ">
                        <h2 className=" dark:text-white text-lg  mb-4">Import Products</h2>
                        <div className="md:space-x-4 md:mb-4">
                          <button onClick={downloadCSVTemplate} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Download CSV Template
                          </button>
                          <button onClick={downloadExcelTemplate} className="bg-green-500 text-white px-4 py-2 rounded">
                            Download Excel Template
                          </button>
                        </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 mb-4">
          {/* <select
            name="product"
            className="border border-gray-300 px-4 py-2 rounded"
            value={filters.product}
            onChange={handleFilterChange}
          >
            <option value="">Choose Product</option>
            {uniqueProducts?.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select> */}
          <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border bg-white border-gray-300 px-4 py-2 rounded focus:outline-none mb-2 md:mb-0"
        />
          <select
            name="category"
            className="border border-gray-300 px-4 py-2 rounded"
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
            name="brand"
            className="border border-gray-300 px-4 py-2 rounded"
            value={filters.brand}
            onChange={handleFilterChange}
          >
            <option value="">All Brand</option>
            {uniqueBrands?.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select className="border border-gray-300 px-4 py-2 rounded" onChange={handlePriceSort}>
            <option value="">Sort by Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
      )}

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table id='table-to-print' className="min-w-full table-auto  bg-white dark:bg-[#1c1c3c] dark:text-white shadow-sm  overflow-hidden">
          <thead>
            <tr className="bg-emerald-500 text-white">
              <th className="px-4 py-2 ">
                <input className='bg-white' type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="px-4 py-2 ">Product</th>
              <th className="px-4 py-2 ">SKU</th>
              <th className="px-4 py-2 ">Category</th>
              <th className="px-4 py-2 ">Brand</th>
              <th className="px-4 py-2 ">Price</th>
              <th className="px-4 py-2 ">Unit</th>
              <th className="px-4 py-2 ">Quantity</th>
              <th className="px-4 py-2 ">Created Date</th>
              <th className="px-4 py-2 ">Created By</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)?.map((product) => (
              <tr key={product.id} className="border-t border-gray-200 ">
                <td className="px-4 py-2 ">
                  <input
                  className='bg-white'
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleSelectProduct(e, product.id)}
                  />
                </td>
                <td className="px-4 py-2 flex items-center">
                {product.image && (
                  <Image 
                  width={200} height={300}
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.product_name}
  
                    className="w-8 h-10 object-cover rounded mr-2"
                  />   )}
                  {product.product_name}
                </td>
                <td className="px-4 py-2 ">{product.product_code}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">${product.sale_price}</td>
                <td className="px-4 py-2">{product.main_unit}</td>
                <td className="px-4 py-2">{product.opening_stock}</td>
                <td className="px-4 py-2">{new Date(product.created_at).toISOString().split('T')[0]}</td>
                <td className="px-4 py-2">{product.username}</td>
                {/* <td className="px-4 py-2">{product.createdBy}</td> */}
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => handleOpenModal('view', product)} className="border  p-2 transform hover:scale-110 hover:bg-[#092C4C] hover:text-white">
                    <Eye size={16} strokeWidth={1.5} /></button>
                  <button  onClick={() => handleOpenModal('edit', product)} className="p-2  border transform text-blue-600 hover:bg-[#288EC7] hover:text-white hover:scale-110">
                  <TbEdit size={16}/>
                </button>
                <button onClick={() => handleOpenModal('delete', product)} className="p-2  transform text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 border">
                  <RiDeleteBin5Line size={16}/>
                </button>
                 {/* Modal */}
                  {modalVisible && (
                    <div
                      className="fixed inset-0 flex items-center justify-center bg-opacity-50 transition-all duration-300 ease-in-out"
                    >
                      <div className="bg-white w-[90%] md:w-[50%] lg:w-[50%] text-center rounded shadow-lg relative">
                        {/* Close Button */}
                        <button onClick={handleCloseModal} 
                        className="btn btn-sm hover:bg-rose-500 hover:text-white btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                          </button>

                        <h2 className="text-lg mb-4">
                          {modalAction === 'view' && 'Product Details'}
                          {modalAction === 'edit' && 'Edit Product'}
                          {modalAction === 'delete' && 'Are you sure?'}
                        </h2>

                        {modalAction === 'view' && (
                          <div className="hero w-full">
                          <div className="hero-content flex-col lg:flex-row">
                                    <Image 
                            width={300} height={400}
                            src={`data:image/jpeg;base64,${selectedProduct.image}`}
                            alt={selectedProduct.product_name}
            
                              className=" object-cover rounded mr-2"
                            /> 
                            <div className='text-start'>
                              <h1 className=" text-xl md:text-3xl font-bold">{selectedProduct.product_name}</h1>
                              <p className="">
                              Category: 
                                {selectedProduct.category}
                              </p>
                              <p className="">
                                Brand: 
                                {selectedProduct.brand}
                              </p>
                              <p className=" text-emerald-400">
                               Sale price: {selectedProduct.sale_price}
                              </p>
                              <p className=" text-red-500">
                                Purchase price: 
                                {selectedProduct.purchase_cost}
                              </p>
                              <p className="">
                                Total Unit: 
                                {selectedProduct.sub_unit}
                              </p>
                              <p className="">
                                Opening Stock: 
                                {selectedProduct.opening_stock}
                              </p>
                              <p className="">
                                Discount:  
                                {selectedProduct.discount} %
                              </p>
                              <p className="">
                                Details: 
                                {selectedProduct.product_details}
                              </p>
                            
                            </div>
                          </div>
                        </div>
                        )}

                        {modalAction === 'edit' && (
                         <div>
                          <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg dark:bg-[#202047]">
      <h1 className="text-2xl mb-4">Add New Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            className="bg-white 
             p-2 border rounded w-full text-black"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Product Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Product Code"
            className="bg-white p-2 border rounded w-full text-black"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>

        {/* Category Selection */}
        <div className=" mb-4">
          <div className="w-full">
            <label className="block mb-2">
              Category <span className="text-red-500">*</span>
            </label>
           <div className='md:flex gap-2'>
           <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white 
               p-2 border rounded w-full text-black"
            >
              <option value="">Search Categories</option>
              {categories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded w-full md:w-1/2 "
            onClick={() => setShowCategoryModal(true)}
          >
            Add Category
          </button>

           </div>
          </div>
          
        </div>

        {/* Brand Selection */}
        <div className=" mb-4">
          <div className="w-full">
            <label className="block mb-2">
              Brand <span className="text-red-500">*</span>
            </label>
            <div className='w-full md:flex gap-2'>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-white 
               p-2 border rounded text-black w-full"
            >
              <option value="">Search Brands</option>
              {brands?.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <button
            type="button"
            className="p-2 bg-blue-500 text-white rounded w-full md:w-1/2"
            onClick={() => setShowBrandModal(true)}
          >
            Add Brand
          </button>
          </div>
          
            </div>
        </div>

        {/* Unit Selection */}
        <div className="mb-4">
          <label className="block mb-2">
           Main Unit <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedMainUnit}
            onChange={(e) => setSelectedMainUnit(e.target.value)}
            className="bg-white text-black 
             p-2 border rounded w-full"
          >
            <option value="">Select Unit</option>
            {mainUnits?.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">
           Sub Unit <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Sub Unit"
            className="bg-white 
             p-2 border rounded w-full text-black"
            value={subUnit}
            onChange={(e) => setSubUnit(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Opening Stock</label>
          <input
            type="number"
            placeholder="Opening Stock"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={openingStock}
            onChange={(e) => setOpeningStock(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Sale Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Sale Price"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Purchase Cost <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            placeholder="Purchase Cost"
            className="bg-white text-black
             p-2 border rounded w-full"
            value={purchaseCost}
            onChange={(e) => setPurchaseCost(e.target.value)}
          />
        </div>
            {/* Discount Field */}
    <div className="mb-4">
      <label className="block mb-2">
        Discount (%) <span className="text-red-500">*</span>
      </label>
      <input
        type="number"
        placeholder="Enter discount percentage"
        className="bg-white p-2 text-black border rounded w-full"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />
    </div>

    {/* Expiration Date Toggle */}
    <div className="mb-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={showExpireDate}
          onChange={() => setShowExpireDate(!showExpireDate)}
          className="form-checkbox"
        />
        <span>Add Expiration Date</span>
      </label>
      {/* Expiration Date Field */}
    {showExpireDate && (
      <div className="mb-4">
        <label className="block mb-2">
          Expiration Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          className="bg-white p-2 text-black border rounded w-full"
          value={expireDate}
          onChange={(e) => setExpireDate(e.target.value)}
        />
      </div>
    )}
    </div>

        {/* Product Details Textarea */}
        <div className="mb-4">
          <label className="block mb-2">
            Product Details <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter product details..."
            className="bg-white 
             p-2 border rounded text-black w-full"
            rows="5"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label className="block mb-2">Product Image</label>
          <input
            type="file"
            className="bg-white 
             p-2 border rounded w-full text-black"
            onChange={(e) => setProductImage(e.target.files[0])}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 w-full md:w-1/6 justify-items-center flex justify-center text-white px-8 py-2 rounded"
      >
        Save
      </button>
    </form>
                         </div>
                        )}

                        {modalAction === 'delete' && (
                          <div className='p-4'>

                            <h1 className=" text-xl md:text-3xl font-bold">{selectedProduct.product_name}</h1>
                              <p className="">
                              SKU: 
                                {selectedProduct.product_code}
                              </p>
                              <p className="">
                              Category: 
                                {selectedProduct.category}
                              </p>
                              <p className="">
                                Brand: 
                                {selectedProduct.brand}
                              </p>
                              <p className=" text-emerald-400">
                               Sale price: {selectedProduct.sale_price}
                              </p>
                              <p className=" text-red-500">
                                Purchase price: 
                                {selectedProduct.purchase_cost}
                              </p>
                            <div className="flex justify-center space-x-4">
                              <button
                                onClick={() => handleDelete(selectedProduct.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                              >
                                Yes, delete it!
                              </button>
                              <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
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
