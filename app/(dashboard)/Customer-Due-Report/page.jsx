"use client"
import React, { useState } from 'react';
export default function CustomerDueRepor() {

    const data = [
        { id: 1, name: 'Sakib Rabby', email: 'sakib@gmail.com', phone: '0184578745', address: 'Address', invoiceDue: 98334, directDue: 0, totalDue: 98334 },
        { id: 2, name: 'Jilani Mia', email: '', phone: '545465', address: 'Dhaka', invoiceDue: 95400, directDue: 0, totalDue: 95400 },
        { id: 3, name: 'মোঃ জিয়াউল হোসেন', email: '', phone: '01978808130', address: 'Peroly norall', invoiceDue: -20, directDue: 1000, totalDue: 980 },
        { id: 4, name: 'malek', email: 'khanengcor@hotmail.com', phone: '01741992993', address: 'madibor bazar', invoiceDue: 104458, directDue: 4000, totalDue: 108458 },
        { id: 5, name: 'Basu', email: 'bst.school.bd@gmail.com', phone: '01816437446', address: 'Demra, Bangladesh', invoiceDue: 200, directDue: 0, totalDue: 200 },
        { id: 6, name: 'MD Rakib', email: 'bst.school.bd@gmail.com', phone: '01629877465', address: 'Dhaka', invoiceDue: 1000, directDue: 21660, totalDue: 22660 },
        { id: 7, name: 'Akash', email: '', phone: '00000000', address: '', invoiceDue: 1000, directDue: 0, totalDue: 1000 },
        { id: 8, name: 'Ahmed Zubyer', email: 'ahmedzubyer@gmail.com', phone: '01842364696', address: 'House# 48, Road# 12, Sector#14, Uttara', invoiceDue: 275500, directDue: 0, totalDue: 275500 },
        { id: 9, name: 'balir bap', email: '', phone: '01658945826', address: '', invoiceDue: 111220, directDue: 0, totalDue: 111220 },
        { id: 10, name: 'Mohimenul', email: '', phone: '01921292461', address: '', invoiceDue: 670, directDue: 0, totalDue: 670 },
        { id: 11, name: 'Online Mart Akif', email: '', phone: '0172288776', address: '', invoiceDue: 4000, directDue: 0, totalDue: 4000 },
        { id: 12, name: 'Ajim Ahmed', email: '', phone: '01700000025', address: 'Sylhet', invoiceDue: 8591, directDue: 0, totalDue: 8590.56 },
        { id: 13, name: 'dev_test', email: '', phone: '01246732789', address: '', invoiceDue: 610, directDue: 0, totalDue: 610 },
        { id: 14, name: 'dev_test@', email: '', phone: '01948732128', address: '', invoiceDue: 567, directDue: 0, totalDue: 567 },
        { id: 15, name: 'jisan 0189048214', email: '', phone: '0189048214', address: '', invoiceDue: 430, directDue: 0, totalDue: 430 },
      ];
    
      const [currentPage, setCurrentPage] = useState(1);
      const [filteredData, setFilteredData] = useState(data);
      const itemsPerPage = 20; // Set items per page for pagination
    
      // Generate unique names for the dropdown
      const uniqueNames = [...new Set(data?.map((product) => product.name))];
    
      // Handle filtering when customer name is selected
      const handleCustomerChange = (customerName) => {
        if (customerName) {
          const filtered = data.filter(item => item.name === customerName);
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
        setCurrentPage(1); // Reset to first page after filtering
      };
    
      // Reset the filter
      const resetFilter = () => {
        setFilteredData(data);
        setCurrentPage(1); // Reset to first page after resetting
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
          <title>Customer Due Report</title>
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
    <div className="container mx-auto px-4 py-8 md:mt-[5%] mt-[15%]  text-sm">
      <h1 className="text-lg dark:text-white  mb-4">Customer Due Report</h1>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex space-x-2 w-full md:w-1/2">
        <select
            onChange={(e) => handleCustomerChange(e.target.value)}
            className="border p-2 w-full md:w-1/2"
          >
            <option value="">Select Customer</option>
            {uniqueNames?.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button onClick={handleCustomerChange} className="bg-blue-500 text-white px-8 py-2 rounded">Filter</button>
          <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 rounded">Reset</button>
        </div>
        <button onClick={handlePrint} className="bg-green-500 text-white px-8 py-2 rounded">Print</button>
      </div>

      <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border  ">
        <thead>
          <tr className='bg-emerald-500 text-white'>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Invoice Due</th>
            <th className="border p-2">Direct Due</th>
            <th className="border p-2">Total Due</th>
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
              <td className="border p-2">{item.invoiceDue} TK</td>
              <td className="border p-2">{item.directDue} TK</td>
              <td className="border p-2">{item.totalDue} TK</td>
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
