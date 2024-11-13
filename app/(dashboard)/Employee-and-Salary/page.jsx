"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
export default function EmployeeAndSalary() {
    const pathname = usePathname();
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    // Sample employee data with 13 entries
  const employeesData = [
    { id: 1, joiningDate: '2024-10-01', name: 'Sanower', email: 'sanower@gmail.com', phone: '01789898989', address: 'msadbnsjhf', salary: '9000.00 TK', overtimeRate: '300 TK', totalReceivable: '0.00 TK', totalPaid: '3000.00 TK', totalDue: '-3000.00 TK' },
    { id: 2, joiningDate: '2024-09-21', name: 'Ali Mortuza', email: 'alimortuza@gmail.com', phone: '01700011122', address: 'Address 2', salary: '2000000.00 TK', overtimeRate: '0 TK', totalReceivable: '0 TK', totalPaid: '0 TK', totalDue: '0 TK' },
    { id: 3, joiningDate: '2024-09-21', name: 'Md Shamsuzzaman', email: 'shamsuzzaman@gmail.com', phone: '01828686154', address: 'Address 3', salary: '18000.00 TK', overtimeRate: '0 TK', totalReceivable: '18000.00 TK', totalPaid: '18000.00 TK', totalDue: '0.00 TK' },
    { id: 4, joiningDate: '2024-09-21', name: 'John Doe', email: 'john@example.com', phone: '01712345678', address: 'Dhaka', salary: '15000.00 TK', overtimeRate: '200 TK', totalReceivable: '2000.00 TK', totalPaid: '12000.00 TK', totalDue: '3000.00 TK' },
    { id: 5, joiningDate: '2024-08-15', name: 'Jane Smith', email: 'jane@example.com', phone: '01912345678', address: 'Chattogram', salary: '30000.00 TK', overtimeRate: '500 TK', totalReceivable: '1000.00 TK', totalPaid: '25000.00 TK', totalDue: '5000.00 TK' },
    { id: 6, joiningDate: '2024-08-05', name: 'Michael Jordan', email: 'mj@example.com', phone: '01512345678', address: 'Sylhet', salary: '12000.00 TK', overtimeRate: '100 TK', totalReceivable: '500.00 TK', totalPaid: '11000.00 TK', totalDue: '1000.00 TK' },
    { id: 7, joiningDate: '2024-07-25', name: 'LeBron James', email: 'lebron@example.com', phone: '01812345678', address: 'Rajshahi', salary: '45000.00 TK', overtimeRate: '600 TK', totalReceivable: '2000.00 TK', totalPaid: '42000.00 TK', totalDue: '3000.00 TK' },
    { id: 8, joiningDate: '2024-07-10', name: 'Tom Hanks', email: 'tom@example.com', phone: '01612345678', address: 'Khulna', salary: '25000.00 TK', overtimeRate: '400 TK', totalReceivable: '1500.00 TK', totalPaid: '23000.00 TK', totalDue: '2000.00 TK' },
    { id: 9, joiningDate: '2024-06-30', name: 'Chris Hemsworth', email: 'chris@example.com', phone: '01798765432', address: 'Dhaka', salary: '20000.00 TK', overtimeRate: '300 TK', totalReceivable: '800.00 TK', totalPaid: '19000.00 TK', totalDue: '1000.00 TK' },
    { id: 10, joiningDate: '2024-06-15', name: 'Scarlett Johansson', email: 'scarlett@example.com', phone: '01898765432', address: 'Sylhet', salary: '22000.00 TK', overtimeRate: '350 TK', totalReceivable: '1000.00 TK', totalPaid: '21000.00 TK', totalDue: '1000.00 TK' },
    { id: 11, joiningDate: '2024-06-01', name: 'Chris Evans', email: 'evans@example.com', phone: '01598765432', address: 'Barisal', salary: '18000.00 TK', overtimeRate: '250 TK', totalReceivable: '600.00 TK', totalPaid: '17000.00 TK', totalDue: '1000.00 TK' },
    { id: 12, joiningDate: '2024-05-25', name: 'Mark Ruffalo', email: 'mark@example.com', phone: '01765432123', address: 'Chattogram', salary: '16000.00 TK', overtimeRate: '200 TK', totalReceivable: '700.00 TK', totalPaid: '15000.00 TK', totalDue: '1000.00 TK' },
    { id: 13, joiningDate: '2024-05-10', name: 'Jeremy Renner', email: 'jeremy@example.com', phone: '01965432123', address: 'Rajshahi', salary: '17000.00 TK', overtimeRate: '300 TK', totalReceivable: '900.00 TK', totalPaid: '16000.00 TK', totalDue: '1000.00 TK' },
  ];


  // State for filtering
  const [filterName, setFilterName] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employeesData);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 15;

  // Calculate the range of employees to display for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Handle filtering
  const handleFilter = () => {
    const filtered = employeesData.filter(
      (employee) =>
        employee.name.toLowerCase().includes(filterName.toLowerCase()) &&
        employee.phone.includes(filterPhone)
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1); // Reset to the first page when filter is applied
  };

  // Reset filtering
  const handleReset = () => {
    setFilterName('');
    setFilterPhone('');
    setFilteredEmployees(employeesData);
    setCurrentPage(1); // Reset to the first page when reset
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Employee and Salary Information</title>
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
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm'>

    <div className="p-0  mt-[25%] lg:mt-[5%]  w-full">
              {/* Title Section */}

  <div className=" mb-4  shadow-sm ">
  <h1 className="text-lg text-gray-500 dark:text-white mx-5 ">Employee and Salary</h1>
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
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border rounded px-4 py-2  mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border rounded px-4 py-2 r mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
          value={filterPhone}
          onChange={(e) => setFilterPhone(e.target.value)}
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

      {/* Employee Table */}
      <div className="overflow-x-auto md:mt-10">
      <div className="flex items-center justify-between gap-5 mb-5">
            <h1 className="text-gray-500 dark:text-white text-lg font-medium">Employees</h1>
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 text-white px-14 py-2 rounded"
                >
                    Print
                </button>
        </div>
        <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border dark:text-white" >
          <thead>
            <tr className='bg-emerald-500 text-white'>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Joining Date</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Over Time Rate</th>
              <th className="px-4 py-2 border">Total Receivable</th>
              <th className="px-4 py-2 border">Total Paid</th>
              <th className="px-4 py-2 border">Total Due</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees?.map((employee, index) => (
              <tr key={employee.id} className="text-center border-t">
                <td className="px-4 py-2 border">{indexOfFirstEmployee + index + 1}</td>
                <td className="px-4 py-2 border">{employee.joiningDate}</td>
                <td className="px-4 py-2 border">{employee.name}</td>
                <td className="px-4 py-2 border">{employee.email}</td>
                <td className="px-4 py-2 border">{employee.phone}</td>
                <td className="px-4 py-2 border">{employee.address}</td>
                <td className="px-4 py-2 border">{employee.salary}</td>
                <td className="px-4 py-2 border">{employee.overtimeRate}</td>
                <td className="px-4 py-2 border">{employee.totalReceivable}</td>
                <td className="px-4 py-2 border">{employee.totalPaid}</td>
                <td className="px-4 py-2 border">{employee.totalDue}</td>
                <td className="px-4 py-2 border">Manage</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
