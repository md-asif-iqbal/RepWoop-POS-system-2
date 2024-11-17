'use client'; 

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/app/Loaders/page';

export default function Stock() {
  const printRef = useRef(); // Reference for print and PDF generation

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/Products/Create/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredData(data); // Initialize filtered data with the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [filters, setFilters] = useState({
    productName: '',
    productCode: '',
    category: '',
  });

  // Function to handle filter changes and automatically apply the filter
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: value,
      };
      applyFilters(newFilters); // Automatically apply filters when input changes
      return newFilters;
    });
  };

  // Function to filter the data based on the filters
  const applyFilters = (newFilters) => {
    const filtered = products?.filter((item) => {
      const productNameMatch =
        newFilters.productName === '' ||
        item.product_name?.toLowerCase().includes(newFilters.productName?.toLowerCase());

      const productCodeMatch =
        newFilters.productCode === '' ||
        item.product_code?.toLowerCase().includes(newFilters.productCode?.toLowerCase());

      const categoryMatch =
        newFilters.category === '' ||
        item.category?.toLowerCase().includes(newFilters.category?.toLowerCase());

      return productNameMatch && productCodeMatch && categoryMatch;
    });

    setFilteredData(filtered);
  };

  // Function to reset the filters and show all data
  const resetFilters = () => {
    setFilters({
      productName: '',
      productCode: '',
      category: '',
    });
    setFilteredData(products); // Reset the data to the initial state
  };

// Print functionality
const handlePrint = () => {
  const printContent = document.getElementById("table-to-print").outerHTML;
  const newWindow = window.open('', '_blank');
  newWindow.document.write(`
    <html>
      <head>
        <title>Stock List</title>
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

if (loading) return <p> <Loader/></p>;
if (error) return <p>Error: {error}</p>;

  
  return (
    <div className='font-nunito text-sm'>
       <div  className="p-2 max-w-full mx-auto mt-[5%]">
      {/* Title and Print Button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg  text-gray-600">Product Stock</div>
        <button
          onClick={handlePrint}
          className="bg-emerald-500 text-white cursor-pointer  px-10 py-2 rounded-md hover:bg-teal-600"
        >
          Print
        </button>
      </div>

            {/* Filter Options */}
            <div className="flex flex-wrap gap-4 mb-6">
        {/* Product Name Input */}
        <input
          type="text"
          placeholder="Product Name"
          name="product_name"
          value={filters.product_name}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-2 w-full md:w-1/4 bg-white"
        />

        {/* Product Code Input */}
        <input
          type="text"
          placeholder="Product Code"
          name="product_code"
          value={filters.product_code}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-2 w-full md:w-1/4 bg-white"
        />

        {/* Select Category Dropdown */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border rounded-md px-3 py-2 w-full md:w-1/4"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Hardware">Hardware</option>
          <option value="Fashion">Fashion</option>
          <option value="Document">Document</option>
        </select>

        {/* Filter and Reset Buttons */}
        <button onClick={applyFilters} className="bg-green-500 text-white px-10 py-2 rounded-md hover:bg-green-600">
          Filter
        </button>
        <button onClick={resetFilters} className="bg-gray-500 text-white px-10 py-2 rounded-md hover:bg-gray-600">
          Reset
        </button>
      </div>

      {/* Product Stock Table */}
      <div ref={printRef} className="overflow-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
  <table id='table-to-print' className=" w-full table-auto dark:text-white border-collapse bg-white text-sm text-center">
    <thead className="bg-gray-100">
      <tr className='bg-emerald-500 text-white'>
        <th className=" px-1 py-2">#</th>
        {/* Add class for image header */}
        <th className=" px-1 py-2 image-header">Image</th>
        <th className=" px-1 py-2">Product</th>
        <th className=" px-1 py-2">Category</th>
        <th className=" px-1 py-2">Price</th>
        <th className=" px-1 py-2">Quantity</th>
        <th className=" px-1 py-2">purchase cost</th>
        <th className=" px-1 py-2">Sold</th>
        <th className=" px-1 py-2">Damaged</th>
        <th className=" px-1 py-2">Returned</th>
        <th className=" px-1 py-2">Available Stock</th>
        <th className=" px-1 py-2">Sell Value</th>
        <th className=" px-1 py-2">Brand</th>
      </tr>
    </thead>
    <tbody>
      {filteredData?.map((product) => (
        <tr key={product.id}>
          <td className="border px-1 py-2">{product.id}</td>
          {/* Add class for image data cell */}
          <td className="border px-1 py-2 image-column">
          <Image 
                  width={200} height={300}
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={product?.product_name}
              className="w-16 h-16 object-cover"
            />
          </td>
          <td className="border px-1 py-2">{product.product_name}</td>
          <td className="border px-1 py-2">{product.category}</td>
          <td className="border px-1 py-2">{product.sale_price}</td>
          <td className="border px-1 py-2">{product.sub_unit||10}</td>
          <td className="border px-1 py-2">{product.purchase_cost}</td>
          <td className="border px-1 py-2">{product?.sub_unit - product.opening_stock||0}</td>
          <td className="border px-1 py-2">{product.damaged ||0}</td>
          <td className="border px-1 py-2">{product.returned ||0}</td>
          <td className="border px-1 py-2">{product.opening_stock}</td>
          <td className="border px-1 py-2">{product.sale_price*1.5}</td>
          <td className="border px-1 py-2">{product.brand}</td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>


    </div>
    </div>
  )
}
