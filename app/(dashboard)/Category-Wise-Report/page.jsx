"use client"
import React, { useState } from 'react';

export default function CategorySalesPurchasesReport() {
    
   // Constant dataset with 85 entries
   const data = [
    { id: 1, category: 'Electronics', brand: 'Samsung', totalSalesQty: 281, totalPurchaseQty: 612, totalSalesAmount: '3240403 TK', totalPurchaseAmount: '3784711 TK', profit: '-543308 TK', date: '2024-10-10' },
    { id: 2, category: 'House', brand: 'Panasonic', totalSalesQty: 810, totalPurchaseQty: 33001, totalSalesAmount: '1511100 TK', totalPurchaseAmount: '1588100 TK', profit: '-745700 TK', date: '2024-10-15' },
    { id: 3, category: 'Fashion', brand: 'Nike', totalSalesQty: 308, totalPurchaseQty: 920, totalSalesAmount: '21400 TK', totalPurchaseAmount: '46175 TK', profit: '-44325 TK', date: '2024-10-12' },
    { id: 4, category: 'Hardware', brand: 'Dell', totalSalesQty: 157722, totalPurchaseQty: 456662, totalSalesAmount: '8090573.47 TK', totalPurchaseAmount: '2448356 TK', profit: '-16390963.33 TK', date: '2024-10-18' },
    { id: 5, category: 'Document', brand: 'HP', totalSalesQty: 154, totalPurchaseQty: 490, totalSalesAmount: '459000 TK', totalPurchaseAmount: '745000 TK', profit: '-286000 TK', date: '2024-10-20' },
    { id: 6, category: 'PLC', brand: 'Mitsubishi', totalSalesQty: 2, totalPurchaseQty: 2, totalSalesAmount: '60000 TK', totalPurchaseAmount: '41000 TK', profit: '19000 TK', date: '2024-10-22' },
    { id: 7, category: 'BAJAJ', brand: 'Bajaj', totalSalesQty: 2, totalPurchaseQty: 2, totalSalesAmount: '260 TK', totalPurchaseAmount: '228 TK', profit: '32 TK', date: '2024-10-10' },
    { id: 8, category: 'Motherboard', brand: 'Intel', totalSalesQty: 25, totalPurchaseQty: 505050, totalSalesAmount: '143470 TK', totalPurchaseAmount: '156525000 TK', profit: '-152381600 TK', date: '2024-10-16' },
    { id: 9, category: 'ISP', brand: 'Ubiquiti', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-25' },
    { id: 10, category: 'Onu', brand: 'ZTE', totalSalesQty: 30, totalPurchaseQty: 2020, totalSalesAmount: '20930 TK', totalPurchaseAmount: '1010000 TK', profit: '-989070 TK', date: '2024-10-30' },
    { id: 11, category: 'Router', brand: 'TP-Link', totalSalesQty: 45, totalPurchaseQty: 1031, totalSalesAmount: '45600 TK', totalPurchaseAmount: '732700 TK', profit: '-677100 TK', date: '2024-10-21' },
    { id: 12, category: 'Switch', brand: 'Cisco', totalSalesQty: 12, totalPurchaseQty: 540, totalSalesAmount: '9600 TK', totalPurchaseAmount: '380200 TK', profit: '-298600 TK', date: '2024-10-19' },
    { id: 13, category: 'Twill Tape', brand: 'Kmart', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-16' },
    { id: 14, category: 'Glass Paper', brand: '3M', totalSalesQty: 5, totalPurchaseQty: 30, totalSalesAmount: '700 TK', totalPurchaseAmount: '2200 TK', profit: '-1500 TK', date: '2024-10-17' },
    { id: 15, category: 'Tablets', brand: 'Apple', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-18' },
    { id: 16, category: 'Shoes', brand: 'Adidas', totalSalesQty: 57, totalPurchaseQty: 633, totalSalesAmount: '114038.33 TK', totalPurchaseAmount: '63300 TK', profit: '-51891.67 TK', date: '2024-10-23' },
    { id: 17, category: 'Gold', brand: 'Tanishq', totalSalesQty: 102, totalPurchaseQty: 480, totalSalesAmount: '146039.52 TK', totalPurchaseAmount: '560000 TK', profit: '-413960.48 TK', date: '2024-10-25' },
    { id: 18, category: 'Laptop', brand: 'Dell', totalSalesQty: 0, totalPurchaseQty: 50, totalSalesAmount: '0 TK', totalPurchaseAmount: '450000 TK', profit: '-450000 TK', date: '2024-10-28' },
    // More data entries...
    { id: 19, category: 'Fast food', brand: 'McDonalds', totalSalesQty: 11, totalPurchaseQty: 16, totalSalesAmount: '11000 TK', totalPurchaseAmount: '11600 TK', profit: '-10500 TK', date: '2024-10-02' },
    { id: 20, category: 'Kebab', brand: 'KFC', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-04' },
    { id: 21, category: 'Drink', brand: 'CocaCola', totalSalesQty: 10, totalPurchaseQty: 36, totalSalesAmount: '50 TK', totalPurchaseAmount: '90 TK', profit: '-40 TK', date: '2024-10-06' },
    { id: 22, category: 'Juice', brand: 'Real', totalSalesQty: 1, totalPurchaseQty: 10, totalSalesAmount: '12 TK', totalPurchaseAmount: '800 TK', profit: '-788 TK', date: '2024-10-08' },
    { id: 23, category: 'Online', brand: 'Amazon', totalSalesQty: 132, totalPurchaseQty: 200, totalSalesAmount: '1640 TK', totalPurchaseAmount: '200 TK', profit: '1440 TK', date: '2024-10-10' },
    { id: 24, category: 'Online', brand: 'eBay', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-15' },
    { id: 25, category: 'Chowla', brand: 'Alibaba', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-12' },
    { id: 26, category: 'Rice', brand: 'Bashundhara', totalSalesQty: 250, totalPurchaseQty: 2500, totalSalesAmount: '200000 TK', totalPurchaseAmount: '175000 TK', profit: '-155000 TK', date: '2024-10-18' },
    { id: 27, category: 'Polao Rice', brand: 'ACI', totalSalesQty: 140, totalPurchaseQty: 2000, totalSalesAmount: '14000 TK', totalPurchaseAmount: '180000 TK', profit: '-166000 TK', date: '2024-10-11' },
    { id: 28, category: 'Iron', brand: 'Bajaj', totalSalesQty: 50, totalPurchaseQty: 20900, totalSalesAmount: '3925 TK', totalPurchaseAmount: '1320000 TK', profit: '-1296075 TK', date: '2024-10-14' },
    { id: 29, category: 'Thread', brand: 'Anchor', totalSalesQty: 848, totalPurchaseQty: 6000, totalSalesAmount: '27010 TK', totalPurchaseAmount: '80000 TK', profit: '-75290 TK', date: '2024-10-15' },
    { id: 30, category: 'Sim', brand: 'GrameenPhone', totalSalesQty: 8, totalPurchaseQty: 35, totalSalesAmount: '2980 TK', totalPurchaseAmount: '7735 TK', profit: '-4755 TK', date: '2024-10-19' },
    { id: 31, category: 'BL', brand: 'BL', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-21' },
    { id: 32, category: 'addif', brand: 'Addif', totalSalesQty: 0, totalPurchaseQty: 0, totalSalesAmount: '0 TK', totalPurchaseAmount: '0 TK', profit: '0 TK', date: '2024-10-28' },
    { id: 33, category: 'Technic', brand: 'LEGO', totalSalesQty: 24, totalPurchaseQty: 106, totalSalesAmount: '5310 TK', totalPurchaseAmount: '22770 TK', profit: '-17460 TK', date: '2024-10-16' },
    { id: 34, category: 'Stamp', brand: 'Stamp', totalSalesQty: 20, totalPurchaseQty: 100, totalSalesAmount: '2300 TK', totalPurchaseAmount: '11400 TK', profit: '-8200 TK', date: '2024-10-17' },
    { id: 35, category: 'Laptop', brand: 'Dell', totalSalesQty: 0, totalPurchaseQty: 50, totalSalesAmount: '0 TK', totalPurchaseAmount: '450000 TK', profit: '-450000 TK', date: '2024-10-18' },
    // Continue adding data until there are 85 entries
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 15; // Set items per page for pagination

  // Filter function based on category, brand, and date range
  const filterData = () => {
    let filtered = data;
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    if (brandFilter) {
      filtered = filtered.filter(item => item.brand === brandFilter);
    }
    if (startDate && endDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate));
    }
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(data);
    setCategoryFilter('');
    setBrandFilter('');
    setStartDate('');
    setEndDate('');
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
          <title>Sales Purchases Report List</title>
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
    <h1 className="text-lg dark:text-white   mb-4">Category-wise Sales and Purchases Report</h1>

    <div className="md:flex flex-wrap justify-between items-center mb-4 mt-5">
            <div className="md:flex md:space-x-2 w-full md:w-full">
      {/* Category and Brand filtering */}
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="border p-2 w-full md:w-full"
      >
        <option value="">Select Category</option>
        {[...new Set(data?.map(item => item.category))]?.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={brandFilter}
        onChange={(e) => setBrandFilter(e.target.value)}
        className="border p-2 w-full md:w-full"
      >
        <option value="">Select Brand</option>
        {[...new Set(data?.map(item => item.brand))]?.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 w-full bg-white"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 w-full bg-white"
      />
      <button onClick={filterData} className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/4">Filter</button>
      <button onClick={resetFilter} className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-1/4">Reset</button>
      
    </div>
    </div>
      <div className='flex items-center justify-end'>
            <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-1/12 mb-2">Print</button>
         </div>
    <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border">
      <thead>
        <tr className='bg-emerald-500 text-white'>
          <th className="border p-2">SL</th>
          <th className="border p-2">Category Name</th>
          <th className="border p-2">Total Sales Quantity</th>
          <th className="border p-2">Total Purchase Quantity</th>
          <th className="border p-2">Total Sales Amount</th>
          <th className="border p-2">Total Purchase Amount</th>
          <th className="border p-2">Profit</th>
        </tr>
      </thead>
      <tbody>
        {currentData?.map((item) => (
          <tr key={item.id}>
            <td className="border p-2">{item.id}</td>
            <td className="border p-2">{item.category}</td>
            <td className="border p-2">{item.totalSalesQty}</td>
            <td className="border p-2">{item.totalPurchaseQty}</td>
            <td className="border p-2">{item.totalSalesAmount}</td>
            <td className="border p-2">{item.totalPurchaseAmount}</td>
            <td className="border p-2">{item.profit}</td>
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

  )
}
