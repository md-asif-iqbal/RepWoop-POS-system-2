"use client"
import React, { useState } from 'react';

export default function LowStockReport() {
    const data = [
        { id: 1, image: '', product: 'Mobile Phone', code: '0000001', name: 'Mobile Phone', category: 'Electronics', price: 4500.00, sale: '103 pc', purchase: '102 pc', stock: '0 pc', value: '0 TK' },
        { id: 2, image: '', product: 'Blazer For Men', code: '0000009', name: 'Blazer', category: 'Document', price: 3000.00, sale: '101 pc', purchase: '100 pc', stock: '0 pc', value: '0 TK' },
        { id: 3, image: '', product: 'Test Product', code: '0000015', name: 'Test Product', category: 'House', price: 100.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 4, image: '', product: 'PLC - FX3U-64MR/ES-A', code: '0000021', name: 'PLC', category: 'Electronics', price: 30000.00, sale: '4 pc', purchase: '3 pc', stock: '0 pc', value: '0 TK' },
        { id: 5, image: '', product: 'PLC (Japan)', code: '0000025', name: 'PLC', category: 'PLC', price: 30000.00, sale: '2 pc', purchase: '2 pc', stock: '0 pc', value: '0 TK' },
        { id: 6, image: '', product: 'Head Lamp', code: 'QLZ01023', name: 'Head Lamp', category: 'BAJAJ', price: 130.00, sale: '2 pc', purchase: '2 pc', stock: '0 pc', value: '0 TK' },
        { id: 7, image: '', product: 'Addif', code: '0000029', name: 'Addif', category: 'House', price: 50.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 8, image: '', product: '334343', code: '0000021', name: '334343', category: 'House', price: 32.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 9, image: '', product: 'Br', code: '0000018', name: 'Br', category: 'House', price: 37.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 10, image: '', product: 'Archer C64', code: '331E4EAECJS', name: 'Archer Router', category: 'Router', price: 1880.00, sale: '1 pc', purchase: '1 pc', stock: '0 pc', value: '0 TK' },
        { id: 11, image: '', product: 'Bla Bla Test', code: '0000092', name: 'Bla Bla', category: 'House', price: 900.00, sale: '1 pc', purchase: '1 pc', stock: '0 pc', value: '0 TK' },
        { id: 12, image: '', product: 'Napa', code: '0000045', name: 'Napa', category: 'Tablets', price: 1.20, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 13, image: '', product: 'Samsung Glass Paper', code: '0000010', name: 'Samsung', category: 'Glass Paper', price: 160.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 14, image: '', product: 'Lady\'s Shoes Black', code: '0000005', name: 'Lady\'s Shoes', category: 'Shoes', price: 2400.00, sale: '1 Dozen 5 pc', purchase: '1 Dozen 10 pc', stock: '0 pc', value: '1200 TK' },
        { id: 15, image: '', product: 'Lady\'s Shoes Red', code: '0000005', name: 'Lady\'s Shoes', category: 'Shoes', price: 2400.00, sale: '1 Dozen 5 pc', purchase: '1 Dozen 10 pc', stock: '0 pc', value: '1200 TK' },
        { id: 16, image: '', product: 'Photo Printed', code: '0000072', name: 'Photo Printed', category: 'Online', price: 10.00, sale: '100 pc', purchase: '100 pc', stock: '0 pc', value: '0 TK' },
        { id: 17, image: '', product: 'Minicate Rice', code: '0000075', name: 'Minicate Rice', category: 'Rice', price: 80.00, sale: '0 Kg', purchase: '0 Kg', stock: '0 Kg', value: '0 TK' },
        { id: 18, image: '', product: 'Baby Dress', code: '005-130', name: 'Baby Dress', category: 'Fashion', price: 1500.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 19, image: '', product: 'Ladies Shoe', code: '401-36', name: 'Ladies Shoe', category: 'Fashion', price: 2100.00, sale: '0 pc', purchase: '0 pc', stock: '0 pc', value: '0 TK' },
        { id: 20, image: '', product: 'Lok', code: 'g004', name: 'Lok', category: 'Fashion', price: 500.00, sale: '0 Litre', purchase: '0 Litre', stock: '0 Litre', value: '0 TK' },
        // 10 more entries
        { id: 21, image: '', product: 'Blazer Test', code: '0000031', name: 'Blazer Test', category: 'Document', price: 2900.00, sale: '5 pc', purchase: '5 pc', stock: '0 pc', value: '0 TK' },
        { id: 22, image: '', product: 'New PLC', code: '0000041', name: 'New PLC', category: 'Electronics', price: 32000.00, sale: '3 pc', purchase: '2 pc', stock: '0 pc', value: '0 TK' },
        { id: 23, image: '', product: 'Test Product 2', code: '0000012', name: 'Test Product 2', category: 'House', price: 250.00, sale: '2 pc', purchase: '1 pc', stock: '0 pc', value: '0 TK' },
        { id: 24, image: '', product: 'Headlamp Test', code: 'QLZ01024', name: 'Headlamp Test', category: 'BAJAJ', price: 150.00, sale: '4 pc', purchase: '4 pc', stock: '0 pc', value: '0 TK' },
        { id: 25, image: '', product: 'Electric Iron', code: '0000087', name: 'Iron', category: 'Electronics', price: 3000.00, sale: '1 pc', purchase: '1 pc', stock: '0 pc', value: '0 TK' },
        { id: 26, image: '', product: 'Refrigerator', code: '0000092', name: 'Fridge', category: 'Electronics', price: 45000.00, sale: '5 pc', purchase: '4 pc', stock: '1 pc', value: '4500 TK' },
        { id: 27, image: '', product: 'AC Unit', code: '0000055', name: 'AC Unit', category: 'Electronics', price: 52000.00, sale: '2 pc', purchase: '2 pc', stock: '0 pc', value: '0 TK' },
        { id: 28, image: '', product: 'Camera', code: '0000033', name: 'Camera', category: 'Electronics', price: 65000.00, sale: '4 pc', purchase: '4 pc', stock: '0 pc', value: '0 TK' },
        { id: 29, image: '', product: 'Smartwatch', code: '0000022', name: 'Smartwatch', category: 'Electronics', price: 8000.00, sale: '3 pc', purchase: '2 pc', stock: '0 pc', value: '0 TK' },
        { id: 30, image: '', product: 'Earbuds', code: '0000018', name: 'Earbuds', category: 'Electronics', price: 1500.00, sale: '1 pc', purchase: '1 pc', stock: '0 pc', value: '0 TK' }
      ];
    
      const [currentPage, setCurrentPage] = useState(1);
      const [filteredData, setFilteredData] = useState(data);
      const [productFilter, setProductFilter] = useState('');
      const [codeFilter, setCodeFilter] = useState('');
      const [nameFilter, setNameFilter] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('');
      const itemsPerPage = 20; // Set items per page for pagination
    
      // Filter function
      const filterData = () => {
        let filtered = data;
        if (productFilter) {
          filtered = filtered.filter(item => item.product.toLowerCase().includes(productFilter.toLowerCase()));
        }
        if (codeFilter) {
          filtered = filtered.filter(item => item.code.toLowerCase().includes(codeFilter.toLowerCase()));
        }
        if (nameFilter) {
          filtered = filtered.filter(item => item.name.toLowerCase().includes(nameFilter.toLowerCase()));
        }
        if (categoryFilter) {
          filtered = filtered.filter(item => item.category.toLowerCase().includes(categoryFilter.toLowerCase()));
        }
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after filtering
      };
    
      // Reset filter
      const resetFilter = () => {
        setFilteredData(data);
        setProductFilter('');
        setCodeFilter('');
        setNameFilter('');
        setCategoryFilter('');
        setCurrentPage(1); // Reset to first page
      };
    
      // Pagination logic
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      // Print functionality
      const handlePrint = () => {
        const printContent = document.getElementById("table-to-print").outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
          <html>
            <head>
              <title>Low Stock Report</title>
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
    
      return (
        <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%] text-sm">
          <h1 className="text-lg dark:text-white  mb-4">Low Stock Report</h1>
    
          <div className="md:flex flex-wrap justify-between items-center mb-4">
            <div className="md:flex md:space-x-2 w-full md:w-full">
            <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="border p-2 w-full md:w-full"
          >
            <option value="">Select a Product</option>
            {data?.map((item, index) => (
              <option key={index} value={item.product}>
                {item.product}
              </option>
            ))}
          </select>
              <input
                type="text"
                placeholder="Product Code"
                value={codeFilter}
                onChange={(e) => setCodeFilter(e.target.value)}
                className="border  p-2 bg-white w-full"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="border bg-white p-2 w-full"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border bg-white p-2 w-full mb-2 md:mb-0"
              >
                <option value="">Select Category</option>
                {[...new Set(data?.map(item => item.category))]?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/2 mb-2">Filter</button>
              <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/2 mb-2">Reset</button>
            </div>
            
          </div>
          <div className='flex items-center justify-end'>
            <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2">Print</button>
         </div>
    
          <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border">
            <thead>
              <tr className='bg-emerald-500 text-white'>
                <th className="border p-2">SL</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Sale</th>
                <th className="border p-2">Purchases</th>
                <th className="border p-2">Available Stock</th>
                <th className="border p-2">Sell Value</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.product}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.price} TK</td>
                  <td className="border p-2">{item.sale}</td>
                  <td className="border p-2">{item.purchase}</td>
                  <td className="border p-2">{item.stock}</td>
                  <td className="border p-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      );
    };
