"use client";

import Loader from "@/app/Loaders/page";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function CustomersList() {
  const spanClass =
    " block h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700";

  const [customers, setCustomers] = useState([]); // Stores all customer data
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Stores filtered customer data
  const [filter, setFilter] = useState({
    name: "",
    mobileNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/Customers/customer");
        if (!response.ok) throw new Error("Failed to fetch customers");

        const { customers } = await response.json();
        console.log(customers);
        setCustomers(customers);
        setFilteredCustomers(customers); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle input changes for filters
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilter = () => {
    const filtered = customers.filter((customer) => {
      const nameMatch = filter.name
        ? customer.name.toLowerCase().includes(filter.name.toLowerCase())
        : true;
      const mobileMatch = filter.mobileNumber
        ? customer.phone.includes(filter.mobileNumber)
        : true;
      return nameMatch && mobileMatch;
    });
    setFilteredCustomers(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilter({ name: "", mobileNumber: "" });
    setFilteredCustomers(customers); // Reset to original data
  };

  // Open modal for selected customer
  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.getElementById("table-to-print").outerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Customer Information</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          </style>
        </head>
        <body onload="window.print()">
          ${printContent.replace(/<th>Actions<\/th>.*?<\/tr>/, "")}
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  if (loading) return <Loader/>;

  return (
    <div className="bg-white dark:bg-[#141432] font-nunito text-sm">
      <div className="p-0 mt-[25%] lg:mt-[5%] w-full">
        {/* Title Section */}
        <div className="mb-4 shadow-sm">
          <h1 className="text-lg dark:text-white text-gray-500 mx-5">Customers</h1>
          <div className="flex items-start justify-start mx-5 py-5 gap-10">
            <Link
              href="/Customers"
              className="group text-gray-500 dark:text-white text-md hover:text-orange-500"
            >
              Customers
              <span className={spanClass}></span>
            </Link>
            <Link
              href="/Customers/Create"
              className="group text-gray-500 dark:text-white text-md hover:text-orange-500"
            >
              + Add Customers
              <span className={spanClass}></span>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex md:w-1/2 gap-4 md:mt-10">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filter.name}
            onChange={handleFilter}
            className="border p-2 rounded w-full md:w-1/2 bg-white"
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={filter.mobileNumber}
            onChange={handleFilter}
            className="border p-2 rounded w-full md:w-1/2 bg-white"
          />
        </div>
        <div className="flex md:w-1/2 gap-4 py-2">
          <button onClick={applyFilter} className="bg-green-500 text-white px-14 py-2 rounded">
            Filter
          </button>
          <button onClick={resetFilters} className="bg-red-500 text-white px-14 py-2 rounded">
            Reset
          </button>
        </div>

        {/* Table Section */}
        <div className="mt-4 border py-4 px-4">
          <div className="flex items-center justify-between gap-5 mb-5">
            <h1 className="text-gray-500 dark:text-white font-medium">Customers</h1>
            <button onClick={handlePrint} className="bg-blue-500 text-white px-14 py-2 rounded">
              Print
            </button>
          </div>
          <table id="table-to-print" className="table-auto dark:text-white w-full border-collapse border">
            <thead>
              <tr className="bg-emerald-500 dark:bg-[#232350] text-white">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Balance</th>
                <th className="border px-4 py-2">Paid</th>
                <th className="border px-4 py-2">Sale Due</th>
                <th className="border px-4 py-2">Total Due</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredCustomers.map((customer, index) => (
    <tr key={customer.id} className="bg-white dark:bg-[#232350] dark:text-white border">
      <td className="border px-4 py-2 text-center">{index + 1}</td>
      <td className="border px-4 py-2">{customer.name}</td>
      <td className="border px-4 py-2">{customer.email}</td>
      <td className="border px-4 py-2">{customer.phone}</td>
      <td className="border px-4 py-2">{customer.address}</td>
      <td className="border px-4 py-2">{customer.balance}</td>
      <td className="border px-4 py-2">{customer.paid}</td>
      <td className="border px-4 py-2">{customer.saledue}</td>
      <td className="border px-4 py-2">
        {customer.totaldue < 0 ? (
          <span className="text-red-500">Due: {Math.abs(customer.totaldue)}</span>
        ) : (
          `${customer.totaldue}`
        )}
      </td>
      <td className="border px-4 py-2 text-center">
        <button
          onClick={() => openModal(customer)}
          className="bg-gray-500 text-white px-2 py-1 rounded"
        >
          Actions
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {/* Modal Section */}
        {isModalOpen && selectedCustomer && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
            <div className="bg-white p-6 shadow-sm">
              <h2 className="dark:text-white text-lg mb-4">Customer: {selectedCustomer.name}</h2>
              <p>Email: {selectedCustomer.email}</p>
              <p>Phone: {selectedCustomer.phone}</p>
              <p>Address: {selectedCustomer.address}</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
