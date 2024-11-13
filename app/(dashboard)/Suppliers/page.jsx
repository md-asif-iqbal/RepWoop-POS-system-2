"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { FaPrint } from 'react-icons/fa';
import { IoTvOutline } from 'react-icons/io5';
import { MdOutlineDeleteSweep, MdOutlinePayments } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

export default function SupplierList() {
    const spanClass = " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700"
    // Sample supplier data with unique IDs and 20 entries
  const suppliersData = [
    { id: 1, name: "Sifat", email: "sifat@example.com", phone: "0000000000", address: "Address 1", payable: "0 Tk", paid: "0 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 2, name: "Parly", email: "parly@example.com", phone: "0000000000", address: "Address 2", payable: "0 Tk", paid: "0 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 3, name: "Sim", email: "sim@example.com", phone: "017778899", address: "Address 3", payable: "0 Tk", paid: "0 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 4, name: "Oraimo", email: "oraimo@example.com", phone: "0196543886", address: "Address 4", payable: "42,000 Tk", paid: "42,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 5, name: "Riton", email: "riton@example.com", phone: "017587644", address: "Address 5", payable: "0 Tk", paid: "0 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 6, name: "Munir Ahamed", email: "munir@example.com", phone: "0000000000", address: "Address 6", payable: "4,777,500 Tk", paid: "3,053,400 Tk", purchaseDue: "1,742,100 Tk", walletBalance: "43,000 Tk", totalDue: "1,742,100 Tk" },
    { id: 7, name: "Data Tech", email: "info@datatech.com.bd", phone: "01444432222", address: "Dhaka 1205", payable: "1,525,500 Tk", paid: "1,525,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 8, name: "Mohammed Ali", email: "mohammed@example.com", phone: "0172345689", address: "Demra, Bangladesh", payable: "12,000 Tk", paid: "12,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 9, name: "Computer City", email: "comp@example.com", phone: "0184654321", address: "Chattogram", payable: "15,000 Tk", paid: "15,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 10, name: "Ajman Computer", email: "ajman@example.com", phone: "0155864321", address: "Multiplan, Dhaka", payable: "113,500 Tk", paid: "113,500 Tk", purchaseDue: "100,000 Tk", walletBalance: "100,000 Tk", totalDue: "100,000 Tk" },
    { id: 11, name: "Supplier 11", email: "supplier11@example.com", phone: "0186111111", address: "Default Address", payable: "1,651,716 Tk", paid: "1,651,716 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "3,255 Tk" },
    { id: 12, name: "Supplier 12", email: "supplier12@example.com", phone: "014257888", address: "Sylhet", payable: "250 Tk", paid: "250 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "250 Tk" },
    { id: 13, name: "Supplier 13", email: "supplier13@example.com", phone: "0187654321", address: "Chattogram", payable: "0 Tk", paid: "0 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 14, name: "Supplier 14", email: "supplier14@example.com", phone: "01987654321", address: "Dhaka", payable: "42,000 Tk", paid: "42,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "0 Tk" },
    { id: 15, name: "Supplier 15", email: "supplier15@example.com", phone: "017654321", address: "Narayanganj", payable: "500 Tk", paid: "500 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "500 Tk" },
    { id: 16, name: "Supplier 16", email: "supplier16@example.com", phone: "018954321", address: "Sylhet", payable: "200 Tk", paid: "200 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "200 Tk" },
    { id: 17, name: "Supplier 17", email: "supplier17@example.com", phone: "015654321", address: "Rajshahi", payable: "1,000 Tk", paid: "1,000 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "1,000 Tk" },
    { id: 18, name: "Supplier 18", email: "supplier18@example.com", phone: "014854321", address: "Gazipur", payable: "300 Tk", paid: "300 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "300 Tk" },
    { id: 19, name: "Supplier 19", email: "supplier19@example.com", phone: "013654321", address: "Khulna", payable: "1,500 Tk", paid: "1,500 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "1,500 Tk" },
    { id: 20, name: "Supplier 20", email: "supplier20@example.com", phone: "012654321", address: "Mymensingh", payable: "750 Tk", paid: "750 Tk", purchaseDue: "0 Tk", walletBalance: "0 Tk", totalDue: "750 Tk" },
  ];

  // State for filtering and pagination
  const [filterName, setFilterName] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliersData); // Store filtered data
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 15;
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  
  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index); // Toggle the dropdown
  };

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filtering when the filter button is clicked
  const handleFilter = () => {
    const filtered = suppliersData.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(filterName.toLowerCase()) &&
        supplier.phone.includes(filterPhone)
    );
    setFilteredSuppliers(filtered);
    setCurrentPage(1); // Reset to first page when filtered
  };

  // Handle print (only print the table)
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Supplier Information</title>
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
    <div className='bg-white dark:bg-[#141432] font-nunito text-sm '>

        <div className="p-0  mt-[25%] lg:mt-[5%]  w-full dark:text-white">
        {/* Title Section */}
      <div className=" mb-4  shadow-sm ">
      <h1 className="text-lg dark:text-white  text-gray-500 mx-5 ">Suppliers List</h1>
        <div className='flex items-start justify-start mx-5 py-5 gap-10'>
            <Link href="/Suppliers" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            Suppliers
            <span className={spanClass}></span>
            </Link>
            <Link href="/Suppliers/Create" className="group text-gray-500 dark:text-white text-md hover:text-orange-500">
            +  New Supplier
            <span className={spanClass}></span>
            </Link>
        </div>
      </div>

      <div className="w-full  mx-auto p-4">
      <div className="flex flex-col md:flex-row w-full items-center mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border rounded px-4  py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border rounded px-4  py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
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
          className="bg-blue-500 text-white rounded px-8 py-2 mb-2 md:mb-0 md:mr-2"
          onClick={() => {
            setFilterName("");
            setFilterPhone("");
            setFilteredSuppliers(suppliersData);
          }}
        >
          Reset
        </button>
        <button
          className="bg-emerald-500 text-white rounded px-8 py-2 mb-2 md:mb-0"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      <div className="overflow-x-auto">
        <table id="table-to-print" className="min-w-full bg-white dark:bg-[#141432] table-auto dark:text-white w-full border-collapse border">
          <thead>
            <tr className='bg-emerald-500 text-white'>
              <th className="px-4 border py-2">SL</th>
              <th className="px-4 border py-2">Name</th>
              <th className="px-4 border py-2">Email</th>
              <th className="px-4 border py-2">Phone</th>
              <th className="px-4 border py-2">Address</th>
              <th className="px-4 border py-2">Payable</th>
              <th className="px-4 border py-2">Paid</th>
              <th className="px-4 border py-2">Purchase Due</th>
              <th className="px-4 border py-2">Wallet Balance</th>
              <th className="px-4 border py-2">Total Due</th>
              <th className="px-4 border py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSuppliers?.map((supplier, index) => (
              <tr key={supplier.id} className="text-center border-t">
                <td className="px-4 border py-2">{index + 1 + (currentPage - 1) * 15}</td>
                <td className="px-4 border py-2">{supplier.name}</td>
                <td className="px-4 border py-2">{supplier.email}</td>
                <td className="px-4 border py-2">{supplier.phone}</td>
                <td className="px-4 border py-2">{supplier.address}</td>
                <td className="px-4 border py-2">{supplier.payable}</td>
                <td className="px-4 border py-2">{supplier.paid}</td>
                <td className="px-4 border py-2">{supplier.purchaseDue}</td>
                <td className="px-4 border py-2">{supplier.walletBalance}</td>
                <td className="px-4 border py-2">{supplier.totalDue}</td>
                <td className="p-2 relative ">
                                <button
                                    className="bg-emerald-500 text-white p-2 rounded flex items-center"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <span>Manage</span>
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="ml-2 h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                </button>
                                {isDropdownOpen === index && (
                                    <div className="absolute transition-transform duration-700 right-0 mt-2 w-48 bg-white shadow-sm rounded-md overflow-hidden z-20">
                                    <ul className="py-1">
                                        <li>
                                        <button
                                            className="w-full px-4 hover:scale-110 py-2 text-sm  text-gray-700  flex items-center"
                                            onClick={() => generateInvoice(purchase)}
                                        >
                                            <span className="mr-2">
                                            <FaPrint size={16} className='text-teal-500'/>
                                            </span>
                                            Invoice
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 hover:scale-110 py-2 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Show Action')}
                                        >
                                            <span className="mr-2 ">
                                            <IoTvOutline size={16} className='text-blue-500'/>
                                            </span>
                                            Show
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Edit Action')}
                                        >
                                            <span className="mr-2 ">
                                           
                                            <TbEdit size={16} className='text-blue-500'/>
                                            
                                            </span>
                                            Edit
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-gray-700  flex items-center"
                                            onClick={() => alert('Add Payment Action')}
                                        >
                                            <span className="mr-2">
                                            <MdOutlinePayments size={16} className='text-teal-500'/>
                                            </span>
                                            Add Payment
                                        </button>
                                        </li>
                                        <li>
                                        <button
                                            className="w-full px-4 py-2 hover:scale-110 text-sm  text-red-600 hover:bg-red-100 flex items-center"
                                            onClick={() => alert('Delete Action')}
                                        >
                                            <span className="mr-2">
                                            <MdOutlineDeleteSweep size={16}/>
                                            </span>
                                            Delete
                                        </button>
                                        </li>
                                    </ul>
                                    </div>
                                )}
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredSuppliers.length / suppliersPerPage) })?.map(
          (_, index) => (
            <button
              key={index}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? "bg-emerald-500 text-white" : "bg-gray-300"}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
      
    </div>
    </div>
  )
}
