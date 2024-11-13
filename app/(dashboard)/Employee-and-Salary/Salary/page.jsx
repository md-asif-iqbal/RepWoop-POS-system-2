"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function Salary() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    const pathname = usePathname();

    // Sample employee data with 15 entries
  const employeesData = [
    { id: 1, date: '01 Oct, 2024', name: 'Sanower', email: 'sanower@gmail.com', phone: '01789898989', address: 'msadbnsjhf', overtime: '0.00 TK', advance: '9000.00 TK', totalReceivable: '0.00 TK', paid: '3000.00 TK', due: '-3000.00 TK' },
    { id: 2, date: '01 Sep, 2024', name: 'Md Shamsuzzaman', email: 'shamsuzzaman@gmail.com', phone: '01828686154', address: 'Dhaka', overtime: '0.00 TK', advance: '0.00 TK', totalReceivable: '18000.00 TK', paid: '18000.00 TK', due: '0.00 TK' },
    { id: 3, date: '15 Aug, 2024', name: 'Jane Doe', email: 'jane@example.com', phone: '01923456789', address: 'Sylhet', overtime: '300.00 TK', advance: '5000.00 TK', totalReceivable: '1500.00 TK', paid: '7000.00 TK', due: '2000.00 TK' },
    { id: 4, date: '10 Jul, 2024', name: 'John Smith', email: 'john@example.com', phone: '01812345678', address: 'Chattogram', overtime: '200.00 TK', advance: '0.00 TK', totalReceivable: '1000.00 TK', paid: '5000.00 TK', due: '5000.00 TK' },
    { id: 5, date: '05 Jul, 2024', name: 'Chris Hemsworth', email: 'chris@example.com', phone: '01756789012', address: 'Dhaka', overtime: '400.00 TK', advance: '2000.00 TK', totalReceivable: '500.00 TK', paid: '3000.00 TK', due: '500.00 TK' },
    { id: 6, date: '01 Jun, 2024', name: 'Robert Downey', email: 'robert@example.com', phone: '01712345678', address: 'Rajshahi', overtime: '0.00 TK', advance: '0.00 TK', totalReceivable: '1000.00 TK', paid: '1000.00 TK', due: '0.00 TK' },
    { id: 7, date: '25 May, 2024', name: 'Scarlett Johansson', email: 'scarlett@example.com', phone: '01698765432', address: 'Barisal', overtime: '500.00 TK', advance: '0.00 TK', totalReceivable: '2000.00 TK', paid: '1000.00 TK', due: '1000.00 TK' },
    { id: 8, date: '15 May, 2024', name: 'Mark Ruffalo', email: 'mark@example.com', phone: '01587654321', address: 'Khulna', overtime: '200.00 TK', advance: '0.00 TK', totalReceivable: '1500.00 TK', paid: '1500.00 TK', due: '0.00 TK' },
    { id: 9, date: '10 Apr, 2024', name: 'Tom Hanks', email: 'tom@example.com', phone: '01987654321', address: 'Dhaka', overtime: '300.00 TK', advance: '1000.00 TK', totalReceivable: '1000.00 TK', paid: '2000.00 TK', due: '0.00 TK' },
    { id: 10, date: '01 Apr, 2024', name: 'Chris Evans', email: 'evans@example.com', phone: '01812345678', address: 'Gazipur', overtime: '0.00 TK', advance: '3000.00 TK', totalReceivable: '0.00 TK', paid: '5000.00 TK', due: '-2000.00 TK' },
    { id: 11, date: '25 Mar, 2024', name: 'Jeremy Renner', email: 'jeremy@example.com', phone: '01598765432', address: 'Narayanganj', overtime: '100.00 TK', advance: '0.00 TK', totalReceivable: '800.00 TK', paid: '5000.00 TK', due: '300.00 TK' },
    { id: 12, date: '15 Mar, 2024', name: 'Gal Gadot', email: 'gal@example.com', phone: '01787654321', address: 'Comilla', overtime: '0.00 TK', advance: '0.00 TK', totalReceivable: '0.00 TK', paid: '3000.00 TK', due: '0.00 TK' },
    { id: 13, date: '01 Mar, 2024', name: 'Brie Larson', email: 'brie@example.com', phone: '01876543210', address: 'Dhaka', overtime: '200.00 TK', advance: '1000.00 TK', totalReceivable: '1000.00 TK', paid: '5000.00 TK', due: '0.00 TK' },
    { id: 14, date: '15 Feb, 2024', name: 'Paul Rudd', email: 'paul@example.com', phone: '01976543210', address: 'Rajshahi', overtime: '150.00 TK', advance: '0.00 TK', totalReceivable: '1200.00 TK', paid: '2000.00 TK', due: '300.00 TK' },
    { id: 15, date: '01 Feb, 2024', name: 'Tom Holland', email: 'holland@example.com', phone: '01576543210', address: 'Dhaka', overtime: '300.00 TK', advance: '2000.00 TK', totalReceivable: '0.00 TK', paid: '4000.00 TK', due: '1000.00 TK' },
  ];

  // State for filters and filtered data
  const [filterName, setFilterName] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData);
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 15;

  // Handle filtering
  const handleFilter = () => {
    let filtered = employeesData;

    // Filter by Name
    if (filterName) {
      filtered = filtered.filter((employee) =>
        employee.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Filter by Phone
    if (filterPhone) {
      filtered = filtered.filter((employee) =>
        employee.phone.includes(filterPhone)
      );
    }

    // Filter by Date Range
    if (startDate) {
      filtered = filtered.filter((employee) => {
        const employeeDate = new Date(employee.date);
        return employeeDate >= new Date(startDate);
      });
    }

    if (endDate) {
      filtered = filtered.filter((employee) => {
        const employeeDate = new Date(employee.date);
        return employeeDate <= new Date(endDate);
      });
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Reset filters
  const handleReset = () => {
    setFilterName('');
    setFilterPhone('');
    setStartDate('');
    setEndDate('');
    setFilteredEmployees(employeesData); // Reset to all data
    setCurrentPage(1); // Reset to page 1 after reset
  };


  // Calculate the range of employees to display for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);


  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Employee Salary List</title>
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
<h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Employee Salary</h1>
<div className=' lg:flex items-start justify-start mx-5 py-5 gap-10 '>
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


    <div className="w-full p-4">
      {/* Filter Section */}
      <div className="md:flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border bg-white rounded px-4 py-2  mb-2 md:mb-0 md:mr-2 w-full "
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border bg-white rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full "
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          className="border bg-white rounded px-4 py-2  mb-2 md:mb-0 md:mr-2 w-full "
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          className="border bg-white rounded px-4 py-2  mb-2 md:mb-0 md:mr-2 w-full "
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          className="bg-emerald-500 text-white rounded px-8 py-2 mb-2 md:mb-0 md:mr-2"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          className="bg-blue-500 text-white rounded px-8 py-2 mb-2 md:mb-0"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      {/* Employee Salary Table */}
      <div className="overflow-auto">
        {/* Print Button */}
      <div className="flex justify-between mt-4 mb-4">
        <h1 className='text-md '>Employees Salary</h1>
        <button
          className="bg-emerald-500 text-white rounded px-8 py-2 border"
          onClick={() => handlePrint()}
        >
          Print
        </button>
      </div>
        <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border dark:text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Overtime</th>
              <th className="px-4 py-2 border">Advance</th>
              <th className="px-4 py-2 border">Total Receivable</th>
              <th className="px-4 py-2 border">Paid</th>
              <th className="px-4 py-2 border">Due</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees?.map((employee, index) => (
              <tr key={employee.id} className="text-center border-t">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{employee.date}</td>
                <td className="px-4 py-2 border">{employee.name}</td>
                <td className="px-4 py-2 border">{employee.email}</td>
                <td className="px-4 py-2 border">{employee.phone}</td>
                <td className="px-4 py-2 border">{employee.address}</td>
                <td className="px-4 py-2 border">{employee.overtime}</td>
                <td className="px-4 py-2 border">{employee.advance}</td>
                <td className="px-4 py-2 border">{employee.totalReceivable}</td>
                <td className="px-4 py-2 border">{employee.paid}</td>
                <td className="px-4 py-2 border">{employee.due}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-emerald-500 text-white rounded px-2 py-1">
                    Actions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
    <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-emerald-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

</div>
</div>
    </div>
  )
}
