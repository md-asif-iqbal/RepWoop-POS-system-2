'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaPrint } from 'react-icons/fa';
import { IoTvOutline } from 'react-icons/io5';
import { MdOutlineDeleteSweep, MdOutlinePayments } from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';

export default function SupplierList() {
  const spanClass =
    'block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700';

  // State for suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 15;
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  // Fetch suppliers from the backend
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/Suppliers/suppliers');
        if (!response.ok) throw new Error('Failed to fetch suppliers');
        const { suppliers } = await response.json();
        console.log(suppliers);
        setSuppliers(suppliers);
        setFilteredSuppliers(suppliers); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        toast.error('Error fetching suppliers');
      }
    };

    fetchSuppliers();
  }, []);

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filtering
  const handleFilter = () => {
    const filtered = suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(filterName.toLowerCase()) &&
        supplier.phone.includes(filterPhone)
    );
    setFilteredSuppliers(filtered);
    setCurrentPage(1); // Reset to first page when filtered
  };

  // Handle print (only print the table)
  const handlePrint = () => {
    const printContent = document.getElementById('table-to-print').outerHTML;
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

  const toggleDropdown = (index) => {
    setIsDropdownOpen(isDropdownOpen === index ? null : index); // Toggle the dropdown
  };

  return (
    <div className="bg-white dark:bg-[#141432] font-nunito text-sm">
      <div className="p-0 mt-[25%] lg:mt-[5%] w-full dark:text-white">
        {/* Title Section */}
        <div className="mb-4 shadow-sm">
          <h1 className="text-lg dark:text-white text-gray-500 mx-5">Suppliers List</h1>
          <div className="flex items-start justify-start mx-5 py-5 gap-10">
            <Link
              href="/Suppliers"
              className="group text-gray-500 dark:text-white text-md hover:text-orange-500"
            >
              Suppliers
              <span className={spanClass}></span>
            </Link>
            <Link
              href="/Suppliers/Create"
              className="group text-gray-500 dark:text-white text-md hover:text-orange-500"
            >
              + New Supplier
              <span className={spanClass}></span>
            </Link>
          </div>
        </div>

        <div className="w-full mx-auto p-4">
          <div className="flex flex-col md:flex-row w-full items-center mb-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="border rounded px-4 py-2 mb-2 md:mb-0 md:mr-2 w-full md:w-2/4 bg-white"
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
                setFilterName('');
                setFilterPhone('');
                setFilteredSuppliers(suppliers);
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
            <table
              id="table-to-print"
              className="min-w-full bg-white dark:bg-[#141432] table-auto dark:text-white w-full border-collapse border"
            >
              <thead>
                <tr className="bg-emerald-500 text-white">
                  <th className="px-4 border py-2">SL</th>
                  <th className="px-4 border py-2">Name</th>
                  <th className="px-4 border py-2">Email</th>
                  <th className="px-4 border py-2">Phone</th>
                  <th className="px-4 border py-2">Address</th>
                  <th className="px-4 border py-2">Balance</th>
                  <th className="px-4 border py-2">Paid</th>
                  <th className="px-4 border py-2">Purchase Due</th>
                  <th className="px-4 border py-2">Total Due</th>
                  <th className="px-4 border py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentSuppliers?.map((supplier, index) => (
                  <tr key={supplier.id} className="text-center border-t">
                    <td className="px-4 border py-2">
                      {index + 1 + (currentPage - 1) * suppliersPerPage}
                    </td>
                    <td className="px-4 border py-2">{supplier.name}</td>
                    <td className="px-4 border py-2">{supplier.email}</td>
                    <td className="px-4 border py-2">{supplier.phone}</td>
                    <td className="px-4 border py-2">{supplier.address}</td>
                    <td className="px-4 border py-2">{supplier.balance} TK</td>
                    <td className="px-4 border py-2">{supplier.paid} TK</td>
                    <td className="px-4 border py-2">{supplier.purchase_due} TK</td>
                    <td className="px-4 border py-2">
                      {parseFloat(supplier.balance) +
                        parseFloat(supplier.purchase_due)}{' '}
                      TK
                    </td>
                    <td className="p-2 relative">
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
                                onClick={() => alert('Generate Invoice')}
                              >
                                <span className="mr-2">
                                  <FaPrint size={16} className="text-teal-500" />
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
                                  <IoTvOutline size={16} className="text-blue-500" />
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
                                  <TbEdit size={16} className="text-blue-500" />
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
                                  <MdOutlinePayments size={16} className="text-teal-500" />
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
                                  <MdOutlineDeleteSweep size={16} />
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
            {Array.from({
              length: Math.ceil(filteredSuppliers.length / suppliersPerPage),
            })?.map((_, index) => (
              <button
                key={index}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-300'
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
