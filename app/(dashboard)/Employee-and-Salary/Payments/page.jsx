"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function EmployeePayments() {
  const pathname = usePathname();
  const spanClass =
    "block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700";

  // States
  const [data, setData] = useState([]); // Store fetched employee payments
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Items per page
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Employee-and-Salary/Salary/salary");
        const result = await response.json();
        setData(result);
        setFilteredData(result); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching employee payments:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on date range
  const filterData = () => {
    let filtered = [...data];

    if (startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.salary_month) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (item) => new Date(item.salary_month) <= new Date(endDate)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Reset filter
  const resetFilter = () => {
    setFilteredData(data);
    setStartDate("");
    setEndDate("");
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
    const newWindow = window.open("", "_blank");
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
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, "")} <!-- Remove the Actions column -->
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="container mx-auto px-4 py-8 text-sm">
      {/* Navigation Links */}
      <div className="mb-8 mt-[25%] lg:mt-[5%]">
        <h1 className="text-lg text-gray-500 dark:text-white mb-5">Employee Payments</h1>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/Employee-and-Salary"
            className={`${
              pathname === "/Employee-and-Salary"
                ? "group text-orange-500 hover:text-orange-500"
                : "group text-gray-500 dark:text-white hover:text-orange-500"
            }`}
          >
            Employees
            <span className={spanClass}></span>
          </Link>
          <Link
            href="/Employee-and-Salary/New-Employee"
            className={`${
              pathname === "/Employee-and-Salary/New-Employee"
                ? "group text-orange-500 hover:text-orange-500"
                : "group text-gray-500 dark:text-white hover:text-orange-500"
            }`}
          >
            + New Employee
            <span className={spanClass}></span>
          </Link>
          <Link
            href="/Employee-and-Salary/Salary"
            className={`${
              pathname === "/Employee-and-Salary/Salary"
                ? "group text-orange-500 hover:text-orange-500"
                : "group text-gray-500 dark:text-white hover:text-orange-500"
            }`}
          >
            Employees Salary
            <span className={spanClass}></span>
          </Link>
          <Link
            href="/Employee-and-Salary/Salary/Create"
            className={`${
              pathname === "/Employee-and-Salary/Salary/Create"
                ? "group text-orange-500 hover:text-orange-500"
                : "group text-gray-500 dark:text-white hover:text-orange-500"
            }`}
          >
            + New Employee Salary
            <span className={spanClass}></span>
          </Link>
          <Link
            href="/Employee-and-Salary/Payments"
            className={`${
              pathname === "/Employee-and-Salary/Payments"
                ? "group text-orange-500 hover:text-orange-500"
                : "group text-gray-500 dark:text-white hover:text-orange-500"
            }`}
          >
            Payment List
            <span className={spanClass}></span>
          </Link>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row justify-between mb-4 gap-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>
        
      </div>
      <div className="flex flex-col lg:flex-row justify-end mb-4 gap-4" >
      <div className="flex gap-4">
          <button
            onClick={filterData}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full lg:w-auto"
          >
            Filter
          </button>
          <button
            onClick={resetFilter}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full lg:w-auto"
          >
            Reset
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-4 py-2 rounded w-full lg:w-auto"
          >
            Print
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table id="table-to-print" className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">SL</th>
              <th className="border px-4 py-2">Salary Month</th>
              <th className="border px-4 py-2">Employee Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Basic Salary</th>
              <th className="border px-4 py-2">Overtime Rate</th>
              <th className="border px-4 py-2">Total Overtime</th>
              <th className="border px-4 py-2">Advance Amount</th>
              <th className="border px-4 py-2">Pay Amount</th>
              <th className="border px-4 py-2">Transaction Account</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{index + 1 + indexOfFirstItem}</td>
                <td className="border px-4 py-2">{item.salary_month}</td>
                <td className="border px-4 py-2">{item.employee_name}</td>
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.basic_salary} TK</td>
                <td className="border px-4 py-2">{item.overtime_rate} TK</td>
                <td className="border px-4 py-2">{item.total_overtime} Hours</td>
                <td className="border px-4 py-2">{item.advance_amount} TK</td>
                <td className="border px-4 py-2">{item.pay_amount} TK</td>
                <td className="border px-4 py-2">{item.transaction_account}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
