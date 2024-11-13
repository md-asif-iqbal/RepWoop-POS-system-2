"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

export default function EmployeePayments() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
  // Sample data with 10 entries
  const data = [
    { invoiceNo: 1, date: '2024-09-01', name: 'Md Shamsuzzaman', email: 'md@gmail.com', phone: '01828686154', address: 'Address 1', paid: 18000 },
    { invoiceNo: 2, date: '2024-10-01', name: 'Sanower', email: 'sanower@gmail.com', phone: '01789898989', address: 'Address 2', paid: 3000 },
    { invoiceNo: 3, date: '2024-08-01', name: 'John Doe', email: 'john@gmail.com', phone: '01888888888', address: 'Address 3', paid: 2500 },
    { invoiceNo: 4, date: '2024-07-01', name: 'Jane Doe', email: 'jane@gmail.com', phone: '01777777777', address: 'Address 4', paid: 4000 },
    { invoiceNo: 5, date: '2024-06-01', name: 'Alex Smith', email: 'alex@gmail.com', phone: '01666666666', address: 'Address 5', paid: 5500 },
    { invoiceNo: 6, date: '2024-05-01', name: 'Maria Garcia', email: 'maria@gmail.com', phone: '01555555555', address: 'Address 6', paid: 6200 },
    { invoiceNo: 7, date: '2024-04-01', name: 'David Brown', email: 'david@gmail.com', phone: '01999999999', address: 'Address 7', paid: 7000 },
    { invoiceNo: 8, date: '2024-03-01', name: 'Chris Johnson', email: 'chris@gmail.com', phone: '01222222222', address: 'Address 8', paid: 8200 },
    { invoiceNo: 9, date: '2024-02-01', name: 'Emma Davis', email: 'emma@gmail.com', phone: '01111111111', address: 'Address 9', paid: 9300 },
    { invoiceNo: 10, date: '2024-01-01', name: 'Olivia Martinez', email: 'olivia@gmail.com', phone: '01888888881', address: 'Address 10', paid: 10200 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Show 3 items per page for better pagination demo
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const pathname = usePathname();

    // Filter data based on date range
    const filterData = () => {
        let filtered = data;
    
        if (startDate) {
          filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
        }
    
        if (endDate) {
          filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
        }
    
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after filtering
      };
    
      // Reset filter
      const resetFilter = () => {
        setFilteredData(data);
        setStartDate('');
        setEndDate('');
        setCurrentPage(1); // Reset to first page
      };
    
      // Pagination Logic
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Employee Payments</title>
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
    <div>
        <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>

<div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
          {/* Title Section */}

<div className=" mb-4  shadow-sm ">
<h1 className="text-lg text-gray-500 dark:text-white md:mx-5 ">Employee Payments</h1>
<div className=' lg:flex items-start justify-start md:mx-5 py-5 gap-10 '>
    <Link href="/Employee-and-Salary" className= {`${
                      pathname === '/Employee-and-Salary' 
                      ? ' group text-orange-500  hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                  }`}>
    Employees
    <span className={spanClass}></span>
    </Link>
    <Link href="/Employee-and-Salary/New-Employee" className={`${
                      pathname === '/Employee-and-Salary/New-Employee' 
                      ? ' group text-orange-500  hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                  }`}>
    + New Employee
    <span className={spanClass}></span>
    </Link>
    <Link href="/Employee-and-Salary/Salary" className= {`${
                      pathname === '/Employee-and-Salary/Salary' 
                      ? ' group text-orange-500  hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                  }`}>
    Employees Salary
    <span className={spanClass}></span>
    </Link>
    <Link href="/Employee-and-Salary/Salary/Create" className= {`${
                      pathname === '/Employee-and-Salary/Salary/Create' 
                      ? ' group text-orange-500  hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                  }`}>
    + New Employee Salary
    <span className={spanClass}></span>
    </Link>
    <Link href="/Employee-and-Salary/Payments" className= {`${
                      pathname === '/Employee-and-Salary/Payments' 
                      ? ' group text-orange-500  hover:text-orange-500' 
                      : 'group text-gray-500 dark:text-white hover:text-orange-500 '
                  }`}>
    Payment List
    <span className={spanClass}></span>
    </Link>
</div>
</div>

<div className="md:container md:mx-auto md:px-4 py-8">
      

      <div className="md:flex md:justify-between mb-4 w-full">
      
        <div className="md:flex w-full">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="joiningDate">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
                className=" block w-full bg-white bg-gray-100 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block  tracking-wide text-gray-700 dark:text-white text-xs  mb-2" htmlFor="joiningDate">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
                className=" block w-full bg-white text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                placeholder="End Date"
                required
            />
          </div>
        </div>
        
      </div>
            <div className='lg:flex gap-5 md:ml-3 mb-5 '>
                <button onClick={filterData} className="bg-blue-500 text-white px-8 py-2 rounded">Filter</button>
                <button onClick={resetFilter} className="bg-gray-500 text-white px-8 py-2 rounded">Reset</button>
                <button onClick={handlePrint} className="bg-green-500 text-white px-8 py-2 mx-2 rounded">Print</button>
            </div>

      <table id='table-to-print' className="table-auto dark:text-white w-full border-collapse border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SL</th>
            <th className="border p-2">Invoice No</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Paid</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1 + indexOfFirstItem}</td>
              <td className="border p-2">{item.invoiceNo}</td>
              <td className="border p-2">{item.date}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.phone}</td>
              <td className="border p-2">{item.address}</td>
              <td className="border p-2">{item.paid} TK</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Settings</button>
              </td>
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


</div>
</div>
    </div>

  );
};
