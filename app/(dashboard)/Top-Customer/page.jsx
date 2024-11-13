"use client"
import React, { useState } from 'react';

export default function TopCustomersReport() {
 // Constant dataset with 30 customer entries
 const data = [
    { id: 1, name: 'balir bap', email: '', phone: '01658945826', address: '', totalSell: 309000, date: '2024-10-15' },
    { id: 2, name: 'Ahmed Zubyer', email: 'ahmedzubyer@gmail.com', phone: '01842364696', address: 'House# 48, Road# 12, Sector#14, Uttara', totalSell: 275500, date: '2024-10-10' },
    { id: 3, name: 'Tamim Akon', email: '', phone: '01752339500', address: '', totalSell: 109411, date: '2024-10-12' },
    { id: 4, name: 'Reju', email: '', phone: '0197032041', address: '', totalSell: 85750, date: '2024-10-18' },
    { id: 5, name: 'Raky', email: '', phone: '000000000', address: '', totalSell: 73913, date: '2024-10-07' },
    { id: 6, name: 'Ajim Ahmed', email: '', phone: '01700000025', address: 'Sylhet', totalSell: 11971, date: '2024-10-05' },
    { id: 7, name: 'Online Mart Akif', email: '', phone: '0172288776', address: '', totalSell: 7800, date: '2024-10-10' },
    { id: 8, name: 'Siyam', email: '', phone: '01775835607', address: 'Dhaka', totalSell: 7000, date: '2024-10-11' },
    { id: 9, name: 'Mohimenul', email: '', phone: '01921292461', address: '', totalSell: 6670, date: '2024-10-14' },
    { id: 10, name: 'Akash', email: '', phone: '000000000', address: '', totalSell: 2600, date: '2024-10-01' },
    { id: 11, name: 'মোঃ জিয়াউল হোসেন', email: '', phone: '01978808130', address: 'Peroly norall', totalSell: 1100, date: '2024-10-21' },
    { id: 12, name: 'dev_test', email: '', phone: '01246732789', address: '', totalSell: 875, date: '2024-10-22' },
    { id: 13, name: 'dev_test@', email: '', phone: '01948732128', address: '', totalSell: 600, date: '2024-10-25' },
    { id: 14, name: 'Jisan', email: '', phone: '0189048214', address: '', totalSell: 430, date: '2024-10-28' },
    { id: 15, name: 'Basu', email: 'bst.school.bd@gmail.com', phone: '01816437446', address: 'Demra, Bangladesh', totalSell: 101, date: '2024-10-02' },
    { id: 16, name: 'Sakib Rabby', email: 'sakib@gmail.com', phone: '0184578745', address: 'Address', totalSell: 0, date: '2024-10-03' },
    { id: 17, name: 'Md Juwel Khan', email: 'juwel@gmail.com', phone: '01845784545', address: 'Address', totalSell: 0, date: '2024-10-07' },
    { id: 18, name: 'Md Sumon', email: 'sumon@gmail.com', phone: '01847898745', address: 'Address', totalSell: 0, date: '2024-10-08' },
    { id: 19, name: 'Mahmudul Hasan', email: 'mahmud@gmail.com', phone: '0198784545', address: 'Address', totalSell: 0, date: '2024-10-13' },
    { id: 20, name: 'Jilani Mia', email: '', phone: '545465', address: 'Dhaka', totalSell: 0, date: '2024-10-14' },
    // Additional customers
    { id: 21, name: 'Tamim Akon', email: '', phone: '01753239500', address: '', totalSell: 109411, date: '2024-10-12' },
    { id: 22, name: 'Akash', email: '', phone: '000000000', address: '', totalSell: 2600, date: '2024-10-01' },
    { id: 23, name: 'Siyam', email: '', phone: '01775835607', address: 'Dhaka', totalSell: 7000, date: '2024-10-11' },
    { id: 24, name: 'Mohimenul', email: '', phone: '01921292461', address: '', totalSell: 6670, date: '2024-10-14' },
    { id: 25, name: 'Ajim Ahmed', email: '', phone: '01700000025', address: 'Sylhet', totalSell: 11971, date: '2024-10-05' },
    { id: 26, name: 'Online Mart Akif', email: '', phone: '0172288776', address: '', totalSell: 7800, date: '2024-10-10' },
    { id: 27, name: 'Reju', email: '', phone: '0197032041', address: '', totalSell: 85750, date: '2024-10-18' },
    { id: 28, name: 'Raky', email: '', phone: '000000000', address: '', totalSell: 73913, date: '2024-10-07' },
    { id: 29, name: 'Mahmudul Hasan', email: 'mahmud@gmail.com', phone: '0198784545', address: 'Address', totalSell: 0, date: '2024-10-13' },
    { id: 30, name: 'Md Sumon', email: 'sumon@gmail.com', phone: '01847898745', address: 'Address', totalSell: 0, date: '2024-10-08' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const itemsPerPage = 20; // Set items per page for pagination

  // Filter function based on start date and end date
  const filterData = () => {
    if (startDate && endDate) {
      const filtered = data.filter(item => new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(data);
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
          <title>Top Customer List</title>
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
      <h1 className="text-lg dark:text-white  mb-4">Top Customers</h1>

      <div className="md:flex flex-wrap justify-between items-center mb-4">
            <div className="md:flex md:space-x-2 w-full md:w-full">
        {/* Date filtering */}
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

      <h2 className=" dark:text-white text-lg  mb-4 text-center">Top Customers (Based on Sell Amount)</h2>
      <p className=" dark:text-white text-center mb-4">Report From {startDate || '01/10/2024'} to {endDate || '31/10/2024'}</p>

      <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border">
        <thead>
          <tr className='bg-emerald-500 text-white'>
            <th className="border p-2">SL</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Total Sell</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.address}</td>
              <td className="border p-2">{item.totalSell} TK</td>
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
